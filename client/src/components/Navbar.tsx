import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Menu, 
  X, 
  ShieldCheck, 
  Terminal, 
  Megaphone, 
  Radio, 
  Sparkles 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { SecretMissionBadge } from './DecorativeElements';

interface NavbarProps {
  currentTab: string;
  onNavigate: (tab: string, eventId?: string) => void;
  onOpenSearch?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onNavigate,
  onOpenSearch
}) => {
  const { isAuthenticated } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'HOME' },
    { id: 'events', label: 'MISSIONS' },
    { id: 'crew', label: 'CREW' },
    { id: 'achievements', label: 'ACHIEVEMENTS' },
    { id: 'about', label: 'ABOUT' },
  ];

  const handleLinkClick = (tabId: string) => {
    onNavigate(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-spaceBlack/95 backdrop-blur-md shadow-2xl border-b border-panelBorder py-3'
          : 'bg-spaceBlack/80 backdrop-blur-sm border-b border-panelBorder/60 py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* LEFT: CodeChef ABESEC Brand with Visor Glow */}
          <button
            onClick={() => handleLinkClick('home')}
            className="group flex items-center gap-3 text-left focus-visible:outline-none"
            aria-label="CodeChef ABESEC Home"
          >
            {/* Spaceship Monogram Box */}
            <div className="w-10 h-10 rounded-xl bg-deepNavy border border-crewRed/60 flex items-center justify-center text-white shadow-md group-hover:border-crewRed group-hover:scale-105 transition-all glow-red">
              <span className="font-heading font-black text-xl tracking-tighter text-crewRed">C</span>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-heading font-black text-xl sm:text-2xl tracking-tight text-offWhite group-hover:text-crewRed transition-colors">
                  CODECHEF
                </span>
                <span className="font-mono text-xs font-bold text-crewCyan bg-deepNavy px-1.5 py-0.5 rounded border border-crewCyan/30">
                  ABESEC
                </span>
              </div>
              <span className="font-mono text-[9px] uppercase tracking-widest text-mutedGray -mt-0.5 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-crewRed animate-pulse" />
                THE CODING CREW // CHAPTER 26
              </span>
            </div>
          </button>

          {/* CENTER: Futuristic Spaceship Console Links (Desktop) */}
          <nav
            className="hidden lg:flex items-center gap-1 bg-deepNavy/80 px-4 py-1.5 rounded-2xl border border-panelBorder shadow-inner backdrop-blur-md"
            aria-label="Spaceship Flight Navigation"
          >
            {navLinks.map((link) => {
              const isActive = currentTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold tracking-wider transition-all ${
                    isActive
                      ? 'bg-crewRed text-white shadow-sm glow-red'
                      : 'text-offWhite/75 hover:text-white hover:bg-spaceNavy'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* RIGHT: Actions (Desktop) */}
          <div className="hidden md:flex items-center gap-3">
            {/* Quick Search trigger */}
            {onOpenSearch && (
              <button
                onClick={onOpenSearch}
                aria-label="Search missions"
                className="p-2.5 rounded-xl text-mutedGray hover:text-crewCyan hover:bg-deepNavy border border-panelBorder transition-colors"
                title="Search missions"
              >
                <Search className="w-4 h-4" />
              </button>
            )}

            {/* Admin Mission Control Link */}
            <button
              onClick={() => handleLinkClick(isAuthenticated ? 'admin-dashboard' : 'admin-login')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono font-bold tracking-wider transition-all border ${
                currentTab.startsWith('admin')
                  ? 'bg-crewRed text-white border-crewRed glow-red'
                  : 'bg-deepNavy/80 text-mutedGray hover:text-offWhite border-panelBorder hover:border-crewCyan/40'
              }`}
              title={isAuthenticated ? 'Admin Mission Control (Logged In)' : 'Admin Portal Login'}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-crewCyan" />
              <span>ADMIN</span>
              {isAuthenticated && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse ml-0.5" title="Logged In" />
              )}
            </button>
          </div>

          {/* Mobile Actions & Hamburger */}
          <div className="flex md:hidden items-center gap-2">
            {/* Quick Admin Button on Mobile */}
            <button
              onClick={() => handleLinkClick(isAuthenticated ? 'admin-dashboard' : 'admin-login')}
              aria-label="Admin Portal"
              title="Admin Portal"
              className={`p-2 rounded-xl border font-mono text-xs font-bold transition-colors flex items-center gap-1 ${
                currentTab.startsWith('admin')
                  ? 'bg-crewRed text-white border-crewRed'
                  : 'bg-deepNavy text-mutedGray hover:text-white border-panelBorder'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-crewCyan" />
              <span className="text-[10px]">ADMIN</span>
              {isAuthenticated && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              )}
            </button>

            {onOpenSearch && (
              <button
                onClick={onOpenSearch}
                aria-label="Search missions"
                className="p-2 rounded-xl text-mutedGray hover:text-white bg-deepNavy border border-panelBorder"
              >
                <Search className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
              className="p-2 rounded-xl bg-deepNavy border border-panelBorder text-offWhite hover:text-crewRed transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer (Spaceship Console Style) */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-panelBorder bg-spaceBlack/98 px-4 pt-4 pb-6 shadow-2xl animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const isActive = currentTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-mono font-bold tracking-wider text-left transition-colors ${
                    isActive
                      ? 'bg-crewRed text-white glow-red'
                      : 'text-offWhite/80 hover:bg-deepNavy'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && <Radio className="w-4 h-4 text-crewCyan animate-pulse" />}
                </button>
              );
            })}

            <div className="pt-3 mt-2 border-t border-panelBorder/60 flex flex-col gap-2.5">
              <button
                onClick={() => handleLinkClick('events')}
                className="w-full flex items-center justify-center gap-2 bg-crewRed text-white py-3 rounded-xl font-mono text-xs font-bold uppercase tracking-wider glow-red"
              >
                <span>JOIN THE CREW → EXPLORE MISSIONS</span>
              </button>

              <button
                onClick={() => handleLinkClick(isAuthenticated ? 'admin-dashboard' : 'admin-login')}
                className="w-full flex items-center justify-center gap-2 bg-deepNavy text-offWhite hover:text-white py-2.5 rounded-xl font-mono text-xs font-bold border border-panelBorder"
              >
                <ShieldCheck className="w-4 h-4 text-crewCyan" />
                <span>{isAuthenticated ? 'ADMIN MISSION CONTROL (LOGGED IN)' : 'ADMIN LOGIN'}</span>
                {isAuthenticated && (
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse ml-1" />
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
