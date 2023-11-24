const Category = require('../models/category');

const getCategories = async (req, res) => {
  try {
    const category = await Category.find();
    res.send(category);
  } catch (error) {
    console.log(error);
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
    console.log(error);
  }
};

module.exports = { getCategories, createCategory };
