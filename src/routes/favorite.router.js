const express = require('express');
const favoriteRoute = express.Router();

const { tokenVerified, forUser } = require('../middleware/token');
const {
  addFavoriteFood,
  getFavoriteFoods,
  deleteFavFood,
} = require('../controllers/favorite.controller');

favoriteRoute.post('/', [tokenVerified, forUser], addFavoriteFood);
favoriteRoute.get('/', [tokenVerified, forUser], getFavoriteFoods);
favoriteRoute.delete('/:id', [tokenVerified, forUser], deleteFavFood);

module.exports = favoriteRoute;
