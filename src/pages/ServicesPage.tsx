import React, { useState } from 'react';
import { SectionHeader } from '../components/ui/SectionHeader';
import { Card } from '../components/ui/Card';
import { CORE_SERVICES, Service } from '../data/content';
import { Globe, Layers, Code2, ArrowRight, Check } from 'lucide-react';
import { Reveal } from '../components/motion/Reveal';
import { StaggerContainer, StaggerItem } from '../components/motion/StaggerContainer';
import { AnimatedButton } from '../components/motion/AnimatedButton';

interface ServicesPageProps {
  onOpenConsultation: (service?: Service) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onOpenConsultation }) => {
  const [activeTab, setActiveTab] = useState<string>('all');

  const filteredServices =
    activeTab === 'all'
      ? CORE_SERVICES
      : CORE_SERVICES.filter((s) => s.id === activeTab);

  const getIcon = (id: string) => {
    switch (id) {
      case 'web-dev':
        return Globe;
      case 'web-app':
        return Layers;
      case 'java-stack':
      default:
        return Code2;
    }
  };

  return (
    <div className="pt-28 pb-20 bg-[#0a0a0a]">
      {/* Services Hero */}
      <section className="relative py-16 sm:py-24 border-b border-[#1f1f1f] overflow-hidden">
        <div className="absolute inset-0 hero-tech-grid opacity-40 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal>
            <SectionHeader
              eyebrow="Architectural Capabilities & Services"
              title="Software Engineering Services for SaaS & Enterprise Leaders."
              subtitle="Explore VPD Technologies' engineering services: custom SaaS development, enterprise Java backend solutions, and high-performance React frontends. Engineered with precision."
            />
          </Reveal>

          {/* Interactive Filter Controls */}
          <Reveal delay={0.1}>
            <div className="flex flex-wrap items-center gap-2 mt-8">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c] cursor-pointer ${
                  activeTab === 'all'
                    ? 'bg-[#c9a84c] text-black shadow-md'
                    : 'bg-[#141414] text-[#aaaaaa] hover:text-white border border-[#242424]'
                }`}
              >
                All Services ({CORE_SERVICES.length})
              </button>
              {CORE_SERVICES.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setActiveTab(s.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c] cursor-pointer ${
                    activeTab === s.id
                      ? 'bg-[#c9a84c] text-black shadow-md'
                      : 'bg-[#141414] text-[#aaaaaa] hover:text-white border border-[#242424]'
                  }`}
                >
                  {s.title}
                </button>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Services Detailed Breakdown */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <StaggerContainer className="space-y-16">
            {filteredServices.map((service, index) => {
              const Icon = getIcon(service.id);
              return (
                <StaggerItem key={service.id}>
                  <Card
                    variant="card"
                    padding="lg"
                    hoverable={false}
                    className="relative overflow-hidden hover:border-[#c9a84c]/40 transition-colors duration-300"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                      {/* Left Column: Core Overview & Specs */}
                      <div className="lg:col-span-7 space-y-6">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 rounded-2xl bg-[#c9a84c]/10 border border-[#c9a84c]/30 flex items-center justify-center shrink-0">
                            <Icon className="w-7 h-7 text-[#c9a84c]" />
                          </div>
                          <div>
                            <span className="text-xs font-mono font-bold text-[#c9a84c] uppercase">
                              Protocol Tier {index + 1} · {service.category}
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
                              {service.title}
                            </h2>
                          </div>
                        </div>

                        <p className="text-base text-[#cccccc] leading-relaxed">
                          {service.description}
                        </p>

                        <div className="p-4 rounded-xl bg-[#0f0f0f] border border-[#222222] space-y-2">
                          <div className="text-xs font-bold text-[#888888] uppercase tracking-wider">
                            Target Audience & Best Fit:
                          </div>
                          <p className="text-sm text-[#aaaaaa]">
                            {service.target}
                          </p>
                        </div>

                        {/* Architecture Specs Box */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-[#0a0a0a] border border-[#222222]">
                          <div>
                            <span className="text-[10px] text-[#777777] uppercase font-bold block mb-1">
                              Tech Stack
                            </span>
                            <span className="font-mono text-xs font-semibold text-white">
                              {service.stack}
                            </span>
                          </div>
                          <div>
                            <span className="text-[10px] text-[#777777] uppercase font-bold block mb-1">
                              Latency Benchmark
                            </span>
                            <span className="font-mono text-xs font-semibold text-[#c9a84c]">
                              {service.latency}
                            </span>
                          </div>
                          <div>
                            <span className="text-[10px] text-[#777777] uppercase font-bold block mb-1">
                              Security Standard
                            </span>
                            <span className="font-mono text-xs font-semibold text-white">
                              {service.security}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Right Column: Benefits & Capabilities Checklist */}
                      <div className="lg:col-span-5 bg-[#101010] border border-[#222222] rounded-2xl p-6 sm:p-7 flex flex-col justify-between space-y-6">
                        <div>
                          <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 pb-2 border-b border-[#222222]">
                            Deliverables & Value Highlights
                          </h4>
                          <ul className="space-y-3 mb-6">
                            {service.benefits.map((b, bIdx) => (
                              <li key={bIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#cccccc]">
                                <Check className="w-4 h-4 text-[#c9a84c] shrink-0 mt-0.5" />
                                <span>{b}</span>
                              </li>
                            ))}
                          </ul>

                          <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3">
                            Included Capabilities
                          </h4>
                          <div className="flex flex-wrap gap-2 mb-6">
                            {service.capabilities.map((cap, cIdx) => (
                              <span
                                key={cIdx}
                                className="px-3 py-1 rounded-lg bg-[#181818] border border-[#2a2a2a] text-xs font-medium text-[#aaaaaa]"
                              >
                                {cap}
                              </span>
                            ))}
                          </div>
                        </div>

                        <AnimatedButton
                          onClick={() => onOpenConsultation(service)}
                          variant="primary"
                          size="md"
                          fullWidth
                          icon={<ArrowRight className="w-4 h-4" />}
                        >
                          Inquire for {service.title}
                        </AnimatedButton>
                      </div>
                    </div>
                  </Card>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-16 border-t border-[#1f1f1f] bg-[#0d0d0d]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Reveal>
            <h3 className="text-2xl sm:text-3xl font-black text-white mb-4">
              Need a Bespoke Architectural Consultation?
            </h3>
            <p className="text-sm text-[#aaaaaa] mb-8 max-w-xl mx-auto">
              Our engineering squad specializes in custom full-stack solutions, high-throughput database tuning, and legacy application migration.
            </p>
            <AnimatedButton
              onClick={() => onOpenConsultation()}
              variant="primary"
              size="lg"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Schedule Free Technical Consultation
            </AnimatedButton>
          </Reveal>
        </div>
      </section>
    </div>
  );
};
