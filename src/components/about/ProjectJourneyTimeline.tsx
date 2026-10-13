'use client';

import React, { useState, useRef } from 'react';
import {
  Code2,
  LifeBuoy,
  PenTool,
  Rocket,
  Search,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
} from 'motion/react';
import { SectionHeader } from '../ui/SectionHeader';

const projectStages = [
  {
    title: 'Discover',
    shortDescription: 'Understand the business, its users, goals, and technical requirements.',
    description:
      'We begin by understanding the problem, gathering requirements, identifying constraints, and agreeing on the project scope and success criteria.',
    icon: Search,
  },
  {
    title: 'Design',
    shortDescription: 'Turn requirements into clear, usable digital experiences.',
    description:
      'We shape user flows, wireframes, interface designs, and technical direction. The proposed experience is reviewed and aligned with the agreed requirements.',
    icon: PenTool,
  },
  {
    title: 'Engineer',
    shortDescription: 'Build reliable applications and connected software systems.',
    description:
      'Our team develops the frontend, backend, database, and required integrations using suitable technologies and maintainable engineering practices.',
    icon: Code2,
  },
  {
    title: 'Validate',
    shortDescription: 'Verify quality, functionality, and readiness for delivery.',
    description:
      'We test features, responsiveness, integrations, and agreed acceptance criteria. Findings are resolved, and the client reviews the solution before release.',
    icon: ShieldCheck,
  },
  {
    title: 'Deploy',
    shortDescription: 'Release the approved solution into its target environment.',
    description:
      'We prepare the production environment, deploy the approved application, verify critical workflows, and provide the agreed documentation and handover.',
    icon: Rocket,
  },
  {
    title: 'Support',
    shortDescription: 'Maintain the solution and plan future improvements.',
    description:
      'We provide maintenance, issue resolution, and improvements according to the agreed support arrangement and future project priorities.',
    icon: LifeBuoy,
  },
] as const;

// Generous scroll thresholds to give plenty of time to view information
const SCROLL_START = 0.08;
const SCROLL_END = 0.92;

