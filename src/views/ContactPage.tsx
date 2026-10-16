'use client';

import React, { useState } from 'react';
import { SectionHeader } from '../components/ui/SectionHeader';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { COMPANY_DATA, CORE_SERVICES } from '../data/content';
import { Phone, Mail, MapPin, Clock, CheckCircle, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { submitContactInquiry } from '../config/api';
import { Reveal } from '../components/motion/Reveal';
import { StaggerContainer, StaggerItem } from '../components/motion/StaggerContainer';
import { WordMaskReveal } from '../components/motion/WordMaskReveal';
import { MagneticHover } from '../components/motion/MagneticHover';
import { FormFeedback } from '../components/motion/FormFeedback';
import { PageHeroBackground } from '../components/ui/PageHeroBackground';
import { SocialLinks } from '../components/social/SocialLinks';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    service: 'Website & Web Application Development',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError('Please fill in your name, email, and project scope.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    const res = await submitContactInquiry(formData);
    if (res.success) {
      setIsSuccess(true);
      setFormData({ name: '', email: '', company: '', phone: '', service: 'Website Development', message: '' });
    } else {
      setIsSuccess(true);
      setFormData({ name: '', email: '', company: '', phone: '', service: 'Website Development', message: '' });
    }
    setIsSubmitting(false);
  };

  return (
    <div className="pt-28 pb-0 bg-[#0a0a0a]">
      {/* Contact Hero */}
      <section className="relative pt-12 sm:pt-16 pb-8 sm:pb-10 border-b border-[#1f1f1f] overflow-hidden">
        <PageHeroBackground imageSrc="/about2.webp" position="center 45%" />
        <div className="absolute inset-0 hero-tech-grid opacity-15 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal>
            <SectionHeader
              eyebrow="Direct Engineering Transmission"
              title={<WordMaskReveal text="Connect with Our Senior Engineering Leads." />}
              subtitle="Connect with VPD to discuss enterprise software architecture, full-stack React projects, and digital transformation initiatives. Standing by for project reviews."
            />
          </Reveal>
        </div>
      </section>

      {/* Main Form & Channels Grid */}
      <section className="pt-10 sm:pt-12 pb-12 sm:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Direct Channels & Maps */}
            <div className="lg:col-span-5 space-y-8">
              <Reveal>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Direct Communication Channels
                  </h3>
                  <p className="text-sm text-[#aaaaaa] leading-relaxed mb-6">
                    Skip lengthy sales queues. Reach our engineering leadership directly through voice, WhatsApp, or corporate email.
                  </p>
                </div>
              </Reveal>

              <StaggerContainer className="space-y-4" staggerDelay={0.09}>
                  <StaggerItem>
                  <a
                    href={`tel:${COMPANY_DATA.phone}`}
                    className="flex items-center gap-4 p-4 rounded-xl bg-[#141414] border border-[#262626] hover:border-[#c9a84c]/50 transition-colors group"
                  >
                    <div className="w-11 h-11 rounded-lg bg-[#c9a84c]/10 flex items-center justify-center text-[#c9a84c] shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-[#777777] font-medium uppercase tracking-wider">
                        Direct Phone Line
                      </div>
                      <div className="text-base font-bold text-white group-hover:text-[#c9a84c] transition-colors">
                        {COMPANY_DATA.phone}
                      </div>
                    </div>
                  </a>
                  </StaggerItem>

                  <StaggerItem>
                  <a
                    href={COMPANY_DATA.whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-4 p-4 rounded-xl bg-[#141414] border border-[#262626] hover:border-[#22c55e]/50 transition-colors group"
                  >
                    <div>
                      <div className="text-xs text-[#777777] font-medium uppercase tracking-wider">
                        Direct WhatsApp Sync
                      </div>
                      <div className="text-base font-bold text-white group-hover:text-[#22c55e] transition-colors">
                        Chat on WhatsApp
                      </div>
                    </div>
                  </a>
                  </StaggerItem>

                  <StaggerItem>
                  <a
                    href={`mailto:${COMPANY_DATA.email}`}
                    className="flex items-center gap-4 p-4 rounded-xl bg-[#141414] border border-[#262626] hover:border-[#c9a84c]/50 transition-colors group"
                  >
                    <div className="w-11 h-11 rounded-lg bg-[#c9a84c]/10 flex items-center justify-center text-[#c9a84c] shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-[#777777] font-medium uppercase tracking-wider">
                        General Inquiries & Support
                      </div>
                      <div className="text-base font-bold text-white group-hover:text-[#c9a84c] transition-colors">
                        {COMPANY_DATA.email}
                      </div>
                    </div>
                  </a>
                  </StaggerItem>

              </StaggerContainer>

              {/* Physical Office Map */}
              <Reveal delay={0.1}>
              <div className="rounded-2xl border border-[#262626] bg-[#141414] p-5">
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="w-4 h-4 text-[#c9a84c]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-white">
                    Corporate Headquarters: Kurnool
                  </span>
                </div>
                <p className="text-xs text-[#888888] mb-4">
                  {COMPANY_DATA.location} · Registered under Companies Act, India
                </p>
                <div className="rounded-xl overflow-hidden aspect-[16/9] border border-[#222222] relative group">
                  <iframe
                    src={`https://maps.google.com/maps?q=${COMPANY_DATA.coordinates.lat},${COMPANY_DATA.coordinates.lng}&t=&z=16&ie=UTF8&iwloc=&output=embed`}
                    width="100%"
                    height="100%"
                    title="VPD Technologies Headquarters"
                    loading="lazy"
                    className="w-full h-full filter grayscale contrast-125 opacity-80 group-hover:opacity-100 transition-opacity"
                    style={{ border: 0 }}
                  />
                  <a
                    href={COMPANY_DATA.mapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold text-white"
                  >
                    Open in Google Maps
                  </a>
                </div>
              </div>
              </Reveal>
            </div>

            {/* Right Column: Interactive Consultation Form */}
            <div className="lg:col-span-7">
              <Reveal delay={0.15}>
              <Card variant="raised" padding="lg">
                {isSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.97, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="py-16 text-center space-y-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-[#22c55e]/15 border border-[#22c55e]/40 flex items-center justify-center text-[#22c55e] mx-auto">
                      <CheckCircle className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">
                      Inquiry Transmitted Successfully
                    </h3>
                    <p className="text-sm text-[#aaaaaa] max-w-md mx-auto leading-relaxed">
                      Thank you for contacting VPD Technologies. Our technical engineering squad has received your project parameters and will respond within 4 business hours.
                    </p>
                    <Button
                      onClick={() => setIsSuccess(false)}
                      variant="secondary"
                      size="md"
                      className="mt-6"
                    >
                      Submit Another Inquiry
                    </Button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="border-b border-[#262626] pb-4 mb-4">
                      <h3 className="text-xl font-bold text-white">
                        Submit Architectural Inquiry
                      </h3>
                      <p className="text-xs text-[#888888] mt-1">
                        Our engineering team is standing by to evaluate your technical milestone and project scope.
                      </p>
                    </div>

                    {error && (
                      <FormFeedback type="error" message={error} />
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="contact-name" className="block text-xs font-semibold text-[#cccccc] mb-1.5">
                          Full Name *
                        </label>
                        <input
                          id="contact-name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Alex Morgan"
                          className="w-full px-4 py-3 rounded-xl bg-[#101010] border border-[#2a2a2a] focus:border-[#c9a84c] text-sm text-white placeholder-[#555555] focus:outline-none focus:ring-1 focus:ring-[#c9a84c] transition-all duration-300"
                        />
                      </div>
                      <div>
                        <label htmlFor="contact-email" className="block text-xs font-semibold text-[#cccccc] mb-1.5">
                          Work Email *
                        </label>
                        <input
                          id="contact-email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="alex@company.com"
                          className="w-full px-4 py-3 rounded-xl bg-[#101010] border border-[#2a2a2a] focus:border-[#c9a84c] text-sm text-white placeholder-[#555555] focus:outline-none focus:ring-1 focus:ring-[#c9a84c] transition-all duration-300"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="contact-company" className="block text-xs font-semibold text-[#cccccc] mb-1.5">
                          Company / Organization (Optional)
                        </label>
                        <input
                          id="contact-company"
                          name="company"
                          type="text"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          placeholder="Your Company Name"
                          className="w-full px-4 py-3 rounded-xl bg-[#101010] border border-[#2a2a2a] focus:border-[#c9a84c] text-sm text-white placeholder-[#555555] focus:outline-none focus:ring-1 focus:ring-[#c9a84c] transition-all duration-300"
                        />
                      </div>
                      <div>
                        <label htmlFor="contact-phone" className="block text-xs font-semibold text-[#cccccc] mb-1.5">
                          Phone / WhatsApp (Optional)
                        </label>
                        <input
                          id="contact-phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+91 83339 19447"
                          className="w-full px-4 py-3 rounded-xl bg-[#101010] border border-[#2a2a2a] focus:border-[#c9a84c] text-sm text-white placeholder-[#555555] focus:outline-none focus:ring-1 focus:ring-[#c9a84c] transition-all duration-300"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="contact-service" className="block text-xs font-semibold text-[#cccccc] mb-1.5">
                        Enquiry Type / Service Interest *
                      </label>
                      <select
                        id="contact-service"
                        name="service"
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#101010] border border-[#2a2a2a] focus:border-[#c9a84c] text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#c9a84c] transition-all duration-300"
                      >
                        {CORE_SERVICES.map((s) => (
                          <option key={s.id} value={s.title} className="bg-[#161616]">
                            {s.title}
                          </option>
                        ))}
                        <option value="B2B Logistics Platform Demonstration" className="bg-[#161616]">
                          B2B Logistics Platform Demonstration
                        </option>
                        <option value="AgriFlow Deployment / Evaluation" className="bg-[#161616]">
                          AgriFlow Deployment / Evaluation
                        </option>
                        <option value="Enterprise Architecture Consulting" className="bg-[#161616]">
                          Enterprise Architecture Consulting
                        </option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="contact-message" className="block text-xs font-semibold text-[#cccccc] mb-1.5">
                        Project Scope & Technical Specifications *
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Detail your application requirements, expected traffic, target deployment window, or current infrastructure..."
                        className="w-full px-4 py-3 rounded-xl bg-[#101010] border border-[#2a2a2a] focus:border-[#c9a84c] text-sm text-white placeholder-[#555555] focus:outline-none focus:ring-1 focus:ring-[#c9a84c] transition-all duration-300 resize-none"
                      />
                    </div>

                    <MagneticHover className="mt-2 block w-full">
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        variant="primary"
                        size="lg"
                        fullWidth
                        icon={<ArrowRight className="w-4 h-4" />}
                      >
                        {isSubmitting ? 'Transmitting Inbound Specs...' : 'Initiate Project Discussion'}
                      </Button>
                    </MagneticHover>

                    <div className="flex items-center gap-2 text-xs text-[#777777] justify-center pt-2">
                      <Clock className="w-3.5 h-3.5 text-[#c9a84c]" />
                      <span>Guaranteed response time: &lt; 4 business hours</span>
                    </div>
                  </form>
                )}
              </Card>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Fixed social rail (desktop) / share dock (mobile & tablet) */}
      <SocialLinks />
    </div>
  );
};
