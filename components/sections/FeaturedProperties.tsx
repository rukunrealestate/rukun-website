import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getProperties } from '@/lib/properties'
import { getDictionary, localePath, type Locale } from '@/lib/i18n'
import PropertyCard from '@/components/PropertyCard'

// Latest listings on a warm-white band, so the photos read brighter than on black
export default async function FeaturedProperties({ lang }: { lang: Locale }) {
  const t = getDictionary(lang).featured
  // Latest real listings from the CRM, preferring ones with photos
  const all = await getProperties()
  const properties = [...all.filter((p) => p.images?.length), ...all.filter((p) => !p.images?.length)].slice(0, 6)

  if (properties.length === 0) return null

  return (
    <section className="py-16 md:py-24 bg-[#F7F4EE]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <p className="text-[#9C7840] text-xs font-bold tracking-[0.18em] uppercase mb-2">{t.eyebrow}</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#16130F]">{t.title}</h2>
          </div>
          <Link href={localePath(lang, '/properties')} className="flex items-center gap-2 text-[#16130F] hover:text-[#9C7840] text-sm font-semibold transition-colors whitespace-nowrap">
            {t.viewAll} <ArrowRight size={16} className="rtl:rotate-180" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {properties.map((p) => <PropertyCard key={p.id} p={p} lang={lang} tone="light" />)}
        </div>
      </div>
    </section>
  )
}
