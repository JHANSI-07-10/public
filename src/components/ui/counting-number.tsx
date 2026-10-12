import React, { useEffect, useMemo, useRef, useState } from 'react';
import { animate, useInView, useReducedMotion } from 'motion/react';
import { motionTokens } from '../motion/motionTokens';

interface CountingNumberProps {
  /** Raw display string, e.g. "+240%", "99.99%", "2–4 Wk", "5.0 ★" */
  value: string;
  className?: string;
  duration?: number;
  delay?: number;
}

interface Segment {
  type: 'text' | 'number';
  text?: string;
  target?: number;
  decimals?: number;
}

const NUMBER_PATTERN = /\d+(?:\.\d+)?/g;

const parseSegments = (source: string): Segment[] => {
  const segments: Segment[] = [];
  let cursor = 0;

  for (const match of source.matchAll(NUMBER_PATTERN)) {
    const index = match.index ?? 0;
    if (index > cursor) {
      segments.push({ type: 'text', text: source.slice(cursor, index) });
    }

    const raw = match[0];
    const dot = raw.indexOf('.');
    segments.push({
      type: 'number',
      target: Number.parseFloat(raw),
      decimals: dot === -1 ? 0 : raw.length - dot - 1,
    });
    cursor = index + raw.length;
  }

  if (cursor < source.length) {
    segments.push({ type: 'text', text: source.slice(cursor) });
  }

  return segments;
};

export const CountingNumber: React.FC<CountingNumberProps> = ({
  value,
  className = '',
  duration = 1.6,
  delay = 0,
}) => {
  const containerRef = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(containerRef, { once: true, margin: '0px 0px -10% 0px' });
  const shouldReduceMotion = useReducedMotion();
  const [progress, setProgress] = useState(0);

  const segments = useMemo(() => parseSegments(value), [value]);

  useEffect(() => {
    if (!isInView) return;

    if (shouldReduceMotion) {
      setProgress(1);
      return;
    }

    const controls = animate(0, 1, {
      duration,
      delay,
      ease: motionTokens.ease.snappy,
      onUpdate: setProgress,
    });

    return () => controls.stop();
  }, [isInView, shouldReduceMotion, duration, delay]);

  return (
    <span ref={containerRef} className={className} aria-label={value}>
      {segments.map((segment, idx) =>
        segment.type === 'text' ? (
          <span key={idx} aria-hidden="true">
            {segment.text}
          </span>
        ) : (
          <span key={idx} aria-hidden="true" className="tabular-nums">
            {(segment.target! * progress).toFixed(segment.decimals)}
          </span>
        )
      )}
    </span>
  );
};

export default CountingNumber;
