import React from 'react';
import { ArrowRight, Terminal, Radio, ShieldCheck, Megaphone, ExternalLink } from 'lucide-react';
import { CrewmateIllustration } from './DecorativeElements';

interface FooterProps {
  onNavigate: (tab: string) => void;
  onOpenEmergencyMeeting?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenEmergencyMeeting }) => {
  return (
    <footer className="bg-spaceBlack text-offWhite border-t border-panelBorder pt-16 pb-12 relative overflow-hidden">
      {/* Background Star Particles & Cockpit Grid */}
      <div className="absolute inset-0 bg-starfield opacity-40 pointer-events-none" />
      <div className="absolute inset-0 bg-radial-vignette pointer-events-none" />

      {/* Watermark in background */}
      <div className="absolute -right-8 -bottom-10 select-none pointer-events-none font-heading font-black text-[12vw] text-offWhite/[0.02] leading-none">
        CODECHEF
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Emergency Beacon Callout Banner */}
        <div className="mb-12 p-6 rounded-2xl bg-deepNavy/80 border border-crewRed/40 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 glow-red">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-12 h-12 rounded-xl bg-crewRed/20 border border-crewRed flex items-center justify-center shrink-0">
              <Megaphone className="w-6 h-6 text-crewYellow animate-pulse" />
            </div>
            <div>
              <div className="font-mono text-xs uppercase tracking-widest text-crewYellow font-bold flex items-center justify-center md:justify-start gap-2">
                <span className="w-2 h-2 rounded-full bg-crewRed animate-ping" />
                TRANSMISSION CHANNEL // OPEN
              </div>
              <h3 className="font-heading font-black text-xl text-offWhite tracking-tight">
                ENCOUNTERED A SYSTEM BUG OR CONTEST ISSUE?
              </h3>
              <p className="text-xs text-mutedGray">
                Dispatch an emergency alert directly to the CodeChef ABESEC Flight Mentors.
              </p>
            </div>
          </div>

          {onOpenEmergencyMeeting && (
            <button
              onClick={onOpenEmergencyMeeting}
              className="flex items-center gap-2 bg-gradient-to-r from-crewRed to-darkRed hover:from-darkRed hover:to-crewRed text-white px-5 py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider border border-crewRed/60 transition-all glow-red shrink-0 hover:scale-105"
            >
              <Megaphone className="w-4 h-4 text-crewYellow" />
              <span>CALL EMERGENCY MEETING</span>
            </button>
          )}
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-panelBorder/70">
          
          {/* Brand Info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-deepNavy border border-crewRed/60 flex items-center justify-center font-heading font-black text-crewRed text-xl glow-red">
                C
              </div>
              <div>
                <span className="font-heading font-black text-2xl tracking-tight text-offWhite">
                  CODECHEF <span className="text-crewRed">ABESEC</span>
                </span>
                <div className="font-mono text-[10px] text-mutedGray uppercase tracking-widest flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-crewCyan" />
                  THE CODING CREW // CHAPTER 26
                </div>
              </div>
            </div>

            <p className="font-mono text-xs uppercase tracking-widest text-crewYellow font-bold">
              CODE. COMPETE. COLLABORATE.
            </p>

            <p className="text-xs text-mutedGray max-w-sm leading-relaxed">
              CodeChef ABESEC is the premier competitive programming and engineering chapter at ABES Engineering College. We launch algorithmic contests, intense hackathons, and systems engineering workshops aboard our digital spaceship.
            </p>

            {/* Social comms links */}
            <div className="pt-2 flex items-center gap-2.5">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-deepNavy hover:bg-spaceNavy border border-panelBorder flex items-center justify-center text-mutedGray hover:text-crewCyan transition-colors"
                aria-label="GitHub"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-deepNavy hover:bg-spaceNavy border border-panelBorder flex items-center justify-center text-mutedGray hover:text-crewRed transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-deepNavy hover:bg-spaceNavy border border-panelBorder flex items-center justify-center text-mutedGray hover:text-crewCyan transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-deepNavy hover:bg-spaceNavy border border-panelBorder flex items-center justify-center text-mutedGray hover:text-crewYellow transition-colors"
                aria-label="Twitter / X"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
            </div>
          </div>

          {/* Mission Manifest Links */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-crewCyan flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5" />
              FLIGHT MANIFEST
            </h4>
            <ul className="space-y-2 text-xs font-mono text-mutedGray">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-offWhite hover:translate-x-1 transition-all text-left"
                >
                  // Mission Control (Home)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('events')}
                  className="hover:text-offWhite hover:translate-x-1 transition-all text-left"
                >
                  // Active Missions
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('crew')}
                  className="hover:text-offWhite hover:translate-x-1 transition-all text-left"
                >
                  // Meet The Crew
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('achievements')}
                  className="hover:text-offWhite hover:translate-x-1 transition-all text-left"
                >
                  // Mission Achievements
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-offWhite hover:translate-x-1 transition-all text-left"
                >
                  // Chapter Briefing
                </button>
              </li>
            </ul>
          </div>

          {/* Spaceship Modules */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-crewYellow flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5" />
              MISSION MODULES
            </h4>
            <ul className="space-y-2 text-xs font-mono text-mutedGray">
              <li>
                <button
                  onClick={() => onNavigate('events')}
                  className="hover:text-offWhite hover:translate-x-1 transition-all text-left"
                >
                  // Competitive Programming
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('events')}
                  className="hover:text-offWhite hover:translate-x-1 transition-all text-left"
                >
                  // Data Structures & Algos
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('events')}
                  className="hover:text-offWhite hover:translate-x-1 transition-all text-left"
                >
                  // 24H Spaceship Hackathons
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('events')}
                  className="hover:text-offWhite hover:translate-x-1 transition-all text-left"
                >
                  // Speed Blitz Arenas
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('events')}
                  className="hover:text-offWhite hover:translate-x-1 transition-all text-left"
                >
                  // Annual Crew Recruitment
                </button>
              </li>
            </ul>
          </div>

          {/* Spaceship Telemetry Status */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-crewRed flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              SYSTEM TELEMETRY
            </h4>
            <div className="p-3.5 rounded-xl bg-deepNavy/90 border border-panelBorder space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-mutedGray">HULL INTEGRITY</span>
                <span className="text-crewCyan font-bold">100% NOMINAL</span>
              </div>
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-mutedGray">OXYGEN LEVEL</span>
                <span className="text-crewYellow font-bold">OPTIMAL</span>
              </div>
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-mutedGray">IMPOSTORS</span>
                <span className="text-crewRed font-bold">0 DETECTED</span>
              </div>
              <div className="pt-1 border-t border-panelBorder flex items-center gap-1.5 text-[10px] font-mono text-mutedGray">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                ABESEC SERVER: ONLINE
              </div>
            </div>

            <button
              onClick={() => onNavigate('admin-login')}
              className="w-full flex items-center justify-center gap-1.5 text-[11px] font-mono py-2 rounded-lg bg-deepNavy hover:bg-spaceNavy text-mutedGray hover:text-offWhite border border-panelBorder transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-crewCyan" />
              <span>OFFICER MISSION CONTROL</span>
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-mutedGray">
          <div className="flex items-center gap-2">
            <span>© 2026 CODECHEF ABESEC CHAPTER.</span>
            <span className="hidden sm:inline">•</span>
            <span className="text-offWhite/60">ALL RIGHTS RESERVED.</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-crewRed animate-ping" />
            <span className="text-offWhite">THE NEXT MISSION BEGINS NOW.</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
