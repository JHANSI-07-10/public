import type { Metadata } from 'next';
import BlogDetailClient from './client';
import { COMPANY_DATA, VERIFIED_INSIGHTS } from '../../../src/data/content';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const article = VERIFIED_INSIGHTS.find((a) => a.id === id);
  if (!article) {
    return {
      title: 'Architectural Article | VPD Technologies',
    };
  }

  const imageUrl = article.image.startsWith('http')
    ? article.image
    : `https://vpdtechnologies.com${article.image}`;

  return {
    title: `${article.title} | VPD Technologies`,
    description: article.excerpt,
    keywords: [...article.tags, 'Software Architecture', 'VPD Engineering Lab'],
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: `https://vpdtechnologies.com/blogs/${article.id}`,
      siteName: COMPANY_DATA.name,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
      type: 'article',
      publishedTime: '2026-05-01T00:00:00.000Z',
      authors: [article.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: [imageUrl],
    },
    alternates: {
      canonical: `https://vpdtechnologies.com/blogs/${article.id}`,
    },
  };
}

export default async function BlogDetailPageRoute({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const article = VERIFIED_INSIGHTS.find((a) => a.id === id);

  const jsonLd = article
    ? {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: article.title,
        description: article.excerpt,
        image: article.image.startsWith('http')
          ? article.image
          : `https://vpdtechnologies.com${article.image}`,
        author: {
          '@type': 'Organization',
          name: article.author,
          url: 'https://vpdtechnologies.com',
        },
        publisher: {
          '@type': 'Organization',
          name: COMPANY_DATA.name,
          url: 'https://vpdtechnologies.com',
          logo: 'https://vpdtechnologies.com/logo.webp',
        },
        datePublished: '2026-05-01',
        mainEntityOfPage: `https://vpdtechnologies.com/blogs/${article.id}`,
        keywords: article.tags.join(', '),
      }
    : null;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <BlogDetailClient id={id} />
    </>
  );
}
