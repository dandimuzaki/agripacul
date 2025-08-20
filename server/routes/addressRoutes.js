import express from 'express';
import { verifyToken } from '../middleware/authMiddleware.js';
import { addAddress, deleteAddress, editAddress, getAddressList, getCities, getDistricts, getProvinces, getSubdistricts } from '../controllers/addressController.js';

const router = express.Router();

router.get('/', verifyToken, getAddressList)
router.get('/provinces', getProvinces)
router.get('/cities/:provinceId', getCities)
router.get('/districts/:cityId', getDistricts)
router.get('/subdistricts/:districtId', getSubdistricts)
router.post('/', verifyToken, addAddress)
router.put('/:addressId', verifyToken, editAddress)
router.delete('/:addressId', verifyToken, deleteAddress)

export default router;