export type EventCategory = 
  | 'Competitive Programming'
  | 'DSA'
  | 'Workshop'
  | 'Hackathon'
  | 'Tech Talk'
  | 'Competition'
  | 'Contests'
  | 'Community'
  | 'Recruitment'
  | 'Seminar'
  | 'Cultural'
  | 'Networking'
  | 'Club Activity';

export interface EventItem {
  id: string;
  name: string;
  category: EventCategory;
  date: string;
  time: string;
  venue: string;
  description: string;
  image: string;
  imageUrl?: string;
  registrationDeadline: string;
  capacity: number;
  featured?: boolean;
  status?: string;
  edition?: string;
  highlights?: string[];
  organizer?: {
    team: string;
    lead: string;
    contactEmail: string;
  };
  registrationsCount?: number;
  seatsLeft?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface RegistrationItem {
  id: string;
  eventId: string;
  eventName: string;
  name: string;
  email: string;
  collegeYear: string;
  year?: string;
  phone: string;
  department?: string;
  ticketId: string;
  registeredAt: string;
  registrationDate?: string;
  status?: 'Confirmed' | 'Waitlisted' | 'Cancelled';
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface DashboardStats {
  totalEvents: number;
  upcomingEventsCount: number;
  totalRegistrations: number;
  thisMonthRegistrationsCount: number;
  totalCapacity: number;
  filledSeats: number;
  capacityFillRate: number;
  categoryCounts: Record<string, number>;
  recentRegistrations: RegistrationItem[];
  recentEvents?: EventItem[];
}
