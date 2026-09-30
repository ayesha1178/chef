import { Router } from 'express';
import {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent
} from '../controllers/eventsController.js';
import { registerForEvent } from '../controllers/registrationsController.js';
import { requireAdminAuth } from '../middleware/authMiddleware.js';
import { validateEventInput, validateRegistrationInput } from '../middleware/validateMiddleware.js';

const router = Router();

// Public routes
router.get('/', getEvents);
router.get('/:id', getEventById);
router.post('/:id/register', validateRegistrationInput, registerForEvent);

// Admin protected routes
router.post('/', requireAdminAuth, validateEventInput, createEvent);
router.put('/:id', requireAdminAuth, updateEvent);
router.delete('/:id', requireAdminAuth, deleteEvent);

export default router;
