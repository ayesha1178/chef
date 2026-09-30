import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  X, 
  Calendar, 
  Users, 
  MapPin, 
  ExternalLink, 
  AlertTriangle, 
  Loader2, 
  Check, 
  Clock,
  Terminal,
  ShieldCheck,
  Eye
} from 'lucide-react';
import { EventItem, EventCategory } from '../../types';
import { api } from '../../services/api';
import { useToast } from '../../context/ToastContext';
import { SecretMissionBadge, MissionModulePill } from '../../components/DecorativeElements';

interface AdminEventsPageProps {
  events: EventItem[];
  onRefreshEvents: () => void;
  onViewPublicEvent: (id: string) => void;
}

const CATEGORIES: EventCategory[] = [
  'Competitive Programming',
  'DSA',
  'Workshop',
  'Hackathon',
  'Tech Talk',
  'Competition',
  'Contests',
  'Community',
  'Recruitment'
];

export const AdminEventsPage: React.FC<AdminEventsPageProps> = ({
  events,
  onRefreshEvents,
  onViewPublicEvent
}) => {
  const { showToast } = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Modal states
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<EventItem | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form Fields
  const [name, setName] = useState('');
  const [category, setCategory] = useState<EventCategory>('Competitive Programming');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [venue, setVenue] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [capacity, setCapacity] = useState('100');
  const [registrationDeadline, setRegistrationDeadline] = useState('');
  const [edition, setEdition] = useState('MISSION // 01');
  const [featured, setFeatured] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const openCreateModal = () => {
    setEditingEvent(null);
    setName('');
    setCategory('Competitive Programming');
    setDate('');
    setTime('05:00 PM - 07:00 PM');
    setVenue('ABESEC CSE Department Lab 3');
    setDescription('');
    setImage('https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80');
    setCapacity('100');
    setRegistrationDeadline('');
    setEdition('MISSION // 01');
    setFeatured(false);
    setFormErrors({});
    setIsFormModalOpen(true);
  };

  const openEditModal = (evt: EventItem) => {
    setEditingEvent(evt);
    setName(evt.name);
    setCategory(evt.category);
    setDate(evt.date);
    setTime(evt.time);
    setVenue(evt.venue);
    setDescription(evt.description);
    setImage(evt.imageUrl || evt.image || '');
    setCapacity(String(evt.capacity));
    setRegistrationDeadline(evt.registrationDeadline || evt.date);
    setEdition(evt.edition || 'MISSION // 01');
    setFeatured(Boolean(evt.featured));
    setFormErrors({});
    setIsFormModalOpen(true);
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    if (!name.trim()) errors.name = 'Mission name is required.';
    if (!date.trim()) errors.date = 'Launch date is required (YYYY-MM-DD).';
    if (!time.trim()) errors.time = 'Time schedule is required.';
    if (!venue.trim()) errors.venue = 'Coordinates / Venue location is required.';
    if (!description.trim() || description.length < 10) {
      errors.description = 'Mission briefing must be at least 10 characters.';
    }
    if (!image.trim() || !image.startsWith('http')) {
      errors.image = 'Valid image URL is required.';
    }
    if (!capacity || isNaN(Number(capacity)) || Number(capacity) < 1) {
      errors.capacity = 'Capacity must be greater than 0.';
    }
    if (!registrationDeadline.trim()) {
      errors.registrationDeadline = 'Cadet boarding deadline date is required.';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSaveEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    const payload = {
      name: name.trim(),
      category,
      date: date.trim(),
      time: time.trim(),
      venue: venue.trim(),
      description: description.trim(),
      image: image.trim(),
      capacity: Number(capacity),
      registrationDeadline: registrationDeadline.trim(),
      edition: edition.trim(),
      featured
    };

    try {
      if (editingEvent) {
        await api.updateEvent(editingEvent.id, payload);
        showToast('success', 'MISSION UPDATED', `"${name}" parameters calibrated.`);
      } else {
        await api.createEvent(payload);
        showToast('success', 'MISSION PUBLISHED', `"${name}" is now live on radar.`);
      }
      setIsFormModalOpen(false);
      onRefreshEvents();
    } catch (err: any) {
      showToast('error', 'OPERATION FAILED', err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteEvent = async (id: string) => {
    setIsSubmitting(true);
    try {
      await api.deleteEvent(id);
      showToast('success', 'MISSION ABORTED', 'The mission and its flight records were purged.');
      setDeleteConfirmId(null);
      onRefreshEvents();
    } catch (err: any) {
      showToast('error', 'PURGE FAILED', err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Filtered Events
  const filteredEvents = events.filter((evt) => {
    if (selectedCategory !== 'all' && evt.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      return (
        evt.name.toLowerCase().includes(q) ||
        evt.venue.toLowerCase().includes(q) ||
        evt.category.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-8 font-sans">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-panelBorder pb-6">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-crewCyan font-bold uppercase tracking-widest">
            <Terminal className="w-3.5 h-3.5 text-crewCyan" />
            <span>FLIGHT MANIFEST OPERATIONS</span>
          </div>
          <h1 className="font-heading font-black text-3xl sm:text-4xl text-offWhite uppercase tracking-tight mt-1">
            ACTIVE MISSIONS
          </h1>
          <p className="text-xs sm:text-sm text-mutedGray mt-1">
            Create, calibrate parameters, inspect seat capacity, or abort missions.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 bg-crewRed hover:bg-darkRed text-white px-5 py-3 rounded-2xl text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-md self-start sm:self-auto hover:-translate-y-0.5 glow-red border border-crewRed/60"
        >
          <Plus className="w-4 h-4 text-crewYellow" />
          <span>+ CREATE MISSION</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-deepNavy p-4 rounded-2xl border border-panelBorder">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-mutedGray absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search missions by name, sector or coordinates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-spaceBlack/80 border border-panelBorder text-xs font-mono text-offWhite placeholder-mutedGray/50 focus:outline-none focus:border-crewRed"
          />
        </div>

        <div className="shrink-0">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-spaceBlack/80 border border-panelBorder text-xs font-mono text-offWhite focus:outline-none focus:border-crewRed"
          >
            <option value="all">ALL SECTORS</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Active Missions Table */}
      <div className="bg-deepNavy rounded-2xl border border-panelBorder overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="bg-spaceBlack/90 text-mutedGray uppercase tracking-wider text-[11px] border-b border-panelBorder">
                <th className="py-3.5 px-4">Mission Name</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Registrations</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-panelBorder/60">
              {filteredEvents.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-mutedGray">
                    NO MISSIONS MATCHING CRITERIA.
                  </td>
                </tr>
              ) : (
                filteredEvents.map((evt) => (
                  <tr key={evt.id} className="hover:bg-spaceNavy/50 transition-colors">
                    {/* Mission Name & Category */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={evt.imageUrl || evt.image}
                          alt={evt.name}
                          className="w-10 h-10 rounded-lg object-cover border border-panelBorder shrink-0"
                        />
                        <div>
                          <div className="font-bold text-offWhite flex items-center gap-2">
                            <span>{evt.name}</span>
                            {evt.featured && (
                              <span className="font-mono text-[9px] uppercase px-1.5 py-0.2 bg-crewRed text-white rounded font-bold">
                                FEATURED
                              </span>
                            )}
                          </div>
                          <div className="text-[10px] text-crewCyan uppercase">
                            {evt.category} • {evt.venue}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Date & Time */}
                    <td className="py-4 px-4 text-mutedGray">
                      <div className="text-offWhite">{evt.date}</div>
                      <div className="text-[10px] text-mutedGray">{evt.time}</div>
                    </td>

                    {/* Status */}
                    <td className="py-4 px-4">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold bg-crewRed/20 text-crewYellow border border-crewRed/40">
                        {evt.status || 'OPEN'}
                      </span>
                    </td>

                    {/* Registrations */}
                    <td className="py-4 px-4">
                      <div className="flex items-baseline gap-1">
                        <span className="font-bold text-offWhite">{evt.registrationsCount || 0}</span>
                        <span className="text-mutedGray">/ {evt.capacity}</span>
                      </div>
                      <div className="w-20 h-1.5 bg-spaceBlack rounded-full mt-1 overflow-hidden">
                        <div
                          className="h-full bg-crewCyan rounded-full"
                          style={{
                            width: `${Math.min(
                              100,
                              Math.round(((evt.registrationsCount || 0) / evt.capacity) * 100)
                            )}%`
                          }}
                        />
                      </div>
                    </td>

                    {/* Actions: EDIT, DELETE, VIEW */}
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => onViewPublicEvent(evt.id)}
                          className="p-1.5 rounded-lg bg-spaceBlack border border-panelBorder text-mutedGray hover:text-crewCyan hover:border-crewCyan/50 transition-colors"
                          title="View Public Mission Briefing"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => openEditModal(evt)}
                          className="p-1.5 rounded-lg bg-spaceBlack border border-panelBorder text-mutedGray hover:text-crewYellow hover:border-crewYellow/50 transition-colors"
                          title="Edit Mission Parameters"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => setDeleteConfirmId(evt.id)}
                          className="p-1.5 rounded-lg bg-spaceBlack border border-panelBorder text-mutedGray hover:text-crewRed hover:border-crewRed/50 transition-colors"
                          title="Abort / Delete Mission"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-spaceBlack/85 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md bg-deepNavy border border-panelBorder rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-crewRed/20 border border-crewRed flex items-center justify-center text-crewRed">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-black text-lg text-offWhite uppercase">
                  CONFIRM MISSION ABORT
                </h3>
                <p className="text-xs text-mutedGray font-mono">
                  This action will permanently purge the mission and all cadet seat assignments.
                </p>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-3 font-mono text-xs">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded-xl bg-spaceBlack border border-panelBorder text-mutedGray hover:text-offWhite"
              >
                CANCEL
              </button>
              <button
                onClick={() => handleDeleteEvent(deleteConfirmId)}
                disabled={isSubmitting}
                className="px-4 py-2 rounded-xl bg-crewRed text-white font-bold hover:bg-darkRed transition-colors"
              >
                {isSubmitting ? 'PURGING...' : 'ABORT MISSION'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create / Edit Mission Modal */}
      {isFormModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-spaceBlack/85 backdrop-blur-md overflow-y-auto animate-in fade-in">
          <div className="w-full max-w-2xl bg-deepNavy border border-panelBorder rounded-3xl shadow-2xl overflow-hidden my-8">
            
            <div className="bg-spaceBlack/90 p-5 border-b border-panelBorder flex items-center justify-between">
              <div>
                <span className="font-mono text-[10px] text-crewYellow uppercase font-bold tracking-widest">
                  {editingEvent ? 'CALIBRATE PARAMETERS' : 'DISPATCH NEW MISSION'}
                </span>
                <h2 className="font-heading font-black text-xl text-offWhite uppercase">
                  {editingEvent ? 'EDIT MISSION DIRECTIVE' : 'CREATE FLIGHT MISSION'}
                </h2>
              </div>
              <button
                onClick={() => setIsFormModalOpen(false)}
                className="p-1.5 rounded-lg bg-spaceBlack border border-panelBorder text-mutedGray hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveEvent} className="p-6 space-y-4 font-mono text-xs">
              
              {/* Mission Name */}
              <div>
                <label className="block text-mutedGray font-bold uppercase mb-1">
                  Mission Name *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. COOK-OFF // SPEED BLITZ ARENA"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-spaceBlack/80 border border-panelBorder text-offWhite focus:outline-none focus:border-crewRed"
                />
                {formErrors.name && <p className="text-crewRed text-[11px] mt-1">{formErrors.name}</p>}
              </div>

              {/* Sector & Edition */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-mutedGray font-bold uppercase mb-1">
                    Sector Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as EventCategory)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-spaceBlack/80 border border-panelBorder text-offWhite focus:outline-none focus:border-crewRed"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-mutedGray font-bold uppercase mb-1">
                    Mission Code / Edition
                  </label>
                  <input
                    type="text"
                    value={edition}
                    onChange={(e) => setEdition(e.target.value)}
                    placeholder="MISSION // 01"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-spaceBlack/80 border border-panelBorder text-offWhite focus:outline-none focus:border-crewRed"
                  />
                </div>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-mutedGray font-bold uppercase mb-1">
                    Launch Date (YYYY-MM-DD) *
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-spaceBlack/80 border border-panelBorder text-offWhite focus:outline-none focus:border-crewRed"
                  />
                  {formErrors.date && <p className="text-crewRed text-[11px] mt-1">{formErrors.date}</p>}
                </div>

                <div>
                  <label className="block text-mutedGray font-bold uppercase mb-1">
                    Time Schedule *
                  </label>
                  <input
                    type="text"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    placeholder="05:00 PM - 07:00 PM"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-spaceBlack/80 border border-panelBorder text-offWhite focus:outline-none focus:border-crewRed"
                  />
                  {formErrors.time && <p className="text-crewRed text-[11px] mt-1">{formErrors.time}</p>}
                </div>
              </div>

              {/* Venue Coordinates & Capacity */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-mutedGray font-bold uppercase mb-1">
                    Coordinates / Venue *
                  </label>
                  <input
                    type="text"
                    value={venue}
                    onChange={(e) => setVenue(e.target.value)}
                    placeholder="ABESEC CSE Lab 3 / Discord Deck"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-spaceBlack/80 border border-panelBorder text-offWhite focus:outline-none focus:border-crewRed"
                  />
                  {formErrors.venue && <p className="text-crewRed text-[11px] mt-1">{formErrors.venue}</p>}
                </div>

                <div>
                  <label className="block text-mutedGray font-bold uppercase mb-1">
                    Cadet Capacity *
                  </label>
                  <input
                    type="number"
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value)}
                    min="1"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-spaceBlack/80 border border-panelBorder text-offWhite focus:outline-none focus:border-crewRed"
                  />
                  {formErrors.capacity && <p className="text-crewRed text-[11px] mt-1">{formErrors.capacity}</p>}
                </div>
              </div>

              {/* Registration Deadline & Image URL */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-mutedGray font-bold uppercase mb-1">
                    Boarding Deadline *
                  </label>
                  <input
                    type="date"
                    value={registrationDeadline}
                    onChange={(e) => setRegistrationDeadline(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-spaceBlack/80 border border-panelBorder text-offWhite focus:outline-none focus:border-crewRed"
                  />
                  {formErrors.registrationDeadline && (
                    <p className="text-crewRed text-[11px] mt-1">{formErrors.registrationDeadline}</p>
                  )}
                </div>

                <div>
                  <label className="block text-mutedGray font-bold uppercase mb-1">
                    Cockpit Visor Image URL *
                  </label>
                  <input
                    type="url"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="https://..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-spaceBlack/80 border border-panelBorder text-offWhite focus:outline-none focus:border-crewRed"
                  />
                  {formErrors.image && <p className="text-crewRed text-[11px] mt-1">{formErrors.image}</p>}
                </div>
              </div>

              {/* Description Briefing */}
              <div>
                <label className="block text-mutedGray font-bold uppercase mb-1">
                  Mission Intel & Directives *
                </label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Outline the algorithmic focus, challenge format, and prizes..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-spaceBlack/80 border border-panelBorder text-offWhite focus:outline-none focus:border-crewRed"
                />
                {formErrors.description && (
                  <p className="text-crewRed text-[11px] mt-1">{formErrors.description}</p>
                )}
              </div>

              {/* Featured Mission Switch */}
              <div className="p-3.5 rounded-xl bg-spaceBlack/60 border border-panelBorder flex items-center justify-between">
                <div>
                  <div className="text-offWhite font-bold">Featured Mission</div>
                  <div className="text-[10px] text-mutedGray">Highlight on Mission Control cockpit hero</div>
                </div>
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="w-4 h-4 accent-crewRed rounded cursor-pointer"
                />
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-panelBorder flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsFormModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-spaceBlack border border-panelBorder text-mutedGray hover:text-white"
                >
                  ABORT
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 rounded-xl bg-crewRed text-white font-bold hover:bg-darkRed transition-colors glow-red shadow-lg disabled:opacity-50"
                >
                  {isSubmitting ? 'TRANSMITTING...' : editingEvent ? 'SAVE PARAMETERS' : 'PUBLISH TO RADAR'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};
