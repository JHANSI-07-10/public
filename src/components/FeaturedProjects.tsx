'use client';

import React, { useState } from 'react';
import { ArrowUpRight, ChevronRight, X } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { VERIFIED_PROJECTS, Project } from '../data/content';
import { SectionHeader } from './ui/SectionHeader';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { AnimatedButton } from './motion/AnimatedButton';
import { Reveal } from './motion/Reveal';
import { motionTokens } from './motion/motionTokens';

// The clip sweep must live on a CHILD of the whileInView element: Chrome's
// IntersectionObserver treats an element clipped to inset(…100%…) as 0% visible,
// so animating clipPath on the observed element itself would never trigger.
const maskRevealVariants = {
  hidden: { clipPath: 'inset(0 0 100% 0)', scale: 1.1 },
  shown: {
    clipPath: 'inset(0% 0% 0% 0%)',
    scale: 1,
    transition: { duration: 0.8, ease: 'easeOut' as const },
  },
};

interface FeaturedProjectsProps {
  onOpenConsultation: () => void;
}

export const FeaturedProjects: React.FC<FeaturedProjectsProps> = ({ onOpenConsultation }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="case-studies" className="py-24 bg-[#080808]/25 backdrop-blur-[1px] border-t border-[#1f1f1f]/50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <Reveal>
          <div className="mb-16">
            <SectionHeader
              eyebrow="Selected Engagements & Evidence"
              title="Measurable Architectural Impact for Industry Leaders."
              subtitle="Every deployment is measured by business outcomes: conversion velocity, operational error reduction, and zero-downtime reliability."
              align="center"
              className="mb-0"
            />
          </div>
        </Reveal>

        {/* Project Showcase List */}
        <div className="space-y-12">
          {VERIFIED_PROJECTS.map((project, index) => {
            const isReversed = index % 2 === 1;
            return (
              <Reveal key={project.id} delay={index * 0.08}>
                <Card
                  variant="card"
                  padding="lg"
                  className="overflow-hidden hover:border-[#c9a84c]/40 transition-colors duration-300"
                >
                  <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${isReversed ? 'lg:flex-row-reverse' : ''}`}>
                    {/* Visual Frame — mask reveal: clip sweeps down while the image settles 1.1 → 1.0 */}
                    <div className={`lg:col-span-6 w-full ${isReversed ? 'lg:order-2' : ''}`}>
                      <motion.div
                        initial={shouldReduceMotion ? false : 'hidden'}
                        whileInView="shown"
                        viewport={{ once: true, amount: 0.2 }}
                        className="relative rounded-xl overflow-hidden aspect-[16/10] bg-[#1a1a1a] border border-[#2a2a2a] group"
                      >
                        <motion.div variants={maskRevealVariants} className="h-full w-full">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                              const parent = (e.target as HTMLElement).parentElement;
                              if (parent) {
                                parent.innerHTML = `
                                  <div class="w-full h-full flex flex-col items-center justify-center bg-[#181818] p-6 text-center">
                                    <span class="text-xs font-mono font-bold text-[#c9a84c] mb-2">${project.sector}</span>
                                    <span class="text-lg font-bold text-white">${project.title}</span>
                                  </div>
                                `;
                              }
                            }}
                          />
                        </motion.div>
                        {/* Metric Callout Overlay */}
                        <div className="absolute bottom-4 left-4 right-4 sm:right-auto bg-[#0a0a0a]/92 backdrop-blur-md border border-[#c9a84c]/30 rounded-xl p-3.5 flex items-center gap-3">
                          <div className="text-2xl font-black text-[#c9a84c] tracking-tight tabular-nums">
                            {project.metricHighlight}
                          </div>
                          <div className="text-xs font-medium text-[#aaaaaa] leading-tight max-w-[180px]">
                            {project.metricLabel}
                          </div>
                        </div>
                      </motion.div>
                    </div>

                    {/* Narrative & Details — slides in from its side as the card enters view */}
                    <motion.div
                      initial={shouldReduceMotion ? false : { opacity: 0, x: isReversed ? -30 : 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.6, ease: 'easeOut' }}
                      className={`lg:col-span-6 flex flex-col justify-between ${isReversed ? 'lg:order-1' : ''}`}
                    >
                      <div>
                        {/* Metadata line: No pills, unboxed clean text with separators */}
                        <div className="flex items-center gap-2 text-xs text-[#777777] font-medium mb-3">
                          <span>{project.client}</span>
                          <span aria-hidden="true">·</span>
                          <span>{project.sector}</span>
                          <span aria-hidden="true">·</span>
                          <span>{project.duration}</span>
                        </div>

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

                        {/* Technical Specs Strip */}
                        <div className="grid grid-cols-2 gap-3 p-4 rounded-xl bg-[#0e0e0e] border border-[#222222] mb-6">
                          {project.specs.map((spec, sIdx) => (
                            <div key={sIdx} className="text-sm">
                              <span className="mb-1 block text-xs uppercase font-semibold text-[#777777]">
                                {spec.label}
                              </span>
                              <span className="font-mono font-medium text-white">
                                {spec.value}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-wrap items-center gap-3 pt-2">
                        <AnimatedButton
                          onClick={() => setSelectedProject(project)}
                          variant="secondary"
                          size="sm"
                          icon={<ArrowUpRight className="w-3.5 h-3.5 text-[#c9a84c]" />}
                        >
                          View Project Breakdown
                        </AnimatedButton>
                        <Button
                          type="button"
                          onClick={onOpenConsultation}
                          className="text-xs font-semibold"
                          variant="ghost"
                          size="sm"
                          icon={<ChevronRight className="w-3.5 h-3.5" />}
                        >
                          Discuss Similar Project
                        </Button>
                      </div>
                    </motion.div>
                  </div>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              initial={shouldReduceMotion ? undefined : { scale: 0.96, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? undefined : { scale: 0.96, opacity: 0, y: 10 }}
              transition={{ duration: motionTokens.duration.fast, ease: motionTokens.ease.snappy }}
              className="bg-[#141414] border border-[#262626] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative shadow-2xl"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-5 right-5 p-2 rounded-xl bg-[#202020] text-[#aaaaaa] hover:text-white transition-colors cursor-pointer"
                aria-label="Close Case Study Details"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-6">
                <span className="text-xs font-mono font-bold text-[#c9a84c] uppercase">
                  {selectedProject.sector} · {selectedProject.duration}
                </span>
                <h3 className="text-2xl font-bold text-white mt-1">
                  {selectedProject.title}
                </h3>
                <p className="text-sm text-[#777777]">
                  Client: {selectedProject.client}
                </p>
              </div>

              <div className="space-y-4 text-sm text-[#aaaaaa] mb-8">
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1">
                    Challenge
                  </h4>
                  <p className="text-[#aaaaaa] leading-relaxed">{selectedProject.problem}</p>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1">
                    Engineered Solution
                  </h4>
                  <p className="text-[#aaaaaa] leading-relaxed">{selectedProject.solution}</p>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1">
                    Measurable Result
                  </h4>
                  <p className="text-[#c9a84c] leading-relaxed font-medium">{selectedProject.result}</p>
                </div>
              </div>

              <div className="pt-6 border-t border-[#222222] flex items-center justify-between">
                <span className="text-xs text-[#777777]">
                  Delivered under strict client NDA
                </span>
                <AnimatedButton
                  onClick={() => {
                    setSelectedProject(null);
                    onOpenConsultation();
                  }}
                  variant="primary"
                  size="sm"
                >
                  Inquire About Similar Architecture
                </AnimatedButton>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
