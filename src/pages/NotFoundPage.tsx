import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { ArrowLeft, Home, Layers, Briefcase, Mail } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[80vh] pt-32 pb-20 flex items-center justify-center bg-[#0a0a0a]">
      <div className="max-w-xl mx-auto px-4 text-center">
        <div className="inline-block px-3 py-1 rounded-full bg-[#c9a84c]/10 border border-[#c9a84c]/30 text-xs font-mono font-bold text-[#c9a84c] mb-6">
          STATUS 404 · ROUTE UNRESOLVED
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight mb-4">
          Architectural Path Not Found.
        </h1>

        <p className="text-base text-[#aaaaaa] leading-relaxed mb-8">
          The requested URL does not match any registered public endpoint on the VPD Technologies digital network. Please return to the surface or navigate to a verified channel below.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          <Link to="/">
            <Button variant="primary" size="md" icon={<Home className="w-4 h-4" />}>
              Return to Homepage
            </Button>
          </Link>
          <Link to="/services">
            <Button variant="secondary" size="md" icon={<Layers className="w-4 h-4" />}>
              Explore Services
            </Button>
          </Link>
        </div>

        <div className="pt-8 border-t border-[#222222] flex items-center justify-center gap-6 text-xs text-[#777777]">
          <Link to="/portfolio" className="hover:text-white transition-colors flex items-center gap-1">
            <Briefcase className="w-3.5 h-3.5 text-[#c9a84c]" />
            <span>Case Studies</span>
          </Link>
          <Link to="/contact" className="hover:text-white transition-colors flex items-center gap-1">
            <Mail className="w-3.5 h-3.5 text-[#c9a84c]" />
            <span>Contact Support</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
