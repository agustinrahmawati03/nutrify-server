const express = require('express');

const {
    getUserProfile,
    editUserProfile,
    changeUserPassword,    
} = require('../controllers/user.controller');


const userRoute = express.Router();

userRoute.get('/', getUserProfile);
userRoute.put('/', editUserProfile);
userRoute.put('/change-password', changeUserPassword);

module.exports = userRoute;