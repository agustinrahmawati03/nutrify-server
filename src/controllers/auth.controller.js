const signup = (req, res) => {
  res.status(200).json({ message: 'user mendaftar' });
};

const signin = (req, res) => {
  res.status(200).json({ message: 'user login' });
};

module.exports = { signup, signin };
