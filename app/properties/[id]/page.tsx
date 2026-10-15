import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { notFound } from 'next/navigation'
import { MapPin, Bed, Bath, Square, Phone, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import ShareButton from './ShareButton'
import ImageGallery from './ImageGallery'
import type { Metadata } from 'next'
import {
  SITE_URL, getProperty, formatPrice, typeLabel, propertyLocation, propertySummary,
} from '@/lib/properties'

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const property = await getProperty(id)
  if (!property) return { title: 'Property Not Found', robots: { index: false } }
  const description = propertySummary(property)
  return {
    title: property.title,
    description,
    alternates: { canonical: `/properties/${property.id}` },
    openGraph: {
      title: property.title,
      description,
      url: `/properties/${property.id}`,
      type: 'website',
      images: property.images?.slice(0, 1).map((url) => ({ url, alt: property.title })),
    },
  }
}

export default async function PropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const property = await getProperty(id)
  if (!property) notFound()

  const price = formatPrice(property.price, property.currency, property.transaction_type)
  const location = propertyLocation(property)
  const propertyUrl = `${SITE_URL}/properties/${property.id}`
  const listingSchema = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: property.title,
    description: propertySummary(property),
    url: propertyUrl,
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
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Properties', item: `${SITE_URL}/properties` },
      { '@type': 'ListItem', position: 3, name: property.title, item: propertyUrl },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([listingSchema, breadcrumbSchema]) }} />
      <Navbar />
      <div className="pt-24 min-h-screen bg-[#080808]">
        {/* Back */}
        <div className="max-w-7xl mx-auto px-6 pt-6 pb-2">
          <Link href="/properties" className="inline-flex items-center gap-2 text-gray-400 hover:text-brand-gold transition-colors text-sm">
            <ArrowLeft size={15} /> Back to Properties
          </Link>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            {/* Left: Images + Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Images */}
              <ImageGallery images={property.images ?? []} title={property.title} />

              {/* Title + badges */}
              <div>
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    property.transaction_type === 'sale' ? 'bg-brand-gold text-brand-black' : 'bg-brand-red text-white'
                  }`}>{property.transaction_type === 'sale' ? 'For Sale' : 'For Rent'}</span>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/10 text-white">{typeLabel(property.type)}</span>
                </div>
                <h1 className="font-heading text-3xl md:text-4xl font-bold text-white mb-2">{property.title}</h1>
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
                    <div className="text-gray-500 text-xs">Bedrooms</div>
                  </div>
                )}
                {property.bathrooms != null && (
                  <div className="bg-white/3 border border-white/5 rounded-xl p-4 text-center">
                    <Bath size={20} className="text-brand-gold mx-auto mb-2" />
                    <div className="text-white font-semibold text-lg">{property.bathrooms}</div>
                    <div className="text-gray-500 text-xs">Bathrooms</div>
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
              {property.description && (
                <div className="bg-white/3 border border-white/5 rounded-2xl p-6">
                  <h2 className="font-heading text-lg font-semibold text-white mb-3">About this property</h2>
                  <p className="text-gray-400 leading-relaxed text-sm whitespace-pre-line">{property.description}</p>
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
                    <h2 className="font-heading text-lg font-semibold text-white mb-3">Video Tour</h2>
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
                        {isShort ? 'Watch Short on YouTube' : 'Watch Video'}
                      </a>
                    )}
                  </div>
                )
              })()}

              {/* Amenities */}
              {property.amenities?.length > 0 && (
                <div className="bg-white/3 border border-white/5 rounded-2xl p-6">
                  <h2 className="font-heading text-lg font-semibold text-white mb-4">Amenities</h2>
                  <div className="flex flex-wrap gap-2">
                    {property.amenities.map((a) => (
                      <span key={a} className="px-3 py-1.5 rounded-lg bg-brand-gold/10 text-brand-gold text-sm font-medium border border-brand-gold/20">
                        {a}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right: Price card */}
            <div className="space-y-4">
              <div className="bg-white/3 border border-white/5 rounded-2xl p-6 sticky top-28">
                <div className="mb-6">
                  <div className="text-gray-400 text-sm mb-1">{property.transaction_type === 'rent' ? 'Monthly Rent' : 'Asking Price'}</div>
                  <div className="font-heading text-4xl font-bold text-brand-gold">{price}</div>
                </div>

                <div className="space-y-3 mb-6 pb-6 border-b border-white/5 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Type</span>
                    <span className="text-white font-medium">{typeLabel(property.type)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Transaction</span>
                    <span className="text-white font-medium">{property.transaction_type === 'sale' ? 'For Sale' : 'For Rent'}</span>
                  </div>
                  {property.city && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">City</span>
                      <span className="text-white font-medium">{property.city}</span>
                    </div>
                  )}
                  {property.district && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">District</span>
                      <span className="text-white font-medium">{property.district}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <a href="tel:+9613709240"
                    className="flex items-center justify-center gap-2 w-full bg-brand-gold hover:bg-brand-gold-light text-brand-black font-semibold py-3.5 rounded-xl transition-colors text-sm">
                    <Phone size={16} /> Call Agent
                  </a>
                  <a href={`https://wa.me/9613709240?text=Hi, I'm interested in this property: ${property.title} — ${propertyUrl}`}
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full border border-white/10 hover:border-brand-gold/40 text-white hover:text-brand-gold font-semibold py-3.5 rounded-xl transition-colors text-sm">
                    WhatsApp Us
                  </a>
                  <ShareButton title={property.title} price={price} location={location} url={propertyUrl} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
