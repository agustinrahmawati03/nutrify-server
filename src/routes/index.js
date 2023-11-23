const express = require('express');
const router = express();

const authRoute = require('./auth.router');
const foodRoute = require('./food.router');

router.use('/', authRoute);
router.use('/', foodRoute);

module.exports = router;
