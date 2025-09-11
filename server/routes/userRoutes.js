import express from 'express';
import { deleteUser, getAllUsers } from '../controllers/userController.js';

const router = express.Router();

router.get('/', getAllUsers);
router.delete('/:userId', deleteUser);

export default router;