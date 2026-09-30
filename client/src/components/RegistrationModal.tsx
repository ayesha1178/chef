import React, { useState, useEffect, useRef } from 'react';
import { X, Calendar, MapPin, Clock, Ticket, CheckCircle2, AlertCircle, Loader2, Download, Radio, ShieldCheck, Terminal } from 'lucide-react';
import confetti from 'canvas-confetti';
import { EventItem, RegistrationItem } from '../types';
import { api } from '../services/api';
import { useToast } from '../context/ToastContext';
import { SecretMissionBadge, CrewmateIllustration } from './DecorativeElements';

interface RegistrationModalProps {
  event: EventItem | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccessRegistered?: (registration: RegistrationItem) => void;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({
  event,
  isOpen,
  onClose,
  onSuccessRegistered
}) => {
  const { showToast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [collegeYear, setCollegeYear] = useState('ABESEC - 3rd Year');
  const [phone, setPhone] = useState('');
  const [department, setDepartment] = useState('Computer Science & Engineering');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registeredData, setRegisteredData] = useState<RegistrationItem | null>(null);

  const modalRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setName('');
      setEmail('');
      setPhone('');
      setErrors({});
      setRegisteredData(null);
      setTimeout(() => firstInputRef.current?.focus(), 100);
    }
  }, [isOpen, event]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !event) return null;

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!name.trim() || name.trim().length < 2) {
      newErrors.name = 'Please enter your full legal name.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      newErrors.email = 'Please provide a valid college or personal email address.';
    }

    const phoneDigits = phone.replace(/[^0-9]/g, '');
    if (!phoneDigits || phoneDigits.length < 10) {
      newErrors.phone = 'Please enter a 10-digit mobile number for dispatch alerts.';
    }

    if (!collegeYear.trim()) {
      newErrors.collegeYear = 'College and year of study is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setErrors({});

    try {
      const res = await api.registerForEvent(event.id, {
        name: name.trim(),
        email: email.trim(),
        collegeYear: collegeYear.trim(),
        phone: phone.trim(),
        department: department.trim()
      });

      if (res.success && res.data.registration) {
        setRegisteredData(res.data.registration);
        showToast('success', 'MISSION ACCEPTED', 'Crew pass has been generated and dispatched.');

        // Trigger celebratory confetti in spaceship colors
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#E50914', '#54D8E8', '#FFD447', '#FF6A00', '#F4F4F1']
        });

        if (onSuccessRegistered) {
          onSuccessRegistered(res.data.registration);
        }
      }
    } catch (err: any) {
      const msg = err.message || 'Mission enrollment failed. Please verify your details.';
      setErrors({ form: msg });
      showToast('error', 'DEPLOYMENT ERROR', msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="crew-assignment-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-spaceBlack/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={modalRef}
        className="w-full max-w-lg bg-deepNavy rounded-3xl border border-panelBorder shadow-2xl overflow-hidden my-8 relative"
      >
        {/* Modal Header */}
        <div className="bg-spaceBlack/90 text-offWhite px-6 py-5 relative flex items-center justify-between border-b border-panelBorder">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs uppercase tracking-widest text-crewRed font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-crewRed" />
                CREW ASSIGNMENT // PROTOCOL
              </span>
            </div>
            <h2 id="crew-assignment-title" className="font-heading font-black text-xl text-offWhite uppercase truncate mt-0.5 tracking-tight">
              {event.name}
            </h2>
          </div>

          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 rounded-full bg-deepNavy hover:bg-spaceBlack text-mutedGray hover:text-white transition-colors border border-panelBorder"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {registeredData ? (
            /* MISSION ACCEPTED SUCCESS STATE */
            <div className="text-center py-4 space-y-6">
              {/* Mini Character Vector */}
              <div className="mx-auto w-24 h-28 flex items-center justify-center">
                <CrewmateIllustration color="red" size="md" hasChefHat />
              </div>

              <div>
                <span className="font-mono text-xs tracking-widest uppercase text-crewCyan font-bold">
                  TRANSMISSION CONFIRMED
                </span>
                <h3 className="font-heading font-black text-3xl sm:text-4xl text-offWhite uppercase tracking-tight mt-1">
                  MISSION ACCEPTED ✓
                </h3>
                <p className="text-xs sm:text-sm text-mutedGray mt-1 max-w-xs mx-auto">
                  Your seat has been reserved in the crew roster. Save your boarding pass below.
                </p>
              </div>

              {/* Holographic Crew Ticket Card */}
              <div className="bg-spaceBlack/80 rounded-2xl border border-panelBorder p-5 text-left space-y-3 relative overflow-hidden shadow-inner">
                <div className="flex items-center justify-between border-b border-panelBorder pb-2">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-mutedGray">
                      CREW MEMBER
                    </span>
                    <h4 className="font-bold text-sm text-offWhite">{registeredData.name}</h4>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-mutedGray">
                      CREW PASS ID
                    </span>
                    <div className="font-mono font-bold text-xs text-crewCyan bg-deepNavy px-2 py-0.5 rounded border border-crewCyan/30">
                      {registeredData.ticketId}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                  <div>
                    <span className="text-[10px] text-mutedGray block">MISSION</span>
                    <span className="font-semibold text-offWhite truncate block">{event.name}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-mutedGray block">DEPLOYMENT TIME</span>
                    <span className="font-semibold text-crewYellow block">{event.date} • {event.time}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-[10px] text-mutedGray block">MISSION SECTOR</span>
                    <span className="font-semibold text-offWhite block">{event.venue}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-panelBorder flex items-center justify-between text-[11px] text-mutedGray font-mono">
                  <span>Present this boarding pass or ID at the lab checkpoint.</span>
                  <Ticket className="w-4 h-4 text-crewRed" />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-3 px-4 rounded-xl bg-crewRed text-white font-mono text-xs font-bold uppercase tracking-wider hover:bg-darkRed transition-all shadow-md"
                >
                  RETURN TO MISSIONS
                </button>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="py-3 px-4 rounded-xl bg-deepNavy border border-panelBorder text-offWhite font-mono text-xs font-semibold hover:border-crewCyan/50 transition-colors flex items-center justify-center gap-1.5"
                >
                  <Download className="w-4 h-4 text-crewCyan" />
                  <span>DOWNLOAD PASS</span>
                </button>
              </div>
            </div>
          ) : (
            /* CREW REGISTRATION FORM */
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              {/* Mission Brief Pill */}
              <div className="p-3.5 rounded-2xl bg-spaceBlack/60 border border-panelBorder flex items-center justify-between gap-3 text-xs font-mono">
                <div className="flex items-center gap-2 text-crewRed font-bold">
                  <Calendar className="w-4 h-4" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-2 text-mutedGray">
                  <Clock className="w-4 h-4 text-crewCyan" />
                  <span>{event.time.split('(')[0]}</span>
                </div>
                <div className="text-crewYellow font-bold">
                  {event.seatsLeft !== undefined ? `${event.seatsLeft} slots open` : 'Open'}
                </div>
              </div>

              {/* Error Banner */}
              {errors.form && (
                <div className="p-3 rounded-xl bg-darkRed/50 border border-crewRed text-white text-xs flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-crewRed" />
                  <span>{errors.form}</span>
                </div>
              )}

              {/* Full Name */}
              <div>
                <label htmlFor="reg-name" className="block text-xs font-mono font-semibold uppercase tracking-wider text-mutedGray mb-1">
                  FULL NAME *
                </label>
                <input
                  ref={firstInputRef}
                  id="reg-name"
                  type="text"
                  required
                  placeholder="e.g. Student Name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
                  }}
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-spaceBlack border text-sm text-offWhite focus:outline-none transition-all ${
                    errors.name ? 'border-red-500' : 'border-panelBorder focus:border-panelBorder'
                  }`}
                />
                {errors.name && <p className="text-[11px] text-red-400 mt-1 font-mono">{errors.name}</p>}
              </div>

              {/* Email Address */}
              <div>
                <label htmlFor="reg-email" className="block text-xs font-mono font-semibold uppercase tracking-wider text-mutedGray mb-1">
                  CAMPUS / PERSONAL EMAIL *
                </label>
                <input
                  id="reg-email"
                  type="email"
                  required
                  placeholder="e.g. student@abes.ac.in"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
                  }}
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-spaceBlack border text-sm text-offWhite focus:outline-none transition-all ${
                    errors.email ? 'border-red-500' : 'border-panelBorder focus:border-panelBorder'
                  }`}
                />
                {errors.email && <p className="text-[11px] text-red-400 mt-1 font-mono">{errors.email}</p>}
              </div>

              {/* College & Year and Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="reg-year" className="block text-xs font-mono font-semibold uppercase tracking-wider text-mutedGray mb-1">
                    ACADEMIC COHORT *
                  </label>
                  <select
                    id="reg-year"
                    value={collegeYear}
                    onChange={(e) => setCollegeYear(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-spaceBlack border border-panelBorder text-sm text-offWhite focus:outline-none focus:border-panelBorder"
                  >
                    <option value="ABESEC - 1st Year">ABESEC - 1st Year (Rookie)</option>
                    <option value="ABESEC - 2nd Year">ABESEC - 2nd Year (Explorer)</option>
                    <option value="ABESEC - 3rd Year">ABESEC - 3rd Year (Senior)</option>
                    <option value="ABESEC - 4th Year">ABESEC - 4th Year (Commander)</option>
                    <option value="Other College - Student">External Campus Student</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="reg-phone" className="block text-xs font-mono font-semibold uppercase tracking-wider text-mutedGray mb-1">
                    PHONE NUMBER *
                  </label>
                  <input
                    id="reg-phone"
                    type="tel"
                    required
                    placeholder="e.g. 9876543210"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (errors.phone) setErrors((prev) => ({ ...prev, phone: '' }));
                    }}
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-spaceBlack border text-sm text-offWhite focus:outline-none transition-all ${
                      errors.phone ? 'border-red-500' : 'border-panelBorder focus:border-panelBorder'
                    }`}
                  />
                  {errors.phone && <p className="text-[11px] text-red-400 mt-1 font-mono">{errors.phone}</p>}
                </div>
              </div>

              {/* Department */}
              <div>
                <label htmlFor="reg-dept" className="block text-xs font-mono font-semibold uppercase tracking-wider text-mutedGray mb-1">
                  DEPARTMENT // DIVISION (OPTIONAL)
                </label>
                <select
                  id="reg-dept"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-spaceBlack border border-panelBorder text-sm text-offWhite focus:outline-none focus:border-panelBorder"
                >
                  <option value="Computer Science & Engineering">Computer Science & Engineering (CSE)</option>
                  <option value="AI & Machine Learning">AI & Machine Learning (AIML)</option>
                  <option value="Information Technology">Information Technology (IT)</option>
                  <option value="Data Science">Data Science (DS)</option>
                  <option value="Electronics & Communication">Electronics & Communication (ECE)</option>
                  <option value="Mechanical / Electrical">Mechanical / Electrical</option>
                </select>
              </div>

              {/* Buttons */}
              <div className="pt-3 flex items-center justify-end gap-3 border-t border-panelBorder">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isSubmitting}
                  className="px-4 py-2 text-xs font-mono text-mutedGray hover:text-offWhite transition-colors"
                >
                  ABORT
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-2 bg-gradient-to-r from-crewRed to-darkRed hover:from-darkRed hover:to-crewRed text-white px-6 py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-md hover:brightness-110 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-crewYellow" />
                      <span>ENROLLING CREW...</span>
                    </>
                  ) : (
                    <span>JOIN THE CREW →</span>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
