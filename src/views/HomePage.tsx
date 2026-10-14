'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { Hero } from '../components/Hero';
import { WhatWeEngineer } from '../components/WhatWeEngineer';
import { CompanyIntro } from '../components/CompanyIntro';
import { ServicesSection } from '../components/ServicesSection';
import { PlatformsPreviewSection } from '../components/PlatformsPreviewSection';
import { DeliveryApproachSection } from '../components/DeliveryApproachSection';
import { DifferentiatorsSection } from '../components/DifferentiatorsSection';
import { FeaturedProjects } from '../components/FeaturedProjects';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { ContactCTA } from '../components/ContactCTA';
import { Service } from '../data/content';

// Client-only dynamic import to ensure zero SSR canvas/prerender issues
const LuxuryGoldFlowBackground = dynamic(
  () => import('../components/background/LuxuryGoldFlowBackground'),
  { ssr: false }
);

interface HomePageProps {
  onOpenConsultation: (service?: Service) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenConsultation }) => {
  return (
    <div className="relative min-h-screen bg-[#060606]">
      {/* Complete Procedural Monochrome Sculptural Silk Background */}
      <LuxuryGoldFlowBackground intensity={1.35} />

      <div className="relative z-10">
        {/* Section 1: Hero */}
        <Hero onOpenConsultation={() => onOpenConsultation()} />

        {/* Section 2: What We Engineer */}
        <WhatWeEngineer onOpenConsultation={() => onOpenConsultation()} />

        {/* Section 3: Company Introduction & Founders Preview */}
        <CompanyIntro />

        {/* Section 4: Core Engineering Services */}
        <ServicesSection onSelectService={(service) => onOpenConsultation(service)} />

        {/* Section 5: Products & Platforms with Status Labels & Industries Preview */}
        <PlatformsPreviewSection />

        {/* Section 6: Delivery Approach */}
        <DeliveryApproachSection />

        {/* Section 7: Engineering Capabilities & Differentiators */}
        <DifferentiatorsSection />

        {/* Section 8: Approved Case Studies & Portfolio */}
        <FeaturedProjects onOpenConsultation={() => onOpenConsultation()} />

        {/* Section 9: Verified Client Testimonials */}
        <TestimonialsSection />

        {/* Section 10: Project Inquiry Banner & Form */}
        <ContactCTA onOpenConsultation={() => onOpenConsultation()} />
      </div>
    </div>
  );
};

export default HomePage;
