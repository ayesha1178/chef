import React, { useState } from 'react';
import { X, Megaphone, AlertTriangle, Send, CheckCircle2, ShieldAlert, Sparkles, MessageSquare, Terminal } from 'lucide-react';
import { useToast } from '../context/ToastContext';

interface EmergencyMeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EmergencyMeetingModal: React.FC<EmergencyMeetingModalProps> = ({
  isOpen,
  onClose
}) => {
  const { showToast } = useToast();
  const [topic, setTopic] = useState('Contest Problem Statement Issue');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [dispatchId, setDispatchId] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      showToast('error', 'Incomplete Report', 'Please state your name, contact and briefing.');
      return;
    }

    const newId = `DISPATCH-${Math.floor(1000 + Math.random() * 9000)}-ALERT`;
    setDispatchId(newId);
    setIsSent(true);
    showToast('success', 'EMERGENCY BEACON TRANSMITTED', 'Crew mentors alerted on flight comms.');
  };

  const handleReset = () => {
    setIsSent(false);
    setMessage('');
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-spaceBlack/85 backdrop-blur-md overflow-y-auto animate-in fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-lg bg-deepNavy border border-panelBorder rounded-3xl shadow-2xl overflow-hidden my-8 relative">
        
        {/* Top Emergency Red Alarm Header */}
        <div className="bg-gradient-to-r from-darkRed via-crewRed to-darkRed text-white p-5 flex items-center justify-between border-b-2 border-emergencyOrange relative overflow-hidden">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-spaceBlack/40 border border-white/30 flex items-center justify-center animate-bounce">
              <Megaphone className="w-5 h-5 text-crewYellow" />
            </div>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-crewYellow font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-crewYellow" />
                TRANSMISSION // PRIORITY 01
              </div>
              <h2 className="font-heading font-black text-xl tracking-tight text-white uppercase">
                EMERGENCY MEETING
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close emergency modal"
            className="p-1.5 rounded-full bg-spaceBlack/30 hover:bg-spaceBlack/60 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Hazard divider line */}
        <div className="h-2 hazard-stripes" />

        {/* Modal Body */}
        <div className="p-6">
          {isSent ? (
            <div className="text-center py-6 space-y-5">
              <div className="w-16 h-16 rounded-full bg-crewRed/20 border-2 border-crewRed mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10 text-crewRed" />
              </div>

              <div className="space-y-1">
                <div className="font-mono text-xs text-crewCyan uppercase tracking-widest font-semibold">
                  BEACON RECEIVED
                </div>
                <h3 className="font-heading font-black text-2xl text-offWhite uppercase">
                  CREW ASSEMBLED
                </h3>
                <p className="text-xs text-mutedGray max-w-sm mx-auto leading-relaxed">
                  Your alert has been broadcast to CodeChef ABESEC lead coordinators and technical mentors.
                </p>
              </div>

              <div className="bg-spaceBlack/70 border border-crewRed/30 p-4 rounded-2xl font-mono text-xs space-y-1 text-left">
                <div className="text-[10px] text-mutedGray">DISPATCH TRACKER:</div>
                <div className="font-bold text-crewCyan text-sm">{dispatchId}</div>
                <div className="text-[11px] text-mutedGray pt-1">
                  Expected response time: &lt; 15 minutes during active missions.
                </div>
              </div>

              <button
                onClick={handleReset}
                className="w-full py-3 rounded-xl bg-crewRed hover:bg-darkRed text-white font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-md"
              >
                RETURN TO MISSION STATION
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex items-center gap-2 p-3 rounded-xl bg-spaceBlack/60 border border-panelBorder text-xs text-mutedGray">
                <ShieldAlert className="w-4 h-4 text-emergencyOrange shrink-0" />
                <span>
                  Report testcase anomalies, problem statement bugs, or request instant crew assistance.
                </span>
              </div>

              {/* Alert Category */}
              <div>
                <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-mutedGray mb-1">
                  REPORT NATURE // REASON
                </label>
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-spaceBlack border border-panelBorder text-sm text-offWhite focus:outline-none focus:border-panelBorder"
                >
                  <option value="Contest Problem Statement Issue">Contest Problem Statement / Testcase Issue</option>
                  <option value="Mission Registration / Pass Issue">Mission Registration or Pass Verification Issue</option>
                  <option value="Technical Query for Mentors">Technical Query / DSA Assistance</option>
                  <option value="Suspicious Impostor Activity">Suspicious / Plagiarized Code Submission</option>
                  <option value="Propose New Mission">Propose New Workshop / Challenge Topic</option>
                </select>
              </div>

              {/* Full Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-mutedGray mb-1">
                    Crew Member Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Student Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-spaceBlack border border-panelBorder text-sm text-offWhite focus:outline-none focus:border-panelBorder"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-mutedGray mb-1">
                    Campus Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. student@abes.ac.in"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-spaceBlack border border-panelBorder text-sm text-offWhite focus:outline-none focus:border-panelBorder"
                  />
                </div>
              </div>

              {/* Message Details */}
              <div>
                <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-mutedGray mb-1">
                  Incident Briefing / Request *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Describe what occurred or how the crew can assist you immediately..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-spaceBlack border border-panelBorder text-sm text-offWhite focus:outline-none focus:border-panelBorder"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-mono text-mutedGray hover:text-offWhite"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 bg-gradient-to-r from-crewRed to-emergencyOrange hover:brightness-110 text-white px-5 py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-md"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>TRANSMIT ALERT</span>
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
