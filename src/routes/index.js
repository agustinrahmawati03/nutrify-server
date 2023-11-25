const express = require('express');
const router = express();

const authRoute = require('./auth.router');
const foodRoute = require('./food.router');
const trackingRoute = require('./tracking.router');
const categoryRoute = require('./category.router');
const userRoute  = require('./user.router');

router.use('/', authRoute);
router.use('/foods', foodRoute);
router.use('/', trackingRoute);
router.use('/', categoryRoute);
router.use('/profile', userRoute);

module.exports = router;
