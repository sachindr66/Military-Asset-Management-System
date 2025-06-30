import express from 'express';
import { getDashboardMetrics } from '../controllers/dashboardController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authenticate, getDashboardMetrics);

export default router;
