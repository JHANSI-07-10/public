'use client';

import React from 'react';
import { ArrowRight, CheckCircle2, ChevronRight } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { KEY_METRICS, COMPANY_DATA } from '../data/content';
import { AnimatedButton } from './motion/AnimatedButton';
import { motionTokens } from './motion/motionTokens';
import { CountingNumber } from './ui/counting-number';
import { WordMaskReveal } from './motion/WordMaskReveal';
import { HeroVideoBackground } from './ui/HeroVideoBackground';

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
    <section id="hero" className="relative pt-16 sm:pt-20 lg:pt-24 pb-8 sm:pb-10 lg:pb-12 overflow-hidden bg-[#060606]">
      {/* Background Video with seamless feathered bottom blend (hidden on mobile view) */}
      <HeroVideoBackground className="hidden md:block" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Hero Composition */}
        <div className="max-w-3xl flex flex-col items-start text-left pt-12 sm:pt-14">

          {/* Eyebrow badge */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={itemTransition(0.08)}
            className="inline-flex items-center gap-2 mb-4 px-3.5 py-1.5 rounded-full bg-[#161616]/90 border border-[#c9a84c]/30 shadow-md backdrop-blur-md"
          >
            <span className="w-2 h-2 rounded-full bg-[#c9a84c] animate-pulse" />
            <span className="text-xs font-mono font-bold tracking-widest text-[#DFC067] uppercase select-none">
              {COMPANY_DATA.brandLine} · Kurnool, Andhra Pradesh
            </span>
          </motion.div>

          {/* H1 Headline */}
          <motion.h1
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={itemTransition(0.12)}
            className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-black tracking-tight text-white leading-[1.08] text-balance mb-6"
          >
            <WordMaskReveal
              text="Transforming Ideas into Intelligent Digital Solutions."
              delay={0.18}
              stagger={0.05}
              highlightWords={['Intelligent', 'Digital', 'Solutions.']}
              highlightClassName="text-[#c9a84c] drop-shadow-[0_0_24px_rgba(201,168,76,0.22)]"
            />
          </motion.h1>

          {/* Supporting Value Proposition */}
          <motion.p
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={itemTransition(0.2)}
            className="text-base sm:text-lg text-[#aaaaaa] leading-relaxed max-w-2xl mb-8 text-balance"
          >
            VPD Technologies builds software products, enterprise applications, and digital solutions that help organizations modernize operations and support business growth.
          </motion.p>

          {/* Action Group */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={itemTransition(0.28)}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-10"
          >
            <a href="/services">
              <AnimatedButton
                variant="primary"
                size="lg"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Explore Our Services
              </AnimatedButton>
            </a>

            <button
              type="button"
              onClick={onOpenConsultation}
              className="vpd-outline-cta inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-[#2a2a2a] bg-[#161616] px-6 text-xs font-bold tracking-wide text-white transition-colors hover:border-[#c9a84c]/50 hover:bg-[#1e1e1e] focus:outline-none sm:text-sm cursor-pointer"
            >
              <span>Contact Us</span>
              <ChevronRight className="w-4 h-4 text-[#aaaaaa]" />
            </button>
          </motion.div>

          {/* Micro Value Indicators */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={itemTransition(0.35)}
            className="flex flex-wrap items-center gap-y-2 gap-x-5 text-xs text-[#777777] font-medium pt-5 border-t border-[#222222] w-full max-w-xl"
          >
            <span className="flex items-center gap-1.5 text-[#aaaaaa]">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#c9a84c]" />
              110+ Completed Projects
            </span>
            <span className="hidden sm:inline text-[#777777]" aria-hidden="true">·</span>
            <span className="flex items-center gap-1.5 text-[#aaaaaa]">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#c9a84c]" />
              Kurnool, Andhra Pradesh
            </span>
            <span className="hidden sm:inline text-[#777777]" aria-hidden="true">·</span>
            <span className="flex items-center gap-1.5 text-[#aaaaaa]">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#c9a84c]" />
              Direct Founder Governance
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
                className="flex flex-col items-center text-center"
              >
                <div className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-1 tabular-nums">
                  <span className="text-[#c9a84c]">
                    <CountingNumber value={metric.value} delay={0.5 + idx * 0.12} duration={1.4} />
                  </span>
                </div>
                <div className="text-sm font-semibold text-white">
                  {metric.label}
                </div>
                <div className="text-xs text-[#777777] mt-0.5">
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
