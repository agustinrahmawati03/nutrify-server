const Food = require('../models/food');

const getAllFoods = async (req, res) => {
  try {
    const food = await Food.find();

    res.status(200).send({ message: 'success', food });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = { getAllFoods };
