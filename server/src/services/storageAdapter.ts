import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { IEvent, IRegistration, IAdmin } from '../models/types.js';
import { INITIAL_EVENTS, INITIAL_REGISTRATIONS } from './seedData.js';
import { ENV } from '../config/env.js';
import { getIsMongoConnected } from '../config/db.js';
import { EventModel } from '../models/EventModel.js';
import { RegistrationModel } from '../models/RegistrationModel.js';
import { AdminModel } from '../models/AdminModel.js';

interface DatabaseSchema {
  events: IEvent[];
  registrations: IRegistration[];
  admins: IAdmin[];
}

const DATA_DIR = path.resolve(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'db.json');

class StorageAdapter {
  private data: DatabaseSchema = {
    events: [],
    registrations: [],
    admins: []
  };

  constructor() {
    this.initFileStore();
  }

  private initFileStore() {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }

      if (fs.existsSync(DATA_FILE)) {
        const raw = fs.readFileSync(DATA_FILE, 'utf-8');
        this.data = JSON.parse(raw);
        // Ensure default admin exists
        this.ensureDefaultAdmin();
      } else {
        this.resetToDefaults();
      }
    } catch (err) {
      console.error('[VANTA Storage] Error initializing file store:', err);
      this.resetToDefaults();
    }
  }

  private ensureDefaultAdmin() {
    const salt = bcrypt.genSaltSync(10);
    const defaultAdmin = this.data.admins.find(a => a.email.toLowerCase() === ENV.ADMIN_EMAIL.toLowerCase());
    if (!defaultAdmin) {
      this.data.admins.push({
        id: 'admin-01',
        email: ENV.ADMIN_EMAIL.toLowerCase(),
        passwordHash: bcrypt.hashSync(ENV.ADMIN_PASSWORD, salt),
        name: 'CodeChef ABESEC Flight Commander',
        role: 'Mission Controller',
        createdAt: new Date().toISOString()
      });
    } else {
      // Ensure the password is up-to-date with env
      defaultAdmin.passwordHash = bcrypt.hashSync(ENV.ADMIN_PASSWORD, salt);
    }
    this.saveToFile();
  }

  public resetToDefaults() {
    const salt = bcrypt.genSaltSync(10);

    this.data = {
      events: [...INITIAL_EVENTS],
      registrations: [...INITIAL_REGISTRATIONS],
      admins: [
        {
          id: 'admin-01',
          email: ENV.ADMIN_EMAIL.toLowerCase(),
          passwordHash: bcrypt.hashSync(ENV.ADMIN_PASSWORD, salt),
          name: 'CodeChef ABESEC Flight Commander',
          role: 'Mission Controller',
          createdAt: new Date().toISOString()
        }
      ]
    };
    this.saveToFile();
    console.log('[CodeChef Storage] Data seeded with CodeChef ABESEC missions.');
  }

  private saveToFile() {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      fs.writeFileSync(DATA_FILE, JSON.stringify(this.data, null, 2), 'utf-8');
    } catch (err) {
      console.error('[VANTA Storage] Failed to write to disk:', err);
    }
  }

  // --- EVENTS ---
  public async getEvents(filters?: {
    search?: string;
    category?: string;
    status?: 'all' | 'upcoming' | 'past';
    sort?: 'date_asc' | 'date_desc' | 'name';
  }): Promise<(IEvent & { registrationsCount: number; seatsLeft: number })[]> {
    if (getIsMongoConnected()) {
      try {
        const query: any = {};
        if (filters?.category && filters.category !== 'all') {
          query.category = filters.category;
        }
        if (filters?.search) {
          query.$or = [
            { name: { $regex: filters.search, $options: 'i' } },
            { description: { $regex: filters.search, $options: 'i' } },
            { venue: { $regex: filters.search, $options: 'i' } },
          ];
        }
        const docs = await EventModel.find(query).lean();
        const mapped = await Promise.all(docs.map(async (doc: any) => {
          const regCount = await RegistrationModel.countDocuments({ eventId: doc._id.toString() });
          return {
            ...doc,
            id: doc._id.toString(),
            registrationsCount: regCount,
            seatsLeft: Math.max(0, doc.capacity - regCount)
          };
        }));
        return mapped;
      } catch (e) {
        console.warn('[VANTA Storage] MongoDB query failed, falling back to local store:', e);
      }
    }

    let results = [...this.data.events];

    // Search query filter
    if (filters?.search && filters.search.trim()) {
      const q = filters.search.toLowerCase().trim();
      results = results.filter(
        e =>
          e.name.toLowerCase().includes(q) ||
          e.description.toLowerCase().includes(q) ||
          e.venue.toLowerCase().includes(q) ||
          e.category.toLowerCase().includes(q)
      );
    }

    // Category filter
    if (filters?.category && filters.category.toLowerCase() !== 'all') {
      results = results.filter(
        e => e.category.toLowerCase() === filters.category!.toLowerCase()
      );
    }

    // Status filter
    const today = new Date().toISOString().split('T')[0];
    if (filters?.status === 'upcoming') {
      results = results.filter(e => e.date >= today);
    } else if (filters?.status === 'past') {
      results = results.filter(e => e.date < today);
    }

    // Sorting
    if (filters?.sort === 'date_desc') {
      results.sort((a, b) => b.date.localeCompare(a.date));
    } else if (filters?.sort === 'name') {
      results.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      // Default: date_asc
      results.sort((a, b) => a.date.localeCompare(b.date));
    }

    // Attach registration counts
    return results.map(event => {
      const regCount = this.data.registrations.filter(r => r.eventId === event.id).length;
      return {
        ...event,
        registrationsCount: regCount,
        seatsLeft: Math.max(0, event.capacity - regCount)
      };
    });
  }

  public async getEventById(id: string): Promise<(IEvent & { registrationsCount: number; seatsLeft: number }) | null> {
    if (getIsMongoConnected()) {
      try {
        const doc: any = await EventModel.findById(id).lean();
        if (doc) {
          const regCount = await RegistrationModel.countDocuments({ eventId: doc._id.toString() });
          return {
            ...doc,
            id: doc._id.toString(),
            registrationsCount: regCount,
            seatsLeft: Math.max(0, doc.capacity - regCount)
          };
        }
      } catch (e) {
        // Fallback
      }
    }

    const event = this.data.events.find(e => e.id === id);
    if (!event) return null;

    const regCount = this.data.registrations.filter(r => r.eventId === event.id).length;
    return {
      ...event,
      registrationsCount: regCount,
      seatsLeft: Math.max(0, event.capacity - regCount)
    };
  }

  public async createEvent(eventData: Omit<IEvent, 'id' | 'createdAt' | 'updatedAt'>): Promise<IEvent> {
    const now = new Date().toISOString();
    const id = `evt-${Date.now()}-${uuidv4().substring(0, 5)}`;
    const newEvent: IEvent = {
      ...eventData,
      id,
      createdAt: now,
      updatedAt: now
    };

    if (getIsMongoConnected()) {
      try {
        const created = await EventModel.create(newEvent);
        return {
          ...newEvent,
          id: (created as any)._id.toString()
        };
      } catch (e) {
        console.warn('[VANTA Storage] Mongo createEvent failed, using file fallback:', e);
      }
    }

    this.data.events.unshift(newEvent);
    this.saveToFile();
    return newEvent;
  }

  public async updateEvent(id: string, updates: Partial<IEvent>): Promise<IEvent | null> {
    const now = new Date().toISOString();

    if (getIsMongoConnected()) {
      try {
        const updated = await EventModel.findByIdAndUpdate(
          id,
          { ...updates, updatedAt: now },
          { new: true }
        ).lean();
        if (updated) {
          return { ...updated, id: (updated as any)._id.toString() } as unknown as IEvent;
        }
      } catch (e) {
        console.warn('[VANTA Storage] Mongo updateEvent failed, using file fallback:', e);
      }
    }

    const index = this.data.events.findIndex(e => e.id === id);
    if (index === -1) return null;

    const existing = this.data.events[index];
    const updatedEvent: IEvent = {
      ...existing,
      ...updates,
      id: existing.id,
      updatedAt: now
    };

    this.data.events[index] = updatedEvent;
    this.saveToFile();
    return updatedEvent;
  }

  public async deleteEvent(id: string): Promise<boolean> {
    if (getIsMongoConnected()) {
      try {
        await EventModel.findByIdAndDelete(id);
        await RegistrationModel.deleteMany({ eventId: id });
      } catch (e) {
        console.warn('[VANTA Storage] Mongo deleteEvent failed, using file fallback:', e);
      }
    }

    const initialLength = this.data.events.length;
    this.data.events = this.data.events.filter(e => e.id !== id);
    // Also remove registrations associated with this event
    this.data.registrations = this.data.registrations.filter(r => r.eventId !== id);
    this.saveToFile();

    return this.data.events.length < initialLength;
  }

  // --- REGISTRATIONS ---
  public async getRegistrations(filters?: {
    eventId?: string;
    search?: string;
    collegeYear?: string;
  }): Promise<IRegistration[]> {
    if (getIsMongoConnected()) {
      try {
        const query: any = {};
        if (filters?.eventId) query.eventId = filters.eventId;
        if (filters?.collegeYear) query.collegeYear = filters.collegeYear;
        if (filters?.search) {
          query.$or = [
            { name: { $regex: filters.search, $options: 'i' } },
            { email: { $regex: filters.search, $options: 'i' } },
            { phone: { $regex: filters.search, $options: 'i' } },
            { ticketId: { $regex: filters.search, $options: 'i' } },
          ];
        }
        const docs = await RegistrationModel.find(query).sort({ createdAt: -1 }).lean();
        return docs.map((d: any) => ({ ...d, id: d._id.toString() }));
      } catch (e) {
        // Fallback
      }
    }

    let results = [...this.data.registrations];

    if (filters?.eventId) {
      results = results.filter(r => r.eventId === filters.eventId);
    }

    if (filters?.collegeYear) {
      results = results.filter(r => r.collegeYear === filters.collegeYear);
    }

    if (filters?.search && filters.search.trim()) {
      const q = filters.search.toLowerCase().trim();
      results = results.filter(
        r =>
          r.name.toLowerCase().includes(q) ||
          r.email.toLowerCase().includes(q) ||
          r.phone.toLowerCase().includes(q) ||
          r.ticketId.toLowerCase().includes(q) ||
          r.eventName.toLowerCase().includes(q) ||
          r.collegeYear.toLowerCase().includes(q)
      );
    }

    // Sort newest first
    results.sort((a, b) => b.registeredAt.localeCompare(a.registeredAt));
    return results;
  }

  public async getRegistrationById(id: string): Promise<IRegistration | null> {
    if (getIsMongoConnected()) {
      try {
        const doc: any = await RegistrationModel.findById(id).lean();
        if (doc) return { ...doc, id: doc._id.toString() };
      } catch (e) {}
    }
    return this.data.registrations.find(r => r.id === id) || null;
  }

  public async createRegistration(regData: {
    eventId: string;
    name: string;
    email: string;
    collegeYear: string;
    phone: string;
    department?: string;
  }): Promise<{ registration?: IRegistration; error?: string; status?: number }> {
    // 1. Verify event exists
    const event = await this.getEventById(regData.eventId);
    if (!event) {
      return { error: 'Event not found', status: 404 };
    }

    // 2. Check capacity
    const currentRegs = await this.getRegistrations({ eventId: regData.eventId });
    if (currentRegs.length >= event.capacity) {
      return { error: 'This event has reached full capacity', status: 400 };
    }

    // 3. Check duplicate registration
    const existing = currentRegs.find(
      r => r.email.toLowerCase().trim() === regData.email.toLowerCase().trim()
    );
    if (existing) {
      return {
        error: 'You are already registered for this event with this email address.',
        status: 409
      };
    }

    // 4. Generate unique ticket ID (e.g. VANTA-7842-HACK)
    const categorySuffix = event.category.substring(0, 4).toUpperCase();
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const ticketId = `CREW-${randomNum}-${categorySuffix}`;

    const newReg: IRegistration = {
      id: `reg-${Date.now()}-${uuidv4().substring(0, 5)}`,
      eventId: event.id,
      eventName: event.name,
      name: regData.name.trim(),
      email: regData.email.toLowerCase().trim(),
      collegeYear: regData.collegeYear.trim(),
      phone: regData.phone.trim(),
      department: regData.department?.trim() || 'General Engineering',
      ticketId,
      registeredAt: new Date().toISOString(),
      status: 'Confirmed'
    };

    if (getIsMongoConnected()) {
      try {
        const created = await RegistrationModel.create(newReg);
        return {
          registration: {
            ...newReg,
            id: (created as any)._id.toString()
          }
        };
      } catch (e: any) {
        console.warn('[VANTA Storage] Mongo createRegistration failed, using file store:', e);
      }
    }

    this.data.registrations.unshift(newReg);
    this.saveToFile();
    return { registration: newReg };
  }

  // --- ADMIN AUTH ---
  public async getAdminByEmail(email: string): Promise<IAdmin | null> {
    if (getIsMongoConnected()) {
      try {
        const doc: any = await AdminModel.findOne({ email: email.toLowerCase() }).lean();
        if (doc) return { ...doc, id: doc._id.toString() };
      } catch (e) {}
    }
    return this.data.admins.find(a => a.email.toLowerCase() === email.toLowerCase()) || null;
  }

  // --- STATS OVERVIEW ---
  public async getDashboardStats() {
    const events = await this.getEvents();
    const registrations = await this.getRegistrations();

    const today = new Date().toISOString().split('T')[0];
    const upcomingEvents = events.filter(e => e.date >= today);

    // Current month filter
    const now = new Date();
    const currentMonthPrefix = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    const thisMonthRegistrations = registrations.filter(r =>
      r.registeredAt.startsWith(currentMonthPrefix)
    );

    // Total seats capacity across all upcoming events
    const totalCapacity = upcomingEvents.reduce((acc, curr) => acc + (curr.capacity || 0), 0);
    const filledSeats = upcomingEvents.reduce((acc, curr) => acc + (curr.registrationsCount || 0), 0);
    const capacityFillRate = totalCapacity > 0 ? Math.round((filledSeats / totalCapacity) * 100) : 0;

    // Breakdown by category
    const categoryCounts: Record<string, number> = {};
    for (const evt of events) {
      categoryCounts[evt.category] = (categoryCounts[evt.category] || 0) + 1;
    }

    // Recent 5 registrations
    const recentRegistrations = registrations.slice(0, 6);

    return {
      totalEvents: events.length,
      upcomingEventsCount: upcomingEvents.length,
      totalRegistrations: registrations.length,
      thisMonthRegistrationsCount: thisMonthRegistrations.length,
      totalCapacity,
      filledSeats,
      capacityFillRate,
      categoryCounts,
      recentRegistrations
    };
  }
}

export const storage = new StorageAdapter();
