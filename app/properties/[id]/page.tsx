import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { notFound } from 'next/navigation'
import { MapPin, Bed, Bath, Square, Phone, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import ShareButton from './ShareButton'

interface Property {
  id: string
  title: string
  description: string | null
  type: string
  transaction_type: string
  price: number
  currency: string
  area_sqm: number | null
  bedrooms: number | null
  bathrooms: number | null
  location: string | null
  district: string | null
  city: string | null
  status: string
  images: string[]
  amenities: string[]
}

async function getProperty(id: string): Promise<Property | null> {
  try {
    const crmUrl = process.env.NEXT_PUBLIC_CRM_URL || 'https://crm.rukunrealestate.com'
    const res = await fetch(`${crmUrl}/api/properties/${id}`, {
      next: { revalidate: 60 },
    })
    if (!res.ok) return null
    const data = await res.json()
    return data.property ?? null
  } catch {
    return null
  }
}

function formatPrice(price: number, currency: string, transaction_type: string) {
  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency === 'LBP' ? 'USD' : currency,
    maximumFractionDigits: 0,
  }).format(price)
  return transaction_type === 'rent' ? `${formatted}/mo` : formatted
}

function typeLabel(type: string) {
  const map: Record<string, string> = {
    apartment: 'Apartment', villa: 'Villa', commercial: 'Commercial',
    land: 'Land', office: 'Office',
  }
  return map[type] ?? type
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const property = await getProperty(id)
  if (!property) return { title: 'Property Not Found' }
  return {
    title: `${property.title} — Rukun Real Estate`,
    description: property.description || `${typeLabel(property.type)} ${property.transaction_type === 'sale' ? 'for sale' : 'for rent'} in ${property.city || 'Lebanon'}`,
  }
}

export default async function PropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const property = await getProperty(id)
  if (!property) notFound()

  const price = formatPrice(property.price, property.currency, property.transaction_type)
  const location = property.location || [property.district, property.city].filter(Boolean).join(', ') || 'Lebanon'
  const propertyUrl = `https://rukunrealestate.com/properties/${property.id}`

  return (
    <>
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
              {/* Image */}
              <div className="rounded-2xl overflow-hidden bg-[#111] border border-white/5 h-80 flex items-center justify-center">
                {property.images?.[0] ? (
                  <img src={property.images[0]} alt={property.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="text-8xl opacity-5 font-heading text-brand-gold select-none">R</div>
                )}
              </div>

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
