import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { 
  GitBranch, 
  Terminal, 
  ShieldCheck, 
  Rocket, 
  CheckCircle2, 
  Clock, 
  FileCode2,
  ArrowRight
} from 'lucide-react';
import { AnimatedButton } from '../motion/AnimatedButton';

interface ProcessPhase {
  phase: string;
  title: string;
  tagline: string;
  duration: string;
  icon: React.ElementType;
  deliverables: string[];
  description: string;
  invariants: string[];
}

const PHASES: ProcessPhase[] = [
  {
    phase: 'Phase 01',
    title: 'Architectural Audit & Discovery',
    tagline: 'De-risking system requirements before writing production code',
    duration: 'Week 1',
    icon: GitBranch,
    deliverables: [
      'Architectural Blueprint & Data Schema Document',
      'Non-Functional Requirements (NFR) Benchmark Matrix',
      'API Contract Specification (OpenAPI / Swagger)',
      'Security Threat Model & Compliance Plan'
    ],
    description: 'We audit your technical constraints, traffic volume projections, and security standards. We establish the system boundary and choose the optimal tech stack to avoid costly rework.',
    invariants: ['Zero Ambiguity Scope Definition', 'Guaranteed Milestone Timeline', 'Strict Tech Stack Suitability']
  },
  {
    phase: 'Phase 02',
    title: 'Sprint 0 & Prototype Validation',
    tagline: 'Working vertical slice to validate latency and interaction fidelity',
    duration: 'Weeks 2–3',
    icon: Terminal,
    deliverables: [
      'Interactive React UI Prototype with Design Tokens',
      'Containerized Development Environment (Docker Compose)',
      'Automated CI/CD Linting and Formatting Pipeline',
      'Database Migration Baseline (PostgreSQL / Flyway)'
    ],
    description: 'We construct Sprint 0: an end-to-end vertical slice connecting client, API gateway, and database. This confirms deployment pathways and tests real-world latency before scaling feature development.',
    invariants: ['Working End-to-End Tracer Bullet', 'Automated Staging Deployments', 'Design-to-Code Alignment']
  },
  {
    phase: 'Phase 03',
    title: 'Test-Driven Hardening & Audits',
    tagline: 'High-velocity feature sprints with automated test barriers',
    duration: 'Weeks 4–7',
    icon: ShieldCheck,
    deliverables: [
      'Unit & Integration Test Suite (>85% code coverage)',
      'High-Concurrency Load Resilience Report (JMeter / k6)',
      'OWASP Top 10 Security Penetration Assessment',
      'Cross-Browser & Mobile Accessibility (WCAG AA)'
    ],
    description: 'Disciplined bi-weekly sprints deliver functional, reviewable increments. Every pull request passes automated tests, static security analysis, and peer architectural code reviews.',
    invariants: ['No Regressions to Production', 'Sub-100ms Performance Enforcement', 'Peer-Reviewed Pull Requests']
  },
  {
    phase: 'Phase 04',
    title: 'Zero-Downtime Launch & Handover',
    tagline: 'Seamless deployment, real-time observability, and complete IP transfer',
    duration: 'Week 8+',
    icon: Rocket,
    deliverables: [
      'Production Deployment with Zero-Downtime Blue/Green Flow',
      'Real-Time Telemetry & Error Alerting Dashboard',
      'Full Source Code Repository Ownership & IP Transfer',
      'Comprehensive Technical Documentation & Team Handover'
    ],
    description: 'We execute zero-downtime production deployment, configure live monitoring, and transfer complete IP and repository ownership. We provide post-launch warranty support to ensure sustained stability.',
    invariants: ['100% Client IP Ownership', 'Real-Time Observability Configured', '30-Day Post-Launch Warranty']
  }
];

interface ServiceDeliveryProcessProps {
  onOpenConsultation: () => void;
}

