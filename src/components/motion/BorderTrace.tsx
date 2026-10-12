import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface BorderTraceProps {
  children: React.ReactNode;
  className?: string;
  color?: string;
  radius?: number;
  duration?: number;
}

export const BorderTrace: React.FC<BorderTraceProps> = ({
  children,
  className = '',
  color = '#c9a84c',
  radius = 16,
  duration = 0.6,
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div className={`relative ${className}`} whileHover="trace">
      {children}
      <svg aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full overflow-visible">
        <motion.rect
          initial={{ pathLength: 0 }}
          variants={{ trace: { pathLength: 1 } }}
          transition={{ duration, ease: 'easeOut' }}
          x="0"
          y="0"
          width="100%"
          height="100%"
          rx={radius}
          fill="none"
          stroke={color}
          strokeOpacity="0.7"
          strokeWidth="1.5"
        />
      </svg>
    </motion.div>
  );
};
