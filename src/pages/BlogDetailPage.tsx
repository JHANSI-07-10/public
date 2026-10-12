import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { VERIFIED_INSIGHTS, Service } from '../data/content';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { ArrowLeft, ArrowRight, Share2, Calendar, User, Tag } from 'lucide-react';

interface BlogDetailPageProps {
  onOpenConsultation: (service?: Service) => void;
}

export const BlogDetailPage: React.FC<BlogDetailPageProps> = ({ onOpenConsultation }) => {
  const { id } = useParams<{ id: string }>();

  const article = VERIFIED_INSIGHTS.find((a) => a.id === id) || VERIFIED_INSIGHTS[0];

  return (
    <div className="pt-28 pb-20 bg-[#0a0a0a]">
      {/* Breadcrumb Header */}
      <section className="py-8 border-b border-[#1f1f1f] bg-[#0d0d0d]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs text-[#888888] font-medium">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link to="/blogs" className="hover:text-white transition-colors">Insights</Link>
            <span>/</span>
            <span className="text-[#c9a84c] truncate max-w-xs">{article.title}</span>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-10">
            <div className="flex flex-wrap gap-2 mb-4">
              {article.tags.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 rounded bg-[#181818] border border-[#2a2a2a] text-[10px] font-mono font-bold text-[#c9a84c]"
                >
                  {t}
                </span>
              ))}
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-6 leading-tight">
              {article.title}
            </h1>

            <div className="flex items-center gap-6 text-xs text-[#888888] pb-6 border-b border-[#222222]">
              <div className="flex items-center gap-2">
                <User className="w-3.5 h-3.5 text-[#c9a84c]" />
                <span className="text-white font-medium">{article.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-[#c9a84c]" />
                <span>{article.date}</span>
              </div>
              <div className="text-[#777777]">
                5 Min Technical Read
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="rounded-2xl overflow-hidden aspect-[16/9] max-h-[460px] bg-[#141414] border border-[#262626] mb-12">
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

          {/* Article Body */}
          <div className="prose prose-invert max-w-none space-y-6 text-base text-[#cccccc] leading-relaxed">
            <p className="text-lg text-white font-medium leading-relaxed">
              {article.excerpt}
            </p>

            <h2 className="text-2xl font-bold text-white pt-6 border-t border-[#222222]">
              The Architectural Imperative
            </h2>
            <p>
              In high-frequency enterprise environments, the trade-off between user experience agility and system reliability is often mismanaged. Engineering teams default to either bloated client bundles that degrade conversion velocity, or rigid monolithic architectures that cannot accommodate evolving business requirements.
            </p>
            <p>
              At VPD Technologies, our architectural standard couples lightweight, edge-rendered frontends with strictly decoupled event-driven service meshes. This guarantees that operational state synchronization remains resilient even during peak traffic conditions.
            </p>

            <div className="p-6 rounded-2xl bg-[#141414] border border-[#282828] my-8">
              <h3 className="text-base font-bold text-[#c9a84c] mb-2">
                Key Architectural Principle
              </h3>
              <p className="text-sm text-[#aaaaaa] italic m-0">
                "Zero-waste codebases are not an aesthetic luxury; they are a financial imperative. Every 100 milliseconds of latency directly degrades user retention and transaction throughput."
              </p>
            </div>

            <h2 className="text-2xl font-bold text-white pt-6 border-t border-[#222222]">
              Scalability & Implementation Protocols
            </h2>
            <p>
              By leveraging type-safe Java protocols and Spring Boot on the backend alongside React and WebSockets on the frontend, enterprises obtain the rare duality of banking-grade data security with fluid real-time interactions.
            </p>
          </div>

          {/* Call to action inside article */}
          <div className="mt-16 p-8 rounded-2xl bg-[#141414] border border-[#2a2a2a] flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="text-lg font-bold text-white mb-1">
                Implement This Architecture
              </h4>
              <p className="text-xs text-[#888888]">
                Schedule an architectural audit with our technical team to discuss implementation.
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

          {/* Navigation Back */}
          <div className="mt-12 pt-8 border-t border-[#222222] flex items-center justify-between">
            <Link
              to="/blogs"
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
