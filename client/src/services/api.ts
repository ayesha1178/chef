import { EventItem, RegistrationItem, AdminUser, DashboardStats } from '../types';

const API_BASE = '/api';

function getAuthHeader(): Record<string, string> {
  const token = localStorage.getItem('vanta_admin_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function handleResponse<T>(res: Response): Promise<T> {
  const data = await res.json();
  if (!res.ok) {
    const errorMsg = data.message || (data.errors ? data.errors.join(', ') : 'Request failed');
    throw new Error(errorMsg);
  }
  return data;
}

export const api = {
  // --- Public Events ---
  async getEvents(params?: {
    search?: string;
    category?: string;
    status?: 'all' | 'upcoming' | 'past';
    sort?: 'date_asc' | 'date_desc' | 'name';
  }): Promise<{ success: boolean; count: number; data: EventItem[] }> {
    const url = new URL(`${window.location.origin}${API_BASE}/events`);
    if (params?.search) url.searchParams.set('search', params.search);
    if (params?.category && params.category !== 'all') url.searchParams.set('category', params.category);
    if (params?.status) url.searchParams.set('status', params.status);
    if (params?.sort) url.searchParams.set('sort', params.sort);

    const res = await fetch(url.toString());
    return handleResponse(res);
  },

  async getEventById(id: string): Promise<{ success: boolean; data: EventItem }> {
    const res = await fetch(`${API_BASE}/events/${id}`);
    return handleResponse(res);
  },

  async registerForEvent(
    eventId: string,
    payload: {
      name: string;
      email: string;
      collegeYear: string;
      phone: string;
      department?: string;
    }
  ): Promise<{
    success: boolean;
    message: string;
    data: {
      registration: RegistrationItem;
      event: { id: string; name: string; date: string; time: string; venue: string; category: string };
    };
  }> {
    const res = await fetch(`${API_BASE}/events/${eventId}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return handleResponse(res);
  },

  // --- Admin Auth ---
  async loginAdmin(
    email: string,
    password: string
  ): Promise<{
    success: boolean;
    message: string;
    data: { token: string; admin: AdminUser };
  }> {
    const res = await fetch(`${API_BASE}/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const result = await handleResponse<{
      success: boolean;
      message: string;
      data: { token: string; admin: AdminUser };
    }>(res);

    if (result.data?.token) {
      localStorage.setItem('vanta_admin_token', result.data.token);
      localStorage.setItem('vanta_admin_user', JSON.stringify(result.data.admin));
    }
    return result;
  },

  async getCurrentAdmin(): Promise<{ success: boolean; data: AdminUser }> {
    const res = await fetch(`${API_BASE}/admin/me`, {
      headers: { ...getAuthHeader() }
    });
    return handleResponse(res);
  },

  async getDashboardStats(): Promise<{ success: boolean; data: DashboardStats }> {
    const res = await fetch(`${API_BASE}/admin/stats`, {
      headers: { ...getAuthHeader() }
    });
    return handleResponse(res);
  },

  async resetData(): Promise<{ success: boolean; message: string }> {
    const res = await fetch(`${API_BASE}/admin/reset-data`, {
      method: 'POST',
      headers: { ...getAuthHeader() }
    });
    return handleResponse(res);
  },

  // --- Admin CRUD Events ---
  async createEvent(eventData: Partial<EventItem>): Promise<{ success: boolean; data: EventItem }> {
    const res = await fetch(`${API_BASE}/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify(eventData)
    });
    return handleResponse(res);
  },

  async updateEvent(id: string, updates: Partial<EventItem>): Promise<{ success: boolean; data: EventItem }> {
    const res = await fetch(`${API_BASE}/events/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify(updates)
    });
    return handleResponse(res);
  },

  async deleteEvent(id: string): Promise<{ success: boolean; message: string }> {
    const res = await fetch(`${API_BASE}/events/${id}`, {
      method: 'DELETE',
      headers: { ...getAuthHeader() }
    });
    return handleResponse(res);
  },

  // --- Admin Registrations ---
  async getRegistrations(params?: {
    eventId?: string;
    search?: string;
    collegeYear?: string;
  }): Promise<{ success: boolean; count: number; data: RegistrationItem[] }> {
    const url = new URL(`${window.location.origin}${API_BASE}/registrations`);
    if (params?.eventId) url.searchParams.set('eventId', params.eventId);
    if (params?.search) url.searchParams.set('search', params.search);
    if (params?.collegeYear) url.searchParams.set('collegeYear', params.collegeYear);

    const res = await fetch(url.toString(), {
      headers: { ...getAuthHeader() }
    });
    return handleResponse(res);
  },

  async getRegistrationById(id: string): Promise<{ success: boolean; data: RegistrationItem }> {
    const res = await fetch(`${API_BASE}/registrations/${id}`, {
      headers: { ...getAuthHeader() }
    });
    return handleResponse(res);
  }
};
