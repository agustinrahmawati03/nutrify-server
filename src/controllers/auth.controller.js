const { getLevelActivity } = require('../service');

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

    // encrypt the password and generate token

    // save to database

    res.status(200).json({ message: levActivicty });
  } catch (error) {}
};

const signin = (req, res) => {
  res.status(200).json({ message: 'user login' });
};

module.exports = { signup, signin };
