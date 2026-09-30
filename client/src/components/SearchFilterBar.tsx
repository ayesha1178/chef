import React from 'react';
import { Search, X, SlidersHorizontal, Terminal, Radio } from 'lucide-react';

interface SearchFilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  statusFilter: 'all' | 'upcoming' | 'past';
  onStatusChange: (status: 'all' | 'upcoming' | 'past') => void;
  sortBy: 'date_asc' | 'date_desc' | 'name';
  onSortChange: (sort: 'date_asc' | 'date_desc' | 'name') => void;
  onClearFilters?: () => void;
  onReset?: () => void;
  hasActiveFilters?: boolean;
  totalResults?: number;
}

const MISSION_CATEGORIES: { id: string; label: string }[] = [
  { id: 'all', label: 'ALL MISSIONS' },
  { id: 'Competitive Programming', label: 'COMPETITIVE PROGRAMMING' },
  { id: 'DSA', label: 'DSA' },
  { id: 'Workshop', label: 'WORKSHOPS' },
  { id: 'Hackathon', label: 'HACKATHONS' },
  { id: 'Tech Talk', label: 'TECH TALKS' },
  { id: 'Contests', label: 'CONTESTS' },
  { id: 'Community', label: 'COMMUNITY' },
  { id: 'Recruitment', label: 'RECRUITMENT' },
];

export const SearchFilterBar: React.FC<SearchFilterBarProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  statusFilter,
  onStatusChange,
  sortBy,
  onSortChange,
  onClearFilters,
  onReset,
  hasActiveFilters,
  totalResults
}) => {
  const handleClear = () => {
    if (onClearFilters) onClearFilters();
    else if (onReset) onReset();
  };

  const isFiltered = hasActiveFilters !== undefined
    ? hasActiveFilters
    : searchQuery.trim().length > 0 || selectedCategory !== 'all' || statusFilter !== 'upcoming';

  return (
    <div className="bg-deepNavy/90 rounded-3xl border border-panelBorder p-4 sm:p-6 shadow-2xl backdrop-blur-md space-y-4">
      {/* Top Search & Controls Row */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        {/* HUD Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-crewCyan absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="SEARCH MISSIONS, PROTOCOLS, OR VENUE COORDINATES..."
            className="w-full pl-11 pr-10 py-3 rounded-2xl bg-spaceBlack/90 border border-panelBorder text-xs font-mono uppercase tracking-wider text-offWhite placeholder:text-mutedGray/50 focus:outline-none focus:border-crewRed focus:ring-1 focus:ring-crewRed transition-all"
            aria-label="Search missions"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-mutedGray hover:text-crewRed"
              aria-label="Clear search input"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Sort & Status Selectors */}
        <div className="flex items-center gap-2">
          {/* Status filter: ALL / UPCOMING / PAST */}
          <div className="bg-spaceBlack/90 p-1 rounded-2xl border border-panelBorder flex items-center">
            <button
              onClick={() => onStatusChange('all')}
              className={`px-3 py-1.5 rounded-xl font-mono text-[11px] uppercase tracking-wider font-bold transition-all ${
                statusFilter === 'all'
                  ? 'bg-crewRed text-white shadow-sm glow-red'
                  : 'text-mutedGray hover:text-offWhite'
              }`}
            >
              ALL
            </button>
            <button
              onClick={() => onStatusChange('upcoming')}
              className={`px-3 py-1.5 rounded-xl font-mono text-[11px] uppercase tracking-wider font-bold transition-all ${
                statusFilter === 'upcoming'
                  ? 'bg-crewRed text-white shadow-sm glow-red'
                  : 'text-mutedGray hover:text-offWhite'
              }`}
            >
              UPCOMING
            </button>
            <button
              onClick={() => onStatusChange('past')}
              className={`px-3 py-1.5 rounded-xl font-mono text-[11px] uppercase tracking-wider font-bold transition-all ${
                statusFilter === 'past'
                  ? 'bg-crewRed text-white shadow-sm glow-red'
                  : 'text-mutedGray hover:text-offWhite'
              }`}
            >
              PAST
            </button>
          </div>

          {/* Sort Selector */}
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as any)}
            className="px-3.5 py-2.5 rounded-2xl bg-spaceBlack/90 border border-panelBorder font-mono text-xs uppercase tracking-wider text-offWhite focus:outline-none focus:border-crewRed cursor-pointer"
            aria-label="Sort missions"
          >
            <option value="date_asc">DATE: NEAREST</option>
            <option value="date_desc">DATE: LATEST</option>
            <option value="name">MISSION NAME (A-Z)</option>
          </select>
        </div>
      </div>

      {/* Category Pills HUD Row */}
      <div className="flex items-center justify-between gap-4 pt-2 border-t border-panelBorder/60 overflow-x-auto pb-1 scrollbar-none">
        <div className="flex items-center gap-1.5 shrink-0">
          <Terminal className="w-3.5 h-3.5 text-crewCyan mr-1 hidden sm:inline" />
          {MISSION_CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onCategoryChange(cat.id)}
                className={`px-3 py-1 rounded-xl font-mono text-[11px] uppercase tracking-wider transition-all shrink-0 ${
                  isActive
                    ? 'bg-crewRed text-white font-bold border border-crewRed shadow-sm glow-red'
                    : 'bg-spaceBlack/60 text-mutedGray hover:text-offWhite hover:bg-spaceNavy border border-panelBorder'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Clear Filters Button if active */}
        {isFiltered && (
          <button
            onClick={handleClear}
            className="shrink-0 flex items-center gap-1.5 font-mono text-xs text-crewYellow hover:text-white transition-colors uppercase font-bold"
          >
            <X className="w-3.5 h-3.5 text-crewYellow" />
            <span>RESET RADAR</span>
          </button>
        )}
      </div>
    </div>
  );
};
