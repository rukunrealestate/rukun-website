import type { Metadata } from 'next'
import { localePath, ogLocales, type Locale } from '@/lib/i18n'
import { skipOptimization } from '@/lib/images'

// Link previews (WhatsApp, Facebook, LinkedIn…): every page gets its own title, description and a
// branded 1200×630 image drawn by /api/og.

export interface OgImageInput {
  title: string
  kicker?: string // small gold line above the title
  detail?: string // line under the title, e.g. "3 properties available" or a price
  photo?: string | null // a listing photo from the CRM storage
}

export function ogImageUrl({ title, kicker, detail, photo }: OgImageInput) {
  const params = new URLSearchParams({ title: title.slice(0, 120) })
  if (kicker) params.set('kicker', kicker.slice(0, 60))
  if (detail) params.set('detail', detail.slice(0, 80))
  // Only our own storage is accepted, so the image route can't be used to fetch arbitrary URLs
  if (photo && !skipOptimization(photo)) params.set('photo', photo)
  return `/api/og?${params}`
}

// The image renderer can't join Arabic letters, so Arabic pages draw their image with the
// English wording; the preview's title and description text stay in Arabic.
export const imageLang = (lang: Locale): Locale => (lang === 'ar' ? 'en' : lang)

export function pageOpenGraph(lang: Locale, opts: {
  title: string
  description: string
  path: string
  image: OgImageInput
  type?: 'website' | 'article'
}): Pick<Metadata, 'openGraph' | 'twitter'> {
  const images = [{ url: ogImageUrl(opts.image), width: 1200, height: 630, alt: opts.title }]
  return {
    openGraph: {
      title: opts.title,
      description: opts.description,
      url: localePath(lang, opts.path),
      siteName: 'Rukun Real Estate',
      locale: ogLocales[lang],
      type: opts.type ?? 'website',
      images,
    },
    twitter: { card: 'summary_large_image', title: opts.title, description: opts.description, images: images.map((i) => i.url) },
  }
}
