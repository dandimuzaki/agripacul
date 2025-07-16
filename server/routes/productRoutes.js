import express from 'express';
import { createProduct, getProductById, getProducts, updateProductStock } from '../controllers/productController.js';

const router = express.Router();

router.get('/', getProducts);
router.get('/:productId', getProductById);
router.post('/', createProduct);
router.put('/:productId', updateProductStock);

export default router;
