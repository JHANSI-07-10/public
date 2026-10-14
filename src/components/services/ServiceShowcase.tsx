'use client';

import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { 
  Code2, 
  Globe, 
  Server, 
  Smartphone, 
  Cpu, 
  Cloud, 
  Palette, 
  Layers, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Activity, 
  Zap,
  Terminal,
  Lock,
  ChevronRight
} from 'lucide-react';
import { CORE_SERVICES, Service } from '../../data/content';
import { AnimatedButton } from '../motion/AnimatedButton';

interface ServiceShowcaseProps {
  onOpenConsultation: (service: Service) => void;
}

interface DomainFilter {
  id: string;
  label: string;
  count: number;
  serviceIds?: string[];
}

const DOMAINS: DomainFilter[] = [
  { id: 'all', label: 'All Disciplines', count: 7 },
  { id: 'platform', label: 'Platform & Backend', count: 2, serviceIds: ['custom-software', 'enterprise-software'] },
  { id: 'web', label: 'Web & UI/UX', count: 2, serviceIds: ['web-dev', 'ui-ux-engineering'] },
  { id: 'cloud-ai', label: 'Cloud, Mobile & AI', count: 3, serviceIds: ['mobile-apps', 'ai-ml', 'cloud-devops'] },
];

export const ServiceShowcase: React.FC<ServiceShowcaseProps> = ({ onOpenConsultation }) => {
  const [activeDomain, setActiveDomain] = useState<string>('all');
  const [selectedServiceId, setSelectedServiceId] = useState<string>('custom-software');
  const cardRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Handle service selection and ensure the top of the service card is cleanly in view
  const handleSelectService = useCallback((serviceId: string) => {
    setSelectedServiceId(serviceId);

    if (typeof window !== 'undefined' && cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const targetTop = 88; // Position just below the sticky navbar

      // If user has scrolled down into or past the service card, scroll up to the top of the card
      if (rect.top < targetTop - 15 || rect.top > targetTop + 80) {
        const targetScrollY = window.scrollY + rect.top - targetTop;
        window.scrollTo({
          top: Math.max(0, targetScrollY),
          behavior: 'smooth',
        });
      }
    }
  }, []);

  // Filter services by active domain
  const visibleServices = CORE_SERVICES.filter((s) => {
    if (activeDomain === 'all') return true;
    const domain = DOMAINS.find((d) => d.id === activeDomain);
    return domain?.serviceIds ? domain.serviceIds.includes(s.id) : true;
  });

  // Currently selected service (only this single service is rendered on the right)
  const activeService =
    visibleServices.find((s) => s.id === selectedServiceId) ||
    visibleServices[0] ||
    CORE_SERVICES[0];

  const getServiceIcon = (id: string) => {
    switch (id) {
      case 'custom-software':
        return Code2;
      case 'web-dev':
        return Globe;
      case 'enterprise-software':
        return Server;
      case 'mobile-apps':
        return Smartphone;
      case 'ai-ml':
        return Cpu;
      case 'cloud-devops':
        return Cloud;
      case 'ui-ux-engineering':
        return Palette;
      default:
        return Layers;
    }
  };

  const ActiveIcon = getServiceIcon(activeService.id);
  const activeGlobalIndex = CORE_SERVICES.findIndex((s) => s.id === activeService.id);

  return (
    <div className="space-y-8 sm:space-y-10">
      {/* 1. Executive Section Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-[#1c1c1c]">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-[#161616] border border-[#2a2a2a] text-xs font-mono font-bold text-[#c9a84c] uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c9a84c] animate-pulse" />
            <span>01 // Core Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-4xl font-black text-white tracking-tight leading-[1.12]">
            Mission-Critical Software Engineering for Modern Enterprises
          </h2>
          <p className="text-sm sm:text-base text-[#999999] mt-3 leading-relaxed">
            Select a discipline from the menu to inspect its architectural specifications, throughput benchmarks, and deliverable scope.
          </p>
        </div>

        {/* Domain Filter Tabs */}
        <div className="flex items-center p-1 rounded-2xl bg-[#121212] border border-[#222222] self-start lg:self-auto overflow-x-auto max-w-full no-scrollbar">
          {DOMAINS.map((domain) => {
            const isActive = activeDomain === domain.id;
            return (
              <button
                key={domain.id}
                onClick={() => {
                  setActiveDomain(domain.id);
                  if (domain.serviceIds && !domain.serviceIds.includes(selectedServiceId)) {
                    handleSelectService(domain.serviceIds[0]);
                  }
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[#c9a84c] text-black shadow-sm font-bold'
                    : 'text-[#888888] hover:text-white'
                }`}
              >
                <span>{domain.label}</span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                    isActive ? 'bg-black/20 text-black font-bold' : 'text-[#666666]'
                  }`}
                >
                  {domain.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Interactive Selection Showcase (Single Active Service View) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Left Column: Service Selection Menu (Sticky while reading service details) */}
        <div className="lg:col-span-4 space-y-2 lg:sticky lg:top-24 lg:self-start">
          <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-widest text-[#71717a] font-bold px-1 mb-2">
            <span>Engineering Disciplines</span>
            <span className="text-[#c9a84c] font-bold">
              {visibleServices.findIndex((s) => s.id === activeService.id) + 1} of {visibleServices.length}
            </span>
          </div>

          {/* List of Selectable Service Buttons */}
          <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 no-scrollbar">
            {visibleServices.map((service) => {
              const Icon = getServiceIcon(service.id);
              const isSelected = service.id === activeService.id;
              const globalIndex = CORE_SERVICES.findIndex((s) => s.id === service.id);

              return (
                <button
                  key={service.id}
                  onClick={() => handleSelectService(service.id)}
                  className={`w-full p-3 sm:p-3.5 rounded-xl text-left border transition-all duration-200 cursor-pointer relative overflow-hidden group flex items-center justify-between shrink-0 lg:shrink ${
                    isSelected
                      ? 'bg-[#18160f] border-[#c9a84c] shadow-lg shadow-black/90 ring-1 ring-[#c9a84c]/40'
                      : 'bg-[#111111]/90 border-[#222222] hover:bg-[#151515] hover:border-[#333333]'
                  }`}
                >
                  {/* Active Gold Left Accent Bar */}
                  {isSelected && (
                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#c9a84c] shadow-[0_0_10px_#c9a84c]" />
                  )}

                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center shrink-0 transition-all ${
                        isSelected
                          ? 'bg-[#c9a84c] text-black font-bold shadow-md shadow-[#c9a84c]/30'
                          : 'bg-[#1a1a1a] text-[#c9a84c] group-hover:bg-[#222222]'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-mono font-bold ${isSelected ? 'text-[#DFC067]' : 'text-[#c9a84c]'}`}>
                          0{globalIndex + 1}
                        </span>
                        <span className="text-[10px] font-mono text-[#777777] truncate">
                          {service.category.split(' ')[0]}
                        </span>
                      </div>
                      <div
                        className={`text-xs sm:text-sm font-bold truncate mt-0.5 transition-colors ${
                          isSelected ? 'text-white' : 'text-[#bbbbbb] group-hover:text-white'
                        }`}
                      >
                        {service.title}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    {isSelected && (
                      <span className="text-[9px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#c9a84c]/15 text-[#DFC067] border border-[#c9a84c]/30 hidden sm:inline-block">
                        Active
                      </span>
                    )}
                    <ChevronRight
                      className={`w-4 h-4 shrink-0 transition-transform hidden sm:block ${
                        isSelected
                          ? 'text-[#c9a84c] translate-x-0 opacity-100'
                          : 'text-[#444444] -translate-x-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0'
                      }`}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: ONLY THE SELECTED SERVICE DETAILS */}
        <div ref={cardRef} className="lg:col-span-8 scroll-mt-24">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeService.id}
              initial={shouldReduceMotion ? undefined : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-3xl bg-[#111111] border border-[#242424] p-6 sm:p-8 lg:p-8 relative overflow-hidden shadow-2xl"
            >
              {/* Subtle Ambient Radial Glow */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-[#c9a84c]/5 rounded-full blur-3xl pointer-events-none" />

              {/* Card Header */}
              <div className="pb-5 border-b border-[#1f1f1f] relative z-10">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-3.5">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#181818] border border-[#2a2a2a] text-xs font-mono font-bold text-[#c9a84c]">
                    <span>Discipline 0{activeGlobalIndex + 1}</span>
                    <span className="text-[#444444]">/</span>
                    <span className="text-[#a1a1aa]">{activeService.category}</span>
                  </div>

                  {/* Benchmark pill */}
                  <div className="flex items-center gap-1.5 text-xs font-mono text-[#c9a84c] bg-[#1a1a1a] px-3 py-1 rounded-full border border-[#2a2a2a]">
                    <Zap className="w-3.5 h-3.5" />
                    <span>{activeService.latency}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-2xl bg-[#c9a84c]/10 border border-[#c9a84c]/30 flex items-center justify-center shrink-0 text-[#c9a84c]">
                    <ActiveIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight">
                      {activeService.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#a1a1aa] mt-1.5 leading-relaxed">
                      {activeService.description}
                    </p>
                  </div>
                </div>

                {/* Target Fit Note */}
                <div className="mt-4 p-3.5 rounded-xl bg-[#151515] border border-[#242424]">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#c9a84c] block mb-1">
                    Ideal Fit & Business Use-Case
                  </span>
                  <p className="text-xs sm:text-sm text-[#cccccc] leading-relaxed">
                    {activeService.target}
                  </p>
                </div>
              </div>

              {/* Specifications Bento Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 py-4 border-b border-[#1f1f1f] relative z-10">
                <div className="p-3.5 rounded-xl bg-[#161616]/70 border border-[#222222]">
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#777777] uppercase tracking-wider mb-1">
                    <Terminal className="w-3 h-3 text-[#c9a84c]" />
                    <span>Primary Stack</span>
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-white leading-snug">
                    {activeService.stack}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#161616]/70 border border-[#222222]">
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#777777] uppercase tracking-wider mb-1">
                    <Activity className="w-3 h-3 text-[#c9a84c]" />
                    <span>Throughput SLA</span>
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-white leading-snug">
                    {activeService.latency}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#161616]/70 border border-[#222222]">
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#777777] uppercase tracking-wider mb-1">
                    <Lock className="w-3 h-3 text-[#c9a84c]" />
                    <span>Security Posture</span>
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-white leading-snug">
                    {activeService.security}
                  </div>
                </div>
              </div>

              {/* Capabilities & Deliverables Dual Checklist */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 py-4 border-b border-[#1f1f1f] relative z-10">
                <div>
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#c9a84c] block mb-2.5">
                    Architectural Capabilities
                  </span>
                  <ul className="space-y-1.5">
                    {activeService.capabilities.map((cap, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-[#cccccc]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#c9a84c] shrink-0 mt-0.5" />
                        <span>{cap}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#c9a84c] block mb-2.5">
                    Core Business Value & Deliverables
                  </span>
                  <ul className="space-y-1.5">
                    {activeService.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-[#cccccc]">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#c9a84c] shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Footer */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
                <div className="text-xs text-[#777777] font-mono flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
                  <span>Immediate Squad Availability · Full Git Repository Ownership</span>
                </div>

                <AnimatedButton
                  onClick={() => onOpenConsultation(activeService)}
                  variant="primary"
                  size="md"
                  icon={<ArrowRight className="w-4 h-4" />}
                  className="w-full sm:w-auto shrink-0"
                >
                  Inquire for {activeService.title.split(' ')[0]}
                </AnimatedButton>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
