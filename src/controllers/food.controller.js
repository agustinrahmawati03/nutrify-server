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

const getFoodByCategory = async (req, res) => {
  try {
    const food = await Food.find({
      category: req.params.category,
    }).populate('category');

    if (food === null) {
      res.status(400).json({ message: 'category not found' });
    }

    res.status(200).send({ message: 'success', body: food });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getAllFoods, addManyFoods, getFoodByCategory };
