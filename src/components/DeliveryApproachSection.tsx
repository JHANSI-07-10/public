'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, ShieldCheck, Workflow } from 'lucide-react';
import { SectionHeader } from './ui/SectionHeader';
import { DELIVERY_METHODOLOGY } from '../data/content';
import { Reveal } from './motion/Reveal';
import { StaggerContainer, StaggerItem } from './motion/StaggerContainer';
import { InteractiveCard } from './motion/InteractiveCard';

export const DeliveryApproachSection: React.FC = () => {
  return (
    <section id="delivery-approach" className="py-24 bg-[#0c0c0c] border-t border-[#1f1f1f] relative overflow-hidden">
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
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#161616] border border-[#D4AF37]/30 text-xs font-bold tracking-widest text-[#D4AF37] uppercase mb-4">
              <Workflow className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Structured Execution Discipline</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.15] text-balance mb-4">
              Delivery Approach:{' '}
              <span className="text-[#D4AF37]">Design → Develop → Pilot → Scale → Support</span>.
            </h2>
            <p className="text-base sm:text-lg text-[#A1A1AA] leading-relaxed text-balance">
              From initial architectural specification through to continuous production governance, every VPD engagement follows a deterministic 5-stage lifecycle.
            </p>
          </div>
        </Reveal>

        {/* 5-Step Process Timeline / Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
          {DELIVERY_METHODOLOGY.map((stage, idx) => (
            <Reveal key={stage.step} delay={idx * 0.08}>
              <div className="rounded-2xl border border-[#242424] bg-[#141414]/90 backdrop-blur-md p-6 h-full flex flex-col justify-between hover:border-[#D4AF37]/50 transition-all duration-300 group shadow-lg">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black font-mono text-[#D4AF37] group-hover:scale-110 transition-transform">
                      {stage.step}
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#777777] px-2 py-0.5 rounded bg-[#1c1c1c] border border-[#2a2a2a]">
                      Stage {idx + 1}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-1 group-hover:text-[#F2D98D] transition-colors">
                    {stage.title}
                  </h3>

                  <div className="text-xs font-mono text-[#D4AF37] mb-3">
                    {stage.tagline}
                  </div>

                  <p className="text-xs text-[#999999] leading-relaxed mb-4">
                    {stage.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#222222]">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#666666] block mb-2 font-bold">
                    Key Outputs:
                  </span>
                  <ul className="space-y-1.5 text-[11px] text-[#cccccc]">
                    {stage.deliverables.map((deliv, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3 h-3 text-[#D4AF37] shrink-0 mt-0.5" />
                        <span className="leading-tight">{deliv}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
