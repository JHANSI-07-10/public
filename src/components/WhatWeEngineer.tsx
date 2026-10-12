'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SectionHeader } from './ui/SectionHeader';
import { CardSpotlight } from './ui/card-spotlight';
import { Reveal } from './motion/Reveal';
import { StaggerContainer, StaggerItem } from './motion/StaggerContainer';

const svgProps = {
  viewBox: '0 0 96 72',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg',
  className: 'h-auto w-full max-w-[104px]',
  'aria-hidden': true,
  focusable: 'false' as const,
};

const WebExperiencesVisual = () => (
  <svg {...svgProps}>
    <rect x="6" y="6" width="84" height="60" rx="6" fill="#171717" stroke="#2A2A2A" />
    <path d="M6 20 H90" stroke="#2A2A2A" />
    <circle cx="14" cy="13" r="2" fill="#D4AF37" />
    <circle cx="21" cy="13" r="2" fill="#3A3A3A" />
    <circle cx="28" cy="13" r="2" fill="#3A3A3A" />
    <rect x="14" y="28" width="32" height="3" rx="1.5" fill="#FFFFFF" opacity="0.85" />
    <rect x="14" y="37" width="22" height="3" rx="1.5" fill="#A1A1AA" opacity="0.45" />
    <rect x="14" y="46" width="28" height="3" rx="1.5" fill="#A1A1AA" opacity="0.3" />
    <rect x="58" y="28" width="24" height="28" rx="3" fill="#1D1D1D" stroke="#2A2A2A" />
    <rect x="63" y="35" width="14" height="2.5" rx="1.25" fill="#D4AF37" />
    <rect x="63" y="42" width="14" height="2.5" rx="1.25" fill="#D4AF37" opacity="0.55" />
    <rect x="63" y="49" width="9" height="2.5" rx="1.25" fill="#D4AF37" opacity="0.3" />
  </svg>
);

const ApplicationEngineeringVisual = () => (
  <svg {...svgProps}>
    <rect x="6" y="18" width="54" height="46" rx="5" fill="#171717" stroke="#2A2A2A" />
    <rect x="16" y="12" width="58" height="46" rx="5" fill="#1D1D1D" stroke="#2A2A2A" />
    <rect x="26" y="6" width="62" height="46" rx="5" fill="#222222" stroke="#D4AF37" strokeOpacity="0.4" />
    <rect x="33" y="14" width="30" height="3" rx="1.5" fill="#FFFFFF" opacity="0.7" />
    <rect x="33" y="22" width="20" height="3" rx="1.5" fill="#A1A1AA" opacity="0.4" />
    <rect x="33" y="30" width="24" height="3" rx="1.5" fill="#A1A1AA" opacity="0.28" />
    <rect x="33" y="38" width="14" height="3" rx="1.5" fill="#A1A1AA" opacity="0.2" />
    <path d="M48 52 H78" stroke="#D4AF37" strokeOpacity="0.6" />
    <circle cx="48" cy="52" r="2" fill="#D4AF37" />
    <circle cx="78" cy="52" r="2" fill="#D4AF37" />
    <path d="M14 40 V54" stroke="#D4AF37" strokeOpacity="0.4" />
  </svg>
);

const FullStackVisual = () => (
  <svg {...svgProps}>
    <rect x="24" y="5" width="48" height="14" rx="3" fill="#171717" stroke="#2A2A2A" />
    <rect x="38" y="10" width="20" height="3.5" rx="1.75" fill="#FFFFFF" opacity="0.8" />
    <rect x="16" y="29" width="64" height="14" rx="3" fill="#1D1D1D" stroke="#D4AF37" strokeOpacity="0.45" />
    <rect x="34" y="34" width="28" height="3.5" rx="1.75" fill="#D4AF37" opacity="0.9" />
    <ellipse cx="48" cy="54" rx="22" ry="6" fill="#171717" stroke="#2A2A2A" />
    <path d="M26 54 v8 a22 6 0 0 0 44 0 v-8" fill="#171717" stroke="#2A2A2A" />
    <path d="M48 19 V29" stroke="#D4AF37" strokeOpacity="0.6" />
    <circle cx="48" cy="24" r="1.5" fill="#D4AF37" />
    <path d="M48 43 V48" stroke="#D4AF37" strokeOpacity="0.6" />
    <circle cx="48" cy="47" r="1.5" fill="#D4AF37" />
  </svg>
);

