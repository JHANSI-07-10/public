import React from 'react';
import { SectionHeader } from '../components/ui/SectionHeader';
import { Card } from '../components/ui/Card';
import { COMPANY_DATA, DIFFERENTIATORS, Service } from '../data/content';
import { Shield, Cpu, Target, Award, ArrowRight } from 'lucide-react';
import { Reveal } from '../components/motion/Reveal';
import { StaggerContainer, StaggerItem } from '../components/motion/StaggerContainer';
import { InteractiveCard } from '../components/motion/InteractiveCard';
import { AnimatedButton } from '../components/motion/AnimatedButton';
import { Accordion } from '../components/motion/Accordion';
import { PageHeroBackground } from '../components/ui/PageHeroBackground';

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
    <div className="pt-28 pb-20 bg-[#0a0a0a]">
      {/* Page Hero */}
      <section className="relative py-16 sm:py-24 border-b border-[#1f1f1f] overflow-hidden">
        <PageHeroBackground imageSrc="/about1.webp" position="center 40%" />
        <div className="absolute inset-0 hero-tech-grid opacity-40 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal>
            <SectionHeader
              eyebrow="Company Profile & Philosophy"
              title="Standardizing High-Tier Software Engineering Globally."
              subtitle={COMPANY_DATA.vision}
              align="center"
            />
          </Reveal>
        </div>
      </section>

      {/* Facility Imagery Strip */}
      <section className="relative border-b border-[#1f1f1f] bg-[#0a0a0a] py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <StaggerItem>
              <div className="rounded-2xl overflow-hidden border border-[#262626] aspect-[4/3] bg-[#141414] relative group">
                <img
                  src="/about1.webp"
                  alt="VPD Technologies Innovation Compound"
                  className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-mono text-[#c9a84c]">
                  R&D Architecture Hub
                </div>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="rounded-2xl overflow-hidden border border-[#262626] aspect-[4/3] bg-[#141414] relative group">
                <img
                  src="/about2.webp"
                  alt="Technical Standards & Development"
                  className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-mono text-[#c9a84c]">
                  Engineering Lab
                </div>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="rounded-2xl overflow-hidden border border-[#262626] aspect-[4/3] bg-[#141414] relative group">
                <img
                  src="/about3.webp"
                  alt="System Testing & Scalability Verification"
                  className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-mono text-[#c9a84c]">
                  Quality & Performance Lab
                </div>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* Leadership & Story Section */}
      <section className="relative isolate overflow-hidden py-20 border-b border-[#1f1f1f] bg-[radial-gradient(ellipse_at_12%_45%,rgba(201,168,76,0.08),transparent_42%),linear-gradient(180deg,#0c0c0c_0%,#0a0a0a_100%)]">
        <div className="absolute inset-0 hero-tech-grid opacity-15 pointer-events-none" aria-hidden="true" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <Reveal className="lg:col-span-7">
              <div>
                <div className="text-xs font-bold tracking-widest text-[#c9a84c] uppercase mb-3">
                  Founder's Perspective
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-6">
                  Bridging Deep Engineering with Intuitive Business Value.
                </h2>
                <blockquote className="text-lg sm:text-xl font-medium text-white leading-relaxed mb-6 italic pl-4 border-l-2 border-[#c9a84c]">
                  "{COMPANY_DATA.founder.quote}"
                </blockquote>
                <div className="space-y-4 text-sm text-[#aaaaaa] leading-relaxed mb-8">
                  <p>
                    VPD Technologies Private Limited operates under three governing tenets: <strong>Vision</strong> to identify high-impact technical directions, <strong>Purpose</strong> to design architecture that serves business goals, and <strong>Delivery</strong> to execute on time with zero-defect rigor.
                  </p>
                  <p>
                    Headquartered in Kurnool, Andhra Pradesh, our engineering squads collaborate directly with founders and enterprise technology teams worldwide to build scalable SaaS backends, real-time logistics hubs, and conversion-focused web ecosystems.
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#1c1c1c] border border-[#c9a84c]/50 flex items-center justify-center text-[#c9a84c] font-black text-lg">
                    SK
                  </div>
                  <div>
                    <div className="text-base font-bold text-white">
                      {COMPANY_DATA.founder.name}
                    </div>
                    <div className="text-xs text-[#888888]">
                      {COMPANY_DATA.founder.role} · {COMPANY_DATA.legalName}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.15} className="lg:col-span-5">
              <Card variant="raised" padding="lg">
                <h3 className="text-lg font-bold text-white mb-4 pb-3 border-b border-[#2a2a2a]">
                  Corporate Verification
                </h3>
                <div className="space-y-3.5 text-xs sm:text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#777777]">Legal Entity:</span>
                    <span className="font-medium text-white">{COMPANY_DATA.legalName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#777777]">Incorporation:</span>
                    <span className="font-medium text-white">Companies Act, India</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#777777]">HQ Jurisdiction:</span>
                    <span className="font-medium text-white">{COMPANY_DATA.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#777777]">Security Standards:</span>
                    <span className="font-mono text-[#c9a84c]">ISO 27001 Compliant</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#777777]">Direct Channels:</span>
                    <span className="font-mono text-white">{COMPANY_DATA.phone}</span>
                  </div>
                </div>
              </Card>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 3 Engineering Pillars */}
      <section className="relative isolate overflow-hidden py-20 border-b border-[#1f1f1f] bg-[radial-gradient(ellipse_at_90%_35%,rgba(201,168,76,0.07),transparent_38%),#0d0d0d]">
        <div className="absolute -right-24 top-12 h-72 w-72 rounded-full bg-[#c9a84c]/[0.04] blur-3xl pointer-events-none" aria-hidden="true" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeader
              eyebrow="Architectural Pillars"
              title="The Structural DNA of Every VPD Deployment"
              subtitle="How we consistently maintain high velocity without sacrificing stability or security."
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

      {/* 6 Capabilities Grid */}
      <section className="relative isolate overflow-hidden py-20 border-b border-[#1f1f1f] bg-[radial-gradient(ellipse_at_8%_65%,rgba(201,168,76,0.055),transparent_38%)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeader
              eyebrow="Standard Deliverables"
              title="What Every Client Engagement Guarantees"
            />
          </Reveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DIFFERENTIATORS.map((diff) => (
              <StaggerItem key={diff.number}>
                <InteractiveCard variant="card" padding="md" className="h-full">
                  <div className="text-xs font-mono font-bold text-[#c9a84c] mb-2">
                    {diff.number}.
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">
                    {diff.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#aaaaaa] leading-relaxed">
                    {diff.description}
                  </p>
                </InteractiveCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Verified Technical FAQs with Accessible Accordion */}
      <section className="relative isolate overflow-hidden py-20 bg-[radial-gradient(ellipse_at_50%_100%,rgba(201,168,76,0.07),transparent_52%)]">
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeader
              eyebrow="Frequently Asked Questions"
              title="Technical & Engagement FAQs"
              subtitle="Straightforward answers about our engineering capabilities, tech stacks, and scalability strategies."
              align="center"
            />
          </Reveal>

          <Reveal delay={0.1}>
            <Accordion items={faqs} defaultOpenId="faq-1" />
          </Reveal>

          <div className="mt-12 text-center">
            <AnimatedButton
              onClick={() => onOpenConsultation()}
              variant="primary"
              size="lg"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Discuss Your Project Requirements
            </AnimatedButton>
          </div>
        </div>
      </section>
    </div>
  );
};
