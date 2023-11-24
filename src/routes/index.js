const express = require('express');
const router = express();

const authRoute = require('./auth.router');
const foodRoute = require('./food.router');
const trackingRoute = require('./tracking.router');

router.use('/', authRoute);
router.use('/', foodRoute);
router.use('/', trackingRoute);

module.exports = router;
