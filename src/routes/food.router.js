const express = require('express');
const {
  getAllFoods,
  addManyFoods,
} = require('../controllers/food.controller');

const foodRoute = express.Router();

foodRoute.get('/foods', getAllFoods);
foodRoute.post('/', addManyFoods);

module.exports = foodRoute;
