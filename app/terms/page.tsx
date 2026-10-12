import type { Metadata } from 'next';
import { TermsPage } from '../../src/views/TermsPage';

export const metadata: Metadata = {
  title: 'Terms of Service | VPD Technologies',
};

export default function TermsPageRoute() {
  return <TermsPage />;
}
