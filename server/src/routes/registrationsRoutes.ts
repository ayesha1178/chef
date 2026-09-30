import { Router } from 'express';
import { getRegistrations, getRegistrationById } from '../controllers/registrationsController.js';
import { requireAdminAuth } from '../middleware/authMiddleware.js';

const router = Router();

// Admin protected routes
router.get('/', requireAdminAuth, getRegistrations);
router.get('/:id', requireAdminAuth, getRegistrationById);

export default router;
