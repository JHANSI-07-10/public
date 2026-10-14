'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUp, Phone, Mail, MapPin } from 'lucide-react';
import { COMPANY_DATA, CORE_SERVICES } from '../data/content';
import { Reveal } from './motion/Reveal';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#080808] border-t border-[#1f1f1f] pt-16 pb-12 text-[#aaaaaa] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-[#1c1c1c]">
            {/* Column 1: Brand & Positioning */}
            <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
              <div>
                <Link href="/" className="flex items-center gap-3 mb-4 group inline-flex">
                  <div className="w-10 h-10 rounded-xl bg-[#141414] border border-[#262626] p-1 flex items-center justify-center shrink-0 group-hover:border-[#c9a84c]/50 transition-colors">
                    <img
                      src="/logo.webp"
                      alt="VPD Technologies"
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/favicon.svg';
                      }}
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-lg font-black tracking-tight text-white leading-tight">
                      VPD <span className="text-[#c9a84c]">Technologies</span>
                    </span>
                    <span className="text-xs font-mono text-[#777777] tracking-wider">
                      Private Limited
                    </span>
                  </div>
                </Link>

                <p className="text-sm text-[#aaaaaa] leading-relaxed max-w-sm mb-4">
                  Engineering high-performance software products, enterprise applications, and modern digital solutions that help organizations modernize operations and support business growth.
                </p>

                <div className="text-xs font-mono text-[#D4AF37] font-semibold mb-6">
                  {COMPANY_DATA.brandLine}
                </div>

                {/* Status Indicator */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#141414] border border-[#222222] text-xs">
                  <span className="w-2 h-2 rounded-full bg-[#22c55e]" />
                  <span className="text-xs font-mono text-[#aaaaaa]">Engineering Operations Active</span>
                </div>
              </div>

            </div>

            {/* Column 2: Core Services */}
            <div className="lg:col-span-3 space-y-4">
              <h3 className="text-sm font-semibold text-white">
                Engineering Services
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm">
                {CORE_SERVICES.map((s) => (
                  <li key={s.id}>
                    <Link
                      href="/services"
                      className="hover:text-white transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#c9a84c] rounded px-0.5 inline-block"
                    >
                      {s.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Industries & Platforms */}
            <div className="lg:col-span-2 space-y-4">
              <h3 className="text-sm font-semibold text-white">
                Sectors & Platforms
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm">
                <li>
                  <Link
                    href="/industries"
                    className="hover:text-white transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#c9a84c] rounded px-0.5 inline-block"
                  >
                    All Industry Capabilities
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products"
                    className="hover:text-white transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#c9a84c] rounded px-0.5 inline-block"
                  >
                    Products &amp; Platforms
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products#b2b-logistics"
                    className="hover:text-[#c9a84c] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#c9a84c] rounded px-0.5 inline-block text-[#888888]"
                  >
                    B2B Logistics Platform
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products#agriflow-erp"
                    className="hover:text-[#c9a84c] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#c9a84c] rounded px-0.5 inline-block text-[#888888]"
                  >
                    AgriFlow ERP
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products#enterprise-saas-suite"
                    className="hover:text-[#c9a84c] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#c9a84c] rounded px-0.5 inline-block text-[#888888]"
                  >
                    Enterprise SaaS Suite
                  </Link>
                </li>
              </ul>

              <h3 className="text-sm font-semibold text-white pt-2">
                Company Profile
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm">
                <li>
                  <Link
                    href="/about"
                    className="hover:text-white transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#c9a84c] rounded px-0.5 inline-block"
                  >
                    About VPD
                  </Link>
                </li>
                <li>
                  <Link
                    href="/leadership"
                    className="hover:text-white transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#c9a84c] rounded px-0.5 inline-block"
                  >
                    Founders &amp; Leadership
                  </Link>
                </li>
                <li>
                  <Link
                    href="/careers"
                    className="hover:text-white transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#c9a84c] rounded px-0.5 inline-block"
                  >
                    Careers &amp; Culture
                  </Link>
                </li>
                <li>
                  <Link
                    href="/portfolio"
                    className="hover:text-white transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#c9a84c] rounded px-0.5 inline-block"
                  >
                    Approved Case Studies
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blogs"
                    className="hover:text-white transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#c9a84c] rounded px-0.5 inline-block"
                  >
                    Technical Insights
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-white transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#c9a84c] rounded px-0.5 inline-block"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: HQ Location & Google Map */}
            <div className="lg:col-span-3 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-white">
                Headquarters & Channels
              </h3>
              <div className="space-y-2.5 text-sm text-[#aaaaaa]">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#c9a84c] shrink-0 mt-0.5" />
                  <span>{COMPANY_DATA.location}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#c9a84c] shrink-0" />
                  <a
                    href={`tel:${COMPANY_DATA.phone}`}
                    className="hover:text-white transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#c9a84c] rounded px-0.5"
                  >
                    {COMPANY_DATA.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-[#c9a84c] shrink-0" />
                  <a
                    href={`mailto:${COMPANY_DATA.email}`}
                    className="hover:text-white transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#c9a84c] rounded px-0.5"
                  >
                    {COMPANY_DATA.email}
                  </a>
                </div>
              </div>

              {/* Google Map Card */}
              <div className="rounded-xl overflow-hidden border border-[#242424] h-28 relative group mt-4">
                <iframe
                  src={`https://maps.google.com/maps?q=${COMPANY_DATA.coordinates.lat},${COMPANY_DATA.coordinates.lng}&t=&z=16&ie=UTF8&iwloc=&output=embed`}
                  width="100%"
                  height="100%"
                  title="VPD Technologies Headquarters Location Map"
                  loading="lazy"
                  className="opacity-70 group-hover:opacity-100 transition-opacity filter grayscale contrast-125"
                  style={{ border: 0 }}
                />
                <a
                  href={COMPANY_DATA.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="absolute inset-0 z-10 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold text-white focus:opacity-100"
                >
                  Open in Google Maps
                </a>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Bottom Legal Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#777777]">
          <div className="text-center sm:text-left">
            © {new Date().getFullYear()} VPD Technologies Private Limited. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="hover:text-[#c9a84c] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#c9a84c]"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-[#c9a84c] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#c9a84c]"
            >
              Terms of Service
            </Link>
            <button
              onClick={() => {
                window.dispatchEvent(new CustomEvent('replay_brand_intro'));
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-[#c9a84c] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#c9a84c] cursor-pointer"
            >
              Replay Brand Intro
            </button>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-[#aaaaaa] hover:text-[#c9a84c] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c] rounded p-1 cursor-pointer"
              aria-label="Scroll back to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
