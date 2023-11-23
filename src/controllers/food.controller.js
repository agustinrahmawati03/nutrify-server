const Food = require('../models/food');

const getAllFoods = async (req, res) => {
  try {
    const food = await Food.find();

    res.status(200).send({ message: 'success', food });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const addManyFoods = async (req, res) => {
  try {
    await Food.insertMany(req.body);
    res.status(201).send({
      message: 'food added successfully',
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = { getAllFoods, addManyFoods };
