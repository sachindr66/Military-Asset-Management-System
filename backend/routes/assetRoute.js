// import express from 'express';
// import { getAssets, createAsset, updateAsset, deleteAsset } from '../controllers/assetController.js';
// import { authenticate, authorize } from '../middleware/auth.js';

// const router = express.Router();

// router.get('/', authenticate, getAssets);
// router.post('/', authenticate, authorize(['Admin']), createAsset);
// router.put('/:id', authenticate, authorize(['Admin']), updateAsset);
// router.delete('/:id', authenticate, authorize(['Admin']), deleteAsset);

// export default router;


import express from 'express';
import { authenticate, authorize } from '../middleware/auth.js';  // Correct import
import { createAsset, getAssets } from '../controllers/assetController.js';

const router = express.Router();

// Route to create a new asset (protected by authentication and authorization middleware)
router.post('/', authenticate, authorize(['Admin']), createAsset);

// Route to get all assets (protected by authentication middleware)
router.get('/', authenticate, getAssets);

export default router;
