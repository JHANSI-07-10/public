'use client';

import React, { useRef } from 'react';
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
      'Unified full-stack synergy across React client applications, real-time message brokers, and scalable enterprise backends.',
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
      className="relative py-14 sm:py-16 lg:py-18 border-t border-[#1f1f1f]/50 overflow-hidden"
      aria-label="Company Introduction & Engineering Principles"
    >
      {/* Pure coded ambient gold lighting */}
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
              text="Vision, Purpose, Delivery."
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
          className="mt-10 sm:mt-12 rounded-2xl border border-[#2a2a2a]/90 bg-[#121212]/80 backdrop-blur-xl p-6 sm:p-8 lg:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
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
      </div>
    </section>
  );
};

export default CompanyIntro;
