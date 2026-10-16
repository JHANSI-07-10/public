'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Clock, ShieldCheck, Zap } from 'lucide-react';
import { Reveal } from './motion/Reveal';

interface ContactCTAProps {
  onOpenConsultation?: () => void;
}

export const ContactCTA: React.FC<ContactCTAProps> = () => {
  return (
    <section
      id="contact-cta"
      className="py-14 sm:py-16 bg-[#08080a]/30 backdrop-blur-[2px] border-t border-[#1f1f1f]/60 relative overflow-hidden"
      aria-label="Direct Engineering Contact"
    >
      {/* Subtle ambient gold radial aura */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[320px] bg-[#c9a84c]/6 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <Reveal>
          <div className="rounded-3xl bg-gradient-to-b from-[#141416] via-[#101012] to-[#0c0c0e] border border-white/[0.08] p-8 sm:p-14 lg:p-16 shadow-2xl relative overflow-hidden group">
            {/* Top gold hair-line gleam */}
            <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#c9a84c]/50 to-transparent" />

            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#18181c] border border-[#c9a84c]/25 mb-6 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c9a84c] animate-pulse" />
              <span className="text-[11px] font-mono font-bold tracking-widest text-[#DFC067] uppercase select-none">
                DIRECT INQUIRY CHANNEL
              </span>
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.12] mb-5 text-balance max-w-2xl mx-auto">
              Ready to Architect Your Next Technical Milestone?
            </h2>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-[#aaaaaa] leading-relaxed max-w-xl mx-auto mb-10 text-balance">
              Skip the sales bureaucracy. Connect directly with our engineering leadership to review system architecture, technical specifications, and production timelines.
            </p>

            {/* The Unique Prominent Button that redirects to /contact */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="group/btn relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full text-sm sm:text-base font-bold text-[#08080a] bg-gradient-to-r from-[#f5df9e] via-[#c9a84c] to-[#b58d34] shadow-[0_4px_24px_rgba(201,168,76,0.32)] hover:shadow-[0_8px_36px_rgba(201,168,76,0.48)] border border-white/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 select-none cursor-pointer overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c]"
                aria-label="Direct Engineering Inquiry — Go to Contact Page"
              >
                {/* Specular button sheen */}
                <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform ease-out pointer-events-none" />

                <span className="relative z-10 tracking-wide">Direct Engineering Inquiry</span>
                <ArrowRight className="w-4 h-4 text-[#08080a] relative z-10 transition-transform duration-250 group-hover/btn:translate-x-1" />
              </Link>
            </div>

            {/* Trust and Velocity Badges */}
            <div className="mt-10 pt-8 border-t border-white/[0.06] flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-[#777777]">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#c9a84c]" />
                <span>&lt; 4-Hour Engineer Response</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-3.5 h-3.5 text-[#c9a84c]" />
                <span>Direct Founder Review</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#c9a84c]" />
                <span>Strict Mutual NDA Protection</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default ContactCTA;
