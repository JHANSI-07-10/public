'use client';

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  Check,
  Code2,
  LifeBuoy,
  PenTool,
  Rocket,
  Search,
  ShieldCheck,
} from 'lucide-react';
import { SectionHeader } from '../ui/SectionHeader';

const projectStages = [
  {
    title: 'Discover',
    shortDescription: 'Understand the business, its users, goals, and technical requirements.',
    description:
      'We begin by understanding the problem, gathering requirements, identifying constraints, and agreeing on the project scope and success criteria.',
    icon: Search,
    side: 'left',
  },
  {
    title: 'Design',
    shortDescription: 'Turn requirements into clear, usable digital experiences.',
    description:
      'We shape user flows, wireframes, interface designs, and technical direction. The proposed experience is reviewed and aligned with the agreed requirements.',
    icon: PenTool,
    side: 'right',
  },
  {
    title: 'Engineer',
    shortDescription: 'Build reliable applications and connected software systems.',
    description:
      'Our team develops the frontend, backend, database, and required integrations using suitable technologies and maintainable engineering practices.',
    icon: Code2,
    side: 'left',
  },
  {
    title: 'Validate',
    shortDescription: 'Verify quality, functionality, and readiness for delivery.',
    description:
      'We test features, responsiveness, integrations, and agreed acceptance criteria. Findings are resolved, and the client reviews the solution before release.',
    icon: ShieldCheck,
    side: 'right',
  },
  {
    title: 'Deploy',
    shortDescription: 'Release the approved solution into its target environment.',
    description:
      'We prepare the production environment, deploy the approved application, verify critical workflows, and provide the agreed documentation and handover.',
    icon: Rocket,
    side: 'left',
  },
  {
    title: 'Support',
    shortDescription: 'Maintain the solution and plan future improvements.',
    description:
      'We provide maintenance, issue resolution, and improvements according to the agreed support arrangement and future project priorities.',
    icon: LifeBuoy,
    side: 'right',
  },
] as const;

