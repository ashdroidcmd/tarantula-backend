// Imports
import express from 'express'
import authController from '../controllers/authController.js';
import authMiddleware from '../middleware/authMiddleware.js';

// express.Router() - is a mini Express app you can use to organize your routes in a modular way. 
const router = express.Router();

  // Public
  router.post('/register', authController.register);
  router.post('/login', authController.login);

  // Protected
  router.get('/me', authMiddleware, (req, res) => {
    res.json({ message: "You are logged in", userId: req.user });
  });

export default router
