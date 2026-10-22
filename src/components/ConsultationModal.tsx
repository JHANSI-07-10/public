'use client';

import React, { useState, useEffect, useRef } from 'react';
import { X, ArrowRight, CheckCircle } from 'lucide-react';
import { CORE_SERVICES, COMPANY_DATA, Service } from '../data/content';
import { Button } from './ui/Button';
import { submitEnquiry } from '../config/api';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: Service | null;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  initialService,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: initialService ? initialService.title : 'Website Development',
    message: '',
    website: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const submissionRef = useRef(0);

  useEffect(() => {
    if (initialService) {
      setFormData((prev) => ({ ...prev, service: initialService.title }));
    }
  }, [initialService]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.message.trim()) {
      setError('Please provide your name, contact email, phone number, and project scope.');
      return;
    }
    if (isSubmitting) return;

    setIsSubmitting(true);
    setError('');

    const attempt = ++submissionRef.current;
    const res = await submitEnquiry(
      'consultation',
      {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        service: formData.service,
        message: formData.message.trim(),
      },
      `cs-${crypto.randomUUID()}`,
      new Date().toISOString()
    );

    if (attempt !== submissionRef.current) return;

    if (res.success) {
      setIsSuccess(true);
    } else {
      setError(res.message || 'We could not send your consultation request. Please try again.');
    }
    setIsSubmitting(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="consultation-modal-title"
      onClick={onClose}
    >
      <div
        className="bg-[#141414] border border-[#282828] rounded-2xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl shadow-black max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-[#202020] text-[#aaaaaa] hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c]"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="py-8 text-center space-y-4" role="status" aria-live="polite">
            <div className="w-14 h-14 rounded-full bg-[#22c55e]/15 border border-[#22c55e]/40 flex items-center justify-center text-[#22c55e] mx-auto">
              <CheckCircle className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold text-white">
              Consultation Request Received
            </h3>
            <p className="text-sm text-[#aaaaaa] leading-relaxed">
              We have received your specifications and a senior software engineer will review your scope and follow up about scheduling. Your request is received, but no appointment is confirmed until we agree a time with you.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row gap-3">
              <Button
                onClick={() => {
                  setIsSuccess(false);
                  onClose();
                }}
                variant="secondary"
                size="md"
                fullWidth
              >
                Close Window
              </Button>
              <a
                href={COMPANY_DATA.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full min-h-[44px] py-2.5 px-4 rounded-xl bg-[#22c55e] hover:bg-[#1fa951] text-black font-bold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <div className="text-xs font-bold text-[#c9a84c] uppercase tracking-wider mb-1">
                Engineering Consultation
              </div>
              <h3 id="consultation-modal-title" className="text-2xl font-bold text-white">
                Book a Technical Consultation
              </h3>
              <p className="text-xs text-[#888888] mt-1">
                Zero sales pressure. Discuss your project requirements directly with an engineering lead.
              </p>
            </div>

            <div className="absolute -left-[9999px] top-auto h-[1px] w-[1px] overflow-hidden" aria-hidden="true">
              <label htmlFor="consultation-website">Do not fill this in</label>
              <input
                id="consultation-website"
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              />
            </div>

            {error && (
              <div
                role="alert"
                className="mb-4 p-3 rounded-lg bg-red-950/40 border border-red-800 text-xs text-red-300"
              >
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="consultation-name" className="block text-xs font-semibold text-[#cccccc] mb-1">
                  Full Name *
                </label>
                <input
                  id="consultation-name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. John Doe"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e0e0e] border border-[#2b2b2b] focus:border-[#c9a84c] text-sm text-white placeholder-[#555555] focus:outline-none focus:ring-1 focus:ring-[#c9a84c] transition-colors"
                />
              </div>

              <div>
                <label htmlFor="consultation-email" className="block text-xs font-semibold text-[#cccccc] mb-1">
                  Work Email *
                </label>
                <input
                  id="consultation-email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="john@company.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e0e0e] border border-[#2b2b2b] focus:border-[#c9a84c] text-sm text-white placeholder-[#555555] focus:outline-none focus:ring-1 focus:ring-[#c9a84c] transition-colors"
                />
              </div>

              <div>
                <label htmlFor="consultation-phone" className="block text-xs font-semibold text-[#cccccc] mb-1">
                  Phone / WhatsApp *
                </label>
                <input
                  id="consultation-phone"
                  name="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 83339 19447"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e0e0e] border border-[#2b2b2b] focus:border-[#c9a84c] text-sm text-white placeholder-[#555555] focus:outline-none focus:ring-1 focus:ring-[#c9a84c] transition-colors"
                />
              </div>

              <div>
                <label htmlFor="consultation-service" className="block text-xs font-semibold text-[#cccccc] mb-1">
                  Target Service *
                </label>
                <select
                  id="consultation-service"
                  name="service"
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e0e0e] border border-[#2b2b2b] focus:border-[#c9a84c] text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#c9a84c] transition-colors"
                >
                  {CORE_SERVICES.map((s) => (
                    <option key={s.id} value={s.title}>
                      {s.title}
                    </option>
                  ))}
                  <option value="Enterprise Architecture Consulting">
                    Enterprise Architecture Consulting
                  </option>
                  {formData.service &&
                    !CORE_SERVICES.some((s) => s.title === formData.service) &&
                    formData.service !== 'Enterprise Architecture Consulting' && (
                      <option value={formData.service}>{formData.service}</option>
                    )}
                </select>
              </div>

              <div>
                <label htmlFor="consultation-message" className="block text-xs font-semibold text-[#cccccc] mb-1">
                  Project Scope & Goals *
                </label>
                <textarea
                  id="consultation-message"
                  name="message"
                  required
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="What are your high-level goals, tech preferences, or desired launch timeline?"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e0e0e] border border-[#2b2b2b] focus:border-[#c9a84c] text-sm text-white placeholder-[#555555] focus:outline-none focus:ring-1 focus:ring-[#c9a84c] transition-colors resize-none"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                variant="primary"
                size="lg"
                fullWidth
                icon={<ArrowRight className="w-4 h-4" />}
                className="mt-2"
              >
                {isSubmitting ? 'Transmitting...' : 'Confirm Consultation Request'}
              </Button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
