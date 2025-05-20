const User = require('../models/user');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const { tokenGenerated } = require('../middleware/token');
const {
  getLevelActivity,
  hitungBMI,
  getBBIstatus,
  getStatusBMI,
} = require('../service');
const { sendVerificationCodeEmail } = require('../service/mailer/index');

const signup = async (req, res) => {
  try {
    // Get data from request
    let {
      email,
      username,
      gender,
      tinggi,
      berat,
      umur,
      password,
      levelActivity,
    } = req.body;

    // Check if email already exists
    let user = await User.findOne({ email });

    if (user) {
      if (user.verification?.status) {
        return res
          .status(409)
          .json({ message: 'Email is already verified and in use.' });
      }

      // If user exists but is not verified, update their data
      user.username = username;
      user.gender = gender;
      user.tinggi = tinggi;
      user.berat = berat;
      user.umur = umur;
      user.levelActivity = levelActivity;
    } else {
      // If email does not exist, create a new user
      user = new User({
        email,
        username,
        gender,
        tinggi,
        berat,
        umur,
        levelActivity,
      });
    }

    // Compute nutrition needs
    const levActivicty = getLevelActivity(levelActivity);
    const bmi = hitungBMI(berat, tinggi);
    const statusBMI = getStatusBMI(bmi);
    const bbi = getBBIstatus(gender, tinggi, berat);

    let bmr =
      gender === 'pria'
        ? 665 + 13.7 * berat + 5 * tinggi - 6.8 * umur
        : 655 + 9.5 * berat + 1.8 * tinggi - 4.7 * umur;

    user.caloriNeeded = bmr * levActivicty;
    user.carboNeeded = (user.caloriNeeded * 0.65) / 4;
    user.proteinNeeded = (user.caloriNeeded * 0.15) / 4;
    user.fatNeeded = (user.caloriNeeded * 0.2) / 9;
    user.bmi = bmi;
    user.status = statusBMI;
    user.bbi = bbi;

    // Hash password before saving
    user.password = bcrypt.hashSync(password, 10);

    // Generate OTP for verification
    const OTP = Math.floor(100000 + Math.random() * 900000);
    user.verification = {
      status: false,
      lastSent: Date.now(),
      verifyAttempts: 0,
      resetAttempts: 0,
      verifyCode: OTP,
    };

    await sendVerificationCodeEmail(
      email,
      username,
      OTP,
      'Verify Your Registration'
    );

    // Save or update user in database
    await user.save();

    // Response payload (excluding sensitive data like password)
    const userData = {
      username: user.username,
      email: user.email,
      gender: user.gender,
      tinggi: user.tinggi,
      berat: user.berat,
      umur: user.umur,
      levelActivity: user.levelActivity,
      caloriNeeded: user.caloriNeeded,
      carboNeeded: user.carboNeeded,
      proteinNeeded: user.proteinNeeded,
      fatNeeded: user.fatNeeded,
      bmi: user.bmi,
      status: user.status,
      bbi: user.bbi,
    };

    return res.status(201).json({
      message: 'Signup successful. Please verify your email.',
      body: userData,
    });
  } catch (error) {
    return res
      .status(500)
      .send({ message: 'Error processing request', error: error.message });
  }
};

const signin = async (req, res) => {
  try {
    // get data from user
    let { email, password } = req.body;

    // check is user exist
    const user = await User.findOne({ email: email });
    if (user === null) {
      return res.status(404).json({ message: 'user not found' });
    }

    const passwordChecked = bcrypt.compareSync(password, user.password);

    if (passwordChecked === false) {
      return res.status(401).json({ message: 'wrong password' });
    }

    const token = {
      _id: user._id,
      role: user.role || 'user',
    };

    const tokenCreated = tokenGenerated(token);

    const data = {
      message: 'login success',
      body: {
        token: tokenCreated,
        _id: user.id,
        username: user.username,
        email: user.email,
        gender: user.gender,
        password: user.password,
        tinggi: user.tinggi,
        berat: user.berat,
        umur: user.umur,
        levelActivity: user.levelActivity,
        caloriNeeded: user.caloriNeeded,
        carboNeeded: user.carboNeeded,
        proteinNeeded: user.proteinNeeded,
        fatNeeded: user.fatNeeded,
        bbi: user.bbi,
        bmi: user.bmi,
      },
    };

    // make a response
    return res.status(200).json(data);
  } catch (error) {
    // console.log(error);
    return res.status(500).send({ error });
  }
};

