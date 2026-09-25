import React, { useState } from 'react';
import { CLASS_SESSIONS } from '../data/gymData';
import { ClassSession, DayOfWeek, ClassCategory } from '../types';
import { Clock, MapPin, Users, Flame, ChevronRight, Filter } from 'lucide-react';

interface ClassScheduleProps {
  onSelectClassToBook: (session: ClassSession) => void;
}

const DAYS: DayOfWeek[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const CATEGORIES: ClassCategory[] = [
  'All',
  'Hyrox & Conditioning',
  'Olympic Lifting',
  'Power & Strength',
  'Recovery & Mobility',
  'Boxing Athletic',
];

export const ClassSchedule: React.FC<ClassScheduleProps> = ({ onSelectClassToBook }) => {
  const [selectedDay, setSelectedDay] = useState<DayOfWeek>('Monday');
  const [selectedCategory, setSelectedCategory] = useState<ClassCategory>('All');
  const [minIntensity, setMinIntensity] = useState<number>(0);

  const filteredSessions = CLASS_SESSIONS.filter((session) => {
    const matchesDay = session.day === selectedDay;
    const matchesCategory = selectedCategory === 'All' || session.category === selectedCategory;
    const matchesIntensity = minIntensity === 0 || session.intensityScore >= minIntensity;
    return matchesDay && matchesCategory && matchesIntensity;
  });

  return (
    <section id="schedule" className="py-24 bg-[#080a0d] border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-neutral-800">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#ccff00] mb-2">
              Weekly Programming
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Class Schedule & Registration
            </h2>
            <p className="mt-2 text-sm text-neutral-400 max-w-xl">
              Strict 14-to-20 person capacity limits per session ensure real-time coach feedback and dedicated training equipment.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Registration live for all 7 training days</span>
          </div>
        </div>

        {/* Day Selector (Segmented control) */}
        <div className="mt-8 overflow-x-auto pb-2 scrollbar-none">
          <div className="flex items-center gap-1.5 p-1 bg-[#12151d] rounded-lg border border-neutral-800 min-w-max">
            {DAYS.map((day) => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-md transition-all cursor-pointer whitespace-nowrap ${
                  selectedDay === day
                    ? 'bg-[#ccff00] text-black font-bold shadow-sm'
                    : 'text-neutral-300 hover:text-white hover:bg-neutral-800/50'
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        {/* Category & Intensity Filters */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs text-neutral-400 flex items-center gap-1 mr-2">
              <Filter className="w-3.5 h-3.5" />
              Focus:
            </span>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-neutral-800 text-white border border-neutral-700'
                    : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 text-xs text-neutral-400">
            <span>Intensity:</span>
            <select
              value={minIntensity}
              onChange={(e) => setMinIntensity(Number(e.target.value))}
              aria-label="Filter by minimum intensity"
              className="bg-neutral-900 border border-neutral-800 text-neutral-200 text-xs rounded px-2.5 py-1.5 focus:border-[#ccff00] outline-none cursor-pointer"
            >
              <option value={0}>All Levels</option>
              <option value={3}>Level 3+ (Intermediate)</option>
              <option value={4}>Level 4+ (High Intensity)</option>
              <option value={5}>Level 5 (Maximum Output)</option>
            </select>
          </div>
        </div>

        {/* Schedule List */}
        <div className="mt-8 space-y-3">
          {filteredSessions.length > 0 ? (
            filteredSessions.map((session) => {
              const spotsLeft = session.capacity - session.enrolled;
              return (
                <div
                  key={session.id}
                  className="bg-[#10131a] hover:bg-[#141822] rounded-lg border border-neutral-800 p-5 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-5 group"
                >
                  {/* Left: Time & Core Info */}
                  <div className="flex items-start sm:items-center gap-5">
                    {/* Time Box */}
                    <div className="flex flex-col items-center justify-center bg-neutral-900 border border-neutral-800 w-20 h-20 rounded-md shrink-0">
                      <span className="font-mono text-base font-bold text-white tabular-nums">
                        {session.startTime}
                      </span>
                      <span className="text-[11px] font-mono text-neutral-400 mt-0.5">
                        {session.durationMinutes} min
                      </span>
                    </div>

                    <div>
                      {/* Quiet unboxed metadata */}
                      <div className="flex items-center gap-2 text-xs text-neutral-400 mb-1">
                        <span className="text-[#ccff00] font-medium">{session.category}</span>
                        <span aria-hidden="true">·</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-neutral-400" />
                          {session.location}
                        </span>
                        {session.prerequisites && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span className="text-amber-400 font-mono text-[11px]">{session.prerequisites}</span>
                          </>
                        )}
                      </div>

                      <h3 className="font-display text-lg sm:text-xl font-bold text-white group-hover:text-neutral-100">
                        {session.title}
                      </h3>

                      <p className="mt-1.5 text-xs sm:text-sm text-neutral-300 max-w-2xl leading-relaxed">
                        {session.description}
                      </p>
                    </div>
                  </div>

                  {/* Right: Coach, Intensity & Action */}
                  <div className="flex flex-wrap sm:flex-nowrap items-center justify-between lg:justify-end gap-5 pt-4 lg:pt-0 border-t lg:border-t-0 border-neutral-800/80">
                    
                    {/* Coach Bio Tag */}
                    <div className="flex items-center gap-2.5">
                      <img
                        src={session.instructorAvatar}
                        alt={session.instructor}
                        referrerPolicy="no-referrer"
                        className="w-9 h-9 rounded-full object-cover border border-neutral-700 bg-neutral-800"
                      />
                      <div className="text-left">
                        <div className="text-xs font-semibold text-white">{session.instructor}</div>
                        <div className="text-[11px] text-neutral-400">Lead Coach</div>
                      </div>
                    </div>

                    {/* Intensity Graphic Bar */}
                    <div className="text-left min-w-[90px]">
                      <div className="flex items-center gap-1 text-[11px] text-neutral-400 mb-1">
                        <Flame className="w-3 h-3 text-amber-500" />
                        <span>Output Lvl {session.intensityScore}/5</span>
                      </div>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((lvl) => (
                          <span
                            key={lvl}
                            className={`h-1.5 w-3 rounded-xs ${
                              lvl <= session.intensityScore ? 'bg-[#ccff00]' : 'bg-neutral-800'
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Capacity Indicator & Booking Action */}
                    <div className="flex items-center gap-4">
                      <div className="text-right font-mono text-xs">
                        <div className="font-semibold text-neutral-200 tabular-nums">
                          {spotsLeft} spots left
                        </div>
                        <div className="text-[10px] text-neutral-400">
                          {session.enrolled}/{session.capacity} booked
                        </div>
                      </div>

                      <button
                        onClick={() => onSelectClassToBook(session)}
                        className="px-4 py-2.5 text-xs font-bold text-black bg-[#ccff00] hover:bg-[#b8e600] rounded-md transition-colors flex items-center gap-1 cursor-pointer whitespace-nowrap"
                      >
                        <span>Reserve Spot</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                  </div>
                </div>
              );
            })
          ) : (
            <div className="p-12 text-center bg-[#10131a] rounded-lg border border-neutral-800">
              <p className="text-neutral-400 text-sm">
                No classes match the selected filter criteria for {selectedDay}.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setMinIntensity(0);
                }}
                className="mt-3 text-xs text-[#ccff00] hover:underline"
              >
                Reset filters
              </button>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
