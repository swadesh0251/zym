import React from 'react';
import { GYM_SPECS } from '../data/gymData';
import { MapPin, Phone, Mail, Clock, Shield } from 'lucide-react';

interface FooterProps {
  onOpenTrialPass: () => void;
  onOpenMemberPortal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenTrialPass, onOpenMemberPortal }) => {
  return (
    <footer className="bg-[#06080a] text-neutral-400 text-xs border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Brand info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-display font-extrabold text-xl text-white tracking-wider">
                KINETIX
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00]" />
            </div>
            
            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
              Austin’s benchmark athletic performance facility. Built for powerlifters, Olympic lifters, Hyrox competitors, and serious strength practitioners.
            </p>

            <div className="pt-2 text-neutral-500 font-mono text-[11px]">
              28,000 SQ FT · ELEIKO SANCTIONED
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <div className="text-xs font-semibold text-white uppercase tracking-wider font-mono">
              Facility & Programs
            </div>
            <ul className="space-y-2">
              <li>
                <a href="#facilities" className="hover:text-white transition-colors">
                  Four Specialized Zones
                </a>
              </li>
              <li>
                <a href="#schedule" className="hover:text-white transition-colors">
                  Class Schedule & Registration
                </a>
              </li>
              <li>
                <a href="#performance-lab" className="hover:text-white transition-colors">
                  Performance Calculators
                </a>
              </li>
              <li>
                <a href="#trainers" className="hover:text-white transition-colors">
                  Master Coaches & Physiologists
                </a>
              </li>
              <li>
                <a href="#memberships" className="hover:text-white transition-colors">
                  Membership Options
                </a>
              </li>
            </ul>
          </div>

          {/* Member Concierge */}
          <div className="space-y-3">
            <div className="text-xs font-semibold text-white uppercase tracking-wider font-mono">
              Athlete Portal
            </div>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={onOpenMemberPortal}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Member Digital Keycard
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenTrialPass}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Claim 1-Day Trial Pass
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenMemberPortal}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Strength PR Tracker
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenMemberPortal}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Live Floor Capacity
                </button>
              </li>
            </ul>
          </div>

          {/* Location & Hours */}
          <div className="space-y-3">
            <div className="text-xs font-semibold text-white uppercase tracking-wider font-mono">
              Headquarters
            </div>
            <div className="space-y-2 text-neutral-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#ccff00] shrink-0 mt-0.5" />
                <span>{GYM_SPECS.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#ccff00] shrink-0" />
                <span>24/7 Access for Active Members</span>
              </div>
              <div className="flex items-center gap-2 font-mono text-[11px]">
                <Phone className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                <span>{GYM_SPECS.phone}</span>
              </div>
              <div className="flex items-center gap-2 font-mono text-[11px]">
                <Mail className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                <span>{GYM_SPECS.email}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-neutral-500 text-[11px]">
          <div>
            &copy; {new Date().getFullYear()} KINETIX Performance Club, LLC. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-neutral-400 cursor-pointer">Liability & Waiver</span>
            <span className="hover:text-neutral-400 cursor-pointer">Privacy Charter</span>
            <span className="hover:text-neutral-400 cursor-pointer">Safety Guidelines</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
