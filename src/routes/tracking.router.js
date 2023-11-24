const express = require('express');
const { addTracking } = require('../controllers/tracking.controller');

const trackingRoute = express.Router();

trackingRoute.get('/track');
trackingRoute.post('/track', addTracking);

module.exports = trackingRoute;
