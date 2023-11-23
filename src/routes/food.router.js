const express = require('express');
const { getAllFoods } = require('../controllers/food.controller');

const foodRoute = express.Router();

foodRoute.get('/foods', getAllFoods);

module.exports = foodRoute;
