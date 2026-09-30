import React from 'react';
import { SecretMissionBadge, CrewmateIllustration } from '../components/DecorativeElements';
import { ArrowRight, Terminal, Award, Code2, Users, ShieldCheck, Zap, Globe } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (tab: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const milestones = [
    { year: '2023', title: 'Chapter Commissioned', desc: 'CodeChef ABESEC Chapter chartered by a passionate cohort of competitive coders to foster algorithmic problem solving.' },
    { year: '2024', title: 'Speed Blitz & Starters', desc: 'Hosted our first 500+ participant algorithmic cook-off and launched weekly cadet practice sessions.' },
    { year: '2025', title: 'ICPC Regional Delegation', desc: 'Sent 6 student teams to ICPC Amritapuri, Kanpur, and Gwalior regional on-sites with top 30 rank finishes.' },
    { year: '2026', title: 'The Spaceship Platform', desc: 'Redesigned our chapter identity around The Coding Crew—a futuristic spaceship for events, workshops, and hackathons.' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">
      
      {/* Header Banner */}
      <div className="space-y-4 max-w-3xl">
        <SecretMissionBadge title="CHAPTER BRIEFING" subtitle="CODECHEF ABESEC // THE CODING CREW" />
        <h1 className="font-heading font-black text-4xl sm:text-6xl text-offWhite uppercase tracking-tight leading-none">
          CODE. COMPETE. <br />
          <span className="text-crewRed text-glow-red">COLLABORATE.</span>
        </h1>
        <p className="text-base sm:text-lg text-mutedGray leading-relaxed font-light pt-2">
          CodeChef ABESEC is the official student competitive programming and technical chapter at ABES Engineering College. We turn algorithmic problem solving into an exciting, collaborative team mission.
        </p>
      </div>

      {/* Philosophy Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-crewCyan font-bold">
            <Terminal className="w-3.5 h-3.5 text-crewCyan" />
            MISSION DOCTRINE
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-offWhite uppercase tracking-tight">
            WHY WE FLY TOGETHER
          </h2>
          <div className="space-y-4 text-mutedGray text-sm sm:text-base leading-relaxed">
            <p>
              Mastering data structures and competitive programming shouldn't be a lonely grind in a dark room. True breakthroughs happen when you dissect time complexity with peers, brainstorm graph solutions, and race against the clock in live arenas.
            </p>
            <p>
              We built <span className="text-offWhite font-semibold">The Coding Crew</span> to create a collaborative spaceship environment for ABESEC students. Whether you are writing your first nested loop or qualifying for the ICPC World Finals, every cadet has a seat on our flight deck.
            </p>
            <p>
              Zero gatekeeping. All workshops, contest analyses, and bootcamp cohorts are completely open and free to all engineering students.
            </p>
          </div>

          <div className="pt-2 flex flex-wrap gap-4 font-mono text-xs text-crewYellow font-bold">
            <span className="flex items-center gap-1.5 bg-deepNavy px-3 py-1.5 rounded-lg border border-panelBorder">
              <span className="w-1.5 h-1.5 rounded-full bg-crewRed animate-ping" />
              WEEKLY CONTEST DUELS
            </span>
            <span className="flex items-center gap-1.5 bg-deepNavy px-3 py-1.5 rounded-lg border border-panelBorder">
              <span className="w-1.5 h-1.5 rounded-full bg-crewCyan" />
              PEER CODE REVIEWS
            </span>
            <span className="flex items-center gap-1.5 bg-deepNavy px-3 py-1.5 rounded-lg border border-panelBorder">
              <span className="w-1.5 h-1.5 rounded-full bg-crewYellow" />
              ICPC MENTORSHIP
            </span>
          </div>
        </div>

        <div className="lg:col-span-6 relative">
          <div className="rounded-3xl overflow-hidden aspect-4/3 border-2 border-crewRed/40 shadow-2xl relative glow-red">
            <img
              src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80"
              alt="CodeChef ABESEC Coding Lab"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-spaceBlack via-transparent to-transparent" />
          </div>

          <div className="absolute -bottom-5 -left-5 bg-deepNavy text-offWhite p-5 rounded-2xl border border-crewRed/50 shadow-2xl font-mono text-xs max-w-xs glow-red">
            <div className="text-crewRed font-bold text-sm">NO CADET LEFT BEHIND.</div>
            <div className="text-mutedGray mt-1">Every student receives hands-on algorithmic guidance from senior 4★ and 5★ coders.</div>
          </div>
        </div>
      </div>

      {/* Flight Milestones */}
      <div className="space-y-8 bg-deepNavy p-8 sm:p-12 rounded-3xl border border-panelBorder">
        <div className="space-y-1">
          <SecretMissionBadge title="TIMELINE" subtitle="CHAPTER LOG // 2023 - 2026" />
          <h2 className="font-heading font-black text-3xl uppercase tracking-tight text-offWhite">
            FLIGHT MILESTONES
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
          {milestones.map((m, i) => (
            <div key={i} className="p-5 rounded-2xl bg-spaceBlack/60 border border-panelBorder space-y-2 hover:border-crewCyan/50 transition-colors">
              <span className="font-heading font-black text-2xl text-crewRed">{m.year}</span>
              <h3 className="font-heading font-bold text-base text-offWhite uppercase">{m.title}</h3>
              <p className="text-xs text-mutedGray leading-relaxed">{m.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Box */}
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-deepNavy via-spaceNavy to-deepNavy border-2 border-crewRed/50 text-center space-y-6 glow-red">
        <h3 className="font-heading font-black text-2xl sm:text-4xl text-offWhite uppercase">
          READY TO TAKE YOUR FLIGHT SEAT?
        </h3>
        <p className="text-xs sm:text-base text-mutedGray max-w-xl mx-auto">
          Explore upcoming missions, join our community Discord, or apply for chapter officer positions.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => onNavigate('events')}
            className="flex items-center gap-2 bg-crewRed hover:bg-darkRed text-white px-6 py-3 rounded-xl font-mono text-xs font-bold uppercase tracking-wider glow-red shadow-lg"
          >
            <span>EXPLORE ACTIVE MISSIONS</span>
            <ArrowRight className="w-4 h-4 text-crewYellow" />
          </button>
          <button
            onClick={() => onNavigate('crew')}
            className="px-6 py-3 rounded-xl font-mono text-xs font-bold uppercase tracking-wider text-offWhite bg-deepNavy border border-panelBorder hover:border-crewCyan/50"
          >
            VIEW CREW ROSTER
          </button>
        </div>
      </div>

    </div>
  );
};
