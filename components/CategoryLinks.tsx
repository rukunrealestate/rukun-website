import Link from 'next/link'
import { localePath, type Locale } from '@/lib/i18n'
import { activeCategories, categoryTitle } from '@/lib/categories'
import type { Property } from '@/lib/properties'

// Links to every category page that currently has listings
export default function CategoryLinks({ properties, lang, title, exclude }: {
  properties: Property[]; lang: Locale; title: string; exclude?: string
}) {
  const cats = activeCategories(properties).filter(({ category }) => category.slug !== exclude)
  if (!cats.length) return null
  return (
    <div className="mb-10">
      <h2 className="text-sm text-gray-400 font-medium mb-3">{title}</h2>
      <div className="flex flex-wrap gap-2">
        {cats.map(({ category, count }) => (
          <Link key={category.slug} href={localePath(lang, `/properties/${category.slug}`)}
            className="text-xs text-gray-300 border border-white/10 hover:border-brand-gold/40 hover:text-brand-gold px-3 py-1.5 rounded-full transition-colors">
            {categoryTitle(category, lang)} <span className="text-gray-500">({count})</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
