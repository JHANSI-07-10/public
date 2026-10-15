'use client';

import React from 'react';
import { Hero } from '../components/Hero';
import { WhatWeEngineer } from '../components/WhatWeEngineer';
import { CompanyIntro } from '../components/CompanyIntro';
import { ServicesSection } from '../components/ServicesSection';
import { DeliveryApproachSection } from '../components/DeliveryApproachSection';
import { DifferentiatorsSection } from '../components/DifferentiatorsSection';
import { FeaturedProjects } from '../components/FeaturedProjects';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { ContactCTA } from '../components/ContactCTA';
import { SocialLinks } from '../components/social/SocialLinks';
import { Service } from '../data/content';
import { LuxuryGoldFlowBackground } from '../components/background/LuxuryGoldFlowBackground';

interface HomePageProps {
  onOpenConsultation: (service?: Service) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenConsultation }) => {
  return (
    <div className="relative min-h-screen bg-[#060606]">
      {/* Complete Procedural Monochrome Sculptural Silk Background */}
      <LuxuryGoldFlowBackground intensity={0.9} />

      <div className="relative z-10">
        {/* Section 1: Hero */}
        <Hero onOpenConsultation={() => onOpenConsultation()} />

        {/* Section 2: What We Engineer */}
        <WhatWeEngineer onOpenConsultation={() => onOpenConsultation()} />

        {/* Section 3: Company Introduction & Founders Preview */}
        <CompanyIntro />

        {/* Section 4: Core Engineering Services */}
        <ServicesSection onSelectService={(service) => onOpenConsultation(service)} />

        {/* Section 5: Delivery Approach */}
        <DeliveryApproachSection />

        {/* Section 6: Engineering Capabilities & Differentiators */}
        <DifferentiatorsSection />

        {/* Section 7: Approved Case Studies & Portfolio */}
        <FeaturedProjects onOpenConsultation={() => onOpenConsultation()} />

        {/* Section 8: Verified Client Testimonials */}
        <TestimonialsSection />

        {/* Section 9: Project Inquiry Banner & Form */}
        <ContactCTA onOpenConsultation={() => onOpenConsultation()} />
      </div>

      {/* Fixed social rail (desktop) / share dock (mobile & tablet) */}
      <SocialLinks />
    </div>
  );
};

export default HomePage;
