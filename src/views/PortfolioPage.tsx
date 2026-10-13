'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { createPortal } from 'react-dom';
import { SectionHeader } from '../components/ui/SectionHeader';
import { Card } from '../components/ui/Card';
import { CountingNumber } from '../components/ui/counting-number';
import { VERIFIED_PROJECTS, Service, Project } from '../data/content';
import {
  ArrowRight,
  ArrowUpRight,
  ChevronRight,
  X,
  ShieldCheck,
  Zap,
  Cpu,
  Lock,
  Filter,
  RotateCcw,
  Search,
  Share2,
  Copy,
  Check,
  Linkedin,
  Twitter,
  MessageSquare,
  Code2,
  GitBranch,
  CheckCircle2,
} from 'lucide-react';
import Link from 'next/link';
import { Reveal } from '../components/motion/Reveal';
import { AnimatedButton } from '../components/motion/AnimatedButton';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { PageHeroBackground } from '../components/ui/PageHeroBackground';
import { CaseStudyDeepDive } from '../components/portfolio/CaseStudyDeepDive';

interface PortfolioPageProps {
  onOpenConsultation: (service?: Service) => void;
}

const TRACK_RECORD_METRICS = [
  {
    metric: '99.99%',
    label: 'Uptime SLA Benchmark',
    detail: 'High-availability deployment architecture with automated failover clusters.',
    icon: ShieldCheck,
  },
  {
    metric: '< 1.2s',
    label: 'Time-to-Interactive (TTI)',
    detail: 'Sub-second first impression and Google green Core Web Vitals.',
    icon: Zap,
  },
  {
    metric: '10k+ TPS',
    label: 'Peak Stream Concurrency',
    detail: 'Java Spring Boot & Redis Pub/Sub high-throughput message streaming.',
    icon: Cpu,
  },
  {
    metric: '100%',
    label: 'Code & IP Handover',
    detail: 'Complete enterprise copyright ownership and clean private Git repository transfer.',
    icon: Lock,
  },
];

const DELIVERY_STANDARDS = [
  {
    number: '01',
    title: 'Zero Architectural Debt',
    description:
      'Engineered with strict TypeScript and Java 21 LTS type barriers, eliminating runtime type drift and unhandled null exceptions.',
    benchmark: '100% Strict Type Enforcement',
    icon: Code2,
  },
  {
    number: '02',
    title: 'Automated CI/CD & Deployments',
    description:
      'Continuous integration with edge verification, regression checks, and atomic rollbacks for zero-downtime releases.',
    benchmark: 'Sub-3-Minute Build & Verify',
    icon: GitBranch,
  },
  {
    number: '03',
    title: 'Enterprise Security Hardening',
    description:
      'AES-256 protocol encryption, OWASP Top 10 mitigation, sanitized inputs, and stateless authorization tokens.',
    benchmark: 'Zero-Vulnerability Tolerance',
    icon: ShieldCheck,
  },
  {
    number: '04',
    title: 'Complete IP & Repo Handover',
    description:
      'Clean Git repository handover on project cutover with 100% enterprise copyright assignment and private deployment runbooks.',
    benchmark: '100% Client IP Ownership',
    icon: Lock,
  },
];

const SUGGESTED_TECH_TAGS = ['React', 'Spring Boot', 'WebSockets', 'Edge Runtime', 'ISO 27001'];

const TECH_MARQUEE = [
  'REACT 19',
  'JAVA 21 LTS',
  'SPRING BOOT 3',
  'WEBSOCKETS (STOMP)',
  'REDIS PUB/SUB',
  'VERCEL EDGE RUNTIME',
  'POSTGRESQL 16',
  'AES-256 GCM',
  'ISO 27001 STANDARDS',
  'KAFKA EVENT LEDGER',
  'DOCKER & K8S',
  'CORE WEB VITALS',
];

