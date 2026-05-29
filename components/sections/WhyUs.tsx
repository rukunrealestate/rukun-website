import { Shield, Clock, Star, Users } from 'lucide-react'

const reasons = [
  { icon: Shield, title: 'Trusted & Verified', desc: 'All our listings are personally verified. No surprises, no hidden fees.' },
  { icon: Clock, title: 'Fast Response', desc: 'Our agents respond within hours — never leave a lead waiting.' },
  { icon: Star, title: 'Premium Service', desc: 'White-glove service from first inquiry to final handover.' },
  { icon: Users, title: 'Local Experts', desc: 'Deep knowledge of every neighborhood across Lebanon.' },
]

export default function WhyUs() {
  return (
    <section className="section-padding bg-[#0A0A0A] relative overflow-hidden">
      {/* Gold accent */}
      <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-brand-gold/3 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <div>
            <p className="text-brand-gold text-sm font-medium tracking-widest uppercase mb-3">Why Choose Rukun</p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white leading-tight mb-5">
              Lebanon&apos;s Most
              <br />
              <span className="text-gold-gradient">Trusted Agency</span>
            </h2>
            <div className="gold-divider mb-6" />
            <p className="text-gray-400 leading-relaxed mb-8">
              With over a decade of experience in the Lebanese real estate market, Rukun has helped
              hundreds of families and investors find their perfect properties. We combine deep
              local knowledge with world-class service.
            </p>
            <a href="/contact"
              className="inline-flex items-center gap-2 bg-brand-gold hover:bg-brand-gold-light text-brand-black font-semibold px-7 py-3.5 rounded-xl transition-all">
              Start Your Search
            </a>
          </div>

          {/* Right: Reasons grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {reasons.map((r, i) => (
              <div key={i} className="p-6 rounded-2xl border border-white/5 bg-white/2 hover:border-brand-gold/20 transition-all">
                <div className="w-11 h-11 rounded-xl bg-brand-gold/10 flex items-center justify-center mb-4">
                  <r.icon size={20} className="text-brand-gold" />
                </div>
                <h3 className="font-heading font-semibold text-white mb-2">{r.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
