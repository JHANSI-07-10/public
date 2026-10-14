import type { Metadata } from 'next';
import { ProductsPage } from '../../src/views/ProductsPage';

export const metadata: Metadata = {
  title: 'Products & Platforms | VPD Technologies',
  description:
    'Informational overviews of VPD Technologies proprietary platforms: B2B Logistics Platform (In Development), AgriFlow ERP (Pilot), and Enterprise SaaS Suite (Planned).',
  openGraph: {
    title: 'Products & Platforms | VPD Technologies',
    description:
      'Informational overviews of B2B Logistics Platform, AgriFlow ERP, and Enterprise SaaS Suite by VPD Technologies Private Limited.',
  },
};

export default function ProductsRoute() {
  return <ProductsPage />;
}
