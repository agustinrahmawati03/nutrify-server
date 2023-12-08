const Food = require('../models/food');

const getAllFoods = async (req, res) => {
  try {
    const food = await Food.find();

    return res.status(200).send({ message: 'success', food });
  } catch (error) {
    return res.status(404).send({ message: error.message });
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
      res.status(404).json({ message: 'category not found' });
    }

    res.status(200).send({ message: 'success', body: food });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const getFoodByQuery = async (req, res) => {
  try {
    const food = await Food.find({
      name: { $regex: req.query.name, $options: 'i' },
    }).populate('category');
    if (food.length == 0) {
      return res.status(404).send({ message: 'Oops, Not Found' });
    } else {
      return res.send(food);
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const getFoodByID = async (req, res) => {
  try {
    const food = await Food.findOne({ _id: req.params.id }).populate(
      'category'
    );

    return res.send(food);
  } catch (error) {
    return res.status(404).send({
      message: 'opps food not found!',
    });
  }
};

module.exports = {
  getAllFoods,
  addManyFoods,
  getFoodByCategory,
  getFoodByQuery,
  getFoodByID,
};
