import express from 'express';
import { fetchShippingOptions } from '../controllers/shippingController.js';

const router = express.Router();

router.post('/', fetchShippingOptions)

export default router;