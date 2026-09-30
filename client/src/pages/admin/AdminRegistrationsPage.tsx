import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, 
  Download, 
  Filter, 
  Users, 
  Ticket, 
  Calendar, 
  Phone, 
  Mail, 
  X, 
  CheckCircle2, 
  FileSpreadsheet, 
  Eye, 
  ArrowUpDown,
  Terminal,
  ShieldCheck
} from 'lucide-react';
import { RegistrationItem, EventItem } from '../../types';
import { api } from '../../services/api';
import { useToast } from '../../context/ToastContext';
import { SecretMissionBadge } from '../../components/DecorativeElements';

interface AdminRegistrationsPageProps {
  events: EventItem[];
}

export const AdminRegistrationsPage: React.FC<AdminRegistrationsPageProps> = ({ events }) => {
  const { showToast } = useToast();

  const [registrations, setRegistrations] = useState<RegistrationItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEventId, setSelectedEventId] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');

  // Detail Modal
  const [activeReg, setActiveReg] = useState<RegistrationItem | null>(null);

  const fetchRegistrations = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await api.getRegistrations();
      if (res.success && res.data) {
        setRegistrations(res.data);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load registrations.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  // Filtered & Searched Registrations
  const filteredRegistrations = useMemo(() => {
    return registrations.filter((r) => {
      // Mission filter
      if (selectedEventId !== 'all' && r.eventId !== selectedEventId) {
        return false;
      }

      // Year filter
      if (selectedYear !== 'all') {
        const yr = r.collegeYear || r.year || '';
        if (!yr.toLowerCase().includes(selectedYear.toLowerCase())) {
          return false;
        }
      }

      // Search crew by name, email, phone, ticket ID
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        return (
          r.name.toLowerCase().includes(q) ||
          r.email.toLowerCase().includes(q) ||
          r.phone.toLowerCase().includes(q) ||
          (r.ticketId && r.ticketId.toLowerCase().includes(q)) ||
          r.eventName.toLowerCase().includes(q)
        );
      }

      return true;
    });
  }, [registrations, selectedEventId, selectedYear, searchQuery]);

  // Export to CSV Function
  const exportToCSV = () => {
    if (filteredRegistrations.length === 0) {
      showToast('error', 'EXPORT FAILED', 'No crew registrations to export.');
      return;
    }

    const headers = [
      'Ticket Code',
      'Cadet Name',
      'Email',
      'Phone',
      'College / Year',
      'Mission',
      'Registration Date'
    ];

    const rows = filteredRegistrations.map((r) => [
      r.ticketId,
      `"${r.name.replace(/"/g, '""')}"`,
      r.email,
      r.phone,
      `"${(r.collegeYear || r.year || '').replace(/"/g, '""')}"`,
      `"${r.eventName.replace(/"/g, '""')}"`,
      r.registeredAt || r.registrationDate || ''
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute(
      'download',
      `codechef_abesec_crew_manifest_${new Date().toISOString().split('T')[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast('success', 'MANIFEST DOWNLOADED', `${filteredRegistrations.length} cadet records exported.`);
  };

  return (
    <div className="space-y-8 font-sans">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-panelBorder pb-6">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-crewYellow font-bold uppercase tracking-widest">
            <Users className="w-3.5 h-3.5 text-crewYellow" />
            <span>CADET FLIGHT ROSTER</span>
          </div>
          <h1 className="font-heading font-black text-3xl sm:text-4xl text-offWhite uppercase tracking-tight mt-1">
            CREW REGISTRATIONS
          </h1>
          <p className="text-xs sm:text-sm text-mutedGray mt-1">
            Track student enrollment passes, verify digital ticket tokens, and download manifests.
          </p>
        </div>

        <button
          onClick={exportToCSV}
          className="flex items-center gap-2 bg-deepNavy hover:bg-spaceNavy text-offWhite px-4 py-2.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all border border-panelBorder hover:border-crewCyan/50 shadow-sm"
        >
          <Download className="w-4 h-4 text-crewCyan" />
          <span>EXPORT CSV MANIFEST</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 bg-deepNavy p-4 rounded-2xl border border-panelBorder">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-mutedGray absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search crew by name, email, phone or ticket code..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-spaceBlack/80 border border-panelBorder text-xs font-mono text-offWhite placeholder-mutedGray/50 focus:outline-none focus:border-crewRed"
          />
        </div>

        {/* Filter by Mission */}
        <div className="w-full md:w-56">
          <select
            value={selectedEventId}
            onChange={(e) => setSelectedEventId(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-spaceBlack/80 border border-panelBorder text-xs font-mono text-offWhite focus:outline-none focus:border-crewRed"
          >
            <option value="all">ALL MISSIONS</option>
            {events.map((evt) => (
              <option key={evt.id} value={evt.id}>
                {evt.name}
              </option>
            ))}
          </select>
        </div>

        {/* Filter by Academic Year */}
        <div className="w-full md:w-44">
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-spaceBlack/80 border border-panelBorder text-xs font-mono text-offWhite focus:outline-none focus:border-crewRed"
          >
            <option value="all">ALL YEARS</option>
            <option value="1st">1st Year</option>
            <option value="2nd">2nd Year</option>
            <option value="3rd">3rd Year</option>
            <option value="4th">4th Year</option>
          </select>
        </div>
      </div>

      {/* Registrations Table */}
      <div className="bg-deepNavy rounded-2xl border border-panelBorder overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="bg-spaceBlack/90 text-mutedGray uppercase tracking-wider text-[11px] border-b border-panelBorder">
                <th className="py-3.5 px-4">Cadet Name</th>
                <th className="py-3.5 px-4">Email</th>
                <th className="py-3.5 px-4">College / Year</th>
                <th className="py-3.5 px-4">Phone</th>
                <th className="py-3.5 px-4">Mission</th>
                <th className="py-3.5 px-4">Registration Date</th>
                <th className="py-3.5 px-4 text-right">Pass</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-panelBorder/60">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-mutedGray">
                    SCANNING CREW MANIFEST...
                  </td>
                </tr>
              ) : filteredRegistrations.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-mutedGray">
                    NO CREW REGISTRATIONS FOUND.
                  </td>
                </tr>
              ) : (
                filteredRegistrations.map((reg) => (
                  <tr key={reg.id} className="hover:bg-spaceNavy/50 transition-colors">
                    {/* Name */}
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-offWhite">{reg.name}</div>
                      <div className="text-[10px] text-crewCyan font-mono">{reg.ticketId}</div>
                    </td>

                    {/* Email */}
                    <td className="py-3.5 px-4 text-mutedGray truncate max-w-[180px]">
                      {reg.email}
                    </td>

                    {/* College & Year */}
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded bg-spaceBlack border border-panelBorder text-crewYellow font-bold text-[10px]">
                        {reg.collegeYear || reg.year || 'ABESEC'}
                      </span>
                    </td>

                    {/* Phone */}
                    <td className="py-3.5 px-4 text-mutedGray">
                      {reg.phone}
                    </td>

                    {/* Mission Name */}
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-offWhite truncate max-w-[180px]">
                        {reg.eventName}
                      </div>
                    </td>

                    {/* Registration Date */}
                    <td className="py-3.5 px-4 text-mutedGray">
                      {reg.registeredAt?.split('T')[0] || reg.registrationDate?.split('T')[0] || 'RECENT'}
                    </td>

                    {/* Action: Inspect Pass */}
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => setActiveReg(reg)}
                        className="p-1.5 rounded-lg bg-spaceBlack border border-panelBorder text-mutedGray hover:text-crewCyan hover:border-crewCyan/50 transition-colors"
                        title="Inspect Cadet Pass"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Cadet Pass Details Modal */}
      {activeReg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-spaceBlack/85 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-md bg-deepNavy border-2 border-crewRed/60 rounded-3xl p-6 shadow-2xl space-y-4 glow-red">
            
            <div className="flex items-center justify-between border-b border-panelBorder pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-crewRed/20 border border-crewRed flex items-center justify-center text-crewRed">
                  <Ticket className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-mono text-[9px] uppercase tracking-widest text-crewYellow font-bold">
                    VERIFIED CREW PASS
                  </span>
                  <h3 className="font-heading font-black text-lg text-offWhite uppercase">
                    {activeReg.ticketId}
                  </h3>
                </div>
              </div>

              <button
                onClick={() => setActiveReg(null)}
                className="p-1.5 rounded-lg bg-spaceBlack border border-panelBorder text-mutedGray hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-spaceBlack/80 border border-panelBorder space-y-3 font-mono text-xs">
              <div>
                <span className="text-mutedGray text-[10px] uppercase">Cadet Name</span>
                <div className="text-offWhite font-bold text-sm">{activeReg.name}</div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-mutedGray text-[10px] uppercase">Email</span>
                  <div className="text-offWhite truncate">{activeReg.email}</div>
                </div>
                <div>
                  <span className="text-mutedGray text-[10px] uppercase">Phone</span>
                  <div className="text-offWhite">{activeReg.phone}</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-mutedGray text-[10px] uppercase">College / Year</span>
                  <div className="text-crewYellow">{activeReg.collegeYear || activeReg.year}</div>
                </div>
                <div>
                  <span className="text-mutedGray text-[10px] uppercase">Status</span>
                  <div className="text-emerald-400 font-bold">MISSION ACCEPTED ✓</div>
                </div>
              </div>
              <div className="pt-2 border-t border-panelBorder">
                <span className="text-mutedGray text-[10px] uppercase">Assigned Mission</span>
                <div className="text-crewCyan font-bold">{activeReg.eventName}</div>
              </div>
            </div>

            <div className="pt-2 flex justify-end font-mono text-xs">
              <button
                onClick={() => setActiveReg(null)}
                className="px-4 py-2 rounded-xl bg-spaceBlack border border-panelBorder text-mutedGray hover:text-offWhite"
              >
                CLOSE DOSSIER
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
