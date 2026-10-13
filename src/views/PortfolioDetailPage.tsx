'use client';

import React from 'react';
import Link from 'next/link';
import { VERIFIED_PROJECTS, Service } from '../data/content';
import { CaseStudyDeepDive } from '../components/portfolio/CaseStudyDeepDive';
import { ArrowLeft } from 'lucide-react';

interface PortfolioDetailPageProps {
  id: string;
  onOpenConsultation: (service?: Service) => void;
}

export const PortfolioDetailPage: React.FC<PortfolioDetailPageProps> = ({ id, onOpenConsultation }) => {
  const project = VERIFIED_PROJECTS.find((p) => p.id === id) || VERIFIED_PROJECTS[0];

  return (
    <div className="pt-28 pb-20 bg-[#0a0a0a]">
      {/* Breadcrumb Header */}
      <section className="py-6 border-b border-[#1f1f1f] bg-[#0d0d0d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs text-[#888888] font-medium">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/portfolio" className="hover:text-white transition-colors">Portfolio</Link>
            <span>/</span>
            <span className="text-[#c9a84c]">{project.title}</span>
          </div>
        </div>
      </section>

      {/* Case Study Deep Dive Content */}
      <section className="py-12 sm:py-16">
        <div className="max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          <CaseStudyDeepDive project={project} onOpenConsultation={onOpenConsultation} isModal={false} />
        </div>
      </section>
    </div>
  );
};

