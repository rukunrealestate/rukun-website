import type { MetadataRoute } from 'next'
import { SITE_URL, getProperties } from '@/lib/properties'

export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const properties = await getProperties()
  const now = new Date()

  return [
    { url: SITE_URL, lastModified: now, changeFrequency: 'daily', priority: 1 },
    { url: `${SITE_URL}/properties`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${SITE_URL}/about`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${SITE_URL}/contact`, changeFrequency: 'monthly', priority: 0.6 },
    ...properties.map((p) => ({
      url: `${SITE_URL}/properties/${p.id}`,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
      images: p.images?.slice(0, 5),
    })),
  ]
}
