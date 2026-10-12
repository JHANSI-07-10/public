'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { motionTokens } from './motionTokens';

export interface AccordionItem {
  id: string | number;
  title: string;
  content: React.ReactNode;
}

export interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  defaultOpenId?: string | number;
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  allowMultiple = false,
  defaultOpenId,
  className = '',
}) => {
  const [openIds, setOpenIds] = useState<(string | number)[]>(
    defaultOpenId !== undefined ? [defaultOpenId] : []
  );
  const shouldReduceMotion = useReducedMotion();

  const toggleItem = (id: string | number) => {
    if (allowMultiple) {
      setOpenIds((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    } else {
      setOpenIds((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div className={`space-y-3.5 ${className}`}>
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);
        const headerId = `accordion-header-${item.id}`;
        const panelId = `accordion-panel-${item.id}`;

        return (
          <div
            key={item.id}
            className={`rounded-xl border transition-colors duration-200 overflow-hidden ${
              isOpen
                ? 'border-[#c9a84c]/50 bg-[#161616]'
                : 'border-[#262626] bg-[#121212] hover:border-[#383838]'
            }`}
          >
            <button
              id={headerId}
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => toggleItem(item.id)}
              className="w-full py-4.5 px-5 sm:px-6 flex items-center justify-between text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c] rounded-xl cursor-pointer"
            >
              <span className={`text-base font-bold transition-colors ${isOpen ? 'text-[#c9a84c]' : 'text-white'}`}>
                {item.title}
              </span>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={
                  shouldReduceMotion
                    ? { duration: 0.001 }
                    : { duration: motionTokens.duration.fast, ease: motionTokens.ease.snappy }
                }
                className="shrink-0 ml-4 text-[#888888]"
              >
                <ChevronDown className="w-4 h-4" />
              </motion.div>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={headerId}
                  initial={
                    shouldReduceMotion
                      ? { opacity: 1, height: 'auto' }
                      : { height: 0, opacity: 0 }
                  }
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={
                    shouldReduceMotion
                      ? { opacity: 0, height: 0 }
                      : { height: 0, opacity: 0 }
                  }
                  transition={{
                    duration: shouldReduceMotion ? 0.001 : motionTokens.duration.normal,
                    ease: motionTokens.ease.snappy,
                  }}
                  className="overflow-hidden"
                >
                  <div className="px-5 sm:px-6 pb-5 pt-1 text-sm text-[#aaaaaa] leading-relaxed border-t border-[#222222]/60">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};
