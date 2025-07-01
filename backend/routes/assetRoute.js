


import express from 'express';
import { authenticate, authorize } from '../middleware/auth.js';  // Correct import
import { createAsset, getAssets } from '../controllers/assetController.js';

const router = express.Router();

router.post('/', authenticate, authorize(['Admin']), createAsset);

router.get('/', authenticate, getAssets);

export default router;