const CustomSoftwareVisual = () => (
  <svg {...svgProps}>
    <rect x="10" y="10" width="28" height="17" rx="3" fill="#171717" stroke="#2A2A2A" />
    <rect x="58" y="10" width="28" height="17" rx="3" fill="#171717" stroke="#2A2A2A" />
    <rect x="10" y="45" width="28" height="17" rx="3" fill="#1D1D1D" stroke="#2A2A2A" />
    <rect x="58" y="45" width="28" height="17" rx="3" fill="#1D1D1D" stroke="#D4AF37" strokeOpacity="0.45" />
    <rect x="16" y="17" width="12" height="2.5" rx="1.25" fill="#FFFFFF" opacity="0.6" />
    <rect x="64" y="17" width="12" height="2.5" rx="1.25" fill="#FFFFFF" opacity="0.6" />
    <rect x="16" y="52" width="12" height="2.5" rx="1.25" fill="#FFFFFF" opacity="0.45" />
    <rect x="64" y="52" width="12" height="2.5" rx="1.25" fill="#D4AF37" opacity="0.8" />
    <path d="M38 18 H58 M38 53 H58 M24 27 V45 M72 27 V45" stroke="#D4AF37" strokeOpacity="0.45" />
    <circle cx="48" cy="18" r="2" fill="#D4AF37" />
    <circle cx="48" cy="53" r="2" fill="#D4AF37" />
    <circle cx="24" cy="36" r="2" fill="#D4AF37" />
    <circle cx="72" cy="36" r="2" fill="#D4AF37" />
  </svg>
);

const CARDS = [
  {
    title: 'Web Experiences',
    description: 'High-quality, responsive websites that communicate your brand and turn complex ideas into clear digital experiences.',
    visual: <WebExperiencesVisual />,
  },
  {
    title: 'Application Engineering',
    description: 'Purpose-built web applications that help businesses streamline workflows, connect systems, and deliver useful functionality.',
    visual: <ApplicationEngineeringVisual />,
  },
  {
    title: 'Full-Stack Development',
    description: 'Reliable frontend and backend engineering for connected, maintainable, and scalable software solutions.',
    visual: <FullStackVisual />,
  },
  {
    title: 'Custom Software',
    description: 'Software solutions shaped around your business requirements, technical constraints, and long-term goals.',
    visual: <CustomSoftwareVisual />,
  },
];

export const WhatWeEngineer: React.FC = () => {
  return (
    <section id="what-we-engineer" className="bg-[#111111] pt-16 sm:pt-20 lg:pt-24 pb-20 sm:pb-24 lg:pb-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeader
            align="center"
            eyebrow="Engineered for What's Next"
            title={
              <>
                What We <span className="text-[#D4AF37]">Engineer</span>
              </>
            }
            subtitle="From digital experiences to connected software systems, we engineer solutions designed around the way your business works."
          />
        </Reveal>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {CARDS.map((card) => (
            <StaggerItem key={card.title} distance={30} className="h-full">
              <CardSpotlight
                radius={280}
                color="#262114"
                className="p-6 sm:p-7 motion-safe:hover:scale-[1.02]"
              >
                <div className="flex h-full flex-col">
                  <div className="mb-6">{card.visual}</div>
                  <h3 className="text-lg font-bold text-white tracking-tight mb-3">{card.title}</h3>
                  <div className="mb-4 h-px w-8 bg-[#D4AF37]/50 transition-all duration-300 group-hover/spotlight:w-14 group-hover/spotlight:bg-[#D4AF37]/80" />
                  <p className="text-sm text-[#A1A1AA] leading-relaxed">{card.description}</p>
                </div>
              </CardSpotlight>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <Reveal delay={0.1}>
          <div className="mt-14 sm:mt-16 flex flex-col items-center gap-5 text-center">
            <p className="text-base sm:text-lg text-[#A1A1AA]">Have a project in mind?</p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 h-11 px-6 text-sm font-semibold bg-[#c9a84c] text-black hover:bg-[#d8b75b] rounded-xl shadow-lg shadow-[#c9a84c]/20 hover:shadow-[#c9a84c]/35 transition-all duration-200 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111111]"
            >
              <span>Let's Talk</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
