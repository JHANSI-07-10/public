'use client';

import React, { useState } from 'react';
import { SectionHeader } from '../components/ui/SectionHeader';
import { CORE_SERVICES, Service, COMPANY_DATA } from '../data/content';
import { 
  Globe, 
  Layers, 
  Code2, 
  ArrowRight, 
  CheckCircle2, 
  MessageSquare,
  Calculator,
  Server,
  Rocket,
  HelpCircle,
  Shield,
  Zap,
  Activity,
  Cpu
} from 'lucide-react';
import { Reveal } from '../components/motion/Reveal';
import { StaggerContainer, StaggerItem } from '../components/motion/StaggerContainer';
import { AnimatedButton } from '../components/motion/AnimatedButton';
import { ServiceDetailedCard } from '../components/services/ServiceDetailedCard';
import { ServiceArchitectureVisualizer } from '../components/services/ServiceArchitectureVisualizer';
import { ServiceScopeCalculator } from '../components/services/ServiceScopeCalculator';
import { ServiceComparisonMatrix } from '../components/services/ServiceComparisonMatrix';
import { ServiceDeliveryProcess } from '../components/services/ServiceDeliveryProcess';
import { ServicesFAQ } from '../components/services/ServicesFAQ';

interface ServicesPageProps {
  onOpenConsultation: (service?: Service) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onOpenConsultation }) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filteredServices =
    activeFilter === 'all'
      ? CORE_SERVICES
      : CORE_SERVICES.filter((s) => s.id === activeFilter);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="pt-28 pb-20 bg-[#0a0a0a]">
      {/* Services Hero */}
      <section className="relative py-16 sm:py-24 border-b border-[#1f1f1f] overflow-hidden">
        {/* Locally-authored SVG artwork backdrop (ships with the repo, no external links) */}
        <img
          src="/bg-services-hero.svg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-[75%_center] opacity-55 pointer-events-none select-none"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/70 to-[#0a0a0a]/25 pointer-events-none" aria-hidden="true" />
        <div className="absolute inset-0 hero-tech-grid opacity-40 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal>
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 mb-4 px-3.5 py-1.5 rounded-full bg-[#161616] border border-[#2a2a2a]">
                <span className="w-2 h-2 rounded-full bg-[#c9a84c] animate-pulse" />
                <span className="text-xs font-bold tracking-widest text-[#DFC067] uppercase select-none font-mono">
                  Enterprise Software Architecture & Web Engineering
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-[1.1] text-balance mb-5">
                Software Engineering Services for <span className="text-[#c9a84c]">SaaS & Enterprise</span> Leaders.
              </h1>

              <p className="text-base sm:text-lg text-[#a1a1aa] leading-relaxed max-w-2xl text-balance">
                Explore VPD Technologies' engineering disciplines: custom SaaS development, enterprise Java backend solutions, and high-performance React frontends. Built for high-frequency workflows, durability, and conversion velocity.
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
                <span className="text-[11px] text-[#71717a]">
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
                <span className="text-[11px] text-[#71717a]">
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
                <span className="text-[11px] text-[#71717a]">
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
                <span className="text-[11px] text-[#71717a]">
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
                onClick={() => scrollToSection('architecture-visualizer')}
                className="px-3.5 py-1.5 rounded-xl bg-[#141414] hover:bg-[#1a1a1a] border border-[#242424] text-xs font-medium text-[#cccccc] hover:text-white transition-colors shrink-0 cursor-pointer flex items-center gap-1.5"
              >
                <Cpu className="w-3.5 h-3.5 text-[#c9a84c]" />
                <span>Architecture Topology</span>
              </button>

              <button
                onClick={() => scrollToSection('scope-calculator')}
                className="px-3.5 py-1.5 rounded-xl bg-[#141414] hover:bg-[#1a1a1a] border border-[#242424] text-xs font-medium text-[#cccccc] hover:text-white transition-colors shrink-0 cursor-pointer flex items-center gap-1.5"
              >
                <Calculator className="w-3.5 h-3.5 text-[#c9a84c]" />
                <span>Scope Estimator</span>
              </button>

              <button
                onClick={() => scrollToSection('comparison-matrix')}
                className="px-3.5 py-1.5 rounded-xl bg-[#141414] hover:bg-[#1a1a1a] border border-[#242424] text-xs font-medium text-[#cccccc] hover:text-white transition-colors shrink-0 cursor-pointer flex items-center gap-1.5"
              >
                <Server className="w-3.5 h-3.5 text-[#c9a84c]" />
                <span>Spec Comparison</span>
              </button>

              <button
                onClick={() => scrollToSection('delivery-process')}
                className="px-3.5 py-1.5 rounded-xl bg-[#141414] hover:bg-[#1a1a1a] border border-[#242424] text-xs font-medium text-[#cccccc] hover:text-white transition-colors shrink-0 cursor-pointer flex items-center gap-1.5"
              >
                <Rocket className="w-3.5 h-3.5 text-[#c9a84c]" />
                <span>Delivery Process</span>
              </button>

              <button
                onClick={() => scrollToSection('faq-section')}
                className="px-3.5 py-1.5 rounded-xl bg-[#141414] hover:bg-[#1a1a1a] border border-[#242424] text-xs font-medium text-[#cccccc] hover:text-white transition-colors shrink-0 cursor-pointer flex items-center gap-1.5"
              >
                <HelpCircle className="w-3.5 h-3.5 text-[#c9a84c]" />
                <span>Enterprise FAQ</span>
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 2. Core Service Blueprints & Filter */}
      <section id="core-services" className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <span className="text-xs font-mono font-bold text-[#c9a84c] uppercase tracking-wider block mb-2">
                Core Engineering Disciplines
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
                Inspect Our Architectural Offerings
              </h2>
              <p className="text-sm text-[#999999] mt-1 max-w-xl">
                Switch between Overview, Benchmarks, and Tangible Deliverables inside each service card.
              </p>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c] ${
                  activeFilter === 'all'
                    ? 'bg-[#c9a84c] text-black shadow-md'
                    : 'bg-[#141414] text-[#aaaaaa] hover:text-white border border-[#242424]'
                }`}
              >
                All Disciplines ({CORE_SERVICES.length})
              </button>
              {CORE_SERVICES.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setActiveFilter(s.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c] ${
                    activeFilter === s.id
                      ? 'bg-[#c9a84c] text-black shadow-md'
                      : 'bg-[#141414] text-[#aaaaaa] hover:text-white border border-[#242424]'
                  }`}
                >
                  {s.title}
                </button>
              ))}
            </div>
          </div>

          <StaggerContainer className="space-y-10">
            {filteredServices.map((service, index) => (
              <StaggerItem key={service.id}>
                <ServiceDetailedCard
                  service={service}
                  index={index}
                  onOpenConsultation={(s) => onOpenConsultation(s)}
                />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* 3. Interactive Topology Visualizer */}
      <section id="architecture-visualizer" className="py-12 sm:py-16 border-t border-[#1c1c1c]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <ServiceArchitectureVisualizer
              onOpenConsultation={() => onOpenConsultation()}
            />
          </Reveal>
        </div>
      </section>

      {/* 4. Interactive Scope & Sprint Estimator */}
      <section id="scope-calculator" className="py-12 sm:py-16 border-t border-[#1c1c1c]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <ServiceScopeCalculator
              onOpenConsultation={(s) => onOpenConsultation(s)}
            />
          </Reveal>
        </div>
      </section>

      {/* 5. Head-to-Head Technical Spec Matrix */}
      <section id="comparison-matrix" className="py-12 sm:py-16 border-t border-[#1c1c1c]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <ServiceComparisonMatrix
              onOpenConsultation={(s) => onOpenConsultation(s)}
            />
          </Reveal>
        </div>
      </section>

      {/* 6. 4-Phase Delivery Lifecycle */}
      <section id="delivery-process" className="py-12 sm:py-16 border-t border-[#1c1c1c]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <ServiceDeliveryProcess
              onOpenConsultation={() => onOpenConsultation()}
            />
          </Reveal>
        </div>
      </section>

      {/* 7. Enterprise Architectural FAQ */}
      <section id="faq-section" className="py-12 sm:py-16 border-t border-[#1c1c1c]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <ServicesFAQ
              onOpenConsultation={() => onOpenConsultation()}
            />
          </Reveal>
        </div>
      </section>

      {/* 8. Bottom Conversion Call-To-Action Banner */}
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
                <MessageSquare className="w-4 h-4 text-[#22c55e]" />
                <span>Chat with Architect on WhatsApp</span>
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
};
