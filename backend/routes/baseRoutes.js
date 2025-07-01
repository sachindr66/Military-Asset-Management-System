import express from 'express';
import { getBases } from '../controllers/baseController.js';
import { authenticate, authorize } from '../middleware/auth.js';


const router = express.Router();

router.get('/', authenticate, getBases); 

export default router;
