'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, ChevronRight } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { motionTokens } from './motion/motionTokens';
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
    <section
      id="hero"
      className="relative flex flex-col justify-center min-h-[560px] sm:min-h-[620px] lg:min-h-[700px] 2xl:min-h-[760px] max-h-[920px] xl:max-h-[960px] pt-24 sm:pt-28 md:pt-32 pb-14 sm:pb-18 md:pb-20 overflow-hidden bg-[#060606]"
    >
      {/* Background Video with seamless feathered bottom blend (hidden on mobile view) */}
      <HeroVideoBackground className="hidden md:block" />

      <div className="w-full max-w-[92vw] 2xl:max-w-[1680px] 3xl:max-w-[2100px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 relative z-10">
        {/* Hero Composition */}
        <div className="max-w-4xl 2xl:max-w-5xl 3xl:max-w-6xl flex flex-col items-start text-left pt-2 sm:pt-4">

          {/* H1 Headline */}
          <motion.h1
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={itemTransition(0.12)}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-[3.5rem] 2xl:text-[4rem] font-black tracking-tight text-white leading-[1.12] mb-6"
          >
            <span className="block">
              <WordMaskReveal
                text="Transforming Ideas into"
                delay={0.15}
                stagger={0.04}
              />
            </span>
            <span className="block">
              <WordMaskReveal
                text="Intelligent Digital Solutions."
                delay={0.3}
                stagger={0.04}
                highlightWords={['Intelligent', 'Digital', 'Solutions.']}
                highlightClassName="text-[#c9a84c] drop-shadow-[0_0_24px_rgba(201,168,76,0.22)]"
              />
            </span>
          </motion.h1>

          {/* Supporting Value Proposition */}
          <motion.p
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={itemTransition(0.2)}
            className="text-base sm:text-lg 2xl:text-xl text-[#aaaaaa] leading-relaxed max-w-xl 2xl:max-w-2xl mb-8 text-balance"
          >
            VPD builds software products, enterprise applications, and digital solutions that help organizations modernize operations and support business growth globally.
          </motion.p>

          {/* Action Group */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={itemTransition(0.28)}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-10"
          >
            <Link href="/services" className="inline-flex">
              <button
                type="button"
                className="group relative inline-flex min-h-[46px] items-center justify-center gap-2.5 rounded-xl border border-[#d4af37]/70 bg-[#141414] px-7 py-3 text-sm font-bold tracking-wide text-white shadow-[0_0_15px_rgba(212,175,55,0.12)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#d4af37] hover:bg-gradient-to-r hover:from-[#d4af37] hover:via-[#f2d36f] hover:to-[#c9a84c] hover:text-black hover:shadow-[0_0_25px_rgba(212,175,55,0.45)] cursor-pointer"
              >
                <span>Explore Our Services</span>
                <ArrowRight className="w-4 h-4 text-[#d4af37] transition-all duration-300 group-hover:translate-x-1.5 group-hover:text-black" />
              </button>
            </Link>

            <Link href="/contact" className="inline-flex">
              <button
                type="button"
                className="group relative inline-flex min-h-[46px] items-center justify-center gap-2.5 rounded-xl border border-[#383838] bg-[#161616] px-7 py-3 text-sm font-bold tracking-wide text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#d4af37]/80 hover:bg-[#201b10] hover:text-[#f2d36f] hover:shadow-[0_0_20px_rgba(212,175,55,0.25)] focus:outline-none cursor-pointer"
              >
                <span>Contact Us</span>
                <ChevronRight className="w-4 h-4 text-[#aaaaaa] transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#f2d36f]" />
              </button>
            </Link>
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
              55+ Completed Projects
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
      </div>
    </section>
  );
};
