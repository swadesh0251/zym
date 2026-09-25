import React, { useState } from 'react';
import { FACILITY_ZONES } from '../data/gymData';
import { Check, Shield, Zap, Layers, Sparkles } from 'lucide-react';

export const FacilityTour: React.FC = () => {
  const [activeZoneId, setActiveZoneId] = useState<string>(FACILITY_ZONES[0].id);

  const activeZone = FACILITY_ZONES.find((z) => z.id === activeZoneId) || FACILITY_ZONES[0];

  return (
    <section id="facilities" className="py-24 bg-[#090b0e] border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#ccff00] mb-2">
            Architectural Engineering
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Four Specialized Training Ecosystems
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-400">
            Every square foot is calibrated for athletic output—from acoustic vibration isolation subfloors to medical-grade thermal recovery.
          </p>
        </div>

        {/* Interactive Zone Filter Tabs - horizontally scrollable on mobile */}
        <div className="mt-8 -mx-4 px-4 sm:mx-0 sm:px-0 overflow-x-auto scrollbar-none pb-2">
          <div className="flex items-center gap-1.5 sm:gap-2 p-1.5 bg-[#12151c] rounded-lg border border-neutral-800/80 min-w-max">
            {FACILITY_ZONES.map((zone) => (
              <button
                key={zone.id}
                onClick={() => setActiveZoneId(zone.id)}
                className={`px-3.5 sm:px-4 py-2.5 sm:py-2 min-h-[42px] text-xs sm:text-sm font-semibold rounded-md transition-all whitespace-nowrap cursor-pointer ${
                  activeZoneId === zone.id
                    ? 'bg-neutral-800 text-white shadow-sm border border-neutral-700'
                    : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/40'
                }`}
              >
                {zone.name.split('&')[0].trim()}
              </button>
            ))}
          </div>
        </div>

        {/* Active Zone Spotlight Card */}
        <div className="mt-6 sm:mt-8 bg-[#10131a] rounded-xl border border-neutral-800 overflow-hidden shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-0">
          
          {/* Visual Showcase (7 cols) */}
          <div className="lg:col-span-7 relative min-h-[260px] xs:min-h-[320px] sm:min-h-[440px] bg-neutral-950 overflow-hidden">
            <img
              src={activeZone.image}
              alt={activeZone.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center filter brightness-[0.88] transition-all duration-500"
            />
            {/* Scrim overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#10131a] via-transparent to-transparent opacity-90 lg:opacity-60" />
            
            {/* Zone spec label */}
            <div className="absolute top-4 sm:top-5 left-4 sm:left-5 bg-black/80 backdrop-blur-md px-3 py-1 sm:py-1.5 rounded border border-neutral-700/60 text-[11px] sm:text-xs font-mono font-medium text-neutral-200">
              {activeZone.specTag}
            </div>

            <div className="absolute bottom-4 sm:bottom-5 left-4 sm:left-5 right-4 sm:right-5 lg:hidden">
              <span className="font-mono text-xs text-[#ccff00] font-semibold">{activeZone.sqft}</span>
              <h3 className="font-display text-lg sm:text-xl font-bold text-white mt-0.5">{activeZone.name}</h3>
            </div>
          </div>

          {/* Technical Specs & Equipment (5 cols) */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="hidden lg:flex items-center justify-between text-xs text-neutral-400 font-mono">
                <span>{activeZone.subtitle}</span>
                <span className="text-[#ccff00] font-bold">{activeZone.sqft}</span>
              </div>

              <h3 className="hidden lg:block font-display text-2xl font-bold text-white mt-2">
                {activeZone.name}
              </h3>

              <p className="mt-4 text-sm text-neutral-300 leading-relaxed">
                {activeZone.description}
              </p>

              {/* Key Features */}
              <div className="mt-6">
                <h4 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3">
                  Zone Architectural Features
                </h4>
                <div className="space-y-2.5">
                  {activeZone.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-200">
                      <Check className="w-4 h-4 text-[#ccff00] shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Equipment Inventory */}
              <div className="mt-6 pt-5 border-t border-neutral-800">
                <h4 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2.5">
                  Hardware & Apparatus Inventory
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {activeZone.equipment.map((item, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 text-xs font-mono bg-neutral-900 border border-neutral-800 text-neutral-300 rounded"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-neutral-800/80 flex items-center justify-between text-xs text-neutral-400">
              <span className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-[#ccff00]" />
                Daily Sanitzation & Barbell Maintenance
              </span>
              <span className="font-mono text-neutral-500">ISO 9001 Facility</span>
            </div>
          </div>
        </div>

        {/* 3 Key Operational Protocols below the bento */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-[#0f1218] rounded-lg border border-neutral-800/80">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-neutral-800 rounded text-[#ccff00]">
                <Zap className="w-4 h-4" />
              </div>
              <h4 className="font-display font-bold text-white text-base">Unbroken Training Flow</h4>
            </div>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              Strict platform limits and member caps guarantee you never wait for an Olympic barbell or power rack during peak hours.
            </p>
          </div>

          <div className="p-6 bg-[#0f1218] rounded-lg border border-neutral-800/80">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-neutral-800 rounded text-[#ccff00]">
                <Layers className="w-4 h-4" />
              </div>
              <h4 className="font-display font-bold text-white text-base">Calibrated Competition Gear</h4>
            </div>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              Every plate, bar, and dumbbell is machine calibrated to exact competition gram tolerances. Zero sloppy weights or worn bushings.
            </p>
          </div>

          <div className="p-6 bg-[#0f1218] rounded-lg border border-neutral-800/80">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-neutral-800 rounded text-[#ccff00]">
                <Sparkles className="w-4 h-4" />
              </div>
              <h4 className="font-display font-bold text-white text-base">Hydrothermal Standards</h4>
            </div>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              Continuous ozone water filtration, UV sanitation, and constant 3.8°C thermal regulation in our contrast immersion suites.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
