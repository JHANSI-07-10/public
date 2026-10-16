'use client';

import React from 'react';
import { Workflow } from 'lucide-react';
import { DELIVERY_METHODOLOGY } from '../data/content';
import { Reveal } from './motion/Reveal';
import { DeliveryWheel } from './delivery/DeliveryWheel';

export const DeliveryApproachSection: React.FC = () => {
  return (
    <section id="delivery-approach" className="py-14 sm:py-16 bg-[#0c0c0c] border-t border-[#1f1f1f]/50 relative overflow-hidden">
      {/* Background ambient radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full pointer-events-none opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(212, 175, 55, 0.12) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Reveal>
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#161616] border border-[#D4AF37]/30 text-xs font-bold tracking-widest text-[#D4AF37] uppercase mb-4">
              <Workflow className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Structured Execution Discipline</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.15] text-balance mb-3">
              Our Delivery Approach
            </h2>
            <p className="text-lg sm:text-xl font-semibold text-[#D4AF37] text-balance mb-4">
              From Concept to Continuous Improvement
            </p>
            <p className="text-sm sm:text-base text-[#A1A1AA] leading-relaxed text-balance">
              VPD follows a structured, measurable engineering lifecycle — five sequential stages with
              defined outputs, quality gates and governance at every step.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <DeliveryWheel stages={DELIVERY_METHODOLOGY} />
        </Reveal>
      </div>
    </section>
  );
};
