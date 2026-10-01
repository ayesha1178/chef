import React from 'react';
import { Calendar, Clock, MapPin, ArrowRight, Users, Terminal, Radio } from 'lucide-react';
import { EventItem } from '../types';
import { MissionModulePill } from './DecorativeElements';

interface EventCardProps {
  event: EventItem;
  onSelect?: (eventId: string) => void;
  onSelectEvent?: (eventId: string) => void;
  onRegisterClick?: (eventId: string, e: React.MouseEvent) => void;
  onRegisterEvent?: (eventId: string, e?: React.MouseEvent) => void;
  variant?: 'default' | 'featured' | 'compact';
  missionIndex?: number;
}

export const EventCard: React.FC<EventCardProps> = ({
  event,
  onSelect,
  onSelectEvent,
  onRegisterClick,
  onRegisterEvent,
  missionIndex
}) => {
  const isFull = event.seatsLeft !== undefined && event.seatsLeft <= 0;
  const isLowSeats = event.seatsLeft !== undefined && event.seatsLeft > 0 && event.seatsLeft <= 15;

  const handleCardClick = () => {
    if (onSelect) onSelect(event.id);
    else if (onSelectEvent) onSelectEvent(event.id);
  };

  const handleRegister = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onRegisterClick) onRegisterClick(event.id, e);
    else if (onRegisterEvent) onRegisterEvent(event.id, e);
  };

  const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  const missionLabel = missionIndex
    ? `MISSION // 00${missionIndex}`
    : event.edition || 'MISSION // OPEN';

  return (
    <article
      onClick={handleCardClick}
      className="group cursor-pointer flex flex-col h-full bg-deepNavy/80 hover:bg-deepNavy rounded-3xl border border-panelBorder hover:border-crewRed/70 overflow-hidden shadow-xl hover:shadow-[0_10px_30px_rgba(229,9,20,0.25)] transition-all duration-300 relative focus-within:ring-2 focus-within:ring-crewRed backdrop-blur-sm"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCardClick();
        }
      }}
      aria-label={`Mission: ${event.name}`}
    >
      {/* Top Banner with Image and HUD overlays */}
      <div className="relative aspect-16/10 w-full overflow-hidden bg-spaceBlack">
        <img
          src={event.imageUrl || event.image}
          alt={event.name}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 filter brightness-90 group-hover:brightness-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-deepNavy via-deepNavy/40 to-transparent" />

        {/* Top Mission Pill & Edition HUD Stamp */}
        <div className="absolute top-3.5 left-3.5 z-10">
          <MissionModulePill category={event.category} size="sm" active />
        </div>

        <div className="absolute top-3.5 right-3.5 z-10 bg-spaceBlack/85 backdrop-blur-md px-2.5 py-1 rounded-md border border-crewRed/40 text-crewRed font-mono text-[10px] tracking-widest uppercase font-bold">
          {missionLabel}
        </div>

        {/* Status indicator on image */}
        <div className="absolute bottom-3 left-3 flex items-center gap-2">
          {isFull ? (
            <span className="font-mono text-[10px] font-bold uppercase bg-spaceBlack/90 border border-crewRed text-crewRed px-2.5 py-0.5 rounded shadow-sm">
              BERTHS FULL
            </span>
          ) : isLowSeats ? (
            <span className="font-mono text-[10px] font-bold uppercase bg-emergencyOrange/90 text-white px-2.5 py-0.5 rounded shadow-sm">
              ONLY {event.seatsLeft} BERTHS LEFT
            </span>
          ) : (
            <span className="font-mono text-[10px] font-bold uppercase bg-spaceBlack/80 border border-crewCyan/30 text-crewCyan px-2 py-0.5 rounded shadow-sm flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-crewCyan animate-pulse" />
              STATUS // {event.status || 'OPEN'}
            </span>
          )}
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <h3 className="font-heading font-black text-xl text-offWhite uppercase tracking-tight group-hover:text-crewRed transition-colors line-clamp-1">
            {event.name}
          </h3>

          <p className="text-xs text-mutedGray line-clamp-2 leading-relaxed">
            {event.description}
          </p>
        </div>

        {/* Spaceship Telemetry Metadata */}
        <div className="space-y-2 pt-2 border-t border-panelBorder/70 text-xs font-mono text-offWhite/80">
          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-crewRed shrink-0" />
            <span className="truncate">{formattedDate}</span>
            <span className="text-mutedGray">•</span>
            <Clock className="w-3.5 h-3.5 text-crewYellow shrink-0" />
            <span className="truncate">{event.time}</span>
          </div>

          <div className="flex items-center gap-2 text-mutedGray">
            <MapPin className="w-3.5 h-3.5 text-crewCyan shrink-0" />
            <span className="truncate">{event.venue}</span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-3 border-t border-panelBorder flex items-center justify-between">
          <div className="flex items-center gap-1.5 font-mono text-xs text-mutedGray">
            <Users className="w-3.5 h-3.5 text-crewYellow" />
            <span>
              <strong className="text-offWhite">{event.seatsLeft ?? event.capacity}</strong> / {event.capacity} BERTHS
            </span>
          </div>

          <div className="flex items-center gap-2">
            {(onRegisterClick || onRegisterEvent) && (
              <button
                type="button"
                onClick={handleRegister}
                disabled={isFull}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition-all ${
                  isFull
                    ? 'bg-panelBorder/40 text-mutedGray cursor-not-allowed'
                    : 'bg-crewRed/10 hover:bg-crewRed text-crewRed hover:text-white border border-crewRed/30 glow-red'
                }`}
              >
                {isFull ? 'FULL' : 'REGISTER'}
              </button>
            )}

            <span className="w-8 h-8 rounded-lg bg-deepNavy border border-panelBorder group-hover:border-crewRed flex items-center justify-center text-mutedGray group-hover:text-crewRed transition-all">
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </div>
        </div>
      </div>
    </article>
  );
};
