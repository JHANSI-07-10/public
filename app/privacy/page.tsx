import type { Metadata } from 'next';
import { PrivacyPolicyPage } from '../../src/views/PrivacyPolicyPage';

export const metadata: Metadata = {
  title: 'Privacy Policy | VPD Technologies',
};

export default function PrivacyPageRoute() {
  return <PrivacyPolicyPage />;
}
