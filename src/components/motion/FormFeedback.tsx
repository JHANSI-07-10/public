import React from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { CheckCircle2, AlertCircle, Loader2, Info } from 'lucide-react';
import { motionTokens } from './motionTokens';

export interface FormFeedbackProps {
  type: 'success' | 'error' | 'info' | 'loading' | null;
  message?: string;
  className?: string;
}

export const FormFeedback: React.FC<FormFeedbackProps> = ({
  type,
  message,
  className = '',
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (!type || !message) return null;

  const config = {
    success: {
      bg: 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200',
      icon: <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />,
      role: 'status',
      live: 'polite' as const,
    },
    error: {
      bg: 'bg-red-950/40 border-red-500/40 text-red-200',
      icon: <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />,
      role: 'alert',
      live: 'assertive' as const,
    },
    info: {
      bg: 'bg-blue-950/40 border-blue-500/40 text-blue-200',
      icon: <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />,
      role: 'status',
      live: 'polite' as const,
    },
    loading: {
      bg: 'bg-[#181818] border-[#c9a84c]/30 text-[#cccccc]',
      icon: <Loader2 className="w-4 h-4 text-[#c9a84c] shrink-0 animate-spin mt-0.5" />,
      role: 'status',
      live: 'polite' as const,
    },
  }[type];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`${type}-${message}`}
        role={config.role}
        aria-live={config.live}
        initial={
          shouldReduceMotion
            ? { opacity: 1 }
            : { opacity: 0, y: -6, height: 'auto' }
        }
        animate={{ opacity: 1, y: 0, height: 'auto' }}
        exit={
          shouldReduceMotion
            ? { opacity: 0 }
            : { opacity: 0, y: -6, height: 0 }
        }
        transition={{
          duration: shouldReduceMotion ? 0.001 : motionTokens.duration.fast,
          ease: motionTokens.ease.snappy,
        }}
        className={`p-4 rounded-xl border text-xs sm:text-sm flex items-start gap-3 ${config.bg} ${className}`}
      >
        {config.icon}
        <div className="leading-relaxed flex-1">{message}</div>
      </motion.div>
    </AnimatePresence>
  );
};
