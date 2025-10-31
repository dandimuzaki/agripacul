import express from 'express';
import { verifyToken } from '../middleware/authMiddleware.js';
import { addAddress, deleteAddress, editAddress, getAddressList } from '../controllers/addressController.js';

const router = express.Router();

router.get('/', verifyToken, getAddressList);
router.post('/', verifyToken, addAddress);
router.put('/:addressId', verifyToken, editAddress);
router.delete('/:addressId', verifyToken, deleteAddress);

export default router;