import type { Metadata } from 'next';
import AboutClient from './client';

export const metadata: Metadata = {
  title: 'About Us | VPD Technologies',
};

export default function AboutPageRoute() {
  return <AboutClient />;
}
