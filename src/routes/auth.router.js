const express = require('express');
const {
    signup,
    signin,
    requestCode,
    verifyCode,
    resetPassword,
} = require('../controllers/auth.controller');

const authRoute = express.Router();

authRoute.post('/signup', signup);
authRoute.post('/signin', signin);
authRoute.post('/forgot-password/request-code', requestCode);
authRoute.post('/forgot-password/verify-code', verifyCode);
authRoute.post('/forgot-password/reset-password', resetPassword);

module.exports = authRoute;
