'use client';

import React, { useState, useMemo } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { 
  Calculator, 
  Layers, 
  Calendar, 
  Users, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles,
  SlidersHorizontal,
  Shield,
  Zap,
  Globe,
  Code2
} from 'lucide-react';
import { CORE_SERVICES, Service } from '../../data/content';
import { AnimatedButton } from '../motion/AnimatedButton';

interface ServiceScopeCalculatorProps {
  onOpenConsultation: (service?: Service) => void;
}

interface CapabilityToggle {
  id: string;
  label: string;
  description: string;
  sprintImpact: number;
}

const AVAILABLE_CAPABILITIES: CapabilityToggle[] = [
  {
    id: 'rbac',
    label: 'Enterprise Multi-Tenant RBAC',
    description: 'Hierarchical roles, granular permissions, and organization isolation.',
    sprintImpact: 0.5,
  },
  {
    id: 'realtime',
    label: 'Real-Time Bi-Directional WebSockets',
    description: 'Sub-50ms event streaming, collaborative state, and live notifications.',
    sprintImpact: 0.5,
  },
  {
    id: 'cicd',
    label: 'Automated CI/CD & Container Orchestration',
    description: 'Dockerized multi-stage builds, automated lint/test runner, and staging.',
    sprintImpact: 0.25,
  },
  {
    id: 'cluster',
    label: 'High-Availability Database Clustering',
    description: 'Read-replica pooling, automated failover, and Redis distributed caching.',
    sprintImpact: 0.75,
  },
  {
    id: 'seo-perf',
    label: 'Sub-100ms Core Web Vitals & Schema',
    description: 'SSR / Edge hydration, atomic bundle optimization, and rich JSON-LD.',
    sprintImpact: 0.25,
  },
];

