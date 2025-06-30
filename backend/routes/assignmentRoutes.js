import express from 'express';
import { createAssignment, getAssignments } from '../controllers/assignmentController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

router.post('/', authenticate, authorize(['Admin', 'Base Commander']), createAssignment);
router.get('/', authenticate, getAssignments);

export default router;
