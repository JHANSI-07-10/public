import type { Metadata } from 'next';
import BlogsClient from './client';
import { COMPANY_DATA, VERIFIED_INSIGHTS } from '../../src/data/content';

export const metadata: Metadata = {
  title: 'Technical Insights & Engineering Research | VPD Technologies',
  description:
    'Deep dives into React 19 performance budgets, event-driven microservices, cloud-native backend architectures, and real-time WebSocket state synchronization.',
  keywords: [
    'Software Architecture Blog',
    'React Performance Optimization',
    'Cloud Backend Engineering',
    'WebSocket Real-Time Protocols',
    'VPD Engineering Lab',
    'System Architecture Insights',
  ],
  openGraph: {
    title: 'Technical Insights & Engineering Research | VPD Technologies',
    description:
      'Deep dives into React frontends, real-time sync protocols, and cloud-native systems from the VPD Engineering Lab.',
    url: 'https://vpdtechnologies.com/blogs',
    siteName: COMPANY_DATA.name,
    images: [
      {
        url: 'https://vpdtechnologies.com/about2.webp',
        width: 1200,
        height: 630,
        alt: 'VPD Technologies Engineering Insights',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Technical Insights & Engineering Research | VPD Technologies',
    description:
      'Articles, technical methodologies, and architectural benchmarks on React frontends, real-time sync protocols, and cloud-native systems.',
    images: ['https://vpdtechnologies.com/about2.webp'],
  },
  alternates: {
    canonical: 'https://vpdtechnologies.com/blogs',
  },
};

export default function BlogsPageRoute() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'VPD Technologies Engineering Lab & Research Insights',
    description:
      'Deep dives into React 19 performance budgets, event-driven microservices, and enterprise cloud architectures.',
    url: 'https://vpdtechnologies.com/blogs',
    publisher: {
      '@type': 'Organization',
      name: COMPANY_DATA.name,
      url: 'https://vpdtechnologies.com',
      logo: 'https://vpdtechnologies.com/logo.webp',
    },
    blogPost: VERIFIED_INSIGHTS.map((article) => ({
      '@type': 'BlogPosting',
      headline: article.title,
      description: article.excerpt,
      author: {
        '@type': 'Organization',
        name: article.author,
      },
      datePublished: '2026-05-01',
      url: `https://vpdtechnologies.com/blogs/${article.id}`,
      image: article.image,
      keywords: article.tags.join(', '),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogsClient />
    </>
  );
}
