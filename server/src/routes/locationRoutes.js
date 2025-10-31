import express from 'express';
import { fetchCities, fetchDistricts, fetchProvinces, fetchSubdistricts } from '../controllers/locationController.js';

const router = express.Router();

router.get('/provinces', fetchProvinces);
router.get('/cities/:provinceId', fetchCities);
router.get('/districts/:cityId', fetchDistricts);
router.get('/subdistricts/:districtId', fetchSubdistricts);

export default router;