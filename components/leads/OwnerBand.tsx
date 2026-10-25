import Link from 'next/link'
import { KeyRound, ArrowRight } from 'lucide-react'
import { getDictionary, localePath, type Locale } from '@/lib/i18n'
import { areaAt } from '@/lib/categories'

// Invitation for owners to list with Rukun (homepage, properties pages, and each area guide)
export default function OwnerBand({ lang, area }: { lang: Locale; area?: string }) {
  const t = getDictionary(lang).leads
  const at = area ? areaAt(area, lang) : ''
  return (
    <section className="max-w-7xl mx-auto px-6 my-16">
      <div className="rounded-2xl border border-brand-gold/20 bg-gradient-to-br from-brand-gold/10 to-transparent p-8 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-brand-gold/15 flex items-center justify-center shrink-0"><KeyRound className="text-brand-gold" size={22} /></div>
          <div>
            <h2 className="font-heading text-2xl font-bold text-white mb-1">{area ? t.ownerAreaBand.replace('{at}', at) : t.ownerBand}</h2>
            <p className="text-gray-400 max-w-xl">{area ? t.ownerAreaBandText : t.ownerBandText}</p>
          </div>
        </div>
        <Link href={localePath(lang, area ? `/list-your-property/${area}` : '/list-your-property')}
          className="inline-flex items-center justify-center gap-2 bg-brand-gold hover:bg-brand-gold-light text-brand-black font-semibold px-7 py-3.5 rounded-xl transition-colors whitespace-nowrap">
          {t.ownerBandCta} <ArrowRight size={16} className="rtl:rotate-180" />
        </Link>
      </div>
    </section>
  )
}
