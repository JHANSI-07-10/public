import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.vpdtechnologiespvtltd.com';
  const currentDate = new Date().toISOString().split('T')[0];

  const routes = [
    { url: `${baseUrl}`, lastModified: currentDate, changeFrequency: 'weekly' as const, priority: 1.0 },
    { url: `${baseUrl}/about`, lastModified: currentDate, changeFrequency: 'monthly' as const, priority: 0.9 },
    { url: `${baseUrl}/about/leadership`, lastModified: currentDate, changeFrequency: 'monthly' as const, priority: 0.9 },
    { url: `${baseUrl}/services`, lastModified: currentDate, changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${baseUrl}/products`, lastModified: currentDate, changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${baseUrl}/careers`, lastModified: currentDate, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: currentDate, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/blogs`, lastModified: currentDate, changeFrequency: 'weekly' as const, priority: 0.7 },
    { url: `${baseUrl}/privacy`, lastModified: currentDate, changeFrequency: 'yearly' as const, priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: currentDate, changeFrequency: 'yearly' as const, priority: 0.3 },
  ];

  return routes;
}
