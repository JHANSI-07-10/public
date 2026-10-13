'use client';

import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { SectionHeader } from '../components/ui/SectionHeader';
import { Button } from '../components/ui/Button';
import { CountingNumber } from '../components/ui/counting-number';
import { Reveal } from '../components/motion/Reveal';
import { StaggerContainer, StaggerItem } from '../components/motion/StaggerContainer';
import { VERIFIED_INSIGHTS, InsightArticle, Service, getRelatedProjectForArticle } from '../data/content';
import {
  ArrowUpRight,
  ArrowRight,
  Clock,
  SearchX,
  Search,
  X,
  CheckCircle2,
  ShieldCheck,
  Layers,
  Gauge,
} from 'lucide-react';
import Link from 'next/link';

interface BlogsPageProps {
  onOpenConsultation: (service?: Service) => void;
}

const MARQUEE_TOPICS = [
  'REACT PERFORMANCE',
  'EVENT-DRIVEN MESH',
  'SPRING BOOT',
  'WEBSOCKETS SYNC',
  'EDGE RUNTIME',
  'CORE WEB VITALS',
  'MULTI-TENANT SAAS',
  'ISO 27001',
  'AES-256',
  'RBAC DESIGN',
  'POSTGRESQL TUNING',
  'DOCKER STRATEGY',
  'CI/CD PIPELINES',
  'CONVERSION FUNNELS',
  'EVENT REPLAY SAFETY',
  'COMPLIANCE AUDITS',
];

const readingMinutes = (article: InsightArticle) => {
  const words = `${article.title} ${article.excerpt}`.split(/\s+/).length;
  return Math.max(3, Math.ceil((words + 40) / 40));
};

const TagPill: React.FC<{
  label: string;
  active: boolean;
  onClick: () => void;
}> = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    aria-pressed={active}
    className={`relative shrink-0 px-4 py-2 rounded-xl text-xs font-mono font-semibold border transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c] ${
      active
        ? 'border-[#c9a84c] text-black'
        : 'border-[#242424] bg-[#141414] text-[#aaaaaa] hover:text-white hover:border-[#c9a84c]/40'
    }`}
  >
    {active && (
      <motion.span
        layoutId="insight-tag-indicator"
        className="absolute inset-0 rounded-xl bg-[#c9a84c]"
        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
      />
    )}
    <span className="relative z-10">{label}</span>
  </button>
);

