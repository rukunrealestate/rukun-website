import Link from 'next/link'
import { ArrowRight, Play } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0A] via-[#111111] to-[#0A0A0A]" />

      {/* Gold accent orbs */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-brand-gold/3 rounded-full blur-3xl" />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(#C9A96E 1px, transparent 1px), linear-gradient(90deg, #C9A96E 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center pt-20">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 border border-brand-gold/30 bg-brand-gold/5 rounded-full px-4 py-2 mb-8">
          <div className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse" />
          <span className="text-brand-gold text-xs font-medium tracking-wider uppercase">Premium Real Estate · Lebanon</span>
        </div>

        {/* Headline */}
        <h1 className="font-heading text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
          Find Your
          <br />
          <span className="text-gold-gradient">Dream Property</span>
          <br />
          in Lebanon
        </h1>

        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Rukun connects you with Lebanon&apos;s finest properties. From luxury apartments in Beirut
          to breathtaking mountain villas — your perfect home awaits.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/properties"
            className="inline-flex items-center gap-2 bg-brand-gold hover:bg-brand-gold-light text-brand-black font-semibold px-8 py-4 rounded-xl transition-all duration-200 hover:scale-105">
            Browse Properties
            <ArrowRight size={18} />
          </Link>
          <Link href="/contact"
            className="inline-flex items-center gap-2 border border-white/20 hover:border-brand-gold text-white hover:text-brand-gold font-medium px-8 py-4 rounded-xl transition-all duration-200">
            <Play size={16} />
            Talk to an Agent
          </Link>
        </div>

        {/* Property type pills */}
        <div className="flex flex-wrap justify-center gap-3 mt-14">
          {['Apartments', 'Villas', 'Commercial', 'Land', 'For Rent', 'For Sale'].map(tag => (
            <Link key={tag} href="/properties"
              className="text-xs text-gray-400 border border-white/10 hover:border-brand-gold/40 hover:text-brand-gold px-4 py-2 rounded-full transition-colors">
              {tag}
            </Link>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="mt-20 flex flex-col items-center gap-2 opacity-40">
          <div className="w-px h-12 bg-gradient-to-b from-transparent to-brand-gold" />
          <span className="text-[10px] tracking-widest text-brand-gold uppercase">Scroll</span>
        </div>
      </div>
    </section>
  )
}
