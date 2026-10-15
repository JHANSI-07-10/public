'use client';

import React, { useRef, useState } from 'react';
import {
  Code2,
  FlaskConical,
  PenTool,
  ShieldCheck,
  TrendingUp,
  CircleDot,
  type LucideIcon,
} from 'lucide-react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import type { DeliveryStage } from '../../data/content';
import { motionTokens } from '../motion/motionTokens';
import styles from './DeliveryWheel.module.css';

interface DeliveryWheelProps {
  stages: DeliveryStage[];
}

const STAGE_ICONS: Record<string, LucideIcon> = {
  Design: PenTool,
  Develop: Code2,
  Pilot: FlaskConical,
  Scale: TrendingUp,
  Support: ShieldCheck,
};

const iconFor = (title: string): LucideIcon => STAGE_ICONS[title] ?? CircleDot;

/** Donut geometry in viewBox units (0 0 300 300). */
const CENTER = 150;
const RADIUS = 112;
const GAP_DEG = 6;

const polar = (deg: number) => {
  const rad = ((deg - 90) * Math.PI) / 180;
  return { x: CENTER + RADIUS * Math.cos(rad), y: CENTER + RADIUS * Math.sin(rad) };
};

export const DeliveryWheel: React.FC<DeliveryWheelProps> = ({ stages }) => {
  const [selected, setSelected] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const dialRef = useRef<HTMLDivElement>(null);
  const drawn = useInView(dialRef, { once: true, amount: 0.3 }) || shouldReduceMotion;

  const active = stages[selected];
  const ActiveIcon = iconFor(active.title);
  const segment = 360 / stages.length;
  const arcLen = (RADIUS * (segment - GAP_DEG) * Math.PI) / 180;

  return (
    <div className={styles.layout}>
      <div className={styles.dialCol}>
        <fieldset className={styles.fieldset}>
          <legend className={styles.srOnly}>Select a delivery stage to explore our process</legend>
          <div ref={dialRef} className={`${styles.dial} ${drawn ? styles.drawn : ''}`}>
            <svg className={styles.ring} viewBox="0 0 300 300" aria-hidden="true" focusable="false">
              {stages.map((stage, i) => {
                const a0 = i * segment + GAP_DEG / 2;
                const a1 = (i + 1) * segment - GAP_DEG / 2;
                const p0 = polar(a0);
                const p1 = polar(a1);
                const classes = [
                  styles.seg,
                  i < selected ? styles.segDone : '',
                  i === selected ? styles.segActive : '',
                ]
                  .filter(Boolean)
                  .join(' ');
                return (
                  <path
                    key={stage.step}
                    className={classes}
                    d={`M ${p0.x.toFixed(2)} ${p0.y.toFixed(2)} A ${RADIUS} ${RADIUS} 0 0 1 ${p1.x.toFixed(2)} ${p1.y.toFixed(2)}`}
                    style={{ '--len': arcLen, '--d': `${i * 90}ms` } as React.CSSProperties}
                    onClick={() => setSelected(i)}
                  />
                );
              })}
            </svg>

            <ul className={styles.labels}>
              {stages.map((stage, i) => {
                const Icon = iconFor(stage.title);
                const mid = i * segment + segment / 2;
                const { x, y } = polar(mid);
                const inputId = `vpd-stage-${stage.step}`;
                return (
                  <li
                    key={stage.step}
                    className={styles.labelItem}
                    style={
                      {
                        '--x': `${((x / CENTER) * 50).toFixed(2)}%`,
                        '--y': `${((y / CENTER) * 50).toFixed(2)}%`,
                        '--labD': `${i * 90 + 260}ms`,
                      } as React.CSSProperties
                    }
                  >
                    <input
                      className={styles.input}
                      type="radio"
                      name="vpd-delivery-stage"
                      id={inputId}
                      value={stage.title}
                      checked={i === selected}
                      onChange={() => setSelected(i)}
                    />
                    <label className={styles.lab} htmlFor={inputId}>
                      <Icon className={`w-4 h-4 ${styles.labIcon}`} aria-hidden="true" />
                      <span className={styles.labName}>{stage.title}</span>
                    </label>
                  </li>
                );
              })}
            </ul>

            <div className={styles.hub} aria-hidden="true">
              <motion.span
                key={active.step}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: shouldReduceMotion ? 0.01 : motionTokens.duration.normal,
                  ease: motionTokens.ease.snappy,
                }}
                style={{ display: 'grid', justifyItems: 'center', gap: '2px' }}
              >
                <ActiveIcon className={`w-5 h-5 ${styles.hubIcon}`} aria-hidden="true" />
                <span className={styles.hubName}>{active.title}</span>
                <span className={styles.hubStep}>{active.step}</span>
                <span className={styles.hubKicker}>Stage</span>
              </motion.span>
            </div>
          </div>
        </fieldset>

        <p className={styles.instruction}>Select a stage to explore our process.</p>
      </div>

      <div className={styles.panel} aria-live="polite">
        <span className={styles.panelTop} aria-hidden="true" />
        <motion.div
          key={active.step}
          initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: shouldReduceMotion ? 0.01 : motionTokens.duration.normal,
            ease: motionTokens.ease.snappy,
          }}
        >
          <div className={styles.panelHead}>
            <span className={styles.panelKicker}>Stage {active.step} of 05</span>
            <span className={styles.panelCount}>{active.tagline}</span>
          </div>
          <h3 className={styles.panelTitle}>{active.title}</h3>
          <p className={styles.panelSummary}>{active.summary}</p>

          <div className={styles.dots} aria-hidden="true">
            {stages.map((stage, i) => (
              <span
                key={stage.step}
                className={`${styles.dot} ${i < selected ? styles.dotDone : ''} ${
                  i === selected ? styles.dotNow : ''
                }`}
              />
            ))}
            <span className={styles.dotLabel}>
              {selected + 1} / {stages.length}
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DeliveryWheel;
