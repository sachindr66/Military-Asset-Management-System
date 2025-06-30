import express from 'express';
import { createPurchase, getPurchases } from '../controllers/purchaseController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

router.post('/', authenticate, authorize(['Admin', 'Logistics Officer']), createPurchase);
router.get('/', authenticate, getPurchases);

export default router;
