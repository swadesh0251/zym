import React, { useState } from 'react';
import { X, CheckCircle, Calendar, Clock, ArrowRight, Shield } from 'lucide-react';
import { Trainer } from '../types';

interface TrainerBookingModalProps {
  trainer: Trainer | null;
  isOpen: boolean;
  onClose: () => void;
}

export const TrainerBookingModal: React.FC<TrainerBookingModalProps> = ({
  trainer,
  isOpen,
  onClose,
}) => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('08:00 AM');
  const [focusArea, setFocusArea] = useState('Olympic Lifting Kinematics');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen || !trainer) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim() || !userEmail.trim()) return;
    setSubmitted(true);
  };

  const handleClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg max-h-[92vh] overflow-y-auto bg-[#0e1118] border border-neutral-800 rounded-xl shadow-2xl text-neutral-200">
        
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-4 sm:p-5 border-b border-neutral-800 bg-[#121620]">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-[#ccff00]">
              1-on-1 Performance Consultation
            </div>
            <h3 className="font-display text-base sm:text-lg font-bold text-white">
              Consultation with {trainer.name}
            </h3>
          </div>
          <button
            onClick={handleClose}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center text-neutral-400 hover:text-white rounded-md hover:bg-neutral-800 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 sm:p-6">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Trainer brief */}
              <div className="flex items-center gap-3 p-3 bg-neutral-900 rounded-lg border border-neutral-800">
                <img
                  src={trainer.image}
                  alt={trainer.name}
                  referrerPolicy="no-referrer"
                  className="w-12 h-12 rounded-full object-cover object-top border border-neutral-700 shrink-0"
                />
                <div>
                  <div className="text-xs font-bold text-white">{trainer.name}</div>
                  <div className="text-[11px] text-[#ccff00] font-mono">{trainer.title}</div>
                  <div className="text-[10px] text-neutral-400 mt-0.5">{trainer.availability}</div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1">
                  Athlete Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Your full name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded px-3.5 py-2.5 text-base sm:text-sm text-white focus:border-[#ccff00] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="you@domain.com"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded px-3.5 py-2.5 text-base sm:text-sm text-white focus:border-[#ccff00] outline-none"
                />
              </div>

              {/* Time slot picker */}
              <div>
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
                  Select Preferred Time Slot
                </label>
                <div className="grid grid-cols-2 xs:grid-cols-3 gap-2">
                  {['07:30 AM', '09:00 AM', '11:30 AM', '02:00 PM', '04:30 PM', '06:00 PM'].map((slot) => (
                    <button
                      type="button"
                      key={slot}
                      onClick={() => setSelectedSlot(slot)}
                      className={`py-2.5 px-2 min-h-[42px] text-xs font-mono rounded border cursor-pointer ${
                        selectedSlot === slot
                          ? 'bg-[#ccff00] text-black border-[#ccff00] font-bold'
                          : 'bg-neutral-900 text-neutral-300 border-neutral-800 hover:border-neutral-700'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1">
                  Assessment Focus
                </label>
                <select
                  value={focusArea}
                  onChange={(e) => setFocusArea(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded px-3.5 py-2.5 text-base sm:text-sm text-white focus:border-[#ccff00] outline-none"
                >
                  <option>Olympic Lifting Kinematics & Bar Path</option>
                  <option>Hyrox Lactate Pacing & Sled Mechanics</option>
                  <option>Vald ForceDecks Asymmetry Profiling</option>
                  <option>Injury Rehabilitation & Movement Screen</option>
                  <option>Periodized Strength Peaking Program</option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-4 min-h-[46px] text-xs font-bold text-black bg-[#ccff00] hover:bg-[#b8e600] active:scale-[0.99] rounded-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                >
                  <span>Request Assessment Session</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="text-[11px] text-neutral-500 text-center flex items-center justify-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-neutral-400" />
                <span>60-minute movement screen & InBody scan included.</span>
              </div>
            </form>
          ) : (
            <div className="space-y-4 text-center py-4 animate-fade-in">
              <div className="w-12 h-12 bg-emerald-950 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto text-emerald-400">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h4 className="font-display text-lg font-bold text-white">Consultation Request Confirmed</h4>
              <p className="text-xs text-neutral-400 max-w-sm mx-auto">
                {trainer.name} has reserved <strong>{selectedSlot}</strong> for your {focusArea} session. A calendar invite has been sent to <strong>{userEmail}</strong>.
              </p>
              <button
                onClick={handleClose}
                className="mt-3 px-6 py-2 text-xs font-bold text-black bg-[#ccff00] hover:bg-[#b8e600] rounded-md cursor-pointer"
              >
                Close Window
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
