import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { MapPin, Bed, Bath, Square } from 'lucide-react'

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

async function getProperties(): Promise<Property[]> {
  try {
    const crmUrl = process.env.NEXT_PUBLIC_CRM_URL || 'https://crm.rukunrealestate.com'
    const res = await fetch(`${crmUrl}/api/properties`, {
      next: { revalidate: 60 },
    })
    if (!res.ok) return []
    const data = await res.json()
    return data.properties ?? []
  } catch {
    return []
  }
}

function formatPrice(price: number, currency: string, transaction_type: string) {
  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency', currency: currency === 'LBP' ? 'USD' : currency,
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

export default async function PropertiesPage() {
  const properties = await getProperties()

  return (
    <>
      <Navbar />
      <div className="pt-28 min-h-screen">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-6 mb-10">
          <p className="text-brand-gold text-sm font-medium tracking-widest uppercase mb-3">Our Listings</p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-2">All Properties</h1>
          <div className="gold-divider" />
        </div>

        {/* Grid */}
        <div className="max-w-7xl mx-auto px-6 pb-20">
          {properties.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-gray-400 text-lg mb-2">No properties listed yet.</p>
              <p className="text-gray-600 text-sm">Check back soon or contact us directly.</p>
              <Link href="/contact" className="inline-block mt-6 bg-brand-gold text-brand-black font-semibold px-6 py-3 rounded-xl text-sm hover:bg-brand-gold-light transition-colors">
                Contact Us
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((p) => (
                <Link key={p.id} href={`/properties/${p.id}`} className="group rounded-2xl overflow-hidden border border-white/5 hover:border-brand-gold/20 transition-all duration-300 hover-lift bg-[#111] block">
                  <div className="relative h-52 bg-gradient-to-br from-[#1a1a1a] to-[#222] flex items-center justify-center">
                    {p.images?.[0] ? (
                      <img src={p.images[0]} alt={p.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-6xl opacity-10 font-heading text-brand-gold">R</div>
                    )}
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                        p.transaction_type === 'sale' ? 'bg-brand-gold text-brand-black' : 'bg-brand-red text-white'
                      }`}>{p.transaction_type === 'sale' ? 'For Sale' : 'For Rent'}</span>
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/10 text-white">{typeLabel(p.type)}</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-heading font-semibold text-white text-lg mb-1 group-hover:text-brand-gold transition-colors">{p.title}</h3>
                    <div className="flex items-center gap-1.5 text-gray-400 text-xs mb-4">
                      <MapPin size={12} className="text-brand-gold" />
                      {p.location || [p.district, p.city].filter(Boolean).join(', ') || 'Lebanon'}
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
                      {p.bedrooms != null && p.bedrooms > 0 && <span className="flex items-center gap-1"><Bed size={13} />{p.bedrooms} Beds</span>}
                      {p.bathrooms != null && <span className="flex items-center gap-1"><Bath size={13} />{p.bathrooms} Baths</span>}
                      {p.area_sqm != null && <span className="flex items-center gap-1"><Square size={13} />{p.area_sqm} m²</span>}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-heading text-xl font-bold text-brand-gold">
                        {formatPrice(p.price, p.currency, p.transaction_type)}
                      </span>
                      <span className="text-xs text-gray-400 group-hover:text-brand-gold transition-colors font-medium">View Details →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}
