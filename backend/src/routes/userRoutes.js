import express from 'express';
import { registerUser, loginUser } from '../controllers/userControllers.js';
import protect from '../middleware/authMiddleware.js';
import User from '../models/User.js';

const router = express.Router();

// Register User Route
router.post('/register', registerUser);

// Login User Route
router.post('/login', loginUser);

// Profile Route (Protected)
router.get('/profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password'); // Exclude the password
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Profile route error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
