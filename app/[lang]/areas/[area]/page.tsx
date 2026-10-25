import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import PropertyCard from '@/components/PropertyCard'
import Faq from '@/components/Faq'
import { getProperties, formatPrice, SITE_URL, type Property } from '@/lib/properties'
import { hasLocale, getDictionary, alternatesFor, localePath, type Locale } from '@/lib/i18n'
import { areaGuides } from '@/lib/areaGuides'
import { activeCategories, areaAt, categoryTitle, inArea } from '@/lib/categories'
import { areaFaq } from '@/lib/faq'
import { pageOpenGraph, imageLang } from '@/lib/og'
import OwnerBand from '@/components/leads/OwnerBand'

type Params = { params: Promise<{ lang: string; area: string }> }

const fill = (s: string, vars: Record<string, string | number>) =>
  s.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ''))

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang, area } = await params
  const guide = areaGuides[area]
  if (!hasLocale(lang) || !guide) return {}
  const t = getDictionary(lang).areas
  const name = guide.name[lang]
  const title = fill(t.guideTitle, { area: name })
  const description = fill(t.guideDesc, { area: name, at: areaAt(area, lang) })
  const il = imageLang(lang)
  const ti = getDictionary(il).areas
  const inThisArea = (await getProperties()).filter((p) => inArea(p, area))
  return {
    title,
    description,
    alternates: alternatesFor(lang, `/areas/${area}`),
    ...pageOpenGraph(lang, {
      title,
      description,
      path: `/areas/${area}`,
      image: {
        title: fill(ti.guideTitle, { area: guide.name[il] }),
        kicker: ti.eyebrow,
        detail: ti.listings.replace('{n}', String(inThisArea.length)),
        photo: inThisArea.find((p) => p.images?.length)?.images[0],
      },
    }),
  }
}

function median(nums: number[]) {
  const s = [...nums].sort((a, b) => a - b)
  const m = Math.floor(s.length / 2)
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2
}

function marketStats(ps: Property[]) {
  const sale = ps.filter((p) => p.transaction_type === 'sale')
  // Rent range covers homes only, so offices and warehouses do not skew it
  const rent = ps.filter((p) => p.transaction_type === 'rent' && p.price > 0 && (p.type === 'apartment' || p.type === 'villa'))
  const sqm = sale.filter((p) => p.price > 0 && (p.area_sqm ?? 0) > 0).map((p) => p.price / p.area_sqm!)
  return {
    sale: sale.length,
    rent: ps.filter((p) => p.transaction_type === 'rent').length,
    medianSqm: sqm.length ? median(sqm) : null,
    rentMin: rent.length ? Math.min(...rent.map((p) => p.price)) : null,
    rentMax: rent.length ? Math.max(...rent.map((p) => p.price)) : null,
  }
}

export default async function AreaGuidePage({ params }: Params) {
  const { lang: l, area } = await params
  if (!hasLocale(l) || !areaGuides[area]) notFound()
  const lang: Locale = l
  const dict = getDictionary(lang)
  const t = dict.areas
  const guide = areaGuides[area]
  const name = guide.name[lang]
  const at = areaAt(area, lang)

  const all = await getProperties()
  const properties = all.filter((p) => inArea(p, area))
  const stats = marketStats(properties)
  const areaCategories = activeCategories(all).filter(({ category }) => category.area === area)
  const usd = (n: number) => formatPrice(Math.round(n), 'USD', 'sale')

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: dict.nav.home, item: `${SITE_URL}${localePath(lang, '/')}` },
      { '@type': 'ListItem', position: 2, name: t.nav, item: `${SITE_URL}${localePath(lang, '/areas')}` },
      { '@type': 'ListItem', position: 3, name, item: `${SITE_URL}${localePath(lang, `/areas/${area}`)}` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Navbar lang={lang} t={dict.nav} />
      <div className="pt-28 xl:pt-36 min-h-screen">
        <div className="max-w-7xl mx-auto px-6 mb-12">
          <Link href={localePath(lang, '/areas')} className="inline-flex items-center gap-2 text-gray-400 hover:text-brand-gold transition-colors text-sm mb-6">
            <ArrowLeft size={15} className="rtl:rotate-180" /> {t.allGuides}
          </Link>
          <p className="text-brand-gold text-sm font-medium tracking-widest uppercase mb-3">{t.eyebrow}</p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-2">{fill(t.guideTitle, { area: name })}</h1>
          <div className="gold-divider mb-6" />
          <div className="max-w-3xl space-y-4">
            {guide.intro[lang].map((para, i) => <p key={i} className="text-gray-400 leading-relaxed">{para}</p>)}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 pb-20">
          {/* Market numbers, computed from live listings */}
          {properties.length > 0 && (
            <section className="mb-14">
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-6">{t.marketTitle}</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                {[
                  { label: t.forSale, value: String(stats.sale) },
                  { label: t.forRent, value: String(stats.rent) },
                  { label: t.medianSqm, value: stats.medianSqm ? usd(stats.medianSqm) : '—' },
                  { label: t.rentRange, value: stats.rentMin != null ? (stats.rentMin === stats.rentMax ? usd(stats.rentMin) : `${usd(stats.rentMin)}–${usd(stats.rentMax!)}`) : '—' },
                ].map((s, i) => (
                  <div key={i} className="rounded-xl border border-white/5 bg-white/3 p-5">
                    <div className="font-heading text-2xl font-bold text-brand-gold mb-1" dir="ltr">{s.value}</div>
                    <div className="text-gray-400 text-xs">{s.label}</div>
                  </div>
                ))}
              </div>
              <p className="text-gray-500 text-xs">{fill(t.basedOn, { n: properties.length })}</p>
            </section>
          )}

          {/* Listings */}
          <section className="mb-14">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-6">{fill(t.listingsIn, { at })}</h2>
            {properties.length === 0 ? (
              <p className="text-gray-400">{t.noListings}</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties.slice(0, 6).map((p) => <PropertyCard key={p.id} p={p} lang={lang} />)}
              </div>
            )}
            {areaCategories.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-6">
                {areaCategories.map(({ category, count }) => (
                  <Link key={category.slug} href={localePath(lang, `/properties/${category.slug}`)}
                    className="text-xs text-gray-300 border border-white/10 hover:border-brand-gold/40 hover:text-brand-gold px-3 py-1.5 rounded-full transition-colors">
                    {categoryTitle(category, lang)} <span className="text-gray-500">({count})</span>
                  </Link>
                ))}
              </div>
            )}
          </section>

          <Faq items={areaFaq(at, properties, lang)} title={dict.faqTitle} />
        </div>
        <OwnerBand lang={lang} area={area} />
      </div>
      <Footer lang={lang} />
    </>
  )
}
