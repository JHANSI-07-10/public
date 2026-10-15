'use client';

import React from 'react';
import {
  Search,
  PenTool,
  Code2,
  ShieldCheck,
  Rocket,
  LifeBuoy,
  ArrowRight,
  Workflow,
  CheckCircle2,
  Clock,
  Sparkles
} from 'lucide-react';
import { AnimatedButton } from '../motion/AnimatedButton';
import { Reveal } from '../motion/Reveal';

interface DeliveryStage {
  step: string;
  title: string;
  shortDescription: string;
  description: string;
  icon: React.ElementType;
  deliverables: string[];
  duration: string;
}

const DELIVERY_STAGES: DeliveryStage[] = [
  {
    step: '01',
    title: 'Discover',
    shortDescription: 'Understand the business, its users, goals, and technical requirements.',
    description:
      'We conduct stakeholder interviews, map functional constraints, audit existing infrastructure, and align on clear acceptance criteria and project scope.',
    icon: Search,
    deliverables: ['Requirements Spec', 'Technical Feasibility Audit', 'Sprint 0 Roadmap'],
    duration: 'Sprint 0',
  },
  {
    step: '02',
    title: 'Design',
    shortDescription: 'Turn requirements into clear, usable digital experiences.',
    description:
      'We architect high-fidelity wireframes, responsive component libraries, and system topology maps. Every workflow is reviewed and aligned before coding.',
    icon: PenTool,
    deliverables: ['Clickable Prototypes', 'Architecture Blueprint', 'Design System Tokens'],
    duration: 'Weeks 1–2',
  },
  {
    step: '03',
    title: 'Engineer',
    shortDescription: 'Build reliable applications and connected software systems.',
    description:
      'Our team constructs robust backends, performant frontends, and resilient data layers using clean modular code, automated CI/CD, and strict type safety.',
    icon: Code2,
    deliverables: ['Modular Codebase', 'API Contracts', 'Automated CI/CD Pipeline'],
    duration: 'Iterative Sprints',
  },
  {
    step: '04',
    title: 'Validate',
    shortDescription: 'Verify quality, functionality, and readiness for delivery.',
    description:
      'We execute multi-tier quality assurance: unit suites, E2E regression tests, cross-browser audits, security vulnerability checks, and load benchmarking.',
    icon: ShieldCheck,
    deliverables: ['QA Test Matrix', 'Security & OWASP Audit', 'Core Web Vitals Pass'],
    duration: 'Continuous QA',
  },
  {
    step: '05',
    title: 'Deploy',
    shortDescription: 'Release the approved solution into its target environment.',
    description:
      'We configure cloud infrastructure, manage zero-downtime rollouts, conduct smoke tests in production, and transfer all code repositories and documentation.',
    icon: Rocket,
    deliverables: ['Zero-Downtime Release', 'Infrastructure as Code', 'Full IP & Git Transfer'],
    duration: 'Release Day',
  },
  {
    step: '06',
    title: 'Support',
    shortDescription: 'Maintain the solution and plan future improvements.',
    description:
      'Post-launch, we provide SLA-backed maintenance, proactive monitoring, performance tuning, and roadmap iteration to scale your platform smoothly.',
    icon: LifeBuoy,
    deliverables: ['SLA Uptime Guarantee', 'Telemetry & Alerting', 'Feature Iteration Support'],
    duration: 'Long-Term SLA',
  },
];

interface ServiceDeliveryApproachProps {
  onOpenConsultation: () => void;
}

export const ServiceDeliveryApproach: React.FC<ServiceDeliveryApproachProps> = ({
  onOpenConsultation,
}) => {
  return (
    <div className="rounded-3xl bg-[#0e0e0e] border border-[#222222] p-6 sm:p-8 lg:p-12 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#c9a84c]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#c9a84c]/3 rounded-full blur-3xl pointer-events-none" />

      {/* Header Block */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 border-b border-[#1c1c1c] relative z-10">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-[#161616] border border-[#2a2a2a] text-xs font-mono font-bold text-[#c9a84c] uppercase tracking-wider">
            <Workflow className="w-3.5 h-3.5" />
            <span>Our Delivery Approach</span>
          </div>
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-[1.15]">
            From Vision to Production Reality
          </h3>
          <p className="text-sm sm:text-base text-[#999999] mt-3 leading-relaxed">
            Every engagement follows a structured, transparent 6-stage lifecycle designed to eliminate uncertainty, enforce engineering rigor, and guarantee predictable business outcomes.
          </p>
        </div>

        {/* Quick Highlights Badge */}
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#141414] border border-[#242424] text-xs font-mono text-[#cccccc]">
            <Clock className="w-3.5 h-3.5 text-[#c9a84c]" />
            <span>Bi-Weekly Sprint Demos</span>
          </div>
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#141414] border border-[#242424] text-xs font-mono text-[#cccccc]">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#c9a84c]" />
            <span>100% IP & Code Transfer</span>
          </div>
        </div>
      </div>

      {/* 6-Stage Process Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-8 relative z-10">
        {DELIVERY_STAGES.map((stage) => {
          const StageIcon = stage.icon;
          return (
            <div
              key={stage.title}
              className="silver-card-hover group rounded-2xl bg-[#131313]/90 border border-[#202020] p-6 flex flex-col relative overflow-hidden h-full"
            >
              <div className="relative z-10 flex flex-col h-full">
                {/* Stage Icon */}
                <div className="w-11 h-11 rounded-xl bg-[#c9a84c]/10 border border-[#c9a84c]/20 flex items-center justify-center text-[#c9a84c] group-hover:scale-105 group-hover:bg-[#c9a84c]/15 transition-all mb-4">
                  <StageIcon className="w-5 h-5" />
                </div>

                {/* Title */}
                <h4 className="text-lg sm:text-xl font-bold text-white group-hover:text-[#DFC067] transition-colors mb-2">
                  {stage.title}
                </h4>

                {/* Description */}
                <p className="text-xs sm:text-sm text-[#a1a1aa] leading-relaxed mb-5">
                  {stage.description}
                </p>

                {/* Tangible Deliverables Block */}
                <div className="mt-auto pt-4 border-t border-[#1c1c1c]">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#71717a] block mb-2.5 font-semibold">
                    Key Deliverables
                  </span>
                  <ul className="space-y-2">
                    {stage.deliverables.map((item) => (
                      <li
                        key={item}
                        className="text-xs text-[#cccccc] flex items-center gap-2"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#c9a84c] shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Conversion Prompt Bar */}
      <div className="mt-10 pt-8 border-t border-[#1c1c1c] flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10 bg-[#121212]/50 p-6 rounded-2xl border border-[#1e1e1e]">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-[#c9a84c]/10 border border-[#c9a84c]/30 flex items-center justify-center text-[#c9a84c] shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h5 className="text-sm sm:text-base font-bold text-white">
              Need a Customized Delivery Plan?
            </h5>
            <p className="text-xs text-[#888888] mt-0.5">
              We tailor sprint cadences, team topologies, and compliance guardrails to your tech stack.
            </p>
          </div>
        </div>

        <AnimatedButton
          onClick={onOpenConsultation}
          variant="secondary"
          size="md"
          icon={<ArrowRight className="w-4 h-4" />}
          className="shrink-0 w-full sm:w-auto"
        >
          Discuss Delivery Timeline
        </AnimatedButton>
      </div>
    </div>
  );
};
