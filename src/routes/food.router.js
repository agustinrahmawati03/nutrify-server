const express = require('express');
const {
  getAllFoods,
  addManyFoods,
  getFoodByCategory,
  getFoodByQuery,
  getFoodByID,
} = require('../controllers/food.controller');
const { tokenVerified, forUser, onlyAdmin } = require('../middleware/token');

const foodRoute = express.Router();

foodRoute.get('/', getAllFoods);
foodRoute.post('/', [tokenVerified, onlyAdmin], addManyFoods);
foodRoute.get('/search', [tokenVerified, forUser], getFoodByQuery);
foodRoute.get('/:id', [tokenVerified, forUser], getFoodByID);
foodRoute.get(
  '/category/:category',
  [tokenVerified, forUser],
  getFoodByCategory
);

module.exports = foodRoute;
