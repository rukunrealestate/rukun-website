import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getProperties } from '@/lib/properties'
import { hasLocale, getDictionary, alternatesFor, localePath } from '@/lib/i18n'
import { parseFilters, applyFilters, hasActiveFilters, BED_OPTIONS } from '@/lib/filters'
import PropertyCard from '@/components/PropertyCard'
import CategoryLinks from '@/components/CategoryLinks'
import PropertyFilters from '@/components/PropertyFilters'
import { pageOpenGraph, imageLang } from '@/lib/og'
import AlertForm from '@/components/leads/AlertForm'
import OwnerBand from '@/components/leads/OwnerBand'
import { selectOptions } from '@/lib/options'

type Props = {
  params: Promise<{ lang: string }>
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { lang } = await params
  if (!hasLocale(lang)) return {}
  const t = getDictionary(lang).props
  const ti = getDictionary(imageLang(lang)).props
  const filtered = hasActiveFilters(parseFilters(await searchParams))
  const all = await getProperties()
  return {
    title: t.metaTitle,
    description: t.metaDesc,
    alternates: alternatesFor(lang, '/properties'),
    ...pageOpenGraph(lang, {
      title: t.metaTitle,
      description: t.metaDesc,
      path: '/properties',
      image: { title: ti.metaTitle, kicker: ti.eyebrow, detail: ti.count.replace('{n}', String(all.length)), photo: all.find((p) => p.images?.length)?.images[0] },
    }),
    // Filtered views are endless variations of this page; keep them out of Google
    // (the category pages are the ones meant to rank)
    robots: filtered ? { index: false, follow: true } : undefined,
  }
}

export default async function PropertiesPage({ params, searchParams }: Props) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = getDictionary(lang)
  const t = dict.props
  const tf = dict.filters
  const all = await getProperties()
  const filters = parseFilters(await searchParams)
  const active = hasActiveFilters(filters)
  const properties = applyFilters(all, filters)
  const action = localePath(lang, '/properties')

  return (
    <>
      <Navbar lang={lang} t={dict.nav} />
      <div className="pt-28 xl:pt-36 min-h-screen">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-6 mb-10">
          <p className="text-brand-gold text-sm font-medium tracking-widest uppercase mb-3">{t.eyebrow}</p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-2">{t.title}</h1>
          <div className="gold-divider" />
          <p className="text-gray-400 max-w-2xl leading-relaxed mt-5">
            {t.intro.split('{link}')[0]}
            <a href="#notify" className="text-brand-gold hover:text-brand-gold-light underline underline-offset-4 decoration-brand-gold/40">{t.introLink}</a>
            {t.intro.split('{link}')[1]}
          </p>
        </div>

        {/* Grid */}
        <div className="max-w-7xl mx-auto px-6 pb-20">
          {all.length > 0 && (
            <PropertyFilters
              key={JSON.stringify(filters)} // reset the form when the URL changes (e.g. "Clear filters")
              action={action}
              filters={filters}
              t={tf}
              th={dict.hero}
              active={active}
              typeOptions={selectOptions(lang).typeOptions}
              areaOptions={selectOptions(lang).areaOptions}
              bedOptions={[...BED_OPTIONS]}
            />
          )}
          {all.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-gray-400 text-lg mb-2">{t.empty}</p>
              <p className="text-gray-600 text-sm">{t.emptySub}</p>
              <Link href={localePath(lang, '/contact')} className="inline-block mt-6 bg-brand-gold text-brand-black font-semibold px-6 py-3 rounded-xl text-sm hover:bg-brand-gold-light transition-colors">
                {t.contactUs}
              </Link>
            </div>
          ) : (
            <>
              {active && (
                <p className="text-sm text-gray-400 mb-6" aria-live="polite">
                  {tf.results.replace('{n}', String(properties.length)).replace('{total}', String(all.length))}
                </p>
              )}
              {properties.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-gray-400 text-lg mb-2">{tf.noResults}</p>
                  <p className="text-gray-600 text-sm max-w-md mx-auto">{t.noMatchSub}</p>
                  <div className="flex justify-center gap-3 mt-6">
                    <Link href={action} className="inline-block border border-white/10 hover:border-brand-gold/40 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-colors">
                      {tf.clear}
                    </Link>
                    <Link href={localePath(lang, '/contact')} className="inline-block bg-brand-gold text-brand-black font-semibold px-6 py-3 rounded-xl text-sm hover:bg-brand-gold-light transition-colors">
                      {t.contactUs}
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                  {properties.map((p) => <PropertyCard key={p.id} p={p} lang={lang} />)}
                </div>
              )}
              <AlertForm t={dict.leads} tf={tf} lang={lang} {...selectOptions(lang)}
                initial={{ tx: filters.tx, type: filters.type, area: filters.area, budget: filters.max, beds: filters.beds }} />
              <CategoryLinks properties={all} lang={lang} title={t.browseBy} />
            </>
          )}
        </div>
      </div>
      <Footer lang={lang} />
    </>
  )
}
