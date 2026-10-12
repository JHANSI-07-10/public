'use client';

import React from 'react';
import { ArrowRight, CheckCircle2, ChevronRight } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { KEY_METRICS, COMPANY_DATA } from '../data/content';
import { AnimatedButton } from './motion/AnimatedButton';
import { motionTokens } from './motion/motionTokens';
import { HeroVideoBackground } from './ui/HeroVideoBackground';
import { CountingNumber } from './ui/counting-number';
import { WordMaskReveal } from './motion/WordMaskReveal';

interface HeroProps {
  onOpenConsultation: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenConsultation }) => {
  const shouldReduceMotion = useReducedMotion();

  const itemTransition = (delay: number) => ({
    duration: shouldReduceMotion ? 0.001 : motionTokens.duration.normal,
    delay: shouldReduceMotion ? 0 : delay,
    ease: motionTokens.ease.snappy,
  });

  return (
    <section id="hero" className="relative pt-16 sm:pt-20 lg:pt-24 pb-12 sm:pb-16 lg:pb-18 overflow-hidden bg-[#0A0A0A]">
      {/* Ambient Video Background — blended into the dark bg: vivid on the right, scrimmed on the left for text clarity */}
      <HeroVideoBackground />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Hero Composition */}
        <div className="max-w-3xl flex flex-col items-start text-left pt-0 sm:pt-1">
            {/* Category Eyebrow Badge */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={itemTransition(0.04)}
              className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-[#171717] border border-[#2A2A2A] shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
              <span className="text-xs font-bold tracking-widest text-[#DFC067] uppercase select-none">
                Enterprise Software Architecture & Web Engineering
              </span>
            </motion.div>

            {/* H1 Headline */}
            <motion.h1
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={itemTransition(0.12)}
              className="text-4xl sm:text-5xl lg:text-[3.25rem] xl:text-[3.85rem] font-black tracking-tight text-white leading-[1.08] text-balance mb-6"
            >
              <WordMaskReveal
                text="We Engineer the Digital Core for Industry Leaders."
                delay={0.18}
                stagger={0.05}
                highlightWords={['Digital', 'Core']}
                highlightClassName="text-[#D4AF37] drop-shadow-[0_0_24px_rgba(212,175,55,0.22)]"
              />
            </motion.h1>

            {/* Supporting Value Proposition */}
            <motion.p
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={itemTransition(0.2)}
              className="text-base sm:text-lg text-[#A1A1AA] leading-relaxed max-w-2xl mb-8 text-balance"
            >
              {COMPANY_DATA.mission} We connect mission-critical system stability with intuitive, conversion-focused user interfaces to accelerate business momentum.
            </motion.p>

            {/* Action Group */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={itemTransition(0.28)}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-10"
            >
              <AnimatedButton
                onClick={onOpenConsultation}
                variant="primary"
                size="lg"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Book Free Consultation
              </AnimatedButton>

              <a
                href="#case-studies"
                className="min-h-[48px] inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-[#141414] hover:bg-[#1D1D1D] border border-[#2A2A2A] hover:border-[#D4AF37]/50 active:scale-[0.98] transition-all duration-200 rounded-xl whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
              >
                <span>Explore Case Studies</span>
                <ChevronRight className="w-4 h-4 text-[#A1A1AA]" />
              </a>
            </motion.div>

            {/* Micro Value Indicators */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={itemTransition(0.35)}
              className="flex flex-wrap items-center gap-y-2 gap-x-5 text-xs text-[#71717A] font-medium pt-5 border-t border-[#222222] w-full max-w-xl"
            >
              <span className="flex items-center gap-1.5 text-[#A1A1AA]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                Zero-obligation architectural audit
              </span>
              <span className="hidden sm:inline text-[#333333]" aria-hidden="true">·</span>
              <span className="flex items-center gap-1.5 text-[#A1A1AA]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                Full-stack Java & React mastery
              </span>
              <span className="hidden sm:inline text-[#333333]" aria-hidden="true">·</span>
              <span className="flex items-center gap-1.5 text-[#A1A1AA]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                Direct founder-level oversight
              </span>
            </motion.div>
        </div>

        {/* 4-Metric Trust Bar (Full width strip below Hero) */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={itemTransition(0.42)}
          className="mt-14 sm:mt-16 pt-8 sm:pt-10 border-t border-[#1F1F1F]"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {KEY_METRICS.map((metric, idx) => (
              <motion.div
                key={idx}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: 'easeOut' }}
                className="flex flex-col items-start text-left"
              >
                <div className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-1 tabular-nums">
                  <span className="text-[#D4AF37]">
                    <CountingNumber value={metric.value} delay={0.5 + idx * 0.12} duration={1.4} />
                  </span>
                </div>
                <div className="text-sm font-semibold text-white">
                  {metric.label}
                </div>
                <div className="text-xs text-[#71717A] mt-0.5">
                  {metric.context}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
