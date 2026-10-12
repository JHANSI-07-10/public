import React, { useState } from 'react';
import { SectionHeader } from '../components/ui/SectionHeader';
import { Card } from '../components/ui/Card';
import { VERIFIED_PROJECTS, Service } from '../data/content';
import { ArrowRight, ArrowUpRight, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Reveal } from '../components/motion/Reveal';
import { AnimatedButton } from '../components/motion/AnimatedButton';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { PageHeroBackground } from '../components/ui/PageHeroBackground';

interface PortfolioPageProps {
  onOpenConsultation: (service?: Service) => void;
}

export const PortfolioPage: React.FC<PortfolioPageProps> = ({ onOpenConsultation }) => {
  const [selectedSector, setSelectedSector] = useState<string>('all');
  const shouldReduceMotion = useReducedMotion();

  const sectors = ['all', 'SaaS / Enterprise', 'Industrial Logistics', 'FinTech / Core Banking'];

  const filteredProjects =
    selectedSector === 'all'
      ? VERIFIED_PROJECTS
      : VERIFIED_PROJECTS.filter((p) => p.sector === selectedSector);

  return (
    <div className="pt-28 pb-20 bg-[#0a0a0a]">
      {/* Portfolio Hero */}
      <section className="relative py-16 sm:py-24 border-b border-[#1f1f1f] overflow-hidden">
        <PageHeroBackground imageSrc="/about3.webp" position="center 42%" />
        <div className="absolute inset-0 hero-tech-grid opacity-40 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal>
            <SectionHeader
              eyebrow="Technical Impact Portfolio"
              title="Engineered for Measurable Enterprise Outcomes."
              subtitle="Review our archive of high-performance web applications, scalable enterprise systems, and custom software solutions engineered for industry leaders."
            />
          </Reveal>

          {/* Sector Filters */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-2 mt-8"
          >
              {sectors.map((sec) => (
                <motion.button
                  key={sec}
                  type="button"
                  aria-pressed={selectedSector === sec}
                  onClick={() => setSelectedSector(sec)}
                  whileHover={shouldReduceMotion ? undefined : { y: -2 }}
                  whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className={`relative isolate overflow-hidden rounded-xl border px-4 py-2 text-xs font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c] cursor-pointer ${
                    selectedSector === sec
                      ? 'border-[#c9a84c] text-black shadow-md shadow-[#c9a84c]/10'
                      : 'border-[#242424] bg-[#141414] text-[#aaaaaa] hover:border-[#c9a84c]/40 hover:text-white'
                  }`}
                >
                  {selectedSector === sec && (
                    <motion.span
                      layoutId="portfolio-sector-indicator"
                      className="absolute inset-0 z-0 rounded-xl bg-[#c9a84c]"
                      transition={{ type: 'spring', stiffness: 360, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">
                    {sec === 'all' ? 'All Engagements' : sec}
                  </span>
                </motion.button>
              ))}
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
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
                      <motion.div
                        initial={shouldReduceMotion ? false : { opacity: 0, y: 12, scale: 0.96 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.35, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute bottom-4 left-4 right-4 sm:right-auto bg-[#0a0a0a]/92 backdrop-blur-md border border-[#c9a84c]/30 rounded-xl p-3.5 flex items-center gap-3"
                      >
                        <div className="text-2xl font-black text-[#c9a84c] tracking-tight tabular-nums">
                          {project.metricHighlight}
                        </div>
                        <div className="text-xs font-medium text-[#cccccc] leading-tight max-w-[180px]">
                          {project.metricLabel}
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Content */}
                  <motion.div
                    initial={shouldReduceMotion ? false : { opacity: 0, x: 22 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.55, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
                    className="lg:col-span-6 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2 text-xs text-[#888888] font-medium mb-3">
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

                      {/* Spec tags */}
                      <div className="grid grid-cols-2 gap-3 p-4 rounded-xl bg-[#0e0e0e] border border-[#222222] mb-6">
                        {project.specs.map((spec, sIdx) => (
                          <div key={sIdx} className="text-xs">
                            <span className="text-[#666666] block text-[10px] uppercase font-semibold">
                              {spec.label}
                            </span>
                            <span className="font-mono font-medium text-[#dddddd]">
                              {spec.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4 pt-2">
                      <Link
                        to={`/portfolio/${project.id}`}
                        className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-[#1a1a1a] hover:bg-[#222222] border border-[#2a2a2a] hover:border-[#c9a84c]/50 rounded-xl transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c]"
                      >
                        <span>Read Full Case Study</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-[#c9a84c]" />
                      </Link>
                      <button
                        type="button"
                        onClick={() => onOpenConsultation()}
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
        </div>
      </section>

      {/* Consultation Banner */}
      <section className="py-16 border-t border-[#1f1f1f] bg-[#0d0d0d]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Reveal>
            <h3 className="text-2xl sm:text-3xl font-black text-white mb-4">
              Have a Complex Engineering Milestone?
            </h3>
            <p className="text-sm text-[#aaaaaa] mb-8 max-w-xl mx-auto">
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
    </div>
  );
};
