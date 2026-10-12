'use client';

import { BlogsPage } from '../../src/views/BlogsPage';
import { useConsultation } from '../../src/components/ConsultationContext';

export default function BlogsClient() {
  const { openConsultation } = useConsultation();
  return <BlogsPage onOpenConsultation={openConsultation} />;
}
