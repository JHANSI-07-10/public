'use client';

import { BlogDetailPage } from '../../../src/views/BlogDetailPage';
import { useConsultation } from '../../../src/components/ConsultationContext';

export default function BlogDetailClient({ id }: { id: string }) {
  const { openConsultation } = useConsultation();
  return <BlogDetailPage id={id} onOpenConsultation={openConsultation} />;
}
