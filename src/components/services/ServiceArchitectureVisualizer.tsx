'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { 
  Monitor, 
  ShieldCheck, 
  Cpu, 
  Database, 
  Activity, 
  CheckCircle2, 
  Sparkles,
  Server,
  Lock,
  Layers,
  ArrowRight
} from 'lucide-react';
import { AnimatedButton } from '../motion/AnimatedButton';

interface ArchitectureTier {
  id: string;
  name: string;
  category: string;
  icon: React.ElementType;
  techs: string[];
  latency: string;
  sla: string;
  description: string;
  specs: { label: string; value: string }[];
  pattern: string;
}

const ARCHITECTURE_TIERS: ArchitectureTier[] = [
  {
    id: 'presentation',
    name: 'Presentation & Client Layer',
    category: 'Edge Optimized UI',
    icon: Monitor,
    techs: ['React 19', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Edge CDN'],
    latency: '< 80ms First Paint',
    sla: '100% Core Web Vitals Pass',
    description: 'Ultra-responsive client interface compiled with atomic CSS and code-split chunks. Direct edge caching guarantees immediate interaction with zero layout shift.',
    specs: [
      { label: 'Bundle Budgets', value: '< 150KB initial gzip' },
      { label: 'Render Mode', value: 'Hydrated Hybrid / SPA' },
      { label: 'State Model', value: 'Reactive Local & Server Cache' },
      { label: 'Accessibility', value: 'WCAG 2.1 AA Compliant' }
    ],
    pattern: 'Atomic Design & Headless UI Components'
  },
  {
    id: 'gateway',
    name: 'Security & API Gateway',
    category: 'Zero-Trust Ingress',
    icon: ShieldCheck,
    techs: ['Spring Cloud Gateway', 'OAuth2 / JWT', 'Strict CSP', 'Rate Limiter', 'WAF'],
    latency: '< 12ms Gateway Overhead',
    sla: '99.999% Ingress Availability',
    description: 'Hardware-accelerated reverse proxy with automated token rotation, encrypted request validation, and DDoS mitigation before traffic reaches core services.',
    specs: [
      { label: 'Auth Protocol', value: 'OAuth2.0 / PKCE + JWT' },
      { label: 'Encryption', value: 'TLS 1.3 & AES-256 in Transit' },
      { label: 'Rate Limiting', value: 'Token Bucket / Redis-Backed' },
      { label: 'Ingress Policy', value: 'Strict Origin & CSP Headering' }
    ],
    pattern: 'BFF (Backend for Frontend) & Token Relay'
  },
  {
    id: 'core',
    name: 'Processing Core & Microservices',
    category: 'Java / High Concurrency',
    icon: Cpu,
    techs: ['Java 21 LTS', 'Spring Boot 3', 'WebSockets', 'Kafka / RabbitMQ', 'Docker'],
    latency: '< 25ms P99 Service Time',
    sla: 'Zero Data Loss Failover',
    description: 'Resilient, strictly type-safe backend services architected for millions of concurrent transactions. Virtual threads provide massive asynchronous throughput.',
    specs: [
      { label: 'Concurrency', value: 'Java 21 Project Loom Fibers' },
      { label: 'Architecture', value: 'Hexagonal / Domain-Driven' },
      { label: 'Event Streaming', value: 'Bi-directional Real-Time Bus' },
      { label: 'Containerization', value: 'OCI-Compliant Docker Images' }
    ],
    pattern: 'Hexagonal Architecture & Event-Driven Sagas'
  },
  {
    id: 'persistence',
    name: 'Data Persistence & Caching',
    category: 'ACID & Edge Cache',
    icon: Database,
    techs: ['PostgreSQL 16', 'Redis Cluster', 'Flyway Migrations', 'Hibernate / JPA'],
    latency: '< 5ms Cached / < 20ms Query',
    sla: 'Point-in-Time Recovery (PITR)',
    description: 'Multi-AZ relational databases with read-replicas and distributed Redis caching. Strict schema versioning prevents breaking production migrations.',
    specs: [
      { label: 'Consistency', value: 'Full ACID Transactional Guarantees' },
      { label: 'Caching Tier', value: 'Sub-millisecond Redis Memory Cache' },
      { label: 'Migration Engine', value: 'Flyway Automated Schema Audits' },
      { label: 'Backup Policy', value: 'Hourly Snapshots & Geo-Replication' }
    ],
    pattern: 'CQRS & Read/Write Database Segregation'
  }
];

interface ServiceArchitectureVisualizerProps {
  onOpenConsultation: () => void;
}

export const ServiceArchitectureVisualizer: React.FC<ServiceArchitectureVisualizerProps> = ({
  onOpenConsultation,
}) => {
  const [activeTierId, setActiveTierId] = useState<string>('core');
  const shouldReduceMotion = useReducedMotion();

  const activeTier = ARCHITECTURE_TIERS.find((t) => t.id === activeTierId) || ARCHITECTURE_TIERS[0];
  const ActiveIcon = activeTier.icon;

  return (
    <div className="rounded-3xl bg-[#0e0e0e] border border-[#222222] p-6 sm:p-8 lg:p-10 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#c9a84c]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#1c1c1c]">
        <div>
          <div className="flex items-center gap-2 mb-2 text-xs font-mono font-bold text-[#c9a84c] uppercase tracking-wider">
            <Layers className="w-4 h-4" />
            <span>Interactive Topology Visualizer</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            How We Architect Mission-Critical Systems
          </h3>
          <p className="text-sm text-[#999999] mt-2 max-w-2xl leading-relaxed">
            Click through each layer to inspect technical invariants, security boundaries, throughput metrics, and resilience strategies.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="flex h-2.5 w-2.5 rounded-full bg-[#c9a84c] animate-pulse" />
          <span className="text-xs font-mono text-[#aaaaaa]">Live Architecture Matrix</span>
        </div>
      </div>

      {/* Interactive Topology Stream Pipeline */}
      <div className="py-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 relative">
          {ARCHITECTURE_TIERS.map((tier, idx) => {
            const isSelected = tier.id === activeTierId;
            const TierIcon = tier.icon;

            return (
              <button
                key={tier.id}
                onClick={() => setActiveTierId(tier.id)}
                className={`relative p-4 sm:p-5 rounded-2xl text-left transition-all duration-300 border focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c] cursor-pointer group ${
                  isSelected
                    ? 'bg-[#181818] border-[#c9a84c] shadow-lg shadow-black/80'
                    : 'bg-[#121212] border-[#222222] hover:bg-[#161616] hover:border-[#383838]'
                }`}
              >
                {/* Connector indicator for desktop */}
                {idx < ARCHITECTURE_TIERS.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-[#444444] pointer-events-none">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                )}

                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                      isSelected
                        ? 'bg-[#c9a84c] text-black font-bold'
                        : 'bg-[#1c1c1c] text-[#c9a84c] group-hover:bg-[#252525]'
                    }`}
                  >
                    <TierIcon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono text-[#666666]">
                    0{idx + 1}
                  </span>
                </div>

                <div className="text-xs font-semibold text-[#888888] uppercase tracking-wider">
                  {tier.category}
                </div>
                <div className="text-sm sm:text-base font-bold text-white mt-0.5 truncate">
                  {tier.name.split(' ')[0]} {tier.name.split(' ')[1] || ''}
                </div>

                <div className="mt-3 flex items-center justify-between text-xs pt-3 border-t border-[#1f1f1f]">
                  <span className="font-mono text-[#c9a84c]">{tier.latency}</span>
                  <span className="text-[#666666] group-hover:text-white transition-colors">
                    {isSelected ? 'Viewing' : 'Inspect'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Layer Deep-Dive Detail View */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTier.id}
          initial={shouldReduceMotion ? undefined : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={shouldReduceMotion ? undefined : { opacity: 0, y: -12 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="rounded-2xl bg-[#141414] border border-[#242424] p-6 sm:p-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Summary & Invariants */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#c9a84c]/10 border border-[#c9a84c]/30 flex items-center justify-center shrink-0">
                  <ActiveIcon className="w-6 h-6 text-[#c9a84c]" />
                </div>
                <div>
                  <span className="text-xs font-mono font-bold text-[#c9a84c] uppercase">
                    Architectural Invariant Tier · {activeTier.category}
                  </span>
                  <h4 className="text-xl sm:text-2xl font-black text-white mt-0.5">
                    {activeTier.name}
                  </h4>
                </div>
              </div>

              <p className="text-sm sm:text-base text-[#cccccc] leading-relaxed">
                {activeTier.description}
              </p>

              {/* Stack Badges */}
              <div>
                <span className="text-xs font-bold text-[#777777] uppercase tracking-wider block mb-2.5">
                  Core Technologies & Frameworks
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeTier.techs.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-lg bg-[#1a1a1a] border border-[#2e2e2e] text-xs font-mono text-[#dddddd]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Design Pattern Callout */}
              <div className="p-4 rounded-xl bg-[#101010] border border-[#222222] flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#c9a84c] shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    Design Pattern: {activeTier.pattern}
                  </span>
                  <p className="text-xs text-[#999999] mt-0.5">
                    Engineered to isolate domain logic from external transport layers, maximizing testability and preventing technical debt.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Key Operational Benchmarks & CTA */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-5 sm:p-6 rounded-2xl bg-[#0d0d0d] border border-[#222222] space-y-4">
                <div className="text-xs font-bold text-white uppercase tracking-wider pb-2 border-b border-[#202020]">
                  System Guarantees & Specs
                </div>

                <div className="space-y-3">
                  {activeTier.specs.map((spec, sIdx) => (
                    <div key={sIdx} className="flex justify-between items-center text-xs">
                      <span className="text-[#888888]">{spec.label}</span>
                      <span className="font-mono font-semibold text-white text-right">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-[#202020] grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-[#141414] border border-[#242424]">
                    <span className="text-xs text-[#777777] uppercase font-bold block mb-1">
                      Latency Target
                    </span>
                    <span className="text-xs font-mono font-bold text-[#c9a84c]">
                      {activeTier.latency}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#141414] border border-[#242424]">
                    <span className="text-xs text-[#777777] uppercase font-bold block mb-1">
                      Reliability Target
                    </span>
                    <span className="text-xs font-mono font-bold text-white">
                      {activeTier.sla}
                    </span>
                  </div>
                </div>
              </div>

              <AnimatedButton
                onClick={onOpenConsultation}
                variant="primary"
                size="md"
                fullWidth
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Consult on {activeTier.name.split(' ')[0]} Architecture
              </AnimatedButton>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
