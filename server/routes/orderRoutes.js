import express from 'express';
import { addToOrders, getOrderById, getOrders, updateOrderStatus } from './../controllers/orderController.js';


const router = express.Router();

router.post('/', addToOrders);
router.get('/user/:userId', getOrders);
router.get('/user/order/:orderId', getOrderById);
router.get('/admin/orders', getOrders);
router.get('/admin/order/:orderId', getOrderById);
router.put('/admin/order/:orderId', updateOrderStatus);

export default router;