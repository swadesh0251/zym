import React, { useState } from 'react';
import { Menu, X, User, ArrowRight } from 'lucide-react';

interface NavbarProps {
  onOpenTrialPass: () => void;
  onOpenMemberPortal: () => void;
  activeBookingsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenTrialPass,
  onOpenMemberPortal,
  activeBookingsCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#090b0e]/95 backdrop-blur-md border-b border-neutral-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between">
        
        {/* Zone 1: Single text element wordmark */}
        <a href="#" className="flex items-center gap-2 group text-decoration-none min-h-[44px] py-1">
          <span className="font-display font-extrabold text-xl sm:text-2xl tracking-tighter text-white group-hover:text-neutral-200 transition-colors">
            KINETIX
          </span>
          <span className="w-2 h-2 rounded-full bg-[#ccff00] shadow-[0_0_8px_rgba(204,255,0,0.6)]" />
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium text-neutral-300">
          <a href="#facilities" className="hover:text-white transition-colors py-2">
            Facilities
          </a>
          <a href="#schedule" className="hover:text-white transition-colors py-2">
            Schedule
          </a>
          <a href="#performance-lab" className="hover:text-white transition-colors py-2">
            Performance Lab
          </a>
          <a href="#trainers" className="hover:text-white transition-colors py-2">
            Coaches
          </a>
          <a href="#memberships" className="hover:text-white transition-colors py-2">
            Memberships
          </a>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="hidden md:flex items-center gap-3 sm:gap-4">
          <button
            onClick={onOpenMemberPortal}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-neutral-300 hover:text-white hover:bg-neutral-800/60 rounded-md border border-neutral-800 transition-colors whitespace-nowrap cursor-pointer min-h-[40px]"
          >
            <User className="w-3.5 h-3.5 text-neutral-400" />
            <span>Member Portal</span>
            {activeBookingsCount > 0 && (
              <span className="bg-[#ccff00] text-black font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {activeBookingsCount}
              </span>
            )}
          </button>

          <button
            onClick={onOpenTrialPass}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-black bg-[#ccff00] hover:bg-[#b8e600] rounded-md transition-colors whitespace-nowrap shadow-sm cursor-pointer min-h-[40px]"
          >
            <span>Book Free Day Pass</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile menu trigger with standard touch target */}
        <div className="flex md:hidden items-center gap-1">
          <button
            onClick={onOpenMemberPortal}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center text-neutral-300 hover:text-white rounded-md border border-neutral-800 relative"
            aria-label="Member Portal"
          >
            <User className="w-4 h-4" />
            {activeBookingsCount > 0 && (
              <span className="absolute top-2 right-2 bg-[#ccff00] text-black font-bold text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center">
                {activeBookingsCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center text-neutral-400 hover:text-white focus:outline-none"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-neutral-800 bg-[#0c0f14]/98 backdrop-blur-xl px-4 py-5 space-y-4 animate-fade-in shadow-2xl">
          <div className="flex flex-col space-y-1 text-base font-medium text-neutral-200">
            <a
              href="#facilities"
              onClick={() => setMobileMenuOpen(false)}
              className="py-3 px-3 min-h-[44px] flex items-center rounded-md hover:bg-neutral-800/60 hover:text-[#ccff00] transition-colors"
            >
              Facilities
            </a>
            <a
              href="#schedule"
              onClick={() => setMobileMenuOpen(false)}
              className="py-3 px-3 min-h-[44px] flex items-center rounded-md hover:bg-neutral-800/60 hover:text-[#ccff00] transition-colors"
            >
              Schedule
            </a>
            <a
              href="#performance-lab"
              onClick={() => setMobileMenuOpen(false)}
              className="py-3 px-3 min-h-[44px] flex items-center rounded-md hover:bg-neutral-800/60 hover:text-[#ccff00] transition-colors"
            >
              Performance Lab
            </a>
            <a
              href="#trainers"
              onClick={() => setMobileMenuOpen(false)}
              className="py-3 px-3 min-h-[44px] flex items-center rounded-md hover:bg-neutral-800/60 hover:text-[#ccff00] transition-colors"
            >
              Coaches
            </a>
            <a
              href="#memberships"
              onClick={() => setMobileMenuOpen(false)}
              className="py-3 px-3 min-h-[44px] flex items-center rounded-md hover:bg-neutral-800/60 hover:text-[#ccff00] transition-colors"
            >
              Memberships
            </a>
          </div>

          <div className="pt-3 border-t border-neutral-800/80 space-y-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTrialPass();
              }}
              className="w-full py-3.5 min-h-[46px] text-center text-sm font-bold text-black bg-[#ccff00] active:bg-[#b8e600] rounded-md transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Book Free Day Pass</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenMemberPortal();
              }}
              className="w-full py-3.5 min-h-[46px] text-center text-sm font-semibold text-neutral-200 border border-neutral-700 active:bg-neutral-800/60 rounded-md transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <User className="w-4 h-4 text-neutral-400" />
              <span>Member Portal & Keycard</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
