const express = require('express');
const router = express();

const authRoute = require('./auth.router');
const foodRoute = require('./food.router');
const trackingRoute = require('./tracking.router');
const categoryRoute = require('./category.router');
const userRoute = require('./user.router');
const favoriteRoute = require('./favorite.router');
const exerciseRoute = require('./exercise.router');

router.get('/', (req, res) => {
  return res.status(200).json({
    message: 'Server Running!',
  });
});
router.use('/', authRoute);
router.use('/foods', foodRoute);
router.use('/', trackingRoute);
router.use('/', categoryRoute);
router.use('/profile', userRoute);
router.use('/favorite', favoriteRoute);
router.use('/exercises', exerciseRoute);

// cron
const cronRoute = require('./cron.router');
router.use('/cron', cronRoute);

module.exports = router;
