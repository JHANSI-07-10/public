import type { Metadata } from 'next';
import { ContactPage } from '../../src/views/ContactPage';

export const metadata: Metadata = {
  title: 'Contact Engineering Team | VPD Technologies',
};

export default function ContactPageRoute() {
  return <ContactPage />;
}
