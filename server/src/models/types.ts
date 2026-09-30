export type EventCategory = 
  | 'Competitive Programming'
  | 'DSA'
  | 'Workshop'
  | 'Hackathon'
  | 'Tech Talk'
  | 'Competition'
  | 'Contests'
  | 'Community'
  | 'Recruitment';

export interface IEvent {
  id: string;
  name: string;
  category: EventCategory;
  date: string; // YYYY-MM-DD
  time: string; // e.g. "10:00 AM - 05:00 PM"
  venue: string;
  description: string;
  image: string;
  registrationDeadline: string; // YYYY-MM-DD
  capacity: number;
  featured?: boolean;
  edition?: string; // e.g. "MISSION // 001"
  highlights?: string[];
  organizer?: {
    team: string;
    lead: string;
    contactEmail: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface IRegistration {
  id: string;
  eventId: string;
  eventName: string;
  name: string;
  email: string;
  collegeYear: string;
  phone: string;
  department?: string;
  ticketId: string;
  registeredAt: string;
  status?: 'Confirmed' | 'Waitlisted' | 'Cancelled';
}

export interface IAdmin {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
  role: string;
  createdAt: string;
}
