import type { Metadata } from 'next';
import BlogDetailClient from './client';

export const metadata: Metadata = {
  title: 'Architectural Article | VPD Technologies',
};

export default async function BlogDetailPageRoute({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <BlogDetailClient id={id} />;
}
