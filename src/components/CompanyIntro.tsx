'use client';

import React, { useRef } from 'react';
import { Award } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { COMPANY_DATA } from '../data/content';
import { WordMaskReveal } from './motion/WordMaskReveal';

const PRINCIPLES = [
  {
    title: 'Engineering Precision',
    description:
      'Our codebases are built upon rigid technical benchmarks, eliminating bloat to guarantee sub-100ms response times and high-density performance.',
  },
  {
    title: 'Multi-Tier Stack Harmony',
    description:
      'Unified full-stack synergy across React client applications, real-time message brokers, and enterprise Java Spring backends.',
  },
  {
    title: 'Protocol-Grade Security',
    description:
      'Enterprise data compliance with AES-256 encryption, strict RBAC authorization boundaries, and ISO 27001 security standards.',
  },
];

export const CompanyIntro: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-24 sm:py-28 lg:py-32 bg-[#0c0c0c]/25 backdrop-blur-[1px] border-t border-[#1f1f1f]/50 overflow-hidden"
      aria-label="Company Introduction & Leadership"
    >
      {/* Subtle Ambient Radial Gold Lighting */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full pointer-events-none opacity-20"
          style={{
            background:
              'radial-gradient(circle, rgba(212, 175, 55, 0.16) 0%, rgba(10, 10, 10, 0) 70%)',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* 2. Section Header with Scroll Reveal Animations */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          {/* Eyebrow badge */}
          <motion.div
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 16 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, ease: [0.19, 1, 0.22, 1] }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#161616]/90 border border-[#D4AF37]/35 text-xs font-bold tracking-widest text-[#D4AF37] uppercase mb-4 backdrop-blur-md shadow-md"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
            <span>Company Philosophy & Pedigree</span>
          </motion.div>

          {/* Main Title with word mask scroll reveal */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.18] text-balance mb-5">
            <WordMaskReveal
              text="Vision, Purpose, Delivery. The Foundations of Our Craft."
              highlightWords={['Vision,', 'Purpose,', 'Delivery.']}
              highlightClassName="text-[#D4AF37]"
              stagger={0.045}
              duration={0.65}
            />
          </h2>

          {/* Subtitle with scroll fade-in */}
          <motion.p
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
            className="text-base sm:text-lg text-[#A1A1AA] leading-relaxed text-balance"
          >
            {COMPANY_DATA.vision} We reject off-the-shelf compromises and opaque agency jargon,
            replacing them with verifiable architecture and direct accountability.
          </motion.p>
        </div>

        {/* 3. Core Engineering Principles — Refined Glassmorphic Panel with Scroll Reveal */}
        <motion.div
          initial={shouldReduceMotion ? undefined : { opacity: 0, y: 35 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.75, delay: 0.1, ease: [0.19, 1, 0.22, 1] }}
          className="mt-10 sm:mt-12 mb-14 sm:mb-16 rounded-2xl border border-[#2a2a2a]/90 bg-[#121212]/80 backdrop-blur-xl p-6 sm:p-8 lg:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y divide-[#262626] md:divide-x md:divide-y-0">
            {PRINCIPLES.map((item, index) => (
              <motion.article
                key={item.title}
                initial={shouldReduceMotion ? undefined : { opacity: 0, y: 24 }}
                whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.6,
                  delay: 0.15 + index * 0.12,
                  ease: [0.19, 1, 0.22, 1],
                }}
                className="py-6 md:px-7 md:py-3 first:md:pl-0 last:md:pr-0 flex flex-col justify-between group"
              >
                <div>
                  <div className="mb-4 flex items-center gap-3">
                    <span className="font-mono text-sm font-bold text-[#D4AF37]">
                      0{index + 1}
                    </span>
                    <span
                      className="h-px w-8 bg-[#D4AF37]/50 transition-all duration-500 group-hover:w-14 group-hover:bg-[#D4AF37]"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-white group-hover:text-[#F2D98D] transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#A1A1AA]">
                    {item.description}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>

        {/* 4. Founder & Leadership Credibility Card with Uiverse Corner-Expand Animation & Scroll Reveal */}
        <motion.div
          initial={shouldReduceMotion ? undefined : { opacity: 0, y: 35 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.19, 1, 0.22, 1] }}
          tabIndex={0}
          role="region"
          aria-label="Leadership Statement and Corporate Registration"
          className="uiverse-leadership-card group border border-[#2a2a2a]/90 bg-[#141414]/85 backdrop-blur-xl p-6 sm:p-8 lg:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.7)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2D98D]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
        >
          {/* Subtle ambient light gold accent glow */}
          <div
            className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-[#F2D98D]/5 to-transparent rounded-full pointer-events-none blur-3xl transition-opacity duration-500 group-hover:opacity-100"
            aria-hidden="true"
          />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-2 mb-4">
                <Award className="w-4 h-4 text-[#D4AF37] group-hover:scale-110 transition-transform duration-300" />
                <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
                  Founding Leadership
                </span>
              </div>
              <p className="text-base sm:text-lg font-medium text-white/95 leading-relaxed mb-6 group-hover:text-white transition-colors duration-300">
                {COMPANY_DATA.foundingStatement}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-1">
                {COMPANY_DATA.leadership.map((leader) => (
                  <div key={leader.name} className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-full bg-[#1c1c1c] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] font-black text-sm shrink-0 group-hover:border-[#F2D98D]/60 group-hover:shadow-[0_0_12px_rgba(242,217,141,0.2)] transition-all duration-500 overflow-hidden relative">
                      {leader.image ? (
                        <>
                          <img
                            src={leader.image}
                            alt={leader.name}
                            className="w-full h-full object-cover object-[center_18%]"
                            onError={(e) => {
                              (e.currentTarget as HTMLElement).style.display = 'none';
                            }}
                          />
                          <span className="absolute inset-0 flex items-center justify-center -z-10 font-bold text-[#D4AF37]">
                            {leader.initials}
                          </span>
                        </>
                      ) : (
                        leader.initials
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm sm:text-base font-bold text-white group-hover:text-[#F2D98D] transition-colors duration-300">
                          {leader.name}
                        </span>
                        {leader.linkedin && (
                          <a
                            href={leader.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#888888] hover:text-[#0a66c2] transition-colors p-0.5"
                            aria-label={`${leader.name} LinkedIn`}
                          >
                            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.6 1.6 0 0 0-1.61 1.6 1.6 1.6 0 0 0 1.61 1.6 1.6 1.6 0 0 0 1.6-1.6 1.6 1.6 0 0 0-1.6-1.6Z" />
                            </svg>
                          </a>
                        )}
                      </div>
                      <div className="text-xs text-[#888888] font-medium">
                        {leader.role}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-[#262626] pt-6 lg:pt-0 lg:pl-8 flex flex-col justify-center space-y-4">
              <div className="text-xs font-bold uppercase text-[#888888] tracking-wider">
                Corporate Registration
              </div>
              <div className="space-y-2 text-sm text-[#A1A1AA] mb-4">
                <div className="flex justify-between items-center py-1 border-b border-[#222222]">
                  <span className="text-xs font-semibold text-[#DFC067]">Entity:</span>
                  <span className="text-xs font-bold text-white">{COMPANY_DATA.legalName}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-[#222222]">
                  <span className="text-xs font-semibold text-[#DFC067]">HQ Location:</span>
                  <span className="text-xs font-bold text-white">{COMPANY_DATA.location}</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-xs font-semibold text-[#DFC067]">Brand Line:</span>
                  <span className="font-mono text-xs font-bold text-[#DFC067]">
                    {COMPANY_DATA.brandLine}
                  </span>
                </div>
              </div>
              <a
                href="/leadership"
                className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#1c1c1c] border border-[#D4AF37]/40 text-xs font-bold text-white hover:bg-[#252525] hover:border-[#D4AF37] transition-colors group/link"
              >
                <span>View Full Executive Profiles</span>
                <span className="text-[#D4AF37] group-hover/link:translate-x-1 transition-transform">→</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CompanyIntro;
