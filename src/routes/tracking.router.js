const express = require('express');
const {
  addTracking,
  getTrackingToday,
} = require('../controllers/tracking.controller');

const trackingRoute = express.Router();

trackingRoute.get('/track');
trackingRoute.post('/track', addTracking);
trackingRoute.get('/track/today', getTrackingToday);

module.exports = trackingRoute;
