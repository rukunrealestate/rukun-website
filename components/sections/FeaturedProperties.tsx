import Link from 'next/link'
import { MapPin, Bed, Bath, Square, ArrowRight } from 'lucide-react'
import { getProperties, formatPrice, typeLabel, propertyLocation } from '@/lib/properties'

export default async function FeaturedProperties() {
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
            <p className="text-brand-gold text-sm font-medium tracking-widest uppercase mb-3">Handpicked for You</p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white">
              Featured Properties
            </h2>
            <div className="gold-divider mt-4" />
          </div>
          <Link href="/properties" className="flex items-center gap-2 text-brand-gold hover:text-brand-gold-light text-sm font-medium transition-colors whitespace-nowrap">
            View All Properties <ArrowRight size={16} />
          </Link>
        </div>

        {/* Property Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {properties.map((p) => (
            <Link key={p.id} href={`/properties/${p.id}`} className="group rounded-2xl overflow-hidden border border-white/5 hover:border-brand-gold/20 transition-all duration-300 hover-lift bg-[#111] block">
              <div className="relative h-52 bg-gradient-to-br from-[#1a1a1a] to-[#222] flex items-center justify-center overflow-hidden">
                {p.images?.[0] ? (
                  <img src={p.images[0]} alt={p.title} loading="lazy" className="w-full h-full object-cover" />
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

              {/* Content */}
              <div className="p-5">
                <h3 className="font-heading font-semibold text-white text-lg mb-1 group-hover:text-brand-gold transition-colors">
                  {p.title}
                </h3>
                <div className="flex items-center gap-1.5 text-gray-400 text-xs mb-4">
                  <MapPin size={12} className="text-brand-gold" />
                  {propertyLocation(p)}
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
      </div>
    </section>
  )
}
