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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
<<<<<<< Updated upstream
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-mono font-bold text-[#c9a84c] uppercase tracking-wider block mb-2">
              Case Study · {project.sector} · {project.duration}
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4 leading-tight">
              {project.title}
            </h1>
            <p className="text-lg text-[#aaaaaa] leading-relaxed">
              Client Engagement: <strong className="text-white">{project.client}</strong>
            </p>
          </div>

          {/* Full-width Media Image Frame */}
          <div className="rounded-2xl overflow-hidden aspect-[21/9] max-h-[480px] bg-[#141414] border border-[#262626] relative group mb-12">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
              onError={(e) => {
                const parent = (e.target as HTMLElement).parentElement;
                if (parent) {
                  parent.innerHTML = `
                    <div class="w-full h-full flex flex-col items-center justify-center bg-[#161616] p-8 text-center">
                      <span class="text-sm font-mono font-bold text-[#c9a84c] mb-2">${project.sector}</span>
                      <span class="text-2xl font-bold text-white">${project.title}</span>
                    </div>
                  `;
                }
              }}
            />
            <div className="absolute bottom-6 left-6 bg-[#0a0a0a]/92 backdrop-blur-md border border-[#c9a84c]/30 rounded-2xl p-4 flex items-center gap-4">
              <div className="text-3xl font-black text-[#c9a84c] tracking-tight tabular-nums">
                {project.metricHighlight}
              </div>
              <div className="text-sm font-semibold text-white leading-tight">
                {project.metricLabel}
              </div>
            </div>
          </div>

          {/* 2-Column Deep Dive Narrative */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-8 space-y-10">
              <div>
                <h2 className="text-xl font-bold text-white uppercase tracking-wider mb-4 pb-2 border-b border-[#222222]">
                  The Architectural Challenge
                </h2>
                <p className="text-base text-[#aaaaaa] leading-relaxed">
                  {project.problem}
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white uppercase tracking-wider mb-4 pb-2 border-b border-[#222222]">
                  Engineered Solution & Strategy
                </h2>
                <p className="text-base text-[#aaaaaa] leading-relaxed">
                  {project.solution}
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-[#c9a84c] uppercase tracking-wider mb-4 pb-2 border-b border-[#222222]">
                  Verified Business Outcomes
                </h2>
                <p className="text-base text-white leading-relaxed font-medium">
                  {project.result}
                </p>
              </div>
            </div>

            {/* Sidebar Specifications */}
            <div className="lg:col-span-4 space-y-6">
              <Card variant="raised" padding="lg">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 pb-2 border-b border-[#2a2a2a]">
                  System Specifications
                </h3>
                <div className="space-y-4">
                  {project.specs.map((spec, sIdx) => (
                    <div key={sIdx} className="text-xs">
                      <span className="text-[#777777] block text-xs uppercase font-bold">
                        {spec.label}
                      </span>
                      <span className="font-mono text-sm font-semibold text-white">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-6 mt-6 border-t border-[#262626]">
                  <Button
                    onClick={() => onOpenConsultation()}
                    variant="primary"
                    size="md"
                    fullWidth
                    icon={<ArrowRight className="w-4 h-4" />}
                  >
                    Inquire Similar Architecture
                  </Button>
                </div>
              </Card>

              <div className="p-4 rounded-xl bg-[#121212] border border-[#222222] text-xs text-[#777777]">
                Delivered under strict enterprise client non-disclosure agreement (NDA).
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Navigation Strip */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#aaaaaa] hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-[#c9a84c]" />
            <span>Back to All Case Studies</span>
          </Link>

          <Button
            onClick={() => onOpenConsultation()}
            variant="secondary"
            size="sm"
          >
            Start Project Discussion
          </Button>
=======
          <CaseStudyDeepDive project={project} onOpenConsultation={onOpenConsultation} isModal={false} />
>>>>>>> Stashed changes
        </div>
      </section>
    </div>
  );
};

