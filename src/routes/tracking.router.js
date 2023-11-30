const express = require('express');
const {
  addTracking,
  getTrackingToday,
  getTrackingByDate,
} = require('../controllers/tracking.controller');
const { tokenVerified, forUser } = require('../middleware/token');

const trackingRoute = express.Router();

trackingRoute.get('/track', [tokenVerified, forUser]);
trackingRoute.post('/track', [tokenVerified, forUser], addTracking);
trackingRoute.get(
  '/track/today',
  [tokenVerified, forUser],
  getTrackingToday
);
trackingRoute.post(
  '/track/history',
  [tokenVerified, forUser],
  getTrackingByDate
);

module.exports = trackingRoute;
