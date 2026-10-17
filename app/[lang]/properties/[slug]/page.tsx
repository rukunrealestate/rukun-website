import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { notFound, permanentRedirect } from 'next/navigation'
import { MapPin, Bed, Bath, Square, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import ShareButton from './ShareButton'
import ImageGallery from './ImageGallery'
import PropertyCard from '@/components/PropertyCard'
import ViewingForm from '@/components/leads/ViewingForm'
import { ListingSidebarButtons, ListingMobileBar } from '@/components/leads/ListingContact'
import { similarProperties } from '@/lib/similar'
import CategoryPage from './CategoryPage'
import type { Metadata } from 'next'
import {
  SITE_URL, formatPrice, typeLabel, propertyKind, propertyLocation, propertySummary,
  propertySlug, propertyPath, resolvePropertySlug, getProperties, localizedTitle, localizedDescription, listingMetaTitle, listingHeadline, listingFacts, type Property,
} from '@/lib/properties'
import { hasLocale, getDictionary, alternatesFor, localePath, type Locale } from '@/lib/i18n'
import { parseCategory, categoryTitle, categoryIntro, matchesCategory } from '@/lib/categories'
import { pageOpenGraph, imageLang } from '@/lib/og'

type Params = { params: Promise<{ lang: string; slug: string }> }

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang, slug } = await params
  if (!hasLocale(lang)) return {}

  const category = parseCategory(slug)
  if (category) {
    const matching = (await getProperties()).filter((p) => matchesCategory(p, category))
    const count = matching.length
    const title = categoryTitle(category, lang)
    const description = categoryIntro(category, lang, count).slice(0, 160)
    const ti = getDictionary(imageLang(lang)).props
    return {
      title,
      description,
      alternates: alternatesFor(lang, `/properties/${slug}`),
      robots: count ? undefined : { index: false },
      ...pageOpenGraph(lang, {
        title,
        description,
        path: `/properties/${slug}`,
        image: {
          title: categoryTitle(category, imageLang(lang)),
          kicker: ti.eyebrow,
          detail: ti.count.replace('{n}', String(count)),
          photo: matching.find((p) => p.images?.length)?.images[0],
        },
      }),
    }
  }

  const property = await resolvePropertySlug(slug)
  if (!property) return { title: getDictionary(lang).props.notFound, robots: { index: false } }
  const path = propertyPath(property)
  const title = localizedTitle(property, lang)
  // Near-identical listings (same type, place, size and price) get their reference number so titles stay unique
  let searchTitle = listingMetaTitle(property, lang)
  let description = propertySummary(property, lang)
  const twin = (await getProperties()).some((o) => o.id !== property.id && listingMetaTitle(o, lang) === searchTitle)
  if (twin) {
    const ref = property.reference_number || `Ref. ${property.id.slice(0, 4).toUpperCase()}`
    searchTitle += ` · ${ref}`
    description = `${ref} · ${description}`
  }
  return {
    title: { absolute: `${searchTitle} | Rukun` },
    description,
    alternates: alternatesFor(lang, path),
    // Preview text keeps the full listing title; the image shows the headline, key facts and main photo
    ...pageOpenGraph(lang, {
      title,
      description,
      path,
      image: {
        title: listingHeadline(property, imageLang(lang)),
        kicker: property.transaction_type === 'sale' ? getDictionary(imageLang(lang)).props.forSale : getDictionary(imageLang(lang)).props.forRent,
        detail: listingFacts(property, imageLang(lang)),
        photo: property.images?.[0],
      },
    }),
  }
}

export default async function SlugPage({ params }: Params) {
  const { lang, slug } = await params
  if (!hasLocale(lang)) notFound()

  const category = parseCategory(slug)
  if (category) return <CategoryPage lang={lang} category={category} />

  const property = await resolvePropertySlug(slug)
  if (!property) notFound()
  // Old id-based links and outdated slugs move permanently to the current readable URL
  if (slug !== propertySlug(property)) permanentRedirect(localePath(lang, propertyPath(property)))

  return <ListingPage lang={lang} property={property} />
}

