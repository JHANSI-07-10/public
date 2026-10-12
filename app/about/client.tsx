'use client';

import { AboutPage } from '../../src/views/AboutPage';
import { useConsultation } from '../../src/components/ConsultationContext';

export default function AboutClient() {
  const { openConsultation } = useConsultation();
  return <AboutPage onOpenConsultation={openConsultation} />;
}
