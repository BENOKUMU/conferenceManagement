import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js'; 
import { getAllUsers, getUserById, updateUser, deleteUser, getUserProfile } from '../controllers/userController.js';

const router = express.Router();

router.get('/', getAllUsers);
router.get('/:id', getUserById); // Use this if you want to get a user by ID
router.get('/profile/:userId', getUserProfile); // New route for getting user profile
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
// router.post('/register', register);
// router.post('/login', login);

export default router;