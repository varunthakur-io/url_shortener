const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');

// Route for getting analytics data for a specific URL
router.get('/:shortURL', analyticsController.getAnalytics);

module.exports = router;
