import React from 'react';
import { ArrowRight, Compass, ShieldCheck, Activity } from 'lucide-react';

interface HeroProps {
  onOpenTrialPass: () => void;
  onExploreFacilities: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenTrialPass, onExploreFacilities }) => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden border-b border-neutral-800">
      {/* Background Image with Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_athletic_gym_1790353662864.jpg"
          alt="KINETIX Athletic Club High Performance Training Floor"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center filter brightness-[0.75] contrast-[1.1]"
        />
        {/* Measured contrast scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080a0d] via-[#080a0d]/75 to-[#080a0d]/50" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-900/30 via-transparent to-black/80" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 w-full">
        {/* Live Status indicator - unboxed text with subtle separator */}
        <div className="flex items-center gap-2 text-xs font-medium text-neutral-300 mb-6">
          <span className="inline-flex items-center gap-1.5 text-[#ccff00]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ccff00] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ccff00]"></span>
            </span>
            Austin Flagship Facility
          </span>
          <span aria-hidden="true" className="text-neutral-600">·</span>
          <span className="flex items-center gap-1 text-neutral-300">
            <Activity className="w-3.5 h-3.5 text-neutral-400" />
            Live Floor Load: <strong className="text-white font-mono">38% Capacity</strong> (Optimal)
          </span>
          <span aria-hidden="true" className="text-neutral-600 hidden sm:inline">·</span>
          <span className="text-neutral-400 hidden sm:inline">24/7 Member Keycard Active</span>
        </div>

        {/* Main Headline */}
        <div className="max-w-4xl">
          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08] text-balance">
            ENGINEERED FOR <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-100 to-neutral-400">
              HIGH-OUTPUT
            </span>{' '}
            <span className="text-[#ccff00]">PERFORMANCE.</span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-neutral-300 max-w-2xl font-normal leading-relaxed">
            Austin’s premier athletic sanctuary. 28,000 square feet of competition Eleiko barbell platforms, 50-meter Hyrox turf, Vald biometric force testing, and clinical cold plunge recovery.
          </p>

          {/* Action CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <button
              onClick={onOpenTrialPass}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-bold text-black bg-[#ccff00] hover:bg-[#b8e600] rounded-md transition-all duration-150 shadow-[0_0_24px_rgba(204,255,0,0.25)] hover:shadow-[0_0_32px_rgba(204,255,0,0.4)] whitespace-nowrap cursor-pointer"
            >
              <span>Claim 1-Day All-Access Pass</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onExploreFacilities}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-neutral-200 hover:text-white bg-neutral-900/80 hover:bg-neutral-800 rounded-md border border-neutral-700/80 transition-colors whitespace-nowrap cursor-pointer"
            >
              <Compass className="w-4 h-4 text-neutral-400" />
              <span>Explore Facility Zones</span>
            </button>
          </div>
        </div>

        {/* Hard Institutional Specs Adjacency Grid */}
        <div className="mt-16 pt-8 border-t border-neutral-800/80 grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
          <div>
            <div className="font-mono text-2xl lg:text-3xl font-bold text-white tabular-nums tracking-tight">
              28,000 <span className="text-xs font-normal text-neutral-400 font-sans">SQ FT</span>
            </div>
            <p className="text-xs text-neutral-400 mt-1">Acoustic vibration-isolated space</p>
          </div>

          <div>
            <div className="font-mono text-2xl lg:text-3xl font-bold text-white tabular-nums tracking-tight">
              12 <span className="text-xs font-normal text-neutral-400 font-sans">PLATFORMS</span>
            </div>
            <p className="text-xs text-neutral-400 mt-1">Certified Eleiko competition steel</p>
          </div>

          <div>
            <div className="font-mono text-2xl lg:text-3xl font-bold text-white tabular-nums tracking-tight">
              3.8°C <span className="text-xs font-normal text-neutral-400 font-sans">COLD PLUNGE</span>
            </div>
            <p className="text-xs text-neutral-400 mt-1">Twin medical-grade ozone ice baths</p>
          </div>

          <div>
            <div className="font-mono text-2xl lg:text-3xl font-bold text-white tabular-nums tracking-tight">
              24/7 <span className="text-xs font-normal text-neutral-400 font-sans">ACCESS</span>
            </div>
            <p className="text-xs text-neutral-400 mt-1">Encrypted biometric RFID turnstiles</p>
          </div>
        </div>
      </div>
    </section>
  );
};
