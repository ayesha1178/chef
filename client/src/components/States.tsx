import React from 'react';
import { AlertTriangle, RotateCcw, Radio, Terminal, Sparkles, FilterX } from 'lucide-react';
import { CrewmateIllustration } from './DecorativeElements';

export const LoadingSkeletonGrid: React.FC<{ count?: number }> = ({ count = 6 }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 font-mono text-xs text-crewCyan uppercase tracking-widest animate-pulse">
        <Radio className="w-4 h-4 text-crewRed animate-ping" />
        <span>MISSION TELEMETRY INITIALIZING...</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="bg-deepNavy/70 rounded-3xl border border-panelBorder overflow-hidden shadow-xl animate-pulse flex flex-col h-[420px]"
          >
            <div className="aspect-16/10 bg-spaceBlack/80 w-full" />
            <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="w-1/3 h-4 bg-panelBorder/40 rounded" />
                <div className="w-4/5 h-6 bg-panelBorder/60 rounded" />
                <div className="w-1/2 h-3 bg-panelBorder/30 rounded" />
                <div className="w-full h-10 bg-panelBorder/20 rounded mt-3" />
              </div>
              <div className="pt-4 border-t border-panelBorder/50 flex justify-between items-center">
                <div className="w-1/3 h-4 bg-panelBorder/30 rounded" />
                <div className="w-16 h-6 bg-panelBorder/40 rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const ErrorState: React.FC<{
  title?: string;
  message?: string;
  onRetry?: () => void;
}> = ({
  title = 'MISSION SYSTEM ERROR',
  message = 'Telemetry transmission interrupted. Comm-link lost with mothership.',
  onRetry
}) => {
  return (
    <div className="py-16 px-4 text-center max-w-md mx-auto space-y-4 bg-deepNavy/80 rounded-3xl border border-crewRed/40 shadow-2xl backdrop-blur-md">
      <div className="w-14 h-14 bg-darkRed/50 text-crewRed rounded-2xl mx-auto flex items-center justify-center glow-red">
        <AlertTriangle className="w-7 h-7" />
      </div>
      <div>
        <h3 className="font-heading font-black text-xl text-offWhite uppercase tracking-tight text-glow-red">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-mutedGray mt-1 leading-relaxed font-mono">
          {message}
        </p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-crewRed hover:bg-darkRed text-white text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-md glow-red"
        >
          <RotateCcw className="w-4 h-4" />
          <span>REBOOT COMM-LINK</span>
        </button>
      )}
    </div>
  );
};

export const EmptyEventsState: React.FC<{
  hasFilters?: boolean;
  onClearFilters?: () => void;
  onResetFilters?: () => void;
}> = ({ hasFilters, onClearFilters, onResetFilters }) => {
  const handleReset = onClearFilters || onResetFilters;
  return (
    <div className="py-16 px-4 text-center max-w-md mx-auto space-y-5 bg-deepNavy/70 rounded-3xl border border-panelBorder">
      <div className="mx-auto w-20 h-24 flex items-center justify-center opacity-85">
        <CrewmateIllustration color="cyan" size="sm" />
      </div>
      <div className="space-y-1">
        <div className="font-mono text-[10px] text-crewCyan uppercase tracking-widest font-bold">
          SECTOR SCAN COMPLETE
        </div>
        <h3 className="font-heading font-black text-2xl text-offWhite uppercase tracking-tight">
          {hasFilters ? 'NO MATCHING MISSIONS' : 'NO ACTIVE MISSIONS'}
        </h3>
        <p className="text-xs text-mutedGray leading-relaxed font-mono">
          {hasFilters
            ? 'No telemetry found for the specified sector filters. Try adjusting your query.'
            : 'Standby for new deployment orders. Flight commanders are calibrating the next challenges.'}
        </p>
      </div>
      {hasFilters && handleReset && (
        <button
          onClick={handleReset}
          className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-crewRed text-white text-xs font-mono uppercase tracking-wider hover:bg-darkRed transition-colors shadow-md glow-red"
        >
          <FilterX className="w-4 h-4" />
          <span>RESET RADAR FILTERS</span>
        </button>
      )}
    </div>
  );
};
