import express from 'express';
const router = express.Router();
import upload from '../middlewares/uploadMiddleware.js';

import { login, signup, logout, updateUser } from '../controllers/userController.js';
import restrictToLoggedIn from '../middlewares/auth.js';

// Route for user signup
router.post('/login', login);
router.post('/signup', signup);
router.get('/logout', logout);

router.post('/profile', restrictToLoggedIn, upload.single('profilepic'), updateUser);

export default router;
