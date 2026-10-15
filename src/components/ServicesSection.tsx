'use client';

import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { CORE_SERVICES, Service } from '../data/content';
import { SectionHeader } from './ui/SectionHeader';
import { Reveal } from './motion/Reveal';
import { StackedServiceDeck } from './services/StackedServiceDeck';
import { AnimatedButton } from './motion/AnimatedButton';

interface ServicesSectionProps {
  onSelectService: (service: Service) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeService = CORE_SERVICES[activeIndex];

  return (
    <section id="services" className="py-24 bg-[#0a0a0a]/25 backdrop-blur-[1px] border-t border-[#1f1f1f]/50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <Reveal>
          <div className="mb-14 sm:mb-16 flex w-full justify-center text-center">
            <SectionHeader
              eyebrow="Core Technical Offerings"
              title="Software Engineering Built for Uncompromising Scale."
              subtitle="Every solution is engineered with strict production protocols, hardened security standards, and predictable long-term maintainability."
              align="center"
              className="mx-auto mb-0 w-full items-center text-center"
            />
          </div>
        </Reveal>

        {/* Stacked-card service deck (scd-29 hover reveal) */}
        <Reveal delay={0.1}>
          <StackedServiceDeck
            services={CORE_SERVICES}
            activeIndex={activeIndex}
            onActiveChange={setActiveIndex}
          />
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mt-6 text-center text-[11px] font-mono tracking-wider text-[#666666] uppercase select-none">
            The deck flows continuously — hover a card to pause and read it
          </p>

          {/* Section-level consultation CTA — opens the modal pre-selected to the active service */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <p className="text-sm text-[#A1A1AA]">
              Discussing <span className="font-semibold text-white">{activeService.title}</span>?
            </p>
            <AnimatedButton
              onClick={() => onSelectService(activeService)}
              variant="primary"
              size="md"
              icon={<ArrowRight className="w-3.5 h-3.5" />}
            >
              Discuss Your Project
            </AnimatedButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default ServicesSection;
