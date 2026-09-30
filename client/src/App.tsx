import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { EventsPage } from './pages/EventsPage';
import { EventDetailPage } from './pages/EventDetailPage';
import { CrewPage } from './pages/CrewPage';
import { AchievementsPage } from './pages/AchievementsPage';
import { AboutPage } from './pages/AboutPage';
import { AdminLoginPage } from './pages/AdminLoginPage';
import { AdminLayout } from './pages/admin/AdminLayout';
import { AdminDashboardOverview } from './pages/admin/AdminDashboardOverview';
import { AdminEventsPage } from './pages/admin/AdminEventsPage';
import { AdminRegistrationsPage } from './pages/admin/AdminRegistrationsPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';
import { RegistrationModal } from './components/RegistrationModal';
import { EmergencyMeetingModal } from './components/EmergencyMeetingModal';
import { ToastProvider, useToast } from './context/ToastContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { EventItem, RegistrationItem } from './types';
import { api } from './services/api';

function AppContent() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { showToast } = useToast();

  const [currentTab, setCurrentTab] = useState<string>('home');
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  // Global events state
  const [events, setEvents] = useState<EventItem[]>([]);
  const [isLoadingEvents, setIsLoadingEvents] = useState<boolean>(true);
  const [eventsError, setEventsError] = useState<string | null>(null);

  // Registration Modal State
  const [regModalEvent, setRegModalEvent] = useState<EventItem | null>(null);
  const [isRegModalOpen, setIsRegModalOpen] = useState<boolean>(false);

  // Emergency Meeting Modal State
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState<boolean>(false);

  // Fetch all events from API
  const fetchEvents = useCallback(async () => {
    setIsLoadingEvents(true);
    setEventsError(null);
    try {
      const res = await api.getEvents();
      if (res.success && res.data) {
        setEvents(res.data);
      }
    } catch (err: any) {
      setEventsError(err.message || 'Failed to load missions.');
    } finally {
      setIsLoadingEvents(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  // URL Hash Sync for bookmarking and back button
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash.startsWith('event/')) {
        const id = hash.replace('event/', '');
        setSelectedEventId(id);
        setCurrentTab('event-detail');
      } else if (hash.startsWith('admin')) {
        setCurrentTab(hash);
      } else if (['home', 'events', 'crew', 'achievements', 'about', 'admin-login'].includes(hash)) {
        setCurrentTab(hash);
      }
    };

    if (window.location.hash) {
      handleHashChange();
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Update hash when tab changes
  const navigateTo = (tab: string, eventId?: string) => {
    setCurrentTab(tab);
    if (tab === 'event-detail' && eventId) {
      setSelectedEventId(eventId);
      window.location.hash = `event/${eventId}`;
    } else {
      window.location.hash = tab;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenRegistration = (eventId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const evt = events.find((item) => item.id === eventId);
    if (evt) {
      setRegModalEvent(evt);
      setIsRegModalOpen(true);
    }
  };

  const handleRegistrationComplete = (registration: RegistrationItem) => {
    // Refresh events to show updated seat counts
    fetchEvents();
  };

  // If user tries to access admin tabs without auth, redirect to admin-login
  const isAdminTab = currentTab.startsWith('admin') && currentTab !== 'admin-login';

  if (isAdminTab && !authLoading && !isAuthenticated) {
    return (
      <AdminLoginPage
        onSuccessLogin={() => navigateTo('admin-dashboard')}
        onBackToHome={() => navigateTo('home')}
      />
    );
  }

  // Render Admin View (Mission Control)
  if (isAdminTab && isAuthenticated) {
    return (
      <AdminLayout
        currentTab={currentTab}
        onNavigateTab={(tab) => navigateTo(tab)}
        onExitAdmin={() => navigateTo('home')}
      >
        {currentTab === 'admin-dashboard' && (
          <AdminDashboardOverview
            onNavigateTab={(tab) => navigateTo(tab)}
            onOpenCreateEvent={() => navigateTo('admin-events')}
          />
        )}
        {currentTab === 'admin-events' && (
          <AdminEventsPage
            events={events}
            onRefreshEvents={fetchEvents}
            onViewPublicEvent={(id) => navigateTo('event-detail', id)}
          />
        )}
        {currentTab === 'admin-registrations' && (
          <AdminRegistrationsPage events={events} />
        )}
        {currentTab === 'admin-settings' && (
          <AdminSettingsPage onDataReset={fetchEvents} />
        )}
      </AdminLayout>
    );
  }

  // Render Public Website
  return (
    <div className="min-h-screen flex flex-col bg-spaceBlack text-offWhite font-sans selection:bg-crewRed selection:text-white">
      {/* Spaceship Cockpit Sticky Navbar */}
      <Navbar
        currentTab={currentTab}
        onNavigate={navigateTo}
        onOpenSearch={() => navigateTo('events')}
        onOpenEmergencyMeeting={() => setIsEmergencyModalOpen(true)}
      />

      {/* Main Public Content */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <HomePage
            events={events}
            isLoading={isLoadingEvents}
            error={eventsError}
            onSelectEvent={(id) => navigateTo('event-detail', id)}
            onRegisterEvent={handleOpenRegistration}
            onNavigate={navigateTo}
            onRetry={fetchEvents}
            onOpenEmergencyMeeting={() => setIsEmergencyModalOpen(true)}
          />
        )}

        {currentTab === 'events' && (
          <EventsPage
            events={events}
            isLoading={isLoadingEvents}
            error={eventsError}
            onSelectEvent={(id) => navigateTo('event-detail', id)}
            onRegisterEvent={handleOpenRegistration}
            onRetry={fetchEvents}
          />
        )}

        {currentTab === 'crew' && (
          <CrewPage onNavigate={navigateTo} />
        )}

        {currentTab === 'achievements' && (
          <AchievementsPage onNavigate={navigateTo} />
        )}

        {currentTab === 'event-detail' && selectedEventId && (
          <EventDetailPage
            eventId={selectedEventId}
            onBack={() => navigateTo('events')}
            onRegister={(id) => handleOpenRegistration(id)}
          />
        )}

        {currentTab === 'about' && (
          <AboutPage onNavigate={navigateTo} />
        )}

        {currentTab === 'admin-login' && (
          <AdminLoginPage
            onSuccessLogin={() => navigateTo('admin-dashboard')}
            onBackToHome={() => navigateTo('home')}
          />
        )}
      </main>

      {/* Spaceship Comms Footer */}
      <Footer
        onNavigate={navigateTo}
        onOpenEmergencyMeeting={() => setIsEmergencyModalOpen(true)}
      />

      {/* Global Registration Modal (Crew Assignment) */}
      <RegistrationModal
        event={regModalEvent}
        isOpen={isRegModalOpen}
        onClose={() => setIsRegModalOpen(false)}
        onSuccessRegistered={handleRegistrationComplete}
      />

      {/* Global Emergency Meeting / Dispatch Modal */}
      <EmergencyMeetingModal
        isOpen={isEmergencyModalOpen}
        onClose={() => setIsEmergencyModalOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <AppContent />
      </ToastProvider>
    </AuthProvider>
  );
}
