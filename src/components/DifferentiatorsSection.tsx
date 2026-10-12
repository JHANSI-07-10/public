'use client';

import React from 'react';
import { DIFFERENTIATORS } from '../data/content';
import { SectionHeader } from './ui/SectionHeader';
import { Reveal } from './motion/Reveal';
import { StaggerContainer, StaggerItem } from './motion/StaggerContainer';
import { InteractiveCard } from './motion/InteractiveCard';
import { BorderTrace } from './motion/BorderTrace';

export const DifferentiatorsSection: React.FC = () => {
  return (
    <section id="capabilities" className="py-24 bg-[#0d0d0d] border-t border-[#1f1f1f] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <Reveal>
          <SectionHeader
            eyebrow="Engineering Capabilities & Standards"
            title="Why Growing Enterprises Partner with VPD Technologies."
            subtitle="We deliver full-lifecycle engineering excellence from day one. Every architectural decision is grounded in measurable velocity, resilience, and business growth."
          />
        </Reveal>

        {/* 6 Capabilities Editorial Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {DIFFERENTIATORS.map((item) => (
            <StaggerItem key={item.number}>
              <BorderTrace className="h-full" radius={16} duration={0.7}>
                <InteractiveCard
                  variant="card"
                  padding="lg"
                  className="flex flex-col justify-between h-full"
                >
                  <div>
                    <div className="text-sm font-mono font-bold text-[#c9a84c] mb-4">
                      {item.number}.
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[#aaaaaa] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </InteractiveCard>
              </BorderTrace>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};
