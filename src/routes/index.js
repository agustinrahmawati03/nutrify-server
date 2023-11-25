const express = require('express');
const router = express();

const authRoute = require('./auth.router');
const foodRoute = require('./food.router');
const trackingRoute = require('./tracking.router');
const categoryRoute = require('./category');

router.use('/', authRoute);
router.use('/foods', foodRoute);
router.use('/', trackingRoute);
router.use('/', categoryRoute);

module.exports = router;
