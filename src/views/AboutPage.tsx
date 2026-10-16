'use client';

import React from 'react';
import Link from 'next/link';
import { SectionHeader } from '../components/ui/SectionHeader';
import { DIFFERENTIATORS, KEY_METRICS, Service } from '../data/content';
import { Shield, Cpu, Target, Award, ArrowRight, Rocket, Users, UserRound } from 'lucide-react';
import { Reveal } from '../components/motion/Reveal';
import { StaggerContainer, StaggerItem } from '../components/motion/StaggerContainer';
import { InteractiveCard } from '../components/motion/InteractiveCard';
import { AnimatedButton } from '../components/motion/AnimatedButton';
import { Accordion } from '../components/motion/Accordion';
import { ProjectJourneyTimeline } from '../components/about/ProjectJourneyTimeline';
import { CurvedTravelingBeam } from '../components/motion/CurvedTravelingBeam';

interface AboutPageProps {
  onOpenConsultation: (service?: Service) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenConsultation }) => {
  const faqs = [
    {
      id: 'faq-1',
      title: 'What core technologies does VPD Technologies specialize in?',
      content: 'We specialize in high-performance web engineering using React and Next.js, scalable enterprise backend solutions with Java and Spring Boot, and robust cloud architectures.'
    },
    {
      id: 'faq-2',
      title: 'How does VPD Technologies handle software scalability?',
      content: 'We design systems with scalability in mind from day one, utilizing microservices architectures, cloud-native deployments, and optimized database strategies to handle rapid user growth.'
    },
    {
      id: 'faq-3',
      title: 'Does VPD Technologies provide custom SaaS development?',
      content: 'Yes, we specialize in building custom SaaS platforms, focusing on multi-tenancy, high availability, and seamless user experiences.'
    }
  ];

  const pillars = [
    {
      icon: Cpu,
      title: 'Engineered Precision',
      description: 'Our codebases are built upon rigid technical standards, ensuring zero-waste execution, sub-100ms response times, and high density performance.'
    },
    {
      icon: Target,
      title: 'Multi-Tier Unified Stack',
      description: 'Expertise across Java, React, and cloud architectures for unified digital ecosystems that seamlessly connect client frontends with core backends.'
    },
    {
      icon: Shield,
      title: 'Verified Security Protocols',
      description: 'Protocol-level security integrated into every layer of the application lifecycle, including AES-256 encryption, TLS 1.3, and ISO 27001 compliance standards.'
    }
  ];

  return (
    <div className="pt-20 sm:pt-24 pb-12 bg-[#0a0a0a]">
      {/* 1. Page Hero: About VPD Technologies */}
      <section className="relative py-10 sm:py-14 border-b border-[#1f1f1f] overflow-hidden bg-[#0a0a0a]">
        {/* Ambient Brand Aesthetics & Golden Radial Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(201,168,76,0.12),transparent_65%)] pointer-events-none" />
        <div className="absolute inset-0 hero-tech-grid opacity-25 pointer-events-none" />
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[640px] h-[260px] bg-[#c9a84c]/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal>
            <div className="flex flex-col items-center text-center">
              {/* Category Eyebrow Pill */}
              <div className="inline-flex items-center gap-2 mb-4 px-3.5 py-1 rounded-full bg-[#141414] border border-[#c9a84c]/30 shadow-[0_0_20px_-4px_rgba(201,168,76,0.18)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c9a84c] animate-pulse" />
                <span className="text-[11px] font-mono font-bold tracking-widest text-[#d8b75b] uppercase select-none">
                  About VPD Technologies
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] mb-4">
                Engineering Innovation.{' '}
                <span className="text-[#DFC067] drop-shadow-[0_0_24px_rgba(201,168,76,0.22)]">
                  Empowering Progress.
                </span>
              </h1>

              <div className="max-w-4xl space-y-3 text-base sm:text-lg text-[#9e9e9e] leading-relaxed mb-6">
                <p className="text-white font-medium text-lg sm:text-xl">
                  VPD Technologies Private Limited is a technology company headquartered in Kurnool, Andhra Pradesh, India. We focus on software products, enterprise applications, and digital solutions that help organizations modernize operations and support business growth.
                </p>
                <p className="text-sm sm:text-base text-[#7e7e7e]">
                  Our approach combines technical expertise, strategic thinking, and collaborative execution to deliver software products and platforms that support operational excellence and long-term business growth.
                </p>
              </div>

              {/* Engineering Pillars Micro-Strip */}
              <div className="inline-flex flex-wrap items-center justify-center gap-2.5 pt-2 border-t border-[#1a1a1a]">
                <span className="text-xs font-mono text-[#888888] px-3 py-1 rounded-md bg-[#121212] border border-[#222222]">
                  Enterprise Architecture
                </span>
                <span className="text-xs font-mono text-[#888888] px-3 py-1 rounded-md bg-[#121212] border border-[#222222]">
                  Scalable Cloud Platforms
                </span>
                <span className="text-xs font-mono text-[#888888] px-3 py-1 rounded-md bg-[#121212] border border-[#222222]">
                  High-Precision Engineering
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Verified Company Track Record Strip */}
      <section className="py-8 bg-[#0c0c0c] border-b border-[#1f1f1f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {KEY_METRICS.map((metric, idx) => (
              <div key={idx} className="flex flex-col items-center text-center p-4 rounded-xl bg-[#121212] border border-[#222222]">
                <span className="text-2xl sm:text-3xl font-black text-[#c9a84c] mb-1 font-mono">
                  {metric.value}
                </span>
                <span className="text-xs sm:text-sm font-bold text-white mb-1">
                  {metric.label}
                </span>
                <span className="text-[11px] text-[#777777] max-w-[200px]">
                  {metric.context}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Founding Leadership Section (Taste-Skill Double-Bezel Architecture) */}
      <section className="relative isolate overflow-hidden py-8 sm:py-12 border-b border-[#1f1f1f] bg-[radial-gradient(ellipse_at_50%_0%,rgba(201,168,76,0.05),transparent_50%),linear-gradient(180deg,#0a0a0a_0%,#080808_100%)]">
        <div className="absolute inset-0 hero-tech-grid opacity-15 pointer-events-none" aria-hidden="true" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal>
            {/* Outer Double-Bezel Shell */}
            <div className="rounded-[2rem] p-1.5 sm:p-2 bg-white/[0.02] border border-white/[0.08] shadow-[0_24px_50px_-20px_rgba(0,0,0,0.9)]">
              {/* Inner Core */}
              <div className="rounded-[calc(2rem-0.375rem)] bg-gradient-to-b from-[#131313] via-[#0e0e0e] to-[#090909] p-6 sm:p-8 lg:p-9 border border-white/[0.05] shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)] relative overflow-hidden">
                {/* Subtle ambient gold glow */}
                <div className="absolute top-0 right-1/4 w-80 h-80 bg-[#c9a84c]/[0.03] rounded-full blur-3xl pointer-events-none" />

                {/* Top Row: Eyebrow + Users Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="inline-flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c9a84c] animate-pulse" />
                    <span className="text-xs font-mono font-bold tracking-widest text-[#c9a84c] uppercase">
                      Founding Leadership
                    </span>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-[#DFC067] shadow-[0_0_12px_rgba(201,168,76,0.1)]">
                    <Users className="w-4 h-4 text-[#DFC067]" />
                  </div>
                </div>

                {/* Headline & Subtitle */}
                <div className="max-w-5xl mb-6">
                  <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2.5">
                    Leadership With a{' '}
                    <span className="text-[#DFC067]">Shared Purpose</span>
                  </h2>
                  <p className="text-sm sm:text-base text-[#9e9e9e] leading-relaxed">
                    VPD Technologies is led by <strong className="text-white font-semibold">Sai Krishna Vuppala</strong>, Founder &amp; Chief Executive Officer, and <strong className="text-white font-semibold">Ramcharan Gottipati</strong>, Co-Founder &amp; Managing Director. Together, they provide strategic and operational leadership driven by a commitment to decentralized innovation—building world-class technology infrastructure, cultivating elite talent beyond conventional metropolitan centers, and delivering transformative digital solutions.
                  </p>
                </div>

                {/* Machined Hairline Divider */}
                <div className="w-full h-px bg-gradient-to-r from-transparent via-white/[0.1] to-transparent mb-6" />

                {/* Two Leadership Columns */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                  {/* Sai Krishna Vuppala */}
                  <div className="group flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl bg-[#1c1c1c] border border-[#c9a84c]/40 flex items-center justify-center text-[#c9a84c] shrink-0">
                      <UserRound className="w-7 h-7" aria-hidden="true" />
                    </div>
                    <div>
                      <div className="text-xs font-mono font-bold tracking-wider text-[#DFC067] uppercase mb-1">
                        Founder &amp; CEO
                      </div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:text-[#DFC067] transition-colors duration-300">
                          Sai Krishna Vuppala
                        </h3>
                        <a
                          href="https://www.linkedin.com/in/vuppala-sai-krishna-545a90175/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#888888] hover:text-[#0a66c2] transition-colors p-1"
                          aria-label="Sai Krishna Vuppala LinkedIn"
                        >
                          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.6 1.6 0 0 0-1.61 1.6 1.6 1.6 0 0 0 1.61 1.6 1.6 1.6 0 0 0 1.6-1.6 1.6 1.6 0 0 0-1.6-1.6Z" />
                          </svg>
                        </a>
                      </div>
                      <p className="text-sm text-[#aaaaaa] leading-relaxed">
                        Strategic vision, enterprise architecture, and company direction
                      </p>
                    </div>
                  </div>

                  {/* Ramcharan Gottipati */}
                  <div className="group flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl bg-[#1c1c1c] border border-[#c9a84c]/40 flex items-center justify-center text-[#c9a84c] shrink-0">
                      <UserRound className="w-7 h-7" aria-hidden="true" />
                    </div>
                    <div>
                      <div className="text-xs font-mono font-bold tracking-wider text-[#DFC067] uppercase mb-1">
                        Co-Founder &amp; Managing Director
                      </div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:text-[#DFC067] transition-colors duration-300">
                          Ramcharan Gottipati
                        </h3>
                        <a
                          href="https://www.linkedin.com/in/ramcharangottipati/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#888888] hover:text-[#0a66c2] transition-colors p-1"
                          aria-label="Ramcharan Gottipati LinkedIn"
                        >
                          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.6 1.6 0 0 0-1.61 1.6 1.6 1.6 0 0 0 1.61 1.6 1.6 1.6 0 0 0 1.6-1.6 1.6 1.6 0 0 0-1.6-1.6Z" />
                          </svg>
                        </a>
                      </div>
                      <p className="text-sm text-[#aaaaaa] leading-relaxed">
                        Operational leadership, delivery governance, and organizational growth
                      </p>
                    </div>
                  </div>
                </div>

                {/* Link to Dedicated Leadership Page */}
                <div className="mt-6 pt-5 border-t border-white/[0.08] flex items-center justify-between">
                  <span className="text-xs text-[#888888]">
                    Read full professional biographies and governance focus
                  </span>
                  <Link
                    href="/about/leadership"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#DFC067] hover:text-white transition-colors"
                  >
                    <span>Meet Our Full Leadership Team</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 3. Our Vision & Our Mission Section */}
      <section className="relative py-8 sm:py-12 border-b border-[#1f1f1f] bg-[radial-gradient(ellipse_at_50%_50%,rgba(201,168,76,0.05),transparent_60%),#0c0c0c] overflow-hidden">
        <div className="absolute inset-0 hero-tech-grid opacity-15 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal>
            <SectionHeader
              eyebrow="Purpose & Direction"
              title="What Drives Us Forward"
              subtitle="The foundational principles driving our technical standards, innovation trajectory, and client partnerships."
              align="center"
              className="!mb-6 sm:!mb-8"
            />
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {/* Vision Card */}
            <Reveal delay={0.05}>
              <div className="h-full rounded-2xl border border-[#222222] bg-[#111111]/90 p-6 sm:p-7 relative overflow-hidden group hover:border-[#c9a84c]/40 transition-all duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-[#181818] border border-[#c9a84c]/30 flex items-center justify-center text-[#DFC067] shadow-[0_0_12px_rgba(201,168,76,0.12)]">
                    <Target className="w-4 h-4" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                    Vision
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-[#aaaaaa] leading-relaxed">
                  Create a trusted digital presence that clearly explains VPD Technologies’ capabilities and helps prospective clients, partners, and candidates understand the company and contact the team.
                </p>
              </div>
            </Reveal>

            {/* Mission Card */}
            <Reveal delay={0.1}>
              <div className="h-full rounded-2xl border border-[#222222] bg-[#111111]/90 p-6 sm:p-7 relative overflow-hidden group hover:border-[#c9a84c]/40 transition-all duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-[#181818] border border-[#c9a84c]/30 flex items-center justify-center text-[#DFC067] shadow-[0_0_12px_rgba(201,168,76,0.12)]">
                    <Rocket className="w-4 h-4" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                    Mission
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-[#aaaaaa] leading-relaxed">
                  To design, develop, and deliver high-quality software products and digital platforms that simplify business operations, accelerate digital transformation, foster innovation, and create lasting value.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Strategic Objectives (PRD Section 2) */}
          <div className="mt-8 rounded-2xl border border-[#222222] bg-[#111111]/90 p-6 sm:p-8">
            <h4 className="text-base sm:text-lg font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#c9a84c]" />
              Strategic Objectives &amp; Delivery Commitments
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-xs sm:text-sm text-[#aaaaaa]">
              <div className="flex items-start gap-2.5">
                <span className="text-[#c9a84c] font-bold">✓</span>
                <span>Establish a credible digital presence for VPD Technologies Private Limited.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="text-[#c9a84c] font-bold">✓</span>
                <span>Explain company profile, founders, leadership, vision, mission, services, and industries.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="text-[#c9a84c] font-bold">✓</span>
                <span>Present B2B Logistics Platform, AgriFlow ERP, and Enterprise SaaS Suite with verified status labels.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="text-[#c9a84c] font-bold">✓</span>
                <span>Showcase approved portfolio examples, project metrics, and client references where permission exists.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="text-[#c9a84c] font-bold">✓</span>
                <span>Make it seamless for prospective clients and partners to contact VPD via email, phone, or simple enquiry.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="text-[#c9a84c] font-bold">✓</span>
                <span>Provide a mobile-friendly, accessible, search-engine-friendly platform that is easy to maintain.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ProjectJourneyTimeline />

      {/* 4. Engineering Pillars */}
      <section className="relative isolate overflow-hidden py-10 sm:py-14 border-b border-[#1f1f1f] bg-[radial-gradient(ellipse_at_90%_35%,rgba(201,168,76,0.07),transparent_38%),#0d0d0d]">
        <div className="absolute -right-24 top-12 h-72 w-72 rounded-full bg-[#c9a84c]/[0.04] blur-3xl pointer-events-none" aria-hidden="true" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeader
              eyebrow="Architectural Pillars"
              title="The Structural DNA of Every VPD Deployment"
              subtitle="How we consistently maintain high velocity without sacrificing stability or security."
              align="center"
              className="!mb-8 sm:!mb-10"
            />
          </Reveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pillars.map((item, idx) => {
              const Icon = item.icon;
              return (
                <StaggerItem key={idx}>
                  <InteractiveCard variant="card" padding="lg" className="h-full">
                    <div className="w-12 h-12 rounded-xl bg-[#c9a84c]/10 border border-[#c9a84c]/30 flex items-center justify-center mb-6">
                      <Icon className="w-6 h-6 text-[#c9a84c]" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[#aaaaaa] leading-relaxed">
                      {item.description}
                    </p>
                  </InteractiveCard>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* 5. Capabilities Grid */}
      <section className="relative isolate overflow-hidden py-10 sm:py-14 border-b border-[#1f1f1f] bg-[radial-gradient(ellipse_at_8%_65%,rgba(201,168,76,0.055),transparent_38%)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeader
              eyebrow="Standard Deliverables"
              title="What Every Client Engagement Guarantees"
              align="center"
              className="!mb-8 sm:!mb-10"
            />
          </Reveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DIFFERENTIATORS.map((diff) => (
              <StaggerItem key={diff.title}>
                <CurvedTravelingBeam className="h-full" radius={16} duration={2.4}>
                  <InteractiveCard
                    variant="card"
                    padding="md"
                    hoverable={false}
                    className="h-full flex flex-col justify-between border-[#242424] bg-[#141414] transition-colors duration-300 group-hover:border-[#383838]"
                  >
                    <div>
                      <h4 className="text-lg font-bold text-white mb-2 transition-all duration-300 group-hover:text-[#DFC067] group-hover:drop-shadow-[0_0_14px_rgba(223,192,103,0.35)]">
                        {diff.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-[#aaaaaa] leading-relaxed">
                        {diff.description}
                      </p>
                    </div>
                  </InteractiveCard>
                </CurvedTravelingBeam>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* 6. Verified Technical FAQs with Accessible Accordion */}
      <section className="relative isolate overflow-hidden py-10 sm:py-14 bg-[radial-gradient(ellipse_at_50%_100%,rgba(201,168,76,0.07),transparent_52%)]">
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeader
              eyebrow="Frequently Asked Questions"
              title="Technical & Engagement FAQs"
              subtitle="Straightforward answers about our engineering capabilities, tech stacks, and scalability strategies."
              align="center"
              className="!mb-8 sm:!mb-10"
            />
          </Reveal>

          <Reveal delay={0.1}>
            <Accordion items={faqs} defaultOpenId="faq-1" />
          </Reveal>

          <div className="mt-8 text-center">
            <AnimatedButton
              onClick={() => onOpenConsultation()}
              variant="outline-gold"
              size="lg"
              icon={<ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />}
              className="group transition-all duration-300"
            >
              Discuss Your Project Requirements
            </AnimatedButton>
          </div>
        </div>
      </section>
    </div>
  );
};
