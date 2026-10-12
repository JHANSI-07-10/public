import React from 'react';
import { Globe, Layers, Code2, ArrowRight, Check } from 'lucide-react';
import { CORE_SERVICES, Service } from '../data/content';
import { SectionHeader } from './ui/SectionHeader';
import { Reveal } from './motion/Reveal';
import { StaggerContainer, StaggerItem } from './motion/StaggerContainer';
import { InteractiveCard } from './motion/InteractiveCard';
import { AnimatedButton } from './motion/AnimatedButton';

interface ServicesSectionProps {
  onSelectService: (service: Service) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
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
    <section id="services" className="py-24 bg-[#0a0a0a] border-t border-[#1f1f1f] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <SectionHeader
              eyebrow="Core Technical Offerings"
              title="Software Engineering Built for Uncompromising Scale."
              className="mb-0"
            />
            <p className="text-sm text-[#aaaaaa] max-w-md leading-relaxed pb-2">
              Every solution is engineered with strict production protocols, hardened security standards, and predictable long-term maintainability.
            </p>
          </div>
        </Reveal>

        {/* 3-Column Service Card Grid */}
        <StaggerContainer className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {CORE_SERVICES.map((service) => {
            const Icon = getIcon(service.id);
            return (
              <StaggerItem key={service.id}>
                <InteractiveCard
                  variant="card"
                  padding="lg"
                  className="flex flex-col justify-between group h-full"
                >
                  <div>
                    {/* Top Bar: Icon & Category */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-xl bg-[#c9a84c]/10 border border-[#c9a84c]/30 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                        <Icon className="w-6 h-6 text-[#c9a84c]" />
                      </div>
                      <span className="text-[11px] font-mono font-medium text-[#c9a84c] tracking-wide">
                        {service.category}
                      </span>
                    </div>

                    {/* Title & Description */}
                    <h3 className="text-2xl font-bold text-white mb-3">
                      {service.title}
                    </h3>
                    <p className="text-sm text-[#aaaaaa] leading-relaxed mb-6">
                      {service.description}
                    </p>

                    {/* Architecture Specs Box */}
                    <div className="p-4 rounded-xl bg-[#0e0e0e] border border-[#222222] mb-6 space-y-2.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[#777777]">Technology Stack:</span>
                        <span className="font-mono font-semibold text-white">{service.stack}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[#777777]">Latency Benchmark:</span>
                        <span className="font-mono font-semibold text-[#c9a84c]">{service.latency}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[#777777]">Security Standard:</span>
                        <span className="font-mono font-semibold text-white">{service.security}</span>
                      </div>
                    </div>

                    {/* Benefits Checklist */}
                    <div className="space-y-2.5 mb-8">
                      <div className="text-xs font-bold text-[#888888] uppercase tracking-wider mb-2">
                        Key Deliverables
                      </div>
                      {service.benefits.map((benefit, bIdx) => (
                        <div key={bIdx} className="flex items-start gap-2.5 text-xs text-[#cccccc]">
                          <Check className="w-4 h-4 text-[#c9a84c] shrink-0 mt-0.5" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Action */}
                  <AnimatedButton
                    onClick={() => onSelectService(service)}
                    variant="secondary"
                    size="md"
                    fullWidth
                    icon={<ArrowRight className="w-3.5 h-3.5" />}
                    className="group-hover:border-[#c9a84c]/60 group-hover:bg-[#1a1a1a]"
                  >
                    Inquire for {service.title}
                  </AnimatedButton>
                </InteractiveCard>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
};
