import express from 'express';
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct } from '../controllers/productController.js';

const router = express.Router();

router.get('/', getProducts);
router.get('/:productId', getProductById);
router.post('/', createProduct);
router.put('/:productId', updateProduct);
router.delete('/:productId', deleteProduct);


export default router;
