'use client';

import { ServicesPage } from '../../src/views/ServicesPage';
import { useConsultation } from '../../src/components/ConsultationContext';

export default function ServicesClient() {
  const { openConsultation } = useConsultation();
  return <ServicesPage onOpenConsultation={openConsultation} />;
}
