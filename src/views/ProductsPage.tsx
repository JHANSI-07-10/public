'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Package, 
  Sprout, 
  Layers, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  Info, 
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Cpu,
  Workflow
} from 'lucide-react';
import { SectionHeader } from '../components/ui/SectionHeader';
import { PRODUCTS_PLATFORMS, ProductPlatform, Service } from '../data/content';
import { Reveal } from '../components/motion/Reveal';
import { StaggerContainer, StaggerItem } from '../components/motion/StaggerContainer';
import { AnimatedButton } from '../components/motion/AnimatedButton';
import { PageHeroBackground } from '../components/ui/PageHeroBackground';

interface ProductsPageProps {
  onOpenConsultation?: (service?: Service) => void;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({ onOpenConsultation }) => {
  const getStatusBadgeClass = (status: ProductPlatform['status']) => {
    switch (status) {
      case 'Available':
        return 'bg-emerald-950/80 border-emerald-500/50 text-emerald-400';
      case 'Pilot':
        return 'bg-amber-950/80 border-amber-500/50 text-amber-400';
      case 'In Development':
        return 'bg-sky-950/80 border-sky-500/50 text-sky-400';
      case 'Planned':
      default:
        return 'bg-zinc-900 border-zinc-700 text-zinc-400';
    }
  };

  const getPlatformIcon = (id: string) => {
    switch (id) {
      case 'b2b-logistics':
        return Package;
      case 'agriflow-erp':
        return Sprout;
      case 'enterprise-saas-suite':
      default:
        return Layers;
    }
  };

  return (
    <div className="pt-28 pb-20 bg-[#0a0a0a]">
      {/* 1. Hero Section */}
      <section className="relative py-16 sm:py-24 border-b border-[#1f1f1f] overflow-hidden bg-[#0a0a0a]">
        <PageHeroBackground imageSrc="/about2.webp" position="center 40%" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-[#0a0a0a]/30 pointer-events-none" />
        <div className="absolute inset-0 hero-tech-grid opacity-35 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal>
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 mb-4 px-3.5 py-1.5 rounded-full bg-[#161616] border border-[#2a2a2a]">
                <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
                <span className="text-xs font-bold tracking-widest text-[#DFC067] uppercase select-none font-mono">
                  Proprietary Digital Platforms &amp; Software Concepts
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-[1.1] text-balance mb-5">
                Named Platforms &amp; <span className="text-[#c9a84c]">Enterprise Software</span>.
              </h1>

              <p className="text-base sm:text-lg text-[#a1a1aa] leading-relaxed max-w-3xl text-balance mb-6">
                Discover VPD Technologies' specialized software platforms engineered to streamline logistics coordination, rural agribusiness procurement, and multi-tenant enterprise operations.
              </p>

              {/* Informational Disclaimer Banner */}
              <div className="p-4 rounded-xl bg-[#141414]/90 border border-[#2e2e2e] flex items-start gap-3 max-w-2xl mb-8">
                <Info className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                <p className="text-xs text-[#999999] leading-relaxed">
                  <strong className="text-white font-semibold">Informational Purpose Only:</strong> The platform profiles below describe VPD Technologies' current software developments and pilot initiatives. In compliance with company governance, this public website is strictly an informational company profile and does not provide public account registration, transaction processing, or operational SaaS self-service.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Link href="/contact">
                  <AnimatedButton
                    variant="primary"
                    size="md"
                    icon={<ArrowRight className="w-4 h-4" />}
                  >
                    Request Platform Demonstration
                  </AnimatedButton>
                </Link>
                <Link
                  href="/services"
                  className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-[#2a2a2a] bg-[#161616] px-5 text-sm font-bold text-white hover:border-[#c9a84c]/50 hover:bg-[#1e1e1e] transition-colors"
                >
                  <span>Explore Custom Engineering Services</span>
                  <ChevronRight className="w-4 h-4 text-[#aaaaaa]" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 2. Platforms Detailed Showcase */}
      <section className="py-20 border-b border-[#1f1f1f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeader
              eyebrow="Platform Profiles & Readiness"
              title="Architectural Overviews of VPD Platforms"
              subtitle="Each platform is engineered with strict type safety, event streaming, and modular database schemas to support real-world operating environments."
              align="center"
              className="mb-16"
            />
          </Reveal>

          <div className="space-y-16">
            {PRODUCTS_PLATFORMS.map((platform, index) => {
              const Icon = getPlatformIcon(platform.id);
              return (
                <Reveal key={platform.id} delay={index * 0.1}>
                  <div
                    id={platform.id}
                    className="rounded-2xl border border-[#282828] bg-[#121212]/90 backdrop-blur-xl p-8 sm:p-10 lg:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.6)] hover:border-[#c9a84c]/40 transition-colors duration-300 relative overflow-hidden"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                      {/* Left: Platform Overview, Status Badge, Target Audience */}
                      <div className="lg:col-span-5 space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="w-14 h-14 rounded-xl bg-[#c9a84c]/10 border border-[#c9a84c]/30 flex items-center justify-center text-[#c9a84c]">
                            <Icon className="w-7 h-7" />
                          </div>

                          <div className={`px-3 py-1 rounded-full text-xs font-mono font-bold border ${getStatusBadgeClass(platform.status)}`}>
                            Status: {platform.statusBadge}
                          </div>
                        </div>

                        <div>
                          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#c9a84c] block mb-1">
                            {platform.category}
                          </span>
                          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                            {platform.name}
                          </h2>
                        </div>

                        <p className="text-sm sm:text-base text-[#aaaaaa] leading-relaxed pt-1">
                          {platform.summary}
                        </p>

                        <div className="pt-4 border-t border-[#222222] space-y-2 text-xs">
                          <span className="text-[#666666] font-mono uppercase tracking-wider block font-bold">
                            Target Sector / Audience
                          </span>
                          <p className="text-[#dddddd] leading-relaxed">
                            {platform.targetAudience}
                          </p>
                        </div>
                      </div>

                      {/* Right: High-Level Concepts & Architectural Overview */}
                      <div className="lg:col-span-7 space-y-6">
                        <div className="bg-[#161616]/80 border border-[#262626] rounded-xl p-6 sm:p-7">
                          <h3 className="text-xs font-mono uppercase tracking-widest text-[#D4AF37] font-bold mb-4 flex items-center gap-2">
                            <Workflow className="w-4 h-4 text-[#D4AF37]" />
                            Core Platform Capabilities &amp; Workflows
                          </h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                            {platform.highLevelConcepts.map((concept, cIdx) => (
                              <div
                                key={cIdx}
                                className="flex items-start gap-2.5 p-3 rounded-lg bg-[#121212] border border-[#222222] text-xs text-[#cccccc]"
                              >
                                <CheckCircle2 className="w-4 h-4 text-[#c9a84c] shrink-0 mt-0.5" />
                                <span>{concept}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Architectural Design Note */}
                        <div className="bg-[#141414] border border-[#242424] rounded-xl p-5 sm:p-6 text-xs text-[#999999] leading-relaxed flex items-start gap-3">
                          <Cpu className="w-5 h-5 text-[#888888] shrink-0 mt-0.5" />
                          <div>
                            <span className="text-white font-semibold block mb-1 font-mono uppercase tracking-wider text-[11px]">
                              Architectural Design Note
                            </span>
                            {platform.architectureNote}
                          </div>
                        </div>

                        <div className="pt-2 flex items-center justify-between">
                          <span className="text-xs text-[#666666] font-mono">
                            Informational briefing available upon request
                          </span>
                          <Link
                            href="/contact"
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#c9a84c] hover:text-[#DFC067] transition-colors"
                          >
                            <span>Enquire About {platform.name}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
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

      {/* 3. Bottom CTA */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-[#2e2e2e] bg-gradient-to-b from-[#141414] to-[#0d0d0d] p-8 sm:p-12 text-center relative overflow-hidden">
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-3">
              Explore Enterprise Integration &amp; Pilot Opportunities
            </h2>
            <p className="text-sm sm:text-base text-[#aaaaaa] max-w-xl mx-auto mb-8 leading-relaxed">
              If your organization is seeking to pilot AgriFlow ERP in your agricultural network, or evaluate the B2B Logistics Platform for regional freight management, our engineering leadership is ready to discuss technical prerequisites.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact">
                <AnimatedButton
                  variant="primary"
                  size="lg"
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Request Technical Briefing
                </AnimatedButton>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
