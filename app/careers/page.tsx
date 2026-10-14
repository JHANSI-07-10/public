import type { Metadata } from 'next';
import { CareersPage } from '../../src/views/CareersPage';

export const metadata: Metadata = {
  title: 'Careers | VPD Technologies',
  description:
    'Join VPD Technologies Private Limited in Kurnool, Andhra Pradesh. We are building high-performance software engineering teams across Full-Stack, UI/UX, and DevOps.',
  openGraph: {
    title: 'Careers | VPD Technologies',
    description:
      'Explore software engineering career opportunities at VPD Technologies Private Limited.',
  },
};

export default function CareersRoute() {
  return <CareersPage />;
}
