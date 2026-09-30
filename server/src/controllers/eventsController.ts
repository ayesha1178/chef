import { Request, Response } from 'express';
import { storage } from '../services/storageAdapter.js';

export async function getEvents(req: Request, res: Response): Promise<void> {
  try {
    const { search, category, status, sort } = req.query;

    const events = await storage.getEvents({
      search: typeof search === 'string' ? search : undefined,
      category: typeof category === 'string' ? category : undefined,
      status: (status as any) || 'all',
      sort: (sort as any) || 'date_asc'
    });

    res.json({
      success: true,
      count: events.length,
      data: events
    });
  } catch (error: any) {
    console.error('Error fetching events:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve events. Please try again later.'
    });
  }
}

export async function getEventById(req: Request, res: Response): Promise<void> {
  try {
    const id = req.params.id as string;
    const event = await storage.getEventById(id);

    if (!event) {
      res.status(404).json({
        success: false,
        message: 'Event not found with the requested identifier.'
      });
      return;
    }

    res.json({
      success: true,
      data: event
    });
  } catch (error: any) {
    console.error('Error fetching event by id:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while fetching event details.'
    });
  }
}

export async function createEvent(req: Request, res: Response): Promise<void> {
  try {
    const {
      name,
      category,
      date,
      time,
      venue,
      description,
      image,
      capacity,
      registrationDeadline,
      featured,
      edition,
      highlights,
      organizer
    } = req.body;

    const newEvent = await storage.createEvent({
      name: name.trim(),
      category,
      date,
      time: time.trim(),
      venue: venue.trim(),
      description: description.trim(),
      image: image.trim(),
      capacity: Number(capacity),
      registrationDeadline,
      featured: Boolean(featured),
      edition: edition?.trim() || 'EDITION // 01',
      highlights: Array.isArray(highlights) ? highlights : [],
      organizer: organizer || {
        team: 'VANTA Club',
        lead: 'Operations Desk',
        contactEmail: 'events@vanta.club'
      }
    });

    res.status(201).json({
      success: true,
      message: 'Event created successfully.',
      data: newEvent
    });
  } catch (error: any) {
    console.error('Error creating event:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create event.'
    });
  }
}

export async function updateEvent(req: Request, res: Response): Promise<void> {
  try {
    const id = req.params.id as string;
    const updates = req.body;

    if (updates.capacity !== undefined) {
      updates.capacity = Number(updates.capacity);
    }

    const updated = await storage.updateEvent(id, updates);

    if (!updated) {
      res.status(404).json({
        success: false,
        message: 'Cannot update: Event does not exist.'
      });
      return;
    }

    res.json({
      success: true,
      message: 'Event updated successfully.',
      data: updated
    });
  } catch (error: any) {
    console.error('Error updating event:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update event.'
    });
  }
}

export async function deleteEvent(req: Request, res: Response): Promise<void> {
  try {
    const id = req.params.id as string;
    const deleted = await storage.deleteEvent(id);

    if (!deleted) {
      res.status(404).json({
        success: false,
        message: 'Cannot delete: Event not found.'
      });
      return;
    }

    res.json({
      success: true,
      message: 'Event and associated registrations deleted successfully.'
    });
  } catch (error: any) {
    console.error('Error deleting event:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete event.'
    });
  }
}
