const userModel = require('../models/user');
const { getLevelActivity, hitungBMI } = require('../service');

const signup = (req, res) => {
  try {
    // get data from user
    const {
      email,
      username,
      gender,
      tinggi,
      berat,
      umur,
      password,
      levelAktivitas,
    } = req.body;

    // check email is exist

    // count body mass index

    const levActivicty = getLevelActivity(levelAktivitas);

    // count nutrition needed

    let bmr = 0;
    let statusBMI = hitungBMI(berat, tinggi);
    if (gender === 'laki-laki') {
      bmr = 665 + 13.7 * berat + 5 * tinggi - 6.8 * umur;
    }
    if (gender === 'perempuan') {
      bmr = 655 + 9.5 * berat + 1.8 * tinggi - 4.7 * umur;
    }
    const caloriNeeded = bmr * levelAktivitas;
    let carboNeeded = (caloriNeeded * 0.65) / 4;
    let proteinNeeded = (caloriNeeded * 0.15) / 4;
    let fatNeeded = (caloriNeeded * 0.2) / 4;

    // encrypt the password and generate token

    // save to database

    // make a response
    const userData = {
      username: username,
      email: email,
      gender: gender,
      password: password,
      tinggi: tinggi,
      berat: berat,
      umur: umur,
      levelAktivitas: levelAktivitas,
      caloriNeeded: caloriNeeded,
      carboNeeded: carboNeeded,
      proteinNeeded: proteinNeeded,
      fatNeeded: fatNeeded,
      statusBMI,
    };

    res
      .status(200)
      .json({ message: 'signup success', body: userData });
  } catch (error) {}
};

const signin = async (req, res) => {
  try {
    // get data from user
    let { email, password } = req.body;

    // check is user exist
    const user = await userModel.findOne({ email: 'tes@gmail.com' });

    // make a response
    res.status(200).json({ message: 'user login', body: user });
  } catch (error) {}
};

module.exports = { signup, signin };
