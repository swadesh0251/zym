import React, { useState } from 'react';
import { X, CheckCircle, Clock, MapPin, QrCode, ArrowRight, UserCheck } from 'lucide-react';
import { ClassSession, Booking } from '../types';

interface ClassBookingModalProps {
  session: ClassSession | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirmBooking: (booking: Booking) => void;
}

export const ClassBookingModal: React.FC<ClassBookingModalProps> = ({
  session,
  isOpen,
  onClose,
  onConfirmBooking,
}) => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen || !session) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim() || !userEmail.trim()) {
      setErrorMsg('Please enter your name and email to reserve.');
      return;
    }

    const bookingCode = 'RES-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    const newBooking: Booking = {
      id: Date.now().toString(),
      classId: session.id,
      classTitle: session.title,
      day: session.day,
      time: session.startTime,
      instructor: session.instructor,
      userName,
      userEmail,
      createdAt: new Date().toLocaleDateString(),
      bookingCode,
    };

    setConfirmedBooking(newBooking);
    onConfirmBooking(newBooking);
    setErrorMsg('');
  };

  const handleDone = () => {
    setConfirmedBooking(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md max-h-[92vh] overflow-y-auto bg-[#0e1118] border border-neutral-800 rounded-xl shadow-2xl text-neutral-200">
        
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-4 sm:p-5 border-b border-neutral-800 bg-[#121620]">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-[#ccff00]">
              Class Reservation
            </div>
            <h3 className="font-display text-base sm:text-lg font-bold text-white">
              {confirmedBooking ? 'Spot Confirmed' : 'Reserve Training Spot'}
            </h3>
          </div>
          <button
            onClick={handleDone}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center text-neutral-400 hover:text-white rounded-md hover:bg-neutral-800 transition-colors cursor-pointer"
            aria-label="Close booking modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 sm:p-6">
          {!confirmedBooking ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Session Snapshot */}
              <div className="p-3.5 bg-neutral-900/80 rounded-lg border border-neutral-800 text-xs space-y-1.5">
                <div className="font-display text-sm font-bold text-white">{session.title}</div>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-neutral-400 font-mono text-[11px]">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#ccff00]" />
                    {session.day} at {session.startTime} ({session.durationMinutes}m)
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-neutral-400" />
                    {session.location}
                  </span>
                </div>
                <div className="text-neutral-400">
                  Lead Coach: <strong className="text-neutral-200">{session.instructor}</strong>
                </div>
              </div>

              {errorMsg && (
                <div className="p-2.5 bg-red-950/60 border border-red-800 text-red-300 text-xs rounded">
                  {errorMsg}
                </div>
              )}

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
                  Member / Athlete Email
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

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-4 min-h-[46px] text-xs font-bold text-black bg-[#ccff00] hover:bg-[#b8e600] active:scale-[0.99] rounded-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                >
                  <span>Confirm Reservation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="text-[11px] text-neutral-500 text-center">
                Free cancellation up to 2 hours before start time via Member Portal.
              </div>
            </form>
          ) : (
            /* Confirmation Pass */
            <div className="space-y-4 animate-fade-in text-center">
              <div className="w-12 h-12 bg-emerald-950 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto text-emerald-400">
                <CheckCircle className="w-6 h-6" />
              </div>

              <div>
                <h4 className="font-display text-lg font-bold text-white">Spot Successfully Reserved!</h4>
                <p className="text-xs text-neutral-400 mt-1">
                  A confirmation has been synced with your Member Portal.
                </p>
              </div>

              <div className="bg-[#12151f] p-4 rounded-lg border border-neutral-800 text-left text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-neutral-500">Booking Reference</span>
                  <span className="font-mono text-[#ccff00] font-bold">{confirmedBooking.bookingCode}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Class</span>
                  <span className="font-semibold text-white">{confirmedBooking.classTitle}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Schedule</span>
                  <span className="text-neutral-300 font-mono">{confirmedBooking.day} · {confirmedBooking.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Athlete</span>
                  <span className="text-neutral-300">{confirmedBooking.userName}</span>
                </div>
              </div>

              <button
                onClick={handleDone}
                className="w-full py-2.5 text-xs font-bold text-black bg-[#ccff00] hover:bg-[#b8e600] rounded-md transition-colors cursor-pointer"
              >
                Close & View Schedule
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
