import { Home, Palette, Search, TrendingUp, Key, HeartHandshake } from 'lucide-react'

const services = [
  {
    icon: Search,
    title: 'Property Search',
    desc: 'We find the perfect property matching your needs, budget, and lifestyle across all of Lebanon.',
  },
  {
    icon: Key,
    title: 'Buy & Sell',
    desc: 'Expert guidance through every step of buying or selling — from valuation to closing.',
  },
  {
    icon: Home,
    title: 'Property Rental',
    desc: 'Short and long-term rentals for apartments, villas, and commercial spaces Lebanon-wide.',
  },
  {
    icon: Palette,
    title: 'Interior Design',
    desc: 'Bespoke interior design services that transform your space into a stunning, functional home.',
  },
  {
    icon: TrendingUp,
    title: 'Investment Advisory',
    desc: 'Smart real estate investment strategies tailored to the Lebanese market and your goals.',
  },
  {
    icon: HeartHandshake,
    title: 'Property Management',
    desc: 'Full-service management for landlords — we handle everything so you don\'t have to.',
  },
]

export default function Services() {
  return (
    <section id="services" className="section-padding bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-brand-gold text-sm font-medium tracking-widest uppercase mb-3">What We Do</p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
            Our Services
          </h2>
          <div className="gold-divider mx-auto mb-5" />
          <p className="text-gray-400 max-w-xl mx-auto">
            Comprehensive real estate and design solutions tailored to the Lebanese market.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <div key={i} className="group p-7 rounded-2xl border border-white/5 bg-white/2 hover:border-brand-gold/30 hover:bg-brand-gold/3 transition-all duration-300 hover-lift">
              <div className="w-12 h-12 rounded-xl bg-brand-gold/10 flex items-center justify-center mb-5 group-hover:bg-brand-gold/20 transition-colors">
                <service.icon size={22} className="text-brand-gold" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-white mb-3">{service.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
