'use client';

import React, { useState } from 'react';
import {
  ArrowRight,
  Bookmark,
  BookmarkCheck,
  Briefcase,
  Code2,
  Layers,
  MapPin,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react';
import { CAREERS_DATA } from '../../data/content';
import styles from './RoleCard.module.css';

export type OpenRole = (typeof CAREERS_DATA.openRoles)[number];
export type RoleTint = 'amber' | 'teal' | 'violet';

const ROLE_ICONS: Record<string, LucideIcon> = {
  'full-stack-engineer': Code2,
  'frontend-developer': Layers,
  'qa-devops': ShieldCheck,
};

const TINT_CLASS: Record<RoleTint, string> = {
  amber: '',
  teal: styles.tintTeal,
  violet: styles.tintViolet,
};

interface RoleCardProps {
  role: OpenRole;
  tint: RoleTint;
  onDetails: (role: OpenRole) => void;
}

export const RoleCard: React.FC<RoleCardProps> = ({ role, tint, onDetails }) => {
  const [saved, setSaved] = useState(false);
  const Icon = ROLE_ICONS[role.id] ?? Briefcase;

  return (
    <article className={`${styles.card} ${TINT_CLASS[tint]}`}>
      <div className={styles.topRow}>
        <span className={styles.datePill}>{role.postedDate}</span>
        <button
          type="button"
          className={`${styles.save} ${saved ? styles.saveOn : ''}`}
          onClick={() => setSaved((prev) => !prev)}
          aria-pressed={saved}
          aria-label={saved ? `Remove ${role.title} from saved roles` : `Save ${role.title}`}
        >
          {saved ? (
            <BookmarkCheck className="w-3.5 h-3.5" aria-hidden="true" />
          ) : (
            <Bookmark className="w-3.5 h-3.5" aria-hidden="true" />
          )}
        </button>
      </div>

      <p className={styles.dept}>{role.department}</p>

      <div className={styles.headRow}>
        <h3 className={styles.title}>{role.title}</h3>
        <span className={styles.disc} aria-hidden="true">
          <Icon className="w-4 h-4" />
        </span>
      </div>

      <div className={styles.tags}>
        {[role.type, role.experienceLevel, role.workMode].map((tag) => (
          <span key={tag} className={styles.tag}>
            {tag}
          </span>
        ))}
      </div>

      <div className={styles.foot}>
        <div>
          <p className={styles.footLabel}>Now Hiring</p>
          <p className={styles.footLoc}>
            <MapPin className={`w-3 h-3 ${styles.footLocIcon}`} aria-hidden="true" />
            {role.shortLocation}
          </p>
        </div>
        <button type="button" className={styles.details} onClick={() => onDetails(role)}>
          Details
          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
        </button>
      </div>
    </article>
  );
};

export default RoleCard;
