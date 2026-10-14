'use client';

import React from 'react';
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

interface HomePageProps {
  onOpenConsultation: (service?: Service) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenConsultation }) => {
  return (
    <>
      {/* Section 1: Hero with PRD Headline & Dual CTAs */}
      <Hero onOpenConsultation={() => onOpenConsultation()} />

      {/* Section 2: What We Engineer — Spotlight Cards */}
      <WhatWeEngineer onOpenConsultation={() => onOpenConsultation()} />

      {/* Section 3: Company Introduction & Founders Preview */}
      <CompanyIntro />

      {/* Section 4: Core Engineering Services */}
      <ServicesSection onSelectService={(service) => onOpenConsultation(service)} />

      {/* Section 5: Products & Platforms with Status Labels & Industries Preview */}
      <PlatformsPreviewSection />

      {/* Section 6: Delivery Approach (Design → Develop → Pilot → Scale → Support) */}
      <DeliveryApproachSection />

      {/* Section 7: Engineering Capabilities & Differentiators */}
      <DifferentiatorsSection />

      {/* Section 8: Approved Case Studies & Portfolio */}
      <FeaturedProjects onOpenConsultation={() => onOpenConsultation()} />

      {/* Section 9: Verified Client Testimonials */}
      <TestimonialsSection />

      {/* Section 10: Project Inquiry Banner & Form */}
      <ContactCTA onOpenConsultation={() => onOpenConsultation()} />
    </>
  );
};
