import { Request, Response } from 'express';
import { storage } from '../services/storageAdapter.js';

export async function registerForEvent(req: Request, res: Response): Promise<void> {
  try {
    const eventId = req.params.id as string;
    const { name, email, collegeYear, phone, department } = req.body;

    const event = await storage.getEventById(eventId);
    if (!event) {
      res.status(404).json({
        success: false,
        message: 'Event not found. Registration cannot be completed.'
      });
      return;
    }

    // Check deadline
    const today = new Date().toISOString().split('T')[0];
    if (event.registrationDeadline && event.registrationDeadline < today) {
      res.status(400).json({
        success: false,
        message: `Registrations for this event closed on ${event.registrationDeadline}.`
      });
      return;
    }

    const result = await storage.createRegistration({
      eventId,
      name,
      email,
      collegeYear,
      phone,
      department
    });

    if (result.error) {
      res.status(result.status || 400).json({
        success: false,
        message: result.error
      });
      return;
    }

    res.status(201).json({
      success: true,
      message: "YOU'RE IN. Your registration has been confirmed.",
      data: {
        registration: result.registration,
        event: {
          id: event.id,
          name: event.name,
          date: event.date,
          time: event.time,
          venue: event.venue,
          category: event.category
        }
      }
    });
  } catch (error: any) {
    console.error('Error during student registration:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to process registration. Please try again.'
    });
  }
}

export async function getRegistrations(req: Request, res: Response): Promise<void> {
  try {
    const { eventId, search, collegeYear } = req.query;

    const registrations = await storage.getRegistrations({
      eventId: typeof eventId === 'string' ? eventId : undefined,
      search: typeof search === 'string' ? search : undefined,
      collegeYear: typeof collegeYear === 'string' ? collegeYear : undefined
    });

    res.json({
      success: true,
      count: registrations.length,
      data: registrations
    });
  } catch (error: any) {
    console.error('Error fetching registrations:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve registrations list.'
    });
  }
}

export async function getRegistrationById(req: Request, res: Response): Promise<void> {
  try {
    const id = req.params.id as string;
    const registration = await storage.getRegistrationById(id);

    if (!registration) {
      res.status(404).json({
        success: false,
        message: 'Registration record not found.'
      });
      return;
    }

    res.json({
      success: true,
      data: registration
    });
  } catch (error: any) {
    console.error('Error retrieving registration details:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve registration.'
    });
  }
}
