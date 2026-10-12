import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);

    // Update document title dynamically per route
    if (pathname === '/') {
      document.title = 'VPD Technologies | Digital Engineering';
    } else if (pathname === '/about') {
      document.title = 'About Us | VPD Technologies';
    } else if (pathname === '/services') {
      document.title = 'Software Engineering Services | VPD Technologies';
    } else if (pathname === '/portfolio') {
      document.title = 'Technical Impact Portfolio | VPD Technologies';
    } else if (pathname.startsWith('/portfolio/')) {
      document.title = 'Case Study Deep Dive | VPD Technologies';
    } else if (pathname === '/blogs') {
      document.title = 'Technical Insights & Research | VPD Technologies';
    } else if (pathname.startsWith('/blogs/')) {
      document.title = 'Architectural Article | VPD Technologies';
    } else if (pathname === '/contact') {
      document.title = 'Contact Engineering Team | VPD Technologies';
    } else if (pathname === '/privacy') {
      document.title = 'Privacy Policy | VPD Technologies';
    } else if (pathname === '/terms') {
      document.title = 'Terms of Service | VPD Technologies';
    } else if (pathname.startsWith('/admin')) {
      document.title = 'Admin Gateway | VPD Technologies';
    } else {
      document.title = 'Page Not Found | VPD Technologies';
    }
  }, [pathname]);

  return null;
};