export const ProjectJourneyTimeline: React.FC = () => {
  const timelineRef = useRef<HTMLOListElement>(null);
  const markerRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [activeStage, setActiveStage] = useState(0);
  const [enteredStages, setEnteredStages] = useState<boolean[]>(
    () => projectStages.map(() => false),
  );
  const [track, setTrack] = useState({ top: 0, height: 0 });
  const [progress, setProgress] = useState(0);

  useLayoutEffect(() => {
    const timeline = timelineRef.current;
    if (!timeline) return;

    const updateTrack = () => {
      const firstMarker = markerRefs.current[0];
      const lastMarker = markerRefs.current[projectStages.length - 1];
      if (!firstMarker || !lastMarker) return;

      const timelineTop = timeline.getBoundingClientRect().top;
      const firstCenter =
        firstMarker.getBoundingClientRect().top +
        firstMarker.getBoundingClientRect().height / 2;
      const lastCenter =
        lastMarker.getBoundingClientRect().top +
        lastMarker.getBoundingClientRect().height / 2;

      setTrack({
        top: firstCenter - timelineTop,
        height: Math.max(0, lastCenter - firstCenter),
      });
    };

    updateTrack();
    const resizeObserver = new ResizeObserver(updateTrack);
    resizeObserver.observe(timeline);
    window.addEventListener('resize', updateTrack);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateTrack);
    };
  }, []);

  useEffect(() => {
    const timeline = timelineRef.current;
    if (!timeline) return;

    const updateProgress = () => {
      const rect = timeline.getBoundingClientRect();
      const firstMarkerY = rect.top + track.top;
      const viewportTarget = window.innerHeight * 0.5;
      const nextProgress =
        track.height > 0
          ? Math.min(1, Math.max(0, (viewportTarget - firstMarkerY) / track.height))
          : 0;
      setProgress(nextProgress);
    };

    let frame = 0;
    const scheduleProgressUpdate = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateProgress);
    };

    scheduleProgressUpdate();
    window.addEventListener('scroll', scheduleProgressUpdate, { passive: true });
    window.addEventListener('resize', scheduleProgressUpdate);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', scheduleProgressUpdate);
      window.removeEventListener('resize', scheduleProgressUpdate);
    };
  }, [track]);

  useEffect(() => {
    const timeline = timelineRef.current;
    if (!timeline || !('IntersectionObserver' in window)) {
      setEnteredStages(projectStages.map(() => true));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number((entry.target as HTMLElement).dataset.stageIndex);
          if (!entry.isIntersecting || Number.isNaN(index)) return;

          setActiveStage(index);
          setEnteredStages((previous) =>
            previous[index] ? previous : previous.map((entered, i) => entered || i === index),
          );
        });
      },
      {
        rootMargin: '-44% 0px -44% 0px',
        threshold: 0,
      },
    );

    timeline.querySelectorAll<HTMLElement>('[data-stage-index]').forEach((stage) => {
      observer.observe(stage);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative overflow-hidden border-y border-[#2A2A2A] bg-[#111111] py-20 sm:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(212,175,55,0.07),transparent_45%)]" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Our Delivery Approach"
          title="From Vision to Reality"
          subtitle="Every successful digital product starts with understanding the problem and ends with a solution built to deliver lasting value. Here's how we turn ideas into working software."
          align="center"
          className="mb-12 sm:mb-16"
        />

        <ol
          ref={timelineRef}
          aria-label="VPD Technologies project delivery stages"
          className="relative mx-auto max-w-6xl list-none p-0"
        >
          {track.height > 0 && (
            <div
              className="pointer-events-none absolute bottom-auto left-[1.375rem] z-0 w-px -translate-x-1/2 bg-[rgba(212,175,55,0.2)] lg:left-1/2"
              style={{ top: track.top, height: track.height }}
              aria-hidden="true"
            >
              <div
                className="h-full w-full origin-top bg-[#D4AF37]"
                style={{ transform: `scaleY(${progress})` }}
              />
            </div>
          )}

          {projectStages.map((stage, index) => {
            const Icon = stage.icon;
            const isActive = activeStage === index;
            const isComplete = index < activeStage;
            const hasEntered = enteredStages[index];
            const status = isComplete ? 'completed' : isActive ? 'active' : 'upcoming';
            const cardSideClass =
              stage.side === 'left'
                ? 'lg:col-start-1 lg:justify-self-end'
                : 'lg:col-start-3 lg:justify-self-start';

            return (
              <li
                key={stage.title}
                data-stage-index={index}
                className="relative z-10 grid min-h-[15rem] grid-cols-[2.75rem_minmax(0,1fr)] items-center gap-x-4 lg:grid-cols-[minmax(0,1fr)_5rem_minmax(0,1fr)] lg:gap-x-6"
              >
                <div
                  ref={(element) => {
                    markerRefs.current[index] = element;
                  }}
                  className={`col-start-1 row-start-1 flex h-12 w-12 items-center justify-center justify-self-center rounded-full border transition-[background-color,border-color,box-shadow] duration-300 lg:col-start-2 ${
                    isComplete
                      ? 'border-[#D4AF37] bg-[#D4AF37] text-[#111111]'
                      : isActive
                        ? 'border-[#DFC067] bg-[#171717] text-[#DFC067] shadow-[0_0_24px_rgba(212,175,55,0.16)]'
                        : 'border-[#3A3A3A] bg-[#171717] text-[#71717A]'
                  }`}
                  aria-hidden="true"
                >
                  {isComplete ? (
                    <Check className="h-5 w-5" strokeWidth={2.5} />
                  ) : (
                    <span className="font-mono text-sm font-bold">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  )}
                </div>

                <article
                  aria-current={isActive ? 'step' : undefined}
                  className={`col-start-2 row-start-1 w-full max-w-xl rounded-2xl border bg-[#1D1D1D] p-5 transition-[opacity,transform,border-color,box-shadow] duration-500 ease-out sm:p-6 ${cardSideClass} ${
                    isActive
                      ? 'border-[rgba(212,175,55,0.5)] shadow-[0_0_32px_rgba(212,175,55,0.08)]'
                      : 'border-[#2A2A2A]'
                  } ${
                    hasEntered
                      ? 'translate-x-0 opacity-100'
                      : stage.side === 'left'
                        ? 'opacity-90 lg:-translate-x-3'
                        : 'translate-x-0 opacity-90 lg:translate-x-3'
                  } motion-reduce:translate-x-0 motion-reduce:opacity-100 motion-reduce:transition-none`}
                >
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[rgba(212,175,55,0.3)] bg-[rgba(212,175,55,0.1)] text-[#DFC067]">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="font-mono text-[11px] font-bold tracking-[0.16em] text-[#DFC067]">
                        STAGE {String(index + 1).padStart(2, '0')}
                      </p>
                      <h3 className="mt-0.5 text-xl font-bold text-white sm:text-2xl">
                        {stage.title}
                      </h3>
                    </div>
                    <span className="sr-only">{status}</span>
                  </div>
                  <p className="text-sm font-medium leading-relaxed text-[#A1A1AA] sm:text-base">
                    {stage.shortDescription}
                  </p>
                  <p className="mt-3 border-t border-[#2A2A2A] pt-3 text-sm leading-relaxed text-[#88888F]">
                    {stage.description}
                  </p>
                </article>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};
