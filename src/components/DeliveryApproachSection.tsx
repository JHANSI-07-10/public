'use client';

import React, { useRef, useState } from 'react';
import { Workflow } from 'lucide-react';
import { useScroll, useMotionValueEvent } from 'motion/react';
import { DELIVERY_METHODOLOGY } from '../data/content';
import { Reveal } from './motion/Reveal';
import { DeliveryWheel } from './delivery/DeliveryWheel';

export const DeliveryApproachSection: React.FC = () => {
  const [selected, setSelected] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const isClickScrollingRef = useRef(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (isClickScrollingRef.current) return;
    const stageCount = DELIVERY_METHODOLOGY.length;
    // Map progress (0 to 1) into stage index (0 to 4)
    const clamped = Math.max(0, Math.min(0.999, latest));
    const newIndex = Math.floor(clamped * stageCount);
    setSelected(newIndex);
  });

  const handleSelectStage = (index: number) => {
    setSelected(index);
    if (!sectionRef.current) return;

    const rect = sectionRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const sectionTop = rect.top + scrollTop;
    const scrollDistance = sectionRef.current.offsetHeight - window.innerHeight;

    if (scrollDistance > 0) {
      const stageCount = DELIVERY_METHODOLOGY.length;
      const targetProgress = (index + 0.5) / stageCount;
      const targetScroll = sectionTop + targetProgress * scrollDistance;

      isClickScrollingRef.current = true;
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth',
      });

      setTimeout(() => {
        isClickScrollingRef.current = false;
      }, 700);
    }
  };

  return (
    <section
      id="delivery-approach"
      ref={sectionRef}
      className="relative bg-[#0c0c0c] border-t border-[#1f1f1f]/50"
      style={{ height: '300vh' }}
    >
      {/* Sticky viewport frame: remains pinned while user scrolls through all 5 stages */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center items-center overflow-hidden">
        {/* Background ambient radial glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full pointer-events-none opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(212, 175, 55, 0.12) 0%, transparent 70%)',
          }}
          aria-hidden="true"
        />

        <div className="w-full max-w-[92vw] 2xl:max-w-[1680px] 3xl:max-w-[2100px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 relative z-10 py-4 sm:py-6 flex flex-col justify-center">
          <Reveal>
            <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-6 sm:mb-8 lg:mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#161616] border border-[#D4AF37]/30 text-xs font-bold tracking-widest text-[#D4AF37] uppercase mb-2 sm:mb-3">
                <Workflow className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Structured Execution Discipline</span>
              </div>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.15] text-balance mb-2">
                Our Delivery Approach
              </h2>
              <p className="text-sm sm:text-lg lg:text-xl font-semibold text-[#D4AF37] text-balance mb-2">
                From Concept to Continuous Improvement
              </p>
              <p className="text-xs sm:text-sm lg:text-base text-[#A1A1AA] leading-relaxed text-balance max-w-2xl hidden sm:block">
                VPD follows a structured, measurable engineering lifecycle — five sequential stages with
                defined outputs, quality gates and governance at every step.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <DeliveryWheel
              stages={DELIVERY_METHODOLOGY}
              selectedIndex={selected}
              onSelectStage={handleSelectStage}
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
};

