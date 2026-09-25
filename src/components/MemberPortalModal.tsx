import React, { useState } from 'react';
import { X, QrCode, Trash2, Calendar, Dumbbell, Activity, CheckCircle, Plus, AlertCircle } from 'lucide-react';
import { Booking, PRRecord } from '../types';
import { HOURLY_OCCUPANCY } from '../data/gymData';

interface MemberPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookings: Booking[];
  onCancelBooking: (id: string) => void;
  prRecords: PRRecord[];
  onDeletePR: (id: string) => void;
  onAddNewPR: (record: Omit<PRRecord, 'id' | 'date'>) => void;
  onNavigateToSchedule: () => void;
}

export const MemberPortalModal: React.FC<MemberPortalModalProps> = ({
  isOpen,
  onClose,
  bookings,
  onCancelBooking,
  prRecords,
  onDeletePR,
  onAddNewPR,
  onNavigateToSchedule,
}) => {
  const [activeTab, setActiveTab] = useState<'pass' | 'bookings' | 'prs' | 'occupancy'>('pass');
  const [showAddPrModal, setShowAddPrModal] = useState(false);

  // Quick PR form
  const [quickLift, setQuickLift] = useState<'Back Squat' | 'Deadlift' | 'Bench Press' | 'Overhead Press'>('Back Squat');
  const [quickWeight, setQuickWeight] = useState(120);
  const [quickReps, setQuickReps] = useState(5);
  const [quickUnit, setQuickUnit] = useState<'kg' | 'lbs'>('kg');

  if (!isOpen) return null;

  const handleAddQuickPR = (e: React.FormEvent) => {
    e.preventDefault();
    const estimated1RM = Math.round(quickWeight * (1 + quickReps / 30));
    onAddNewPR({
      lift: quickLift,
      weight: quickWeight,
      reps: quickReps,
      unit: quickUnit,
      estimated1RM,
    });
    setShowAddPrModal(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#0e1118] border border-neutral-800 rounded-xl shadow-2xl overflow-hidden text-neutral-200 max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-800 bg-[#121620] shrink-0">
          <div>
            <div className="text-[11px] font-mono uppercase tracking-wider text-[#ccff00]">
              Athlete Management Portal
            </div>
            <h3 className="font-display text-xl font-bold text-white">
              Member Console
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-md hover:bg-neutral-800 transition-colors cursor-pointer"
            aria-label="Close portal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Portal Tabs */}
        <div className="flex items-center gap-1 p-2 bg-[#10141d] border-b border-neutral-800 shrink-0 overflow-x-auto">
          <button
            onClick={() => setActiveTab('pass')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'pass'
                ? 'bg-neutral-800 text-white shadow-sm border border-neutral-700'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Digital Keycard
          </button>

          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'bookings'
                ? 'bg-neutral-800 text-white shadow-sm border border-neutral-700'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <span>Reservations</span>
            {bookings.length > 0 && (
              <span className="bg-[#ccff00] text-black font-bold text-[10px] px-1.5 py-0.2 rounded-full">
                {bookings.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('prs')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'prs'
                ? 'bg-neutral-800 text-white shadow-sm border border-neutral-700'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <span>Strength Log</span>
            <span className="text-[10px] text-neutral-500 font-mono">({prRecords.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('occupancy')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'occupancy'
                ? 'bg-neutral-800 text-white shadow-sm border border-neutral-700'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Live Floor Density
          </button>
        </div>

        {/* Tab Content Body (Scrollable) */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* TAB 1: PASS */}
          {activeTab === 'pass' && (
            <div className="space-y-6">
              {/* Digital Pass Card */}
              <div className="bg-gradient-to-br from-[#161a25] to-[#0c0e14] border-2 border-neutral-700 rounded-xl p-6 relative overflow-hidden shadow-xl">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-display font-extrabold text-xl text-white tracking-wider">KINETIX</span>
                      <span className="w-2 h-2 rounded-full bg-[#ccff00] shadow-[0_0_10px_rgba(204,255,0,0.8)]" />
                    </div>
                    <div className="text-xs font-mono text-[#ccff00] mt-0.5">CLUB ALL-ACCESS TIER</div>
                  </div>

                  <div className="text-right">
                    <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 font-mono bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/80">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      Active 24/7 Access
                    </span>
                  </div>
                </div>

                <div className="mt-8 flex items-center justify-between">
                  <div>
                    <div className="text-[11px] text-neutral-400 uppercase font-mono tracking-wider">Member Name</div>
                    <div className="text-lg font-bold text-white">Alexander Vance</div>
                    <div className="text-xs text-neutral-400 font-mono mt-0.5">ID: KTX-882914-AU</div>
                  </div>

                  <div className="bg-white p-2 rounded-lg shadow-inner">
                    <QrCode className="w-16 h-16 text-black" />
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-800/80 flex items-center justify-between text-xs font-mono text-neutral-400">
                  <span>Turnstile Pass · 28,000 sq ft Access</span>
                  <span className="text-[#ccff00]">4 Guest Passes Available</span>
                </div>
              </div>

              {/* Quick Facility Privileges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="p-3 bg-neutral-900 rounded-lg border border-neutral-800">
                  <div className="text-[11px] text-neutral-400">Recovery Lab</div>
                  <div className="text-xs font-bold text-white mt-1">Unlimited 4°C</div>
                </div>
                <div className="p-3 bg-neutral-900 rounded-lg border border-neutral-800">
                  <div className="text-[11px] text-neutral-400">Locker No.</div>
                  <div className="text-xs font-bold text-white mt-1">#142 (Permanent)</div>
                </div>
                <div className="p-3 bg-neutral-900 rounded-lg border border-neutral-800">
                  <div className="text-[11px] text-neutral-400">InBody Scans</div>
                  <div className="text-xs font-bold text-white mt-1">1 Scan Pending</div>
                </div>
                <div className="p-3 bg-neutral-900 rounded-lg border border-neutral-800">
                  <div className="text-[11px] text-neutral-400">Billing Cycle</div>
                  <div className="text-xs font-bold text-white mt-1">Renews 1st of Mo</div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: BOOKINGS */}
          {activeTab === 'bookings' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold text-white">Upcoming Coached Sessions</h4>
                <button
                  onClick={() => {
                    onClose();
                    onNavigateToSchedule();
                  }}
                  className="text-xs text-[#ccff00] hover:underline cursor-pointer"
                >
                  + Browse Schedule
                </button>
              </div>

              {bookings.length > 0 ? (
                <div className="space-y-3">
                  {bookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="p-4 bg-neutral-900/80 rounded-lg border border-neutral-800 flex items-center justify-between gap-4"
                    >
                      <div>
                        <div className="flex items-center gap-2 text-xs font-mono text-[#ccff00]">
                          <span>{booking.day}</span>
                          <span>·</span>
                          <span>{booking.time}</span>
                          <span>·</span>
                          <span className="text-neutral-400">{booking.bookingCode}</span>
                        </div>
                        <h5 className="font-display font-bold text-white text-base mt-1">
                          {booking.classTitle}
                        </h5>
                        <div className="text-xs text-neutral-400 mt-0.5">
                          Coach: {booking.instructor} · Reserved for {booking.userName}
                        </div>
                      </div>

                      <button
                        onClick={() => onCancelBooking(booking.id)}
                        className="p-2 text-neutral-500 hover:text-red-400 hover:bg-neutral-800 rounded transition-colors cursor-pointer"
                        title="Cancel reservation"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center bg-neutral-900/40 rounded-lg border border-neutral-800">
                  <Calendar className="w-8 h-8 text-neutral-600 mx-auto mb-2" />
                  <p className="text-sm text-neutral-400">No active class reservations.</p>
                  <button
                    onClick={() => {
                      onClose();
                      onNavigateToSchedule();
                    }}
                    className="mt-3 px-4 py-2 text-xs font-bold text-black bg-[#ccff00] hover:bg-[#b8e600] rounded-md transition-colors cursor-pointer"
                  >
                    View Weekly Schedule
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: PR RECORDS */}
          {activeTab === 'prs' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold text-white">Compound Lift Personal Records</h4>
                <button
                  onClick={() => setShowAddPrModal(true)}
                  className="flex items-center gap-1 text-xs text-[#ccff00] font-semibold hover:underline cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Log New PR</span>
                </button>
              </div>

              {prRecords.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {prRecords.map((pr) => (
                    <div
                      key={pr.id}
                      className="p-4 bg-neutral-900/80 rounded-lg border border-neutral-800 flex items-start justify-between"
                    >
                      <div>
                        <div className="text-xs font-semibold text-neutral-400 uppercase font-mono">
                          {pr.lift}
                        </div>
                        <div className="font-mono text-2xl font-bold text-white mt-1 tabular-nums">
                          {pr.estimated1RM} <span className="text-xs text-neutral-400 font-sans">{pr.unit} 1RM</span>
                        </div>
                        <div className="text-xs text-neutral-400 mt-1 font-mono">
                          Based on {pr.weight} {pr.unit} × {pr.reps} reps
                        </div>
                        <div className="text-[10px] text-neutral-500 mt-1">Logged {pr.date}</div>
                      </div>

                      <button
                        onClick={() => onDeletePR(pr.id)}
                        className="p-1.5 text-neutral-500 hover:text-red-400 transition-colors cursor-pointer"
                        title="Delete PR"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center bg-neutral-900/40 rounded-lg border border-neutral-800">
                  <Dumbbell className="w-8 h-8 text-neutral-600 mx-auto mb-2" />
                  <p className="text-sm text-neutral-400">No personal records logged yet.</p>
                  <p className="text-xs text-neutral-500 mt-1">
                    Use the 1RM calculator in the Performance Lab to benchmark your heavy compound lifts.
                  </p>
                </div>
              )}

              {/* Add PR Modal Sub-view */}
              {showAddPrModal && (
                <form onSubmit={handleAddQuickPR} className="p-4 bg-neutral-950 rounded-lg border border-neutral-700 space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-white">
                    <span>Log Compound Lift</span>
                    <button
                      type="button"
                      onClick={() => setShowAddPrModal(false)}
                      className="text-neutral-400 hover:text-white"
                    >
                      Cancel
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <label className="text-neutral-400 block mb-1">Lift</label>
                      <select
                        value={quickLift}
                        onChange={(e) => setQuickLift(e.target.value as any)}
                        className="w-full bg-neutral-900 border border-neutral-800 rounded p-1.5 text-white"
                      >
                        <option>Back Squat</option>
                        <option>Deadlift</option>
                        <option>Bench Press</option>
                        <option>Overhead Press</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-neutral-400 block mb-1">Weight ({quickUnit})</label>
                      <input
                        type="number"
                        min={20}
                        max={500}
                        value={quickWeight}
                        onChange={(e) => setQuickWeight(Number(e.target.value))}
                        className="w-full bg-neutral-900 border border-neutral-800 rounded p-1.5 text-white font-mono"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs font-mono text-neutral-400">
                      Estimated 1RM: {Math.round(quickWeight * (1 + quickReps / 30))} {quickUnit}
                    </span>
                    <button
                      type="submit"
                      className="px-4 py-1.5 text-xs font-bold text-black bg-[#ccff00] rounded hover:bg-[#b8e600]"
                    >
                      Save Record
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* TAB 4: OCCUPANCY */}
          {activeTab === 'occupancy' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
                <div>
                  <h4 className="text-sm font-semibold text-white">Floor Traffic & Capacity Analytics</h4>
                  <p className="text-xs text-neutral-400 mt-0.5">Real-time sensor turnstile density across 24 hours</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono text-[#ccff00] font-bold">Current: 38% Full</span>
                  <div className="text-[10px] text-neutral-500">Unrestricted platforms</div>
                </div>
              </div>

              {/* Hourly Chart Bar Visualization */}
              <div className="p-4 bg-neutral-950 rounded-lg border border-neutral-800">
                <div className="flex items-end gap-1.5 h-36 pt-6">
                  {HOURLY_OCCUPANCY.map((slot) => {
                    const isCurrent = slot.hour === '09:00';
                    const isPeak = slot.density >= 75;
                    return (
                      <div
                        key={slot.hour}
                        className="flex-1 flex flex-col items-center h-full justify-end group relative"
                      >
                        {/* Tooltip on hover */}
                        <div className="absolute -top-7 hidden group-hover:flex bg-black text-[10px] font-mono px-1.5 py-0.5 rounded text-white border border-neutral-700 whitespace-nowrap z-10">
                          {slot.hour}: {slot.density}%
                        </div>

                        <div
                          style={{ height: `${slot.density}%` }}
                          className={`w-full rounded-t-xs transition-all ${
                            isCurrent
                              ? 'bg-[#ccff00] shadow-[0_0_8px_rgba(204,255,0,0.5)]'
                              : isPeak
                              ? 'bg-amber-500/70 hover:bg-amber-400'
                              : 'bg-neutral-800 hover:bg-neutral-700'
                          }`}
                        />
                      </div>
                    );
                  })}
                </div>

                <div className="flex justify-between text-[10px] font-mono text-neutral-500 mt-2 pt-2 border-t border-neutral-900">
                  <span>05:00</span>
                  <span>10:00</span>
                  <span>14:00</span>
                  <span>18:00 (Peak)</span>
                  <span>22:00</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-neutral-900/60 rounded border border-neutral-800">
                  <div className="text-neutral-400 font-medium">Off-Peak Training Windows</div>
                  <div className="text-white font-mono mt-1">10:00 - 16:00 · 20:30 - 05:00</div>
                  <div className="text-[10px] text-neutral-500 mt-0.5">Average occupancy below 40%</div>
                </div>

                <div className="p-3 bg-neutral-900/60 rounded border border-neutral-800">
                  <div className="text-neutral-400 font-medium">Peak High Demand Hours</div>
                  <div className="text-white font-mono mt-1">06:30 - 08:30 · 17:00 - 19:30</div>
                  <div className="text-[10px] text-neutral-500 mt-0.5">Reserve class slots in advance</div>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
