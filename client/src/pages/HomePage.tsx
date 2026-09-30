import React, { useState } from 'react';
import { 
  ArrowRight, 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Sparkles, 
  Terminal, 
  Cpu, 
  Zap, 
  Layers, 
  Radio, 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  Megaphone, 
  Flame, 
  Compass, 
  Activity,
  AlertTriangle,
  Code2
} from 'lucide-react';
import { EventItem } from '../types';
import { EventCard } from '../components/EventCard';
import { 
  CrewmateIllustration, 
  SecretMissionBadge, 
  EmergencyMeetingButton, 
  SpaceshipRadar 
} from '../components/DecorativeElements';
import { LoadingSkeletonGrid, ErrorState } from '../components/States';

interface HomePageProps {
  events: EventItem[];
  isLoading: boolean;
  error: string | null;
  onSelectEvent: (id: string) => void;
  onRegisterEvent: (id: string, e?: React.MouseEvent) => void;
  onNavigate: (tab: string) => void;
  onRetry: () => void;
  onOpenEmergencyMeeting?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  events,
  isLoading,
  error,
  onSelectEvent,
  onRegisterEvent,
  onNavigate,
  onRetry,
  onOpenEmergencyMeeting
}) => {
  // Find featured mission or fallback to first open event
  const featuredEvent = events.find((e) => e.featured) || events[0];
  const upcomingEvents = events.filter((e) => e.id !== featuredEvent?.id).slice(0, 3);

  // Interactive Spaceship Task Console State
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Calibrate Competitive Rating', desc: 'Create or link your CodeChef handle to the chapter roster', done: true },
    { id: 2, title: 'Inspect Subspace Comms', desc: 'Join the CodeChef ABESEC Discord & flight announcement channel', done: true },
    { id: 3, title: 'Clear Algorithmic Queue', desc: 'Solve 1 Medium difficulty problem in the weekly practice lab', done: false },
    { id: 4, title: 'Prime Spaceship Engine', desc: 'Register for an upcoming live mission on the flight calendar', done: false },
  ]);

  const toggleTask = (id: number) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const completedCount = tasks.filter(t => t.done).length;
  const progressPercent = Math.round((completedCount / tasks.length) * 100);

  // Spaceship Modules / Categories
  const categories = [
    { name: 'Competitive Programming', code: 'CP', desc: 'Speed coding blitzes & algorithmic duels', count: 'Weekly Arenas', icon: Zap, color: 'text-crewRed' },
    { name: 'DSA', code: 'DSA', desc: 'Data structures, trees, dynamic programming labs', count: '12 Deep Dives', icon: Terminal, color: 'text-crewCyan' },
    { name: 'Workshops', code: 'LAB', desc: 'Hands-on AI agents, systems, cloud architecture', count: '8 Missions', icon: Cpu, color: 'text-crewYellow' },
    { name: 'Hackathons', code: 'HACK', desc: '24-48H high-velocity prototype expeditions', count: 'Annual Orbit', icon: Flame, color: 'text-emergencyOrange' },
    { name: 'Tech Talks', code: 'TALK', desc: 'Keynotes from ICPC finalists & industry architects', count: '4 Keynotes', icon: Layers, color: 'text-purple-400' },
    { name: 'Contests', code: 'CONTEST', desc: 'Official CodeChef Starters & Cook-Off relays', count: 'Live Relays', icon: Award, color: 'text-crewYellow' },
    { name: 'Community', code: 'CREW', desc: 'Late night code jams, discussions & open source', count: 'Active 24/7', icon: Users, color: 'text-crewCyan' },
    { name: 'Recruitment', code: 'JOIN', desc: 'Boarding calls for 1st, 2nd & 3rd year cadets', count: 'Active Cohort', icon: ShieldCheck, color: 'text-crewRed' }
  ];

  // Core Crew Officers for Section 6
  const chapterOfficers = [
    {
      name: 'Aarav Sharma',
      role: 'LEAD COMMANDER',
      title: 'Chapter President & 5★ CP Coder',
      suit: 'red' as const,
      border: 'hover:border-crewRed',
      badgeColor: 'text-crewRed bg-crewRed/10 border-crewRed/30',
      desc: 'Orchestrating speed coding tournaments, ICPC regional delegations, and overall flight operations.'
    },
    {
      name: 'Ananya Saxena',
      role: 'FLIGHT ENGINEER',
      title: 'Technical Lead & Systems Architect',
      suit: 'cyan' as const,
      border: 'hover:border-crewCyan',
      badgeColor: 'text-crewCyan bg-crewCyan/10 border-crewCyan/30',
      desc: 'Designing spaceship web systems, high-concurrency contest infrastructure, and hackathon platforms.'
    },
    {
      name: 'Rohan Mehra',
      role: 'NAVIGATION OFFICER',
      title: 'DSA & Algorithmic Lead',
      suit: 'yellow' as const,
      border: 'hover:border-crewYellow',
      badgeColor: 'text-crewYellow bg-crewYellow/10 border-crewYellow/30',
      desc: 'Directing problem setting, testcase verification, graph theory, and algorithmic mentoring.'
    },
    {
      name: 'Priya Verma',
      role: 'COMMS SPECIALIST',
      title: 'Design & Community Lead',
      suit: 'purple' as const,
      border: 'hover:border-purple-400',
      badgeColor: 'text-purple-400 bg-purple-400/10 border-purple-400/30',
      desc: 'Managing external community broadcast channels, UI aesthetics, motion physics, and cadet recruitment.'
    }
  ];

  return (
    <div className="space-y-20 sm:space-y-28 pb-16">
      
      {/* ========================================================
          1. MISSION START — HERO
         ======================================================== */}
      <section className="relative pt-8 sm:pt-14 pb-12 overflow-hidden">
        {/* Cockpit Grid & Deep Space Atmosphere */}
        <div className="absolute inset-0 bg-starfield opacity-60 pointer-events-none -z-10" />
        <div className="absolute inset-0 bg-cockpit-grid opacity-30 pointer-events-none -z-10" />
        <div className="absolute inset-0 bg-radial-vignette pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Top Mission Status Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-panelBorder pb-4 mb-8 sm:mb-12">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-crewRed animate-ping" />
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-offWhite flex items-center gap-2">
                CODECHEF ABESEC <span className="text-mutedGray">//</span> THE CODING CREW
              </span>
            </div>

            <div className="flex items-center gap-3">
              <SecretMissionBadge title="SHHH..." subtitle="MISSION IN PROGRESS" />
              <span className="hidden sm:inline-flex font-mono text-[10px] text-crewCyan uppercase tracking-widest bg-deepNavy px-2.5 py-1 rounded-full border border-crewCyan/30">
                STATUS // ACTIVE
              </span>
            </div>
          </div>

          {/* Hero Content Grid: Asymmetric Spaceship Cockpit */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Bold Mission Directives */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-deepNavy border border-crewRed/50 text-xs font-mono text-crewYellow font-bold shadow-md">
                  <span className="w-2 h-2 rounded-full bg-crewRed animate-pulse" />
                  CLASSIFIED // EXPEDITION 2026
                </div>

                <h1 className="font-heading font-black text-4xl sm:text-6xl lg:text-7xl text-offWhite tracking-tight uppercase leading-[1.05]">
                  THE NEXT MISSION <br />
                  <span className="text-crewRed text-glow-red">BEGINS NOW.</span>
                </h1>

                <p className="font-mono text-base sm:text-lg text-crewYellow font-bold tracking-widest uppercase">
                  CODE. COMPETE. COLLABORATE.
                </p>

                <p className="text-sm sm:text-base text-mutedGray max-w-xl leading-relaxed">
                  Your next coding challenge, workshop or tech event is waiting. Board the CodeChef ABESEC flagship, conquer competitive algorithms, and level up alongside campus engineers.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => onNavigate('events')}
                  className="flex items-center gap-3 bg-gradient-to-r from-crewRed to-darkRed hover:from-darkRed hover:to-crewRed text-white px-7 py-4 rounded-2xl font-mono text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 shadow-xl hover:shadow-[0_0_30px_rgba(229,9,20,0.6)] hover:-translate-y-0.5 border border-crewRed/60 glow-red"
                >
                  <span>EXPLORE MISSIONS</span>
                  <ArrowRight className="w-4 h-4 text-crewYellow" />
                </button>

                <button
                  onClick={() => onNavigate('crew')}
                  className="flex items-center gap-2 px-6 py-4 rounded-2xl font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-offWhite hover:text-white bg-deepNavy hover:bg-spaceNavy border border-panelBorder hover:border-crewCyan/50 transition-all shadow-md"
                >
                  <Users className="w-4 h-4 text-crewCyan" />
                  <span>JOIN THE CREW</span>
                </button>
              </div>

              {/* Cockpit Telemetry Strip */}
              <div className="pt-4 border-t border-panelBorder/70 flex flex-wrap items-center gap-6 text-xs font-mono text-mutedGray">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>CREW STATUS: READY</span>
                </div>
                <div className="flex items-center gap-2">
                  <Activity className="w-3.5 h-3.5 text-crewCyan" />
                  <span>ORBITAL SPEED: OPTIMAL</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-crewYellow" />
                  <span>HULL: 100% NOMINAL</span>
                </div>
              </div>
            </div>

            {/* Right Column: Spaceship Control Visual with Floating Astronaut & Radar */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              
              {/* Outer HUD Radar Ring */}
              <div className="relative w-72 h-72 sm:w-88 sm:h-88 rounded-full border-2 border-panelBorder/80 bg-deepNavy/60 p-4 shadow-2xl backdrop-blur-md flex items-center justify-center">
                
                {/* Secondary Orbital Line */}
                <div className="absolute inset-4 rounded-full border border-crewCyan/20 animate-spin" style={{ animationDuration: '45s' }}>
                  <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-crewCyan shadow-[0_0_10px_#54D8E8]" />
                </div>

                {/* Inner Glow Field */}
                <div className="absolute inset-8 rounded-full bg-crewRed/10 blur-xl" />

                {/* Radar HUD in Corner */}
                <div className="absolute -top-4 -right-4 z-20">
                  <SpaceshipRadar className="w-24 h-24" />
                </div>

                {/* Micro Secret Tag */}
                <div className="absolute -bottom-3 left-4 z-20">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-crewYellow bg-spaceBlack/90 px-3 py-1 rounded-full border border-crewRed/40 font-bold">
                    CREW ONLY // CLASSIFIED
                  </span>
                </div>

                {/* Center Floating Red Astronaut Illustration */}
                <div className="relative z-10 animate-float flex flex-col items-center">
                  <CrewmateIllustration color="red" size="hero" hasChefHat={true} />
                  
                  {/* Floating shadow beneath */}
                  <div className="w-32 h-4 rounded-full bg-black/60 blur-md -mt-4" />
                </div>

                {/* Small floating status indicators around */}
                <div className="absolute top-12 left-2 z-20 bg-spaceBlack/80 border border-panelBorder px-2.5 py-1 rounded-lg font-mono text-[10px] text-offWhite flex items-center gap-1.5 shadow-lg">
                  <span className="w-1.5 h-1.5 rounded-full bg-crewCyan animate-pulse" />
                  <span>ALT 420KM</span>
                </div>

                <div className="absolute bottom-16 -right-2 z-20 bg-spaceBlack/80 border border-crewRed/40 px-2.5 py-1 rounded-lg font-mono text-[10px] text-crewRed flex items-center gap-1.5 shadow-lg">
                  <AlertTriangle className="w-3 h-3 text-crewYellow" />
                  <span>0 IMPOSTORS</span>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================
          2. FEATURED MISSION (Classified Briefing)
         ======================================================== */}
      {featuredEvent && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-deepNavy border-2 border-crewRed/60 shadow-2xl overflow-hidden relative glow-red">
            
            {/* Top Classified Mission Briefing Strip */}
            <div className="bg-spaceBlack/80 px-6 py-3 border-b border-panelBorder flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-black uppercase tracking-widest text-crewRed">
                  FEATURED MISSION // 001
                </span>
                <span className="w-px h-3 bg-panelBorder" />
                <span className="font-mono text-xs text-mutedGray">
                  CLASSIFIED BRIEFING
                </span>
              </div>

              <div className="flex items-center gap-3 font-mono text-xs">
                <span className="px-2.5 py-0.5 rounded-full bg-crewRed/20 text-crewYellow font-bold border border-crewRed/40 uppercase">
                  STATUS // {featuredEvent.status || 'OPEN'}
                </span>
                <span className="text-mutedGray hidden sm:inline">
                  CAPACITY: {featuredEvent.capacity} CREWMATES
                </span>
              </div>
            </div>

            {/* Main Briefing Card Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-10 items-center">
              
              {/* Event Image with HUD Overlay */}
              <div className="lg:col-span-5 relative group overflow-hidden rounded-2xl border border-panelBorder aspect-16/10">
                <img
                  src={featuredEvent.imageUrl || featuredEvent.image}
                  alt={featuredEvent.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-spaceBlack via-spaceBlack/30 to-transparent" />
                
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between font-mono text-[10px] text-offWhite bg-spaceBlack/80 px-3 py-1.5 rounded-lg border border-panelBorder">
                  <span className="text-crewCyan uppercase font-bold">{featuredEvent.category}</span>
                  <span className="text-crewYellow">{featuredEvent.seatsLeft ?? featuredEvent.capacity} SEATS REMAINING</span>
                </div>
              </div>

              {/* Event Details & Call to Action */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <div className="font-mono text-xs text-crewCyan uppercase tracking-widest font-semibold">
                    HIGH PRIORITY DISPATCH
                  </div>
                  <h2 className="font-heading font-black text-2xl sm:text-4xl text-offWhite tracking-tight uppercase mt-1">
                    {featuredEvent.name}
                  </h2>
                  <p className="text-xs sm:text-sm text-mutedGray mt-3 leading-relaxed">
                    {featuredEvent.description}
                  </p>
                </div>

                {/* Telemetry metadata chips */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-spaceBlack/60 border border-panelBorder space-y-0.5">
                    <div className="flex items-center gap-1.5 text-mutedGray text-[10px] font-mono">
                      <Calendar className="w-3.5 h-3.5 text-crewRed" />
                      <span>MISSION DATE</span>
                    </div>
                    <div className="text-xs font-mono font-bold text-offWhite">{featuredEvent.date}</div>
                  </div>

                  <div className="p-3 rounded-xl bg-spaceBlack/60 border border-panelBorder space-y-0.5">
                    <div className="flex items-center gap-1.5 text-mutedGray text-[10px] font-mono">
                      <Clock className="w-3.5 h-3.5 text-crewYellow" />
                      <span>TIME STAMP</span>
                    </div>
                    <div className="text-xs font-mono font-bold text-offWhite">{featuredEvent.time}</div>
                  </div>

                  <div className="p-3 rounded-xl bg-spaceBlack/60 border border-panelBorder space-y-0.5">
                    <div className="flex items-center gap-1.5 text-mutedGray text-[10px] font-mono">
                      <MapPin className="w-3.5 h-3.5 text-crewCyan" />
                      <span>COORDINATES</span>
                    </div>
                    <div className="text-xs font-mono font-bold text-offWhite truncate">{featuredEvent.venue}</div>
                  </div>
                </div>

                {/* CTA Action Buttons */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <button
                    onClick={() => onSelectEvent(featuredEvent.id)}
                    className="flex items-center gap-2 bg-gradient-to-r from-crewRed to-darkRed hover:from-darkRed hover:to-crewRed text-white px-6 py-3 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all glow-red shadow-lg"
                  >
                    <span>VIEW MISSION →</span>
                  </button>

                  <button
                    onClick={(e) => onRegisterEvent(featuredEvent.id, e)}
                    className="flex items-center gap-2 bg-deepNavy hover:bg-spaceNavy text-offWhite hover:text-white px-6 py-3 rounded-xl font-mono text-xs font-bold uppercase tracking-wider border border-panelBorder hover:border-crewCyan/50 transition-colors"
                  >
                    <span>ACCEPT MISSION (REGISTER)</span>
                  </button>
                </div>

              </div>

            </div>

          </div>
        </section>
      )}

      {/* ========================================================
          3. UPCOMING MISSIONS
         ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-panelBorder pb-6">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-crewRed font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-crewRed animate-ping" />
              FLIGHT MANIFEST
            </div>
            <h2 className="font-heading font-black text-3xl sm:text-5xl text-offWhite uppercase tracking-tight mt-1">
              UPCOMING MISSIONS
            </h2>
            <p className="text-xs sm:text-sm text-mutedGray mt-1">
              Active algorithmic duels, technical workshops, and chapter events open for cadet registration.
            </p>
          </div>

          <button
            onClick={() => onNavigate('events')}
            className="flex items-center gap-2 font-mono text-xs font-bold text-crewCyan hover:text-white transition-colors"
          >
            <span>VIEW ALL MISSIONS</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Loading and Error States */}
        {isLoading && <LoadingSkeletonGrid count={3} />}
        {error && <ErrorState message={error} onRetry={onRetry} />}

        {/* Missions Cards Grid */}
        {!isLoading && !error && upcomingEvents.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((evt, idx) => (
              <EventCard
                key={evt.id}
                event={evt}
                missionIndex={idx + 2}
                onSelectEvent={onSelectEvent}
                onRegisterEvent={onRegisterEvent}
              />
            ))}
          </div>
        )}

      </section>

      {/* ========================================================
          4. MISSION CATEGORIES (Spaceship Task Modules)
         ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="space-y-1">
          <div className="font-mono text-xs uppercase tracking-widest text-crewYellow font-bold flex items-center gap-2">
            <Cpu className="w-3.5 h-3.5 text-crewYellow" />
            SPECIALIZED SECTORS
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-offWhite uppercase tracking-tight">
            MISSION CATEGORIES
          </h2>
          <p className="text-xs sm:text-sm text-mutedGray">
            Choose your flight module. Select a sector to filter the mission radar.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <div
                key={i}
                onClick={() => onNavigate('events')}
                className="group p-5 rounded-2xl bg-deepNavy border border-panelBorder hover:border-crewRed/60 hover:bg-spaceNavy/80 transition-all duration-300 cursor-pointer shadow-md hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-spaceBlack/60 border border-panelBorder flex items-center justify-center group-hover:border-crewRed/40 transition-colors">
                      <Icon className={`w-5 h-5 ${cat.color}`} />
                    </div>
                    <span className="font-mono text-[9px] uppercase px-2 py-0.5 rounded bg-spaceBlack/80 border border-panelBorder text-mutedGray group-hover:text-offWhite">
                      {cat.code}
                    </span>
                  </div>

                  <h3 className="font-heading font-black text-lg text-offWhite uppercase tracking-tight mt-4 group-hover:text-crewRed transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-mutedGray mt-1 line-clamp-2 leading-relaxed">
                    {cat.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-panelBorder/60 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-crewYellow font-semibold">{cat.count}</span>
                  <span className="text-mutedGray group-hover:text-crewCyan flex items-center gap-1">
                    ACCESS <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </section>

      {/* ========================================================
          5. COMPLETE YOUR TASKS (Interactive Spaceship Console)
         ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-deepNavy border-2 border-panelBorder p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            
            {/* Left Briefing */}
            <div className="lg:max-w-md space-y-4">
              <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-crewCyan font-bold">
                <span className="w-2 h-2 rounded-full bg-crewCyan animate-ping" />
                CREW ONBOARDING // TASKS
              </div>

              <h2 className="font-heading font-black text-3xl sm:text-4xl text-offWhite uppercase tracking-tight">
                COMPLETE YOUR <span className="text-crewRed">TASKS</span>.
              </h2>

              <p className="text-xs sm:text-sm text-mutedGray leading-relaxed">
                Before boarding competitive expeditions, every recruit must complete core maintenance tasks to align telemetry with CodeChef ABESEC.
              </p>

              {/* Progress Bar Gauge */}
              <div className="p-4 rounded-2xl bg-spaceBlack/60 border border-panelBorder space-y-2">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="text-mutedGray">TOTAL TASKS COMPLETED</span>
                  <span className="text-crewYellow font-bold">{progressPercent}%</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-deepNavy overflow-hidden p-0.5 border border-panelBorder">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-crewCyan via-crewYellow to-crewRed transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <div className="text-[10px] font-mono text-mutedGray flex items-center justify-between">
                  <span>{completedCount} OF {tasks.length} TASKS PRIMED</span>
                  {progressPercent === 100 ? (
                    <span className="text-emerald-400 font-bold">CREW STATUS // READY FOR DEPLOYMENT</span>
                  ) : (
                    <span className="text-crewYellow">TASKS REMAINING</span>
                  )}
                </div>
              </div>
            </div>

            {/* Right Task Check Console */}
            <div className="lg:flex-1 space-y-3">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-4 ${
                    task.done
                      ? 'bg-spaceBlack/40 border-crewCyan/40 text-offWhite'
                      : 'bg-spaceBlack/80 border-panelBorder text-mutedGray hover:border-crewRed/50 hover:text-offWhite'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 border transition-all ${
                    task.done
                      ? 'bg-crewCyan text-spaceBlack border-crewCyan shadow-sm'
                      : 'bg-deepNavy border-panelBorder text-transparent'
                  }`}>
                    <CheckCircle2 className="w-4 h-4 fill-current" />
                  </div>

                  <div className="flex-1 space-y-0.5">
                    <div className="flex items-center justify-between">
                      <span className={`font-mono text-xs font-bold uppercase tracking-wider ${
                        task.done ? 'text-crewCyan line-through opacity-80' : 'text-offWhite'
                      }`}>
                        TASK 0{task.id}: {task.title}
                      </span>
                      <span className="font-mono text-[9px] uppercase px-1.5 py-0.5 rounded bg-deepNavy border border-panelBorder text-mutedGray">
                        {task.done ? 'COMPLETE ✓' : 'PENDING'}
                      </span>
                    </div>
                    <p className="text-[11px] text-mutedGray leading-relaxed">
                      {task.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================
          6. MEET THE CREW
         ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-panelBorder pb-6">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-crewCyan font-bold flex items-center gap-2">
              <Users className="w-3.5 h-3.5 text-crewCyan" />
              FLIGHT COMMAND
            </div>
            <h2 className="font-heading font-black text-3xl sm:text-5xl text-offWhite uppercase tracking-tight mt-1">
              MEET THE CREW
            </h2>
            <p className="text-xs sm:text-sm text-mutedGray mt-1">
              Chapter leads, problem curators, and engineers steering CodeChef ABESEC.
            </p>
          </div>

          <button
            onClick={() => onNavigate('crew')}
            className="flex items-center gap-2 font-mono text-xs font-bold text-crewCyan hover:text-white transition-colors"
          >
            <span>VIEW FULL ROSTER</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {chapterOfficers.map((officer, i) => (
            <div
              key={i}
              className={`p-6 rounded-2xl bg-deepNavy border border-panelBorder ${officer.border} transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 hover:shadow-xl`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-xl bg-spaceBlack/60 border border-panelBorder">
                    <CrewmateIllustration color={officer.suit} size="sm" />
                  </div>
                  <span className={`font-mono text-[9px] uppercase px-2 py-0.5 rounded border font-bold ${officer.badgeColor}`}>
                    {officer.role}
                  </span>
                </div>

                <div>
                  <h3 className="font-heading font-black text-xl text-offWhite tracking-tight">
                    {officer.name}
                  </h3>
                  <div className="font-mono text-xs text-mutedGray mt-0.5">
                    {officer.title}
                  </div>
                </div>

                <p className="text-xs text-mutedGray leading-relaxed border-t border-panelBorder/70 pt-3">
                  {officer.desc}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-panelBorder/60 flex items-center justify-between text-[10px] font-mono text-crewCyan">
                <span>VERIFIED OFFICER</span>
                <span>CHAPTER 26</span>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* ========================================================
          7. COMPLETED MISSIONS (Expedition Log)
         ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-deepNavy border border-panelBorder relative overflow-hidden">
          
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-crewYellow font-bold">
                  MISSION ARCHIVE // 2025-2026
                </span>
                <h2 className="font-heading font-black text-3xl sm:text-4xl text-offWhite uppercase tracking-tight mt-1">
                  COMPLETED MISSIONS
                </h2>
                <p className="text-xs sm:text-sm text-mutedGray mt-1">
                  Historical telemetry and performance metrics from past CodeChef ABESEC expeditions.
                </p>
              </div>

              <button
                onClick={() => onNavigate('achievements')}
                className="font-mono text-xs text-crewCyan hover:text-white flex items-center gap-1.5 transition-colors"
              >
                <span>EXPLORE ALL ACHIEVEMENTS</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Metrics Counters */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-spaceBlack/60 border border-panelBorder text-center space-y-1">
                <div className="font-heading font-black text-3xl sm:text-4xl text-crewRed">1,250+</div>
                <div className="font-mono text-[10px] uppercase tracking-wider text-mutedGray">Code Submissions</div>
              </div>
              <div className="p-5 rounded-2xl bg-spaceBlack/60 border border-panelBorder text-center space-y-1">
                <div className="font-heading font-black text-3xl sm:text-4xl text-crewCyan">18+</div>
                <div className="font-mono text-[10px] uppercase tracking-wider text-mutedGray">ICPC Regionalists</div>
              </div>
              <div className="p-5 rounded-2xl bg-spaceBlack/60 border border-panelBorder text-center space-y-1">
                <div className="font-heading font-black text-3xl sm:text-4xl text-crewYellow">₹4.5L+</div>
                <div className="font-mono text-[10px] uppercase tracking-wider text-mutedGray">Hackathon Bounties</div>
              </div>
              <div className="p-5 rounded-2xl bg-spaceBlack/60 border border-panelBorder text-center space-y-1">
                <div className="font-heading font-black text-3xl sm:text-4xl text-offWhite">350+</div>
                <div className="font-mono text-[10px] uppercase tracking-wider text-mutedGray">Cadets Deployed</div>
              </div>
            </div>

            {/* Past Expedition Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-spaceBlack/40 border border-panelBorder space-y-1 font-mono text-xs">
                <div className="text-crewCyan font-bold">MISSION // 012: HACK-THE-ORBIT</div>
                <div className="text-mutedGray text-[11px]">36H Hackathon with 280+ students. Smart India Hackathon finalist projects shipped.</div>
              </div>
              <div className="p-4 rounded-xl bg-spaceBlack/40 border border-panelBorder space-y-1 font-mono text-xs">
                <div className="text-crewYellow font-bold">MISSION // 009: SPEED BLITZ ARENA</div>
                <div className="text-mutedGray text-[11px]">Weekly 2-hour high-speed algorithm duel. 45 problems conquered under 60 minutes.</div>
              </div>
              <div className="p-4 rounded-xl bg-spaceBlack/40 border border-panelBorder space-y-1 font-mono text-xs">
                <div className="text-crewRed font-bold">MISSION // 004: DSA BOOTCAMP 2025</div>
                <div className="text-mutedGray text-[11px]">4-week intensive on Graphs, Dynamic Programming & Segment Trees for 150+ cadets.</div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================
          8. EMERGENCY MEETING (Reference 2 Interactive Concept)
         ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-darkRed/80 via-deepNavy to-darkRed/80 border-2 border-emergencyOrange p-8 sm:p-12 shadow-[0_0_50px_rgba(229,9,20,0.35)] relative overflow-hidden">
          
          {/* Hazard Frame Border Strip */}
          <div className="absolute top-0 inset-x-0 h-2.5 hazard-stripes" />
          <div className="absolute bottom-0 inset-x-0 h-2.5 hazard-stripes" />

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
            
            <div className="space-y-4 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-crewYellow font-bold bg-spaceBlack/80 px-3 py-1 rounded-full border border-emergencyOrange">
                <Megaphone className="w-3.5 h-3.5 text-crewYellow animate-bounce" />
                REPORT AN ISSUE // EMERGENCY PROTOCOL
              </div>

              <h2 className="font-heading font-black text-3xl sm:text-5xl text-white uppercase tracking-tight text-glow-red">
                EMERGENCY MEETING.
              </h2>

              <p className="text-xs sm:text-sm text-offWhite/80 max-w-lg leading-relaxed">
                Need urgent technical assistance with a contest problem statement? Suspect an impostor bug in the automated judge? Press the emergency button to dispatch an alert directly to the CodeChef ABESEC leads.
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-mono text-crewYellow">
                <span>• CONTEST PROBLEM ERRORS</span>
                <span>• MENTOR ASSISTANCE</span>
                <span>• CREW COMMUNICATIONS</span>
              </div>
            </div>

            {/* Interactive 3D Emergency Meeting Button Component */}
            <div className="flex flex-col items-center">
              <EmergencyMeetingButton
                size="lg"
                onClick={() => {
                  if (onOpenEmergencyMeeting) {
                    onOpenEmergencyMeeting();
                  }
                }}
              />
              <div className="font-mono text-[10px] text-mutedGray uppercase tracking-widest mt-3 animate-pulse">
                [ CLICK TO SOUND EMERGENCY SIREN ]
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================
          9. FINAL CTA
         ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-deepNavy border-2 border-crewRed/50 p-8 sm:p-14 text-center space-y-6 relative overflow-hidden glow-red">
          
          <div className="w-16 h-16 rounded-2xl bg-crewRed/20 border border-crewRed mx-auto flex items-center justify-center glow-red">
            <CrewmateIllustration color="red" size="sm" hasChefHat={true} />
          </div>

          <div className="space-y-2 max-w-2xl mx-auto">
            <div className="font-mono text-xs uppercase tracking-widest text-crewYellow font-bold">
              THE CODING CREW IS CALLING
            </div>
            <h2 className="font-heading font-black text-3xl sm:text-5xl text-offWhite uppercase tracking-tight">
              READY TO BOARD THE <span className="text-crewRed">SPACESHIP?</span>
            </h2>
            <p className="text-xs sm:text-base text-mutedGray leading-relaxed">
              Claim your crew assignment, solve algorithmic problems, and build alongside ABESEC's top engineers. No experience needed—just curiosity and ambition.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => onNavigate('events')}
              className="flex items-center gap-3 bg-gradient-to-r from-crewRed to-darkRed hover:from-darkRed hover:to-crewRed text-white px-8 py-4 rounded-2xl font-mono text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 shadow-xl hover:shadow-[0_0_35px_rgba(229,9,20,0.7)] hover:-translate-y-0.5 border border-crewRed/60 glow-red"
            >
              <span>JOIN THE CREW →</span>
              <ArrowRight className="w-4 h-4 text-crewYellow" />
            </button>

            <button
              onClick={() => onNavigate('events')}
              className="px-8 py-4 rounded-2xl font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-offWhite hover:text-white bg-spaceBlack hover:bg-spaceNavy border border-panelBorder hover:border-crewCyan/50 transition-colors"
            >
              VIEW MISSION MANIFEST
            </button>
          </div>

        </div>
      </section>

    </div>
  );
};
