import React, { useState, useMemo } from 'react';
import { EventItem } from '../types';
import { EventCard } from '../components/EventCard';
import { SearchFilterBar } from '../components/SearchFilterBar';
import { LoadingSkeletonGrid, ErrorState, EmptyEventsState } from '../components/States';
import { SecretMissionBadge, SpaceshipRadar } from '../components/DecorativeElements';
import { Terminal, ShieldCheck } from 'lucide-react';

interface EventsPageProps {
  events: EventItem[];
  isLoading: boolean;
  error: string | null;
  onSelectEvent: (id: string) => void;
  onRegisterEvent: (id: string, e?: React.MouseEvent) => void;
  onRetry: () => void;
}

export const EventsPage: React.FC<EventsPageProps> = ({
  events,
  isLoading,
  error,
  onSelectEvent,
  onRegisterEvent,
  onRetry
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'upcoming' | 'past'>('upcoming');
  const [sortBy, setSortBy] = useState<'date_asc' | 'date_desc' | 'name'>('date_asc');

  const today = new Date().toISOString().split('T')[0];

  const filteredEvents = useMemo(() => {
    return events
      .filter((evt) => {
        // Search filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchName = evt.name.toLowerCase().includes(q);
          const matchDesc = evt.description.toLowerCase().includes(q);
          const matchVenue = evt.venue.toLowerCase().includes(q);
          const matchCat = evt.category.toLowerCase().includes(q);
          if (!matchName && !matchDesc && !matchVenue && !matchCat) return false;
        }

        // Category filter
        if (selectedCategory !== 'all') {
          if (evt.category.toLowerCase() !== selectedCategory.toLowerCase()) return false;
        }

        // Status filter
        if (statusFilter === 'upcoming') {
          if (evt.date < today) return false;
        } else if (statusFilter === 'past') {
          if (evt.date >= today) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'date_desc') {
          return b.date.localeCompare(a.date);
        } else if (sortBy === 'name') {
          return a.name.localeCompare(b.name);
        }
        return a.date.localeCompare(b.date);
      });
  }, [events, searchQuery, selectedCategory, statusFilter, sortBy, today]);

  const hasActiveFilters =
    searchQuery.trim().length > 0 || selectedCategory !== 'all' || statusFilter !== 'upcoming';

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setStatusFilter('upcoming');
    setSortBy('date_asc');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      
      {/* Spaceship Flight Manifest Header */}
      <div className="space-y-4 border-b border-panelBorder pb-8">
        <SecretMissionBadge title="FLIGHT MANIFEST" subtitle="RADAR // ACTIVE CODE MISSIONS" />
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <h1 className="font-heading font-black text-4xl sm:text-6xl text-offWhite uppercase tracking-tight leading-none">
              ACTIVE <span className="text-crewRed text-glow-red">MISSIONS</span>.
            </h1>
            <p className="text-xs sm:text-base text-mutedGray max-w-xl leading-relaxed">
              Find your next competitive arena, technical workshop, or spaceship hackathon. Filter by flight module or search by keywords.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="font-mono text-xs text-mutedGray bg-deepNavy px-4 py-2 rounded-xl border border-panelBorder flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-crewCyan animate-pulse" />
              <span>RADAR DETECTED:</span>
              <span className="font-bold text-crewCyan">{filteredEvents.length}</span>
              <span>OF</span>
              <span className="font-bold text-offWhite">{events.length}</span>
              <span>MISSIONS</span>
            </div>
          </div>
        </div>
      </div>

      {/* Spaceship HUD Search and Filter Bar */}
      <SearchFilterBar
        searchQuery={searchQuery}
        selectedCategory={selectedCategory}
        statusFilter={statusFilter}
        sortBy={sortBy}
        onSearchChange={setSearchQuery}
        onCategoryChange={setSelectedCategory}
        onStatusChange={setStatusFilter}
        onSortChange={setSortBy}
        onReset={handleClearFilters}
        totalResults={filteredEvents.length}
      />

      {/* Main Content States: Loading, Error, Empty, or Cards Grid */}
      {isLoading && <LoadingSkeletonGrid count={6} />}

      {error && !isLoading && (
        <ErrorState message={error} onRetry={onRetry} />
      )}

      {!isLoading && !error && filteredEvents.length === 0 && (
        <EmptyEventsState
          hasFilters={hasActiveFilters}
          onResetFilters={handleClearFilters}
        />
      )}

      {!isLoading && !error && filteredEvents.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((evt, idx) => (
            <EventCard
              key={evt.id}
              event={evt}
              missionIndex={idx + 1}
              onSelectEvent={onSelectEvent}
              onRegisterEvent={onRegisterEvent}
            />
          ))}
        </div>
      )}

    </div>
  );
};
