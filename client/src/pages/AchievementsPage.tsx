import React from 'react';
import { 
  Trophy, 
  Award, 
  Star, 
  TrendingUp, 
  Zap, 
  ArrowRight, 
  CheckCircle2, 
  Globe, 
  Terminal, 
  ShieldCheck 
} from 'lucide-react';
import { SecretMissionBadge, CrewmateIllustration } from '../components/DecorativeElements';

interface AchievementsPageProps {
  onNavigate: (tab: string) => void;
}

export const AchievementsPage: React.FC<AchievementsPageProps> = ({ onNavigate }) => {
  const highlights = [
    {
      stat: '#1',
      label: 'REGIONAL CHAPTER',
      desc: 'Top active CodeChef Campus Chapter in Delhi-NCR engineering circuit with 1,200+ active submissions.'
    },
    {
      stat: '5★',
      label: 'HIGHEST RATING',
      desc: 'Top student competitive coders reaching 2100+ rating on CodeChef Starters and Cook-Off arenas.'
    },
    {
      stat: '18+',
      label: 'ICPC REGIONALISTS',
      desc: 'Student trios qualifying for ICPC Amritapuri, Kanpur, and Gwalior regional on-site rounds.'
    },
    {
      stat: '₹4.5L+',
      label: 'HACKATHON PRIZES',
      desc: 'Cumulative cash bounties secured by ABESEC crew squads across national college hackathons in 2025-2026.'
    }
  ];

  const hallOfFame = [
    {
      title: 'ICPC REGIONAL QUALIFIER 2025',
      event: 'ICPC Asia-Amritapuri Regional',
      team: 'Team // NULL_POINTER_EXCEPTION',
      members: 'Aarav Sharma, Rohan Mehra, Devansh Taneja',
      rank: 'Rank #28 Regional Finalist',
      badge: 'ICPC FINALIST'
    },
    {
      title: 'SMART INDIA HACKATHON WINNERS',
      event: 'SIH 2024 Software Edition (ISRO Problem Statement)',
      team: 'Team // ORBIT_CREW',
      members: 'Ananya Saxena, Priya Verma & Squad',
      rank: '1st Prize - ₹1,00,000 Bounty',
      badge: 'NATIONAL WINNER'
    },
    {
      title: 'CODECHEF STARTERS 150 DIVISION 1',
      event: 'Global Algorithmic Arena',
      team: 'Solo Cadet // Aarav Sharma',
      members: 'Aarav Sharma (President)',
      rank: 'Global Rank #34 (India Rank #12)',
      badge: 'TOP 50 GLOBAL'
    },
    {
      title: 'HACKOVERFLOW 4.0 CHAMPIONS',
      event: 'Annual 36H Hackathon',
      team: 'Team // ZERO_IMPOSTORS',
      members: 'Rohan Mehra & Crew Engineers',
      rank: 'Grand Champion Trophy',
      badge: 'CHAMPIONS'
    }
  ];

  const starCoders = [
    { name: 'Aarav Sharma', handle: 'aarav_sharma', stars: '5★', rating: '2184', solved: '850+ Problems' },
    { name: 'Rohan Mehra', handle: 'rohan_codes', stars: '4★', rating: '1942', solved: '620+ Problems' },
    { name: 'Devansh Taneja', handle: 'dev_algo', stars: '4★', rating: '1890', solved: '540+ Problems' },
    { name: 'Ananya Saxena', handle: 'ananya_sys', stars: '3★', rating: '1780', solved: '410+ Problems' },
    { name: 'Ishita Gupta', handle: 'ishita_g', stars: '3★', rating: '1724', solved: '380+ Problems' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">
      
      {/* Header Banner */}
      <div className="space-y-4 max-w-3xl">
        <SecretMissionBadge title="MISSION LOG" subtitle="VERIFIED TROPHIES // CODECHEF ABESEC" />
        <h1 className="font-heading font-black text-4xl sm:text-6xl text-offWhite uppercase tracking-tight leading-none">
          MISSION <span className="text-crewRed text-glow-red">ACHIEVEMENTS</span>.
        </h1>
        <p className="text-base sm:text-lg text-mutedGray leading-relaxed font-light">
          From algorithmic Starters podiums to national hackathon championships, explore the verified milestones of CodeChef ABESEC.
        </p>
      </div>

      {/* High-Level Stat Counters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {highlights.map((h, i) => (
          <div
            key={i}
            className="p-6 rounded-2xl bg-deepNavy border border-panelBorder hover:border-crewRed/50 transition-all glow-red relative overflow-hidden"
          >
            <div className="font-heading font-black text-4xl sm:text-5xl text-crewRed tracking-tight">
              {h.stat}
            </div>
            <div className="font-mono text-xs font-bold uppercase tracking-wider text-crewYellow mt-2">
              {h.label}
            </div>
            <p className="text-xs text-mutedGray mt-1 leading-relaxed">
              {h.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Hall of Fame Expeditions */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <span className="font-mono text-xs uppercase tracking-widest text-crewCyan font-bold">
              EXPEDITION TROPHIES
            </span>
            <h2 className="font-heading font-black text-2xl sm:text-3xl text-offWhite uppercase">
              HALL OF FAME
            </h2>
          </div>
          <span className="hidden sm:inline-block font-mono text-xs text-mutedGray">
            OFFICIAL CERTIFICATIONS
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {hallOfFame.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-deepNavy border border-panelBorder hover:border-crewRed/60 transition-all duration-300 space-y-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="w-10 h-10 rounded-xl bg-spaceBlack/60 border border-crewRed/40 flex items-center justify-center shrink-0">
                  <Trophy className="w-5 h-5 text-crewYellow" />
                </div>
                <span className="font-mono text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-crewRed/20 border border-crewRed text-crewYellow">
                  {item.badge}
                </span>
              </div>

              <div>
                <h3 className="font-heading font-black text-xl text-offWhite tracking-tight">
                  {item.title}
                </h3>
                <div className="font-mono text-xs text-crewCyan mt-0.5">
                  {item.event}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-spaceBlack/60 border border-panelBorder space-y-1 text-xs font-mono">
                <div className="text-offWhite font-semibold">{item.team}</div>
                <div className="text-mutedGray text-[11px]">{item.members}</div>
                <div className="text-crewYellow font-bold text-[11px] pt-1 border-t border-panelBorder/70">
                  {item.rank}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chapter Star Coders Leaderboard */}
      <div className="p-8 rounded-3xl bg-deepNavy border border-panelBorder space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-crewYellow font-bold">
              CODECHEF RATINGS
            </span>
            <h2 className="font-heading font-black text-2xl sm:text-3xl text-offWhite uppercase">
              TOP STAR CODERS LEADERBOARD
            </h2>
          </div>
          <div className="font-mono text-xs text-mutedGray flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            LIVE CHAPTER RANKINGS
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="border-b border-panelBorder text-mutedGray uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4">#</th>
                <th className="py-3 px-4">Cadet Name</th>
                <th className="py-3 px-4">CodeChef Handle</th>
                <th className="py-3 px-4">Stars</th>
                <th className="py-3 px-4">Rating</th>
                <th className="py-3 px-4">Problems Solved</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-panelBorder/60">
              {starCoders.map((coder, i) => (
                <tr key={i} className="hover:bg-spaceNavy/60 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-crewCyan">0{i + 1}</td>
                  <td className="py-3.5 px-4 font-bold text-offWhite">{coder.name}</td>
                  <td className="py-3.5 px-4 text-crewCyan">@{coder.handle}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded bg-crewYellow/10 text-crewYellow border border-crewYellow/30 font-bold">
                      {coder.stars}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-crewRed">{coder.rating}</td>
                  <td className="py-3.5 px-4 text-mutedGray">{coder.solved}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CTA Box */}
      <div className="text-center py-10 space-y-4">
        <h3 className="font-heading font-black text-2xl sm:text-3xl text-offWhite uppercase">
          READY TO CLIMB THE LEADERBOARD?
        </h3>
        <p className="text-xs sm:text-sm text-mutedGray max-w-md mx-auto">
          Participate in our weekly speed coding blitzes and official CodeChef Starters to earn your stars.
        </p>
        <button
          onClick={() => onNavigate('events')}
          className="inline-flex items-center gap-2 bg-crewRed hover:bg-darkRed text-white px-6 py-3 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all glow-red shadow-lg"
        >
          <span>VIEW UPCOMING MISSIONS</span>
          <ArrowRight className="w-4 h-4 text-crewYellow" />
        </button>
      </div>

    </div>
  );
};
