'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Briefcase, 
  MapPin, 
  Mail, 
  ArrowRight, 
  CheckCircle2, 
  Terminal, 
  Code2, 
  Compass, 
  ShieldCheck,
  Building2,
  Users
} from 'lucide-react';
import { SectionHeader } from '../components/ui/SectionHeader';
import { CAREERS_DATA, COMPANY_DATA, Service } from '../data/content';
import { Reveal } from '../components/motion/Reveal';
import { StaggerContainer, StaggerItem } from '../components/motion/StaggerContainer';
import { AnimatedButton } from '../components/motion/AnimatedButton';
import { PageHeroBackground } from '../components/ui/PageHeroBackground';

interface CareersPageProps {
  onOpenConsultation?: (service?: Service) => void;
}

export const CareersPage: React.FC<CareersPageProps> = ({ onOpenConsultation }) => {
  return (
    <div className="pt-28 pb-20 bg-[#0a0a0a]">
      {/* 1. Hero Section */}
      <section className="relative py-16 sm:py-24 border-b border-[#1f1f1f] overflow-hidden bg-[#0a0a0a]">
        <PageHeroBackground imageSrc="/about1.webp" position="center 20%" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-[#0a0a0a]/30 pointer-events-none" />
        <div className="absolute inset-0 hero-tech-grid opacity-35 pointer-events-none" />
        
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
                <a
                  href={`mailto:${COMPANY_DATA.recruitmentEmail}?subject=${encodeURIComponent('Career Inquiry: VPD Technologies')}`}
                  className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-[#c9a84c] px-6 text-sm font-bold text-black hover:bg-[#d8b75b] transition-colors shadow-lg shadow-[#c9a84c]/20"
                >
                  <Mail className="w-4 h-4" />
                  <span>Send Your CV to Engineering Team</span>
                </a>

                <span className="text-xs font-mono text-[#888888] flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#c9a84c]" />
                  Headquartered in Kurnool, Andhra Pradesh
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 2. Engineering Culture & Values */}
      <section className="py-20 border-b border-[#1f1f1f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeader
              eyebrow="Why Build With VPD"
              title="A Culture Founded on Craft, Ownership &amp; Precision"
              subtitle="We offer high-ownership roles free of corporate hierarchy where your engineering directly impacts production deployments."
              align="center"
              className="mb-16"
            />
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CAREERS_DATA.values.map((val, idx) => (
              <Reveal key={val.title} delay={idx * 0.08}>
                <div className="p-6 sm:p-7 rounded-2xl bg-[#121212] border border-[#242424] h-full flex flex-col justify-between hover:border-[#c9a84c]/40 transition-colors">
                  <div>
                    <div className="text-xs font-mono font-bold text-[#c9a84c] mb-3">
                      0{idx + 1}.
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">
                      {val.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#aaaaaa] leading-relaxed">
                      {val.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Open Roles / Practice Areas */}
      <section className="py-20 border-b border-[#1f1f1f] bg-[#0c0c0c]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeader
              eyebrow="Active Engineering Disciplines"
              title="Explore Engineering Openings &amp; Interest Areas"
              subtitle="We are continually seeking passionate builders who take pride in writing elegant, durable, and type-safe software."
              align="center"
              className="mb-16"
            />
          </Reveal>

          <div className="space-y-8 max-w-4xl mx-auto">
            {CAREERS_DATA.openRoles.map((role, idx) => (
              <Reveal key={role.id} delay={idx * 0.1}>
                <div className="rounded-2xl border border-[#262626] bg-[#141414] p-7 sm:p-8 hover:border-[#c9a84c]/40 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="px-2.5 py-0.5 rounded-full bg-[#1c1c1c] border border-[#333333] text-[11px] font-mono text-[#c9a84c]">
                          {role.department}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-[#1c1c1c] border border-[#333333] text-[11px] font-mono text-[#888888]">
                          {role.type}
                        </span>
                      </div>
                      <h2 className="text-xl sm:text-2xl font-bold text-white">
                        {role.title}
                      </h2>
                    </div>

                    <a
                      href={`mailto:${COMPANY_DATA.recruitmentEmail}?subject=${encodeURIComponent(`Application: ${role.title}`)}`}
                      className="inline-flex min-h-[40px] items-center justify-center gap-2 rounded-xl border border-[#c9a84c]/50 bg-[#1c1c1c] px-4 text-xs font-bold text-white hover:bg-[#c9a84c] hover:text-black transition-colors shrink-0"
                    >
                      <span>Apply via Email</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  <p className="text-sm text-[#aaaaaa] leading-relaxed mb-6">
                    {role.overview}
                  </p>

                  <div>
                    <h3 className="text-xs font-mono uppercase tracking-wider text-[#777777] mb-2 font-bold">
                      Key Competencies &amp; Prerequisites:
                    </h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#cccccc]">
                      {role.requirements.map((req, rIdx) => (
                        <li key={rIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#c9a84c] shrink-0 mt-0.5" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#222222] flex items-center justify-between text-xs text-[#777777]">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#c9a84c]" />
                      {role.location}
                    </span>
                    <span className="font-mono">Direct Founder &amp; Lead Review</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Direct Email Submission Callout */}
      <section className="py-16">
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
    </div>
  );
};
