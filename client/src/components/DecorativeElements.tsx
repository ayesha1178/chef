import React from 'react';

// Original Vector Astronaut / Crewmate Character
export const CrewmateIllustration: React.FC<{
  color?: 'red' | 'yellow' | 'cyan' | 'purple' | 'white';
  size?: 'sm' | 'md' | 'lg' | 'hero';
  className?: string;
  hasChefHat?: boolean;
}> = ({ color = 'red', size = 'md', className = '', hasChefHat = false }) => {
  const colorMap = {
    red: { body: '#E50914', shadow: '#8B0E16', highlight: '#FF414D' },
    yellow: { body: '#FFD447', shadow: '#D4A418', highlight: '#FFE785' },
    cyan: { body: '#54D8E8', shadow: '#229DB0', highlight: '#95E9F4' },
    purple: { body: '#9B51E0', shadow: '#6828A8', highlight: '#B87CEB' },
    white: { body: '#F4F4F1', shadow: '#B5BAC2', highlight: '#FFFFFF' }
  };

  const c = colorMap[color];
  const sizeMap = {
    sm: 'w-10 h-12',
    md: 'w-20 h-24',
    lg: 'w-32 h-38',
    hero: 'w-56 h-64 sm:w-64 sm:h-74'
  };

  return (
    <svg
      viewBox="0 0 100 120"
      className={`${sizeMap[size]} ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label={`${color} crewmate astronaut`}
    >
      <defs>
        {/* Visor gradient with high-tech reflection */}
        <linearGradient id={`visor-grad-${color}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8FEAF5" />
          <stop offset="45%" stopColor="#54D8E8" />
          <stop offset="100%" stopColor="#1E6E7A" />
        </linearGradient>
        {/* Glow filter */}
        <filter id={`glow-${color}`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Oxygen Backpack */}
      <rect x="10" y="38" width="18" height="46" rx="9" fill={c.shadow} />
      <rect x="12" y="40" width="14" height="42" rx="7" fill={c.body} />

      {/* Main Astronaut Body */}
      <path
        d="M26 40C26 21 37 12 55 12C73 12 84 21 84 40V82C84 87 81 92 76 94L76 106C76 111 70 114 65 114C60 114 56 110 56 105L56 94L50 94L50 105C50 110 46 114 41 114C36 114 30 111 30 106L30 94C27 92 26 87 26 82V40Z"
        fill={c.shadow}
      />
      <path
        d="M28 42C28 24 38 15 55 15C72 15 81 24 81 42V80C81 84 78 88 74 90L74 104C74 108 69 111 65 111C61 111 58 108 58 104L58 90L48 90L48 104C48 108 45 111 41 111C37 111 32 108 32 104L32 90C29 88 28 84 28 80V42Z"
        fill={c.body}
      />

      {/* Visor Outer Bezel & Glass */}
      <rect x="42" y="30" width="46" height="28" rx="14" fill="#080A0D" />
      <rect x="44" y="32" width="42" height="24" rx="12" fill={`url(#visor-grad-${color})`} />

      {/* Visor Glare / Reflection pill */}
      <ellipse cx="60" cy="38" rx="12" ry="4.5" fill="#FFFFFF" fillOpacity="0.85" transform="rotate(-10 60 38)" />
      <circle cx="76" cy="45" r="2.5" fill="#FFFFFF" fillOpacity="0.7" />

      {/* Optional Chef Hat Touch for CodeChef Inspiration */}
      {hasChefHat && (
        <g transform="translate(42, -2) scale(0.65)">
          <path
            d="M10 24C6 24 2 20 2 16C2 11 6 8 11 8C12 4 16 0 22 0C28 0 32 4 33 8C38 8 42 11 42 16C42 20 38 24 34 24H10Z"
            fill="#F4F4F1"
            stroke="#87909C"
            strokeWidth="1.5"
          />
          <rect x="8" y="24" width="28" height="8" rx="2" fill="#E50914" />
        </g>
      )}
    </svg>
  );
};

// Inspired by Reference 1: "SHHHHH!" Secrecy Stamp with Radiant Sunburst
export const SecretMissionBadge: React.FC<{
  title?: string;
  subtitle?: string;
  className?: string;
}> = ({
  title = 'SHHH...',
  subtitle = 'CLASSIFIED // MISSION IN PROGRESS',
  className = ''
}) => {
  return (
    <div className={`relative inline-flex items-center gap-3 bg-deepNavy/90 border border-crewRed/40 px-3.5 py-1.5 rounded-full shadow-lg backdrop-blur-md ${className}`}>
      {/* Mini glowing red dot */}
      <span className="relative flex h-2.5 w-2.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-crewRed opacity-75" />
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-crewRed" />
      </span>

      <span className="font-heading font-black text-xs tracking-wider text-crewRed">
        {title}
      </span>
      <span className="w-px h-3 bg-mutedGray/30" />
      <span className="font-mono text-[10px] uppercase tracking-widest text-mutedGray font-medium truncate">
        {subtitle}
      </span>
    </div>
  );
};

// Inspired by Reference 2: Original 3D Emergency Meeting Button with Hazard Frame
export const EmergencyMeetingButton: React.FC<{
  onClick: () => void;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}> = ({ onClick, size = 'sm', className = '' }) => {
  const isSm = size === 'sm';
  const isLg = size === 'lg';

  const containerWidth = isSm ? 'w-32 sm:w-36' : isLg ? 'w-44 sm:w-48' : 'w-36 sm:w-40';
  const domeSize = isSm ? 'w-11 h-11 sm:w-12 sm:h-12' : isLg ? 'w-14 h-14 sm:w-16 sm:h-16' : 'w-12 h-12 sm:w-14 sm:h-14';
  const lidHeight = isSm ? 'h-9' : isLg ? 'h-12' : 'h-10';

  return (
    <div className={`relative inline-block group cursor-pointer ${className}`} onClick={onClick}>
      {/* Outer Hazard Stripes Border Base */}
      <div className={`relative rounded-2xl p-1 hazard-stripes shadow-xl transition-transform duration-300 group-hover:scale-105 ${containerWidth}`}>
        {/* Metal Pedestal Container */}
        <div className="bg-[#101722] border border-panelBorder rounded-xl p-2.5 sm:p-3 text-center relative overflow-hidden">
          
          {/* Glass Cover Lid (Hinged at top, opens visually on hover) */}
          <div className={`absolute inset-x-2 top-1.5 ${lidHeight} bg-crewCyan/15 border border-crewCyan/40 rounded-lg backdrop-blur-xs pointer-events-none transition-all duration-300 origin-top group-hover:-translate-y-2 group-hover:opacity-60 group-hover:rotate-x-12`} />

          {/* 3D Red Emergency Dome Button */}
          <button
            type="button"
            className={`${domeSize} mx-auto rounded-full bg-gradient-to-b from-[#E52531] via-crewRed to-darkRed border-2 border-emergencyOrange/80 shadow-[0_4px_14px_rgba(181,18,27,0.6)] flex items-center justify-center active:translate-y-0.5 active:shadow-[0_1px_6px_rgba(181,18,27,0.8)] transition-all animate-emergency`}
            aria-label="Emergency Meeting"
          >
            {/* Top Gloss highlight */}
            <div className="w-6 h-3 -mt-2.5 rounded-full bg-white/40 blur-[1px]" />
          </button>

          {/* Emergency Text */}
          <div className="mt-2 font-heading font-black text-[11px] sm:text-xs tracking-tight text-white uppercase text-glow-red">
            EMERGENCY
          </div>
          <div className="font-mono text-[8px] sm:text-[9px] uppercase tracking-widest text-crewYellow font-bold">
            MEETING
          </div>
        </div>
      </div>
    </div>
  );
};

// Mini Spaceship HUD Radar Component
export const SpaceshipRadar: React.FC<{ className?: string }> = ({ className = 'w-24 h-24' }) => {
  return (
    <div className={`relative rounded-full border border-crewCyan/30 bg-deepNavy/80 overflow-hidden ${className}`}>
      {/* Concentric distance rings */}
      <div className="absolute inset-2 rounded-full border border-crewCyan/15" />
      <div className="absolute inset-5 rounded-full border border-crewCyan/15" />
      
      {/* Crosshairs */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-crewCyan/20" />
      <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-px bg-crewCyan/20" />

      {/* Sweeping line */}
      <div className="absolute inset-0 animate-radar">
        <div className="w-1/2 h-1/2 ml-auto bg-gradient-to-br from-crewCyan/30 to-transparent rounded-tr-full" />
      </div>

      {/* Blip dots (Missions / Crew) */}
      <div className="absolute top-1/3 left-1/4 w-1.5 h-1.5 rounded-full bg-crewRed animate-ping" />
      <div className="absolute top-1/3 left-1/4 w-1.5 h-1.5 rounded-full bg-crewRed" />
      <div className="absolute bottom-1/4 right-1/3 w-1.5 h-1.5 rounded-full bg-crewCyan" />
      <div className="absolute top-2/3 left-2/3 w-1.5 h-1.5 rounded-full bg-crewYellow" />
    </div>
  );
};

// Mission Category Module Badge
export const MissionModulePill: React.FC<{
  category: string;
  size?: 'sm' | 'md';
  active?: boolean;
}> = ({ category, size = 'md', active = false }) => {
  const isSm = size === 'sm';
  return (
    <span
      className={`inline-flex items-center font-mono uppercase tracking-wider rounded-lg transition-all ${
        isSm ? 'px-2 py-0.5 text-[10px]' : 'px-3 py-1 text-xs'
      } ${
        active
          ? 'bg-crewRed text-white font-bold border border-crewRed shadow-sm glow-red'
          : 'bg-deepNavy/90 text-offWhite/80 border border-panelBorder hover:border-crewCyan/50 hover:text-crewCyan'
      }`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-crewCyan mr-1.5 inline-block animate-pulse" />
      {category}
    </span>
  );
};
