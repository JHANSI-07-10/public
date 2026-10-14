'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Package, 
  Sprout, 
  Layers, 
  ArrowRight, 
  CheckCircle2, 
  ChevronRight, 
  Info,
  Building2
} from 'lucide-react';
import { SectionHeader } from './ui/SectionHeader';
import { PRODUCTS_PLATFORMS, INDUSTRIES, ProductPlatform } from '../data/content';
import { Reveal } from './motion/Reveal';

export const PlatformsPreviewSection: React.FC = () => {
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
    <section id="platforms-preview" className="py-24 bg-[#0a0a0a] border-t border-[#1f1f1f] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <Reveal>
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#161616] border border-[#D4AF37]/30 text-xs font-bold tracking-widest text-[#D4AF37] uppercase mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
              <span>Proprietary Software Systems</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.15] text-balance mb-4">
              Products &amp; Platforms with <span className="text-[#D4AF37]">Verified Status</span>.
            </h2>
            <p className="text-base sm:text-lg text-[#A1A1AA] leading-relaxed text-balance">
              Informational overviews of our proprietary platforms built for agribusiness coordination, multi-hub freight logistics, and modular enterprise SaaS.
            </p>
          </div>
        </Reveal>

        {/* 3 Named Platforms Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {PRODUCTS_PLATFORMS.map((platform, idx) => {
            const Icon = getPlatformIcon(platform.id);
            return (
              <Reveal key={platform.id} delay={idx * 0.1}>
                <div className="rounded-2xl border border-[#262626] bg-[#121212]/90 backdrop-blur-md p-7 h-full flex flex-col justify-between hover:border-[#D4AF37]/50 transition-all duration-300 shadow-xl group">
                  <div>
                    {/* Top Row: Icon + Status Badge */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-12 h-12 rounded-xl bg-[#c9a84c]/10 border border-[#c9a84c]/30 flex items-center justify-center text-[#c9a84c] group-hover:scale-105 transition-transform">
                        <Icon className="w-6 h-6" />
                      </div>

                      <div className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold border ${getStatusBadgeClass(platform.status)}`}>
                        {platform.statusBadge}
                      </div>
                    </div>

                    <span className="text-xs font-mono text-[#D4AF37] uppercase tracking-wider block mb-1">
                      {platform.category}
                    </span>

                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#F2D98D] transition-colors">
                      {platform.name}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#999999] leading-relaxed mb-6">
                      {platform.summary}
                    </p>

                    {/* High-level concepts list */}
                    <div className="space-y-2 mb-6">
                      {platform.highLevelConcepts.slice(0, 3).map((concept, cIdx) => (
                        <div key={cIdx} className="flex items-start gap-2 text-xs text-[#cccccc]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#c9a84c] shrink-0 mt-0.5" />
                          <span className="leading-snug">{concept}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#222222]">
                    <Link
                      href={`/products#${platform.id}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#c9a84c] hover:text-[#DFC067] transition-colors"
                    >
                      <span>Read Platform Architecture</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Industries Preview Banner Strip */}
        <Reveal delay={0.2}>
          <div className="rounded-2xl border border-[#2a2a2a] bg-[#141414] p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left max-w-xl">
              <span className="text-xs font-mono font-bold text-[#D4AF37] uppercase tracking-wider">
                Sector Domain Focus
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                Engineered for AgriTech, Healthcare, Logistics &amp; Manufacturing
              </h3>
              <p className="text-xs sm:text-sm text-[#aaaaaa] leading-relaxed">
                Explore how VPD Technologies builds specialized architectures addressing the operational nuances of each industry.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                href="/industries"
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-[#1c1c1c] border border-[#D4AF37]/50 px-5 text-xs sm:text-sm font-bold text-white hover:bg-[#252525] hover:border-[#D4AF37] transition-colors"
              >
                <span>View All Industries</span>
                <ChevronRight className="w-4 h-4 text-[#D4AF37]" />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
