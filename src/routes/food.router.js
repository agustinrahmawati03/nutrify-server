const express = require('express');
const {
  getAllFoods,
  addManyFoods,
  getFoodByCategory,
  getFoodByQuery,
  getFoodByID,
} = require('../controllers/food.controller');
const { tokenVerified, forUser } = require('../middleware/token');

const foodRoute = express.Router();

foodRoute.get('/', [tokenVerified, forUser], getAllFoods);
foodRoute.post('/', [tokenVerified, forUser], addManyFoods);
foodRoute.get('/:id', [tokenVerified, forUser], getFoodByID);
foodRoute.get('/search', [tokenVerified, forUser], getFoodByQuery);
foodRoute.get(
  '/category/:category',
  [tokenVerified, forUser],
  getFoodByCategory
);

module.exports = foodRoute;
