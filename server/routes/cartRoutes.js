import express from 'express';
import { addToCart, deleteItem, getCart, updateCart } from './../controllers/cartController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', verifyToken, addToCart);
router.get('/', verifyToken, getCart);
router.put('/:productId', verifyToken, updateCart);
router.delete('/:productId', verifyToken, deleteItem);

export default router;