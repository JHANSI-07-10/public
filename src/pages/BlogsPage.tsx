import React, { useState } from 'react';
import { SectionHeader } from '../components/ui/SectionHeader';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { VERIFIED_INSIGHTS, Service } from '../data/content';
import { ArrowUpRight, BookOpen, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BlogsPageProps {
  onOpenConsultation: (service?: Service) => void;
}

export const BlogsPage: React.FC<BlogsPageProps> = ({ onOpenConsultation }) => {
  const [selectedTag, setSelectedTag] = useState<string>('all');

  const allTags = ['all', 'REACT', 'ARCHITECTURE', 'JAVA', 'SECURITY', 'REAL-TIME'];

  const filteredArticles =
    selectedTag === 'all'
      ? VERIFIED_INSIGHTS
      : VERIFIED_INSIGHTS.filter((a) => a.tags.includes(selectedTag));

  return (
    <div className="pt-28 pb-20 bg-[#0a0a0a]">
      {/* Blog Hero */}
      <section className="relative py-16 sm:py-24 border-b border-[#1f1f1f] overflow-hidden">
        <div className="absolute inset-0 hero-tech-grid opacity-40 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeader
            eyebrow="Technical Insights & Research"
            title="Architectural Deep Dives from the VPD Engineering Lab."
            subtitle="Articles, technical methodologies, and architectural benchmarks on React frontends, real-time sync protocols, and enterprise Java systems."
          />

          {/* Tag Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 mt-8">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c] ${
                  selectedTag === tag
                    ? 'bg-[#c9a84c] text-black shadow-md'
                    : 'bg-[#141414] text-[#aaaaaa] hover:text-white border border-[#242424]'
                }`}
              >
                {tag === 'all' ? 'ALL TOPICS' : tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
              <Card
                key={article.id}
                variant="card"
                padding="none"
                className="overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  {/* Thumbnail Cover Frame */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#181818] border-b border-[#242424]">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
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
                    <div className="absolute top-3 left-3 flex gap-1.5">
                      {article.tags.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded bg-black/80 backdrop-blur-md text-[10px] font-mono text-[#c9a84c] font-bold"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 sm:p-7">
                    <div className="flex items-center gap-2 text-xs text-[#777777] font-medium mb-3">
                      <span>{article.author}</span>
                      <span aria-hidden="true">·</span>
                      <span>{article.date}</span>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#c9a84c] transition-colors leading-snug">
                      <Link to={`/blogs/${article.id}`}>
                        {article.title}
                      </Link>
                    </h3>

                    <p className="text-xs sm:text-sm text-[#aaaaaa] leading-relaxed line-clamp-3">
                      {article.excerpt}
                    </p>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-6 pt-0">
                  <Link
                    to={`/blogs/${article.id}`}
                    className="inline-flex items-center gap-2 text-xs font-bold text-[#c9a84c] hover:text-white transition-colors"
                  >
                    <span>Read Architectural Breakdown</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter / CTA */}
      <section className="py-16 border-t border-[#1f1f1f] bg-[#0d0d0d]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-2xl sm:text-3xl font-black text-white mb-4">
            Need Expert Architectural Guidance on These Stacks?
          </h3>
          <p className="text-sm text-[#aaaaaa] mb-8 max-w-xl mx-auto">
            Schedule an engineering consultation with our team to discuss your tech stack optimization, microservices strategy, or React performance budgets.
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
      </section>
    </div>
  );
};
