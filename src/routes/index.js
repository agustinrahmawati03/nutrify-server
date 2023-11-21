const express = require('express');
const router = express();

const authRoute = require('./auth.router');

router.use('/', authRoute);

module.exports = router;
