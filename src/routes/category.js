const express = require('express');
const {
  getCategories,
  createCategory,
} = require('../controllers/category.controller');

const categoryRoute = express.Router();

categoryRoute.get('/category', getCategories);
categoryRoute.post('/category', createCategory);

module.exports = categoryRoute;
