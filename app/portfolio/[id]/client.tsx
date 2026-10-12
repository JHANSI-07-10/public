'use client';

import { PortfolioDetailPage } from '../../../src/views/PortfolioDetailPage';
import { useConsultation } from '../../../src/components/ConsultationContext';

export default function PortfolioDetailClient({ id }: { id: string }) {
  const { openConsultation } = useConsultation();
  return <PortfolioDetailPage id={id} onOpenConsultation={openConsultation} />;
}