// Quick Share Component for individual Project Cards
const ProjectCardQuickShare: React.FC<{ project: Project }> = ({ project }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const shareUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}/portfolio/${project.id}`
      : `https://vpdtechnologies.com/portfolio/${project.id}`;

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
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
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen((prev) => !prev);
        }}
        aria-label="Share case study"
        title="Share case study"
        className="p-2 rounded-xl bg-[#181818] hover:bg-[#242424] text-[#aaaaaa] hover:text-white border border-[#2a2a2a] hover:border-[#c9a84c]/50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c] cursor-pointer"
      >
        <Share2 className="w-3.5 h-3.5" />
      </button>

      {isOpen && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute left-0 sm:right-0 sm:left-auto bottom-full mb-2 z-40 w-64 p-3 rounded-2xl bg-[#141414] border border-[#2c2c2c] shadow-2xl shadow-black/80 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150"
        >
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#242424]">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#c9a84c]">
              Share Case Study
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
                `Case study: "${project.title}" by @VPDTechnologies`
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
                `Explore "${project.title}" by VPD Technologies: ${shareUrl}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center gap-2 px-2 py-1.5 text-xs text-[#cccccc] hover:text-white hover:bg-[#1f1f1f] rounded-lg transition-colors cursor-pointer"
            >
              <div className="w-5 h-5 rounded bg-[#22c55e]/15 text-[#22c55e] flex items-center justify-center shrink-0">
                <MessageSquare className="w-3 h-3" />
              </div>
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export const PortfolioPage: React.FC<PortfolioPageProps> = ({ onOpenConsultation }) => {
  const [selectedSector, setSelectedSector] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCaseStudy, setActiveCaseStudy] = useState<Project | null>(null);
  const [mounted, setMounted] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    setMounted(true);
  }, []);

  const sectors = ['all', 'SaaS / Enterprise', 'Industrial Logistics', 'FinTech / Core Banking'];

  // Live filtered projects by sector & search query
  const filteredProjects = useMemo(() => {
    let result =
      selectedSector === 'all'
        ? VERIFIED_PROJECTS
        : VERIFIED_PROJECTS.filter((p) => p.sector === selectedSector);

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter((p) => {
        const inTitle = p.title.toLowerCase().includes(q);
        const inClient = p.client.toLowerCase().includes(q);
        const inProblem = p.problem.toLowerCase().includes(q);
        const inSolution = p.solution.toLowerCase().includes(q);
        const inTags = p.tags.some((t) => t.toLowerCase().includes(q));
        const inSpecs = p.specs.some(
          (s) => s.label.toLowerCase().includes(q) || s.value.toLowerCase().includes(q)
        );
        const inTechStack = p.techStack?.some((ts) =>
          ts.technologies.some((tech) => tech.toLowerCase().includes(q))
        );
        return inTitle || inClient || inProblem || inSolution || inTags || inSpecs || inTechStack;
      });
    }

    return result;
  }, [selectedSector, searchQuery]);

  const activeIndex = useMemo(() => {
    if (!activeCaseStudy) return -1;
    return filteredProjects.findIndex((p) => p.id === activeCaseStudy.id);
  }, [activeCaseStudy, filteredProjects]);

  // URL state synchronization
  const openCaseStudy = (project: Project) => {
    setActiveCaseStudy(project);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('case', project.id);
      window.history.pushState({ caseId: project.id }, '', url.toString());
    }
  };

  const closeCaseStudy = () => {
    setActiveCaseStudy(null);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.delete('case');
      window.history.pushState({}, '', url.toString());
    }
  };

  const handleNavigateProject = (direction: 'prev' | 'next') => {
    if (activeIndex === -1) return;
    let nextProj: Project | null = null;
    if (direction === 'prev' && activeIndex > 0) {
      nextProj = filteredProjects[activeIndex - 1];
    } else if (direction === 'next' && activeIndex < filteredProjects.length - 1) {
      nextProj = filteredProjects[activeIndex + 1];
    }
    if (nextProj) {
      setActiveCaseStudy(nextProj);
      if (typeof window !== 'undefined') {
        const url = new URL(window.location.href);
        url.searchParams.set('case', nextProj.id);
        window.history.replaceState({ caseId: nextProj.id }, '', url.toString());
      }
    }
  };

  // Listen to popstate (browser back/forward buttons) and initialize from URL query
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const caseId = params.get('case') || params.get('project');
      if (caseId) {
        const matched = VERIFIED_PROJECTS.find((p) => p.id === caseId);
        if (matched) setActiveCaseStudy(matched);
      }

      const handlePopState = () => {
        const curParams = new URLSearchParams(window.location.search);
        const curCaseId = curParams.get('case') || curParams.get('project');
        if (curCaseId) {
          const matched = VERIFIED_PROJECTS.find((p) => p.id === curCaseId);
          setActiveCaseStudy(matched || null);
        } else {
          setActiveCaseStudy(null);
        }
      };

      window.addEventListener('popstate', handlePopState);
      return () => window.removeEventListener('popstate', handlePopState);
    }
  }, []);

  // Keyboard escape & left/right navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeCaseStudy();
      } else if (e.key === 'ArrowLeft' && activeIndex > 0) {
        handleNavigateProject('prev');
      } else if (e.key === 'ArrowRight' && activeIndex >= 0 && activeIndex < filteredProjects.length - 1) {
        handleNavigateProject('next');
      }
    };

    if (activeCaseStudy) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeCaseStudy, activeIndex, filteredProjects]);

  const getSectorCount = (sec: string) => {
    if (sec === 'all') return VERIFIED_PROJECTS.length;
    return VERIFIED_PROJECTS.filter((p) => p.sector === sec).length;
  };

  const handleProjectInquiry = (project: Project) => {
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
    <div className="pt-28 bg-[#0a0a0a]">
      {/* Portfolio Hero */}
      <section className="relative pt-14 pb-4 sm:pt-18 sm:pb-6 border-b border-[#1f1f1f] overflow-hidden">
        <PageHeroBackground imageSrc="/about3.webp" position="center 42%" />
        <div className="absolute inset-0 hero-tech-grid opacity-40 pointer-events-none" />
        <div className="max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10">
          <Reveal>
            <SectionHeader
              eyebrow="Technical Impact Portfolio"
              title="Engineered for Measurable Enterprise Outcomes."
              subtitle="Review our archive of high-performance web applications, scalable enterprise systems, and custom software solutions engineered for industry leaders."
              className="!mb-6 sm:!mb-8"
            />
          </Reveal>

          {/* Search Bar & Technology Filters */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, delay: 0.04, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-3 mt-2 sm:mt-4"
          >
            {/* Search Input Bar */}
            <div className="relative max-w-xl">
              <Search className="w-4 h-4 text-[#777777] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by technology, keyword, or client (e.g. React, Java, Redis)..."
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

            {/* Quick Tech Tag Suggestions */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              <span className="text-[11px] font-mono text-[#777777] mr-1">Popular Stacks:</span>
              {SUGGESTED_TECH_TAGS.map((tag) => {
                const isActive = searchQuery.toLowerCase() === tag.toLowerCase();
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setSearchQuery(isActive ? '' : tag)}
                    className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-medium transition-colors cursor-pointer border ${
                      isActive
                        ? 'bg-[#c9a84c]/20 text-[#c9a84c] border-[#c9a84c]/40'
                        : 'bg-[#141414] text-[#888888] hover:text-white border-[#222222] hover:border-[#333333]'
                    }`}
                  >
                    {tag}
                  </button>
                );
              })}
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="text-[10px] text-[#c9a84c] hover:underline ml-2 cursor-pointer font-mono"
                >
                  Reset Search
                </button>
              )}
            </div>

            {/* Sector Filters with Item Counts */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              {sectors.map((sec) => {
                const count = getSectorCount(sec);
                const isActive = selectedSector === sec;
                return (
                  <motion.button
                    key={sec}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setSelectedSector(sec)}
                    whileHover={shouldReduceMotion ? undefined : { y: -2 }}
                    whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className={`relative isolate overflow-hidden rounded-xl border px-3.5 py-2 text-xs font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c] cursor-pointer flex items-center gap-2 ${
                      isActive
                        ? 'border-[#c9a84c] text-black shadow-md shadow-[#c9a84c]/10'
                        : 'border-[#242424] bg-[#141414] text-[#aaaaaa] hover:border-[#c9a84c]/40 hover:text-white'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="portfolio-sector-indicator"
                        className="absolute inset-0 z-0 rounded-xl bg-[#c9a84c]"
                        transition={{ type: 'spring', stiffness: 360, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">
                      {sec === 'all' ? 'All Engagements' : sec}
                    </span>
                    <span
                      className={`relative z-10 text-[10px] font-mono px-1.5 py-0.5 rounded-full font-bold ${
                        isActive ? 'bg-black/20 text-black' : 'bg-[#222222] text-[#888888]'
                      }`}
                    >
                      {count}
                    </span>
                  </motion.button>
                );
              })}
            </div>

            {/* Live Result Counter Ribbon */}
            <div
              className="flex flex-wrap items-center justify-between text-xs font-mono text-[#888888] pt-3 mt-1 border-t border-[#1a1a1a]"
              aria-live="polite"
            >
              <div className="flex items-center gap-2">
                <span>SHOWING</span>
                <span className="text-[#c9a84c] font-bold">
                  {String(filteredProjects.length).padStart(2, '0')}
                </span>
                <span>/</span>
                <span>{String(VERIFIED_PROJECTS.length).padStart(2, '0')}</span>
                <span className="text-[#666666]">
                  {searchQuery
                    ? `MATCHING "${searchQuery.toUpperCase()}"`
                    : selectedSector !== 'all'
                    ? `IN ${selectedSector.toUpperCase()}`
                    : 'VERIFIED ENGAGEMENTS'}
                </span>
              </div>
              {(searchQuery || selectedSector !== 'all') && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedSector('all');
                    setSearchQuery('');
                  }}
                  className="text-[#c9a84c] hover:underline cursor-pointer text-[11px] font-semibold"
                >
                  Reset Filters
                </button>
              )}
            </div>
          </motion.div>

          {/* High-Trust Engineering Track Record Strip with Counting Numbers */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-20px' }}
            transition={{ duration: 0.45, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-3 pt-6 mt-6 border-t border-[#1a1a1a]"
          >
            {TRACK_RECORD_METRICS.map((metricItem, mIdx) => {
              const IconComp = metricItem.icon;
              return (
                <div
                  key={mIdx}
                  className="p-3.5 rounded-xl bg-[#111111]/80 border border-[#202020] hover:border-[#c9a84c]/30 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <IconComp className="w-3.5 h-3.5 text-[#c9a84c]" />
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#888888] font-bold">
                      {metricItem.label}
                    </span>
                  </div>
                  <div className="text-xl sm:text-2xl font-black text-white font-mono tracking-tight mb-1 tabular-nums">
                    <CountingNumber value={metricItem.metric} duration={1.2} />
                  </div>
                  <p className="text-[11px] text-[#777777] leading-relaxed line-clamp-2">
                    {metricItem.detail}
                  </p>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Continuous Technology Competency Marquee Ticker */}
      <section
        aria-label="Core enterprise architectural competencies"
        className="py-3.5 border-b border-[#1f1f1f] bg-[#0c0c0c] overflow-hidden"
      >
        <div className="insights-marquee flex w-max gap-3 hover:[animation-play-state:paused]">
          {[...TECH_MARQUEE, ...TECH_MARQUEE].map((tech, idx) => (
            <span
              key={`${tech}-${idx}`}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-[#222222] bg-[#121212] text-[10px] font-mono font-semibold tracking-wider text-[#888888] whitespace-nowrap"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#c9a84c]" aria-hidden="true" />
              {tech}
            </span>
          ))}
        </div>
      </section>

      {/* Projects Grid */}
      <section className="pt-4 pb-8 sm:pt-6 sm:pb-12">
        <div className="max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 space-y-12">
          {filteredProjects.length === 0 ? (
            <div className="py-16 px-4 text-center rounded-2xl bg-[#121212] border border-[#222222]">
              <div className="w-12 h-12 rounded-xl bg-[#c9a84c]/10 text-[#c9a84c] flex items-center justify-center mx-auto mb-3">
                <Filter className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white mb-1">No Projects Found</h4>
              <p className="text-xs text-[#888888] max-w-sm mx-auto mb-4">
                No verified case studies match your current search and sector filters.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedSector('all');
                  setSearchQuery('');
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1c1c1c] hover:bg-[#252525] text-xs font-semibold text-white border border-[#333333] transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#c9a84c]" />
                <span>Reset All Filters</span>
              </button>
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout={!shouldReduceMotion}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 36, scale: 0.985 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  exit={shouldReduceMotion ? undefined : { opacity: 0, y: -18, scale: 0.985 }}
                  viewport={{ once: true, amount: 0.12 }}
                  transition={{
                    duration: 0.45,
                    delay: shouldReduceMotion ? 0 : Math.min(index, 4) * 0.06,
                    ease: [0.16, 1, 0.3, 1],
                    layout: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
                  }}
                >
                  <Card
                    variant="card"
                    padding="lg"
                    className="overflow-hidden hover:border-[#c9a84c]/40 transition-colors duration-300"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                      {/* Media Image */}
                      <motion.div
                        initial={shouldReduceMotion ? false : { opacity: 0, x: -22 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                        className="lg:col-span-6 w-full"
                      >
                        <div className="relative rounded-xl overflow-hidden aspect-[16/10] bg-[#1a1a1a] border border-[#2a2a2a] group">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider font-semibold bg-black/70 backdrop-blur-md text-[#c9a84c] border border-[#c9a84c]/30">
                              {project.sector}
                            </span>
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wider font-medium bg-black/70 backdrop-blur-md text-[#888888] border border-white/10">
                              {project.duration}
                            </span>
                          </div>

                          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                            <div className="bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-2">
                              <span className="text-sm font-black text-[#c9a84c] font-mono">
                                {project.metricHighlight}
                              </span>
                              <span className="text-[10px] text-[#aaaaaa]">
                                {project.metricLabel}
                              </span>
                            </div>
                          </div>
                        </div>
                      </motion.div>

                      {/* Content Details */}
                      <motion.div
                        initial={shouldReduceMotion ? false : { opacity: 0, x: 22 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.55, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
                        className="lg:col-span-6 space-y-6"
                      >
                        <div>
                          <div className="text-[11px] font-mono uppercase tracking-wider text-[#777777] mb-1">
                            Client: <span className="text-white font-medium">{project.client}</span>
                          </div>
                          <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight mb-2">
                            {project.title}
                          </h3>
                          <div className="flex flex-wrap gap-1.5 mt-3">
                            {project.tags.map((tag, tIdx) => (
                              <span
                                key={tIdx}
                                className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#161616] text-[#aaaaaa] border border-[#282828]"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Problem & Solution Accordion-style layout */}
                        <div className="space-y-3">
                          <div className="p-3.5 rounded-xl bg-[#121212] border border-[#222222]">
                            <span className="text-[#c9a84c] font-mono text-[10px] uppercase font-bold tracking-wider block mb-1">
                              Problem Statement
                            </span>
                            <p className="text-xs text-[#aaaaaa] leading-relaxed">
                              {project.problem}
                            </p>
                          </div>

                          <div className="p-3.5 rounded-xl bg-[#121212] border border-[#222222]">
                            <span className="text-[#c9a84c] font-mono text-[10px] uppercase font-bold tracking-wider block mb-1">
                              Engineered Architecture
                            </span>
                            <p className="text-xs text-[#aaaaaa] leading-relaxed">
                              {project.solution}
                            </p>
                          </div>
                        </div>

                        {/* Specs Strip */}
                        <div className="pt-2 border-t border-[#1f1f1f]">
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            {project.specs.map((spec, sIdx) => (
                              <div key={sIdx}>
                                <span className="text-[#666666] block text-[9px] uppercase font-bold tracking-wider">
                                  {spec.label}
                                </span>
                                <span className="font-mono text-xs font-semibold text-white truncate block">
                                  {spec.value}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-3 pt-2 flex-wrap sm:flex-nowrap">
                          <button
                            type="button"
                            onClick={() => openCaseStudy(project)}
                            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-[#1a1a1a] hover:bg-[#222222] border border-[#2a2a2a] hover:border-[#c9a84c]/50 rounded-xl transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c] cursor-pointer"
                          >
                            <span>Read Full Case Study</span>
                            <ArrowUpRight className="w-3.5 h-3.5 text-[#c9a84c]" />
                          </button>

                          {/* Quick Share on Card */}
                          <ProjectCardQuickShare project={project} />

                          <button
                            type="button"
                            onClick={() => handleProjectInquiry(project)}
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#888888] hover:text-white transition-colors py-2 ml-auto focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c] rounded cursor-pointer"
                          >
                            <span>Discuss Similar Project</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </motion.div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>
      </section>

      {/* Engineering Delivery Standards Trust Matrix */}
      <section className="py-12 sm:py-16 border-t border-[#1a1a1a] bg-[#0c0c0c] relative">
        <div className="max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-10">
              <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#c9a84c] block mb-2">
                Engineering Assurance Matrix
              </span>
              <h3 className="text-2xl sm:text-4xl font-black text-white tracking-tight mb-3">
                Our Enterprise Delivery Standards
              </h3>
              <p className="text-sm text-[#aaaaaa] leading-relaxed">
                Every project is built according to stringent enterprise engineering controls to guarantee maximum uptime, zero architectural debt, and frictionless handovers.
              </p>
            </div>
          </Reveal>

<<<<<<< Updated upstream
                      <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-4">
                        {project.title}
                      </h3>

                      <div className="space-y-3 text-sm text-[#aaaaaa] leading-relaxed mb-6">
                        <p>
                          <strong className="text-white font-semibold">The Challenge: </strong>
                          {project.problem}
                        </p>
                        <p>
                          <strong className="text-white font-semibold">Our Architecture: </strong>
                          {project.solution}
                        </p>
                        <p>
                          <strong className="text-[#c9a84c] font-semibold">The Outcome: </strong>
                          {project.result}
                        </p>
                      </div>

                      {/* Spec tags */}
                      <div className="grid grid-cols-2 gap-3 p-4 rounded-xl bg-[#0e0e0e] border border-[#222222] mb-6">
                        {project.specs.map((spec, sIdx) => (
                          <div key={sIdx} className="text-xs">
                            <span className="text-[#666666] block text-xs uppercase font-semibold">
                              {spec.label}
                            </span>
                            <span className="font-mono font-medium text-[#dddddd]">
                              {spec.value}
                            </span>
                          </div>
                        ))}
                      </div>
=======
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {DELIVERY_STANDARDS.map((standard, sIdx) => {
              const Icon = standard.icon;
              return (
                <div
                  key={sIdx}
                  className="p-6 rounded-2xl bg-[#121212] border border-[#222222] hover:border-[#c9a84c]/40 transition-colors flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-[#c9a84c]/10 text-[#c9a84c] flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5" />
>>>>>>> Stashed changes
                    </div>
                    <span className="text-[10px] font-mono uppercase font-bold text-[#666666] tracking-wider block mb-1">
                      Standard {standard.number}
                    </span>
                    <h4 className="text-sm font-bold text-white mb-2 leading-snug">
                      {standard.title}
                    </h4>
                    <p className="text-xs text-[#999999] leading-relaxed mb-4">
                      {standard.description}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-[#1c1c1c] text-[11px] font-mono text-[#c9a84c] flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#22c55e]" />
                    <span>{standard.benchmark}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Consultation Banner */}
      <section className="py-8 sm:py-10 border-t border-[#1f1f1f] bg-[#0d0d0d]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Reveal>
            <h3 className="text-2xl sm:text-3xl font-black text-white mb-3">
              Have a Complex Engineering Milestone?
            </h3>
            <p className="text-sm text-[#aaaaaa] mb-6 max-w-xl mx-auto">
              Our engineers are standing by to review your system requirements and architect your digital future.
            </p>
            <AnimatedButton
              onClick={() => onOpenConsultation()}
              variant="primary"
              size="lg"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Schedule Project Discovery Call
            </AnimatedButton>
          </Reveal>
        </div>
      </section>

      {/* Case Study Deep Dive Modal */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {activeCaseStudy && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 lg:p-5 bg-black/90 backdrop-blur-md"
                role="dialog"
                aria-modal="true"
                onClick={closeCaseStudy}
              >
                <motion.div
                  initial={shouldReduceMotion ? undefined : { scale: 0.95, opacity: 0, y: 16 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={shouldReduceMotion ? undefined : { scale: 0.95, opacity: 0, y: 16 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  onClick={(e) => e.stopPropagation()}
                  className="bg-[#0e0e0e] border border-[#262626] rounded-2xl w-full max-w-[96vw] max-h-[94vh] overflow-y-auto p-6 sm:p-8 lg:p-10 relative shadow-2xl"
                >
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      closeCaseStudy();
                    }}
                    className="absolute top-5 right-5 p-2.5 rounded-xl bg-[#1c1c1c] hover:bg-[#282828] text-[#cccccc] hover:text-white border border-[#333333] transition-colors cursor-pointer z-50 pointer-events-auto focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c]"
                    aria-label="Close Case Study Details"
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>

                  <CaseStudyDeepDive
                    project={activeCaseStudy}
                    onOpenConsultation={(svc) => {
                      closeCaseStudy();
                      onOpenConsultation(svc);
                    }}
                    isModal={true}
                    onClose={closeCaseStudy}
                    onNavigateProject={handleNavigateProject}
                    hasPrev={activeIndex > 0}
                    hasNext={activeIndex < filteredProjects.length - 1}
                    currentIndex={activeIndex}
                    totalProjects={filteredProjects.length}
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </div>
  );
};
