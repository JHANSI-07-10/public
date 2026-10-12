import type { Metadata } from 'next';
import ServicesClient from './client';

export const metadata: Metadata = {
  title: 'Software Engineering Services | VPD Technologies',
};

export default function ServicesPageRoute() {
  return <ServicesClient />;
}
