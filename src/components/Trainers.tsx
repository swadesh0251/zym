import React from 'react';
import { TRAINERS } from '../data/gymData';
import { Trainer } from '../types';
import { Award, Clock, ArrowRight, CheckCircle2 } from 'lucide-react';

interface TrainersProps {
  onSelectTrainerToBook: (trainer: Trainer) => void;
}

export const Trainers: React.FC<TrainersProps> = ({ onSelectTrainerToBook }) => {
  return (
    <section id="trainers" className="py-24 bg-[#080a0d] border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-neutral-800">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#ccff00] mb-2">
              Human Performance Staff
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Master Coaches & Physiologists
            </h2>
            <p className="mt-2 text-sm text-neutral-400 max-w-xl">
              Every KINETIX coach holds top-tier collegiate or clinical credentials with proven track records in high-performance competitive athletics.
            </p>
          </div>

          <div className="text-xs font-mono text-neutral-400">
            Average Coaching Tenure: <strong className="text-white">10.7 Years</strong>
          </div>
        </div>

        {/* Coaches Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TRAINERS.map((trainer) => (
            <div
              key={trainer.id}
              className="bg-[#10131a] rounded-xl border border-neutral-800 overflow-hidden flex flex-col justify-between group hover:border-neutral-700 transition-all duration-200"
            >
              <div>
                {/* Photo frame */}
                <div className="relative h-64 bg-neutral-900 overflow-hidden">
                  <img
                    src={trainer.image}
                    alt={trainer.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top filter grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#10131a] via-[#10131a]/30 to-transparent" />
                  
                  {/* Years of Experience badge */}
                  <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded text-[11px] font-mono font-medium text-neutral-300 border border-neutral-800">
                    {trainer.experienceYears} Yrs Experience
                  </div>

                  {/* Name and title on image */}
                  <div className="absolute bottom-3 left-4 right-4">
                    <h3 className="font-display text-xl font-bold text-white leading-tight">
                      {trainer.name}
                    </h3>
                    <p className="text-xs text-[#ccff00] font-medium mt-0.5">
                      {trainer.title}
                    </p>
                  </div>
                </div>

                {/* Content body */}
                <div className="p-5 space-y-4">
                  <p className="text-xs text-neutral-300 leading-relaxed line-clamp-3">
                    {trainer.bio}
                  </p>

                  {/* Specialties */}
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                      Specialties
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {trainer.specialties.map((spec, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 text-[11px] bg-neutral-900 text-neutral-300 rounded border border-neutral-800 font-mono"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Certifications */}
                  <div className="pt-2 border-t border-neutral-800/80">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                      Accreditation
                    </div>
                    <div className="space-y-1">
                      {trainer.certifications.slice(0, 2).map((cert, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-xs text-neutral-300">
                          <CheckCircle2 className="w-3 h-3 text-[#ccff00] shrink-0" />
                          <span className="truncate">{cert}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Benchmark */}
                  <div className="p-2.5 bg-neutral-950 rounded border border-neutral-800/60">
                    <div className="flex items-center gap-1 text-[10px] text-neutral-400 font-mono">
                      <Award className="w-3 h-3 text-amber-400" />
                      <span>Benchmark Record</span>
                    </div>
                    <div className="text-xs font-semibold text-neutral-200 mt-0.5 truncate">
                      {trainer.personalRecord}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Action */}
              <div className="p-5 pt-0">
                <button
                  onClick={() => onSelectTrainerToBook(trainer)}
                  className="w-full py-2.5 px-3 text-xs font-bold text-neutral-200 hover:text-black bg-neutral-900 hover:bg-[#ccff00] rounded-md border border-neutral-700 hover:border-[#ccff00] transition-colors flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
                >
                  <span>Book Consultation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
