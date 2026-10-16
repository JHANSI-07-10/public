'use client';

import React from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';
import { Box, Globe, Zap, AlertTriangle, CheckCircle2, FileText, ArrowLeft } from 'lucide-react';
import { Reveal } from '../components/motion/Reveal';

interface ParticleDef {
  top: string;
  right: string;
  size: number;
  delay: number;
  duration: number;
}

const GOLD_PARTICLES: ParticleDef[] = [
  { top: '24%', right: '14%', size: 3, delay: 0, duration: 3.5 },
  { top: '42%', right: '26%', size: 2, delay: 0.8, duration: 4.2 },
  { top: '64%', right: '18%', size: 2.5, delay: 1.5, duration: 3.8 },
  { top: '32%', right: '8%', size: 3.5, delay: 2.2, duration: 4.5 },
  { top: '74%', right: '32%', size: 2, delay: 0.4, duration: 5.0 },
  { top: '18%', right: '38%', size: 1.5, delay: 1.2, duration: 3.2 },
  { top: '58%', right: '45%', size: 2, delay: 2.7, duration: 4.0 },
  { top: '82%', right: '12%', size: 2.5, delay: 1.9, duration: 3.6 },
];

const CardGlowAndParticles: React.FC<{ color?: string; glowColor?: string }> = ({
  color = '#DFC067',
  glowColor = 'rgba(223,192,103,0.08)',
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-3xl">
      {/* Ambient Radial Glow */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-80 h-56 pointer-events-none transition-opacity duration-500 opacity-60 group-hover:opacity-100"
        style={{
          background: `radial-gradient(ellipse at center, ${glowColor}, transparent 70%)`,
        }}
      />

      {/* Floating Sparkle Particles */}
      {!shouldReduceMotion &&
        GOLD_PARTICLES.map((p, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full"
            style={{
              top: p.top,
              right: p.right,
              width: p.size,
              height: p.size,
              backgroundColor: color,
              boxShadow: `0 0 8px ${color}, 0 0 16px ${color}80`,
            }}
            animate={{
              y: [-4, 4, -4],
              x: [-3, 3, -3],
              opacity: [0.25, 0.9, 0.25],
              scale: [0.8, 1.3, 0.8],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: 'easeInOut',
            }}
          />
        ))}
    </div>
  );
};

export const TermsPage: React.FC = () => {
  return (
    <div className="pt-28 pb-24 bg-[#0a0a0a] min-h-screen text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#141414] hover:bg-[#1a1a1a] border border-[#262626] hover:border-[#D4AF37]/50 text-xs font-semibold text-[#a1a1aa] hover:text-white transition-all group duration-200"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#DFC067] group-hover:-translate-x-1 transition-transform duration-200" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Header */}
        <Reveal className="mb-10 sm:mb-12">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-[#16140d] border border-[#DFC067]/40 text-[11px] font-mono font-bold text-[#DFC067] tracking-wider uppercase">
            <FileText className="w-3.5 h-3.5 text-[#DFC067]" />
            <span>OPERATIONAL PROTOCOL V4.0</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white mb-2">
            Terms of <span className="text-[#DFC067]">Service.</span>
          </h1>

          {/* Status Subtitle */}
          <div className="text-xs font-mono tracking-widest text-[#666666] uppercase">
            CONTRACT_STATUS: ACTIVE_UPLINK
          </div>
        </Reveal>

        {/* Operational Protocol Cards */}
        <div className="space-y-6">
          {/* 1. SERVICE DEPLOYMENT */}
          <Reveal delay={0.05}>
            <div className="relative rounded-3xl bg-[#121212] border border-[#DFC067]/40 hover:border-[#DFC067]/80 hover:shadow-[0_0_35px_rgba(223,192,103,0.12)] p-6 sm:p-8 transition-all duration-300 group overflow-hidden">
              <CardGlowAndParticles />
              <div className="flex items-start gap-4 sm:gap-5 relative z-10">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#1a1a1a] border border-[#DFC067]/30 flex items-center justify-center shrink-0 mt-0.5 text-[#DFC067]">
                  <Box className="w-4 h-4 sm:w-5 sm:h-5 text-[#DFC067]" />
                </div>
                <div className="flex-1 min-w-0 pr-4 sm:pr-8">
                  <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white uppercase mb-2">
                    SERVICE DEPLOYMENT
                  </h2>
                  <p className="text-xs sm:text-sm text-[#888888] leading-relaxed">
                    All technical deployments by VPD Technologies are subject to project-specific protocol agreements. We guarantee high-frequency uptime for all delivered digital assets as per the Service Level Agreement (SLA).
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* 2. INTELLECTUAL PROPERTY */}
          <Reveal delay={0.1}>
            <div className="relative rounded-3xl bg-[#121212] border border-[#DFC067]/40 hover:border-[#DFC067]/80 hover:shadow-[0_0_35px_rgba(223,192,103,0.12)] p-6 sm:p-8 transition-all duration-300 group overflow-hidden">
              <CardGlowAndParticles />
              <div className="flex items-start gap-4 sm:gap-5 relative z-10">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#1a1a1a] border border-[#DFC067]/30 flex items-center justify-center shrink-0 mt-0.5 text-[#DFC067]">
                  <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-[#DFC067]" />
                </div>
                <div className="flex-1 min-w-0 pr-4 sm:pr-8">
                  <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white uppercase mb-2">
                    INTELLECTUAL PROPERTY
                  </h2>
                  <p className="text-xs sm:text-sm text-[#888888] leading-relaxed">
                    The Architecture, source code, and design patterns of the Innovation Engine remain the core property of VPD Technologies unless explicitly transferred via a high-tier asset acquisition contract.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* 3. OPERATIONAL CONDUCT */}
          <Reveal delay={0.15}>
            <div className="relative rounded-3xl bg-[#121212] border border-[#DFC067]/40 hover:border-[#DFC067]/80 hover:shadow-[0_0_35px_rgba(223,192,103,0.12)] p-6 sm:p-8 transition-all duration-300 group overflow-hidden">
              <CardGlowAndParticles />
              <div className="flex items-start gap-4 sm:gap-5 relative z-10">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#1a1a1a] border border-[#DFC067]/30 flex items-center justify-center shrink-0 mt-0.5 text-[#DFC067]">
                  <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-[#DFC067]" />
                </div>
                <div className="flex-1 min-w-0 pr-4 sm:pr-8">
                  <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white uppercase mb-2">
                    OPERATIONAL CONDUCT
                  </h2>
                  <p className="text-xs sm:text-sm text-[#888888] leading-relaxed">
                    Operators using our platform must not attempt unauthorized breach of security nodes, data mining of the project vault, or any action that disrupts the integrity of the VPD network.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* 4. TERMINATION_SIGNAL */}
          <Reveal delay={0.2}>
            <div className="relative rounded-3xl bg-[#141008] border border-[#b45309]/50 hover:border-[#d97706]/80 hover:shadow-[0_0_35px_rgba(217,119,6,0.12)] p-6 sm:p-7 transition-all duration-300 group overflow-hidden">
              <CardGlowAndParticles color="#f59e0b" glowColor="rgba(245,158,11,0.08)" />
              <div className="flex items-start gap-4 sm:gap-5 relative z-10">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#1f1609] border border-[#b45309]/40 flex items-center justify-center shrink-0 mt-0.5 text-[#f59e0b]">
                  <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-[#f59e0b]" />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-xs sm:text-sm font-mono font-black text-[#f97316] uppercase tracking-wider mb-1">
                    TERMINATION_SIGNAL
                  </h2>
                  <p className="text-[11px] sm:text-xs font-mono text-[#a1a1aa] leading-relaxed uppercase tracking-wide">
                    VIOLATION OF THESE PROTOCOLS MAY RESULT IN IMMEDIATE TERMINATION OF THE HANDSHAKE AND REVOCATION OF ACCESS TO THE VPD DIGITAL INFRASTRUCTURE.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Verification Footer Pill */}
        <Reveal delay={0.25}>
          <div className="flex flex-col items-center justify-center pt-12 pb-4 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0d140e] border border-[#22c55e]/30 text-xs font-mono font-bold text-white tracking-wider">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#22c55e]" />
              <span>ENGAGEMENT_VERIFIED</span>
            </div>
            <div className="mt-3 text-[10px] font-mono tracking-widest text-[#555555] uppercase select-none">
              HANDSHAKE_CONFIRMED_BY_ACCESS_
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
};
