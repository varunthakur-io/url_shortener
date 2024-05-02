const express = require('express');
const router = express.Router();
const urlRoutes = require('./urlRoutes');
const analyticsRoutes = require('./analyticsRoutes');

// URL routes
router.use('/', urlRoutes);

// Analytics routes
router.use('/analytics', analyticsRoutes);

module.exports = router;
