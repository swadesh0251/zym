import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FacilityTour } from './components/FacilityTour';
import { ClassSchedule } from './components/ClassSchedule';
import { PerformanceLab } from './components/PerformanceLab';
import { Trainers } from './components/Trainers';
import { Pricing } from './components/Pricing';
import { Footer } from './components/Footer';
import { TrialPassModal } from './components/TrialPassModal';
import { ClassBookingModal } from './components/ClassBookingModal';
import { TrainerBookingModal } from './components/TrainerBookingModal';
import { MemberPortalModal } from './components/MemberPortalModal';
import { PlanCheckoutModal } from './components/PlanCheckoutModal';
import { ClassSession, Trainer, MembershipPlan, Booking, PRRecord, TrialPass } from './types';
import { Quote, Trophy, TrendingUp, CheckCircle2 } from 'lucide-react';

const INITIAL_PRS: PRRecord[] = [
  {
    id: 'pr-1',
    lift: 'Back Squat',
    weight: 140,
    unit: 'kg',
    reps: 5,
    estimated1RM: 163,
    date: 'Sep 18, 2026',
  },
  {
    id: 'pr-2',
    lift: 'Deadlift',
    weight: 190,
    unit: 'kg',
    reps: 3,
    estimated1RM: 209,
    date: 'Sep 21, 2026',
  },
];

const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'b-init-1',
    classId: 'mon-01',
    classTitle: 'Hyrox Engine & Sled Intervals',
    day: 'Monday',
    time: '06:30',
    instructor: 'Elena Rostova',
    userName: 'Alexander Vance',
    userEmail: 'alex.vance@kinetix.io',
    createdAt: 'Sep 24, 2026',
    bookingCode: 'RES-8921-HY',
  },
];

