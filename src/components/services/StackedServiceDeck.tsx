'use client';

import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import type { Service } from '../../data/content';
import styles from './StackedServiceDeck.module.css';

interface StackedServiceDeckProps {
  services: Service[];
  activeIndex: number;
  onActiveChange: (index: number) => void;
}

/** The deck renders the service set twice so the marquee loops seamlessly. */
const COPIES = [0, 1] as const;

const CardBody: React.FC<{ service: Service }> = ({ service }) => {
  const oneLineDesc = service.stackLines?.[0] || service.description;
  return (
    <div className={styles.content}>
      <p className={styles.category}>{service.category}</p>
      <h3 className={styles.title}>{service.title}</h3>
      <div className={styles.separator}>
        <span className={styles.rule} aria-hidden="true" />
      </div>
      <p className={styles.descLine}>{oneLineDesc}</p>
    </div>
  );
};

export const StackedServiceDeck: React.FC<StackedServiceDeckProps> = ({
  services,
  activeIndex,
  onActiveChange,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const viewportRef = useRef<HTMLDivElement>(null);
  const inView = useInView(viewportRef, { once: true, amount: 0.15 });
  const [scrolling, setScrolling] = useState(true);
  const [paused, setPaused] = useState(false);
  const [touchOpen, setTouchOpen] = useState<number | null>(null);

  const activate = useCallback(
    (index: number) => onActiveChange(index),
    [onActiveChange],
  );

  if (shouldReduceMotion) {
    return (
      <div className={styles.flat}>
        {services.map((service, i) => (
          <div
            key={service.id}
            className={styles.flatCard}
            role="button"
            tabIndex={0}
            aria-label={`${service.title} — view details`}
            onClick={() => activate(i)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                activate(i);
              }
            }}
          >
            <CardBody service={service} />
          </div>
        ))}
      </div>
    );
  }

  const trackClass = [
    styles.track,
    scrolling ? styles.trackScrolling : '',
    paused ? styles.trackPaused : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      ref={viewportRef}
      className={styles.viewport}
      role="list"
      aria-label="Core engineering services"
    >
      <div className={trackClass} style={{ '--card-count': services.length } as React.CSSProperties}>
        {COPIES.map((copy) =>
          services.map((service, i) => {
            const revealed = activeIndex === i;
            return (
              <motion.div
                key={`${service.id}-${copy}`}
                role="listitem"
                aria-hidden={copy === 1}
                tabIndex={copy === 1 ? -1 : 0}
                aria-label={service.title}
                className={`${styles.card} ${revealed ? styles.cardRevealed : ''} ${
                  touchOpen === i ? styles.cardOpen : ''
                }`}
                style={{ zIndex: revealed ? 20 : 10 }}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                transition={{
                  delay: (i % services.length) * 0.05,
                  duration: 0.45,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ y: -6, scale: 1.02 }}
                onMouseEnter={() => {
                  setTouchOpen(null);
                  activate(i);
                }}
                onFocus={() => activate(i)}
                onPointerDown={(e) => {
                  if (e.pointerType === 'mouse') return;
                  activate(i);
                  const opening = touchOpen !== i;
                  setTouchOpen(opening ? i : null);
                  setPaused(opening);
                }}
                onClick={() => activate(i)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    activate(i);
                    setPaused(true);
                  }
                }}
              >
                <span className={styles.sheen} aria-hidden="true" />
                <span className={styles.edgeGlow} aria-hidden="true" />
                <CardBody service={service} />
              </motion.div>
            );
          }),
        )}
      </div>
    </div>
  );
};

export default StackedServiceDeck;
