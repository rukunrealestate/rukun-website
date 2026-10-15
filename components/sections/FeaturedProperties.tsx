import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getProperties } from '@/lib/properties'
import { getDictionary, localePath, type Locale } from '@/lib/i18n'
import PropertyCard from '@/components/PropertyCard'

export default async function FeaturedProperties({ lang }: { lang: Locale }) {
  const t = getDictionary(lang).featured
  // Latest real listings from the CRM, preferring ones with photos
  const all = await getProperties()
  const properties = [...all.filter((p) => p.images?.length), ...all.filter((p) => !p.images?.length)].slice(0, 6)

  if (properties.length === 0) return null

  return (
    <section className="section-padding bg-[#080808]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
          <div>
            <p className="text-brand-gold text-sm font-medium tracking-widest uppercase mb-3">{t.eyebrow}</p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white">{t.title}</h2>
            <div className="gold-divider mt-4" />
          </div>
          <Link href={localePath(lang, '/properties')} className="flex items-center gap-2 text-brand-gold hover:text-brand-gold-light text-sm font-medium transition-colors whitespace-nowrap">
            {t.viewAll} <ArrowRight size={16} className="rtl:rotate-180" />
          </Link>
        </div>

        {/* Property Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {properties.map((p) => <PropertyCard key={p.id} p={p} lang={lang} />)}
        </div>
      </div>
    </section>
  )
}
