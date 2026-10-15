import Link from 'next/link'
import { ArrowRight, Play } from 'lucide-react'
import { getDictionary, localePath, type Locale } from '@/lib/i18n'

export default function Hero({ lang }: { lang: Locale }) {
  const t = getDictionary(lang).hero
  const href = (path: string) => localePath(lang, path)
  const pills = [
    { label: t.apartmentsSale, slug: 'apartments-for-sale' },
    { label: t.apartmentsRent, slug: 'apartments-for-rent' },
    { label: t.offices, slug: 'offices-for-rent' },
    { label: t.land, slug: 'land-for-sale' },
    { label: t.forSale, slug: 'for-sale' },
    { label: t.forRent, slug: 'for-rent' },
  ]

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
          <span className="text-brand-gold text-xs font-medium tracking-wider uppercase">{t.badge}</span>
        </div>

        {/* Headline */}
        <h1 className="font-heading text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
          {t.h1a}
          <br />
          <span className="text-gold-gradient">{t.h1b}</span>
          <br />
          {t.h1c}
        </h1>

        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">{t.intro}</p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href={href('/properties')}
            className="inline-flex items-center gap-2 bg-brand-gold hover:bg-brand-gold-light text-brand-black font-semibold px-8 py-4 rounded-xl transition-all duration-200 hover:scale-105">
            {t.browse}
            <ArrowRight size={18} className="rtl:rotate-180" />
          </Link>
          <Link href={href('/contact')}
            className="inline-flex items-center gap-2 border border-white/20 hover:border-brand-gold text-white hover:text-brand-gold font-medium px-8 py-4 rounded-xl transition-all duration-200">
            <Play size={16} className="rtl:rotate-180" />
            {t.talk}
          </Link>
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap justify-center gap-3 mt-14">
          {pills.map(pill => (
            <Link key={pill.slug} href={href(`/properties/${pill.slug}`)}
              className="text-xs text-gray-400 border border-white/10 hover:border-brand-gold/40 hover:text-brand-gold px-4 py-2 rounded-full transition-colors">
              {pill.label}
            </Link>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="mt-20 flex flex-col items-center gap-2 opacity-40">
          <div className="w-px h-12 bg-gradient-to-b from-transparent to-brand-gold" />
          <span className="text-[10px] tracking-widest text-brand-gold uppercase">{t.scroll}</span>
        </div>
      </div>
    </section>
  )
}
