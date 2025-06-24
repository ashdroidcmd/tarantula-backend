import express from 'express'
const router = express.Router();

import authController from '../controllers/authController.js';
import authMiddleware from '../middleware/authMiddleware.js';

// Public
router.post('/register', authController.register);
router.post('/login', authController.login);

// Protected
router.get('/me', authMiddleware, (req, res) => {
  res.json({ message: "You are logged in", userId: req.user });
});

export default router
