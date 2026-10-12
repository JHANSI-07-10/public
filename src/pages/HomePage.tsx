import React from 'react';
import { Hero } from '../components/Hero';
import { CompanyIntro } from '../components/CompanyIntro';
import { ServicesSection } from '../components/ServicesSection';
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
      {/* Section 1: Hero */}
      <Hero onOpenConsultation={() => onOpenConsultation()} />

      {/* Section 2: Company Introduction & Leadership */}
      <CompanyIntro />

      {/* Section 3: Core Engineering Services */}
      <ServicesSection onSelectService={(service) => onOpenConsultation(service)} />

      {/* Section 4: Engineering Capabilities & Differentiators */}
      <DifferentiatorsSection />

      {/* Section 5: Featured Real Projects */}
      <FeaturedProjects onOpenConsultation={() => onOpenConsultation()} />

      {/* Section 6: Verified Client Testimonials */}
      <TestimonialsSection />

      {/* Section 7: Project Inquiry Banner & Form */}
      <ContactCTA onOpenConsultation={() => onOpenConsultation()} />
    </>
  );
};
