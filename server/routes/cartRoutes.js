import express from 'express';
import { addToCart, deleteItem, getCart, updateItemQuantity } from './../controllers/cartController.js';

const router = express.Router();

router.post('/:userId/:productId', addToCart);
router.get('/:userId', getCart);
router.put('/:userId/:productId', updateItemQuantity);
router.delete('/:userId/:productId', deleteItem);

export default router;