export default function App() {
  // Modal states
  const [isTrialPassOpen, setIsTrialPassOpen] = useState(false);
  const [isMemberPortalOpen, setIsMemberPortalOpen] = useState(false);
  const [selectedClassToBook, setSelectedClassToBook] = useState<ClassSession | null>(null);
  const [selectedTrainerToBook, setSelectedTrainerToBook] = useState<Trainer | null>(null);
  const [selectedPlanForCheckout, setSelectedPlanForCheckout] = useState<MembershipPlan | null>(null);
  const [isAnnualCheckout, setIsAnnualCheckout] = useState(true);

  // App data state with localStorage persistence
  const [bookings, setBookings] = useState<Booking[]>(() => {
    try {
      const saved = localStorage.getItem('kinetix_bookings');
      return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
    } catch {
      return INITIAL_BOOKINGS;
    }
  });

  const [prRecords, setPrRecords] = useState<PRRecord[]>(() => {
    try {
      const saved = localStorage.getItem('kinetix_prs');
      return saved ? JSON.parse(saved) : INITIAL_PRS;
    } catch {
      return INITIAL_PRS;
    }
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('kinetix_bookings', JSON.stringify(bookings));
    } catch (e) {
      // ignore storage errors
    }
  }, [bookings]);

  useEffect(() => {
    try {
      localStorage.setItem('kinetix_prs', JSON.stringify(prRecords));
    } catch (e) {
      // ignore storage errors
    }
  }, [prRecords]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleBookingConfirmed = (newBooking: Booking) => {
    setBookings((prev) => [newBooking, ...prev]);
    showToast(`Reservation confirmed for ${newBooking.classTitle}!`);
  };

  const handleCancelBooking = (bookingId: string) => {
    setBookings((prev) => prev.filter((b) => b.id !== bookingId));
    showToast('Reservation removed.');
  };

  const handleSavePR = (prData: Omit<PRRecord, 'id' | 'date'>) => {
    const newRecord: PRRecord = {
      ...prData,
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    };
    setPrRecords((prev) => [newRecord, ...prev]);
    showToast(`Logged ${prData.lift} PR: ${prData.estimated1RM} ${prData.unit} 1RM`);
  };

  const handleDeletePR = (id: string) => {
    setPrRecords((prev) => prev.filter((p) => p.id !== id));
    showToast('Record deleted.');
  };

  const handlePassGenerated = (pass: TrialPass) => {
    showToast(`Pass ${pass.passCode} ready for your visit on ${pass.visitDate}!`);
  };

  const handleSelectPlan = (plan: MembershipPlan, isAnnual: boolean) => {
    setSelectedPlanForCheckout(plan);
    setIsAnnualCheckout(isAnnual);
  };

  const handlePlanCheckoutSuccess = (planName: string) => {
    showToast(`Welcome! Your ${planName} membership has been activated.`);
  };

  return (
    <div className="min-h-screen bg-[#080a0d] text-neutral-100 flex flex-col font-sans selection:bg-[#ccff00] selection:text-black">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#121620] border border-[#ccff00] text-white px-4 py-3 rounded-lg shadow-2xl flex items-center gap-2.5 text-xs animate-bounce font-medium">
          <CheckCircle2 className="w-4 h-4 text-[#ccff00] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Bar Navigation */}
      <Navbar
        onOpenTrialPass={() => setIsTrialPassOpen(true)}
        onOpenMemberPortal={() => setIsMemberPortalOpen(true)}
        activeBookingsCount={bookings.length}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onOpenTrialPass={() => setIsTrialPassOpen(true)}
          onExploreFacilities={() => {
            document.getElementById('facilities')?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Four Specialized Facility Zones */}
        <FacilityTour />

        {/* Weekly Coached Class Schedule & Registration */}
        <ClassSchedule
          onSelectClassToBook={(session) => setSelectedClassToBook(session)}
        />

        {/* Biomechanical Performance Lab & Calculators */}
        <PerformanceLab
          onSavePR={handleSavePR}
        />

        {/* Quantified Athlete Proof / Testimonials (Section Adjacency) */}
        <section className="py-20 bg-[#07090c] border-b border-neutral-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-xl mx-auto mb-14">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#ccff00] mb-2 font-mono">
                Measurable Benchmarks
              </div>
              <h2 className="font-display text-3xl font-extrabold text-white tracking-tight">
                Athlete Outcomes & Verified Results
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-neutral-400">
                Rigorous programming and clinical recovery translate directly into quantifiable athletic performance.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="p-6 bg-[#0f121a] rounded-xl border border-neutral-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1 text-[#ccff00] mb-3">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-xs font-mono font-bold">+35kg Compound Squat in 14 Wks</span>
                  </div>
                  <p className="text-xs text-neutral-300 leading-relaxed italic">
                    "Training on calibrated Eleiko bars with Marcus's bar velocity tracking removed every guesswork. My knee tracking asymmetry dropped from 14% to 2% on the Vald plates."
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-neutral-800/80 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-white">David K.</div>
                    <div className="text-[11px] text-neutral-500 font-mono">Competitive Powerlifter (93kg)</div>
                  </div>
                  <div className="text-[#ccff00] font-mono text-[10px] font-semibold">Verified Member</div>
                </div>
              </div>

              <div className="p-6 bg-[#0f121a] rounded-xl border border-neutral-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1 text-[#ccff00] mb-3">
                    <Trophy className="w-4 h-4" />
                    <span className="text-xs font-mono font-bold">Sub-64 Min Hyrox Finish</span>
                  </div>
                  <p className="text-xs text-neutral-300 leading-relaxed italic">
                    "Elena’s lactate threshold intervals on the 50m turf simulated race-day fatigue down to the second. Placed top 5 in the Pro Division on my first international attempt."
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-neutral-800/80 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-white">Sarah Sterling</div>
                    <div className="text-[11px] text-neutral-500 font-mono">Hyrox Elite Competitor</div>
                  </div>
                  <div className="text-[#ccff00] font-mono text-[10px] font-semibold">Verified Member</div>
                </div>
              </div>

              <div className="p-6 bg-[#0f121a] rounded-xl border border-neutral-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1 text-[#ccff00] mb-3">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-xs font-mono font-bold">Pain-Free Barbell Pulling</span>
                  </div>
                  <p className="text-xs text-neutral-300 leading-relaxed italic">
                    "After chronic shoulder impingement that stopped my benching for 8 months, Dr. Julian restructured my thoracic mobility and scapular upward rotation. Back to 125kg pain-free."
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-neutral-800/80 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-white">Michael R.</div>
                    <div className="text-[11px] text-neutral-500 font-mono">Weightlifting Practitioner</div>
                  </div>
                  <div className="text-[#ccff00] font-mono text-[10px] font-semibold">Verified Member</div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Master Coaches Roster */}
        <Trainers
          onSelectTrainerToBook={(trainer) => setSelectedTrainerToBook(trainer)}
        />

        {/* Transparent Membership Tiers */}
        <Pricing
          onSelectPlan={handleSelectPlan}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenTrialPass={() => setIsTrialPassOpen(true)}
        onOpenMemberPortal={() => setIsMemberPortalOpen(true)}
      />

      {/* Modals & Dialogs */}
      <TrialPassModal
        isOpen={isTrialPassOpen}
        onClose={() => setIsTrialPassOpen(false)}
        onPassGenerated={handlePassGenerated}
      />

      <ClassBookingModal
        session={selectedClassToBook}
        isOpen={!!selectedClassToBook}
        onClose={() => setSelectedClassToBook(null)}
        onConfirmBooking={handleBookingConfirmed}
      />

      <TrainerBookingModal
        trainer={selectedTrainerToBook}
        isOpen={!!selectedTrainerToBook}
        onClose={() => setSelectedTrainerToBook(null)}
      />

      <MemberPortalModal
        isOpen={isMemberPortalOpen}
        onClose={() => setIsMemberPortalOpen(false)}
        bookings={bookings}
        onCancelBooking={handleCancelBooking}
        prRecords={prRecords}
        onDeletePR={handleDeletePR}
        onAddNewPR={handleSavePR}
        onNavigateToSchedule={() => {
          document.getElementById('schedule')?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      <PlanCheckoutModal
        plan={selectedPlanForCheckout}
        isAnnual={isAnnualCheckout}
        isOpen={!!selectedPlanForCheckout}
        onClose={() => setSelectedPlanForCheckout(null)}
        onSuccess={handlePlanCheckoutSuccess}
      />

    </div>
  );
}
