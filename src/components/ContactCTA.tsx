'use client';

import React, { useState } from 'react';
import { ArrowRight, Phone, MessageSquare, Mail, CheckCircle2, Clock } from 'lucide-react';
import { COMPANY_DATA, CORE_SERVICES } from '../data/content';
import { AnimatedButton } from './motion/AnimatedButton';
import { MagneticHover } from './motion/MagneticHover';
import { Reveal } from './motion/Reveal';
import { FormFeedback } from './motion/FormFeedback';
import { submitContactInquiry } from '../config/api';

interface ContactCTAProps {
  onOpenConsultation: () => void;
}

export const ContactCTA: React.FC<ContactCTAProps> = ({ onOpenConsultation }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Website Development',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'error' | 'success' | null; message: string }>({
    type: null,
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setFeedback({
        type: 'error',
        message: 'Please complete all required fields (Name, Business Email, and Project Overview).',
      });
      return;
    }

    setIsSubmitting(true);
    setFeedback({ type: null, message: '' });

    try {
      const res = await submitContactInquiry(formData);
      if (res.success) {
        setIsSuccess(true);
        setFeedback({
          type: 'success',
          message: 'Inquiry transmitted to VPD Technologies engineering team.',
        });
        setFormData({ name: '', email: '', phone: '', service: 'Website Development', message: '' });
      } else {
        setFeedback({
          type: 'error',
          message: res.message || 'Unable to connect to transmission gateway. Please reach us directly via phone or WhatsApp.',
        });
      }
    } catch {
      setFeedback({
        type: 'error',
        message: 'Network connection interrupted. Please call or email our technical office directly.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-[#080808]/25 backdrop-blur-[1px] border-t border-[#1f1f1f]/50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="rounded-2xl bg-gradient-to-b from-[#141414] to-[#0f0f0f] border border-[#262626] p-8 sm:p-12 lg:p-16 relative overflow-hidden">
            {/* Subtle gold radial aura */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#c9a84c]/8 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative z-10">
              {/* Left Column: Heading, Channels, and Direct Numbers */}
              <div className="lg:col-span-5 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-bold tracking-widest text-[#c9a84c] uppercase mb-3">
                    Direct Inquiries & Architecture Review
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-4 text-balance">
                    Ready to Architect Your Next Technical Milestone?
                  </h2>
                  <p className="text-sm sm:text-base text-[#aaaaaa] leading-relaxed mb-8">
                    Connect with our senior engineering team to evaluate feasibility, system specifications, and delivery timelines. Zero sales fluff, pure architectural clarity.
                  </p>

                  {/* Direct Contact Channels List */}
                  <div className="space-y-4 mb-8">
                    <a
                      href={`tel:${COMPANY_DATA.phone}`}
                      className="flex items-center gap-3.5 p-3.5 rounded-xl bg-[#181818] border border-[#2a2a2a] hover:border-[#c9a84c]/50 transition-colors group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c]"
                    >
                      <div className="w-10 h-10 rounded-lg bg-[#c9a84c]/10 flex items-center justify-center text-[#c9a84c] shrink-0">
                        <Phone className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs text-[#777777] font-medium uppercase tracking-wider">
                          Direct Voice Line
                        </div>
                        <div className="text-sm font-bold text-white group-hover:text-[#c9a84c] transition-colors">
                          {COMPANY_DATA.phone}
                        </div>
                      </div>
                    </a>

                    <a
                      href={COMPANY_DATA.whatsappUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-3.5 p-3.5 rounded-xl bg-[#181818] border border-[#2a2a2a] hover:border-[#22c55e]/50 transition-colors group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#22c55e]"
                    >
                      <div className="w-10 h-10 rounded-lg bg-[#22c55e]/10 flex items-center justify-center text-[#22c55e] shrink-0">
                        <MessageSquare className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs text-[#777777] font-medium uppercase tracking-wider">
                          Instant WhatsApp Chat
                        </div>
                        <div className="text-sm font-bold text-white group-hover:text-[#22c55e] transition-colors">
                          Start Technical Chat
                        </div>
                      </div>
                    </a>

                    <a
                      href={`mailto:${COMPANY_DATA.email}`}
                      className="flex items-center gap-3.5 p-3.5 rounded-xl bg-[#181818] border border-[#2a2a2a] hover:border-[#c9a84c]/50 transition-colors group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c]"
                    >
                      <div className="w-10 h-10 rounded-lg bg-[#c9a84c]/10 flex items-center justify-center text-[#c9a84c] shrink-0">
                        <Mail className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs text-[#777777] font-medium uppercase tracking-wider">
                          Corporate Email
                        </div>
                        <div className="text-sm font-bold text-white group-hover:text-[#c9a84c] transition-colors">
                          {COMPANY_DATA.email}
                        </div>
                      </div>
                    </a>
                  </div>
                </div>

                {/* Response Time Guarantee */}
                <div className="flex items-center gap-2 text-xs text-[#777777] pt-4 border-t border-[#222222]">
                  <Clock className="w-4 h-4 text-[#c9a84c]" />
                  <span>Average engineer response time: &lt; 4 business hours</span>
                </div>
              </div>

              {/* Right Column: Inquiry Form */}
              <div className="lg:col-span-7 bg-[#161616] border border-[#2a2a2a] rounded-2xl p-6 sm:p-8">
                {isSuccess ? (
                  <div className="py-12 flex flex-col items-center text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-[#22c55e]/10 border border-[#22c55e]/30 flex items-center justify-center text-[#22c55e]">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">
                      Inquiry Received
                    </h3>
                    <p className="text-sm text-[#aaaaaa] max-w-md">
                      Thank you for reaching out to VPD Technologies. Our engineering leads have received your specifications and will follow up promptly via email or phone.
                    </p>
                    <AnimatedButton
                      onClick={() => setIsSuccess(false)}
                      variant="secondary"
                      size="md"
                      className="mt-4"
                    >
                      Submit Another Inquiry
                    </AnimatedButton>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="border-b border-[#262626] pb-4 mb-4">
                      <h3 className="text-lg font-bold text-white">
                        Request Project Consultation
                      </h3>
                      <p className="text-xs text-[#777777]">
                        Fill out your requirements below for an upfront architectural assessment.
                      </p>
                    </div>

                    <FormFeedback
                      type={feedback.type}
                      message={feedback.message}
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="contact-name" className="block text-xs font-semibold text-[#aaaaaa] mb-1.5">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="contact-name"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Alex Morgan"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#101010] border border-[#666666] focus:border-[#c9a84c] text-sm text-white placeholder-[#777777] focus:outline-none focus:ring-1 focus:ring-[#c9a84c] transition-all duration-300"
                        />
                      </div>
                      <div>
                        <label htmlFor="contact-email" className="block text-xs font-semibold text-[#aaaaaa] mb-1.5">
                          Business Email *
                        </label>
                        <input
                          type="email"
                          id="contact-email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="alex@company.com"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#101010] border border-[#666666] focus:border-[#c9a84c] text-sm text-white placeholder-[#777777] focus:outline-none focus:ring-1 focus:ring-[#c9a84c] transition-all duration-300"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="contact-phone" className="block text-xs font-semibold text-[#aaaaaa] mb-1.5">
                          Phone / WhatsApp (Optional)
                        </label>
                        <input
                          type="tel"
                          id="contact-phone"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+91 or country code"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#101010] border border-[#666666] focus:border-[#c9a84c] text-sm text-white placeholder-[#777777] focus:outline-none focus:ring-1 focus:ring-[#c9a84c] transition-all duration-300"
                        />
                      </div>
                      <div>
                        <label htmlFor="contact-service" className="block text-xs font-semibold text-[#aaaaaa] mb-1.5">
                          Primary Service Area *
                        </label>
                        <select
                          id="contact-service"
                          required
                          value={formData.service}
                          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#101010] border border-[#666666] focus:border-[#c9a84c] text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#c9a84c] transition-all duration-300"
                        >
                          {CORE_SERVICES.map((s) => (
                            <option key={s.id} value={s.title} className="bg-[#161616]">
                              {s.title}
                            </option>
                          ))}
                          <option value="Custom Engineering Architecture" className="bg-[#161616]">
                            Custom Engineering Architecture
                          </option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="contact-message" className="block text-xs font-semibold text-[#aaaaaa] mb-1.5">
                        Project Requirements & Goals *
                      </label>
                      <textarea
                        required
                        id="contact-message"
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Briefly describe what you're building, target timelines, or technical challenges..."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#101010] border border-[#666666] focus:border-[#c9a84c] text-sm text-white placeholder-[#777777] focus:outline-none focus:ring-1 focus:ring-[#c9a84c] transition-all duration-300 resize-none"
                      />
                    </div>

                    <MagneticHover className="mt-2 block w-full">
                      <AnimatedButton
                        type="submit"
                        disabled={isSubmitting}
                        variant="primary"
                        size="lg"
                        fullWidth
                        icon={<ArrowRight className="w-4 h-4" />}
                      >
                        {isSubmitting ? 'Transmitting Request...' : 'Submit Consultation Request'}
                      </AnimatedButton>
                    </MagneticHover>
                  </form>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
