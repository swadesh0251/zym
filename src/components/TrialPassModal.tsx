import React, { useState } from 'react';
import { X, CheckCircle, QrCode, Calendar, ArrowRight, ShieldCheck, Download } from 'lucide-react';
import { TrialPass } from '../types';

interface TrialPassModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPassGenerated: (pass: TrialPass) => void;
}

export const TrialPassModal: React.FC<TrialPassModalProps> = ({ isOpen, onClose, onPassGenerated }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [visitDate, setVisitDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [fitnessGoal, setFitnessGoal] = useState('Heavy Barbell & Strength');
  const [generatedPass, setGeneratedPass] = useState<TrialPass | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !phone.trim()) {
      setErrorMsg('Please complete all contact fields.');
      return;
    }

    if (!email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    const passCode = 'KTX-' + Math.random().toString(36).substring(2, 7).toUpperCase();
    const newPass: TrialPass = {
      id: Date.now().toString(),
      fullName,
      email,
      phone,
      visitDate,
      fitnessGoal,
      passCode,
      createdAt: new Date().toLocaleDateString(),
    };

    setGeneratedPass(newPass);
    onPassGenerated(newPass);
    setErrorMsg('');
  };

  const handlePrintOrDownload = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-[#0e1118] border border-neutral-800 rounded-xl shadow-2xl overflow-hidden text-neutral-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-800 bg-[#121620]">
          <div>
            <div className="text-[11px] font-mono uppercase tracking-wider text-[#ccff00]">
              Complimentary Access
            </div>
            <h3 className="font-display text-xl font-bold text-white">
              1-Day All-Access Athlete Pass
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-md hover:bg-neutral-800 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {!generatedPass ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-xs text-neutral-400">
                Experience 28,000 sq ft of Eleiko platforms, 50m turf, and cold plunge suites. No hard sell, no card required.
              </p>

              {errorMsg && (
                <div className="p-2.5 bg-red-950/60 border border-red-800 text-red-300 text-xs rounded">
                  {errorMsg}
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Morgan"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded px-3.5 py-2 text-sm text-white focus:border-[#ccff00] outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="alex@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded px-3.5 py-2 text-sm text-white focus:border-[#ccff00] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1">
                    Mobile Phone
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="(512) 000-0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded px-3.5 py-2 text-sm text-white focus:border-[#ccff00] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1">
                    Preferred Visit Date
                  </label>
                  <input
                    type="date"
                    required
                    value={visitDate}
                    onChange={(e) => setVisitDate(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded px-3.5 py-2 text-sm text-white focus:border-[#ccff00] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1">
                    Training Focus
                  </label>
                  <select
                    value={fitnessGoal}
                    onChange={(e) => setFitnessGoal(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded px-3.5 py-2 text-sm text-white focus:border-[#ccff00] outline-none"
                  >
                    <option>Heavy Barbell & Strength</option>
                    <option>Hyrox & Turf Conditioning</option>
                    <option>Bio-Recovery & Cold Plunge</option>
                    <option>Olympic Weightlifting</option>
                    <option>General Athletic Health</option>
                  </select>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 px-4 text-xs font-bold text-black bg-[#ccff00] hover:bg-[#b8e600] rounded-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                >
                  <span>Generate Free Day Pass</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-neutral-500 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-neutral-400" />
                <span>Instant QR pass issued. Present at reception turnstile.</span>
              </div>
            </form>
          ) : (
            /* Pass Card Ticket Generated */
            <div className="space-y-5 animate-fade-in">
              <div className="bg-[#131722] border-2 border-[#ccff00] rounded-xl p-5 relative overflow-hidden">
                {/* Decorative cutouts */}
                <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#0e1118] border-r border-neutral-800" />
                <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#0e1118] border-l border-neutral-800" />

                <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                  <div className="flex items-center gap-1.5">
                    <span className="font-display font-extrabold text-base text-white tracking-wider">KINETIX</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00]" />
                  </div>
                  <span className="text-[11px] font-mono text-[#ccff00] uppercase font-bold">1-Day Guest Credential</span>
                </div>

                <div className="py-4 grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-[10px] text-neutral-500 font-mono uppercase">Athlete</span>
                    <div className="font-semibold text-white truncate">{generatedPass.fullName}</div>
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-500 font-mono uppercase">Valid Date</span>
                    <div className="font-semibold text-white font-mono">{generatedPass.visitDate}</div>
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-500 font-mono uppercase">Access Zone</span>
                    <div className="font-semibold text-white">All 4 Zones + Hydro</div>
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-500 font-mono uppercase">Pass ID</span>
                    <div className="font-semibold font-mono text-[#ccff00]">{generatedPass.passCode}</div>
                  </div>
                </div>

                {/* Simulated QR Code & Barcode */}
                <div className="mt-2 pt-3 border-t border-dashed border-neutral-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-white rounded">
                      <QrCode className="w-10 h-10 text-black" />
                    </div>
                    <div className="text-[11px] text-neutral-400">
                      <div>Scan at Turnstile A</div>
                      <div className="font-mono text-neutral-500 text-[10px]">Staffed 06:00 - 22:00</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="inline-flex items-center gap-1 text-[11px] text-emerald-400 font-semibold">
                      <CheckCircle className="w-3.5 h-3.5" />
                      Active Pass
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handlePrintOrDownload}
                  className="flex-1 py-2.5 px-3 text-xs font-semibold rounded bg-neutral-800 hover:bg-neutral-700 text-white flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-neutral-700"
                >
                  <Download className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Print / Save Pass</span>
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 py-2.5 px-3 text-xs font-bold rounded bg-[#ccff00] hover:bg-[#b8e600] text-black flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
