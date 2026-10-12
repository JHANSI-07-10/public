import type { Metadata } from 'next';
import PortfolioClient from './client';

export const metadata: Metadata = {
  title: 'Technical Impact Portfolio | VPD Technologies',
};

export default function PortfolioPageRoute() {
  return <PortfolioClient />;
}
