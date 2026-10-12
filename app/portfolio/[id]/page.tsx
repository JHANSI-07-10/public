import type { Metadata } from 'next';
import PortfolioDetailClient from './client';

export const metadata: Metadata = {
  title: 'Case Study Deep Dive | VPD Technologies',
};

export default async function PortfolioDetailPageRoute({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <PortfolioDetailClient id={id} />;
}
