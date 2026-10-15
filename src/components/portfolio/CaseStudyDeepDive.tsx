'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Project, Service, getRelatedInsightArticle } from '../../data/content';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import {
  ArrowRight,
  ArrowLeft,
  ArrowUpRight,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Layers,
  Cpu,
  ShieldCheck,
  TrendingUp,
  ExternalLink,
  Sparkles,
  Share2,
  Check,
  Workflow,
  Quote,
  Star,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Copy,
  Linkedin,
  Twitter,
  Mail,
  Printer,
} from 'lucide-react';
import { WhatsAppIcon } from '../ui/WhatsAppIcon';

interface CaseStudyDeepDiveProps {
  project: Project;
  onOpenConsultation?: (service?: Service) => void;
  isModal?: boolean;
  onClose?: () => void;
  onNavigateProject?: (direction: 'prev' | 'next') => void;
  hasPrev?: boolean;
  hasNext?: boolean;
  currentIndex?: number;
  totalProjects?: number;
}

export const CaseStudyDeepDive: React.FC<CaseStudyDeepDiveProps> = ({
  project,
  onOpenConsultation,
  isModal = false,
  onClose,
  onNavigateProject,
  hasPrev = false,
  hasNext = false,
  currentIndex,
  totalProjects,
}) => {
  const [copied, setCopied] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const shareMenuRef = useRef<HTMLDivElement>(null);
  const relatedArticle = getRelatedInsightArticle(project.id);

  const getShareUrl = () => {
    if (typeof window !== 'undefined') {
      return `${window.location.origin}/portfolio/${project.id}`;
    }
    return `https://vpdtechnologies.com/portfolio/${project.id}`;
  };

  const shareUrl = getShareUrl();

  const shareChannels = [
    {
      name: 'LinkedIn',
      icon: Linkedin,
      color: 'bg-[#0a66c2]/15 text-[#0a66c2]',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      label: 'Share on LinkedIn',
    },
    {
      name: 'X (Twitter)',
      icon: Twitter,
      color: 'bg-sky-500/15 text-sky-400',
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        `Case study: "${project.title}" engineered by @VPDTechnologies`
      )}&url=${encodeURIComponent(shareUrl)}`,
      label: 'Share on X (Twitter)',
    },
    {
      name: 'WhatsApp',
      icon: WhatsAppIcon,
      color: 'bg-[#22c55e]/15 text-[#22c55e]',
      href: `https://api.whatsapp.com/send?text=${encodeURIComponent(
        `Review this technical case study: "${project.title}" by VPD Technologies: ${shareUrl}`
      )}`,
      label: 'Share via WhatsApp',
    },
    {
      name: 'Email',
      icon: Mail,
      color: 'bg-[#c9a84c]/15 text-[#c9a84c]',
      href: `mailto:?subject=${encodeURIComponent(
        `${project.title} - Engineering Case Study | VPD Technologies`
      )}&body=${encodeURIComponent(
        `Hi,\n\nI thought you would find this engineering case study interesting:\n\n${project.title} (${project.sector})\n${project.overview || project.problem}\n\nFull case study: ${shareUrl}`
      )}`,
      label: 'Share via Email',
    },
  ];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (shareMenuRef.current && !shareMenuRef.current.contains(e.target as Node)) {
        setIsShareOpen(false);
      }
    };
    if (isShareOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isShareOpen]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleTriggerConsultation = () => {
    if (!onOpenConsultation) return;
    onOpenConsultation({
      id: project.id,
      title: `${project.title} Architecture Inquiry`,
      category: project.sector,
      description: project.overview || project.solution,
      target: project.client,
      stack: project.tags.join(', '),
      latency: project.metricHighlight,
      security: 'Enterprise Grade',
      benefits: project.outcomes?.map((o) => `${o.metric} ${o.label}`) || [],
      capabilities: project.challenges || [],
    });
  };

  return (
    <div className="space-y-10 text-white">
      {/* Top Utility Bar (Navigation & Share) */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#1f1f1f] relative">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider bg-[#c9a84c]/10 text-[#c9a84c] border border-[#c9a84c]/30">
            {project.sector}
          </span>
          <span className="px-3 py-1 rounded-full text-[11px] font-mono font-medium text-[#888888] bg-[#161616] border border-[#262626]">
            {project.duration}
          </span>
          <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold text-[#c9a84c] bg-[#141414] border border-[#c9a84c]/30 flex items-center gap-1.5">
            <span>{project.metricHighlight}</span>
            <span className="text-[#999999] font-normal">{project.metricLabel}</span>
          </span>
          <span className="text-xs text-[#777777]">
            Client: <strong className="text-white font-medium">{project.client}</strong>
          </span>
        </div>

        {/* Action Controls: Direct Link & Case Navigation */}
        <div className="flex items-center gap-2 print:hidden">
          {/* Share Dropdown */}
          <div className="relative" ref={shareMenuRef}>
            <button
              type="button"
              onClick={() => setIsShareOpen((prev) => !prev)}
              aria-expanded={isShareOpen}
              aria-haspopup="true"
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors cursor-pointer ${
                isShareOpen
                  ? 'bg-[#222222] text-white border-[#c9a84c] shadow-lg shadow-[#c9a84c]/10'
                  : 'bg-[#161616] hover:bg-[#222222] text-[#cccccc] hover:text-white border-[#262626] hover:border-[#c9a84c]/40'
              }`}
              title="Share this case study"
            >
              <Share2 className="w-3.5 h-3.5 text-[#c9a84c]" />
              <span>Share</span>
              <ChevronDown
                className={`w-3 h-3 text-[#888888] transition-transform duration-200 ${
                  isShareOpen ? 'rotate-180 text-white' : ''
                }`}
              />
            </button>

            {isShareOpen && (
              <div className="absolute right-0 top-full mt-2 z-50 w-72 p-3 rounded-2xl bg-[#141414] border border-[#2c2c2c] shadow-2xl shadow-black/80 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-[#242424]">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#c9a84c]">
                    Share Case Study
                  </span>
                  <span className="text-[10px] text-[#777777]">Direct Link</span>
                </div>

                {/* Quick copy input box */}
                <div className="flex items-center gap-1.5 p-1.5 rounded-xl bg-[#0c0c0c] border border-[#242424] mb-3">
                  <input
                    type="text"
                    readOnly
                    value={shareUrl}
                    className="w-full bg-transparent text-[11px] font-mono text-[#888888] px-1.5 outline-none truncate select-all"
                  />
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className="px-2.5 py-1 text-[11px] font-semibold rounded-lg bg-[#202020] hover:bg-[#2a2a2a] text-white border border-[#333333] hover:border-[#c9a84c]/50 transition-colors shrink-0 flex items-center gap-1 cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3 h-3 text-[#22c55e]" />
                        <span className="text-[#22c55e]">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 text-[#aaaaaa]" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Social Share Options */}
                <div className="space-y-1">
                  {shareChannels.map((channel) => {
                    const Icon = channel.icon;
                    return (
                      <a
                        key={channel.name}
                        href={channel.href}
                        target={channel.name === 'Email' ? undefined : '_blank'}
                        rel={channel.name === 'Email' ? undefined : 'noopener noreferrer'}
                        onClick={() => setIsShareOpen(false)}
                        className="w-full flex items-center gap-2.5 px-2.5 py-2 text-xs font-medium rounded-xl text-[#cccccc] hover:text-white hover:bg-[#1f1f1f] border border-transparent hover:border-[#2f2f2f] transition-colors group cursor-pointer"
                      >
                        <div
                          className={`w-6 h-6 rounded-lg ${channel.color} flex items-center justify-center shrink-0`}
                        >
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <span>{channel.label}</span>
                        {channel.name !== 'Email' && (
                          <ExternalLink className="w-3 h-3 text-[#555555] group-hover:text-[#aaaaaa] ml-auto transition-colors" />
                        )}
                      </a>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Export PDF Button */}
          <button
            type="button"
            onClick={() => {
              if (typeof window !== 'undefined') window.print();
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#161616] hover:bg-[#222222] text-[#cccccc] hover:text-white border border-[#262626] hover:border-[#c9a84c]/40 transition-colors cursor-pointer print:hidden"
            title="Print or Save Executive Briefing as PDF"
          >
            <Printer className="w-3.5 h-3.5 text-[#aaaaaa]" />
            <span className="hidden sm:inline">Export PDF</span>
          </button>

          {isModal && onNavigateProject && totalProjects && totalProjects > 1 && (
            <div className="flex items-center gap-1 bg-[#141414] border border-[#262626] rounded-lg p-0.5">
              <button
                type="button"
                onClick={() => onNavigateProject('prev')}
                disabled={!hasPrev}
                className="p-1 rounded text-[#aaaaaa] hover:text-white hover:bg-[#222222] disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                aria-label="Previous Case Study"
                title="Previous Case Study (Left Arrow)"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              {typeof currentIndex === 'number' && (
                <span className="px-1.5 text-[11px] font-mono text-[#888888]">
                  {currentIndex + 1}/{totalProjects}
                </span>
              )}
              <button
                type="button"
                onClick={() => onNavigateProject('next')}
                disabled={!hasNext}
                className="p-1 rounded text-[#aaaaaa] hover:text-white hover:bg-[#222222] disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                aria-label="Next Case Study"
                title="Next Case Study (Right Arrow)"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Title & Overview Header */}
      <div>
        <h1
          className={`${
            isModal ? 'text-2xl sm:text-3xl' : 'text-3xl sm:text-5xl'
          } font-black tracking-tight text-white mb-3 leading-tight`}
        >
          {project.title}
        </h1>

        {project.overview && (
          <p className="text-base text-[#aaaaaa] leading-relaxed w-full">
            {project.overview}
          </p>
        )}
      </div>

      {/* System Specifications Grid */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-widest text-[#c9a84c] mb-3 flex items-center gap-2">
          <Cpu className="w-3.5 h-3.5" />
          <span>Core System Architecture Specs</span>
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {project.specs.map((spec, sIdx) => (
            <div key={sIdx} className="p-3.5 rounded-xl bg-[#121212] border border-[#222222]">
              <span className="text-[#666666] block text-[10px] uppercase font-bold tracking-wider mb-1">
                {spec.label}
              </span>
              <span className="font-mono text-xs sm:text-sm font-semibold text-white block truncate">
                {spec.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* System Topology & Data Flow Pipeline (Interactive Flow Diagram) */}
      {project.architectureFlow && project.architectureFlow.length > 0 && (
        <div className="p-6 rounded-2xl bg-[#0f0f0f] border border-[#262626] relative overflow-hidden">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
              <Workflow className="w-4 h-4 text-[#c9a84c]" />
              <span>System Topology & Data Pipeline Flow</span>
            </h3>
            <span className="text-[11px] font-mono text-[#777777] bg-[#161616] px-2.5 py-1 rounded-md border border-[#242424]">
              High-Concurrency Architecture Sequence
            </span>
          </div>
          <p className="text-xs text-[#888888] mb-5">
            End-to-end execution path from edge ingestion to distributed core processing and storage:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 relative">
            {project.architectureFlow.map((step, idx) => (
              <div
                key={idx}
                className="relative p-4 rounded-xl bg-[#141414] border border-[#262626] hover:border-[#c9a84c]/50 transition-colors flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#c9a84c]/15 text-[#c9a84c] border border-[#c9a84c]/30">
                      Step {step.step}
                    </span>
                    {idx < project.architectureFlow!.length - 1 && (
                      <span className="hidden md:inline-block text-[#555555] group-hover:text-[#c9a84c] transition-colors">
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </div>
                  <h4 className="text-xs font-bold text-white mb-1.5 leading-snug">
                    {step.label}
                  </h4>
                  <p className="text-[11px] text-[#999999] leading-relaxed">
                    {step.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Challenges & Bottlenecks */}
      {project.challenges && project.challenges.length > 0 && (
        <div className="p-6 rounded-2xl bg-[#121212] border border-[#242424]">
          <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-2 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-[#eab308]" />
            <span>The Architectural Challenge & Legacy Bottlenecks</span>
          </h3>
          <p className="text-xs text-[#888888] mb-4">
            Critical failure modes and operational constraints identified during initial discovery:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {project.challenges.map((ch, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2.5 p-3 rounded-xl bg-[#161616] border border-[#242424] text-xs text-[#cccccc] leading-relaxed"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#eab308] mt-1.5 shrink-0" />
                <span>{ch}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Engineered Solution & Architectural Pillars */}
      {project.solutionPillars && project.solutionPillars.length > 0 && (
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4 flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#c9a84c]" />
            <span>Engineered Solution Strategy</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {project.solutionPillars.map((pillar, pIdx) => (
              <div
                key={pIdx}
                className="p-5 rounded-2xl bg-[#121212] border border-[#242424] hover:border-[#c9a84c]/40 transition-colors"
              >
                <div className="w-7 h-7 rounded-lg bg-[#c9a84c]/10 text-[#c9a84c] flex items-center justify-center text-xs font-mono font-bold mb-3">
                  0{pIdx + 1}
                </div>
                <h4 className="text-sm font-bold text-white mb-2">
                  {pillar.title}
                </h4>
                <p className="text-xs text-[#aaaaaa] leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Phased Execution Roadmap */}
      {project.timeline && project.timeline.length > 0 && (
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4 flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#c9a84c]" />
            <span>Engineering Delivery Roadmap ({project.duration})</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {project.timeline.map((item, tIdx) => (
              <div
                key={tIdx}
                className="p-4 rounded-xl bg-[#121212] border border-[#222222] relative overflow-hidden"
              >
                <div className="flex items-center justify-between text-[11px] mb-2 font-mono">
                  <span className="text-[#c9a84c] font-bold">{item.phase}</span>
                  <span className="text-[#666666]">{item.duration}</span>
                </div>
                <h4 className="text-xs font-bold text-white mb-1.5 leading-snug">
                  {item.title}
                </h4>
                <p className="text-[11px] text-[#888888] leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Verified Business Outcomes */}
      {project.outcomes && project.outcomes.length > 0 && (
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#c9a84c] mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            <span>Verified Outcomes & Production Benchmarks</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {project.outcomes.map((outcome, oIdx) => (
              <div
                key={oIdx}
                className="p-5 rounded-2xl bg-[#141414] border border-[#2a2a2a] relative group hover:border-[#c9a84c]/50 transition-colors"
              >
                <div className="text-2xl sm:text-3xl font-black text-[#c9a84c] tabular-nums mb-1 tracking-tight">
                  {outcome.metric}
                </div>
                <div className="text-xs font-bold text-white mb-1.5">
                  {outcome.label}
                </div>
                <div className="text-[11px] text-[#888888] leading-relaxed">
                  {outcome.detail}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Client Endorsement & Production Feedback */}
      {project.testimonial && (
        <div className="p-6 rounded-2xl bg-[#121212] border border-[#262626] relative">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-1.5">
              {[...Array(project.testimonial.rating || 5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#c9a84c] text-[#c9a84c]" />
              ))}
            </div>
            <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-[#22c55e]/10 text-[#22c55e] border border-[#22c55e]/30 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              Verified Production Review
            </span>
          </div>

          <div className="relative pl-6 mb-4">
            <Quote className="w-5 h-5 text-[#c9a84c]/30 absolute left-0 top-0" />
            <blockquote className="text-sm sm:text-base text-[#e0e0e0] italic leading-relaxed">
              &ldquo;{project.testimonial.content}&rdquo;
            </blockquote>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-[#222222] text-xs">
            <div>
              <div className="font-bold text-white">{project.testimonial.clientName}</div>
              <div className="text-[#888888]">
                {project.testimonial.clientRole}, <span className="text-[#c9a84c]">{project.testimonial.company}</span>
              </div>
            </div>
            <span className="text-[11px] text-[#666666]">
              Engagement: {project.duration}
            </span>
          </div>
        </div>
      )}

      {/* Tech Stack Categories */}
      {project.techStack && project.techStack.length > 0 && (
        <div className="p-6 rounded-2xl bg-[#101010] border border-[#222222]">
          <h3 className="text-xs font-bold uppercase tracking-widest text-[#aaaaaa] mb-4">
            Technology Stack & Cloud Infrastructure
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {project.techStack.map((stackGroup, gIdx) => (
              <div key={gIdx} className="space-y-2">
                <span className="text-[10px] font-mono uppercase font-bold text-[#666666]">
                  {stackGroup.category}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {stackGroup.technologies.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-[#181818] text-[#cccccc] border border-[#282828]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Related Engineering Research Whitepaper */}
      {relatedArticle && (
        <div className="p-6 rounded-2xl bg-[#111111] border border-[#242424] hover:border-[#c9a84c]/40 transition-colors">
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#c9a84c] font-bold flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              Associated Engineering Lab Research
            </span>
            <span className="text-[10px] font-mono text-[#666666]">
              {relatedArticle.date} • {relatedArticle.author}
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h4 className="text-sm sm:text-base font-bold text-white mb-1.5">
                {relatedArticle.title}
              </h4>
              <p className="text-xs text-[#888888] max-w-2xl leading-relaxed">
                {relatedArticle.excerpt}
              </p>
            </div>
            <Link
              href={`/blogs/${relatedArticle.id}`}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#181818] hover:bg-[#222222] text-[#cccccc] hover:text-white border border-[#2a2a2a] hover:border-[#c9a84c]/50 transition-colors shrink-0"
            >
              <span>Read Briefing</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#c9a84c]" />
            </Link>
          </div>
        </div>
      )}

      {/* Bottom Action Footer */}
      <div className="pt-6 border-t border-[#222222] flex flex-col sm:flex-row items-center justify-between gap-4 print:hidden">
        {onOpenConsultation && (
          <Button
            onClick={handleTriggerConsultation}
            variant="primary"
            size="md"
            icon={<ArrowRight className="w-4 h-4" />}
          >
            Inquire Architecture for Similar Project
          </Button>
        )}

        <div className="flex items-center gap-3 ml-auto">
          {isModal ? (
            <>
              {onNavigateProject && totalProjects && totalProjects > 1 && (
                <div className="flex items-center gap-1.5 mr-2">
                  <button
                    type="button"
                    onClick={() => onNavigateProject('prev')}
                    disabled={!hasPrev}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-xl bg-[#161616] hover:bg-[#222222] text-[#cccccc] hover:text-white border border-[#262626] disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span>Prev</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onNavigateProject('next')}
                    disabled={!hasNext}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-xl bg-[#161616] hover:bg-[#222222] text-[#cccccc] hover:text-white border border-[#262626] disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
              <Link
                href={`/portfolio/${project.id}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-[#1a1a1a] hover:bg-[#222222] border border-[#2a2a2a] hover:border-[#c9a84c]/50 rounded-xl transition-colors"
              >
                <span>Open Full Page View</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#c9a84c]" />
              </Link>
              {onClose && (
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold text-[#888888] hover:text-white transition-colors cursor-pointer"
                >
                  Close
                </button>
              )}
            </>
          ) : (
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#aaaaaa] hover:text-white transition-colors"
            >
              <span>Back to All Case Studies</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
