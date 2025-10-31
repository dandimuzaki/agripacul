import express from 'express';
import { getMonthlyStats, getTotalStats } from '../controllers/analyticController.js';

const router = express.Router();

router.get('/analytics/monthly', getMonthlyStats);
router.get('/analytics/total', getTotalStats);

export default router;