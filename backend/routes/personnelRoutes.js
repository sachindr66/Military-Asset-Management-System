import express from 'express';
import { getPersonnel } from '../controllers/personnelController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authenticate, getPersonnel);

export default router;
