
import express from 'express';
import { createTransfer, getTransfers } from '../controllers/transferController.js';

const router = express.Router();

router.post('/', createTransfer); 
router.get('/', getTransfers)

export default router;
