'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export const ScrollToTop = () => {
  const pathname = usePathname();

  // Titles are handled by per-route Next.js metadata; this only resets scroll.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};
