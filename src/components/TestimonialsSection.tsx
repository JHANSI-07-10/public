'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { VERIFIED_TESTIMONIALS } from '../data/content';
import { SectionHeader } from './ui/SectionHeader';
import { Reveal } from './motion/Reveal';
import { InteractiveCard } from './motion/InteractiveCard';
import { motionTokens } from './motion/motionTokens';

const AUTO_SCROLL_INTERVAL = 4500;
const RESUME_DELAY = 6000;

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const shouldReduceMotion = useReducedMotion();

  // Auto-scroll: running unless the user is interacting (hover / touch / manual nav)
  const [isPaused, setIsPaused] = useState(false);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearResumeTimer = () => {
    if (resumeTimerRef.current) {
      clearTimeout(resumeTimerRef.current);
      resumeTimerRef.current = null;
    }
  };

  const pauseAutoScroll = useCallback(() => {
    clearResumeTimer();
    setIsPaused(true);
  }, []);

  const scheduleResume = useCallback(() => {
    clearResumeTimer();
    resumeTimerRef.current = setTimeout(() => setIsPaused(false), RESUME_DELAY);
  }, []);

  useEffect(() => () => clearResumeTimer(), []);

  // Auto-advance until paused (respects reduced motion)
  useEffect(() => {
    if (isPaused || shouldReduceMotion) return;
    const timer = setInterval(() => {
      setCurrentIndex((idx) => (idx + 1) % VERIFIED_TESTIMONIALS.length);
    }, AUTO_SCROLL_INTERVAL);
    return () => clearInterval(timer);
  }, [isPaused, shouldReduceMotion]);

  const goTo = (idx: number) => {
    setCurrentIndex(idx);
    // Manual navigation pauses the ticker, then resumes after idle
    setIsPaused(true);
    scheduleResume();
  };

  const prev = () => goTo((currentIndex - 1 + VERIFIED_TESTIMONIALS.length) % VERIFIED_TESTIMONIALS.length);

  const next = () => goTo((currentIndex + 1) % VERIFIED_TESTIMONIALS.length);

  return (
    <section id="testimonials" className="py-24 bg-[#0d0d0d]/25 backdrop-blur-[1px] border-t border-[#1f1f1f]/50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading & Controls */}
        <Reveal>
          <div className="flex flex-col items-center mb-16 gap-6">
            <SectionHeader
              eyebrow="Executive Endorsements"
              title="What Leaders Say About Working With Us"
              align="center"
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
        <div
          className="relative"
          onMouseEnter={pauseAutoScroll}
          onMouseLeave={scheduleResume}
          onTouchStart={pauseAutoScroll}
          onTouchEnd={scheduleResume}
          onFocusCapture={pauseAutoScroll}
          onBlurCapture={scheduleResume}
        >
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
              className="relative mx-auto grid max-w-3xl grid-cols-1 [grid-template-areas:'stack'] px-1 pb-16"
            >
              {[0, 1, 2].map((offset) => {
                const index = (currentIndex + offset) % VERIFIED_TESTIMONIALS.length;
                const item = VERIFIED_TESTIMONIALS[index];
                const stackPosition = [
                  '',
                  'translate-x-5 translate-y-7 sm:translate-x-8 sm:translate-y-8',
                  'translate-x-10 translate-y-14 sm:translate-x-16 sm:translate-y-16',
                ][offset];
                const cardWidth = offset === 0 ? 'w-full' : 'w-[calc(100%-2.5rem)] sm:w-[calc(100%-4rem)]';
                const isHighlighted = offset === 0 || hoveredCard === offset;

                return (
                  <motion.div
                    key={item.id}
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={shouldReduceMotion ? undefined : { y: -32, x: -8 }}
                    transition={{ duration: 0.45, delay: offset * 0.08, ease: motionTokens.ease.snappy }}
                    onHoverStart={() => setHoveredCard(offset)}
                    onHoverEnd={() => setHoveredCard(null)}
                    onFocus={() => setHoveredCard(offset)}
                    onBlur={() => setHoveredCard(null)}
                    style={{ zIndex: hoveredCard === offset ? 10 : 3 - offset }}
                    className={`[grid-area:stack] ${cardWidth} ${stackPosition} transition-[filter,opacity] duration-700 ${
                      isHighlighted ? 'grayscale-0 opacity-100' : 'grayscale opacity-75 hover:grayscale-0 hover:opacity-100'
                    }`}
                  >
                    <InteractiveCard
                      variant="card"
                      padding="lg"
                      hoverable={false}
                      className="flex min-h-[300px] flex-col justify-between border-[#2a2a2a] bg-[linear-gradient(145deg,#1b1b1b_0%,#111111_72%)] shadow-[0_24px_60px_-28px_rgba(0,0,0,0.95)]"
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
                    <p className="text-sm sm:text-base text-[#aaaaaa] leading-relaxed mb-8 italic">
                      &ldquo;{item.content}&rdquo;
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
                      <div className="text-xs text-[#777777] font-medium">
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
              onClick={() => goTo(idx)}
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
