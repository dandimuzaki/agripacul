// routes/authRoutes.js
import express from 'express';
import { getEmail, getUserDetails, login, register } from '../controllers/authController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.get('/register/:email', getEmail);
router.post('/login', login);
router.get('/user', verifyToken, getUserDetails);


export default router;
