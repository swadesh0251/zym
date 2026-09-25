import React, { useState } from 'react';
import { X, Check, CheckCircle2, ShieldCheck, ArrowRight, Lock } from 'lucide-react';
import { MembershipPlan } from '../types';

interface PlanCheckoutModalProps {
  plan: MembershipPlan | null;
  isAnnual: boolean;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (planName: string) => void;
}

export const PlanCheckoutModal: React.FC<PlanCheckoutModalProps> = ({
  plan,
  isAnnual,
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [athleteName, setAthleteName] = useState('');
  const [athleteEmail, setAthleteEmail] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);

  if (!isOpen || !plan) return null;

  const price = isAnnual ? plan.annualPricePerMonth : plan.monthlyPrice;
  const annualTotal = price * 12;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!athleteName.trim() || !athleteEmail.trim()) return;
    setIsCompleted(true);
    onSuccess(plan.name);
  };

  const handleFinish = () => {
    setIsCompleted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-[#0e1118] border border-neutral-800 rounded-xl shadow-2xl overflow-hidden text-neutral-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-neutral-800 bg-[#121620]">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-[#ccff00]">
              Athlete Onboarding
            </div>
            <h3 className="font-display text-lg font-bold text-white">
              {isCompleted ? 'Membership Activated' : `Join ${plan.name}`}
            </h3>
          </div>
          <button
            onClick={handleFinish}
            className="p-1.5 text-neutral-400 hover:text-white rounded-md hover:bg-neutral-800 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {!isCompleted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Plan summary badge */}
              <div className="p-4 bg-neutral-900 rounded-lg border border-neutral-800 flex items-center justify-between">
                <div>
                  <div className="font-display text-base font-bold text-white">{plan.name}</div>
                  <div className="text-xs text-neutral-400 mt-0.5">
                    {isAnnual ? 'Annual Billing (20% Off)' : 'Monthly Flexible Membership'}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-mono text-2xl font-bold text-[#ccff00] tabular-nums">
                    ${price}<span className="text-xs font-normal text-neutral-400 font-sans">/mo</span>
                  </div>
                  {isAnnual && (
                    <div className="text-[10px] font-mono text-neutral-500">${annualTotal}/year</div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1">
                  Athlete Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Full Legal Name"
                  value={athleteName}
                  onChange={(e) => setAthleteName(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded px-3 py-2 text-sm text-white focus:border-[#ccff00] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@domain.com"
                  value={athleteEmail}
                  onChange={(e) => setAthleteEmail(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded px-3 py-2 text-sm text-white focus:border-[#ccff00] outline-none"
                />
              </div>

              <div className="p-3 bg-neutral-950 rounded border border-neutral-800/80 text-xs text-neutral-400 space-y-1">
                <div className="font-semibold text-neutral-300">Privileges effective immediately:</div>
                <div className="flex items-center gap-1.5 text-neutral-300">
                  <Check className="w-3.5 h-3.5 text-[#ccff00]" />
                  <span>Instant 24/7 Digital RFID Turnstile Pass</span>
                </div>
                <div className="flex items-center gap-1.5 text-neutral-300">
                  <Check className="w-3.5 h-3.5 text-[#ccff00]" />
                  <span>14-Day 100% Full Money Back Satisfaction Guarantee</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 px-4 text-xs font-bold text-black bg-[#ccff00] hover:bg-[#b8e600] rounded-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                >
                  <Lock className="w-3.5 h-3.5 text-black" />
                  <span>Activate Membership Now</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              </div>

              <div className="text-[11px] text-neutral-500 text-center flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-neutral-400" />
                <span>256-Bit SSL Encrypted Verification</span>
              </div>
            </form>
          ) : (
            <div className="space-y-4 text-center py-4 animate-fade-in">
              <div className="w-12 h-12 bg-emerald-950 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto text-emerald-400">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="font-display text-xl font-bold text-white">Welcome to KINETIX</h4>
              <p className="text-xs text-neutral-300 max-w-sm mx-auto">
                Your <strong>{plan.name}</strong> membership has been activated for <strong>{athleteName}</strong>. Your digital RFID keycard is now available in the Member Portal.
              </p>
              <div className="pt-2">
                <button
                  onClick={handleFinish}
                  className="px-6 py-2.5 text-xs font-bold text-black bg-[#ccff00] hover:bg-[#b8e600] rounded-md transition-colors cursor-pointer"
                >
                  Open Member Portal & Pass
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
