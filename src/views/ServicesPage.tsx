'use client';

import React, { useState, useEffect } from 'react';
import { SectionHeader } from '../components/ui/SectionHeader';
import { CORE_SERVICES, Service, COMPANY_DATA } from '../data/content';
import { 
  Globe, 
  Layers, 
  Code2, 
  ArrowRight,
  Activity,
  Cpu,
  Server,
  Rocket
} from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Reveal } from '../components/motion/Reveal';
import { StaggerContainer, StaggerItem } from '../components/motion/StaggerContainer';
import { AnimatedButton } from '../components/motion/AnimatedButton';
import { ServiceShowcase } from '../components/services/ServiceShowcase';
import { ServiceDeliveryApproach } from '../components/services/ServiceDeliveryApproach';
import { SocialLinks } from '../components/social/SocialLinks';

interface ServicesPageProps {
  onOpenConsultation: (service?: Service) => void;
}

const ROTATING_TARGETS = [
  'SaaS & Enterprise',
  'Cloud & DevOps',
  'AI & Machine Learning',
  'Web & Mobile Platforms',
  'Enterprise ERP & CRM',
  'Mission-Critical Systems',
];

export const ServicesPage: React.FC<ServicesPageProps> = ({ onOpenConsultation }) => {
  const [rotatingIndex, setRotatingIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  // Cycle rotating terms every 3.2 seconds
  useEffect(() => {
    if (shouldReduceMotion) return;
    const interval = setInterval(() => {
      setRotatingIndex((prev) => (prev + 1) % ROTATING_TARGETS.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [shouldReduceMotion]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="bg-[#0a0a0a] pb-20">
      {/* Services Hero - Tightened Viewport */}
      <section className="relative pt-24 sm:pt-28 pb-8 sm:pb-10 flex flex-col justify-center border-b border-[#1f1f1f] overflow-hidden">
        {/* Locally-authored SVG artwork backdrop (ships with the repo, no external links) */}
        <img
          src="/bg-services-hero.svg?v=5"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-[88%_center] opacity-85 pointer-events-none select-none"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent pointer-events-none" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent pointer-events-none" aria-hidden="true" />
        <div className="absolute inset-0 hero-tech-grid opacity-15 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <Reveal>
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 mb-4 px-3.5 py-1.5 rounded-full bg-[#161616] border border-[#2a2a2a]">
                <span className="w-2 h-2 rounded-full bg-[#c9a84c] animate-pulse" />
                <span className="text-xs font-bold tracking-widest text-[#DFC067] uppercase select-none font-mono">
                  Enterprise Software Architecture & Web Engineering
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-[1.2] mb-5">
                Software Engineering Services for{' '}
                <span className="inline-block relative overflow-hidden align-baseline">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={ROTATING_TARGETS[rotatingIndex]}
                      initial={shouldReduceMotion ? undefined : { opacity: 0, y: '65%' }}
                      animate={{ opacity: 1, y: '0%' }}
                      exit={shouldReduceMotion ? undefined : { opacity: 0, y: '-65%' }}
                      transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                      className="inline-block text-[#c9a84c]"
                    >
                      {ROTATING_TARGETS[rotatingIndex]}
                    </motion.span>
                  </AnimatePresence>
                </span>
              </h1>

              <p className="text-base sm:text-lg text-[#a1a1aa] leading-relaxed max-w-2xl text-balance">
                Explore VPD comprehensive digital engineering services, including custom software development, web and mobile applications, enterprise ERP and CRM solutions, AI and machine learning, cloud infrastructure, and UI/UX design. We focus on building reliable, scalable, and user-friendly digital solutions tailored to evolving business needs.
              </p>
            </div>
          </Reveal>

          {/* Quick Metrics Trust Bar */}
          <Reveal delay={0.15}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10 pt-8 border-t border-[#1c1c1c]">
              <div className="flex flex-col items-start">
                <span className="text-2xl sm:text-3xl font-black font-mono text-[#c9a84c]">
                  &lt; 100ms
                </span>
                <span className="text-xs font-semibold text-white mt-0.5">
                  Time to Interactive (TTI)
                </span>
                <span className="text-xs text-[#71717a]">
                  Core Web Vitals Pass
                </span>
              </div>

              <div className="flex flex-col items-start">
                <span className="text-2xl sm:text-3xl font-black font-mono text-white">
                  99.99%
                </span>
                <span className="text-xs font-semibold text-white mt-0.5">
                  High-Availability Uptime
                </span>
                <span className="text-xs text-[#71717a]">
                  Enterprise SLA Guaranteed
                </span>
              </div>

              <div className="flex flex-col items-start">
                <span className="text-2xl sm:text-3xl font-black font-mono text-[#c9a84c]">
                  100%
                </span>
                <span className="text-xs font-semibold text-white mt-0.5">
                  IP & Code Ownership
                </span>
                <span className="text-xs text-[#71717a]">
                  Full Git Repository Transfer
                </span>
              </div>

              <div className="flex flex-col items-start">
                <span className="text-2xl sm:text-3xl font-black font-mono text-white">
                  Zero
                </span>
                <span className="text-xs font-semibold text-white mt-0.5">
                  Vendor Lock-In
                </span>
                <span className="text-xs text-[#71717a]">
                  Standard Docker & Cloud Stacks
                </span>
              </div>
            </div>
          </Reveal>

          {/* Interactive Page Anchor Jump Navigation */}
          <Reveal delay={0.25}>
            <div className="flex items-center gap-2 overflow-x-auto pb-2 mt-8 no-scrollbar">
              <button
                onClick={() => scrollToSection('core-services')}
                className="px-3.5 py-1.5 rounded-xl bg-[#141414] hover:bg-[#1a1a1a] border border-[#242424] text-xs font-medium text-[#cccccc] hover:text-white transition-colors shrink-0 cursor-pointer flex items-center gap-1.5"
              >
                <Layers className="w-3.5 h-3.5 text-[#c9a84c]" />
                <span>Service Blueprints</span>
              </button>

              <button
                onClick={() => scrollToSection('delivery-approach')}
                className="px-3.5 py-1.5 rounded-xl bg-[#141414] hover:bg-[#1a1a1a] border border-[#242424] text-xs font-medium text-[#cccccc] hover:text-white transition-colors shrink-0 cursor-pointer flex items-center gap-1.5"
              >
                <Rocket className="w-3.5 h-3.5 text-[#c9a84c]" />
                <span>Delivery Approach</span>
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 2. Core Engineering Capabilities Showcase */}
      <section id="core-services" className="pt-6 sm:pt-8 pb-8 sm:pb-12 border-t border-[#181818]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ServiceShowcase onOpenConsultation={(s) => onOpenConsultation(s)} />
        </div>
      </section>

      {/* 3. Our Delivery Approach (6-Stage Lifecycle) */}
      <section id="delivery-approach" className="py-12 sm:py-16 border-t border-[#1c1c1c]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <ServiceDeliveryApproach
              onOpenConsultation={() => onOpenConsultation()}
            />
          </Reveal>
        </div>
      </section>

      {/* Bottom Conversion Call-To-Action Banner */}
      <section className="py-16 sm:py-24 border-t border-[#1c1c1c] bg-[#0c0c0c] relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#c9a84c]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <Reveal>
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-[#161616] border border-[#2a2a2a]">
              <span className="w-2 h-2 rounded-full bg-[#c9a84c]" />
              <span className="text-xs font-mono font-bold text-[#c9a84c] uppercase">
                Zero-Obligation Architecture Review
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-5">
              Ready to Architect Your Next Production System?
            </h2>

            <p className="text-base sm:text-lg text-[#a1a1aa] mb-10 max-w-2xl mx-auto leading-relaxed">
              Schedule a technical discovery session with our senior engineering squad. We evaluate your requirements, benchmark performance constraints, and deliver an actionable architectural blueprint within 48 hours.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <AnimatedButton
                onClick={() => onOpenConsultation()}
                variant="primary"
                size="lg"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Schedule Free Technical Consultation
              </AnimatedButton>

              <a
                href={COMPANY_DATA.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-white bg-[#141414] hover:bg-[#1a1a1a] border border-[#282828] hover:border-[#22c55e]/50 rounded-xl transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#22c55e]"
              >
                <span>Chat with Architect on WhatsApp</span>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Fixed social rail (desktop) / share dock (mobile & tablet) */}
      <SocialLinks />
    </div>
  );
};
