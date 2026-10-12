'use client';

import React, { useMemo, useRef } from 'react';
import { motion, useInView, useReducedMotion, type Transition } from 'motion/react';

interface CountingNumberProps {
  /** Raw display string, e.g. "+240%", "99.99%", "2–4 Wk", "5.0 ★" */
  value: string;
  className?: string;
  duration?: number;
  delay?: number;
}

type Token =
  | { type: 'text'; text: string }
  | { type: 'digit'; digit: number };

const tokenize = (source: string): Token[] => {
  const tokens: Token[] = [];
  for (const ch of source) {
    if (ch >= '0' && ch <= '9') {
      tokens.push({ type: 'digit', digit: Number(ch) });
    } else {
      const last = tokens[tokens.length - 1];
      if (last && last.type === 'text') last.text += ch;
      else tokens.push({ type: 'text', text: ch });
    }
  }
  return tokens;
};

const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

/**
 * Odometer-style digit: a vertical 0–9 strip that slides so the target
 * digit rolls into view. `stripIndex` drives the cascade stagger.
 */
const DigitColumn: React.FC<{
  target: number;
  active: boolean;
  delay: number;
  transition: Transition;
  reduce: boolean;
}> = ({ target, active, delay, transition, reduce }) => (
  <span className="relative inline-block h-[1em] overflow-hidden align-middle">
    {/* Invisible probe keeps the column width consistent with the font */}
    <span className="invisible" aria-hidden="true">0</span>
    <motion.span
      className="absolute inset-x-0 top-0 flex flex-col items-center"
      initial={{ y: reduce ? `-${target * 10}%` : '0%' }}
      animate={active ? { y: `-${target * 10}%` } : undefined}
      transition={reduce ? { duration: 0 } : { ...transition, delay }}
      aria-hidden="true"
    >
      {DIGITS.map((n) => (
        <span key={n} className="flex h-[1em] w-full items-center justify-center leading-none">
          {n}
        </span>
      ))}
    </motion.span>
  </span>
);

export const CountingNumber: React.FC<CountingNumberProps> = ({
  value,
  className = '',
  duration = 1.4,
  delay = 0,
}) => {
  const containerRef = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(containerRef, { once: true, margin: '0px 0px -10% 0px' });
  const shouldReduceMotion = useReducedMotion();

  const tokens = useMemo(() => tokenize(value), [value]);

  // Cascade: rightmost digits settle first, like a mechanical odometer
  const digitPositions = useMemo(
    () =>
      tokens.reduce<number[]>((positions, token, idx) => {
        if (token.type === 'digit') positions.push(idx);
        return positions;
      }, []),
    [tokens]
  );

  const transition: Transition = {
    duration: shouldReduceMotion ? 0 : duration,
    ease: [0.16, 1, 0.3, 1],
  };

  let digitCursor = 0;

  return (
    <span
      ref={containerRef}
      className={`inline-flex items-center tabular-nums ${className}`}
      aria-label={value}
    >
      {tokens.map((token, idx) => {
        if (token.type === 'text') {
          return (
            <span key={idx} aria-hidden="true">
              {token.text}
            </span>
          );
        }

        const stripIndex = digitCursor++;
        const total = digitPositions.length;
        // Rightmost digits land first: stagger from the right edge
        const cascade = (total - 1 - stripIndex) * 0.07;

        return (
          <DigitColumn
            key={idx}
            target={token.digit}
            active={isInView}
            delay={delay + cascade}
            transition={transition}
            reduce={!!shouldReduceMotion}
          />
        );
      })}
    </span>
  );
};

export default CountingNumber;
