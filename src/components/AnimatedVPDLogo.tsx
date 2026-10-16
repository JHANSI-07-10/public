import React, { useId } from 'react';
import { VPD_LOGO_HEIGHT, VPD_LOGO_PATHS, VPD_LOGO_WIDTH } from './photonKnot/logoPaths';
import styles from './AnimatedVPDLogo.module.css';

export const AnimatedVPDLogo: React.FC = () => {
  const id = useId().replace(/:/g, '');
  const dGradientId = `${id}-d-gold`;
  const vGradientId = `${id}-v-gold`;

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
        </defs>

        <g className={styles.markFill}>
          <path d={VPD_LOGO_PATHS.vp_body.d} fill="#f8f8f6" fillRule="evenodd" />
          <path d={VPD_LOGO_PATHS.v_gold.d} fill={`url(#${vGradientId})`} fillRule="evenodd" />
          <path d={VPD_LOGO_PATHS.d_shape.d} fill={`url(#${dGradientId})`} fillRule="evenodd" />
          <path d={VPD_LOGO_PATHS.text.d} fill="#f8f8f6" fillRule="evenodd" />
        </g>
      </svg>
    </span>
  );
};

export default AnimatedVPDLogo;
