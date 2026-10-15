import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getProperties } from '@/lib/properties'
import { hasLocale, getDictionary, alternatesFor, localePath } from '@/lib/i18n'
import { areaGuides, areaGuideKeys } from '@/lib/areaGuides'
import { inArea } from '@/lib/categories'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  if (!hasLocale(lang)) return {}
  const t = getDictionary(lang).areas
  return { title: t.indexTitle, description: t.indexDesc, alternates: alternatesFor(lang, '/areas') }
}

export default async function AreasPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = getDictionary(lang)
  const t = dict.areas
  const properties = await getProperties()

  return (
    <>
      <Navbar lang={lang} t={dict.nav} />
      <div className="pt-28 min-h-screen">
        <div className="max-w-7xl mx-auto px-6 mb-12">
          <p className="text-brand-gold text-sm font-medium tracking-widest uppercase mb-3">{t.nav}</p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-2">{t.indexTitle}</h1>
          <div className="gold-divider mb-6" />
          <p className="text-gray-400 max-w-3xl leading-relaxed">{t.indexIntro}</p>
        </div>

        <div className="max-w-7xl mx-auto px-6 pb-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {areaGuideKeys.map((key) => {
            const guide = areaGuides[key]
            const count = properties.filter((p) => inArea(p, key)).length
            return (
              <Link key={key} href={localePath(lang, `/areas/${key}`)}
                className="group p-7 rounded-2xl border border-white/5 bg-white/2 hover:border-brand-gold/30 transition-all hover-lift block">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="font-heading text-xl font-semibold text-white group-hover:text-brand-gold transition-colors">{guide.name[lang]}</h2>
                  <span className="text-xs text-brand-gold">{t.listings.replace('{n}', String(count))}</span>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed line-clamp-4 mb-4">{guide.intro[lang][0]}</p>
                <span className="inline-flex items-center gap-1 text-sm text-brand-gold">
                  {t.readGuide.replace('{area}', guide.name[lang])} <ArrowRight size={14} className="rtl:rotate-180" />
                </span>
              </Link>
            )
          })}
        </div>
      </div>
      <Footer lang={lang} />
    </>
  )
}
