'use client';

import { HomePage } from '../src/views/HomePage';
import { useConsultation } from '../src/components/ConsultationContext';

export default function HomeClient() {
  const { openConsultation } = useConsultation();
  return <HomePage onOpenConsultation={openConsultation} />;
}
