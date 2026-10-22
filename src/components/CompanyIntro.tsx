'use client';

import React, { useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { COMPANY_DATA } from '../data/content';
import { WordMaskReveal } from './motion/WordMaskReveal';
import { Eye, Target, Rocket } from 'lucide-react';

const PRINCIPLES = [
  {
    title: 'Vision',
    icon: Eye,
    description:
      'To anticipate the future of technology and create innovative digital solutions that help businesses grow and evolve.',
  },
  {
    title: 'Purpose',
    icon: Target,
    description:
      'To build meaningful software solutions that address real business challenges and deliver lasting value.',
  },
  {
    title: 'Delivery',
    icon: Rocket,
    description:
      'To transform ideas into reliable, scalable software products and digital solutions through quality engineering and effective execution.',
  },
];

export const CompanyIntro: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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

      <div className="w-full max-w-[92vw] 2xl:max-w-[1680px] 3xl:max-w-[2100px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 relative z-10">
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

        {/* 3. Core Philosophy & Pillars — Refined Glassmorphic Panel with Traveling Beam */}
        <motion.div
          initial={shouldReduceMotion ? undefined : { opacity: 0, y: 35 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.75, delay: 0.1, ease: [0.19, 1, 0.22, 1] }}
          className="relative mt-10 sm:mt-12 rounded-2xl border border-[#2a2a2a]/90 bg-[#121212]/80 backdrop-blur-xl p-5 sm:p-7 lg:p-9 shadow-[0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden"
        >
          {/* Continuous Traveling Gold Energy Beam on Top Border */}
          {!shouldReduceMotion && (
            <div className="absolute top-0 left-0 right-0 h-[1.5px] overflow-hidden pointer-events-none z-20">
              <motion.div
                className="w-1/3 h-full bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-85"
                animate={{ x: ['-100%', '300%'] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
              />
            </div>
          )}

          {/* 3 Clean, Non-Distracting Pillar Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 relative z-10">
            {PRINCIPLES.map((item, index) => {
              const Icon = item.icon;
              const isItemHovered = hoveredIndex === index;

              return (
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
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  whileHover={shouldReduceMotion ? undefined : { y: -3, transition: { duration: 0.2, ease: 'easeOut' } }}
                  className={`relative rounded-xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 overflow-hidden border ${
                    isItemHovered
                      ? 'border-[#D4AF37]/60 bg-gradient-to-b from-[#181611] via-[#141414] to-[#101010]'
                      : 'border-[#262626]/80 bg-[#161616]/40 hover:border-[#383838]'
                  }`}
                >
                  {/* Crisp top accent line on hovered item */}
                  <div
                    className={`absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent transition-opacity duration-300 ${
                      isItemHovered ? 'opacity-100' : 'opacity-0'
                    }`}
                  />

                  <div className="relative z-10">
                    {/* Header: Icon in crisp border badge + Title */}
                    <div className="mb-4 flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                          isItemHovered
                            ? 'bg-[#D4AF37]/15 border border-[#D4AF37] text-[#F2D98D]'
                            : 'bg-[#1c1c1c] border border-[#2a2a2a] text-[#D4AF37]'
                        }`}
                      >
                        <Icon className="w-5 h-5 transition-transform duration-300" />
                      </div>
                      <h3
                        className={`text-xl font-bold tracking-tight transition-colors duration-300 ${
                          isItemHovered ? 'text-[#F2D98D]' : 'text-white'
                        }`}
                      >
                        {item.title}
                      </h3>
                    </div>

                    {/* Description text with crisp readability */}
                    <p
                      className={`text-sm leading-relaxed transition-colors duration-300 ${
                        isItemHovered ? 'text-[#e4e4e7]' : 'text-[#A1A1AA]'
                      }`}
                    >
                      {item.description}
                    </p>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CompanyIntro;
