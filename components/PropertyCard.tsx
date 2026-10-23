import Link from 'next/link'
import Image from 'next/image'
import { getDictionary, localePath, type Locale } from '@/lib/i18n'
import { formatPrice, cardTitle, cardPhoto, localizedTitle, propertyLocation, propertyPath, SITE_URL, type Property } from '@/lib/properties'
import { skipOptimization } from '@/lib/images'
import CardActions from '@/components/leads/CardActions'

// tone: 'dark' on the black pages, 'light' on the warm-white listing sections
export default function PropertyCard({ p, lang, tone = 'dark' }: { p: Property; lang: Locale; tone?: 'dark' | 'light' }) {
  const dict = getDictionary(lang)
  const t = dict.props
  const title = localizedTitle(p, lang)
  const short = cardTitle(p, lang)
  const href = localePath(lang, propertyPath(p))
  const light = tone === 'light'
  const photo = cardPhoto(p)
  const price = formatPrice(p.price, p.currency, 'sale', lang)
  const perMonth = { en: '/ month', ar: 'شهرياً', fr: '/ mois' }[lang]
  const specs = [
    p.bedrooms ? [p.bedrooms, t.beds] : null,
    p.bathrooms ? [p.bathrooms, t.baths] : null,
    p.area_sqm ? [p.area_sqm, 'm²'] : null,
  ].filter(Boolean) as [number, string][]

  return (
    <div className={`group flex flex-col overflow-hidden rounded-[4px] transition-shadow duration-300 ${
      light ? 'bg-white shadow-[0_0_0_1px_#E8E1D5] hover:shadow-[0_0_0_1px_#D9CDB8,0_18px_36px_-18px_rgba(22,19,15,0.35)]'
        : 'bg-[#111] border border-white/[0.06] hover:border-brand-gold/25'}`}>
      <Link href={href} className="block flex-1" title={title}>
        {/* Square, like the cover posts, so the whole cover shows without cropping */}
        <div className="relative aspect-square overflow-hidden bg-[#1a1a1a]">
          {photo ? (
            <Image src={photo} alt={title} fill unoptimized={skipOptimization(photo)}
              sizes="(min-width: 1024px) 400px, (min-width: 768px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-10 font-heading text-brand-gold">R</div>
          )}
        </div>
        <div className="px-4 pt-4 pb-4">
          <span className={`inline-block mb-2 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] ${
            p.transaction_type === 'sale' ? 'bg-brand-black text-brand-gold-light' : 'bg-brand-red text-white'
          }`}>{p.transaction_type === 'sale' ? t.forSale : t.forRent}</span>
          <div className={`text-[22px] font-bold leading-tight tracking-tight tabular-nums ${light ? 'text-[#16130F]' : 'text-white'}`} dir="ltr">
            {price}{p.transaction_type === 'rent' && <span className="text-sm font-medium opacity-70"> {perMonth}</span>}
          </div>
          <h3 className={`mt-1 text-[15px] font-semibold ${light ? 'text-[#16130F]' : 'text-[#EDE6DA]'} group-hover:text-brand-gold transition-colors`}>{short}</h3>
          <p className={`text-[13px] ${light ? 'text-[#6B6358]' : 'text-gray-400'}`}>{propertyLocation(p)}</p>
          {specs.length > 0 && (
            <div className={`mt-3 pt-3 flex flex-wrap gap-x-4 gap-y-1 text-[12.5px] border-t ${light ? 'border-[#EFE9DF] text-[#6B6358]' : 'border-white/[0.06] text-gray-400'}`}>
              {specs.map(([n, label]) => <span key={label}><b className={`font-semibold ${light ? 'text-[#16130F]' : 'text-gray-200'}`}>{n}</b> {label}</span>)}
            </div>
          )}
        </div>
      </Link>
      <CardActions
        waText={`${dict.leads.waListing} ${title} — ${SITE_URL}${href}`}
        propertyId={p.id}
        whatsappLabel={dict.leads.whatsapp}
        callLabel={dict.leads.call}
        tone={tone}
      />
    </div>
  )
}
