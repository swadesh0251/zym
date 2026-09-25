import React, { useState } from 'react';
import { MEMBERSHIP_PLANS } from '../data/gymData';
import { MembershipPlan } from '../types';
import { Check, ShieldAlert, Zap, ArrowRight } from 'lucide-react';

interface PricingProps {
  onSelectPlan: (plan: MembershipPlan, isAnnual: boolean) => void;
}

export const Pricing: React.FC<PricingProps> = ({ onSelectPlan }) => {
  const [isAnnual, setIsAnnual] = useState<boolean>(true);

  return (
    <section id="memberships" className="py-24 bg-[#090b0e] border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#ccff00] mb-2">
            Clear Investment
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Transparent Membership Tiers
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-400">
            No initiation hidden fees, zero locked predatory lock-ins. Month-to-month flexibility with 30-day cancellation notice.
          </p>

          {/* Billing Toggle (Segmented control) */}
          <div className="mt-8 inline-flex items-center p-1 bg-[#12151d] rounded-lg border border-neutral-800">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-4 py-2 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                !isAnnual
                  ? 'bg-neutral-800 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-4 py-2 text-xs font-semibold rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
                isAnnual
                  ? 'bg-[#ccff00] text-black font-bold shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <span>Annual Commitment</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded ${isAnnual ? 'bg-black text-[#ccff00]' : 'bg-neutral-800 text-[#ccff00]'}`}>
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {MEMBERSHIP_PLANS.map((plan) => {
            const price = isAnnual ? plan.annualPricePerMonth : plan.monthlyPrice;
            const isPopular = plan.isPopular;

            return (
              <div
                key={plan.id}
                className={`relative rounded-xl flex flex-col justify-between transition-all duration-200 ${
                  isPopular
                    ? 'bg-[#12151f] border-2 border-[#ccff00] shadow-[0_0_30px_rgba(204,255,0,0.12)]'
                    : 'bg-[#10131a] border border-neutral-800 hover:border-neutral-700'
                } p-6 sm:p-8`}
              >
                {/* Popular Pill */}
                {isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#ccff00] text-black font-bold text-[11px] uppercase tracking-wider px-3 py-0.5 rounded-full shadow-md font-mono">
                    Most Selected by Athletes
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-xl font-bold text-white">{plan.name}</h3>
                  </div>

                  <p className="mt-2 text-xs text-neutral-400 min-h-[36px]">
                    {plan.tagline}
                  </p>

                  {/* Price */}
                  <div className="mt-6 pb-6 border-b border-neutral-800">
                    <div className="flex items-baseline gap-1">
                      <span className="text-sm font-semibold text-neutral-400">$</span>
                      <span className="font-mono text-4xl sm:text-5xl font-extrabold text-white tabular-nums tracking-tight">
                        {price}
                      </span>
                      <span className="text-xs text-neutral-400 font-mono">/month</span>
                    </div>
                    <div className="text-[11px] text-neutral-500 mt-1 font-mono">
                      {isAnnual ? 'Billed annually ($' + price * 12 + '/yr)' : 'Billed monthly with zero lock-in'}
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="mt-6 space-y-3">
                    <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">
                      Included Privileges
                    </div>
                    {plan.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-200">
                        <Check className="w-4 h-4 text-[#ccff00] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card CTA */}
                <div className="mt-8 pt-6 border-t border-neutral-800/80">
                  <button
                    onClick={() => onSelectPlan(plan, isAnnual)}
                    className={`w-full py-3 px-4 text-xs font-bold rounded-md transition-all flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap ${
                      isPopular
                        ? 'bg-[#ccff00] hover:bg-[#b8e600] text-black shadow-md'
                        : 'bg-neutral-800 hover:bg-neutral-700 text-white border border-neutral-700'
                    }`}
                  >
                    <span>Choose {plan.name}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Adjacency Trust signals */}
        <div className="mt-14 max-w-4xl mx-auto p-6 bg-[#10131a] rounded-lg border border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-neutral-400">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-neutral-900 rounded text-[#ccff00]">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <div className="font-semibold text-white">14-Day Performance Guarantee</div>
              <div>If the facility doesn't exceed your standards, receive a 100% full refund.</div>
            </div>
          </div>

          <div className="text-neutral-500 font-mono text-[11px] text-center sm:text-right shrink-0">
            Encrypted Checkout · Stripe Verified
          </div>
        </div>

      </div>
    </section>
  );
};
