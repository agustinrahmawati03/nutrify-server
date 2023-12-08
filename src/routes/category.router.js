const express = require('express');
const {
  getCategories,
  createCategory,
} = require('../controllers/category.controller');

const { tokenVerified, forUser } = require('../middleware/token');

const categoryRoute = express.Router();

categoryRoute.get(
  '/category',
  [tokenVerified, forUser],
  getCategories
);
categoryRoute.post(
  '/category',
  [tokenVerified, forUser],
  createCategory
);

module.exports = categoryRoute;
