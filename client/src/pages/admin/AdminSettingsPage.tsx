import React, { useState } from 'react';
import { 
  Database, 
  RotateCcw, 
  ShieldCheck, 
  Check, 
  AlertTriangle, 
  Server, 
  Save,
  Terminal,
  Activity
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';
import { useToast } from '../../context/ToastContext';
import { SecretMissionBadge } from '../../components/DecorativeElements';

interface AdminSettingsPageProps {
  onDataReset: () => void;
}

export const AdminSettingsPage: React.FC<AdminSettingsPageProps> = ({ onDataReset }) => {
  const { admin } = useAuth();
  const { showToast } = useToast();

  const [clubName, setClubName] = useState('CODECHEF ABESEC');
  const [tagline, setTagline] = useState('CODE. COMPETE. COLLABORATE.');
  const [collegeName, setCollegeName] = useState('ABES Engineering College, Ghaziabad');
  const [contactEmail, setContactEmail] = useState('crew@codechefabesec.in');

  const [isResetting, setIsResetting] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleSaveClubInfo = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('success', 'TELEMETRY CALIBRATED', 'CodeChef ABESEC flight parameters saved.');
  };

  const handleResetData = async () => {
    setIsResetting(true);
    try {
      await api.resetData();
      showToast('success', 'SPACESHIP RE-INITIALIZED', 'Demonstration missions and cadet registrations restored to default flight log.');
      setShowResetConfirm(false);
      onDataReset();
    } catch (err: any) {
      showToast('error', 'RESET FAILED', err.message);
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl font-sans">
      
      {/* Header */}
      <div className="border-b border-panelBorder pb-6">
        <div className="flex items-center gap-2 font-mono text-xs text-crewCyan font-bold uppercase tracking-widest">
          <Terminal className="w-3.5 h-3.5 text-crewCyan" />
          <span>FLIGHT CONFIGURATION & DATABASE</span>
        </div>
        <h1 className="font-heading font-black text-3xl sm:text-4xl text-offWhite uppercase tracking-tight mt-1">
          SYSTEM TELEMETRY
        </h1>
        <p className="text-xs sm:text-sm text-mutedGray mt-1">
          Configure chapter branding parameters, monitor storage telemetry, or restore seed missions.
        </p>
      </div>

      {/* Admin Officer Profile Box */}
      <div className="bg-deepNavy p-6 rounded-2xl border border-panelBorder space-y-4">
        <div className="flex items-center gap-2 border-b border-panelBorder/70 pb-3">
          <ShieldCheck className="w-4 h-4 text-crewRed" />
          <h2 className="font-heading font-bold text-base text-offWhite uppercase">
            AUTHENTICATED FLIGHT OFFICER
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
          <div className="bg-spaceBlack/60 p-3.5 rounded-xl border border-panelBorder">
            <span className="text-mutedGray text-[10px] block uppercase">Officer Name</span>
            <span className="font-bold text-offWhite">{admin?.name || 'CodeChef Officer'}</span>
          </div>

          <div className="bg-spaceBlack/60 p-3.5 rounded-xl border border-panelBorder">
            <span className="text-mutedGray text-[10px] block uppercase">Officer Clearance</span>
            <span className="font-bold text-offWhite">{admin?.email || 'admin@codechefabesec.in'}</span>
          </div>

          <div className="bg-spaceBlack/60 p-3.5 rounded-xl border border-panelBorder">
            <span className="text-mutedGray text-[10px] block uppercase">Clearance Rank</span>
            <span className="font-bold text-crewYellow bg-deepNavy px-2 py-0.5 rounded border border-panelBorder inline-block mt-0.5">
              {admin?.role || 'FLIGHT COMMANDER'}
            </span>
          </div>
        </div>
      </div>

      {/* Chapter Branding Form */}
      <div className="bg-deepNavy p-6 rounded-2xl border border-panelBorder space-y-5">
        <div className="flex items-center gap-2 border-b border-panelBorder/70 pb-3">
          <Activity className="w-4 h-4 text-crewCyan" />
          <h2 className="font-heading font-bold text-base text-offWhite uppercase">
            CHAPTER BRANDING & METADATA
          </h2>
        </div>

        <form onSubmit={handleSaveClubInfo} className="space-y-4 font-mono text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-mutedGray font-bold uppercase mb-1">
                Chapter Name
              </label>
              <input
                type="text"
                value={clubName}
                onChange={(e) => setClubName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-spaceBlack/80 border border-panelBorder text-offWhite focus:outline-none focus:border-crewRed"
              />
            </div>

            <div>
              <label className="block text-mutedGray font-bold uppercase mb-1">
                Mission Tagline
              </label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-spaceBlack/80 border border-panelBorder text-offWhite focus:outline-none focus:border-crewRed"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-mutedGray font-bold uppercase mb-1">
                Campus Base
              </label>
              <input
                type="text"
                value={collegeName}
                onChange={(e) => setCollegeName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-spaceBlack/80 border border-panelBorder text-offWhite focus:outline-none focus:border-crewRed"
              />
            </div>

            <div>
              <label className="block text-mutedGray font-bold uppercase mb-1">
                Comms Dispatch Email
              </label>
              <input
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-spaceBlack/80 border border-panelBorder text-offWhite focus:outline-none focus:border-crewRed"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="flex items-center gap-2 bg-crewRed hover:bg-darkRed text-white px-5 py-2.5 rounded-xl font-bold uppercase tracking-wider transition-colors glow-red"
            >
              <Save className="w-3.5 h-3.5" />
              <span>SAVE CALIBRATION</span>
            </button>
          </div>
        </form>
      </div>

      {/* Database State & Reset */}
      <div className="bg-deepNavy p-6 rounded-2xl border border-panelBorder space-y-4">
        <div className="flex items-center gap-2 border-b border-panelBorder/70 pb-3">
          <Database className="w-4 h-4 text-crewYellow" />
          <h2 className="font-heading font-bold text-base text-offWhite uppercase">
            DATABASE TELEMETRY & RE-INITIALIZATION
          </h2>
        </div>

        <p className="text-xs text-mutedGray leading-relaxed font-mono">
          Restore the mission control database to official seed records (including live competitive arenas, workshops, hackathons, and cadet registrations).
        </p>

        {showResetConfirm ? (
          <div className="p-4 rounded-xl bg-crewRed/20 border border-crewRed space-y-3 font-mono text-xs">
            <div className="flex items-center gap-2 text-offWhite font-bold">
              <AlertTriangle className="w-4 h-4 text-crewYellow" />
              <span>CONFIRM FLIGHT LOG RE-INITIALIZATION?</span>
            </div>
            <p className="text-mutedGray text-[11px]">
              This will overwrite custom modifications and restore default CodeChef ABESEC missions.
            </p>
            <div className="flex gap-2">
              <button
                onClick={handleResetData}
                disabled={isResetting}
                className="px-4 py-2 rounded-lg bg-crewRed text-white font-bold hover:bg-darkRed transition-colors"
              >
                {isResetting ? 'RESTORING...' : 'CONFIRM RESTORE'}
              </button>
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2 rounded-lg bg-spaceBlack border border-panelBorder text-mutedGray hover:text-white"
              >
                CANCEL
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowResetConfirm(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-spaceBlack border border-panelBorder text-xs font-mono text-mutedGray hover:text-crewYellow hover:border-crewYellow/50 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>RESTORE DEMONSTRATION SEED MISSIONS</span>
          </button>
        )}
      </div>

    </div>
  );
};