const requestCode = async (req, res) => {
  try {
    let { email, type = 'forget-password' } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Determine which property to use
    const targetProperty =
      type === 'register' ? 'verification' : 'resetPassword';
    const lastSent = user[targetProperty]?.lastSent ?? 0;
    const now = Date.now();
    // const diffMinutes = Math.floor((now - lastSent) / 1000 / 60);
    const diffSeconds = Math.floor((now - lastSent) / 1000);
    const attempts = user[targetProperty]?.resetAttempts ?? 0;
    const cooldownSeconds = 2 * 60;

    // Enforce cooldown period
    if (attempts > 0 && diffSeconds < cooldownSeconds) {
      const remainingSeconds = cooldownSeconds - diffSeconds;
      const remainingMinutes = Math.floor(remainingSeconds / 60);
      const remainingSecondsOnly = remainingSeconds % 60;

      let message = 'You can send the verification code in ';
      if (remainingMinutes > 0) {
        message += `${remainingMinutes} minutes and `;
      }
      message += `${remainingSecondsOnly} seconds.`;
      return res.status(200).json({
        message,
      });
    }

    // Generate OTP and update user record
    const OTP = Math.floor(100000 + Math.random() * 900000);
    user[targetProperty] = {
      lastSent: now,
      verifyAttempts: 0,
      resetAttempts: (user[targetProperty]?.resetAttempts ?? 0) + 1,
      verifyCode: OTP,
    };
    if (type == 'register') {
      user.verification.status = false;
    }

    await user.save();

    const status = await sendVerificationCodeEmail(
      email,
      user.username,
      OTP,
      type == 'register'
        ? 'Verify Your Registration'
        : 'Nutrify Password Reset Verification'
    );
    return res.status(201).json({
      message: 'Verification code has been sent to your email.',
      info: status,
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const verifyCode = async (req, res) => {
  try {
    let { email, code, type = 'forget-password' } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Determine which property to use
    const targetProperty =
      type === 'register' ? 'verification' : 'resetPassword';

    // User only has 3 attempts
    if (user[targetProperty]?.verifyAttempts >= 3) {
      return res.status(429).json({
        message: 'You have reached the maximum number of attempts.',
      });
    }

    // Check if code matches
    if (user[targetProperty]?.verifyCode !== code.toString()) {
      user[targetProperty].verifyAttempts =
        (user[targetProperty]?.verifyAttempts ?? 0) + 1;
      await user.save();
      return res.status(400).json({ message: 'Invalid verification code!' });
    }

    // If type is register, update verification status
    if (type === 'register') {
      user.verification.status = true;
      await user.save();
    }

    return res.status(200).json({ message: 'Verification success!' });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, code, newPassword } = req.body;

    // Check if user exists
    const user = await User.findOne({ email: email });
    if (user === null) {
      return res.status(404).json({ message: 'User not found' });
    }

    // user only have 5 attempts to verify
    if (user.resetPassword?.verifyAttempts >= 5) {
      return res.status(401).json({
        message: 'You have reached the maximum number of attempts.',
      });
    }

    if (user.resetPassword?.verifyCode !== code.toString()) {
      user.resetPassword.verifyAttempts =
        (user.resetPassword.verifyAttempts ?? 0) + 1;
      await user.save();

      return res.status(401).json({ message: 'Invalid verification code!' });
    }

    // cahneg password
    user.password = bcrypt.hashSync(newPassword, 10);
    user.resetPassword = undefined;
    await user.save();

    return res
      .status(200)
      .json({ message: 'Your password has been reset successfully' });
  } catch (error) {
    return res.status(500).send({ error });
  }
};

module.exports = { signup, signin, requestCode, verifyCode, resetPassword };
