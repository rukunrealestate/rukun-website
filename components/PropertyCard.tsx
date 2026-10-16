import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Bed, Bath, Square } from 'lucide-react'
import { getDictionary, localePath, type Locale } from '@/lib/i18n'
import { formatPrice, typeLabel, propertyKind, propertyLocation, propertyPath, localizedTitle, type Property } from '@/lib/properties'
import { skipOptimization } from '@/lib/images'

export default function PropertyCard({ p, lang }: { p: Property; lang: Locale }) {
  const t = getDictionary(lang).props
  const title = localizedTitle(p, lang)
  return (
    <Link href={localePath(lang, propertyPath(p))} className="group rounded-2xl overflow-hidden border border-white/5 hover:border-brand-gold/20 transition-all duration-300 hover-lift bg-[#111] block">
      <div className="relative h-52 bg-gradient-to-br from-[#1a1a1a] to-[#222] flex items-center justify-center overflow-hidden">
        {p.images?.[0] ? (
          <Image src={p.images[0]} alt={title} fill unoptimized={skipOptimization(p.images[0])}
            sizes="(min-width: 1024px) 400px, (min-width: 768px) 50vw, 100vw" className="object-cover" />
        ) : (
          <div className="text-6xl opacity-10 font-heading text-brand-gold">R</div>
        )}
        <div className="absolute top-3 start-3 flex gap-2">
          <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
            p.transaction_type === 'sale' ? 'bg-brand-gold text-brand-black' : 'bg-brand-red text-white'
          }`}>{p.transaction_type === 'sale' ? t.forSale : t.forRent}</span>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/10 text-white">{typeLabel(propertyKind(p), lang)}</span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-heading font-semibold text-white text-lg mb-1 group-hover:text-brand-gold transition-colors" dir="auto">{title}</h3>
        <div className="flex items-center gap-1.5 text-gray-400 text-xs mb-4">
          <MapPin size={12} className="text-brand-gold" />
          {propertyLocation(p)}
        </div>
        <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
          {p.bedrooms != null && p.bedrooms > 0 && <span className="flex items-center gap-1"><Bed size={13} />{p.bedrooms} {t.beds}</span>}
          {p.bathrooms != null && <span className="flex items-center gap-1"><Bath size={13} />{p.bathrooms} {t.baths}</span>}
          {p.area_sqm != null && <span className="flex items-center gap-1"><Square size={13} />{p.area_sqm} m²</span>}
        </div>
        <div className="flex items-center justify-between">
          <span className="font-heading text-xl font-bold text-brand-gold" dir="ltr">
            {formatPrice(p.price, p.currency, p.transaction_type, lang)}
          </span>
          <span className="text-xs text-gray-400 group-hover:text-brand-gold transition-colors font-medium">{t.viewDetails}</span>
        </div>
      </div>
    </Link>
  )
}
