'use client';

import React from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';
import { Eye, Lock, Cookie, Shield, ShieldCheck, ArrowLeft } from 'lucide-react';
import { COMPANY_DATA } from '../data/content';
import { Reveal } from '../components/motion/Reveal';

interface ProtocolSection {
  sec: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

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

const CardGlowAndParticles: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-3xl">
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-80 h-56 pointer-events-none transition-opacity duration-500 opacity-60 group-hover:opacity-100"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(223,192,103,0.08), transparent 70%)',
        }}
      />
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
              backgroundColor: '#DFC067',
              boxShadow: '0 0 8px #DFC067, 0 0 16px rgba(223,192,103,0.5)',
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

const PROTOCOL_SECTIONS: ProtocolSection[] = [
  {
    sec: 'SEC_01',
    icon: Eye,
    title: 'DATA ACQUISITION PROTOCOL',
    description:
      'We collect information necessary for technical handshake and service optimization. This includes operator identity (name), transmission coordinates (email), and communication history via our secure inquiry feed.',
  },
  {
    sec: 'SEC_02',
    icon: Lock,
    title: 'ENCRYPTED STORAGE',
    description:
      'All collected data is stored in the VPD_LAB cloud cluster, protected by multi-layer encryption and rigid access controls. We do not distribute your transmission data to third-party entities without verified authorization.',
  },
  {
    sec: 'SEC_03',
    icon: Cookie,
    title: 'COOKIE INFRASTRUCTURE',
    description:
      'Our system utilizes low-latency cookies to maintain session persistence and optimize UI delivery. These are temporary data packets that reside in your local browser cache.',
  },
  {
    sec: 'SEC_04',
    icon: ShieldCheck,
    title: 'NON-DISCLOSURE & GOVERNANCE',
    description:
      `All proprietary client algorithms, database schemas, and commercial strategies shared during technical consultations are bound by our standard Non-Disclosure Agreement (NDA). Inquiries can be transmitted to ${COMPANY_DATA.email}.`,
  },
];

export const PrivacyPolicyPage: React.FC = () => {
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
            <Shield className="w-3.5 h-3.5 text-[#DFC067]" />
            <span>SECURITY PROTOCOL V4.0</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white mb-2">
            Privacy <span className="text-[#DFC067]">Policy.</span>
          </h1>

          {/* Effective Update Subtitle */}
          <div className="text-xs font-mono tracking-widest text-[#666666] uppercase">
            EFFECTIVE_UPDATE: MAY_2026
          </div>
        </Reveal>

        {/* Protocol Cards */}
        <div className="space-y-6">
          {PROTOCOL_SECTIONS.map((section, idx) => {
            const Icon = section.icon;
            return (
              <Reveal key={section.sec} delay={idx * 0.08}>
                <div className="relative rounded-3xl bg-[#121212] border border-[#DFC067]/40 hover:border-[#DFC067]/80 hover:shadow-[0_0_35px_rgba(223,192,103,0.12)] p-6 sm:p-8 overflow-hidden transition-all duration-300 group">
                  {/* Subtle Background Watermark */}
                  <div className="absolute right-6 sm:right-8 top-1/2 -translate-y-1/2 font-mono font-black text-5xl sm:text-7xl text-white/[0.03] select-none pointer-events-none tracking-widest group-hover:text-white/[0.05] transition-colors">
                    {section.sec}
                  </div>

                  {/* Particle & Glow Animation */}
                  <CardGlowAndParticles />

                  {/* Content */}
                  <div className="flex items-start gap-4 sm:gap-5 relative z-10">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#1a1a1a] border border-[#DFC067]/30 flex items-center justify-center shrink-0 mt-0.5 text-[#DFC067]">
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#DFC067]" />
                    </div>

                    <div className="flex-1 min-w-0 pr-10 sm:pr-14">
                      <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white uppercase mb-2">
                        {section.title}
                      </h2>
                      <p className="text-xs sm:text-sm text-[#888888] leading-relaxed">
                        {section.description}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </div>
  );
};
