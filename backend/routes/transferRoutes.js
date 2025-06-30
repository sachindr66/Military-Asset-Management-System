// import express from 'express';
// import { createTransfer, getTransfers } from '../controllers/transferController.js';
// import { authenticate, authorize } from '../middleware/auth.js';

// const router = express.Router();

// router.post('/', authenticate, authorize(['Admin', 'Logistics Officer']), createTransfer);
// router.get('/', authenticate, getTransfers);

// export default router;

import express from 'express';
import { createTransfer, getTransfers } from '../controllers/transferController.js';

const router = express.Router();

router.post('/', createTransfer); // ✅ This should handle POST /api/transfers
router.get('/', getTransfers)

export default router;
