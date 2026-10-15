'use client';

import React, { useEffect, useRef } from 'react';
import { ArrowRight, CheckCircle2, Mail, MapPin, X } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { COMPANY_DATA } from '../../data/content';
import { motionTokens } from '../motion/motionTokens';
import type { OpenRole } from './RoleCard';

interface RoleDetailModalProps {
  role: OpenRole | null;
  onClose: () => void;
}

export const RoleDetailModal: React.FC<RoleDetailModalProps> = ({ role, onClose }) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!role) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    document.body.style.overflow = 'hidden';
    panelRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
      previouslyFocused?.focus();
    };
  }, [role, onClose]);

  if (!role) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="role-detail-title"
        tabIndex={-1}
        initial={shouldReduceMotion ? false : { opacity: 0, y: 14, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: shouldReduceMotion ? 0.01 : motionTokens.duration.normal,
          ease: motionTokens.ease.snappy,
        }}
        onClick={(e) => e.stopPropagation()}
        className="relative bg-[#141414] border border-[#282828] rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl shadow-black max-h-[88vh] overflow-y-auto focus:outline-none"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-[#202020] text-[#aaaaaa] hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c]"
          aria-label="Close role details"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="px-2.5 py-0.5 rounded-full bg-[#1c1c1c] border border-[#333333] text-[11px] font-mono text-[#c9a84c]">
            {role.department}
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-[#1c1c1c] border border-[#333333] text-[11px] font-mono text-[#888888]">
            Posted {role.postedDate}
          </span>
        </div>

        <h3 id="role-detail-title" className="text-xl sm:text-2xl font-bold text-white pr-10">
          {role.title}
        </h3>

        <div className="flex flex-wrap gap-2 mt-3">
          {[role.type, role.experienceLevel, role.workMode].map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-full border border-[#2b2b2b] bg-[#181818] text-[11px] font-semibold text-[#c4c4c4]"
            >
              {tag}
            </span>
          ))}
        </div>

        <p className="text-sm text-[#aaaaaa] leading-relaxed mt-5">{role.overview}</p>

        <div className="mt-6">
          <h4 className="text-xs font-mono uppercase tracking-wider text-[#777777] mb-2 font-bold">
            Key Competencies &amp; Prerequisites:
          </h4>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#cccccc]">
            {role.requirements.map((req, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#c9a84c] shrink-0 mt-0.5" />
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-7 pt-5 border-t border-[#222222] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <span className="text-xs text-[#777777] flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#c9a84c]" />
            {role.location}
          </span>
          <a
            href={`mailto:${COMPANY_DATA.recruitmentEmail}?subject=${encodeURIComponent(`Application: ${role.title}`)}`}
            className="vpd-outline-cta inline-flex min-h-[40px] items-center justify-center gap-2 rounded-xl border border-[#c9a84c]/50 bg-[#1c1c1c] px-4 text-xs font-bold text-white hover:bg-[#c9a84c] hover:text-black transition-colors shrink-0"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Apply via Email</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default RoleDetailModal;
