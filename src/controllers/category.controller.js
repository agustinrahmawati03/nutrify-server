const Category = require('../models/category');

const getCategories = async (req, res) => {
  try {
    const category = await Category.find().sort({ order: 1 });
    res.send(category);
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const createCategory = async (req, res) => {
  try {
    const { data } = req.body;
    const categoryCreated = new Category(data);

    console.log(data);

    await categoryCreated.save();
    res.status(201).send({
      message: 'category added successfully',
      data,
    });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

module.exports = { getCategories, createCategory };
