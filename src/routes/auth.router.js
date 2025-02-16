const express = require('express');
const {
    signup,
    signin,
    requestCode,
    verifyCode,
    resetPassword,
} = require('../controllers/auth.controller');

const authRoute = express.Router();

const setRegisterType = (req, res, next) => {
    req.body.type = "register";
    next();
  };
  
authRoute.post('/signup', signup);
authRoute.post('/signin', signin);
authRoute.post('/verification/request-code', setRegisterType , requestCode);
authRoute.post('/verification/verify-code', setRegisterType , verifyCode);
authRoute.post('/forgot-password/request-code', requestCode);
authRoute.post('/forgot-password/verify-code', verifyCode);
authRoute.post('/forgot-password/reset-password', resetPassword);

module.exports = authRoute;
