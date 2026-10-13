'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { HoverRevealCards, CardItem } from './ui/cards';
import { Reveal } from './motion/Reveal';

interface WhatWeEngineerProps {
  onOpenConsultation?: () => void;
}

const CAPABILITY_CARDS: CardItem[] = [
  {
    id: 'web-experiences',
    title: 'Web Experiences',
    description:
      'Responsive, accessible websites designed to deliver clear user experiences and support business goals.',
    image: '/images/what-we-engineer/web-experiences-v2.webp',
  },
  {
    id: 'business-applications',
    title: 'Business Applications',
    description:
      'Purpose-built web applications that connect users, data, and business workflows in one cohesive experience.',
    image: '/images/what-we-engineer/business-applications-v2.webp',
  },
  {
    id: 'full-stack-systems',
    title: 'Full-Stack Systems',
    description:
      'Integrated frontend, backend, API, and database engineering for reliable digital products.',
    image: '/images/what-we-engineer/full-stack-systems-v2.webp',
  },
  {
    id: 'custom-software',
    title: 'Custom Software',
    description:
      'Software solutions tailored to specific operational requirements, integrations, and business processes.',
    image: '/images/what-we-engineer/custom-software-v2.webp',
  },
];

export const WhatWeEngineer: React.FC<WhatWeEngineerProps> = ({ onOpenConsultation }) => {
  return (
    <section
      id="what-we-engineer"
      className="relative bg-[#181818] pt-20 sm:pt-24 lg:pt-28 pb-20 sm:pb-24 lg:pb-28 overflow-hidden border-t border-[#2a2a2a]"
      aria-label="What We Engineer"
    >
      {/* Subtle Radial Glow Separation from Hero */}
      <div
        className="absolute top-0 inset-x-0 h-40 pointer-events-none opacity-25"
        style={{
          background:
            'radial-gradient(ellipse 60% 100% at 50% 0%, rgba(212, 175, 55, 0.14) 0%, transparent 80%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <Reveal>
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <span className="text-xs font-bold tracking-[0.2em] text-[#D4AF37] uppercase select-none mb-3.5">
              WHAT WE ENGINEER
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.15] text-balance mb-4">
              Engineering Digital Solutions That{' '}
              <span className="text-[#D4AF37]">Move Business Forward</span>.
            </h2>
            <p className="text-base sm:text-lg text-[#A1A1AA] leading-relaxed text-balance max-w-2xl">
              From engaging web experiences to integrated business systems, we engineer digital
              solutions designed around real business needs.
            </p>
          </div>
        </Reveal>

        {/* 4-Card Capability Showcase with HoverRevealCards */}
        <div className="mb-14 sm:mb-16">
          <HoverRevealCards
            items={CAPABILITY_CARDS}
            gridClassName="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6"
            cardBg="bg-[#303030]"
            borderColor="border-[#494949]"
            hoverBorderColor="hover:border-[#D4AF37] focus-within:border-[#D4AF37]"
            heightClass="h-[400px] sm:h-[420px] lg:h-[440px]"
          />
        </div>

        {/* Closing CTA */}
        <Reveal delay={0.15}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center sm:text-left bg-[#242424] border border-[#383838] rounded-2xl px-6 py-5 sm:px-8 sm:py-6 max-w-2xl mx-auto shadow-xl">
            <p className="text-sm sm:text-base text-[#A1A1AA] font-medium">
              Have a project in mind? Let&apos;s discuss the right solution.
            </p>
            {onOpenConsultation ? (
              <button
                type="button"
                onClick={onOpenConsultation}
                className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-xl bg-[#D4AF37] hover:bg-[#E5C15D] text-black px-5 py-2.5 text-xs sm:text-sm font-bold tracking-wide transition-all duration-200 shadow-md hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] cursor-pointer"
              >
                <span>Let&apos;s Talk</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            ) : (
              <Link
                href="/contact"
                className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-xl bg-[#D4AF37] hover:bg-[#E5C15D] text-black px-5 py-2.5 text-xs sm:text-sm font-bold tracking-wide transition-all duration-200 shadow-md hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
              >
                <span>Let&apos;s Talk</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default WhatWeEngineer;
