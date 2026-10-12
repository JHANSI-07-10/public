'use client';

import React from 'react';
import { SectionHeader } from '../components/ui/SectionHeader';
import { Card } from '../components/ui/Card';
import { COMPANY_DATA } from '../data/content';
import { Scale, CheckCircle, Code, AlertTriangle } from 'lucide-react';

export const TermsPage: React.FC = () => {
  return (
    <div className="pt-28 pb-20 bg-[#0a0a0a]">
      {/* Header */}
      <section className="py-16 border-b border-[#1f1f1f] bg-[#0d0d0d]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Commercial Terms & Conditions"
            title="Terms of Service & Engagement Protocols"
            subtitle={`Standard Master Services Agreement Baseline · ${COMPANY_DATA.legalName}`}
          />
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card variant="card" padding="lg" className="space-y-8 text-sm text-[#cccccc] leading-relaxed">
            <div>
              <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <Scale className="w-5 h-5 text-[#c9a84c]" />
                1. Acceptance of Terms & Engagement Scope
              </h3>
              <p className="text-[#aaaaaa]">
                By accessing this website or engaging VPD Technologies Private Limited for digital engineering, custom software architecture, or consultancy services, you agree to these Terms of Service. Individual Statement of Work (SOW) agreements govern project deliverables, milestones, and specific commercial parameters.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <Code className="w-5 h-5 text-[#c9a84c]" />
                2. Software Engineering Deliverables & IP Ownership
              </h3>
              <p className="text-[#aaaaaa]">
                Upon full settlement of agreed project milestone invoices, all custom software artifacts, frontends, APIs, and database configurations authored by VPD Technologies for the designated engagement become the sole property of the client. VPD Technologies retains rights solely to pre-existing open-source modules and proprietary internal scaffolding libraries.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-[#c9a84c]" />
                3. Quality Assurance, SLAs & Post-Launch Support
              </h3>
              <p className="text-[#aaaaaa]">
                Every production codebase delivered by VPD Technologies undergoes comprehensive automated regression testing, security vulnerability scans, and performance benchmarking. We provide a standard 30-day post-launch warranty window for defect remediation and stability verification.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-[#c9a84c]" />
                4. Limitation of Liability & Governing Law
              </h3>
              <p className="text-[#aaaaaa]">
                Neither party shall be liable for indirect, incidental, or consequential damages resulting from third-party hosting outages, external API disruptions, or upstream network failures. These terms are governed by the laws of India, under the jurisdiction of the courts of Andhra Pradesh.
              </p>
            </div>

            <div className="pt-6 border-t border-[#222222]">
              <h3 className="text-base font-bold text-white mb-2">
                5. Legal Communications
              </h3>
              <p className="text-xs text-[#888888]">
                For legal correspondence regarding contractual agreements or statements of work, contact{' '}
                <a href={`mailto:${COMPANY_DATA.email}`} className="text-[#c9a84c] hover:underline">
                  {COMPANY_DATA.email}
                </a>.
              </p>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};
