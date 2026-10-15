import type { MetadataRoute } from 'next'
import { SITE_URL, getProperties, propertyPath } from '@/lib/properties'
import { activeCategories } from '@/lib/categories'
import { locales, localePath } from '@/lib/i18n'
import { areaGuideKeys } from '@/lib/areaGuides'

export const dynamic = 'force-dynamic'

type Entry = MetadataRoute.Sitemap[number]

// One entry per language, each listing its translations so Google pairs them up
function localized(path: string, extra: Omit<Entry, 'url'>): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(locales.map((l) => [l, `${SITE_URL}${localePath(l, path)}`]))
  return locales.map((l) => ({ ...extra, url: languages[l], alternates: { languages } }))
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const properties = await getProperties()
  const now = new Date()

  return [
    ...localized('/', { lastModified: now, changeFrequency: 'daily', priority: 1 }),
    ...localized('/properties', { lastModified: now, changeFrequency: 'daily', priority: 0.9 }),
    ...activeCategories(properties).flatMap(({ category }) =>
      localized(`/properties/${category.slug}`, { lastModified: now, changeFrequency: 'daily', priority: 0.8 }),
    ),
    ...properties.flatMap((p) =>
      localized(propertyPath(p), { changeFrequency: 'weekly', priority: 0.7, images: p.images?.slice(0, 5) }),
    ),
    ...localized('/areas', { lastModified: now, changeFrequency: 'weekly', priority: 0.7 }),
    ...areaGuideKeys.flatMap((key) =>
      localized(`/areas/${key}`, { lastModified: now, changeFrequency: 'daily', priority: 0.8 }),
    ),
    ...localized('/about', { changeFrequency: 'monthly', priority: 0.5 }),
    ...localized('/contact', { changeFrequency: 'monthly', priority: 0.6 }),
  ]
}
