import { Router } from 'express';
import {
  loginAdmin,
  getCurrentAdmin,
  getDashboardStats,
  resetData
} from '../controllers/authController.js';
import { requireAdminAuth } from '../middleware/authMiddleware.js';
import { validateLoginInput } from '../middleware/validateMiddleware.js';

const router = Router();

router.post('/login', validateLoginInput, loginAdmin);
router.get('/me', requireAdminAuth, getCurrentAdmin);
router.get('/stats', requireAdminAuth, getDashboardStats);
router.post('/reset-data', requireAdminAuth, resetData);

export default router;
