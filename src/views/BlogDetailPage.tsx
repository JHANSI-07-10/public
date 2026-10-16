'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  VERIFIED_INSIGHTS,
  Service,
  InsightArticle,
  getRelatedProjectForArticle,
  getArticleTakeaways,
} from '../data/content';
import { getArticleBreakdown } from '../data/articleBreakdowns';
import { Button } from '../components/ui/Button';
import { Reveal } from '../components/motion/Reveal';
import { StaggerContainer, StaggerItem } from '../components/motion/StaggerContainer';
import {
  ArrowLeft,
  ArrowRight,
  Share2,
  Check,
  Calendar,
  User,
  Clock,
  ArrowUpRight,
  Copy,
  Linkedin,
  Twitter,
  Mail,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Quote,
  Cpu,
  FileCheck2,
} from 'lucide-react';

interface BlogDetailPageProps {
  id: string;
  onOpenConsultation: (service?: Service) => void;
}

const ArticleShareMenu: React.FC<{ article: InsightArticle }> = ({ article }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const shareUrl =
    typeof window !== 'undefined'
      ? window.location.href
      : `https://vpdtechnologies.com/blogs/${article.id}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        className="inline-flex items-center gap-2 shrink-0 px-3 py-1.5 rounded-lg border border-[#2a2a2a] bg-[#141414] text-xs font-semibold text-[#aaaaaa] hover:text-white hover:border-[#c9a84c]/50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c] cursor-pointer"
        aria-label="Share this article"
      >
        <Share2 className="w-3.5 h-3.5 text-[#c9a84c]" />
        <span className="hidden sm:inline">Share</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 z-50 w-64 p-3 rounded-2xl bg-[#141414] border border-[#2c2c2c] shadow-2xl shadow-black/80 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#242424]">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#c9a84c]">
              Share Briefing
            </span>
            <button
              type="button"
              onClick={handleCopy}
              className="text-[10px] font-mono font-bold text-[#aaaaaa] hover:text-white flex items-center gap-1 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3 text-[#22c55e]" />
                  <span className="text-[#22c55e]">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>Copy Link</span>
                </>
              )}
            </button>
          </div>

          <div className="space-y-1">
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center gap-2 px-2 py-1.5 text-xs text-[#cccccc] hover:text-white hover:bg-[#1f1f1f] rounded-lg transition-colors cursor-pointer"
            >
              <div className="w-5 h-5 rounded bg-[#0a66c2]/15 text-[#0a66c2] flex items-center justify-center shrink-0">
                <Linkedin className="w-3 h-3" />
              </div>
              <span>LinkedIn</span>
            </a>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                `Technical Briefing: "${article.title}" by @VPDTechnologies`
              )}&url=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center gap-2 px-2 py-1.5 text-xs text-[#cccccc] hover:text-white hover:bg-[#1f1f1f] rounded-lg transition-colors cursor-pointer"
            >
              <div className="w-5 h-5 rounded bg-sky-500/15 text-sky-400 flex items-center justify-center shrink-0">
                <Twitter className="w-3 h-3" />
              </div>
              <span>X (Twitter)</span>
            </a>
            <a
              href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                `Read this technical briefing: "${article.title}" by VPD Technologies: ${shareUrl}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center gap-2 px-2 py-1.5 text-xs text-[#cccccc] hover:text-white hover:bg-[#1f1f1f] rounded-lg transition-colors cursor-pointer"
            >
              <span>WhatsApp</span>
            </a>
            <a
              href={`mailto:?subject=${encodeURIComponent(
                `${article.title} - VPD Engineering Lab Briefing`
              )}&body=${encodeURIComponent(
                `Hi,\n\nI thought you would find this engineering briefing insightful:\n\n${article.title}\n${article.excerpt}\n\nRead more: ${shareUrl}`
              )}`}
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center gap-2 px-2 py-1.5 text-xs text-[#cccccc] hover:text-white hover:bg-[#1f1f1f] rounded-lg transition-colors cursor-pointer"
            >
              <div className="w-5 h-5 rounded bg-[#c9a84c]/15 text-[#c9a84c] flex items-center justify-center shrink-0">
                <Mail className="w-3 h-3" />
              </div>
              <span>Email</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export const BlogDetailPage: React.FC<BlogDetailPageProps> = ({ id, onOpenConsultation }) => {
  const articleRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);

  const article = VERIFIED_INSIGHTS.find((a) => a.id === id) || VERIFIED_INSIGHTS[0];
  const related = VERIFIED_INSIGHTS.filter((a) => a.id !== article.id).slice(0, 2);
  const relatedProject = getRelatedProjectForArticle(article.id);
  const takeaways = getArticleTakeaways(article);
  const breakdown = getArticleBreakdown(article.id);

  useEffect(() => {
    setProgress(0);
    window.scrollTo(0, 0);
  }, [article.id]);

  useEffect(() => {
    const onScroll = () => {
      const el = articleRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      if (total <= 0) {
        setProgress(100);
        return;
      }
      const passed = Math.min(Math.max(-rect.top, 0), total);
      setProgress((passed / total) * 100);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [article.id]);

  return (
    <div className="pt-28 pb-20 bg-[#0a0a0a]">
      {/* Reading progress rail (below navbar) */}
      <div className="fixed top-[64px] left-0 right-0 z-40 h-0.5 bg-[#161616]" aria-hidden="true">
        <div
          className="h-full bg-gradient-to-r from-[#c9a84c] to-[#f3d57b] shadow-[0_0_12px_rgba(201,168,76,0.6)]"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Breadcrumb Header */}
      <section className="py-8 border-b border-[#1f1f1f] bg-[#0d0d0d]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#888888] font-medium min-w-0">
              <Link href="/" className="hover:text-white transition-colors shrink-0">Home</Link>
              <span aria-hidden="true">/</span>
              <Link href="/blogs" className="hover:text-white transition-colors shrink-0">Insights</Link>
              <span aria-hidden="true">/</span>
              <span className="text-[#c9a84c] truncate">{article.title}</span>
            </nav>

            <ArticleShareMenu article={article} />
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article ref={articleRef} className="py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <Reveal className="mb-10">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {article.tags.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 rounded bg-[#181818] border border-[#2a2a2a] text-xs font-mono font-bold text-[#c9a84c]"
                >
                  {t.toUpperCase()}
                </span>
              ))}

              {relatedProject && (
                <div
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#c9a84c]/10 border border-[#c9a84c]/30 text-[10px] font-mono font-bold text-[#c9a84c]"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse" />
                  <span>Verified in Production: {relatedProject.title}</span>
                </div>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-6 leading-tight text-balance">
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-[#888888] pb-6 border-b border-[#222222]">
              <div className="flex items-center gap-2">
                <User className="w-3.5 h-3.5 text-[#c9a84c]" />
                <span className="text-white font-medium">{article.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-[#c9a84c]" />
                <span>{article.date}</span>
              </div>
              <div className="inline-flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#c9a84c]" />
                <span>5 Min Technical Read</span>
              </div>
            </div>
          </Reveal>

          {/* Technical Specifications Matrix (Replaces Image) */}
          <Reveal delay={0.06} className="mb-10">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              {breakdown.specifications.map((spec, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl bg-[#121212] border border-[#242424] hover:border-[#c9a84c]/40 transition-colors"
                >
                  <span className="block text-[10px] font-mono uppercase tracking-wider text-[#777777] mb-1">
                    {spec.label}
                  </span>
                  <span className="text-xs sm:text-sm font-bold font-mono text-white">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Executive Architecture Takeaways Callout */}
          <Reveal delay={0.08} className="mb-10">
            <div className="p-6 sm:p-7 rounded-2xl bg-[#121212] border border-[#262626] relative overflow-hidden">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-4 h-4 text-[#c9a84c]" />
                <h3 className="text-xs font-mono uppercase font-bold tracking-widest text-[#c9a84c]">
                  Executive Architecture Takeaways
                </h3>
              </div>
              <ul className="space-y-3">
                {takeaways.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#cccccc] leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-[#22c55e] mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Article Executive Summary & Problem Scope */}
          <Reveal delay={0.1} className="mb-12">
            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#141414] to-[#0f0f0f] border-l-4 border-l-[#c9a84c] border border-[#262626]">
              <div className="flex items-center gap-2 mb-2">
                <Cpu className="w-4 h-4 text-[#c9a84c]" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#c9a84c] font-bold">
                  {breakdown.topicBadge}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">
                {breakdown.summaryTitle}
              </h2>
              <p className="text-sm sm:text-base text-[#cccccc] leading-relaxed">
                {breakdown.summaryText}
              </p>
            </div>
          </Reveal>

          {/* In-Depth Architectural Breakdown Sections */}
          <div className="space-y-12">
            {breakdown.sections.map((section, sIdx) => (
              <Reveal key={sIdx} delay={0.08 + sIdx * 0.04}>
                <section className="space-y-4 pt-8 first:pt-0 border-t border-[#202020] first:border-t-0">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-[#c9a84c]/15 text-[#c9a84c] font-mono text-xs font-bold flex items-center justify-center shrink-0 border border-[#c9a84c]/30">
                      0{sIdx + 1}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      {section.heading}
                    </h3>
                  </div>

                  <div className="space-y-4 text-base text-[#b8b8b8] leading-relaxed">
                    {section.paragraphs.map((p, pIdx) => (
                      <p key={pIdx}>{p}</p>
                    ))}
                  </div>

                  {section.bulletPoints && section.bulletPoints.length > 0 && (
                    <div className="mt-5 p-5 sm:p-6 rounded-xl bg-[#131313] border border-[#222222]">
                      <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-[#c9a84c] block mb-3">
                        Technical Implementation Protocols
                      </span>
                      <ul className="space-y-2.5">
                        {section.bulletPoints.map((bp, bIdx) => (
                          <li key={bIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#cccccc] leading-relaxed">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#c9a84c] mt-2 shrink-0" />
                            <span>{bp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </section>
              </Reveal>
            ))}
          </div>

          {/* Key Architectural Principle Callout */}
          <Reveal delay={0.1} className="my-12">
            <div className="p-6 sm:p-8 rounded-2xl bg-[#141414] border border-[#282828] relative overflow-hidden">
              <Quote className="w-8 h-8 text-[#c9a84c]/30 mb-3" />
              <blockquote className="text-base sm:text-lg font-medium text-white italic mb-4 leading-relaxed">
                "{breakdown.keyPrinciple.quote}"
              </blockquote>
              <div className="flex items-center gap-3 pt-3 border-t border-[#222222]">
                <div>
                  <span className="text-xs font-bold text-[#c9a84c] block">
                    {breakdown.keyPrinciple.author}
                  </span>
                  <span className="text-[10px] text-[#777777] font-mono">
                    {breakdown.keyPrinciple.role}
                  </span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Architectural Verification Checklist */}
          <Reveal delay={0.12} className="my-12">
            <div className="p-6 sm:p-7 rounded-2xl bg-[#111111] border border-[#252525]">
              <div className="flex items-center gap-2 mb-4">
                <FileCheck2 className="w-4 h-4 text-[#22c55e]" />
                <h4 className="text-xs font-mono uppercase font-bold tracking-widest text-[#22c55e]">
                  Production Verification Checklist
                </h4>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {breakdown.architectureChecklist.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-[#161616] border border-[#222222] text-xs text-[#cccccc]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#22c55e] mt-0.5 shrink-0" />
                    <span className="leading-snug">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Verified Production Case Study Callout */}
          {relatedProject && (
            <Reveal delay={0.06} className="my-10">
              <div className="p-6 sm:p-7 rounded-2xl bg-[#121212] border border-[#c9a84c]/30 relative overflow-hidden group">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                  <span className="text-[10px] font-mono uppercase font-bold tracking-wider px-2.5 py-1 rounded bg-[#22c55e]/10 text-[#22c55e] border border-[#22c55e]/30 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Verified in Production Deployment
                  </span>
                  <span className="text-xs font-mono font-bold text-[#c9a84c]">
                    {relatedProject.metricHighlight} {relatedProject.metricLabel}
                  </span>
                </div>
                <h4 className="text-lg font-bold text-white mb-2">
                  {relatedProject.title}
                </h4>
                <p className="text-xs text-[#aaaaaa] leading-relaxed mb-4">
                  {relatedProject.overview || relatedProject.solution}
                </p>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-[#222222]">
                  <span className="text-xs text-[#777777]">
                    Client: <strong className="text-white font-medium">{relatedProject.client}</strong> ({relatedProject.duration})
                  </span>
                  <Link
                    href="/contact"
                    className="vpd-outline-cta inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-black bg-[#c9a84c] hover:bg-[#d4b55c] transition-colors shrink-0"
                  >
                    <span>Schedule Technical Discussion</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </Reveal>
          )}

          {/* Call to action inside article */}
          <Reveal delay={0.08} className="mt-14">
            <div className="p-8 rounded-2xl bg-[#141414] border border-[#2a2a2a] flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="text-center sm:text-left">
                <h4 className="text-lg font-bold text-white mb-1">Implement This Architecture</h4>
                <p className="text-xs text-[#888888]">
                  Schedule an architectural audit with our technical team to discuss
                  implementation.
                </p>
              </div>
              <Button
                onClick={() => onOpenConsultation()}
                variant="primary"
                size="md"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Consult with Engineers
              </Button>
            </div>
          </Reveal>

          {/* Related briefs */}
          {related.length > 0 && (
            <section className="mt-16 pt-10 border-t border-[#222222]" aria-label="Related articles">
              <h3 className="text-xs font-bold tracking-widest text-[#c9a84c] uppercase mb-6">
                Continue Reading
              </h3>
              <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-5" staggerDelay={0.1}>
                {related.map((rel) => (
                  <StaggerItem key={rel.id}>
                    <Link
                      href={`/blogs/${rel.id}`}
                      className="group block h-full rounded-xl border border-[#262626] bg-[#141414] p-5 card-hover"
                    >
                      <div className="text-[10px] font-mono text-[#777777] mb-2">
                        {rel.author} · {rel.date}
                      </div>
                      <h4 className="text-sm font-bold text-white mb-2 group-hover:text-[#c9a84c] transition-colors leading-snug">
                        {rel.title}
                      </h4>
                      <p className="text-xs text-[#888888] line-clamp-2 leading-relaxed">
                        {rel.excerpt}
                      </p>
                    </Link>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </section>
          )}
        </div>
      </article>
    </div>
  );
};
