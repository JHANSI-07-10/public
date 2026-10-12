import type { Metadata } from 'next';
import HomeClient from './client';

export const metadata: Metadata = {
  title: 'VPD Technologies | Digital Engineering',
};

export default function HomePageRoute() {
  return <HomeClient />;
}
