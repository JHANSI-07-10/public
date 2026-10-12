'use client';

import { PortfolioPage } from '../../src/views/PortfolioPage';
import { useConsultation } from '../../src/components/ConsultationContext';

export default function PortfolioClient() {
  const { openConsultation } = useConsultation();
  return <PortfolioPage onOpenConsultation={openConsultation} />;
}
