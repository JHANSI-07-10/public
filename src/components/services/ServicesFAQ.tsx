import React from 'react';
import { HelpCircle, ArrowRight } from 'lucide-react';
import { Accordion, AccordionItem } from '../motion/Accordion';
import { AnimatedButton } from '../motion/AnimatedButton';

interface ServicesFAQProps {
  onOpenConsultation: () => void;
}

const FAQ_ITEMS: AccordionItem[] = [
  {
    id: 'ip-ownership',
    title: 'Who owns the intellectual property and source code upon project completion?',
    content: (
      <div className="space-y-2 text-sm text-[#cccccc] leading-relaxed">
        <p>
          <strong className="text-white">100% full ownership belongs to your company.</strong> All source code, design systems, Docker configurations, database schemas, and documentation are transferred directly into your company’s Git repositories upon completion of each agreed milestone.
        </p>
        <p className="text-xs text-[#999999]">
          There are zero recurring vendor lock-ins or proprietary license dependencies. You have complete freedom to maintain, scale, or transition the codebase with your internal engineering team.
        </p>
      </div>
    ),
  },
  {
    id: 'legacy-migration',
    title: 'Can you integrate with our existing legacy database or internal microservices?',
    content: (
      <div className="space-y-2 text-sm text-[#cccccc] leading-relaxed">
        <p>
          Yes. Our Java full-stack team specializes in integrating with existing enterprise backends (PostgreSQL, MySQL, Oracle, MongoDB) and legacy ERP/CRM systems.
        </p>
        <p className="text-xs text-[#999999]">
          We typically employ strangler-fig or anti-corruption layer patterns to modernize critical workflows incrementally without disrupting live daily transactions or customer access.
        </p>
      </div>
    ),
  },
  {
    id: 'concurrency-perf',
    title: 'How do you guarantee performance under high-concurrency traffic surges?',
    content: (
      <div className="space-y-2 text-sm text-[#cccccc] leading-relaxed">
        <p>
          Every architecture is stress-tested under simulated concurrent loads using automated k6 and JMeter suites before staging sign-off.
        </p>
        <p className="text-xs text-[#999999]">
          For Java backends, we leverage Spring Boot 3 with virtual threads, connection pooling, and multi-tier Redis caching to maintain sub-25ms response times even under sudden 10x traffic spikes.
        </p>
      </div>
    ),
  },
  {
    id: 'warranty-sla',
    title: 'What warranty and post-launch maintenance guarantees are provided?',
    content: (
      <div className="space-y-2 text-sm text-[#cccccc] leading-relaxed">
        <p>
          Every production release includes a standard 30-day post-launch warranty covering any unforeseen bugs, latency regressions, or configuration issues at zero additional cost.
        </p>
        <p className="text-xs text-[#999999]">
          Following the warranty period, we offer structured monthly SLA retainers covering proactive security patches, continuous performance monitoring, and dedicated sprint enhancements.
        </p>
      </div>
    ),
  },
  {
    id: 'discovery-audit',
    title: 'What happens during the initial Zero-Obligation Architectural Audit?',
    content: (
      <div className="space-y-2 text-sm text-[#cccccc] leading-relaxed">
        <p>
          During the initial consultation, a senior software architect reviews your project goals, technical constraints, and anticipated scale.
        </p>
        <p className="text-xs text-[#999999]">
          Within 48 hours, we return a high-level architectural blueprint outlining recommended tech stacks, database models, sprint breakdowns, and estimated timelines—with zero commitment required.
        </p>
      </div>
    ),
  },
];

export const ServicesFAQ: React.FC<ServicesFAQProps> = ({ onOpenConsultation }) => {
  return (
    <div className="rounded-3xl bg-[#0e0e0e] border border-[#222222] p-6 sm:p-8 lg:p-10 relative overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#1c1c1c] mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2 text-xs font-mono font-bold text-[#c9a84c] uppercase tracking-wider">
            <HelpCircle className="w-4 h-4" />
            <span>Architectural Inquiries</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Frequently Asked Engineering Questions
          </h3>
          <p className="text-sm text-[#999999] mt-2 max-w-2xl leading-relaxed">
            Direct, transparent answers regarding intellectual property, legacy system integrations, performance guarantees, and sprint models.
          </p>
        </div>

        <AnimatedButton
          onClick={onOpenConsultation}
          variant="secondary"
          size="sm"
          icon={<ArrowRight className="w-4 h-4" />}
        >
          Ask a Custom Question
        </AnimatedButton>
      </div>

      <Accordion items={FAQ_ITEMS} defaultOpenId="ip-ownership" />
    </div>
  );
};