async function ListingPage({ lang, property }: { lang: Locale; property: Property }) {
  const dict = getDictionary(lang)
  const t = dict.props
  const price = formatPrice(property.price, property.currency, property.transaction_type, lang)
  const title = localizedTitle(property, lang)
  const description = localizedDescription(property, lang)
  const similar = similarProperties(property, await getProperties())
  const location = propertyLocation(property)
  const propertyUrl = `${SITE_URL}${localePath(lang, propertyPath(property))}`
  const listingSchema = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: title,
    description: propertySummary(property, lang),
    url: propertyUrl,
    inLanguage: lang,
    image: property.images ?? [],
    offers: {
      '@type': 'Offer',
      price: property.price,
      priceCurrency: property.currency === 'LBP' ? 'USD' : property.currency,
      availability: property.status === 'available' ? 'https://schema.org/InStock' : 'https://schema.org/SoldOut',
      businessFunction: property.transaction_type === 'rent' ? 'http://purl.org/goodrelations/v1#LeaseOut' : 'http://purl.org/goodrelations/v1#Sell',
      seller: { '@type': 'RealEstateAgent', name: 'Rukun Real Estate & Interior Design', url: SITE_URL },
    },
    contentLocation: {
      '@type': 'Place',
      name: location,
      address: { '@type': 'PostalAddress', addressLocality: property.city || property.district || undefined, addressCountry: 'LB' },
    },
    ...(property.area_sqm ? { floorSize: { '@type': 'QuantitativeValue', value: property.area_sqm, unitCode: 'MTK' } } : {}),
    ...(property.bedrooms ? { numberOfBedrooms: property.bedrooms } : {}),
  }
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: dict.nav.home, item: `${SITE_URL}${localePath(lang, '/')}` },
      { '@type': 'ListItem', position: 2, name: dict.nav.properties, item: `${SITE_URL}${localePath(lang, '/properties')}` },
      { '@type': 'ListItem', position: 3, name: title, item: propertyUrl },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([listingSchema, breadcrumbSchema]) }} />
      <Navbar lang={lang} t={dict.nav} />
      <div className="pt-24 xl:pt-32 pb-20 xl:pb-0 min-h-screen bg-[#080808]">
        {/* Back */}
        <div className="max-w-7xl mx-auto px-6 pt-6 pb-2">
          <Link href={localePath(lang, '/properties')} className="inline-flex items-center gap-2 text-gray-400 hover:text-brand-gold transition-colors text-sm">
            <ArrowLeft size={15} className="rtl:rotate-180" /> {t.back}
          </Link>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            {/* Left: Images + Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Images */}
              <ImageGallery images={property.images ?? []} title={title} />

              {/* Title + badges */}
              <div>
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    property.transaction_type === 'sale' ? 'bg-brand-gold text-brand-black' : 'bg-brand-red text-white'
                  }`}>{property.transaction_type === 'sale' ? t.forSale : t.forRent}</span>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/10 text-white">{typeLabel(propertyKind(property), lang)}</span>
                </div>
                <h1 className="font-heading text-3xl md:text-4xl font-bold text-white mb-2" dir="auto">{title}</h1>
                <div className="flex items-center gap-1.5 text-gray-400 text-sm">
                  <MapPin size={14} className="text-brand-gold shrink-0" />
                  {location}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                {property.bedrooms != null && property.bedrooms > 0 && (
                  <div className="bg-white/3 border border-white/5 rounded-xl p-4 text-center">
                    <Bed size={20} className="text-brand-gold mx-auto mb-2" />
                    <div className="text-white font-semibold text-lg">{property.bedrooms}</div>
                    <div className="text-gray-500 text-xs">{t.bedrooms}</div>
                  </div>
                )}
                {property.bathrooms != null && (
                  <div className="bg-white/3 border border-white/5 rounded-xl p-4 text-center">
                    <Bath size={20} className="text-brand-gold mx-auto mb-2" />
                    <div className="text-white font-semibold text-lg">{property.bathrooms}</div>
                    <div className="text-gray-500 text-xs">{t.bathrooms}</div>
                  </div>
                )}
                {property.area_sqm != null && (
                  <div className="bg-white/3 border border-white/5 rounded-xl p-4 text-center">
                    <Square size={20} className="text-brand-gold mx-auto mb-2" />
                    <div className="text-white font-semibold text-lg">{property.area_sqm}</div>
                    <div className="text-gray-500 text-xs">m²</div>
                  </div>
                )}
              </div>

              {/* Description */}
              {description && (
                <div className="bg-white/3 border border-white/5 rounded-2xl p-6">
                  <h2 className="font-heading text-lg font-semibold text-white mb-3">{t.aboutProperty}</h2>
                  <p className="text-gray-400 leading-relaxed text-sm whitespace-pre-line break-words [overflow-wrap:anywhere]" dir="auto">{description}</p>
                </div>
              )}

              {/* Video */}
              {property.video_url && (() => {
                const url = property.video_url
                let embedUrl: string | null = null
                let isShort = false
                try {
                  const u = new URL(url)
                  if (u.hostname.includes('youtube.com')) {
                    const v = u.searchParams.get('v')
                    if (v) {
                      embedUrl = `https://www.youtube.com/embed/${v}`
                    } else if (u.pathname.startsWith('/shorts/')) {
                      isShort = true
                    }
                  } else if (u.hostname === 'youtu.be') {
                    embedUrl = `https://www.youtube.com/embed${u.pathname}`
                  }
                } catch {}
                return (
                  <div className="bg-white/3 border border-white/5 rounded-2xl p-6">
                    <h2 className="font-heading text-lg font-semibold text-white mb-3">{t.videoTour}</h2>
                    {embedUrl ? (
                      <div className="aspect-video rounded-xl overflow-hidden">
                        <iframe
                          src={embedUrl}
                          className="w-full h-full"
                          allowFullScreen
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        />
                      </div>
                    ) : (
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-3 w-full border border-brand-gold/40 hover:border-brand-gold text-brand-gold hover:bg-brand-gold/10 font-semibold py-5 rounded-xl transition-colors text-sm"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
                        {isShort ? t.watchShort : t.watchVideo}
                      </a>
                    )}
                  </div>
                )
              })()}

              {/* Amenities */}
              {property.amenities?.length > 0 && (
                <div className="bg-white/3 border border-white/5 rounded-2xl p-6">
                  <h2 className="font-heading text-lg font-semibold text-white mb-4">{t.amenities}</h2>
                  <div className="flex flex-wrap gap-2">
                    {property.amenities.map((a) => (
                      <span key={a} className="px-3 py-1.5 rounded-lg bg-brand-gold/10 text-brand-gold text-sm font-medium border border-brand-gold/20">
                        {a}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <ViewingForm t={dict.leads} lang={lang} propertyId={property.id} transaction={property.transaction_type} />
            </div>

            {/* Right: Price card */}
            <div className="space-y-4">
              <div className="bg-white/3 border border-white/5 rounded-2xl p-6 sticky top-28">
                <div className="mb-6">
                  <div className="text-gray-400 text-sm mb-1">{property.transaction_type === 'rent' ? t.monthlyRent : t.askingPrice}</div>
                  <div className="font-heading text-4xl font-bold text-brand-gold" dir="ltr">{price}</div>
                </div>

                <div className="space-y-3 mb-6 pb-6 border-b border-white/5 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">{t.type}</span>
                    <span className="text-white font-medium">{typeLabel(propertyKind(property), lang)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">{t.transaction}</span>
                    <span className="text-white font-medium">{property.transaction_type === 'sale' ? t.forSale : t.forRent}</span>
                  </div>
                  {property.city && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">{t.city}</span>
                      <span className="text-white font-medium">{property.city}</span>
                    </div>
                  )}
                  {property.district && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">{t.district}</span>
                      <span className="text-white font-medium">{property.district}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <ListingSidebarButtons t={dict.leads} title={title} url={propertyUrl} propertyId={property.id} />
                  <ShareButton title={title} price={price} location={location} url={propertyUrl} t={dict.share} />
                </div>
              </div>
            </div>
          </div>

          {/* Similar properties keep visitors browsing instead of leaving */}
          {similar.length > 0 && (
            <section className="mt-16">
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-6">{dict.leads.similar}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {similar.map((p) => <PropertyCard key={p.id} p={p} lang={lang} />)}
              </div>
            </section>
          )}
        </div>
      </div>
      <ListingMobileBar t={dict.leads} title={title} url={propertyUrl} propertyId={property.id} />
      <Footer lang={lang} />
    </>
  )
}