export const ServiceDeliveryProcess: React.FC<ServiceDeliveryProcessProps> = ({
  onOpenConsultation,
}) => {
  const [activePhaseIndex, setActivePhaseIndex] = useState<number>(0);
  const shouldReduceMotion = useReducedMotion();

  const currentPhase = PHASES[activePhaseIndex];
  const CurrentIcon = currentPhase.icon;

  return (
    <div className="rounded-3xl bg-[#0e0e0e] border border-[#222222] p-6 sm:p-8 lg:p-10 relative overflow-hidden">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#1c1c1c]">
        <div>
          <div className="flex items-center gap-2 mb-2 text-xs font-mono font-bold text-[#c9a84c] uppercase tracking-wider">
            <Rocket className="w-4 h-4" />
            <span>Delivery Methodology</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Our 4-Phase Engineering Delivery Lifecycle
          </h3>
          <p className="text-sm text-[#999999] mt-2 max-w-2xl leading-relaxed">
            From initial architectural audit to zero-downtime production launch, our process enforces predictability, rigorous automated testing, and full transparency.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-[#c9a84c] shrink-0">
          <Clock className="w-4 h-4" />
          <span>Bi-Weekly Sprint Cadence</span>
        </div>
      </div>

      {/* Step Indicators */}
      <div className="py-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {PHASES.map((phase, idx) => {
            const isCurrent = idx === activePhaseIndex;
            const PhaseIcon = phase.icon;

            return (
              <button
                key={phase.phase}
                onClick={() => setActivePhaseIndex(idx)}
                className={`p-4 sm:p-5 rounded-2xl text-left border transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c] group ${
                  isCurrent
                    ? 'bg-[#181818] border-[#c9a84c] shadow-lg shadow-black/80'
                    : 'bg-[#121212] border-[#222222] hover:bg-[#151515] hover:border-[#383838]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                      isCurrent
                        ? 'bg-[#c9a84c] text-black font-bold'
                        : 'bg-[#1c1c1c] text-[#c9a84c] group-hover:bg-[#252525]'
                    }`}
                  >
                    <PhaseIcon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-mono text-[#777777]">{phase.duration}</span>
                </div>

                <div className="text-[11px] font-mono text-[#c9a84c] uppercase">
                  {phase.phase}
                </div>
                <div className="text-sm sm:text-base font-bold text-white mt-0.5 truncate">
                  {phase.title}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Phase Detail Display */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPhase.phase}
          initial={shouldReduceMotion ? undefined : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={shouldReduceMotion ? undefined : { opacity: 0, y: -12 }}
          transition={{ duration: 0.25 }}
          className="rounded-2xl bg-[#141414] border border-[#242424] p-6 sm:p-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Scope & Rationale */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs font-mono font-bold text-[#c9a84c] uppercase">
                  {currentPhase.phase} Execution Milestone · {currentPhase.duration}
                </span>
                <h4 className="text-2xl font-black text-white mt-1">
                  {currentPhase.title}
                </h4>
                <p className="text-sm text-[#aaaaaa] mt-1 font-medium">
                  {currentPhase.tagline}
                </p>
              </div>

              <p className="text-sm sm:text-base text-[#cccccc] leading-relaxed">
                {currentPhase.description}
              </p>

              <div>
                <span className="text-xs font-bold text-[#777777] uppercase tracking-wider block mb-2.5">
                  Phase Invariants & Quality Gates
                </span>
                <div className="flex flex-wrap gap-2">
                  {currentPhase.invariants.map((inv, iIdx) => (
                    <span
                      key={iIdx}
                      className="px-3 py-1.5 rounded-lg bg-[#101010] border border-[#242424] text-xs font-mono text-[#c9a84c] flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#c9a84c]" />
                      <span>{inv}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Key Deliverables Checklist */}
            <div className="lg:col-span-5 bg-[#0e0e0e] border border-[#222222] rounded-2xl p-6 sm:p-7 flex flex-col justify-between space-y-6">
              <div>
                <div className="text-xs font-bold text-white uppercase tracking-wider pb-2 border-b border-[#202020] mb-4">
                  Tangible Deliverables Produced
                </div>

                <ul className="space-y-3">
                  {currentPhase.deliverables.map((item, dIdx) => (
                    <li key={dIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#cccccc]">
                      <CheckCircle2 className="w-4 h-4 text-[#c9a84c] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <AnimatedButton
                onClick={onOpenConsultation}
                variant="primary"
                size="md"
                fullWidth
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Start with {currentPhase.phase} Audit
              </AnimatedButton>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
