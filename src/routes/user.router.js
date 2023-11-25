const express = require('express');

const {
    getUserProfile,
    editUserProfile,
    editUserAccount,
    changeUserPassword,    
} = require('../controllers/user.controller');


const userRoute = express.Router();

userRoute.get('/', getUserProfile);
userRoute.put('/', editUserProfile);
userRoute.put('/account', editUserAccount);
userRoute.put('/change-password', changeUserPassword);

module.exports = userRoute;