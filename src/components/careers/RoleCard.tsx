'use client';

import React from 'react';
import {
  ArrowRight,
  Clock,
  MapPin,
} from 'lucide-react';
import { CAREERS_DATA } from '../../data/content';

export type OpenRole = (typeof CAREERS_DATA.openRoles)[number];
export type RoleTint = 'amber' | 'teal' | 'violet';

const DEPARTMENT_BADGES: Record<
  string,
  {
    bg: string;
    text: string;
    border: string;
    dot: string;
  }
> = {
  'Core Engineering': {
    bg: 'bg-emerald-500/10',
    text: 'text-emerald-400',
    border: 'border-emerald-500/25',
    dot: 'bg-emerald-400',
  },
  'Frontend Experience': {
    bg: 'bg-indigo-500/10',
    text: 'text-indigo-400',
    border: 'border-indigo-500/25',
    dot: 'bg-indigo-400',
  },
  'Infrastructure & Quality': {
    bg: 'bg-amber-500/10',
    text: 'text-amber-400',
    border: 'border-amber-500/25',
    dot: 'bg-amber-400',
  },
};

const DEFAULT_BADGE = {
  bg: 'bg-emerald-500/10',
  text: 'text-emerald-400',
  border: 'border-emerald-500/25',
  dot: 'bg-emerald-400',
};

interface RoleCardProps {
  role: OpenRole;
  tint?: RoleTint;
  onDetails: (role: OpenRole) => void;
  onApply: (role: OpenRole) => void;
}

export const RoleCard: React.FC<RoleCardProps> = ({ role, onDetails, onApply }) => {
  const badge = DEPARTMENT_BADGES[role.department] ?? DEFAULT_BADGE;

  return (
    <article className="py-4.5 sm:py-5 flex flex-col md:flex-row md:items-center justify-between gap-4 group transition-colors">
      {/* Left Column: Role Details */}
      <div className="flex-1 min-w-0">
        {/* Title & Department Badge (with dot) */}
        <div className="flex flex-wrap items-center gap-3 mb-1.5">
          <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-[#DFC067] transition-colors tracking-tight">
            {role.title}
          </h3>
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${badge.bg} ${badge.text} ${badge.border}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
            {role.department}
          </span>
        </div>

        {/* Subtitle / Description */}
        <p className="text-xs sm:text-sm text-[#9ca3af] leading-relaxed mb-2.5 max-w-3xl">
          {role.overview}
        </p>

        {/* Meta Row: (pin) WorkMode / Location  (clock) Type */}
        <div className="flex flex-wrap items-center gap-5 text-sm text-[#9ca3af]">
          <span className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-[#71717a] shrink-0" />
            <span>{role.workMode} · {role.shortLocation}</span>
          </span>

          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-[#71717a] shrink-0" />
            <span>{role.type}</span>
          </span>

          <span className="text-xs text-[#52525b] font-mono">
            Posted {role.postedDate}
          </span>
        </div>
      </div>

      {/* Right Column: Actions */}
      <div className="flex items-center gap-3 shrink-0 self-start md:self-center pt-2 md:pt-0">
        <button
          type="button"
          onClick={() => onDetails(role)}
          className="inline-flex min-h-[40px] items-center justify-center px-4 py-2 rounded-xl border border-[#2e2e2e] bg-[#141414] text-xs font-bold text-white hover:bg-[#202020] hover:border-[#444444] transition-colors cursor-pointer"
        >
          Details
        </button>

        <button
          type="button"
          onClick={() => onApply(role)}
          className="inline-flex min-h-[40px] items-center justify-center gap-2 rounded-xl bg-[#c9a84c] px-5 py-2 text-xs sm:text-sm font-bold text-black hover:bg-[#d8b75b] transition-all shadow-md cursor-pointer"
        >
          <span>Apply Now</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </article>
  );
};

export default RoleCard;
