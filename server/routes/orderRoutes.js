import express from 'express';
import { addToOrders, getOrderById, getOrders, updateOrderStatus } from './../controllers/orderController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/orders', verifyToken, addToOrders);
router.get('/orders', verifyToken, getOrders);
router.get('/orders/:orderId', verifyToken, getOrderById);
router.get('/admin/orders', verifyToken, getOrders);
router.get('/admin/orders/:orderId', verifyToken, getOrderById);
router.put('/admin/orders/:orderId', verifyToken, updateOrderStatus);

export default router;