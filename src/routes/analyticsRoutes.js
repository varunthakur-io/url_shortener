import express from 'express';
const router = express.Router();
import { getAnalytics } from '../controllers/analyticsController.js';

// Route for getting analytics data for a specific URL
router.get('/:shortURL', getAnalytics);

export default router;
