import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getProperties } from '@/lib/properties'
import { hasLocale, getDictionary, alternatesFor, localePath } from '@/lib/i18n'
import PropertyCard from '@/components/PropertyCard'
import CategoryLinks from '@/components/CategoryLinks'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  if (!hasLocale(lang)) return {}
  const t = getDictionary(lang).props
  return { title: t.metaTitle, description: t.metaDesc, alternates: alternatesFor(lang, '/properties') }
}

export default async function PropertiesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = getDictionary(lang)
  const t = dict.props
  const properties = await getProperties()

  return (
    <>
      <Navbar lang={lang} t={dict.nav} />
      <div className="pt-28 min-h-screen">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-6 mb-10">
          <p className="text-brand-gold text-sm font-medium tracking-widest uppercase mb-3">{t.eyebrow}</p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-2">{t.title}</h1>
          <div className="gold-divider" />
        </div>

        {/* Grid */}
        <div className="max-w-7xl mx-auto px-6 pb-20">
          <CategoryLinks properties={properties} lang={lang} title={t.browseBy} />
          {properties.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-gray-400 text-lg mb-2">{t.empty}</p>
              <p className="text-gray-600 text-sm">{t.emptySub}</p>
              <Link href={localePath(lang, '/contact')} className="inline-block mt-6 bg-brand-gold text-brand-black font-semibold px-6 py-3 rounded-xl text-sm hover:bg-brand-gold-light transition-colors">
                {t.contactUs}
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((p) => <PropertyCard key={p.id} p={p} lang={lang} />)}
            </div>
          )}
        </div>
      </div>
      <Footer lang={lang} />
    </>
  )
}
