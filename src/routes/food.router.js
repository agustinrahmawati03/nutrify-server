const express = require('express');
const {
  getAllFoods,
  addManyFoods,
  getFoodByCategory,
} = require('../controllers/food.controller');

const foodRoute = express.Router();

foodRoute.get('/', getAllFoods);
foodRoute.post('/', addManyFoods);
foodRoute.get('/category/:category', getFoodByCategory);

module.exports = foodRoute;
