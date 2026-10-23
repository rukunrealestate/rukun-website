import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { getDictionary, localePath, type Locale } from '@/lib/i18n'
import { getProperties, cardPhoto } from '@/lib/properties'
import { inArea } from '@/lib/categories'
import { areaGuides } from '@/lib/areaGuides'
import { skipOptimization } from '@/lib/images'

// Achrafieh is part of Beirut, so it isn't a separate tile here
const AREAS = ['beirut', 'metn', 'keserwan', 'jbeil', 'aley']

// "Browse by area": photo tiles with live listing counts, linking to the area guides
export default async function AreasBrowse({ lang }: { lang: Locale }) {
  const t = getDictionary(lang).areasHome
  const all = await getProperties()
  const tiles = AREAS
    .map((key) => {
      const list = all.filter((p) => inArea(p, key))
      // A plain room photo (the second image), since the cover post's text would sit under the area name
      const withPhoto = list.find((p) => p.images?.length)
      return { key, count: list.length, photo: withPhoto?.images[1] ?? cardPhoto(withPhoto) }
    })
    .filter((a) => a.count > 0 && a.photo)
    .sort((a, b) => b.count - a.count)
    .slice(0, 4)

  if (tiles.length === 0) return null

  return (
    <section className="py-16 md:py-24 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-brand-gold text-xs font-bold tracking-[0.18em] uppercase mb-2">{t.eyebrow}</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white">{t.title}</h2>
          </div>
          <Link href={localePath(lang, '/areas')} className="flex items-center gap-2 text-brand-gold hover:text-brand-gold-light text-sm font-medium transition-colors whitespace-nowrap">
            {t.all} <ArrowRight size={16} className="rtl:rotate-180" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-[2fr_1fr_1fr] auto-rows-[160px] md:auto-rows-[200px] gap-3 md:gap-4">
          {tiles.map((a, i) => (
            <Link key={a.key} href={localePath(lang, `/areas/${a.key}`)}
              className={`group relative overflow-hidden rounded-[4px] ${i === 0 ? 'col-span-2 md:col-span-1 md:row-span-2' : ''}`}>
              <Image src={a.photo!} alt={areaGuides[a.key].name[lang]} fill unoptimized={skipOptimization(a.photo!)}
                sizes={i === 0 ? '(min-width: 768px) 600px, 100vw' : '(min-width: 768px) 300px, 50vw'}
                className="object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/85" />
              <div className="absolute bottom-0 inset-x-0 p-4 md:p-5">
                <div className="font-heading text-2xl md:text-3xl font-bold text-white leading-tight">{areaGuides[a.key].name[lang]}</div>
                <div className="text-brand-gold-light text-[13px]">{a.count === 1 ? t.one : t.many.replace('{n}', String(a.count))}</div>
              </div>
            </Link>
          ))}
          <Link href={localePath(lang, '/properties')}
            className="relative flex flex-col justify-end p-4 md:p-5 rounded-[4px] border border-white/10 hover:border-brand-gold/40 transition-colors">
            <div className="font-heading text-2xl md:text-3xl font-bold text-brand-gold leading-tight">{t.allProps.replace('{n}', String(all.length))}</div>
            <div className="text-gray-400 text-[13px]">{t.allSub}</div>
          </Link>
        </div>
      </div>
    </section>
  )
}
