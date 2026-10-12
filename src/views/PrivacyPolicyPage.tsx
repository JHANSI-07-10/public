'use client';

import React from 'react';
import { SectionHeader } from '../components/ui/SectionHeader';
import { Card } from '../components/ui/Card';
import { COMPANY_DATA } from '../data/content';
import { Shield, Lock, Eye, FileText } from 'lucide-react';
import Link from 'next/link';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="pt-28 pb-20 bg-[#0a0a0a]">
      {/* Header */}
      <section className="py-16 border-b border-[#1f1f1f] bg-[#0d0d0d]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Compliance & Data Protection"
            title="Privacy Policy & Information Governance"
            subtitle={`Effective: May 2026 · ${COMPANY_DATA.legalName}`}
          />
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card variant="card" padding="lg" className="space-y-8 text-sm text-[#cccccc] leading-relaxed">
            <div>
              <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#c9a84c]" />
                1. Commitment to Data Confidentiality
              </h3>
              <p className="text-[#aaaaaa]">
                VPD Technologies Private Limited ("VPD Technologies", "we", "us", or "our") respects the proprietary nature of all client specifications, codebase assets, and corporate inquiries submitted to our platforms. This Privacy Policy details our data governance protocols, storage practices, and compliance standards.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <Eye className="w-5 h-5 text-[#c9a84c]" />
                2. Information We Collect
              </h3>
              <p className="text-[#aaaaaa] mb-3">
                When you initiate communication or request an architectural consultation through our platforms, we collect:
              </p>
              <ul className="list-disc list-inside space-y-1.5 text-[#aaaaaa] pl-2">
                <li>Professional identification details: Full name, business email address, and direct telephone/WhatsApp number.</li>
                <li>Project parameters: Target technology stack preferences, system throughput benchmarks, and deployment objectives.</li>
                <li>Technical telemetry: Standard server access logs, IP address data, browser signatures, and interaction timestamps.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <Lock className="w-5 h-5 text-[#c9a84c]" />
                3. Encryption & Storage Protocols
              </h3>
              <p className="text-[#aaaaaa]">
                All data transmitted to VPD Technologies infrastructure is protected using Transport Layer Security (TLS 1.3) and AES-256 encryption at rest. In accordance with ISO 27001 data governance practices, access to client requirements is strictly segregated through Role-Based Access Control (RBAC). We never sell, lease, or monetize client contact information or technical specifications to third parties.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#c9a84c]" />
                4. Non-Disclosure & Intellectual Property
              </h3>
              <p className="text-[#aaaaaa]">
                All proprietary client algorithms, database schemas, and commercial strategies shared during technical consultations are bound by our standard Non-Disclosure Agreement (NDA). Custom source code authored for clients upon contractual execution remains 100% the intellectual property of the commissioning organization.
              </p>
            </div>

            <div className="pt-6 border-t border-[#222222]">
              <h3 className="text-base font-bold text-white mb-2">
                5. Governance Inquiries & Privacy Contact
              </h3>
              <p className="text-xs text-[#888888]">
                For data protection requests or compliance inquiries, contact our legal and governance leads at{' '}
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