const CoverFrame: React.FC<{ article: InsightArticle; featured?: boolean }> = ({
  article,
  featured = false,
}) => (
  <div
    className={`relative overflow-hidden bg-[#181818] border-b border-[#242424] ${
      featured ? 'lg:w-3/5 lg:border-b-0 lg:border-r aspect-[16/10] lg:aspect-auto lg:min-h-[340px]' : 'aspect-[16/10]'
    }`}
  >
    <img
      src={article.image}
      alt={article.title}
      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      loading="lazy"
      referrerPolicy="no-referrer"
      onError={(e) => {
        const parent = (e.target as HTMLElement).parentElement;
        if (parent) {
          parent.innerHTML = `
            <div class="w-full h-full flex flex-col items-center justify-center bg-[#1a1a1a] p-4 text-center">
              <span class="text-xs font-mono text-[#c9a84c]">${article.tags[0]}</span>
            </div>
          `;
        }
      }}
    />
    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/55 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
      {article.tags.map((t) => (
        <span
          key={t}
          className="px-2 py-0.5 rounded bg-black/80 backdrop-blur-md text-xs font-mono text-[#c9a84c] font-bold"
        >
          {t.toUpperCase()}
        </span>
      ))}
    </div>
    <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md text-xs font-mono font-bold text-[#cccccc]">
      <Clock className="w-3 h-3 text-[#c9a84c]" />
      {readingMinutes(article)} MIN
    </span>
  </div>
);

export const BlogsPage: React.FC<BlogsPageProps> = ({ onOpenConsultation }) => {
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const shouldReduceMotion = useReducedMotion();

  const allTags = useMemo(() => {
    const unique = Array.from(
      new Set(VERIFIED_INSIGHTS.flatMap((a) => a.tags.map((t) => t.toLowerCase())))
    );
    return ['all', ...unique];
  }, []);

  const filteredArticles = useMemo(() => {
    let result =
      selectedTag === 'all'
        ? VERIFIED_INSIGHTS
        : VERIFIED_INSIGHTS.filter((a) =>
            a.tags.some((t) => t.toLowerCase() === selectedTag)
          );

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter((a) => {
        const inTitle = a.title.toLowerCase().includes(q);
        const inExcerpt = a.excerpt.toLowerCase().includes(q);
                                                                                                                      const inAuthor = a.author.toLowerCase().includes(q);
                                                                                                                      const inTags = a.tags.some((t) => t.toLowerCase().includes(q));
                                                                                                                      return inTitle || inExcerpt || inAuthor || inTags;
                                                                                                                    });
                                                                                                                  }

                                                                                                                  return result;
                                                                                                                }, [selectedTag, searchQuery]);

                                                                                                                const isFeaturedLayout = filteredArticles.length > 2 && !searchQuery;

<<<<<<< Updated upstream
          {/* Lab stats bar with count-up numbers */}
          <StaggerContainer
            className="grid grid-cols-3 gap-4 sm:gap-8 max-w-2xl mx-auto mb-10 pt-8 border-t border-[#1f1f1f]"
            staggerDelay={0.1}
          >
            {[
              { icon: Layers, target: VERIFIED_INSIGHTS.length, suffix: '', label: 'Published briefs' },
              { icon: ShieldCheck, target: allTags.length - 1, suffix: '', label: 'Technical topics' },
              { icon: Gauge, target: avgRead, suffix: ' Min', label: 'Average read time' },
            ].map((stat) => (
              <StaggerItem key={stat.label} className="text-center">
                <stat.icon className="w-4 h-4 text-[#c9a84c] mx-auto mb-2" />
                <div className="text-2xl sm:text-3xl font-black tracking-tight text-white tabular-nums">
                  <CountingNumber value={`${stat.target}${stat.suffix}`} duration={1.2} />
                </div>
                <div className="mt-1 text-xs font-mono uppercase tracking-wider text-[#777777]">
                  {stat.label}
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
=======
                                                                                                                return (
                                                                                                                  <div className="pt-20 pb-0 bg-[#0a0a0a]">
                                                                                                                    {/* ── Section 1: Hero + live filters ─────────────────────────── */}
                                                                                                                    <section className="relative pt-4 pb-5 sm:pt-6 sm:pb-6 border-b border-[#1f1f1f] overflow-hidden">
                                                                                                                      {/* Locally-authored SVG artwork backdrop (ships with the repo, no external links) */}
                                                                                                                      <img
                                                                                                                        src="/bg-insights-hero.svg"
                                                                                                                        alt=""
                                                                                                                        aria-hidden="true"
                                                                                                                        className="absolute inset-0 w-full h-full object-cover object-[72%_center] opacity-55 pointer-events-none select-none"
                                                                                                                      />
                                                                                                                      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/85 via-[#0a0a0a]/60 to-[#0a0a0a]/90 pointer-events-none" aria-hidden="true" />
                                                                                                                      <div className="absolute inset-0 hero-tech-grid opacity-40 pointer-events-none" />
                                                                                                                      <div className="absolute inset-0 hero-radial-glow pointer-events-none opacity-70" aria-hidden="true" />
                                                                                                                      {/* Slow gold scanline sweeping the lab grid */}
                                                                                                                      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
                                                                                                                        <div className="insights-scanline absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-[#c9a84c]/45 to-transparent" />
                                                                                                                      </div>
>>>>>>> Stashed changes

                                                                                                                      <div className="max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10">
                                                                                                                        <SectionHeader
                                                                                                                          align="center"
                                                                                                                          eyebrow="Engineered Knowledge Base"
                                                                                                                          title={
                                                                                                                            <>
                                                                                                                              Architectural Deep Dives from the{' '}
                                                                                                                              <span className="text-[#c9a84c]">VPD Engineering Lab</span>.
                                                                                                                            </>
                                                                                                                          }
                                                                                                                          subtitle="Articles, technical methodologies, and architectural benchmarks on React frontends, real-time sync protocols, and enterprise Java systems."
                                                                                                                          className="!mb-6 sm:!mb-8"
                                                                                                                        />

                                                                                                                        {/* Search Bar */}
                                                                                                                        <div className="relative max-w-md mx-auto mb-6">
                                                                                                                          <Search className="w-4 h-4 text-[#777777] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                                                                                                                          <input
                                                                                                                            type="text"
                                                                                                                            value={searchQuery}
                                                                                                                            onChange={(e) => setSearchQuery(e.target.value)}
                                                                                                                            placeholder="Search technical briefs (e.g. React, Spring, Docker, Latency)..."
                                                                                                                            className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-[#121212] border border-[#262626] focus:border-[#c9a84c] text-xs text-white placeholder-[#666666] focus:outline-none focus:ring-1 focus:ring-[#c9a84c] transition-colors"
                                                                                                                          />
                                                                                                                          {searchQuery && (
                                                                                                                            <button
                                                                                                                              type="button"
                                                                                                                              onClick={() => setSearchQuery('')}
                                                                                                                              className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded text-[#777777] hover:text-white transition-colors cursor-pointer"
                                                                                                                              title="Clear search"
                                                                                                                            >
                                                                                                                              <X className="w-3.5 h-3.5" />
                                                                                                                            </button>
                                                                                                                          )}
                                                                                                                        </div>

                                                                                                                        {/* Animated filter pills */}
                                                                                                                        <div className="flex flex-wrap items-center justify-center gap-2">
                                                                                                                          {allTags.map((tag) => (
                                                                                                                            <TagPill
                                                                                                                              key={tag}
                                                                                                                              label={tag === 'all' ? 'ALL TOPICS' : tag.toUpperCase()}
                                                                                                                              active={selectedTag === tag}
                                                                                                                              onClick={() => setSelectedTag(tag)}
                                                                                                                            />
                                                                                                                          ))}
                                                                                                                        </div>
                                                                                                                      </div>
                                                                                                                    </section>

                                                                                                                    {/* ── Section 2: Bento article grid ──────────────────────────── */}
                                                                                                                    <section className="pt-5 pb-8 sm:pt-6 sm:pb-10">
                                                                                                                      <div className="max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
                                                                                                                        {filteredArticles.length === 0 ? (
                                                                                                                          <div className="flex flex-col items-center justify-center py-24 text-center">
                                                                                                                            <SearchX className="w-10 h-10 text-[#c9a84c] mb-4" />
                                                                                                                            <h3 className="text-xl font-bold text-white mb-2">No briefs on this topic yet</h3>
                                                                                                                            <p className="text-sm text-[#aaaaaa] mb-6 max-w-sm">
                                                                                                                              The lab is still cooking this one. Pick another topic or browse everything.
                                                                                                                            </p>
                                                                                                                            <Button
                                                                                                                              variant="secondary"
                                                                                                                              size="md"
                                                                                                                              onClick={() => {
                                                                                                                                setSelectedTag('all');
                                                                                                                                setSearchQuery('');
                                                                                                                              }}
                                                                                                                            >
                                                                                                                              Show All Topics
                                                                                                                            </Button>
                                                                                                                          </div>
                                                                                                                        ) : (
                                                                                                                          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                                                                                                                            <AnimatePresence mode="popLayout" initial={false}>
                {filteredArticles.map((article, idx) => {
                  const featured = isFeaturedLayout && idx === 0;
                  const relatedProject = getRelatedProjectForArticle(article.id);
                  return (
                    <motion.article
                      key={article.id}
                      layout={!shouldReduceMotion}
                      initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.96 }}
                      transition={{
                        duration: 0.4,
                        delay: shouldReduceMotion ? 0 : Math.min(idx * 0.07, 0.3),
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className={`group relative rounded-2xl border border-[#262626] bg-[#141414] overflow-hidden card-hover flex flex-col ${
                        featured ? 'md:col-span-2 lg:flex-row' : ''
                      }`}
                    >
                      {/* Gold sweep on hover */}
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#c9a84c]/10 to-transparent transition-transform duration-700 group-hover:translate-x-full"
                      />

                      <CoverFrame article={article} featured={featured} />

                      <div className={`flex flex-col justify-between flex-1 ${featured ? 'lg:w-2/5 p-7 sm:p-8' : ''}`}>
                        <div className={featured ? '' : 'p-6 sm:p-7'}>
<<<<<<< Updated upstream
                          {featured && (
                            <div className="inline-flex items-center gap-2 mb-4 px-2.5 py-1 rounded-full bg-[#c9a84c]/10 border border-[#c9a84c]/30">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#c9a84c] animate-pulse" />
                              <span className="text-xs font-mono font-bold tracking-widest text-[#c9a84c]">
                                LATEST BRIEF
                              </span>
                            </div>
                          )}
=======
                          <div className="flex flex-wrap items-center gap-2 mb-3">
                            {featured && (
                              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#c9a84c]/10 border border-[#c9a84c]/30">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#c9a84c] animate-pulse" />
                                <span className="text-[10px] font-mono font-bold tracking-widest text-[#c9a84c]">
                                  LATEST BRIEF
                                </span>
                              </div>
                            )}

                            {relatedProject && (
                              <Link
                                href={`/portfolio?case=${relatedProject.id}`}
                                onClick={(e) => e.stopPropagation()}
                                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#c9a84c]/10 hover:bg-[#c9a84c]/20 border border-[#c9a84c]/30 text-[10px] font-mono font-bold text-[#c9a84c] transition-colors"
                                title="View verified real-world production case study"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse" />
                                <span>Verified in Production: {relatedProject.title}</span>
                                <ArrowUpRight className="w-3 h-3 text-[#c9a84c]" />
                              </Link>
                            )}
                          </div>
>>>>>>> Stashed changes

                          <div className="flex items-center gap-2 text-xs text-[#777777] font-mono mb-3">
                            <span className="text-[#aaaaaa]">{article.author}</span>
                            <span aria-hidden="true">·</span>
                            <span>{article.date}</span>
                          </div>

                          <h3
                            className={`font-bold text-white mb-3 group-hover:text-[#c9a84c] transition-colors leading-snug ${
                              featured ? 'text-2xl sm:text-3xl tracking-tight' : 'text-xl'
                            }`}
                          >
                            <Link href={`/blogs/${article.id}`}>{article.title}</Link>
                          </h3>

                          <p
                            className={`text-xs sm:text-sm text-[#aaaaaa] leading-relaxed ${
                              featured ? 'line-clamp-4 max-w-xl' : 'line-clamp-3'
                            }`}
                          >
                            {article.excerpt}
                          </p>
                        </div>

                        <div className={`flex items-center justify-between gap-4 ${featured ? 'mt-8 pt-6 border-t border-[#242424] px-7 sm:px-8 pb-7 sm:pb-8' : 'p-6 pt-0'}`}>
                          <Link
                            href={`/blogs/${article.id}`}
                            className="inline-flex items-center gap-2 text-xs font-bold text-[#c9a84c] hover:text-white transition-colors"
                          >
                            <span>Read Breakdown</span>
                            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          </Link>
                          {!featured && (
                            <span className="inline-flex items-center gap-1 text-xs font-mono text-[#555555]">
                              <Clock className="w-3 h-3" />
                              {readingMinutes(article)} MIN
                            </span>
                          )}
                        </div>
                      </div>
                    </motion.article>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>

      {/* ── Section 3: Infinite topic ticker ───────────────────────── */}
      <section
        aria-label="Topics covered by the engineering lab"
        className="py-3.5 border-y border-[#1f1f1f] bg-[#0d0d0d] overflow-hidden"
      >
        <div className="insights-marquee flex w-max gap-3 hover:[animation-play-state:paused]">
          {[...MARQUEE_TOPICS, ...MARQUEE_TOPICS].map((topic, idx) => (
            <span
              key={`${topic}-${idx}`}
              className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-[#242424] bg-[#141414] text-xs font-mono font-semibold tracking-wider text-[#888888] whitespace-nowrap"
            >
              <span className="w-1 h-1 rounded-full bg-[#c9a84c]" aria-hidden="true" />
              {topic}
            </span>
          ))}
        </div>
      </section>

      {/* ── Section 4: Consultation CTA with rotating gold border ──── */}
      <section className="py-10 sm:py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="relative rounded-2xl p-px overflow-hidden">
              <div
                aria-hidden="true"
                className="insights-border-spin absolute -inset-[150%] pointer-events-none"
                style={{
                  background:
                    'conic-gradient(from 0deg, transparent 0%, rgba(201,168,76,0.55) 12%, transparent 28%)',
                }}
              />
              <div className="relative rounded-2xl bg-[#0d0d0d] p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                <div>
                  <div className="text-xs font-bold tracking-widest text-[#c9a84c] uppercase mb-3">
                    Engineering Consultation
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white mb-4 tracking-tight">
                    Need Expert Architectural Guidance on These Stacks?
                  </h3>
                  <p className="text-sm text-[#aaaaaa] leading-relaxed mb-8">
                    Schedule an engineering consultation with our team to discuss your tech stack
                    optimization, microservices strategy, or React performance budgets.
                  </p>
                  <Button
                    onClick={() => onOpenConsultation()}
                    variant="primary"
                    size="lg"
                    icon={<ArrowRight className="w-4 h-4" />}
                  >
                    Connect with Engineering Leads
                  </Button>
                </div>

                <ul className="space-y-4">
                  {[
                    'Frontend performance budget audits',
                    'Event-driven service mesh design',
                    'Java / Spring Boot resilience hardening',
                    'Real-time sync & WebSocket strategy',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-[#cccccc]">
                      <CheckCircle2 className="w-4 h-4 text-[#c9a84c] mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
};
