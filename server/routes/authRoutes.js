// routes/authRoutes.js
import express from 'express';
import { getEmail, login, logout, register, silentLogin } from '../controllers/authController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.get('/register/:email', getEmail);
router.post('/login', login);
router.get('/silent-login', silentLogin);
router.post('/logout', logout);

export default router;
