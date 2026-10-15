import React, { useId } from 'react';
import { VPD_LOGO_HEIGHT, VPD_LOGO_PATHS, VPD_LOGO_WIDTH } from './photonKnot/logoPaths';
import styles from './AnimatedVPDLogo.module.css';

export const AnimatedVPDLogo: React.FC = () => {
  const id = useId().replace(/:/g, '');
  const shapeMaskId = `${id}-shape`;
  const dGradientId = `${id}-d-gold`;
  const vGradientId = `${id}-v-gold`;
  const initialLightGradientId = `${id}-initial-light`;
  const sheenGradientId = `${id}-sheen`;

  return (
    <span className={styles.container}>
      <svg
        viewBox={`0 0 ${VPD_LOGO_WIDTH} ${VPD_LOGO_HEIGHT}`}
        className={styles.logo}
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <linearGradient id={dGradientId} x1="30%" y1="10%" x2="85%" y2="85%">
            <stop offset="0%" stopColor="#fff" />
            <stop offset="40%" stopColor="#fff" />
            <stop offset="62%" stopColor="#f2d98d" />
            <stop offset="85%" stopColor="#d4af37" />
            <stop offset="100%" stopColor="#c59b27" />
          </linearGradient>
          <linearGradient id={vGradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e5c15d" />
            <stop offset="50%" stopColor="#d4af37" />
            <stop offset="100%" stopColor="#b8860b" />
          </linearGradient>
          <linearGradient id={initialLightGradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#d4af37" stopOpacity="0" />
            <stop offset="42%" stopColor="#f2d98d" stopOpacity="0.82" />
            <stop offset="50%" stopColor="#fff4c2" stopOpacity="1" />
            <stop offset="58%" stopColor="#d4af37" stopOpacity="0.82" />
            <stop offset="100%" stopColor="#d4af37" stopOpacity="0" />
          </linearGradient>
          <linearGradient id={sheenGradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#fff" stopOpacity="0" />
            <stop offset="46%" stopColor="#fff" stopOpacity="0.65" />
            <stop offset="54%" stopColor="#f2d98d" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <mask
            id={shapeMaskId}
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width={VPD_LOGO_WIDTH}
            height={VPD_LOGO_HEIGHT}
          >
            <path d={VPD_LOGO_PATHS.vp_body.d} fill="white" fillRule="evenodd" />
            <path d={VPD_LOGO_PATHS.v_gold.d} fill="white" fillRule="evenodd" />
            <path d={VPD_LOGO_PATHS.d_shape.d} fill="white" fillRule="evenodd" />
            <path d={VPD_LOGO_PATHS.text.d} fill="white" fillRule="evenodd" />
          </mask>
        </defs>

        <g className={styles.markFill}>
          <path d={VPD_LOGO_PATHS.vp_body.d} fill="#f8f8f6" fillRule="evenodd" />
          <path d={VPD_LOGO_PATHS.v_gold.d} fill={`url(#${vGradientId})`} fillRule="evenodd" />
          <path d={VPD_LOGO_PATHS.d_shape.d} fill={`url(#${dGradientId})`} fillRule="evenodd" />
          <path d={VPD_LOGO_PATHS.text.d} fill="#f8f8f6" fillRule="evenodd" />
        </g>

        <g className={styles.traces} fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path
            className={styles.traceBody}
            d={VPD_LOGO_PATHS.vp_body.d}
            pathLength="1"
            stroke="#f2d98d"
            strokeWidth="5"
          />
          <path
            className={styles.traceAccent}
            d={VPD_LOGO_PATHS.v_gold.d}
            pathLength="1"
            stroke="#f2d98d"
            strokeWidth="4"
          />
          <path
            className={styles.traceD}
            d={VPD_LOGO_PATHS.d_shape.d}
            pathLength="1"
            stroke="#e5c15d"
            strokeWidth="5"
          />
          <path
            className={styles.traceWordmark}
            d={VPD_LOGO_PATHS.text.d}
            pathLength="1"
            stroke="#f2d98d"
            strokeWidth="3"
          />
        </g>

        <rect
          className={styles.initialLight}
          x="0"
          y="0"
          width={VPD_LOGO_WIDTH}
          height={VPD_LOGO_HEIGHT}
          fill={`url(#${initialLightGradientId})`}
          mask={`url(#${shapeMaskId})`}
        />

        <rect
          className={styles.sheen}
          x="0"
          y="0"
          width={VPD_LOGO_WIDTH}
          height={VPD_LOGO_HEIGHT}
          fill={`url(#${sheenGradientId})`}
          mask={`url(#${shapeMaskId})`}
        />
      </svg>
    </span>
  );
};

export default AnimatedVPDLogo;
