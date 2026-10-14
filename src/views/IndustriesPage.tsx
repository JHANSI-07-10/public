'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Sprout, 
  Activity, 
  GraduationCap, 
  Factory, 
  Truck, 
  Briefcase, 
  ArrowRight, 
  CheckCircle2, 
  Layers,
  ChevronRight,
  ShieldCheck,
  Cpu
} from 'lucide-react';
import { SectionHeader } from '../components/ui/SectionHeader';
import { INDUSTRIES, Industry, Service } from '../data/content';
import { Reveal } from '../components/motion/Reveal';
import { StaggerContainer, StaggerItem } from '../components/motion/StaggerContainer';
import { AnimatedButton } from '../components/motion/AnimatedButton';
import { PageHeroBackground } from '../components/ui/PageHeroBackground';

interface IndustriesPageProps {
  onOpenConsultation?: (service?: Service) => void;
}

export const IndustriesPage: React.FC<IndustriesPageProps> = ({ onOpenConsultation }) => {
  const getIndustryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sprout':
        return Sprout;
      case 'Activity':
        return Activity;
      case 'GraduationCap':
        return GraduationCap;
      case 'Factory':
        return Factory;
      case 'Truck':
        return Truck;
      case 'Briefcase':
      default:
        return Briefcase;
    }
  };

  return (
    <div className="pt-28 pb-0 bg-[#0a0a0a]">
      {/* 1. Hero Section */}
      <section className="relative pt-12 sm:pt-16 pb-8 sm:pb-10 border-b border-[#1f1f1f] overflow-hidden bg-[#0a0a0a]">
        <PageHeroBackground imageSrc="/industries-hero.webp" position="center 40%" />
        <div className="absolute inset-0 hero-tech-grid opacity-15 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal>
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 mb-4 px-3.5 py-1.5 rounded-full bg-[#161616] border border-[#2a2a2a]">
                <span className="w-2 h-2 rounded-full bg-[#c9a84c] animate-pulse" />
                <span className="text-xs font-bold tracking-widest text-[#DFC067] uppercase select-none font-mono">
                  Industry Capabilities &amp; Sector Domain Focus
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-[1.1] text-balance mb-5">
                Specialized Software Engineering Across <span className="text-[#c9a84c]">Critical Industries</span>.
              </h1>

              <p className="text-base sm:text-lg text-[#a1a1aa] leading-relaxed max-w-3xl text-balance mb-8">
                VPD Technologies engineers domain-tailored software applications and digital platforms that solve real operational friction. From AgriTech supply chains to healthcare compliance and industrial logistics, we deliver verifiable technology value.
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <Link href="/contact">
                  <AnimatedButton
                    variant="primary"
                    size="md"
                    icon={<ArrowRight className="w-4 h-4" />}
                  >
                    Discuss Industry Solution
                  </AnimatedButton>
                </Link>
                <Link
                  href="/products"
                  className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-[#2a2a2a] bg-[#161616] px-5 text-sm font-bold text-white hover:border-[#c9a84c]/50 hover:bg-[#1e1e1e] transition-colors"
                >
                  <span>Explore Platforms (AgriFlow &amp; B2B Logistics)</span>
                  <ChevronRight className="w-4 h-4 text-[#aaaaaa]" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 2. Industries Detailed Showcase Grid */}
      <section className="pt-8 sm:pt-10 pb-16 sm:pb-20 border-b border-[#1f1f1f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeader
              eyebrow="Sector Coverage"
              title="Tailored Engineering for High-Stakes Operations"
              subtitle="Explore how VPD Technologies resolves industry-specific bottlenecks with high-throughput architectures and intuitive user workflows."
              align="center"
              className="mb-10 sm:mb-12"
            />
          </Reveal>

          <div className="space-y-12">
            {INDUSTRIES.map((industry, index) => {
              const Icon = getIndustryIcon(industry.icon);
              return (
                <Reveal key={industry.id} delay={index * 0.08}>
                  <div
                    id={industry.id}
                    className="silver-card-hover group rounded-2xl border border-[#262626] bg-[#121212]/90 backdrop-blur-xl p-8 sm:p-10 lg:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden"
                  >
                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                      {/* Left: Sector Header, Icon, Tagline, Overview */}
                      <div className="lg:col-span-5 space-y-4">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 rounded-xl bg-[#c9a84c]/10 border border-[#c9a84c]/30 flex items-center justify-center text-[#c9a84c]">
                            <Icon className="w-7 h-7" />
                          </div>
                          <div>
                            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#c9a84c]">
                              {industry.tagline}
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                              {industry.name}
                            </h2>
                          </div>
                        </div>

                        <p className="text-sm sm:text-base text-[#aaaaaa] leading-relaxed pt-2">
                          {industry.description}
                        </p>

                        <div className="pt-4">
                          <span className="text-xs font-mono uppercase tracking-wider text-[#777777] block mb-2 font-bold">
                            Applied Technology Stack
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {industry.keyTech.map((tech) => (
                              <span
                                key={tech}
                                className="px-3 py-1 rounded-md bg-[#181818] border border-[#2a2a2a] text-xs font-mono text-[#D4AF37]"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Right: Challenges vs VPD Solutions */}
                      <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 bg-[#161616]/70 border border-[#242424] rounded-xl p-6 sm:p-7">
                        {/* Column A: Industry Friction / Challenges */}
                        <div className="space-y-3">
                          <h3 className="text-xs font-mono uppercase tracking-widest text-[#ef4444] font-bold flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-[#ef4444]" />
                            Industry Friction
                          </h3>
                          <ul className="space-y-2.5 text-xs text-[#999999]">
                            {industry.challenges.map((c, cIdx) => (
                              <li key={cIdx} className="flex items-start gap-2 leading-relaxed">
                                <span className="text-[#666666] font-mono mt-0.5">•</span>
                                <span>{c}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Column B: VPD Engineering Solution */}
                        <div className="space-y-3">
                          <h3 className="text-xs font-mono uppercase tracking-widest text-[#22c55e] font-bold flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-[#22c55e]" />
                            VPD Engineered Solution
                          </h3>
                          <ul className="space-y-2.5 text-xs text-[#dddddd]">
                            {industry.vpdSolutions.map((s, sIdx) => (
                              <li key={sIdx} className="flex items-start gap-2 leading-relaxed">
                                <CheckCircle2 className="w-3.5 h-3.5 text-[#22c55e] shrink-0 mt-0.5" />
                                <span>{s}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Bottom Consultation Callout */}
      <section className="pt-8 sm:pt-10 pb-4 sm:pb-6">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="silver-card-hover group rounded-2xl border border-[#2e2e2e] bg-gradient-to-b from-[#141414] to-[#0d0d0d] p-8 sm:p-12 text-center relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-3">
                Need a Domain-Tailored Software Solution?
              </h2>
              <p className="text-sm sm:text-base text-[#aaaaaa] max-w-xl mx-auto mb-8 leading-relaxed">
                Our engineering team works closely with your operational leaders to design, pilot, and deploy software tailored precisely to your sector.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/contact">
                  <AnimatedButton
                    variant="primary"
                    size="lg"
                    icon={<ArrowRight className="w-4 h-4" />}
                  >
                    Schedule an Industry Discovery Call
                  </AnimatedButton>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
