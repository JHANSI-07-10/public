'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Users, 
  Award, 
  MapPin, 
  ArrowRight, 
  ShieldCheck, 
  Code2, 
  Workflow, 
  CheckCircle2, 
  Quote, 
  Globe2,
  Building2,
  Phone,
  Mail
} from 'lucide-react';
import { SectionHeader } from '../components/ui/SectionHeader';
import { FOUNDER_PROFILES, COMPANY_DATA, Service } from '../data/content';
import { Reveal } from '../components/motion/Reveal';
import { StaggerContainer, StaggerItem } from '../components/motion/StaggerContainer';
import { AnimatedButton } from '../components/motion/AnimatedButton';
import { PageHeroBackground } from '../components/ui/PageHeroBackground';

interface LeadershipPageProps {
  onOpenConsultation?: (service?: Service) => void;
}

export const LeadershipPage: React.FC<LeadershipPageProps> = ({ onOpenConsultation }) => {
  return (
    <div className="pt-28 pb-20 bg-[#0a0a0a]">
      {/* 1. Page Hero: Founders & Leadership */}
      <section className="relative py-16 sm:py-24 border-b border-[#1f1f1f] overflow-hidden bg-[#0a0a0a]">
        <PageHeroBackground imageSrc="/about1.webp" position="center 30%" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-[#0a0a0a]/35 pointer-events-none" />
        <div className="absolute inset-0 hero-tech-grid opacity-30 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal>
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 mb-4 px-3.5 py-1.5 rounded-full bg-[#161616] border border-[#2a2a2a]">
                <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
                <span className="text-xs font-bold tracking-widest text-[#DFC067] uppercase select-none font-mono">
                  Corporate Governance &amp; Direction
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-[1.1] text-balance mb-5">
                Founders &amp; <span className="text-[#c9a84c]">Executive Leadership</span>.
              </h1>

              <p className="text-base sm:text-lg text-[#a1a1aa] leading-relaxed max-w-3xl text-balance mb-6">
                {COMPANY_DATA.foundingStatement}
              </p>

              <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[#888888]">
                <span className="px-3 py-1.5 rounded-lg bg-[#141414] border border-[#242424] flex items-center gap-1.5 text-white">
                  <MapPin className="w-3.5 h-3.5 text-[#c9a84c]" />
                  {COMPANY_DATA.location}
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-[#141414] border border-[#242424] text-[#a1a1aa]">
                  Entity: {COMPANY_DATA.legalName}
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-[#141414] border border-[#242424] text-[#D4AF37]">
                  {COMPANY_DATA.brandLine}
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 2. Detailed Founder Profiles Section */}
      <section className="py-20 border-b border-[#1f1f1f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeader
              eyebrow="Executive Profiles"
              title="Guiding Technology Vision and Operational Excellence"
              subtitle="Get to know the leaders steering software architecture, delivery discipline, and decentralized engineering innovation at VPD Technologies."
              align="center"
              className="mb-16"
            />
          </Reveal>

          <div className="space-y-16">
            {FOUNDER_PROFILES.map((founder, index) => {
              const isEven = index % 2 === 0;
              return (
                <Reveal key={founder.name} delay={index * 0.1}>
                  <div className="rounded-2xl border border-[#262626] bg-[#121212]/90 backdrop-blur-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 p-8 sm:p-10 lg:p-12 items-start">
                      {/* Left: Founder Identity Card / Monogram / Badge */}
                      <div className="lg:col-span-4 flex flex-col items-center sm:items-start text-center sm:text-left border-b lg:border-b-0 lg:border-r border-[#242424] pb-8 lg:pb-0 lg:pr-8">
                        <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl bg-gradient-to-br from-[#1c1c1c] to-[#121212] border-2 border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37] font-black text-3xl sm:text-4xl shadow-[0_0_30px_rgba(212,175,55,0.15)] mb-6 relative group">
                          {founder.initials}
                          <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-[#0a0a0a] border border-[#D4AF37]/60 flex items-center justify-center text-[#D4AF37]">
                            <Award className="w-4 h-4" />
                          </div>
                        </div>

                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1c1c1c] border border-[#D4AF37]/30 text-xs font-mono font-bold text-[#D4AF37] mb-2 uppercase">
                          {founder.shortRole}
                        </div>

                        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-1">
                          {founder.name}
                        </h2>

                        <p className="text-xs sm:text-sm font-medium text-[#888888] mb-6">
                          {founder.role}
                        </p>

                        <div className="w-full space-y-3 pt-4 border-t border-[#222222] text-xs text-[#a1a1aa]">
                          <div className="flex items-center justify-between">
                            <span className="text-[#666666]">Location:</span>
                            <span className="text-white font-medium">{founder.location}</span>
                          </div>
                          {founder.education && (
                            <div className="flex items-center justify-between">
                              <span className="text-[#666666]">Background:</span>
                              <span className="text-white font-medium text-right max-w-[190px]">{founder.education}</span>
                            </div>
                          )}
                          <div className="flex items-center justify-between">
                            <span className="text-[#666666]">Organization:</span>
                            <span className="text-white font-medium">{COMPANY_DATA.legalName}</span>
                          </div>
                        </div>
                      </div>

                      {/* Right: Full Biography, Leadership Quote, Focus Areas */}
                      <div className="lg:col-span-8 space-y-6">
                        <div>
                          <h3 className="text-xs font-mono uppercase tracking-widest text-[#D4AF37] mb-3 font-bold">
                            Professional Biography
                          </h3>
                          <p className="text-base sm:text-lg text-[#cccccc] leading-relaxed">
                            {founder.bio}
                          </p>
                        </div>

                        {/* Executive Quote */}
                        <div className="rounded-xl border border-[#2a2a2a] bg-[#161616]/80 p-5 sm:p-6 relative">
                          <Quote className="w-8 h-8 text-[#D4AF37]/20 absolute top-4 right-4 pointer-events-none" />
                          <p className="text-sm sm:text-base italic text-[#e4e4e7] leading-relaxed relative z-10">
                            &ldquo;{founder.quote}&rdquo;
                          </p>
                          <div className="mt-3 text-xs font-mono text-[#D4AF37] font-semibold">
                            — {founder.name}, {founder.shortRole}
                          </div>
                        </div>

                        {/* Areas of Leadership & Focus */}
                        <div>
                          <h3 className="text-xs font-mono uppercase tracking-widest text-[#aaaaaa] mb-3 font-bold">
                            Leadership Responsibilities &amp; Focus
                          </h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {founder.focusAreas.map((focus, fIdx) => (
                              <div
                                key={fIdx}
                                className="flex items-center gap-2.5 p-3 rounded-xl bg-[#141414] border border-[#222222] text-xs text-[#dddddd]"
                              >
                                <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                                <span>{focus}</span>
                              </div>
                            ))}
                          </div>
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

      {/* 3. Leadership Philosophy & Governance Standards */}
      <section className="py-20 bg-[#0c0c0c] border-b border-[#1f1f1f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-7 rounded-2xl bg-[#141414] border border-[#262626]">
                <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] mb-5">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  Direct Founder Accountability
                </h3>
                <p className="text-sm text-[#aaaaaa] leading-relaxed">
                  Every engagement benefits from direct executive oversight. We avoid layers of detached management to ensure our founding architects remain closely aligned with client objectives.
                </p>
              </div>

              <div className="p-7 rounded-2xl bg-[#141414] border border-[#262626]">
                <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] mb-5">
                  <Workflow className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  Transparent Delivery Governance
                </h3>
                <p className="text-sm text-[#aaaaaa] leading-relaxed">
                  Our delivery methodology (Design → Develop → Pilot → Scale → Support) provides clients with clear milestones, deterministic timelines, and predictable engineering quality.
                </p>
              </div>

              <div className="p-7 rounded-2xl bg-[#141414] border border-[#262626]">
                <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] mb-5">
                  <Building2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  Rooted in Kurnool, Built for Scale
                </h3>
                <p className="text-sm text-[#aaaaaa] leading-relaxed">
                  We are actively building premier digital engineering infrastructure from Kurnool, Andhra Pradesh, training local engineering talent and proving that high-tier software can flourish anywhere.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 4. Leadership Contact Callout */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-[#2e2e2e] bg-gradient-to-b from-[#141414] to-[#0d0d0d] p-8 sm:p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 right-1/2 translate-x-1/2 w-96 h-96 bg-[#c9a84c]/5 rounded-full blur-3xl pointer-events-none" />
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-3">
              Connect Directly with VPD Executive Leadership
            </h2>
            <p className="text-sm sm:text-base text-[#aaaaaa] max-w-xl mx-auto mb-8 leading-relaxed">
              Whether you are an enterprise partner seeking custom software development, an agribusiness evaluating AgriFlow ERP, or an investor/client exploring collaboration.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact">
                <AnimatedButton
                  variant="primary"
                  size="lg"
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Initiate Business Enquiry
                </AnimatedButton>
              </Link>
              <a
                href={`mailto:${COMPANY_DATA.email}`}
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-[#2a2a2a] bg-[#161616] px-6 text-sm font-bold text-white hover:border-[#c9a84c]/50 hover:bg-[#1f1f1f] transition-colors"
              >
                <Mail className="w-4 h-4 text-[#c9a84c]" />
                <span>{COMPANY_DATA.email}</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
