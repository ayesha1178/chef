import React, { useState } from 'react';
import { ShieldCheck, Lock, Mail, ArrowRight, ArrowLeft, Loader2, Key, Terminal } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { SecretMissionBadge, CrewmateIllustration } from '../components/DecorativeElements';

interface AdminLoginPageProps {
  onSuccessLogin: () => void;
  onBackToHome: () => void;
}

export const AdminLoginPage: React.FC<AdminLoginPageProps> = ({
  onSuccessLogin,
  onBackToHome
}) => {
  const { login } = useAuth();
  const { showToast } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg('Please provide officer email and authorization key.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      await login(email.trim(), password);
      showToast('success', 'OFFICER AUTHENTICATED', 'Welcome to Mission Control Command.');
      onSuccessLogin();
    } catch (err: any) {
      const msg = err.message || 'Authorization failed. Invalid officer credentials.';
      setErrorMsg(msg);
      showToast('error', 'AUTHORIZATION DENIED', msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFillDemoCreds = () => {
    setEmail('admin@codechefabesec.in');
    setPassword('codechef2026');
    setErrorMsg(null);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 relative overflow-hidden bg-spaceBlack">
      {/* Background Star Particles */}
      <div className="absolute inset-0 bg-starfield opacity-40 pointer-events-none" />
      <div className="absolute inset-0 bg-cockpit-grid opacity-20 pointer-events-none" />

      <div className="w-full max-w-md bg-deepNavy rounded-3xl border border-panelBorder shadow-2xl overflow-hidden relative z-10">
        
        {/* Top Spaceship Header */}
        <div className="bg-spaceBlack/90 text-offWhite p-7 border-b border-panelBorder relative">
          <button
            onClick={onBackToHome}
            className="flex items-center gap-1.5 text-xs font-mono text-mutedGray hover:text-crewCyan mb-4 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>← Return to Flight Deck</span>
          </button>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] text-crewYellow font-bold tracking-widest uppercase">
                  CLASSIFIED // OFFICER CLEARANCE
                </span>
              </div>
              <h1 className="font-heading font-black text-2xl text-offWhite tracking-tight uppercase">
                MISSION CONTROL
              </h1>
              <div className="font-mono text-xs text-mutedGray">
                CodeChef ABESEC Command Terminal
              </div>
            </div>
            
            <div className="w-12 h-12 rounded-2xl bg-deepNavy border border-panelBorder flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-crewRed" />
            </div>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-7 space-y-6">
          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-crewRed/20 border border-crewRed text-offWhite text-xs font-mono leading-relaxed">
              [!] {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="admin-email" className="block text-xs font-mono font-bold uppercase tracking-wider text-mutedGray mb-1">
                Officer Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-mutedGray">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  id="admin-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@codechefabesec.in"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-spaceBlack/80 border border-panelBorder text-offWhite text-xs font-mono placeholder-mutedGray/50 focus:outline-none focus:border-panelBorder transition-colors"
                  autoComplete="email"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="admin-pass" className="block text-xs font-mono font-bold uppercase tracking-wider text-mutedGray mb-1">
                Security Passcode
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-mutedGray">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="admin-pass"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-spaceBlack/80 border border-panelBorder text-offWhite text-xs font-mono placeholder-mutedGray/50 focus:outline-none focus:border-panelBorder transition-colors"
                  autoComplete="current-password"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-crewRed to-darkRed hover:from-darkRed hover:to-crewRed text-white py-3.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-lg hover:brightness-110 disabled:opacity-50 mt-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-crewYellow" />
                  <span>AUTHENTICATING TELEMETRY...</span>
                </>
              ) : (
                <>
                  <span>INITIALIZE MISSION CONTROL</span>
                  <ArrowRight className="w-4 h-4 text-crewYellow" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Credentials Autofill Helper */}
          <div className="pt-4 border-t border-panelBorder space-y-2">
            <div className="flex items-center justify-between text-[11px] font-mono text-mutedGray">
              <span>DEMO CLEARANCE CREDENTIALS:</span>
              <button
                type="button"
                onClick={handleFillDemoCreds}
                className="text-crewCyan hover:text-white underline font-bold"
              >
                Autofill Credentials
              </button>
            </div>
            <div className="p-3 rounded-xl bg-spaceBlack/60 border border-panelBorder font-mono text-[11px] text-mutedGray space-y-0.5">
              <div>Email: <span className="text-offWhite">admin@codechefabesec.in</span></div>
              <div>Passcode: <span className="text-offWhite">codechef2026</span></div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
