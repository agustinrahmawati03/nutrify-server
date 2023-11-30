const express = require('express');

const {
  getUserProfile,
  editUserProfile,
  changeUserPassword,
} = require('../controllers/user.controller');
const { tokenVerified, forUser } = require('../middleware/token');

const userRoute = express.Router();

userRoute.get('/', [tokenVerified, forUser], getUserProfile);
userRoute.put('/', [tokenVerified, forUser], editUserProfile);
userRoute.put(
  '/change-password',
  [tokenVerified, forUser],
  changeUserPassword
);

module.exports = userRoute;
