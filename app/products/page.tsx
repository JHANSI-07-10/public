import type { Metadata } from 'next';
import { ProductsPage } from '../../src/views/ProductsPage';

export const metadata: Metadata = {
  title: 'Products & Platforms | VPD Technologies',
  description:
    'Informational overviews of VPD Technologies proprietary platforms: AgriFlow (Production), ClikGett (Production), Lumière OS (Staging), B2B Logistics Platform, and Enterprise SaaS Suite.',
  openGraph: {
    title: 'Products & Platforms | VPD Technologies',
    description:
      'Informational overviews of AgriFlow, ClikGett, Lumière OS, B2B Logistics Platform, and Enterprise SaaS Suite by VPD Technologies Private Limited.',
  },
};

export default function ProductsRoute() {
  return <ProductsPage />;
}
