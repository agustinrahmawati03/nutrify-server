const express = require('express');
const {
  addTracking,
  getTrackingToday,
  getTrackingByDate,
} = require('../controllers/tracking.controller');

const trackingRoute = express.Router();

trackingRoute.get('/track');
trackingRoute.post('/track', addTracking);
trackingRoute.get('/track/today', getTrackingToday);
trackingRoute.post('/track/history', getTrackingByDate);

module.exports = trackingRoute;
