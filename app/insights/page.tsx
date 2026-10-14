import type { Metadata } from 'next';
import BlogsClient from '../blogs/client';
import { COMPANY_DATA } from '../../src/data/content';

export const metadata: Metadata = {
  title: 'Insights & Technology Research | VPD Technologies',
  description:
    'Company news, software engineering topics, digital transformation, and industry insights from VPD Technologies Private Limited.',
  openGraph: {
    title: 'Insights & Technology Research | VPD Technologies',
    description:
      'Company updates, software engineering topics, and industry insights by VPD Technologies Private Limited.',
    url: 'https://vpdtechnologiespvtltd.com/insights',
    siteName: COMPANY_DATA.name,
  },
};

export default function InsightsRoute() {
  return <BlogsClient />;
}
