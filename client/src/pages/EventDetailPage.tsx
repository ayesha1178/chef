import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Share2, 
  Check, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle,
  Terminal,
  Radio,
  Zap,
  ArrowRight
} from 'lucide-react';
import { EventItem } from '../types';
import { api } from '../services/api';
import { SecretMissionBadge, MissionModulePill, CrewmateIllustration } from '../components/DecorativeElements';
import { useToast } from '../context/ToastContext';

interface EventDetailPageProps {
  eventId: string;
  onBack: () => void;
  onRegister: (eventId: string) => void;
}

export const EventDetailPage: React.FC<EventDetailPageProps> = ({
  eventId,
  onBack,
  onRegister
}) => {
  const { showToast } = useToast();
  const [event, setEvent] = useState<EventItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function fetchEventDetails() {
      setIsLoading(true);
      setError(null);
      try {
        const res = await api.getEventById(eventId);
        if (res.success && res.data) {
          setEvent(res.data);
        } else {
          setError('Mission not found.');
        }
      } catch (err: any) {
        setError(err.message || 'Failed to load mission details.');
      } finally {
        setIsLoading(false);
      }
    }

    fetchEventDetails();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [eventId]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    showToast('info', 'BEACON TRANSMITTED', 'Mission link copied to clipboard.');
    setTimeout(() => setCopied(false), 2500);
  };

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-8 animate-pulse">
        <div className="w-32 h-6 bg-deepNavy rounded-lg" />
        <div className="aspect-21/9 bg-deepNavy rounded-3xl w-full" />
        <div className="space-y-4">
          <div className="w-2/3 h-10 bg-deepNavy rounded-lg" />
          <div className="w-full h-32 bg-deepNavy rounded-2xl" />
        </div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-14 h-14 bg-crewRed/20 text-crewRed rounded-full mx-auto flex items-center justify-center glow-red">
          <AlertCircle className="w-7 h-7" />
        </div>
        <h2 className="font-heading font-bold text-2xl text-offWhite uppercase">MISSION SYSTEM ERROR</h2>
        <p className="text-sm text-mutedGray">{error || 'This mission does not exist or has been aborted.'}</p>
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-crewRed text-white text-xs font-mono font-bold uppercase tracking-wider glow-red"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>RETURN TO MISSIONS RADAR</span>
        </button>
      </div>
    );
  }

  const isFull = event.seatsLeft !== undefined && event.seatsLeft <= 0;
  const fillPercentage = Math.min(
    100,
    Math.round(((event.capacity - (event.seatsLeft ?? event.capacity)) / event.capacity) * 100)
  );

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-10">
      
      {/* Back button & share strip */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-mutedGray hover:text-crewCyan transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>← BACK TO MISSIONS RADAR</span>
        </button>

        <button
          onClick={handleShare}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-deepNavy border border-panelBorder text-xs font-mono text-mutedGray hover:text-offWhite transition-colors"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-crewCyan" /> : <Share2 className="w-3.5 h-3.5" />}
          <span>{copied ? 'BEACON COPIED' : 'SHARE MISSION'}</span>
        </button>
      </div>

      {/* Main Mission Briefing Cockpit Card */}
      <div className="rounded-3xl bg-deepNavy border-2 border-crewRed/60 shadow-2xl overflow-hidden relative glow-red">
        
        {/* Classified Briefing Top Header */}
        <div className="bg-spaceBlack/90 px-6 py-4 border-b border-panelBorder flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-black uppercase tracking-widest text-crewRed flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-crewRed animate-ping" />
              MISSION BRIEFING
            </span>
            <span className="w-px h-3 bg-panelBorder" />
            <span className="font-mono text-xs text-mutedGray uppercase">
              SECTOR // {event.category}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] text-crewYellow bg-spaceBlack px-2.5 py-1 rounded-full border border-panelBorder font-bold uppercase">
              STATUS // {event.status || 'OPEN'}
            </span>
          </div>
        </div>

        {/* Hero Mission Image with Visor HUD */}
        <div className="relative aspect-21/9 w-full overflow-hidden border-b border-panelBorder">
          <img
            src={event.imageUrl}
            alt={event.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-spaceBlack via-spaceBlack/40 to-transparent" />
          
          <div className="absolute top-4 left-4">
            <SecretMissionBadge title="SHHH..." subtitle="CLASSIFIED PROTOCOL" />
          </div>

          <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="px-2.5 py-0.5 rounded-lg bg-crewRed text-white font-mono text-[10px] font-bold uppercase tracking-wider shadow-sm">
                {event.category}
              </span>
              <h1 className="font-heading font-black text-2xl sm:text-5xl text-offWhite uppercase tracking-tight mt-1 text-glow-red">
                {event.name}
              </h1>
            </div>

            <div className="font-mono text-xs text-offWhite bg-spaceBlack/80 px-3 py-1.5 rounded-xl border border-panelBorder backdrop-blur-md">
              <span className="text-crewCyan font-bold">{event.seatsLeft ?? event.capacity}</span> / {event.capacity} BERTHS REMAINING
            </div>
          </div>
        </div>

        {/* Mission Content Body */}
        <div className="p-6 sm:p-10 space-y-8">
          
          {/* Coordinates & Timestamps Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-spaceBlack/60 border border-panelBorder space-y-1">
              <div className="flex items-center gap-2 text-mutedGray font-mono text-xs">
                <Calendar className="w-4 h-4 text-crewRed" />
                <span>MISSION DATE</span>
              </div>
              <div className="font-mono font-bold text-sm text-offWhite">{event.date}</div>
            </div>

            <div className="p-4 rounded-2xl bg-spaceBlack/60 border border-panelBorder space-y-1">
              <div className="flex items-center gap-2 text-mutedGray font-mono text-xs">
                <Clock className="w-4 h-4 text-crewYellow" />
                <span>TIME STAMP</span>
              </div>
              <div className="font-mono font-bold text-sm text-offWhite">{event.time}</div>
            </div>

            <div className="p-4 rounded-2xl bg-spaceBlack/60 border border-panelBorder space-y-1">
              <div className="flex items-center gap-2 text-mutedGray font-mono text-xs">
                <MapPin className="w-4 h-4 text-crewCyan" />
                <span>LOCATION COORDINATES</span>
              </div>
              <div className="font-mono font-bold text-sm text-offWhite truncate">{event.venue}</div>
            </div>
          </div>

          {/* Description / Mission Intel */}
          <div className="space-y-3">
            <h3 className="font-mono text-xs uppercase tracking-widest text-crewCyan font-bold flex items-center gap-2">
              <Terminal className="w-4 h-4" />
              MISSION BRIEFING & DIRECTIVES
            </h3>
            <p className="text-sm sm:text-base text-mutedGray leading-relaxed whitespace-pre-line font-sans">
              {event.description}
            </p>
          </div>

          {/* Capacity Telemetry Gauge */}
          <div className="p-5 rounded-2xl bg-spaceBlack/60 border border-panelBorder space-y-3">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-mutedGray">CREW BERTH CAPACITY</span>
              <span className="text-crewYellow font-bold">
                {fillPercentage}% OCCUPIED ({event.seatsLeft ?? event.capacity} VACANCIES)
              </span>
            </div>
            <div className="w-full h-3 rounded-full bg-deepNavy overflow-hidden p-0.5 border border-panelBorder">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  isFull
                    ? 'bg-crewRed'
                    : fillPercentage > 80
                    ? 'bg-emergencyOrange'
                    : 'bg-gradient-to-r from-crewCyan to-crewYellow'
                }`}
                style={{ width: `${fillPercentage}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[11px] font-mono text-mutedGray">
              <span>TOTAL CREW CAPACITY: {event.capacity} CADETS</span>
              <span className={isFull ? 'text-crewRed font-bold' : 'text-emerald-400 font-bold'}>
                {isFull ? 'BERTHS EXHAUSTED' : 'ACCEPTING REGISTRATIONS'}
              </span>
            </div>
          </div>

          {/* Accept Mission CTA Row */}
          <div className="pt-4 border-t border-panelBorder flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <div className="font-mono text-xs font-bold text-offWhite uppercase">
                READY TO JOIN THIS EXPEDITION?
              </div>
              <div className="text-xs text-mutedGray">
                Registration grants you a secure digital Crew Pass with QR code verification.
              </div>
            </div>

            <button
              onClick={() => onRegister(event.id)}
              disabled={isFull}
              className={`flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-mono text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 shadow-xl ${
                isFull
                  ? 'bg-deepNavy text-mutedGray border border-panelBorder cursor-not-allowed'
                  : 'bg-gradient-to-r from-crewRed to-darkRed hover:from-darkRed hover:to-crewRed text-white hover:shadow-[0_0_30px_rgba(229,9,20,0.6)] hover:-translate-y-0.5 border border-crewRed/60 glow-red'
              }`}
            >
              <span>{isFull ? 'BERTHS FULL' : 'ACCEPT MISSION →'}</span>
              {!isFull && <ArrowRight className="w-4 h-4 text-crewYellow" />}
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
