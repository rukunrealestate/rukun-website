import Link from 'next/link'
import { MapPin, Bed, Bath, Square, ArrowRight } from 'lucide-react'

const properties = [
  {
    title: 'Luxury Apartment — Achrafieh',
    price: '$450,000',
    location: 'Achrafieh, Beirut',
    beds: 3, baths: 2, area: 180,
    type: 'For Sale',
    tag: 'Featured',
  },
  {
    title: 'Modern Villa — Broummana',
    price: '$1,200,000',
    location: 'Broummana, Mount Lebanon',
    beds: 5, baths: 4, area: 450,
    type: 'For Sale',
    tag: 'New',
  },
  {
    title: 'Sea-View Apartment — Jounieh',
    price: '$2,500/mo',
    location: 'Jounieh, Keserwan',
    beds: 2, baths: 1, area: 120,
    type: 'For Rent',
    tag: '',
  },
]

export default function FeaturedProperties() {
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
          {properties.map((p, i) => (
            <div key={i} className="group rounded-2xl overflow-hidden border border-white/5 hover:border-brand-gold/20 transition-all duration-300 hover-lift bg-[#111]">
              {/* Image placeholder */}
              <div className="relative h-52 bg-gradient-to-br from-[#1a1a1a] to-[#222] flex items-center justify-center overflow-hidden">
                <div className="text-6xl opacity-10 font-heading text-brand-gold">R</div>
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    p.type === 'For Sale' ? 'bg-brand-gold text-brand-black' : 'bg-brand-red text-white'
                  }`}>{p.type}</span>
                  {p.tag && <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/10 text-white">{p.tag}</span>}
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-heading font-semibold text-white text-lg mb-1 group-hover:text-brand-gold transition-colors">
                  {p.title}
                </h3>
                <div className="flex items-center gap-1.5 text-gray-400 text-xs mb-4">
                  <MapPin size={12} className="text-brand-gold" />
                  {p.location}
                </div>
                <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
                  <span className="flex items-center gap-1"><Bed size={13} />{p.beds} Beds</span>
                  <span className="flex items-center gap-1"><Bath size={13} />{p.baths} Baths</span>
                  <span className="flex items-center gap-1"><Square size={13} />{p.area} m²</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-heading text-xl font-bold text-brand-gold">{p.price}</span>
                  <Link href="/contact" className="text-xs text-gray-400 hover:text-brand-gold transition-colors font-medium">
                    Inquire →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
