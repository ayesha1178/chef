import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  CalendarDays, 
  Users, 
  Settings, 
  LogOut, 
  ExternalLink, 
  Menu, 
  X, 
  ShieldCheck, 
  Terminal, 
  Radio, 
  Activity 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { SecretMissionBadge, CrewmateIllustration } from '../../components/DecorativeElements';

interface AdminLayoutProps {
  currentTab: string;
  onNavigateTab: (tab: string) => void;
  onExitAdmin: () => void;
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  currentTab,
  onNavigateTab,
  onExitAdmin,
  children
}) => {
  const { admin, logout } = useAuth();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const menuItems = [
    { id: 'admin-dashboard', label: 'MISSION CONTROL', icon: LayoutDashboard },
    { id: 'admin-events', label: 'ACTIVE MISSIONS', icon: CalendarDays },
    { id: 'admin-registrations', label: 'CREW REGISTRATIONS', icon: Users },
    { id: 'admin-settings', label: 'SYSTEM TELEMETRY', icon: Settings },
  ];

  const handleSelectTab = (tabId: string) => {
    onNavigateTab(tabId);
    setMobileSidebarOpen(false);
  };

  const handleLogout = () => {
    logout();
    onExitAdmin();
  };

  return (
    <div className="min-h-screen bg-spaceBlack flex flex-col md:flex-row text-offWhite font-sans">
      
      {/* ========================================================
          SIDEBAR (Deep Space Cockpit) - Desktop
         ======================================================== */}
      <aside className="hidden md:flex flex-col w-64 lg:w-72 bg-deepNavy text-offWhite shrink-0 border-r border-panelBorder justify-between p-6">
        <div className="space-y-8">
          
          {/* Brand header */}
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-spaceBlack border border-crewRed/60 flex items-center justify-center font-heading font-black text-crewRed text-base glow-red">
                C
              </div>
              <span className="font-heading font-black text-xl text-offWhite tracking-tight">
                CODECHEF <span className="text-crewRed">ABESEC</span>
              </span>
            </div>
            <div className="font-mono text-[9px] text-crewCyan tracking-widest uppercase flex items-center gap-1.5 pt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-crewRed animate-ping" />
              MISSION CONTROL // FLIGHT DECK
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5" aria-label="Mission Control Navigation">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-mono font-bold tracking-wider transition-all text-left ${
                    isActive
                      ? 'bg-crewRed text-white shadow-md glow-red border border-crewRed/60'
                      : 'text-mutedGray hover:text-offWhite hover:bg-spaceNavy'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-crewYellow' : 'text-crewCyan'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Officer Profile & Exit Controls */}
        <div className="pt-6 border-t border-panelBorder space-y-4">
          <div className="flex items-center gap-3 px-2">
            <div className="w-9 h-9 rounded-full bg-spaceBlack border border-crewCyan/40 flex items-center justify-center font-mono text-xs font-bold text-crewCyan">
              CC
            </div>
            <div className="truncate flex-1">
              <div className="text-xs font-mono font-bold text-offWhite truncate">
                {admin?.name || 'Mission Officer'}
              </div>
              <div className="text-[10px] font-mono text-crewYellow truncate">
                {admin?.role || 'Flight Commander'}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onExitAdmin}
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-spaceBlack border border-panelBorder text-xs font-mono text-mutedGray hover:text-offWhite hover:border-crewCyan/40 transition-colors"
              title="Return to Public Website"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Public Deck</span>
            </button>

            <button
              onClick={handleLogout}
              className="p-2 rounded-xl bg-crewRed/20 border border-crewRed/40 text-crewRed hover:bg-crewRed hover:text-white transition-colors"
              title="Terminate Clearance (Log Out)"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* ========================================================
          MOBILE TOP BAR (Small Screens)
         ======================================================== */}
      <header className="md:hidden bg-deepNavy border-b border-panelBorder p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-spaceBlack border border-crewRed/50 flex items-center justify-center font-heading font-black text-crewRed text-sm">
            C
          </div>
          <div>
            <span className="font-heading font-black text-sm text-offWhite">
              CODECHEF ABESEC
            </span>
            <div className="font-mono text-[9px] text-crewYellow uppercase">
              MISSION CONTROL
            </div>
          </div>
        </div>

        <button
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="p-2 rounded-xl bg-spaceBlack border border-panelBorder text-offWhite"
          aria-label="Toggle mobile menu"
        >
          {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileSidebarOpen && (
        <div className="md:hidden bg-deepNavy border-b border-panelBorder p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelectTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-mono font-bold tracking-wider text-left ${
                  isActive ? 'bg-crewRed text-white glow-red' : 'text-mutedGray hover:bg-spaceNavy'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}

          <div className="pt-2 border-t border-panelBorder flex gap-2">
            <button
              onClick={onExitAdmin}
              className="flex-1 py-2 rounded-xl bg-spaceBlack text-xs font-mono text-mutedGray border border-panelBorder"
            >
              Public Deck
            </button>
            <button
              onClick={handleLogout}
              className="py-2 px-4 rounded-xl bg-crewRed text-xs font-mono text-white"
            >
              Log Out
            </button>
          </div>
        </div>
      )}

      {/* ========================================================
          MAIN CONTENT REGION
         ======================================================== */}
      <main className="flex-1 overflow-y-auto min-h-[calc(100vh-64px)] md:min-h-screen bg-spaceBlack p-4 sm:p-8 lg:p-10">
        <div className="max-w-6xl mx-auto space-y-8">
          {children}
        </div>
      </main>

    </div>
  );
};
