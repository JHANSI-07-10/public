import type { Metadata } from 'next';
import { IndustriesPage } from '../../src/views/IndustriesPage';

export const metadata: Metadata = {
  title: 'Industries & Capabilities | VPD Technologies',
  description:
    'Explore VPD Technologies domain capabilities across AgriTech, Healthcare Technology, Education Technology, Manufacturing, Logistics & Supply Chain, and Enterprise Retail.',
  openGraph: {
    title: 'Industries & Capabilities | VPD Technologies',
    description:
      'Domain-focused software engineering across agriculture, healthcare, logistics, and manufacturing by VPD Technologies Private Limited.',
  },
};

export default function IndustriesRoute() {
  return <IndustriesPage />;
}
