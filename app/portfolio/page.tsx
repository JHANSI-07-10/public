import type { Metadata } from 'next';
import PortfolioClient from './client';
import { COMPANY_DATA, VERIFIED_PROJECTS } from '../../src/data/content';

export const metadata: Metadata = {
  title: 'Technical Impact Portfolio | VPD Technologies',
  description:
    'Review verified enterprise case studies of high-performance web applications, scalable distributed architectures, and custom software solutions engineered by VPD Technologies.',
  keywords: [
    'Software Engineering Portfolio',
    'Enterprise Web Development',
    'High Performance React Systems',
    'Java Spring Boot Architecture',
    'Enterprise Case Studies',
    'VPD Technologies Portfolio',
  ],
  openGraph: {
    title: 'Technical Impact Portfolio | VPD Technologies',
    description:
      'Engineered for measurable enterprise outcomes. Review high-performance web applications and enterprise software systems.',
    url: 'https://vpdtechnologies.com/portfolio',
    siteName: COMPANY_DATA.name,
    images: [
      {
        url: 'https://vpdtechnologies.com/about3.webp',
        width: 1200,
        height: 630,
        alt: 'VPD Technologies Engineering Portfolio',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Technical Impact Portfolio | VPD Technologies',
    description:
      'Engineered for measurable enterprise outcomes. Review high-performance web applications and enterprise software systems.',
    images: ['https://vpdtechnologies.com/about3.webp'],
  },
  alternates: {
    canonical: 'https://vpdtechnologies.com/portfolio',
  },
};

export default function PortfolioPageRoute() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Technical Impact Portfolio | VPD Technologies',
    description:
      'Review verified enterprise case studies of high-performance web applications, scalable distributed architectures, and custom software solutions engineered by VPD Technologies.',
    url: 'https://vpdtechnologies.com/portfolio',
    publisher: {
      '@type': 'Organization',
      name: COMPANY_DATA.name,
      url: 'https://vpdtechnologies.com',
      logo: 'https://vpdtechnologies.com/logo.webp',
    },
    hasPart: VERIFIED_PROJECTS.map((project) => ({
      '@type': 'CreativeWork',
      name: project.title,
      headline: project.title,
      description: project.overview || project.problem,
      creator: {
        '@type': 'Organization',
        name: COMPANY_DATA.name,
      },
      about: project.sector,
      timeRequired: project.duration,
      url: `https://vpdtechnologies.com/portfolio/${project.id}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PortfolioClient />
    </>
  );
}
