import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Users, 
  TrendingUp, 
  Clock, 
  Plus, 
  ArrowRight, 
  CheckCircle2, 
  RotateCcw, 
  Layers,
  Terminal,
  ShieldCheck,
  Activity,
  AlertTriangle,
  ExternalLink
} from 'lucide-react';
import { DashboardStats } from '../../types';
import { api } from '../../services/api';
import { SecretMissionBadge, MissionModulePill } from '../../components/DecorativeElements';

interface AdminDashboardOverviewProps {
  onNavigateTab: (tab: string) => void;
  onOpenCreateEvent: () => void;
}

export const AdminDashboardOverview: React.FC<AdminDashboardOverviewProps> = ({
  onNavigateTab,
  onOpenCreateEvent
}) => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadStats() {
      setIsLoading(true);
      setError(null);
      try {
        const res = await api.getDashboardStats();
        if (res.success && res.data) {
          setStats(res.data);
        }
      } catch (err: any) {
        setError(err.message || 'Failed to fetch mission telemetry.');
      } finally {
        setIsLoading(false);
      }
    }

    loadStats();
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="h-10 bg-deepNavy rounded-xl w-64" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-32 bg-deepNavy rounded-2xl border border-panelBorder" />
          ))}
        </div>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="p-8 bg-crewRed/20 border border-crewRed rounded-2xl text-center space-y-3">
        <p className="text-offWhite text-sm font-mono">[!] {error || 'Unable to compute mission statistics.'}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-crewRed text-white rounded-xl text-xs font-mono font-bold"
        >
          RETRY TELEMETRY
        </button>
      </div>
    );
  }

  const occupancyRate = stats.totalCapacity > 0 
    ? Math.round((stats.totalRegistrations / stats.totalCapacity) * 100)
    : 0;

  return (
    <div className="space-y-8 font-sans">
      
      {/* Top Banner & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-panelBorder pb-6">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-crewRed font-bold uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-crewRed animate-ping" />
            <span>FLIGHT TELEMETRY // REAL-TIME</span>
          </div>
          <h1 className="font-heading font-black text-3xl sm:text-4xl text-offWhite uppercase tracking-tight mt-1">
            MISSION CONTROL
          </h1>
          <p className="text-xs sm:text-sm text-mutedGray mt-1">
            Spaceship operational pulse, active missions, and crew cadet registrations.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenCreateEvent}
            className="flex items-center gap-2 bg-crewRed hover:bg-darkRed text-white px-4 py-2.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-md glow-red border border-crewRed/60"
          >
            <Plus className="w-4 h-4 text-crewYellow" />
            <span>+ CREATE MISSION</span>
          </button>
        </div>
      </div>

      {/* Primary Telemetry Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        {/* Card 1: Total Active Missions */}
        <div className="p-5 rounded-2xl bg-deepNavy border border-panelBorder space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-wider text-mutedGray">
              ACTIVE MISSIONS
            </span>
            <div className="p-2 rounded-xl bg-spaceBlack/60 border border-panelBorder">
              <Calendar className="w-4 h-4 text-crewCyan" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-heading font-black text-3xl text-offWhite">
              {stats.totalEvents}
            </span>
            <span className="font-mono text-xs text-mutedGray">EXPEDITIONS</span>
          </div>
          <div className="text-[11px] font-mono text-crewCyan flex items-center gap-1">
            <span>{stats.upcomingEventsCount} UPCOMING ON RADAR</span>
          </div>
        </div>

        {/* Card 2: Crew Registrations */}
        <div className="p-5 rounded-2xl bg-deepNavy border border-panelBorder space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-wider text-mutedGray">
              CREW REGISTRATIONS
            </span>
            <div className="p-2 rounded-xl bg-spaceBlack/60 border border-panelBorder">
              <Users className="w-4 h-4 text-crewYellow" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-heading font-black text-3xl text-offWhite">
              {stats.totalRegistrations}
            </span>
            <span className="font-mono text-xs text-mutedGray">CADETS</span>
          </div>
          <div className="text-[11px] font-mono text-crewYellow flex items-center gap-1">
            <span>OFFICIAL PASSES ISSUED</span>
          </div>
        </div>

        {/* Card 3: Berths Capacity Occupancy */}
        <div className="p-5 rounded-2xl bg-deepNavy border border-panelBorder space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-wider text-mutedGray">
              BERTHS OCCUPANCY
            </span>
            <div className="p-2 rounded-xl bg-spaceBlack/60 border border-panelBorder">
              <TrendingUp className="w-4 h-4 text-crewRed" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-heading font-black text-3xl text-crewRed">
              {occupancyRate}%
            </span>
            <span className="font-mono text-xs text-mutedGray">FILLED</span>
          </div>
          <div className="text-[11px] font-mono text-mutedGray">
            {stats.totalCapacity - stats.totalRegistrations} VACANCIES REMAINING
          </div>
        </div>

        {/* Card 4: Spaceship System Health */}
        <div className="p-5 rounded-2xl bg-deepNavy border border-panelBorder space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-wider text-mutedGray">
              SYSTEM STATUS
            </span>
            <div className="p-2 rounded-xl bg-spaceBlack/60 border border-panelBorder">
              <Activity className="w-4 h-4 text-emerald-400" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-heading font-black text-3xl text-emerald-400">
              100%
            </span>
            <span className="font-mono text-xs text-mutedGray">NOMINAL</span>
          </div>
          <div className="text-[11px] font-mono text-emerald-400 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>RADAR & COMMS ONLINE</span>
          </div>
        </div>

      </div>

      {/* Two Column Layout: Active Missions Table & Quick Registrations */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Active Missions Manifest (8 cols) */}
        <div className="lg:col-span-8 p-6 rounded-2xl bg-deepNavy border border-panelBorder space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="font-mono text-xs uppercase tracking-widest text-crewCyan font-bold">
                MISSION MANIFEST
              </span>
              <h2 className="font-heading font-black text-xl text-offWhite uppercase">
                ACTIVE MISSIONS
              </h2>
            </div>

            <button
              onClick={() => onNavigateTab('admin-events')}
              className="text-xs font-mono text-crewCyan hover:text-white flex items-center gap-1 transition-colors"
            >
              <span>MANAGE ALL</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead>
                <tr className="border-b border-panelBorder text-mutedGray uppercase tracking-wider text-[11px]">
                  <th className="py-2.5 px-3">Mission Name</th>
                  <th className="py-2.5 px-3">Date</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3">Registrations</th>
                  <th className="py-2.5 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-panelBorder/60">
                {(stats.recentEvents || []).slice(0, 5).map((evt) => (
                  <tr key={evt.id} className="hover:bg-spaceNavy/50 transition-colors">
                    <td className="py-3 px-3">
                      <div className="font-bold text-offWhite truncate max-w-[200px]">{evt.name}</div>
                      <div className="text-[10px] text-crewCyan">{evt.category}</div>
                    </td>
                    <td className="py-3 px-3 text-mutedGray">{evt.date}</td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-crewRed/20 text-crewYellow border border-crewRed/30">
                        {evt.status || 'OPEN'}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <span className="text-offWhite font-bold">{evt.registrationsCount || 0}</span>
                      <span className="text-mutedGray"> / {evt.capacity}</span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => onNavigateTab('admin-events')}
                        className="text-crewCyan hover:text-white underline text-[11px]"
                      >
                        EDIT / VIEW
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Crew Registrations Quick View (4 cols) */}
        <div className="lg:col-span-4 p-6 rounded-2xl bg-deepNavy border border-panelBorder space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="font-mono text-xs uppercase tracking-widest text-crewYellow font-bold">
                CADET ASSIGNMENTS
              </span>
              <h2 className="font-heading font-black text-xl text-offWhite uppercase">
                CREW REGISTRATIONS
              </h2>
            </div>

            <button
              onClick={() => onNavigateTab('admin-registrations')}
              className="text-xs font-mono text-crewYellow hover:text-white flex items-center gap-1 transition-colors"
            >
              <span>VIEW ALL</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {stats.recentRegistrations.length === 0 ? (
              <div className="text-center py-8 text-xs font-mono text-mutedGray">
                NO CADET REGISTRATIONS LOGGED YET.
              </div>
            ) : (
              stats.recentRegistrations.slice(0, 5).map((reg) => (
                <div
                  key={reg.id}
                  className="p-3 rounded-xl bg-spaceBlack/60 border border-panelBorder space-y-1 font-mono text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-offWhite truncate">{reg.name}</span>
                    <span className="text-[10px] text-crewYellow px-1.5 py-0.2 rounded bg-deepNavy border border-panelBorder">
                      {reg.year}
                    </span>
                  </div>
                  <div className="text-[11px] text-crewCyan truncate">{reg.eventName}</div>
                  <div className="text-[10px] text-mutedGray flex items-center justify-between">
                    <span>{reg.email}</span>
                    <span>{reg.registrationDate?.split('T')[0] || 'RECENT'}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
