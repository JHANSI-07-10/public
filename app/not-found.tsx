import type { Metadata } from 'next';
import { NotFoundPage } from '../src/views/NotFoundPage';

export const metadata: Metadata = {
  title: 'Page Not Found | VPD Technologies',
};

export default function NotFound() {
  return <NotFoundPage />;
}
