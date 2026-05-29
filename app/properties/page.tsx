import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { MapPin, Bed, Bath, Square } from 'lucide-react'

const properties = [
  { title: 'Luxury Apartment — Achrafieh', price: '$450,000', location: 'Achrafieh, Beirut', beds: 3, baths: 2, area: 180, type: 'For Sale', category: 'Apartment' },
  { title: 'Modern Villa — Broummana', price: '$1,200,000', location: 'Broummana, Mount Lebanon', beds: 5, baths: 4, area: 450, type: 'For Sale', category: 'Villa' },
  { title: 'Sea-View Apartment — Jounieh', price: '$2,500/mo', location: 'Jounieh, Keserwan', beds: 2, baths: 1, area: 120, type: 'For Rent', category: 'Apartment' },
  { title: 'Office Space — Downtown Beirut', price: '$3,000/mo', location: 'Downtown, Beirut', beds: 0, baths: 2, area: 200, type: 'For Rent', category: 'Commercial' },
  { title: 'Mountain Chalet — Faraya', price: '$380,000', location: 'Faraya, Mount Lebanon', beds: 4, baths: 3, area: 280, type: 'For Sale', category: 'Villa' },
  { title: 'Studio Apartment — Hamra', price: '$900/mo', location: 'Hamra, Beirut', beds: 1, baths: 1, area: 65, type: 'For Rent', category: 'Apartment' },
]

export default function PropertiesPage() {
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

        {/* Filters */}
        <div className="max-w-7xl mx-auto px-6 mb-10 flex flex-wrap gap-3">
          {['All', 'For Sale', 'For Rent', 'Apartment', 'Villa', 'Commercial'].map(f => (
            <button key={f}
              className="text-sm px-4 py-2 rounded-full border border-brand-gold/30 text-brand-gold hover:bg-brand-gold hover:text-brand-black transition-colors">
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="max-w-7xl mx-auto px-6 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((p, i) => (
              <div key={i} className="group rounded-2xl overflow-hidden border border-white/5 hover:border-brand-gold/20 transition-all duration-300 hover-lift bg-[#111]">
                <div className="relative h-52 bg-gradient-to-br from-[#1a1a1a] to-[#222] flex items-center justify-center">
                  <div className="text-6xl opacity-10 font-heading text-brand-gold">R</div>
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                      p.type === 'For Sale' ? 'bg-brand-gold text-brand-black' : 'bg-brand-red text-white'
                    }`}>{p.type}</span>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/10 text-white">{p.category}</span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-heading font-semibold text-white text-lg mb-1 group-hover:text-brand-gold transition-colors">{p.title}</h3>
                  <div className="flex items-center gap-1.5 text-gray-400 text-xs mb-4">
                    <MapPin size={12} className="text-brand-gold" />{p.location}
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
                    {p.beds > 0 && <span className="flex items-center gap-1"><Bed size={13} />{p.beds} Beds</span>}
                    <span className="flex items-center gap-1"><Bath size={13} />{p.baths} Baths</span>
                    <span className="flex items-center gap-1"><Square size={13} />{p.area} m²</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-heading text-xl font-bold text-brand-gold">{p.price}</span>
                    <Link href="/contact" className="text-xs text-gray-400 hover:text-brand-gold transition-colors font-medium">Inquire →</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
