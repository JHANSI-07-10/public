import React from 'react';
import { Shield, Cpu, Target, Award } from 'lucide-react';
import { motion, useReducedMotion, Variants } from 'motion/react';
import { COMPANY_DATA } from '../data/content';
import { SectionHeader } from './ui/SectionHeader';
import { Card } from './ui/Card';
import { Reveal } from './motion/Reveal';
import { StaggerContainer } from './motion/StaggerContainer';
import { WordMaskReveal } from './motion/WordMaskReveal';
import { InteractiveCard } from './motion/InteractiveCard';

export const CompanyIntro: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const pillarVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  const principles = [
    {
      icon: Cpu,
      title: 'Engineered Precision',
      description: 'Our codebases are built upon rigid technical benchmarks, eliminating bloat to guarantee sub-100ms response times and high-density performance.'
    },
    {
      icon: Target,
      title: 'Multi-Tier Stack Harmony',
      description: 'Unified full-stack synergy across React client applications, real-time message brokers, and enterprise Java Spring backends.'
    },
    {
      icon: Shield,
      title: 'Protocol-Grade Security',
      description: 'Enterprise data compliance with AES-256 encryption, strict RBAC authorization boundaries, and ISO 27001 security standards.'
    }
  ];

  return (
    <section id="about" className="py-24 bg-[#0d0d0d] border-t border-[#1f1f1f] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <Reveal>
          <SectionHeader
            eyebrow="Company Philosophy & Pedigree"
            title={<WordMaskReveal text="Vision, Purpose, Delivery. The Foundations of Our Craft." />}
            subtitle={`${COMPANY_DATA.vision} We reject off-the-shelf compromises and opaque agency jargon, replacing them with verifiable architecture and direct accountability.`}
          />
        </Reveal>

        {/* 3 Core Engineering Principles Bento Strip */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {principles.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                variants={shouldReduceMotion ? undefined : pillarVariants}
                className="h-full"
              >
                <InteractiveCard
                  variant="card"
                  padding="lg"
                  className="flex flex-col justify-between h-full"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-[#c9a84c]/10 border border-[#c9a84c]/25 flex items-center justify-center mb-6">
                      <Icon className="w-6 h-6 text-[#c9a84c]" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[#aaaaaa] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </InteractiveCard>
              </motion.div>
            );
          })}
        </StaggerContainer>

        {/* Founder & Leadership Credibility Card */}
        <Reveal delay={0.1}>
          <Card variant="card" padding="lg" hoverable={false} className="relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8">
                <div className="flex items-center gap-2 mb-4">
                  <Award className="w-4 h-4 text-[#c9a84c]" />
                  <span className="text-xs font-bold text-[#c9a84c] uppercase tracking-wider">
                    Leadership Statement
                  </span>
                </div>
                <blockquote className="text-lg sm:text-xl font-medium text-white leading-relaxed mb-6 italic">
                  "{COMPANY_DATA.founder.quote}"
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#1c1c1c] border border-[#c9a84c]/40 flex items-center justify-center text-[#c9a84c] font-black text-lg">
                    SK
                  </div>
                  <div>
                    <div className="text-base font-bold text-white">
                      {COMPANY_DATA.founder.name}
                    </div>
                    <div className="text-xs text-[#888888] font-medium">
                      {COMPANY_DATA.founder.role} · VPD Technologies Private Limited
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-[#242424] pt-6 lg:pt-0 lg:pl-8 flex flex-col justify-center space-y-4">
                <div className="text-xs font-bold uppercase text-[#888888] tracking-wider">
                  Corporate Registration
                </div>
                <div className="space-y-2.5 text-sm text-[#cccccc]">
                  <div className="flex justify-between">
                    <span className="text-[#777777]">Entity:</span>
                    <span className="font-medium text-white">{COMPANY_DATA.legalName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#777777]">HQ Location:</span>
                    <span className="font-medium text-white">{COMPANY_DATA.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#777777]">Active Stack:</span>
                    <span className="font-mono text-xs font-semibold text-[#c9a84c]">Java 21 · React 19 · WebSockets</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </Reveal>
      </div>
    </section>
  );
};
