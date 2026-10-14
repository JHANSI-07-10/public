'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { 
  Globe, 
  Layers, 
  Code2, 
  ArrowRight, 
  Check, 
  Zap, 
  ShieldCheck, 
  Cpu, 
  Server,
  Activity,
  CheckCircle2,
  ExternalLink,
  Smartphone,
  Cloud,
  Palette
} from 'lucide-react';
import { Service } from '../../data/content';
import { AnimatedButton } from '../motion/AnimatedButton';

interface ServiceDetailedCardProps {
  service: Service;
  index: number;
  onOpenConsultation: (service: Service) => void;
}

export const ServiceDetailedCard: React.FC<ServiceDetailedCardProps> = ({
  service,
  index,
  onOpenConsultation,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'benchmarks' | 'deliverables'>('overview');
  const shouldReduceMotion = useReducedMotion();

  const getIcon = (id: string) => {
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

  const Icon = getIcon(service.id);

  // Benchmarks specific to the discipline
  const benchmarks = [
    {
      label: 'Latency / Service Time',
      value: service.latency,
      rating: 'Optimal',
      score: 98,
    },
    {
      label: 'Security & Auth Protocol',
      value: service.security,
      rating: 'Hardened',
      score: 100,
    },
    {
      label: 'Core Technology Stack',
      value: service.stack,
      rating: 'LTS Stable',
      score: 95,
    },
  ];

  return (
    <div className="silver-card-hover group rounded-3xl bg-[#0f0f0f] border border-[#222222] p-6 sm:p-8 lg:p-10 relative overflow-hidden">
      <div className="relative z-10">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#1c1c1c]">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#c9a84c]/10 border border-[#c9a84c]/30 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-[#c9a84c]" />
          </div>
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#c9a84c] uppercase tracking-wider">
              <span>Discipline 0{index + 1}</span>
              <span className="text-[#444444]">·</span>
              <span>{service.category}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white mt-0.5 tracking-tight">
              {service.title}
            </h3>
          </div>
        </div>

        {/* Tab Controls Inside Card */}
        <div className="flex items-center p-1 rounded-xl bg-[#161616] border border-[#262626] self-start md:self-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-[#c9a84c] text-black shadow-sm'
                : 'text-[#888888] hover:text-white'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('benchmarks')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              activeTab === 'benchmarks'
                ? 'bg-[#c9a84c] text-black shadow-sm'
                : 'text-[#888888] hover:text-white'
            }`}
          >
            Benchmarks
          </button>
          <button
            onClick={() => setActiveTab('deliverables')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              activeTab === 'deliverables'
                ? 'bg-[#c9a84c] text-black shadow-sm'
                : 'text-[#888888] hover:text-white'
            }`}
          >
            Deliverables
          </button>
        </div>
      </div>

      {/* Dynamic Tab Body */}
      <div className="pt-6">
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={shouldReduceMotion ? undefined : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              <div className="lg:col-span-7 space-y-5">
                <p className="text-base text-[#cccccc] leading-relaxed">
                  {service.description}
                </p>

                <div className="p-4 sm:p-5 rounded-2xl bg-[#141414] border border-[#222222] space-y-2">
                  <div className="text-xs font-bold text-[#888888] uppercase tracking-wider">
                    Target Enterprise Profile & Best Fit:
                  </div>
                  <p className="text-sm text-[#bbbbbb] leading-relaxed">
                    {service.target}
                  </p>
                </div>

                {/* Tech Badges */}
                <div>
                  <span className="text-xs font-bold text-[#777777] uppercase tracking-wider block mb-2">
                    Core Architectural Capabilities
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {service.capabilities.map((cap, cIdx) => (
                      <span
                        key={cIdx}
                        className="px-3 py-1.5 rounded-lg bg-[#181818] border border-[#2a2a2a] text-xs font-medium text-[#dddddd]"
                      >
                        {cap}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Spec Snapshot & Action */}
              <div className="lg:col-span-5 bg-[#141414] border border-[#222222] rounded-2xl p-6 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="text-xs font-bold text-white uppercase tracking-wider pb-2 border-b border-[#202020]">
                    Operational Specifications
                  </div>

                  <div className="space-y-3 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="text-[#888888]">Technology Stack</span>
                      <span className="font-mono text-white text-right font-semibold">
                        {service.stack}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#888888]">Latency Benchmark</span>
                      <span className="font-mono text-[#c9a84c] text-right font-semibold">
                        {service.latency}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#888888]">Security Framework</span>
                      <span className="font-mono text-white text-right font-semibold">
                        {service.security}
                      </span>
                    </div>
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
            </motion.div>
          )}

          {activeTab === 'benchmarks' && (
            <motion.div
              key="benchmarks"
              initial={shouldReduceMotion ? undefined : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              <div className="lg:col-span-7 space-y-4">
                <div className="text-xs font-bold text-[#888888] uppercase tracking-wider">
                  Verified Performance Standards & Latency Budgets
                </div>

                <div className="space-y-4">
                  {benchmarks.map((bench, bIdx) => (
                    <div
                      key={bIdx}
                      className="p-4 rounded-xl bg-[#141414] border border-[#222222] space-y-2"
                    >
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-[#aaaaaa] font-medium">{bench.label}</span>
                        <span className="font-mono text-[#c9a84c] font-bold">
                          {bench.value}
                        </span>
                      </div>
                      {/* Metric Bar */}
                      <div className="h-1.5 w-full bg-[#202020] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#c9a84c] rounded-full transition-all duration-500"
                          style={{ width: `${bench.score}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <p className="text-xs text-[#888888] leading-relaxed">
                  All performance budgets are continuously validated in CI/CD pipeline runs. Any commit exceeding latency bounds triggers automated build failure.
                </p>
              </div>

              <div className="lg:col-span-5 bg-[#141414] border border-[#222222] rounded-2xl p-6 flex flex-col justify-between space-y-6">
                <div>
                  <div className="text-xs font-bold text-white uppercase tracking-wider pb-2 border-b border-[#202020] mb-3">
                    Guaranteed Invariants
                  </div>
                  <ul className="space-y-2.5 text-xs text-[#cccccc]">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#c9a84c] shrink-0" />
                      <span>Zero regression SLA policy</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#c9a84c] shrink-0" />
                      <span>Sub-millisecond connection pooling</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#c9a84c] shrink-0" />
                      <span>Daily automated vulnerability scanning</span>
                    </li>
                  </ul>
                </div>

                <AnimatedButton
                  onClick={() => onOpenConsultation(service)}
                  variant="primary"
                  size="md"
                  fullWidth
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Request Benchmark Audit
                </AnimatedButton>
              </div>
            </motion.div>
          )}

          {activeTab === 'deliverables' && (
            <motion.div
              key="deliverables"
              initial={shouldReduceMotion ? undefined : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              <div className="lg:col-span-7 space-y-4">
                <div className="text-xs font-bold text-[#888888] uppercase tracking-wider">
                  Guaranteed Tangible Deliverables
                </div>

                <div className="space-y-3">
                  {service.benefits.map((benefit, bIdx) => (
                    <div
                      key={bIdx}
                      className="p-4 rounded-xl bg-[#141414] border border-[#222222] flex items-start gap-3"
                    >
                      <CheckCircle2 className="w-5 h-5 text-[#c9a84c] shrink-0 mt-0.5" />
                      <div>
                        <div className="text-sm font-bold text-white">
                          {benefit}
                        </div>
                        <div className="text-xs text-[#888888] mt-0.5">
                          Production-ready asset delivered with comprehensive documentation and code transfer.
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5 bg-[#141414] border border-[#222222] rounded-2xl p-6 flex flex-col justify-between space-y-6">
                <div>
                  <div className="text-xs font-bold text-white uppercase tracking-wider pb-2 border-b border-[#202020] mb-3">
                    Handover Package
                  </div>
                  <ul className="space-y-2.5 text-xs text-[#cccccc]">
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#c9a84c] shrink-0" />
                      <span>Full Git repository access & history</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#c9a84c] shrink-0" />
                      <span>Docker & environment configuration</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#c9a84c] shrink-0" />
                      <span>Post-launch warranty & monitoring access</span>
                    </li>
                  </ul>
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
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  </div>
  );
};
