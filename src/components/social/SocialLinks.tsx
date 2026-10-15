'use client';

import React, { useEffect, useState } from 'react';
import { Facebook, Instagram, Linkedin, Share2, X, type LucideIcon } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { SOCIAL_LINKS, type SocialPlatform } from '../../data/content';
import { motionTokens } from '../motion/motionTokens';
import styles from './SocialLinks.module.css';

const PLATFORM_ICONS: Record<SocialPlatform, LucideIcon> = {
  linkedin: Linkedin,
  facebook: Facebook,
  instagram: Instagram,
};

const DOCK_ID = 'vpd-social-dock';

export const SocialLinks: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // The dock belongs to small screens only; drop it if the rail takes over.
  useEffect(() => {
    const desktopRail = window.matchMedia('(min-width: 1024px)');
    const handleChange = (event: MediaQueryListEvent) => {
      if (event.matches) setIsOpen(false);
    };
    desktopRail.addEventListener('change', handleChange);
    return () => desktopRail.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const itemTransition = (delay: number) => ({
    duration: shouldReduceMotion ? 0.01 : motionTokens.duration.fast,
    delay: shouldReduceMotion ? 0 : delay,
    ease: motionTokens.ease.snappy,
  });

  return (
    <>
      <aside className={styles.rail} aria-label="VPD Technologies on social media">
        <ul className={styles.railList}>
          {SOCIAL_LINKS.map(({ platform, label, href }) => {
            const Icon = PLATFORM_ICONS[platform];
            return (
              <li key={platform}>
                <a
                  className={styles.railLink}
                  data-platform={platform}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`VPD Technologies on ${label}`}
                >
                  <span className={styles.railIcon}>
                    <Icon className="w-[18px] h-[18px]" aria-hidden="true" />
                  </span>
                  <span className={styles.railLabel}>{label}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </aside>

      {isOpen && (
        <div
          className={styles.backdrop}
          aria-hidden="true"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div className={styles.dock}>
        {isOpen && (
          <motion.ul id={DOCK_ID} className={styles.dockList}>
            {SOCIAL_LINKS.map(({ platform, label, href }, index) => {
              const Icon = PLATFORM_ICONS[platform];
              return (
                <motion.li
                  key={platform}
                  className={styles.dockItem}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 10, scale: 0.86 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={itemTransition((SOCIAL_LINKS.length - 1 - index) * 0.06)}
                >
                  <a
                    className={styles.dockLink}
                    data-platform={platform}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`VPD Technologies on ${label}`}
                    onClick={() => setIsOpen(false)}
                  >
                    <Icon className={`w-[18px] h-[18px] ${styles.dockGlyph}`} aria-hidden="true" />
                  </a>
                </motion.li>
              );
            })}
          </motion.ul>
        )}

        <motion.button
          type="button"
          className={styles.fab}
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-controls={DOCK_ID}
          aria-label={isOpen ? 'Close social media links' : 'Open social media links'}
          whileTap={shouldReduceMotion ? undefined : { scale: 0.94 }}
        >
          <motion.span
            key={isOpen ? 'close' : 'open'}
            initial={shouldReduceMotion ? false : { opacity: 0, rotate: -70 }}
            animate={{ opacity: 1, rotate: 0 }}
            transition={itemTransition(0)}
            style={{ display: 'grid', placeItems: 'center' }}
          >
            {isOpen ? (
              <X className="w-[18px] h-[18px]" aria-hidden="true" />
            ) : (
              <Share2 className="w-[18px] h-[18px]" aria-hidden="true" />
            )}
          </motion.span>
        </motion.button>
      </div>
    </>
  );
};

export default SocialLinks;
