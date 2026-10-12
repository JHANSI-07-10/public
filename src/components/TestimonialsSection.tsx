'use client';

import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { VERIFIED_TESTIMONIALS } from '../data/content';
import { SectionHeader } from './ui/SectionHeader';
import { Reveal } from './motion/Reveal';
import { InteractiveCard } from './motion/InteractiveCard';
import { motionTokens } from './motion/motionTokens';

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  const prev = () => {
    setCurrentIndex((prevIdx) => (prevIdx === 0 ? VERIFIED_TESTIMONIALS.length - 1 : prevIdx - 1));
  };

  const next = () => {
    setCurrentIndex((prevIdx) => (prevIdx === 0 ? VERIFIED_TESTIMONIALS.length - 1 : (prevIdx + 1) % VERIFIED_TESTIMONIALS.length));
  };

  return (
    <section id="testimonials" className="py-24 bg-[#0d0d0d] border-t border-[#1f1f1f] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading & Controls */}
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <SectionHeader
              eyebrow="Executive Endorsements"
              title="Trusted by Founders, CTOs, and Product Leaders."
              className="mb-0"
            />

            {/* Navigation Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={prev}
                className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl bg-[#161616] border border-[#2a2a2a] text-[#aaaaaa] hover:text-white hover:border-[#c9a84c]/50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c] cursor-pointer"
                aria-label="Previous Testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={next}
                className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl bg-[#161616] border border-[#2a2a2a] text-[#aaaaaa] hover:text-white hover:border-[#c9a84c]/50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c] cursor-pointer"
                aria-label="Next Testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </Reveal>

        {/* Carousel / Grid Display with short restrained transition */}
        <div className="relative">
          {/* Ambient gold glow pulsing softly behind the carousel */}
          {!shouldReduceMotion && (
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 h-[320px] w-[70%] max-w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c9a84c]/[0.07] blur-3xl"
              animate={{ opacity: [0.4, 0.95, 0.4], scale: [0.95, 1.06, 0.95] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          )}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={shouldReduceMotion ? undefined : { opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={shouldReduceMotion ? undefined : { opacity: 0, x: -12 }}
              transition={{ duration: motionTokens.duration.fast, ease: motionTokens.ease.snappy }}
              className="relative grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {[0, 1, 2].map((offset) => {
                const index = (currentIndex + offset) % VERIFIED_TESTIMONIALS.length;
                const item = VERIFIED_TESTIMONIALS[index];

                return (
                  <motion.div
                    key={item.id}
                    initial={shouldReduceMotion ? false : { opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: offset * 0.1, ease: 'easeOut' }}
                    className="h-full"
                  >
                    <InteractiveCard
                      variant="card"
                      padding="lg"
                      className="flex flex-col justify-between h-full"
                    >
                  <div>
                    {/* Rating Stars & Quote Icon */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-1">
                        {[...Array(item.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-[#c9a84c] text-[#c9a84c]" />
                        ))}
                      </div>
                      <Quote className="w-6 h-6 text-[#2a2a2a]" />
                    </div>

                    {/* Testimonial Quote */}
                    <p className="text-sm sm:text-base text-[#cccccc] leading-relaxed mb-8 italic">
                      "{item.content}"
                    </p>
                  </div>

                  {/* Client Profile */}
                  <div className="pt-6 border-t border-[#222222] flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#1e1e1e] border border-[#c9a84c]/30 flex items-center justify-center font-bold text-xs text-[#c9a84c]">
                      {item.clientName.charAt(0)}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white leading-tight">
                        {item.clientName}
                      </div>
                      <div className="text-xs text-[#888888] font-medium">
                        {item.clientRole} · <span className="text-[#c9a84c]">{item.company}</span>
                      </div>
                    </div>
                  </div>
                    </InteractiveCard>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Indicator dots for position */}
        <div className="flex items-center justify-center gap-2 mt-10">
          {VERIFIED_TESTIMONIALS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1.5 rounded-full transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c] cursor-pointer ${
                currentIndex === idx ? 'w-8 bg-[#c9a84c]' : 'w-2 bg-[#2a2a2a] hover:bg-[#444444]'
              }`}
              aria-label={`Go to testimonial ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
