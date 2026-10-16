'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { 
  Code2, 
  Globe, 
  Server, 
  Smartphone, 
  Cpu, 
  Cloud, 
  Palette, 
  Layers, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Zap,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Sprout,
  Activity,
  GraduationCap,
  Factory,
  Truck,
  Briefcase,
  AlertCircle
} from 'lucide-react';
import { CORE_SERVICES, Service, INDUSTRIES, Industry } from '../../data/content';
import { AnimatedButton } from '../motion/AnimatedButton';

interface ServiceShowcaseProps {
  onOpenConsultation: (service?: Service) => void;
}

export const ServiceShowcase: React.FC<ServiceShowcaseProps> = ({ onOpenConsultation }) => {
  // Navigation tabs: 'services' | 'industries'
  const [activeTab, setActiveTab] = useState<'services' | 'industries'>('services');

  // Selected Service and Industry IDs
  const [selectedServiceId, setSelectedServiceId] = useState<string>(CORE_SERVICES[0]?.id || 'enterprise-software');
  const [selectedIndustryId, setSelectedIndustryId] = useState<string>(INDUSTRIES[0]?.id || 'agritech');

  // Accordion state for Industry Overview sections (challenges, solutions, relevant services)
  const [expandedOverview, setExpandedOverview] = useState<{
    challenges: boolean;
    solutions: boolean;
    services: boolean;
  }>({
    challenges: true,
    solutions: false,
    services: false,
  });

  const cardRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const [menuHeight, setMenuHeight] = useState<number | null>(null);
  const shouldReduceMotion = useReducedMotion();

  // Keep right card's top and bottom alignment strictly equal to the left discipline/industry menu on desktop
  useEffect(() => {
    const updateHeight = () => {
      if (typeof window !== 'undefined' && window.innerWidth >= 1024 && leftColRef.current) {
        setMenuHeight(leftColRef.current.offsetHeight);
      } else {
        setMenuHeight(null);
      }
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined' && leftColRef.current) {
      resizeObserver = new ResizeObserver(() => {
        updateHeight();
      });
      resizeObserver.observe(leftColRef.current);
    }

    return () => {
      window.removeEventListener('resize', updateHeight);
      resizeObserver?.disconnect();
    };
  }, [activeTab]);

  // Handle service selection and ensure the top of the card is in view
  const handleSelectService = useCallback((serviceId: string) => {
    setSelectedServiceId(serviceId);

    if (typeof window !== 'undefined' && cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const targetTop = 88;
      if (rect.top < targetTop - 15 || rect.top > targetTop + 80) {
        const targetScrollY = window.scrollY + rect.top - targetTop;
        window.scrollTo({
          top: Math.max(0, targetScrollY),
          behavior: 'smooth',
        });
      }
    }
  }, []);

  // Handle industry selection and ensure the top of the card is in view
  const handleSelectIndustry = useCallback((industryId: string) => {
    setSelectedIndustryId(industryId);

    if (typeof window !== 'undefined' && cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const targetTop = 88;
      if (rect.top < targetTop - 15 || rect.top > targetTop + 80) {
        const targetScrollY = window.scrollY + rect.top - targetTop;
        window.scrollTo({
          top: Math.max(0, targetScrollY),
          behavior: 'smooth',
        });
      }
    }
  }, []);

  // Handle tab switch
  const handleTabSwitch = (tab: 'services' | 'industries') => {
    setActiveTab(tab);
    setTimeout(() => {
      if (typeof window !== 'undefined' && window.innerWidth >= 1024 && leftColRef.current) {
        setMenuHeight(leftColRef.current.offsetHeight);
      }
    }, 40);
  };

  // Toggle overview accordions
  const toggleOverview = (key: 'challenges' | 'solutions' | 'services') => {
    setExpandedOverview((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Active service object
  const activeService =
    CORE_SERVICES.find((s) => s.id === selectedServiceId) ||
    CORE_SERVICES[0];

  // Active industry object
  const activeIndustry =
    INDUSTRIES.find((ind) => ind.id === selectedIndustryId) ||
    INDUSTRIES[0];

  const getServiceIcon = (id: string) => {
    switch (id) {
      case 'custom-software':
        return Code2;
      case 'web-dev':
        return Globe;
      case 'enterprise-software':
        return Server;
      case 'mobile-apps':
        return Smartphone;
      case 'ai-ml':
        return Cpu;
      case 'cloud-devops':
        return Cloud;
      case 'ui-ux-engineering':
        return Palette;
      default:
        return Layers;
    }
  };

  const getIndustryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sprout':
        return Sprout;
      case 'Activity':
        return Activity;
      case 'GraduationCap':
        return GraduationCap;
      case 'Factory':
        return Factory;
      case 'Truck':
        return Truck;
      case 'Briefcase':
      default:
        return Briefcase;
    }
  };

  // Human-friendly short sector names matching reference mockup
  const getIndustryDisplayName = (industry: Industry) => {
    switch (industry.id) {
      case 'agritech':
        return 'Agriculture & AgriTech';
      case 'healthcare':
        return 'Healthcare';
      case 'fintech':
        return 'Finance & FinTech';
      case 'edtech':
        return 'Education & EdTech';
      case 'enterprise-retail':
        return 'Retail & E-Commerce';
      case 'manufacturing':
        return 'Manufacturing';
      case 'logistics':
        return 'Logistics & Supply Chain';
      default:
        return industry.name;
    }
  };

  const ActiveServiceIcon = getServiceIcon(activeService.id);
  const ActiveIndustryIcon = getIndustryIcon(activeIndustry.icon);

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Interactive Tab Switcher (Our Services vs Industries We Serve) */}
      <div className="flex items-center justify-center">
        <div className="inline-flex p-1.5 rounded-2xl bg-[#121212] border border-[#262626] gap-2 w-full max-w-2xl shadow-2xl backdrop-blur-md">
          <button
            type="button"
            onClick={() => handleTabSwitch('services')}
            className={`flex-1 py-3.5 px-6 sm:px-8 rounded-xl text-xs sm:text-sm md:text-base font-bold transition-all duration-200 cursor-pointer text-center select-none ${
              activeTab === 'services'
                ? 'bg-[#c9a84c] text-black shadow-lg shadow-[#c9a84c]/30 font-black border border-[#dfc067]'
                : 'text-[#999999] hover:text-white hover:bg-[#1c1c1c] font-semibold'
            }`}
          >
            Our Services
          </button>
          <button
            type="button"
            onClick={() => handleTabSwitch('industries')}
            className={`flex-1 py-3.5 px-6 sm:px-8 rounded-xl text-xs sm:text-sm md:text-base font-bold transition-all duration-200 cursor-pointer text-center select-none ${
              activeTab === 'industries'
                ? 'bg-[#c9a84c] text-black shadow-lg shadow-[#c9a84c]/30 font-black border border-[#dfc067]'
                : 'text-[#999999] hover:text-white hover:bg-[#1c1c1c] font-semibold'
            }`}
          >
            Industries We Serve
          </button>
        </div>
      </div>

      {/* 3. Interactive Selection Showcase (Single Active View with Aligned Boundaries) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start lg:items-stretch">
        {/* ========================================================== */}
        {/* LEFT COLUMN: Menu List (Services or Sectors)               */}
        {/* ========================================================== */}
        <div ref={leftColRef} className="lg:col-span-5 flex flex-col justify-start">
          {/* Label Header */}
          <div className="text-xs sm:text-sm font-mono uppercase tracking-widest text-[#c9a84c] font-bold px-1 mb-3 shrink-0">
            <span>{activeTab === 'services' ? 'Engineering Disciplines' : 'Sector Coverage'}</span>
          </div>

          {/* List of Selectable Buttons */}
          <div className="flex lg:flex-col gap-2.5 sm:gap-3 overflow-x-auto lg:overflow-y-auto lg:overflow-x-hidden pb-2 lg:pb-0 custom-scrollbar pr-0 lg:pr-1 flex-1">
            {activeTab === 'services' ? (
              // Services List
              CORE_SERVICES.map((service) => {
                const Icon = getServiceIcon(service.id);
                const isSelected = service.id === activeService.id;

                return (
                  <button
                    key={service.id}
                    onClick={() => handleSelectService(service.id)}
                    className={`w-full p-3.5 sm:py-4 sm:px-5 rounded-2xl text-left border transition-all duration-200 cursor-pointer relative overflow-hidden group flex items-center justify-between shrink-0 lg:shrink ${
                      isSelected
                        ? 'bg-[#18160f] border-[#c9a84c] shadow-xl shadow-black/95 ring-1 ring-[#c9a84c]/50'
                        : 'bg-[#111111]/90 border-[#222222] hover:bg-[#151515] hover:border-[#333333]'
                    }`}
                  >
                    {isSelected && (
                      <div className="absolute left-0 top-0 bottom-0 w-2 bg-[#c9a84c] shadow-[0_0_12px_#c9a84c]" />
                    )}

                    <div className="flex items-center gap-3.5 min-w-0">
                      <div
                        className={`w-9 h-9 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center shrink-0 transition-all ${
                          isSelected
                            ? 'bg-[#c9a84c] text-black font-bold shadow-md shadow-[#c9a84c]/30'
                            : 'bg-[#1a1a1a] text-[#c9a84c] group-hover:bg-[#222222]'
                        }`}
                      >
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>

                      <div className="min-w-0">
                        <div className="text-[11px] font-mono text-[#888888] truncate">
                          {service.category.split(' ')[0]}
                        </div>
                        <div
                          className={`text-sm sm:text-base font-bold truncate mt-0.5 tracking-tight transition-colors ${
                            isSelected ? 'text-white' : 'text-[#cccccc] group-hover:text-white'
                          }`}
                        >
                          {service.title}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {isSelected && (
                        <span className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-[#c9a84c]/20 text-[#DFC067] border border-[#c9a84c]/40 hidden sm:inline-block">
                          Active
                        </span>
                      )}
                      <ChevronRight
                        className={`w-5 h-5 shrink-0 transition-transform hidden sm:block ${
                          isSelected
                            ? 'text-[#c9a84c] translate-x-0 opacity-100'
                            : 'text-[#444444] -translate-x-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0'
                        }`}
                      />
                    </div>
                  </button>
                );
              })
            ) : (
              // Industries List (matching Image 1 with enlarged typography & card size)
              INDUSTRIES.map((industry) => {
                const isSelected = industry.id === activeIndustry.id;
                const displayName = getIndustryDisplayName(industry);

                return (
                  <button
                    key={industry.id}
                    onClick={() => handleSelectIndustry(industry.id)}
                    className={`w-full p-3.5 sm:py-4.5 sm:px-5 rounded-2xl text-left border transition-all duration-200 cursor-pointer relative overflow-hidden group flex items-center justify-between shrink-0 lg:shrink ${
                      isSelected
                        ? 'bg-[#18160f] border-[#c9a84c] shadow-xl shadow-black/95 ring-1 ring-[#c9a84c]/50'
                        : 'bg-[#111111]/90 border-[#222222] hover:bg-[#151515] hover:border-[#333333]'
                    }`}
                  >
                    {isSelected && (
                      <div className="absolute left-0 top-0 bottom-0 w-2 bg-[#c9a84c] shadow-[0_0_12px_#c9a84c]" />
                    )}

                    <div className="flex items-center gap-3.5 min-w-0">
                      <div
                        className={`text-sm sm:text-base md:text-[17px] font-bold tracking-tight truncate transition-colors ${
                          isSelected ? 'text-[#DFC067]' : 'text-[#d1d1d6] group-hover:text-white'
                        }`}
                      >
                        {displayName}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {isSelected && (
                        <span className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-[#c9a84c]/20 text-[#DFC067] border border-[#c9a84c]/40 hidden sm:inline-block">
                          Active
                        </span>
                      )}
                      <ChevronRight
                        className={`w-5 h-5 shrink-0 transition-transform hidden sm:block ${
                          isSelected
                            ? 'text-[#c9a84c] translate-x-0 opacity-100'
                            : 'text-[#444444] -translate-x-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0'
                        }`}
                      />
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* ========================================================== */}
        {/* RIGHT COLUMN: Detail Card (Services or Industries)         */}
        {/* ========================================================== */}
        <div 
          ref={cardRef} 
          className="lg:col-span-7 flex flex-col scroll-mt-24"
          style={{ height: menuHeight ? `${menuHeight}px` : undefined }}
        >
          <AnimatePresence mode="wait">
            {activeTab === 'services' ? (
              // --------------------------------------------------------
              // ACTIVE SERVICE DETAIL VIEW (Image 2)
              // --------------------------------------------------------
              <motion.div
                key={`service-${activeService.id}`}
                initial={shouldReduceMotion ? undefined : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={shouldReduceMotion ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-3xl bg-[#111111] border border-[#242424] p-5 sm:p-7 relative overflow-hidden shadow-2xl flex flex-col h-full min-h-0"
              >
                {/* Subtle Ambient Radial Glow */}
                <div className="absolute top-0 right-0 w-80 h-80 bg-[#c9a84c]/5 rounded-full blur-3xl pointer-events-none" />

                {/* 1. Card Header (Fixed at top) */}
                <div className="pb-4 border-b border-[#1f1f1f] relative z-10 shrink-0">
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#181818] border border-[#2a2a2a] text-xs font-mono font-bold text-[#c9a84c]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#c9a84c]" />
                      <span className="text-[#a1a1aa]">{activeService.category}</span>
                    </div>

                    {/* Benchmark pill */}
                    <div className="flex items-center gap-1.5 text-xs font-mono text-[#c9a84c] bg-[#1a1a1a] px-3 py-1 rounded-full border border-[#2a2a2a]">
                      <Zap className="w-3.5 h-3.5" />
                      <span>{activeService.latency}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-[#c9a84c]/10 border border-[#c9a84c]/30 flex items-center justify-center shrink-0 text-[#c9a84c]">
                      <ActiveServiceIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                        {activeService.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#a1a1aa] mt-1 leading-relaxed">
                        {activeService.description}
                      </p>
                    </div>
                  </div>

                  {/* Target Fit Note */}
                  <div className="mt-3.5 p-3 rounded-xl bg-[#151515] border border-[#242424]">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#c9a84c] block mb-0.5">
                      Ideal Fit & Business Use-Case
                    </span>
                    <p className="text-xs text-[#cccccc] leading-relaxed">
                      {activeService.target}
                    </p>
                  </div>
                </div>

                {/* 2. Middle Scrollable Content (Capabilities & Deliverables) */}
                <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar py-4 border-b border-[#1f1f1f] relative z-10 pr-2 sm:pr-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#c9a84c] block mb-2.5 sticky top-0 bg-[#111111]/95 backdrop-blur-sm py-1 z-10">
                        Architectural Capabilities
                      </span>
                      <ul className="space-y-2">
                        {activeService.capabilities.map((cap, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-[#cccccc]">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#c9a84c] shrink-0 mt-0.5" />
                            <span className="leading-snug">{cap}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#c9a84c] block mb-2.5 sticky top-0 bg-[#111111]/95 backdrop-blur-sm py-1 z-10">
                        Core Business Value & Deliverables
                      </span>
                      <ul className="space-y-2">
                        {activeService.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-[#cccccc]">
                            <ShieldCheck className="w-3.5 h-3.5 text-[#c9a84c] shrink-0 mt-0.5" />
                            <span className="leading-snug">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* 3. Action Footer (Fixed at bottom) */}
                <div className="pt-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 relative z-10 shrink-0 mt-auto">
                  <div className="text-xs text-[#777777] font-mono flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
                    <span>Immediate Squad Availability · Full Git Repository Ownership</span>
                  </div>

                  <AnimatedButton
                    onClick={() => onOpenConsultation(activeService)}
                    variant="primary"
                    size="md"
                    icon={<ArrowRight className="w-4 h-4" />}
                    className="w-full sm:w-auto shrink-0"
                  >
                    Inquire for {activeService.title.split(' ')[0]}
                  </AnimatedButton>
                </div>
              </motion.div>
            ) : (
              // --------------------------------------------------------
              // ACTIVE INDUSTRY DETAIL VIEW (Image 1 Reference)
              // --------------------------------------------------------
              <motion.div
                key={`industry-${activeIndustry.id}`}
                initial={shouldReduceMotion ? undefined : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={shouldReduceMotion ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-3xl bg-[#111111] border border-[#242424] p-5 sm:p-7 relative overflow-hidden shadow-2xl flex flex-col h-full min-h-0"
              >
                {/* Subtle Ambient Radial Glow */}
                <div className="absolute top-0 right-0 w-80 h-80 bg-[#c9a84c]/5 rounded-full blur-3xl pointer-events-none" />

                {/* 1. Industry Card Header (matching Image 1) */}
                <div className="pb-4 border-b border-[#1f1f1f] relative z-10 shrink-0">
                  <div className="flex items-start gap-3.5">
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-[#c9a84c]/10 border border-[#c9a84c]/30 flex items-center justify-center shrink-0 text-[#c9a84c]">
                      <ActiveIndustryIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                        {activeIndustry.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#a1a1aa] mt-1 leading-relaxed">
                        Discover industry-specific challenges, digital solutions, and the business workflows we help improve.
                      </p>
                    </div>
                  </div>

                  {/* Domain Tagline & Summary Note */}
                  <div className="mt-3.5 p-3 rounded-xl bg-[#151515] border border-[#242424]">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#c9a84c]" />
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#c9a84c]">
                        Sector Domain Focus: {activeIndustry.tagline}
                      </span>
                    </div>
                    <p className="text-xs text-[#cccccc] leading-relaxed">
                      {activeIndustry.description}
                    </p>
                  </div>
                </div>

                {/* 2. Middle Scrollable Content (INDUSTRY OVERVIEW Accordion - Image 1) */}
                <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar py-4 border-b border-[#1f1f1f] relative z-10 pr-2 sm:pr-3 space-y-3">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#c9a84c] block">
                    Industry Overview
                  </span>

                  {/* Accordion Item 1: Industry Challenges */}
                  <div className="rounded-xl border border-[#242424] bg-[#151515]/80 overflow-hidden transition-all">
                    <button
                      type="button"
                      onClick={() => toggleOverview('challenges')}
                      className="w-full p-3.5 flex items-center justify-between text-left hover:bg-[#1c1c1c] transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <AlertCircle className="w-4 h-4 text-[#c9a84c] shrink-0" />
                        <span className="text-xs sm:text-sm font-bold text-white">
                          Industry Challenges
                        </span>
                        <span className="text-[10px] font-mono text-[#888888] px-1.5 py-0.5 rounded bg-[#202020] border border-[#2d2d2d] hidden sm:inline-block">
                          {activeIndustry.challenges.length} Critical Vectors
                        </span>
                      </div>
                      {expandedOverview.challenges ? (
                        <ChevronUp className="w-4 h-4 text-[#c9a84c] shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-[#777777] shrink-0" />
                      )}
                    </button>

                    {expandedOverview.challenges && (
                      <div className="px-3.5 pb-3.5 pt-1 border-t border-[#222222]">
                        <ul className="space-y-2 mt-2">
                          {activeIndustry.challenges.map((challenge, idx) => (
                            <li key={idx} className="flex items-start gap-2.5 text-xs text-[#cccccc] leading-relaxed">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#c9a84c] mt-1.5 shrink-0" />
                              <span>{challenge}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Accordion Item 2: Engineered Solutions */}
                  <div className="rounded-xl border border-[#242424] bg-[#151515]/80 overflow-hidden transition-all">
                    <button
                      type="button"
                      onClick={() => toggleOverview('solutions')}
                      className="w-full p-3.5 flex items-center justify-between text-left hover:bg-[#1c1c1c] transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <CheckCircle2 className="w-4 h-4 text-[#c9a84c] shrink-0" />
                        <span className="text-xs sm:text-sm font-bold text-white">
                          Engineered Solutions
                        </span>
                        <span className="text-[10px] font-mono text-[#888888] px-1.5 py-0.5 rounded bg-[#202020] border border-[#2d2d2d] hidden sm:inline-block">
                          {activeIndustry.vpdSolutions.length} Custom Modules
                        </span>
                      </div>
                      {expandedOverview.solutions ? (
                        <ChevronUp className="w-4 h-4 text-[#c9a84c] shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-[#777777] shrink-0" />
                      )}
                    </button>

                    {expandedOverview.solutions && (
                      <div className="px-3.5 pb-3.5 pt-1 border-t border-[#222222]">
                        <ul className="space-y-2 mt-2">
                          {activeIndustry.vpdSolutions.map((solution, idx) => (
                            <li key={idx} className="flex items-start gap-2.5 text-xs text-[#cccccc] leading-relaxed">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#c9a84c] mt-0.5 shrink-0" />
                              <span>{solution}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Accordion Item 3: Relevant Services & Architecture */}
                  <div className="rounded-xl border border-[#242424] bg-[#151515]/80 overflow-hidden transition-all">
                    <button
                      type="button"
                      onClick={() => toggleOverview('services')}
                      className="w-full p-3.5 flex items-center justify-between text-left hover:bg-[#1c1c1c] transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <Layers className="w-4 h-4 text-[#c9a84c] shrink-0" />
                        <span className="text-xs sm:text-sm font-bold text-white">
                          Relevant Services
                        </span>
                        <span className="text-[10px] font-mono text-[#888888] px-1.5 py-0.5 rounded bg-[#202020] border border-[#2d2d2d] hidden sm:inline-block">
                          Core Stacks
                        </span>
                      </div>
                      {expandedOverview.services ? (
                        <ChevronUp className="w-4 h-4 text-[#c9a84c] shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-[#777777] shrink-0" />
                      )}
                    </button>

                    {expandedOverview.services && (
                      <div className="px-3.5 pb-3.5 pt-1 border-t border-[#222222]">
                        <div className="flex flex-wrap gap-2 mt-2">
                          {activeIndustry.keyTech.map((tech, idx) => (
                            <span
                              key={idx}
                              className="px-2.5 py-1 rounded-lg bg-[#202020] border border-[#333333] text-xs font-mono font-medium text-[#c9a84c]"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* 3. Action Footer (matching Image 1's gold button) */}
                <div className="pt-3.5 relative z-10 shrink-0 mt-auto">
                  <button
                    type="button"
                    onClick={() => onOpenConsultation(activeService)}
                    className="w-full py-3 sm:py-3.5 px-6 rounded-xl bg-[#c9a84c] hover:bg-[#d8b75b] text-black font-bold text-xs sm:text-sm tracking-wide text-center transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#c9a84c]/20 hover:shadow-[#c9a84c]/40 active:scale-[0.99]"
                  >
                    <span>Discuss Your Requirements</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ServiceShowcase;
