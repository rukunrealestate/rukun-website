import { getDictionary, localePath, type Locale } from '@/lib/i18n'
import { getProperties, cardTitle, formatPrice, propertyLocation, propertyPath } from '@/lib/properties'
import { selectOptions } from '@/lib/options'
import HeroSearch from './HeroSearch'
import HeroSlides, { type Slide } from './HeroSlides'

// Background photos from the listings (listing id, photo position in the CRM): interiors alternating
// with open views. A listing that goes offline simply drops out of the slideshow.
const HERO_PHOTOS: [string, number][] = [
  ['040b3af1-90b2-4c74-884e-5ecaf17efeb7', 1], // Zeitouna Bay, living room with sea view (shown first)
  ['c44ea87d-f7bf-4107-b340-f993e273ecfc', 3], // Beit Mery, balcony over Beirut and the sea
  ['01c91824-07ca-4e49-b10c-52d77115b0b6', 5], // Dayshouneyye, new kitchen (high resolution)
  ['040b3af1-90b2-4c74-884e-5ecaf17efeb7', 8], // Zeitouna Bay, modern open-plan living and kitchen
  ['c44ea87d-f7bf-4107-b340-f993e273ecfc', 7], // Beit Mery, furnished living room
  ['01c91824-07ca-4e49-b10c-52d77115b0b6', 9], // Dayshouneyye, bright living room with a big window (high resolution)
  ['886130a8-f525-4d46-b8a2-23496d0b8155', 8], // Baabdat, balcony over the pines
]

// Opening section: rotating listing photos, welcome line and the Buy/Rent search
export default async function Hero({ lang }: { lang: Locale }) {
  const t = getDictionary(lang).hero
  const all = await getProperties()
  const [before, after] = t.available.split('{n}')

  const slides: Slide[] = HERO_PHOTOS.flatMap(([id, n]) => {
    const p = all.find((x) => x.id === id)
    const src = p?.images?.[n]
    return p && src ? [{
      src,
      href: localePath(lang, propertyPath(p)),
      caption: `${cardTitle(p, lang)} · ${propertyLocation(p)}`,
      price: formatPrice(p.price, p.currency, p.transaction_type, lang),
    }] : []
  })

  return (
    <HeroSlides slides={slides} label={t.featuredPhoto}>
      <p className="text-brand-gold-light text-xs font-semibold tracking-[0.2em] uppercase mb-4">{t.where}</p>
      <h1 className="font-heading text-4xl md:text-6xl xl:text-7xl font-bold text-white leading-[1.04] mb-5 max-w-3xl text-balance">{t.headline}</h1>
      <p className="text-gray-200 text-base md:text-lg max-w-xl mb-8 leading-relaxed">{t.sub}</p>
      <HeroSearch
        action={localePath(lang, '/properties')}
        t={t}
        typeOptions={selectOptions(lang).typeOptions}
        areaOptions={selectOptions(lang).areaOptions}
      />
      <div className="flex flex-wrap gap-x-6 gap-y-1 mt-6 text-[13px] text-gray-300">
        {all.length > 0 && <span>{before}<b className="text-white font-semibold">{all.length}</b>{after}</span>}
        <span>{t.languages}</span>
      </div>
    </HeroSlides>
  )
}
