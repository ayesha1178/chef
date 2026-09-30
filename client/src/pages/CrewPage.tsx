import React from 'react';
import { 
  ShieldCheck, 
  Terminal, 
  Cpu, 
  Sparkles, 
  ArrowRight, 
  Award, 
  Code2, 
  Radio, 
  Compass, 
  Users, 
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { CrewmateIllustration, SecretMissionBadge } from '../components/DecorativeElements';

interface CrewPageProps {
  onNavigate: (tab: string) => void;
}

export const CrewPage: React.FC<CrewPageProps> = ({ onNavigate }) => {
  const officers = [
    {
      name: 'Aarav Sharma',
      role: 'LEAD COMMANDER',
      designation: 'Chapter President & 5★ CP Coder',
      year: 'CSE 4th Year',
      suitColor: 'red' as const,
      status: 'MISSION COMMAND',
      bio: 'Leading competitive programming blitzes, ICPC regional squads, and overall flight operations of CodeChef ABESEC.',
      stats: 'CodeChef: 2150+ (5★) | LeetCode: 2400+'
    },
    {
      name: 'Ananya Saxena',
      role: 'FLIGHT ENGINEER',
      designation: 'Technical Lead & Systems Architect',
      year: 'IT 4th Year',
      suitColor: 'cyan' as const,
      status: 'HULL & CODE OPS',
      bio: 'Architecting high-concurrency contest infrastructure, cloud deployment pipelines, and hackathon judging platforms.',
      stats: 'Open Source Contributor | Full-Stack Architect'
    },
    {
      name: 'Rohan Mehra',
      role: 'NAVIGATION OFFICER',
      designation: 'DSA & Algorithmic Lead',
      year: 'CSE 3rd Year',
      suitColor: 'yellow' as const,
      status: 'RADAR & PATHFINDING',
      bio: 'Curating problem sets, dynamic programming intensives, graph algorithms, and mentorship for junior cadets.',
      stats: 'Global Contest Rank #42 | Problem Setter'
    },
    {
      name: 'Priya Verma',
      role: 'COMMS SPECIALIST',
      designation: 'Design, Media & Community Lead',
      year: 'CS-AI 3rd Year',
      suitColor: 'purple' as const,
      status: 'SUBSPACE COMMS',
      bio: 'Directing the visual identity, UI/UX aesthetics, and external community coordination for all spaceship expeditions.',
      stats: 'UI/UX Lead | Community Builder'
    },
    {
      name: 'Devansh Taneja',
      role: 'SECURITY SPECIALIST',
      designation: 'Code Review & Anti-Plagiarism Lead',
      year: 'CSE 3rd Year',
      suitColor: 'white' as const,
      status: 'IMPOSTOR SCANNER',
      bio: 'Ensuring honest code submissions, automated test-suite verification, and high integrity in all speed coding challenges.',
      stats: 'Plagiarism Defense | Code Reviewer'
    },
    {
      name: 'Ishita Gupta',
      role: 'CHIEF CADET MENTOR',
      designation: '1st & 2nd Year Onboarding Lead',
      year: 'ECE 3rd Year',
      suitColor: 'red' as const,
      status: 'CREW DRILLS',
      bio: 'Running weekly algorithmic bootcamps, problem-solving workshops, and beginner contests for new crew members.',
      stats: 'Mentored 350+ Students | Bootcamp Lead'
    }
  ];

  const roles = [
    {
      title: 'COMPETITIVE PROGRAMMERS',
      desc: 'Crack CodeChef Starters, Long Challenges, and Cook-Offs. Represent ABESEC at ICPC.',
      tag: 'ALGO SQUAD',
      color: 'border-crewRed text-crewRed'
    },
    {
      title: 'FULL STACK SPACESHIP ENGINEERS',
      desc: 'Build web applications, automated contest bots, judge portals, and APIs.',
      tag: 'ENGINEERING',
      color: 'border-crewCyan text-crewCyan'
    },
    {
      title: 'PROBLEM SETTERS & TESTERS',
      desc: 'Author original test cases, algorithmic challenges, and verify constraint rigor.',
      tag: 'PROBLEM LAB',
      color: 'border-crewYellow text-crewYellow'
    },
    {
      title: 'CREATIVE & COMMS CADETS',
      desc: 'Design mission posters, UI motion physics, manage broadcast channels and Discord.',
      tag: 'COMMS',
      color: 'border-purple-400 text-purple-400'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">
      
      {/* Header Banner */}
      <div className="space-y-4 max-w-3xl">
        <SecretMissionBadge title="CREW ROSTER" subtitle="CLASSIFIED // ABESEC FLIGHT CREW" />
        <h1 className="font-heading font-black text-4xl sm:text-6xl text-offWhite uppercase tracking-tight leading-none">
          MEET THE <span className="text-crewRed text-glow-red">CODING CREW</span>.
        </h1>
        <p className="text-base sm:text-lg text-mutedGray leading-relaxed font-light">
          The developers, competitive coders, problem setters, and designers navigating CodeChef ABESEC through the digital cosmos.
        </p>
      </div>

      {/* Officers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {officers.map((officer, idx) => (
          <div
            key={idx}
            className="group relative rounded-2xl bg-deepNavy border border-panelBorder hover:border-crewRed/60 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl flex flex-col justify-between"
          >
            {/* Top Bar with Astronaut Avatar & Role */}
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="p-2.5 rounded-2xl bg-spaceBlack/60 border border-panelBorder flex items-center justify-center">
                  <CrewmateIllustration color={officer.suitColor} size="sm" />
                </div>
                <div className="text-right">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-crewYellow bg-spaceBlack/60 px-2 py-0.5 rounded border border-panelBorder">
                    {officer.status}
                  </span>
                  <div className="font-mono text-xs text-mutedGray mt-1">
                    {officer.year}
                  </div>
                </div>
              </div>

              <div>
                <div className="font-mono text-xs uppercase tracking-wider text-crewCyan font-bold">
                  {officer.role}
                </div>
                <h3 className="font-heading font-black text-2xl text-offWhite tracking-tight mt-0.5 group-hover:text-crewRed transition-colors">
                  {officer.name}
                </h3>
                <div className="font-mono text-xs text-mutedGray mt-0.5">
                  {officer.designation}
                </div>
              </div>

              <p className="text-xs text-mutedGray leading-relaxed border-t border-panelBorder/70 pt-3">
                {officer.bio}
              </p>
            </div>

            {/* Bottom Stats */}
            <div className="mt-5 pt-3 border-t border-panelBorder/70 flex items-center justify-between text-[11px] font-mono">
              <span className="text-crewYellow flex items-center gap-1 font-semibold">
                <Award className="w-3.5 h-3.5" />
                {officer.stats}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Recruitment Callout Module */}
      <div className="rounded-3xl bg-gradient-to-br from-deepNavy via-spaceNavy to-deepNavy border-2 border-crewRed/50 p-8 sm:p-12 shadow-2xl relative overflow-hidden glow-red">
        {/* Background watermark */}
        <div className="absolute right-0 bottom-0 translate-x-10 translate-y-10 opacity-10 pointer-events-none">
          <CrewmateIllustration color="red" size="hero" />
        </div>

        <div className="max-w-2xl space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 bg-crewRed/20 border border-crewRed px-3 py-1 rounded-full text-xs font-mono text-crewYellow font-bold">
            <span className="w-2 h-2 rounded-full bg-crewRed animate-ping" />
            RECRUITMENT PROTOCOL // 2026 ACTIVE
          </div>

          <h2 className="font-heading font-black text-3xl sm:text-5xl text-offWhite uppercase tracking-tight">
            WANT TO JOIN THE <span className="text-crewRed">CREW?</span>
          </h2>

          <p className="text-sm sm:text-base text-mutedGray leading-relaxed">
            We are boarding talented 1st, 2nd, and 3rd year cadets across algorithmic problem solving, web development, event orchestration, and visual design.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {roles.map((r, i) => (
              <div key={i} className="p-4 rounded-xl bg-spaceBlack/60 border border-panelBorder space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-offWhite">{r.title}</span>
                  <span className={`font-mono text-[9px] uppercase px-1.5 py-0.5 rounded border ${r.color}`}>
                    {r.tag}
                  </span>
                </div>
                <p className="text-[11px] text-mutedGray">{r.desc}</p>
              </div>
            ))}
          </div>

          <div className="pt-4 flex flex-wrap gap-4">
            <button
              onClick={() => onNavigate('events')}
              className="flex items-center gap-2 bg-crewRed hover:bg-darkRed text-white px-6 py-3.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-lg hover:shadow-2xl glow-red"
            >
              <span>APPLY FOR CADET ASSIGNMENT</span>
              <ArrowRight className="w-4 h-4 text-crewYellow" />
            </button>
            <button
              onClick={() => onNavigate('about')}
              className="px-6 py-3.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider text-offWhite hover:text-white bg-deepNavy border border-panelBorder hover:border-crewCyan/50 transition-colors"
            >
              READ CHAPTER MANIFEST
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};
