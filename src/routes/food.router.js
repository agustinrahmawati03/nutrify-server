const express = require('express');
const {
  getAllFoods,
  addManyFoods,
  getFoodByCategory,
  getFoodByQuery,
  getFoodByID,
} = require('../controllers/food.controller');

const foodRoute = express.Router();

foodRoute.get('/', getAllFoods);
foodRoute.post('/', addManyFoods);
foodRoute.get('/:id', getFoodByID);
foodRoute.get('/category/:category', getFoodByCategory);
foodRoute.get('/search', getFoodByQuery);

module.exports = foodRoute;
