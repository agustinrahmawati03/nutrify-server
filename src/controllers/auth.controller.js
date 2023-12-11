const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { tokenGenerated } = require('../middleware/token');
const {
  getLevelActivity,
  hitungBMI,
  getBBIstatus,
} = require('../service');

const signup = async (req, res) => {
  try {
    // get data from user
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

    // check email is exist

    const emailExist = await User.findOne({ email: email });

    if (emailExist !== null) {
      return res.status(409).json({ message: 'email already used' });
    }

    // count body mass index

    const levActivicty = getLevelActivity(levelActivity);

    // count nutrition needed

    let bmr = 0;
    let statusBMI = hitungBMI(berat, tinggi);
    if (gender === 'pria') {
      bmr = 665 + 13.7 * berat + 5 * tinggi - 6.8 * umur;
    }
    if (gender === 'wanita') {
      bmr = 655 + 9.5 * berat + 1.8 * tinggi - 4.7 * umur;
    }
    const caloriNeeded = bmr * levActivicty;
    let carboNeeded = (caloriNeeded * 0.65) / 4;
    let proteinNeeded = (caloriNeeded * 0.15) / 4;
    let fatNeeded = (caloriNeeded * 0.2) / 4;

    let bbi = getBBIstatus(gender, tinggi, berat);

    // encrypt the password
    password = bcrypt.hashSync(password, 10);

    // save to database
    const newUser = new User({
      username: username,
      email: email,
      gender: gender,
      password: password,
      tinggi: tinggi,
      berat: berat,
      umur: umur,
      levelActivity: levelActivity,
      caloriNeeded: caloriNeeded,
      carboNeeded: carboNeeded,
      proteinNeeded: proteinNeeded,
      fatNeeded: fatNeeded,
      status: statusBMI,
      bbi,
    });

    await newUser.save();

    // make a response
    const userData = {
      username: username,
      email: email,
      gender: gender,
      password: password,
      tinggi: tinggi,
      berat: berat,
      umur: umur,
      levelActivity: levelActivity,
      caloriNeeded: caloriNeeded,
      carboNeeded: carboNeeded,
      proteinNeeded: proteinNeeded,
      fatNeeded: fatNeeded,
      status: statusBMI,
      bbi,
    };

    return res
      .status(201)
      .json({ message: 'signup success', body: userData });
  } catch (error) {
    res.status(500).send({ message: 'error' });
    console.log(error);
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

    const passwordChecked = bcrypt.compareSync(
      password,
      user.password
    );

    if (passwordChecked === false) {
      return res.status(401).json({ message: 'wrong password' });
    }

    const token = {
      _id: user._id,
      role: 'user',
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
      },
    };

    // make a response
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error });
  }
};

module.exports = { signup, signin };
