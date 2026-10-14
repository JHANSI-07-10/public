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

interface LeadershipPageProps {
  onOpenConsultation?: (service?: Service) => void;
}

export const LeadershipPage: React.FC<LeadershipPageProps> = ({ onOpenConsultation }) => {
  return (
    <div className="pt-28 pb-0 bg-[#0a0a0a]">
      {/* 1. Page Hero: Founders & Leadership */}
      <section className="relative pt-8 sm:pt-12 pb-8 sm:pb-10 border-b border-[#1f1f1f] overflow-hidden bg-[#0a0a0a]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(201,168,76,0.08),transparent_60%)] pointer-events-none" />
        <div className="absolute inset-0 hero-tech-grid opacity-20 pointer-events-none" />
        
        <div className="max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left: Leadership Governance Statement */}
            <div className="lg:col-span-7 xl:col-span-7">
              <Reveal>
                <div className="inline-flex items-center gap-2 mb-4 px-3.5 py-1.5 rounded-full bg-[#161616] border border-[#2a2a2a]">
                  <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
                  <span className="text-xs font-bold tracking-widest text-[#DFC067] uppercase select-none font-mono">
                    Corporate Governance &amp; Direction
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-[1.1] text-balance mb-5">
                  Founders &amp; <span className="text-[#c9a84c]">Executive Leadership</span>.
                </h1>

                <p className="text-base sm:text-lg text-[#a1a1aa] leading-relaxed max-w-2xl mb-6">
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
              </Reveal>
            </div>

            {/* Right: Complete Headquarters Image Showcase (Zero Overlap) */}
            <div className="lg:col-span-5 xl:col-span-5">
              <Reveal delay={0.15}>
                <div className="relative group rounded-2xl p-1 bg-gradient-to-b from-[#2a2a2a] via-[#1f1f1f] to-[#141414] shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-[#2a2a2a] overflow-hidden">
                  <div className="relative rounded-[calc(1rem-2px)] overflow-hidden bg-[#121212]">
                    <img
                      src="/about1.webp"
                      alt="VPD Technologies Corporate Headquarters"
                      className="w-full h-auto aspect-[4/3] object-cover group-hover:scale-[1.02] transition-transform duration-500"
                    />
                    {/* Bottom subtle gradient caption bar */}
                    <div className="absolute bottom-0 inset-x-0 p-3 sm:p-4 bg-gradient-to-t from-[#0a0a0a]/95 via-[#0a0a0a]/75 to-transparent flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-[#DFC067] shrink-0" />
                        <span className="text-xs font-semibold text-white tracking-wide">
                          VPD Technologies Headquarters
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-[#D4AF37] px-2 py-0.5 rounded bg-[#181818]/90 border border-[#2a2a2a]">
                        Kurnool, AP
                      </span>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Detailed Founder Profiles Section */}
      <section className="pt-8 sm:pt-10 pb-6 sm:pb-8">
        <div className="max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          <Reveal>
            <SectionHeader
              eyebrow="Executive Profiles"
              title="Guiding Technology Vision and Operational Excellence"
              subtitle="Get to know the leaders steering software architecture, delivery discipline, and decentralized engineering innovation at VPD Technologies."
              align="center"
              className="mb-10 sm:mb-12"
            />
          </Reveal>

          <div className="space-y-6 sm:space-y-8">
            {FOUNDER_PROFILES.map((founder, index) => {
              const isEven = index % 2 === 0;
              return (
                <Reveal key={founder.name} delay={index * 0.1}>
                  <div className="silver-card-hover group rounded-2xl border border-[#262626] bg-[#121212]/90 backdrop-blur-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 p-8 sm:p-10 lg:p-12 items-start">
                      {/* Left: Founder Identity Card / Monogram / Badge */}
                      <div className="lg:col-span-4 xl:col-span-3 flex flex-col items-center sm:items-start text-center sm:text-left border-b lg:border-b-0 lg:border-r border-[#242424] pb-8 lg:pb-0 lg:pr-8">
                        {/* Unclipped portrait frame with corner badge */}
                        <div className="relative mb-6 shrink-0">
                          <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-2xl bg-gradient-to-br from-[#1c1c1c] to-[#121212] border-2 border-[#D4AF37]/60 flex items-center justify-center text-[#D4AF37] font-black text-3xl sm:text-4xl shadow-[0_0_30px_rgba(212,175,55,0.2)] overflow-hidden">
                            {founder.image ? (
                              <>
                                <img
                                  src={founder.image}
                                  alt={founder.name}
                                  className="w-full h-full object-cover object-[center_18%]"
                                  onError={(e) => {
                                    (e.currentTarget as HTMLElement).style.display = 'none';
                                  }}
                                />
                                <span className="absolute inset-0 flex items-center justify-center -z-10 font-black text-3xl sm:text-4xl text-[#D4AF37]">
                                  {founder.initials}
                                </span>
                              </>
                            ) : (
                              founder.initials
                            )}
                          </div>
                          {/* Corner Verified Award Badge (unclipped) */}
                          <div className="absolute -bottom-2.5 -right-2.5 w-9 h-9 rounded-full bg-[#121212] border-2 border-[#D4AF37] flex items-center justify-center text-[#DFC067] z-20 shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
                            <Award className="w-4 h-4 text-[#DFC067]" />
                          </div>
                        </div>

                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1c1c1c] border border-[#D4AF37]/30 text-xs font-mono font-bold text-[#D4AF37] mb-2 uppercase">
                          {founder.shortRole}
                        </div>

                        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-1">
                          {founder.name}
                        </h2>

                        <p className="text-xs sm:text-sm font-medium text-[#888888] mb-4">
                          {founder.role}
                        </p>

                        {founder.linkedin && (
                          <a
                            href={founder.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 mb-6 px-3.5 py-1.5 rounded-lg bg-[#181818] border border-[#2a2a2a] hover:border-[#D4AF37]/60 text-xs font-medium text-[#cccccc] hover:text-[#D4AF37] transition-all group/lnk"
                          >
                            <svg className="w-3.5 h-3.5 fill-[#0a66c2]" viewBox="0 0 24 24">
                              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.6 1.6 0 0 0-1.61 1.6 1.6 1.6 0 0 0 1.61 1.6 1.6 1.6 0 0 0 1.6-1.6 1.6 1.6 0 0 0-1.6-1.6Z" />
                            </svg>
                            <span>Connect on LinkedIn</span>
                            <span className="text-[#888888] group-hover/lnk:text-[#D4AF37] transition-colors">↗</span>
                          </a>
                        )}

                        <div className="w-full space-y-2.5 pt-4 border-t border-[#2a2a2a]">
                          <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-[#181818] border border-[#2a2a2a]">
                            <span className="text-xs font-bold text-[#DFC067] flex items-center gap-1.5 shrink-0">
                              <MapPin className="w-3.5 h-3.5 text-[#DFC067]" />
                              Location:
                            </span>
                            <span className="text-xs font-semibold text-white text-right">
                              {founder.location}
                            </span>
                          </div>

                          {founder.education && (
                            <div className="flex items-start justify-between gap-2 p-2.5 rounded-xl bg-[#181818] border border-[#2a2a2a]">
                              <span className="text-xs font-bold text-[#DFC067] flex items-center gap-1.5 shrink-0 mt-0.5">
                                <Award className="w-3.5 h-3.5 text-[#DFC067]" />
                                Background:
                              </span>
                              <span className="text-xs font-semibold text-white text-right max-w-[200px] leading-snug">
                                {founder.education}
                              </span>
                            </div>
                          )}

                          <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-[#181818] border border-[#2a2a2a]">
                            <span className="text-xs font-bold text-[#DFC067] flex items-center gap-1.5 shrink-0">
                              <Building2 className="w-3.5 h-3.5 text-[#DFC067]" />
                              Organization:
                            </span>
                            <span className="text-xs font-semibold text-white text-right">
                              {COMPANY_DATA.legalName}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Right: Full Biography, Leadership Quote, Focus Areas */}
                      <div className="lg:col-span-8 xl:col-span-9 space-y-6">
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
                          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
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
      <section className="pt-0 pb-12 sm:pb-16 bg-[#0a0a0a] border-b border-[#1f1f1f]">
        <div className="max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          <Reveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="silver-card-hover group p-7 rounded-2xl bg-[#141414] border border-[#262626] overflow-hidden">
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] mb-5 group-hover:border-slate-300/40 group-hover:shadow-[0_0_15px_rgba(226,232,240,0.2)] transition-all duration-300">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-slate-100 transition-colors">
                    Direct Founder Accountability
                  </h3>
                  <p className="text-sm text-[#aaaaaa] leading-relaxed group-hover:text-[#cfcfcf] transition-colors">
                    Every engagement benefits from direct executive oversight. We avoid layers of detached management to ensure our founding architects remain closely aligned with client objectives.
                  </p>
                </div>
              </div>

              <div className="silver-card-hover group p-7 rounded-2xl bg-[#141414] border border-[#262626] overflow-hidden">
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] mb-5 group-hover:border-slate-300/40 group-hover:shadow-[0_0_15px_rgba(226,232,240,0.2)] transition-all duration-300">
                    <Workflow className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-slate-100 transition-colors">
                    Transparent Delivery Governance
                  </h3>
                  <p className="text-sm text-[#aaaaaa] leading-relaxed group-hover:text-[#cfcfcf] transition-colors">
                    Our delivery methodology (Design → Develop → Pilot → Scale → Support) provides clients with clear milestones, deterministic timelines, and predictable engineering quality.
                  </p>
                </div>
              </div>

              <div className="silver-card-hover group p-7 rounded-2xl bg-[#141414] border border-[#262626] overflow-hidden">
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] mb-5 group-hover:border-slate-300/40 group-hover:shadow-[0_0_15px_rgba(226,232,240,0.2)] transition-all duration-300">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-slate-100 transition-colors">
                    Rooted in Kurnool, Built for Scale
                  </h3>
                  <p className="text-sm text-[#aaaaaa] leading-relaxed group-hover:text-[#cfcfcf] transition-colors">
                    We are actively building premier digital engineering infrastructure from Kurnool, Andhra Pradesh, training local engineering talent and proving that high-tier software can flourish anywhere.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 4. Leadership Contact Callout */}
      <section className="pt-8 sm:pt-10 pb-4 sm:pb-6">
        <div className="max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          <div className="silver-card-hover group max-w-5xl mx-auto rounded-2xl border border-[#2e2e2e] bg-gradient-to-b from-[#141414] to-[#0d0d0d] p-8 sm:p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 right-1/2 translate-x-1/2 w-96 h-96 bg-[#c9a84c]/5 rounded-full blur-3xl pointer-events-none" />
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-3">
              Connect Directly with VPD Executive Leadership
            </h2>
            <p className="text-sm sm:text-base text-[#aaaaaa] max-w-xl mx-auto mb-8 leading-relaxed">
              Whether you are an enterprise partner seeking custom software development, an agribusiness evaluating AgriFlow ERP, or an investor/client exploring collaboration.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-[#2a2a2a] bg-[#161616] px-6 text-sm font-bold text-white hover:border-[#c9a84c]/50 hover:bg-[#1f1f1f] transition-colors group/btn"
              >
                <span>Initiate Business Enquiry</span>
                <ArrowRight className="w-4 h-4 text-[#c9a84c] group-hover/btn:translate-x-0.5 transition-transform" />
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
