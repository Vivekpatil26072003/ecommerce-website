import express from 'express';
import { registerUser, loginUser, getUserProfile, updateUserProfile } from '../controllers/usersController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected profile endpoints
router.route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

export default router;