export const ServiceScopeCalculator: React.FC<ServiceScopeCalculatorProps> = ({
  onOpenConsultation,
}) => {
  const [selectedServiceId, setSelectedServiceId] = useState<string>('web-app');
  const [projectScale, setProjectScale] = useState<'mvp' | 'scale' | 'enterprise'>('scale');
  const [timelineUrgency, setTimelineUrgency] = useState<'fast' | 'standard'>('standard');
  const [selectedCapabilities, setSelectedCapabilities] = useState<string[]>([
    'rbac',
    'cicd',
    'seo-perf',
  ]);

  const shouldReduceMotion = useReducedMotion();

  const selectedService = useMemo(() => {
    return CORE_SERVICES.find((s) => s.id === selectedServiceId) || CORE_SERVICES[0];
  }, [selectedServiceId]);

  const toggleCapability = (id: string) => {
    setSelectedCapabilities((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Compute calculated metrics
  const estimation = useMemo(() => {
    let baseSprints = 2;
    if (selectedServiceId === 'web-dev') baseSprints = 1.5;
    if (selectedServiceId === 'web-app') baseSprints = 2.5;
    if (selectedServiceId === 'java-stack') baseSprints = 3.5;

    // Scale modifier
    if (projectScale === 'mvp') baseSprints *= 0.8;
    if (projectScale === 'scale') baseSprints *= 1.1;
    if (projectScale === 'enterprise') baseSprints *= 1.5;

    // Additional capabilities
    const capabilityAddons = selectedCapabilities.reduce((acc, capId) => {
      const found = AVAILABLE_CAPABILITIES.find((c) => c.id === capId);
      return acc + (found?.sprintImpact || 0);
    }, 0);

    const totalSprints = Math.max(1, Math.round((baseSprints + capabilityAddons) * 10) / 10);
    const sprintDurationWeeks = 2;
    const totalWeeks = Math.round(totalSprints * sprintDurationWeeks);

    let teamStructure = '1 Lead Architect · 2 Full-Stack Engineers · 1 QA Specialist';
    if (projectScale === 'enterprise') {
      teamStructure = '1 Principal Architect · 3 Senior Engineers · 1 DevOps Engineer · 1 Dedicated QA';
    } else if (projectScale === 'mvp') {
      teamStructure = '1 Technical Lead · 1 Full-Stack Engineer · 1 Quality Analyst';
    }

    return {
      sprints: totalSprints,
      weeks: totalWeeks,
      team: teamStructure,
      slaGuarantee: projectScale === 'enterprise' ? '99.99% Availability + 24/7 Priority Support' : '99.9% Uptime + Standard Sprint Warranty',
    };
  }, [selectedServiceId, projectScale, selectedCapabilities]);

  return (
    <div className="rounded-3xl bg-[#0e0e0e] border border-[#222222] p-6 sm:p-8 lg:p-10 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-[#c9a84c]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#1c1c1c]">
        <div>
          <div className="flex items-center gap-2 mb-2 text-xs font-mono font-bold text-[#c9a84c] uppercase tracking-wider">
            <Calculator className="w-4 h-4" />
            <span>Project Scope & Architecture Estimator</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Configure Your Custom Engineering Blueprint
          </h3>
          <p className="text-sm text-[#999999] mt-2 max-w-2xl leading-relaxed">
            Select your baseline tier, project scale, and enterprise capabilities to compute sprint timelines and resource topology in real-time.
          </p>
        </div>

        <div className="text-left md:text-right">
          <span className="text-xs text-[#777777] uppercase font-bold tracking-wider block">
            Estimated Delivery
          </span>
          <span className="text-2xl sm:text-3xl font-mono font-black text-[#c9a84c]">
            ~{estimation.weeks} Weeks
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8">
        {/* Left Column: Interactive Controls */}
        <div className="lg:col-span-7 space-y-7">
          {/* 1. Service Tier Selector */}
          <div>
            <label className="text-xs font-bold text-[#777777] uppercase tracking-wider block mb-3">
              1. Select Primary Service Discipline
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {CORE_SERVICES.map((service) => {
                const isSelected = service.id === selectedServiceId;
                return (
                  <button
                    key={service.id}
                    onClick={() => setSelectedServiceId(service.id)}
                    className={`p-3.5 rounded-xl text-left border transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c] ${
                      isSelected
                        ? 'bg-[#1a1a1a] border-[#c9a84c] shadow-sm'
                        : 'bg-[#121212] border-[#222222] hover:bg-[#161616] text-[#aaaaaa]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-[#888888]'}`}>
                        {service.title.split(' ')[0]}
                      </span>
                      {isSelected && <span className="w-2 h-2 rounded-full bg-[#c9a84c]" />}
                    </div>
                    <span className="text-xs font-mono text-[#c9a84c] block">
                      {service.category.split(' ')[0]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Project Scale Selector */}
          <div>
            <label className="text-xs font-bold text-[#777777] uppercase tracking-wider block mb-3">
              2. Select Deployment Scale & Maturity
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              {[
                { id: 'mvp', label: 'Startup MVP', desc: 'Rapid market launch' },
                { id: 'scale', label: 'Growth Scale', desc: 'High-throughput architecture' },
                { id: 'enterprise', label: 'Enterprise Core', desc: 'Mission-critical resilience' },
              ].map((scale) => {
                const isSelected = projectScale === scale.id;
                return (
                  <button
                    key={scale.id}
                    onClick={() => setProjectScale(scale.id as any)}
                    className={`p-3.5 rounded-xl text-left border transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c] ${
                      isSelected
                        ? 'bg-[#1a1a1a] border-[#c9a84c] text-white'
                        : 'bg-[#121212] border-[#222222] hover:bg-[#161616] text-[#aaaaaa]'
                    }`}
                  >
                    <div className="text-xs font-bold mb-0.5">{scale.label}</div>
                    <div className="text-xs text-[#777777]">{scale.desc}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Capability Toggles */}
          <div>
            <label className="text-xs font-bold text-[#777777] uppercase tracking-wider block mb-3">
              3. Include Advanced Architectural Capabilities
            </label>
            <div className="space-y-2">
              {AVAILABLE_CAPABILITIES.map((cap) => {
                const isChecked = selectedCapabilities.includes(cap.id);
                return (
                  <button
                    key={cap.id}
                    onClick={() => toggleCapability(cap.id)}
                    className={`w-full p-3.5 rounded-xl text-left border flex items-center justify-between transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c] ${
                      isChecked
                        ? 'bg-[#181818] border-[#c9a84c]/50 text-white'
                        : 'bg-[#121212] border-[#202020] hover:bg-[#151515] text-[#888888]'
                    }`}
                  >
                    <div className="pr-4">
                      <div className="text-xs font-semibold text-white flex items-center gap-2">
                        <span>{cap.label}</span>
                        {isChecked && (
                          <span className="text-xs font-mono text-[#c9a84c]">
                            (+{cap.sprintImpact} sprint)
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-[#888888] mt-0.5">
                        {cap.description}
                      </div>
                    </div>

                    <div
                      className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                        isChecked
                          ? 'bg-[#c9a84c] border-[#c9a84c] text-black'
                          : 'border-[#333333] bg-[#1a1a1a]'
                      }`}
                    >
                      {isChecked && <CheckCircle2 className="w-3.5 h-3.5 text-black stroke-[3]" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Dynamic Blueprint Output Card */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6 bg-[#121212] border border-[#242424] rounded-2xl p-6 sm:p-7">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-[#202020]">
              <span className="text-xs font-mono font-bold text-[#c9a84c] uppercase">
                Architecture Blueprint Estimate
              </span>
              <span className="text-xs font-mono text-[#777777]">
                Configured Real-Time
              </span>
            </div>

            <div className="mt-5 space-y-4">
              <div className="p-4 rounded-xl bg-[#0a0a0a] border border-[#1e1e1e]">
                <div className="text-xs text-[#777777] uppercase font-bold mb-1">
                  Target Service Scope
                </div>
                <div className="text-base font-bold text-white">
                  {selectedService.title}
                </div>
                <div className="text-xs text-[#aaaaaa] mt-1 font-mono">
                  {selectedService.stack}
                </div>
              </div>

              {/* Calculated Metrics */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-[#161616] border border-[#262626]">
                  <span className="text-xs text-[#777777] uppercase font-bold block mb-1">
                    Sprint Count
                  </span>
                  <span className="text-lg font-mono font-black text-white">
                    {estimation.sprints} Sprints
                  </span>
                </div>
                <div className="p-3.5 rounded-xl bg-[#161616] border border-[#262626]">
                  <span className="text-xs text-[#777777] uppercase font-bold block mb-1">
                    Turnaround Time
                  </span>
                  <span className="text-lg font-mono font-black text-[#c9a84c]">
                    ~{estimation.weeks} Weeks
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#161616] border border-[#262626]">
                <span className="text-xs text-[#777777] uppercase font-bold block mb-1">
                  Dedicated Squad Structure
                </span>
                <span className="text-xs text-white font-medium block">
                  {estimation.team}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#161616] border border-[#262626]">
                <span className="text-xs text-[#777777] uppercase font-bold block mb-1">
                  Enterprise SLA & Warranty
                </span>
                <span className="text-xs text-[#c9a84c] font-medium block">
                  {estimation.slaGuarantee}
                </span>
              </div>

              {/* Included Deliverables preview */}
              <div className="pt-2">
                <span className="text-xs font-bold text-[#777777] uppercase tracking-wider block mb-2">
                  Guaranteed Deliverables Checklist
                </span>
                <ul className="space-y-1.5 text-xs text-[#cccccc]">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#c9a84c] shrink-0" />
                    <span>Complete IP and Source Code Transfer</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#c9a84c] shrink-0" />
                    <span>Automated Staging & Production Deployment</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#c9a84c] shrink-0" />
                    <span>Architectural Documentation & Handover Call</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <AnimatedButton
            onClick={() => onOpenConsultation(selectedService)}
            variant="primary"
            size="lg"
            fullWidth
            icon={<ArrowRight className="w-4 h-4" />}
          >
            Request This Custom Blueprint
          </AnimatedButton>
        </div>
      </div>
    </div>
  );
};
