'use client';

import React, { useState } from 'react';
import { Mail, MapPin } from 'lucide-react';
import { CAREERS_DATA, COMPANY_DATA, Service } from '../data/content';
import { Reveal } from '../components/motion/Reveal';
import { PageHeroBackground } from '../components/ui/PageHeroBackground';
import { RoleCard, type OpenRole, type RoleTint } from '../components/careers/RoleCard';
import { RoleDetailModal } from '../components/careers/RoleDetailModal';
import { CareerApplicationModal } from '../components/careers/CareerApplicationModal';

interface CareersPageProps {
  onOpenConsultation?: (service?: Service) => void;
}

const ROLE_TINTS: RoleTint[] = ['amber', 'teal', 'violet'];

export const CareersPage: React.FC<CareersPageProps> = ({ onOpenConsultation }) => {
  const [detailRole, setDetailRole] = useState<OpenRole | null>(null);
  const [applyRole, setApplyRole] = useState<OpenRole | null>(null);
  const [isApplyOpen, setIsApplyOpen] = useState(false);

  const handleOpenApply = (role: OpenRole | null = null) => {
    setApplyRole(role);
    setIsApplyOpen(true);
  };

  return (
    <div className="pt-28 pb-0 bg-[#0a0a0a]">
      {/* 1. Hero Section */}
      <section className="relative pt-12 sm:pt-16 pb-8 sm:pb-10 border-b border-[#1f1f1f] overflow-hidden bg-[#0a0a0a]">
        <PageHeroBackground imageSrc="/about1.webp" position="center 20%" />
        <div className="absolute inset-0 hero-tech-grid opacity-15 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal>
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 mb-4 px-3.5 py-1.5 rounded-full bg-[#161616] border border-[#2a2a2a]">
                <span className="w-2 h-2 rounded-full bg-[#c9a84c] animate-pulse" />
                <span className="text-xs font-bold tracking-widest text-[#DFC067] uppercase select-none font-mono">
                  Careers &amp; Engineering Culture
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-[1.1] text-balance mb-5">
                {CAREERS_DATA.headline}
              </h1>

              <p className="text-base sm:text-lg text-[#a1a1aa] leading-relaxed max-w-3xl text-balance mb-8">
                {CAREERS_DATA.overview}
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <span className="text-xs font-mono text-[#888888] flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#c9a84c]" />
                  Headquartered in Kurnool, Andhra Pradesh
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Open Roles Directory — List Format */}
      <section className="pt-6 sm:pt-8 pb-8 sm:pb-10 border-b border-[#1f1f1f] bg-[#0c0c0c]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header row for list */}
          <div className="flex items-center justify-between mb-3 max-w-5xl mx-auto px-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#c9a84c] animate-pulse" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#DFC067]">
                Open Positions ({CAREERS_DATA.openRoles.length})
              </span>
            </div>
            <span className="text-xs font-mono text-[#777777] hidden sm:inline">
              Kurnool, Andhra Pradesh · Hybrid / On-site
            </span>
          </div>

          <div className="max-w-5xl mx-auto w-full divide-y divide-[#242424]">
            {CAREERS_DATA.openRoles.map((role, idx) => (
              <RoleCard
                key={role.id}
                role={role}
                tint={ROLE_TINTS[idx % ROLE_TINTS.length]}
                onDetails={setDetailRole}
                onApply={handleOpenApply}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Direct Email Submission Callout */}
      <section className="py-8 sm:py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-[#2e2e2e] bg-gradient-to-b from-[#141414] to-[#0d0d0d] p-8 sm:p-10 text-center relative overflow-hidden">
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-3">
              Don't See Your Exact Role?
            </h2>
            <p className="text-sm sm:text-base text-[#aaaaaa] max-w-xl mx-auto mb-6 leading-relaxed">
              We are always excited to hear from talented developers, UI/UX designers, and technical writers based in Kurnool or open to hybrid collaboration.
            </p>
            <div className="inline-flex items-center gap-2 p-3 rounded-xl bg-[#181818] border border-[#2a2a2a] text-xs font-mono text-white">
              <span>Recruitment Inbox:</span>
              <a
                href={`mailto:${COMPANY_DATA.recruitmentEmail}`}
                className="text-[#c9a84c] hover:underline font-bold"
              >
                {COMPANY_DATA.recruitmentEmail}
              </a>
            </div>
          </div>
        </div>
      </section>

      <RoleDetailModal
        role={detailRole}
        onClose={() => setDetailRole(null)}
        onApply={handleOpenApply}
      />

      <CareerApplicationModal
        isOpen={isApplyOpen}
        role={applyRole}
        onClose={() => {
          setIsApplyOpen(false);
          setApplyRole(null);
        }}
      />
    </div>
  );
};