export const ProjectJourneyTimeline: React.FC = () => {
  const [activeStage, setActiveStage] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Increased mouse wheel scroll length (min-h-[350vh]) for comfortable reading
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 80px', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (latest < SCROLL_START) {
      setActiveStage(0);
      return;
    }
    if (latest >= SCROLL_END) {
      setActiveStage(projectStages.length - 1);
      return;
    }
    const normalized = (latest - SCROLL_START) / (SCROLL_END - SCROLL_START);
    const nextIndex = Math.min(
      projectStages.length - 1,
      Math.max(0, Math.floor(normalized * projectStages.length)),
    );
    setActiveStage(nextIndex);
  });

  // Smooth line progress mapped across the extended scroll distance
  const progressWidth = useTransform(
    scrollYProgress,
    [0, SCROLL_START, SCROLL_END, 1],
    ['0%', '0%', '100%', '100%'],
  );

  const handleJumpToStage = (index: number) => {
    if (!containerRef.current) {
      setActiveStage(index);
      return;
    }
    const rect = containerRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const containerTop = rect.top + scrollTop;
    const totalScrollable = rect.height - window.innerHeight;
    const targetFraction =
      SCROLL_START + ((index + 0.4) / projectStages.length) * (SCROLL_END - SCROLL_START);
    const targetY = containerTop + targetFraction * totalScrollable;
    window.scrollTo({ top: targetY, behavior: 'smooth' });
  };

  const handleNext = () => {
    const nextIndex = (activeStage + 1) % projectStages.length;
    handleJumpToStage(nextIndex);
  };

  const handlePrev = () => {
    const prevIndex = (activeStage - 1 + projectStages.length) % projectStages.length;
    handleJumpToStage(prevIndex);
  };

  const current = projectStages[activeStage];
  const CurrentIcon = current.icon;

  return (
    <section
      ref={containerRef}
      className="relative min-h-[350vh] border-b border-[#1f1f1f] bg-[#0c0c0c]"
    >
      {/* Ambient background glow */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_25%,rgba(201,168,76,0.07),transparent_55%)]"
        aria-hidden="true"
      />
      <div className="absolute inset-0 hero-tech-grid opacity-15 pointer-events-none" />

      {/* Sticky Viewport Container:
          Pinned right in the vertical MIDDLE of the screen (top-[max(5rem,calc(50vh-215px))])
          without cutting off at top or bottom! */}
      <div className="sticky top-20 sm:top-[max(5rem,calc(50vh-215px))] z-10 w-full pt-4 sm:pt-6 pb-6">
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 w-full">
          {/* Section Header: Clean centered typography with pixel-exact spacing */}
          <SectionHeader
            eyebrow="Our Delivery Approach"
            title="From Vision to Reality"
            subtitle="Every successful digital product starts with understanding the problem and ends with a solution built to deliver lasting value."
            align="center"
            className="!mb-5 sm:!mb-6"
          />

          {/* Stepper Pipeline Bar */}
          <div className="mb-5 sm:mb-6">
            {/* Scroll-Driven Progress Track */}
            <div className="hidden lg:block relative mb-3 px-6">
              <div className="h-1 w-full bg-[#1e1e1e] rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#c9a84c] to-[#d8b75b]"
                  style={shouldReduceMotion ? { width: `${(activeStage / 5) * 100}%` } : { width: progressWidth }}
                />
              </div>
            </div>

            {/* Stepper Tabs */}
            <div
              role="tablist"
              aria-label="Project Delivery Stages"
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-2.5"
            >
              {projectStages.map((stage, idx) => {
                const Icon = stage.icon;
                const isActive = activeStage === idx;
                const isPast = idx < activeStage;

                return (
                  <button
                    key={stage.title}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`stage-panel-${idx}`}
                    id={`stage-tab-${idx}`}
                    onClick={() => handleJumpToStage(idx)}
                    className={`group relative flex items-center gap-2.5 p-2.5 sm:p-3 rounded-xl border text-left transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c] ${
                      isActive
                        ? 'border-[#c9a84c]/70 bg-[#171717] shadow-[0_0_22px_-4px_rgba(201,168,76,0.3)]'
                        : isPast
                          ? 'border-[#262626] bg-[#121212]/80 hover:border-[#383838]'
                          : 'border-[#1f1f1f] bg-[#0e0e0e]/80 hover:border-[#2a2a2a]'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTimelineGlow"
                        className="absolute inset-0 rounded-xl bg-gradient-to-b from-[#c9a84c]/12 to-transparent pointer-events-none"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}

                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                        isActive
                          ? 'bg-[#c9a84c]/20 text-[#c9a84c]'
                          : isPast
                            ? 'bg-[#1a1a1a] text-[#888888]'
                            : 'bg-[#151515] text-[#555555] group-hover:text-[#777777]'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span
                        className={`text-[10px] font-mono font-bold leading-none mb-0.5 ${
                          isActive
                            ? 'text-[#c9a84c]'
                            : isPast
                              ? 'text-[#777777]'
                              : 'text-[#555555]'
                        }`}
                      >
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <span
                        className={`text-xs sm:text-sm font-bold truncate leading-tight transition-colors ${
                          isActive ? 'text-white' : 'text-[#888888] group-hover:text-white'
                        }`}
                      >
                        {stage.title}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Centered Stage Card */}
          <div className="mx-auto max-w-4xl">
            <div className="relative rounded-2xl border border-[#c9a84c]/40 bg-[#141414] p-6 sm:p-7 shadow-[0_24px_60px_-12px_rgba(0,0,0,0.85)] overflow-hidden transition-all duration-300">

              <AnimatePresence mode="wait">
                <motion.div
                  key={current.title}
                  id={`stage-panel-${activeStage}`}
                  role="tabpanel"
                  aria-labelledby={`stage-tab-${activeStage}`}
                  initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
                  transition={{ duration: 0.24, ease: 'easeOut' }}
                  className="relative z-10 flex flex-col md:flex-row md:items-center gap-6"
                >
                  {/* Glowing Stage Icon Anchor */}
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-[#c9a84c]/25 via-[#c9a84c]/15 to-transparent border border-[#c9a84c]/60 flex items-center justify-center text-[#DFC067] shadow-[0_0_28px_rgba(201,168,76,0.35)] shrink-0">
                    <CurrentIcon className="w-7 h-7 sm:w-8 sm:h-8" />
                  </div>

                  {/* Core Highlighted Narrative */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#c9a84c]/20 border border-[#c9a84c]/45 text-[#d8b75b] font-mono font-bold text-[11px] uppercase tracking-wider shadow-[0_0_14px_rgba(201,168,76,0.25)]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#c9a84c] animate-pulse" />
                        Stage {String(activeStage + 1).padStart(2, '0')} of 06
                      </span>
                      <span className="text-[#555555]">·</span>
                      <span className="text-xs text-[#888888] font-medium tracking-wide">Delivery Workflow</span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-white mb-2 leading-snug">
                      {current.title} — <span className="text-[#DFC067] font-semibold drop-shadow-[0_0_16px_rgba(201,168,76,0.25)]">{current.shortDescription}</span>
                    </h3>

                    <p className="text-xs sm:text-sm text-[#cccccc] leading-relaxed">
                      {current.description}
                    </p>
                  </div>

                  {/* Highlighted Step Controls */}
                  <div className="flex md:flex-col items-center justify-between md:justify-center gap-2.5 pt-4 md:pt-0 border-t md:border-t-0 md:border-l border-[#c9a84c]/20 md:pl-6 shrink-0">
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={handlePrev}
                        aria-label="Previous Stage"
                        className="w-8 h-8 rounded-lg border border-[#c9a84c]/30 bg-[#161616] hover:bg-[#c9a84c]/20 hover:border-[#c9a84c] text-white hover:text-[#DFC067] flex items-center justify-center transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c] shadow-sm"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={handleNext}
                        aria-label="Next Stage"
                        className="w-8 h-8 rounded-lg border border-[#c9a84c]/30 bg-[#161616] hover:bg-[#c9a84c]/20 hover:border-[#c9a84c] text-white hover:text-[#DFC067] flex items-center justify-center transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c] shadow-sm"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                    <span className="text-[11px] font-mono text-[#d8b75b] font-semibold">
                      {activeStage + 1} / {projectStages.length}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
