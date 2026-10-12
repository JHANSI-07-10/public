'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { VERIFIED_INSIGHTS, Service } from '../data/content';
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
} from 'lucide-react';

interface BlogDetailPageProps {
  id: string;
  onOpenConsultation: (service?: Service) => void;
}

export const BlogDetailPage: React.FC<BlogDetailPageProps> = ({ id, onOpenConsultation }) => {
  const articleRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [copied, setCopied] = useState(false);

  const article = VERIFIED_INSIGHTS.find((a) => a.id === id) || VERIFIED_INSIGHTS[0];

  const related = VERIFIED_INSIGHTS.filter((a) => a.id !== article.id).slice(0, 2);

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

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

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

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 shrink-0 px-3 py-1.5 rounded-lg border border-[#2a2a2a] bg-[#141414] text-xs font-semibold text-[#aaaaaa] hover:text-white hover:border-[#c9a84c]/50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c]"
              aria-label="Copy link to this article"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-[#22c55e]" />
              ) : (
                <Share2 className="w-3.5 h-3.5 text-[#c9a84c]" />
              )}
              <span className="hidden sm:inline">{copied ? 'Link Copied' : 'Share'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article ref={articleRef} className="py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <Reveal className="mb-10">
            <div className="flex flex-wrap gap-2 mb-4">
              {article.tags.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 rounded bg-[#181818] border border-[#2a2a2a] text-[10px] font-mono font-bold text-[#c9a84c]"
                >
                  {t.toUpperCase()}
                </span>
              ))}
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

          {/* Featured Image */}
          <Reveal delay={0.08} className="mb-12">
            <div className="rounded-2xl overflow-hidden aspect-[16/9] max-h-[460px] bg-[#141414] border border-[#262626]">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
          </Reveal>

          {/* Article Body */}
          <Reveal delay={0.12}>
            <div className="prose prose-invert max-w-none space-y-6 text-base text-[#cccccc] leading-relaxed">
              <p className="text-lg sm:text-xl text-white font-medium leading-relaxed">
                {article.excerpt}
              </p>

              <h2 className="text-2xl font-bold text-white pt-6 border-t border-[#222222]">
                The Architectural Imperative
              </h2>
              <p>
                In high-frequency enterprise environments, the trade-off between user experience
                agility and system reliability is often mismanaged. Engineering teams default to
                either bloated client bundles that degrade conversion velocity, or rigid monolithic
                architectures that cannot accommodate evolving business requirements.
              </p>
              <p>
                At VPD Technologies, our architectural standard couples lightweight, edge-rendered
                frontends with strictly decoupled event-driven service meshes. This guarantees that
                operational state synchronization remains resilient even during peak traffic
                conditions.
              </p>

              <div className="p-6 rounded-2xl bg-[#141414] border border-[#282828] my-8">
                <h3 className="text-base font-bold text-[#c9a84c] mb-2">
                  Key Architectural Principle
                </h3>
                <p className="text-sm text-[#aaaaaa] italic m-0">
                  "Zero-waste codebases are not an aesthetic luxury; they are a financial
                  imperative. Every 100 milliseconds of latency directly degrades user retention and
                  transaction throughput."
                </p>
              </div>

              <h2 className="text-2xl font-bold text-white pt-6 border-t border-[#222222]">
                Scalability & Implementation Protocols
              </h2>
              <p>
                By leveraging type-safe Java protocols and Spring Boot on the backend alongside React
                and WebSockets on the frontend, enterprises obtain the rare duality of banking-grade
                data security with fluid real-time interactions.
              </p>
            </div>
          </Reveal>

          {/* Call to action inside article */}
          <Reveal delay={0.08} className="mt-16">
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
                        {rel.date}
                      </div>
                      <h4 className="text-base font-bold text-white leading-snug mb-2 group-hover:text-[#c9a84c] transition-colors">
                        {rel.title}
                      </h4>
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#c9a84c]">
                        Read Brief
                        <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    </Link>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </section>
          )}

          {/* Navigation Back */}
          <div className="mt-12 pt-8 border-t border-[#222222]">
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#aaaaaa] hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4 text-[#c9a84c]" />
              <span>Back to All Articles</span>
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
};
