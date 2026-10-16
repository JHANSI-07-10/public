'use client';

import React, { useState } from 'react';
import { Check, Minus, ArrowRight, ShieldCheck, Zap, Database, Server } from 'lucide-react';
import { CORE_SERVICES, Service } from '../../data/content';
import { AnimatedButton } from '../motion/AnimatedButton';

interface ServiceComparisonMatrixProps {
  onOpenConsultation: (service?: Service) => void;
}

interface MatrixRow {
  dimension: string;
  category: 'core' | 'perf' | 'security' | 'delivery';
  webDev: string;
  webApp: string;
  enterpriseStack: string;
}

const COMPARISON_ROWS: MatrixRow[] = [
  {
    dimension: 'Primary Engineering Focus',
    category: 'core',
    webDev: 'Lead capture, SEO authority, and sub-100ms first paint',
    webApp: 'Complex interactive workflows, state orchestration, SaaS ops',
    enterpriseStack: 'Heavy transactional integrity, multi-service resilience, enterprise backends',
  },
  {
    dimension: 'Technology Foundation',
    category: 'core',
    webDev: 'React 19 / Vite / Tailwind CSS / Edge CDN',
    webApp: 'MERN / WebSockets / Edge Serverless / Redis',
    enterpriseStack: 'FastAPI / Python / PostgreSQL / Docker',
  },
  {
    dimension: 'Latency & TTI Benchmark',
    category: 'perf',
    webDev: '< 100ms Time to Interactive (TTI)',
    webApp: '< 50ms Real-Time WebSocket state sync',
    enterpriseStack: '< 20ms High-throughput transactional P99',
  },
  {
    dimension: 'Concurrency & Traffic Model',
    category: 'perf',
    webDev: 'Global Edge Cached (Millions of visits)',
    webApp: 'Horizontally scaled stateful sessions (10k+ concurrent)',
    enterpriseStack: 'Distributed multi-thread clustering (100k+ concurrent)',
  },
  {
    dimension: 'Data Persistence Architecture',
    category: 'core',
    webDev: 'Headless CMS / Flat File / Static Generation',
    webApp: 'Document & Relational hybrid with Redis caching',
    enterpriseStack: 'ACID Relational PostgreSQL with read-replicas & PITR',
  },
  {
    dimension: 'Security & Access Protocols',
    category: 'security',
    webDev: 'Strict CSP / Zero-trust Edge SSL / Sanitized inputs',
    webApp: 'OAuth2 / Multi-Tenant RBAC / Session management',
    enterpriseStack: 'Enterprise ISO 27001 / AES-256 / Banking-grade encryption',
  },
  {
    dimension: 'Typical Delivery Sprint',
    category: 'delivery',
    webDev: '1–2 Sprints (2–4 Weeks)',
    webApp: '3–4 Sprints (6–8 Weeks)',
    enterpriseStack: '5–7 Sprints (10–14 Weeks)',
  },
  {
    dimension: 'Source Code & IP Transfer',
    category: 'delivery',
    webDev: '100% Full client ownership upon final milestone',
    webApp: '100% Full client ownership upon final milestone',
    enterpriseStack: '100% Full client ownership upon final milestone',
  },
];

export const ServiceComparisonMatrix: React.FC<ServiceComparisonMatrixProps> = ({
  onOpenConsultation,
}) => {
  const [activeMobileService, setActiveMobileService] = useState<string>('web-app');

  return (
    <div className="rounded-3xl bg-[#0e0e0e] border border-[#222222] p-6 sm:p-8 lg:p-10 relative overflow-hidden">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#1c1c1c]">
        <div>
          <div className="flex items-center gap-2 mb-2 text-xs font-mono font-bold text-[#c9a84c] uppercase tracking-wider">
            <Server className="w-4 h-4" />
            <span>Architectural Spec Sheet</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Head-to-Head Technical Comparison Matrix
          </h3>
          <p className="text-sm text-[#999999] mt-2 max-w-2xl leading-relaxed">
            Compare latency budgets, security postures, persistence paradigms, and delivery sprint models across our three engineering pillars.
          </p>
        </div>
      </div>

      {/* Mobile Service Selector */}
      <div className="lg:hidden mt-6 mb-4">
        <span className="text-xs font-bold text-[#777777] uppercase tracking-wider block mb-2">
          Compare Against Discipline:
        </span>
        <div className="grid grid-cols-3 gap-2">
          {CORE_SERVICES.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveMobileService(s.id)}
              className={`py-2 px-3 rounded-xl text-xs font-bold border transition-colors ${
                activeMobileService === s.id
                  ? 'bg-[#c9a84c] text-black border-[#c9a84c]'
                  : 'bg-[#141414] text-[#888888] border-[#242424]'
              }`}
            >
              {s.title.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Desktop & Tablet Comparison Table */}
      <div className="hidden lg:block overflow-x-auto mt-8">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#222222]">
              <th className="py-4 px-4 text-xs font-bold text-[#777777] uppercase tracking-wider w-1/4">
                Architectural Dimension
              </th>
              {CORE_SERVICES.map((service) => (
                <th key={service.id} className="py-4 px-4 w-1/4">
                  <div className="text-sm font-bold text-white">{service.title}</div>
                  <div className="text-xs font-mono text-[#c9a84c] mt-0.5">
                    {service.category}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#191919]">
            {COMPARISON_ROWS.map((row, idx) => (
              <tr
                key={idx}
                className="hover:bg-[#141414]/70 transition-colors group"
              >
                <td className="py-4 px-4 text-xs font-semibold text-[#aaaaaa] group-hover:text-white">
                  {row.dimension}
                </td>
                <td className="py-4 px-4 text-xs text-[#dddddd] font-mono leading-relaxed">
                  {row.webDev}
                </td>
                <td className="py-4 px-4 text-xs text-[#dddddd] font-mono leading-relaxed">
                  {row.webApp}
                </td>
                <td className="py-4 px-4 text-xs text-[#c9a84c] font-mono font-medium leading-relaxed">
                  {row.enterpriseStack}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t border-[#222222]">
              <td className="py-6 px-4 text-xs font-bold text-[#777777] uppercase">
                Direct Action
              </td>
              {CORE_SERVICES.map((service) => (
                <td key={service.id} className="py-6 px-4">
                  <button
                    onClick={() => onOpenConsultation(service)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#c9a84c] hover:text-[#e0c46f] transition-colors cursor-pointer group"
                  >
                    <span>Inquire for {service.title.split(' ')[0]}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </td>
              ))}
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Mobile Stacked Card View */}
      <div className="lg:hidden mt-6 space-y-3">
        {COMPARISON_ROWS.map((row, idx) => {
          let value = row.webApp;
          if (activeMobileService === 'web-dev') value = row.webDev;
          if (activeMobileService === 'enterprise-software') value = row.enterpriseStack;

          return (
            <div
              key={idx}
              className="p-4 rounded-xl bg-[#121212] border border-[#222222] space-y-1"
            >
              <div className="text-xs font-bold text-[#777777] uppercase tracking-wider">
                {row.dimension}
              </div>
              <div className="text-xs font-mono text-[#dddddd] leading-relaxed">
                {value}
              </div>
            </div>
          );
        })}

        <div className="pt-4">
          <AnimatedButton
            onClick={() =>
              onOpenConsultation(
                CORE_SERVICES.find((s) => s.id === activeMobileService)
              )
            }
            variant="primary"
            size="md"
            fullWidth
            icon={<ArrowRight className="w-4 h-4" />}
          >
            Inquire for Selected Discipline
          </AnimatedButton>
        </div>
      </div>
    </div>
  );
};
