import type { Metadata } from 'next';
import BlogsClient from './client';

export const metadata: Metadata = {
  title: 'Technical Insights & Research | VPD Technologies',
};

export default function BlogsPageRoute() {
  return <BlogsClient />;
}
