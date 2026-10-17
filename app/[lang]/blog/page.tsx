import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { hasLocale, getDictionary, alternatesFor, localePath } from '@/lib/i18n'
import { articles } from '@/lib/blog'
import { pageOpenGraph, imageLang } from '@/lib/og'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  if (!hasLocale(lang)) return {}
  const t = getDictionary(lang).blog
  const ti = getDictionary(imageLang(lang)).blog
  return {
    title: t.indexTitle,
    description: t.indexDesc,
    alternates: alternatesFor(lang, '/blog'),
    ...pageOpenGraph(lang, { title: t.indexTitle, description: t.indexDesc, path: '/blog', image: { title: ti.indexTitle, kicker: ti.eyebrow } }),
  }
}

export default async function BlogIndexPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = getDictionary(lang)
  const t = dict.blog

  return (
    <>
      <Navbar lang={lang} t={dict.nav} />
      <div className="pt-28 xl:pt-36 min-h-screen">
        <div className="max-w-7xl mx-auto px-6 mb-12">
          <p className="text-brand-gold text-sm font-medium tracking-widest uppercase mb-3">{t.eyebrow}</p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-2">{t.indexTitle}</h1>
          <div className="gold-divider mb-6" />
          <p className="text-gray-400 max-w-3xl leading-relaxed">{t.indexIntro}</p>
        </div>

        <div className="max-w-7xl mx-auto px-6 pb-20 grid grid-cols-1 md:grid-cols-2 gap-6">
          {articles.map((a) => {
            const text = a.text[lang]
            return (
              <Link key={a.slug} href={localePath(lang, `/blog/${a.slug}`)}
                className="group p-7 rounded-2xl border border-white/5 bg-white/2 hover:border-brand-gold/30 transition-all hover-lift block">
                <div className="text-xs text-gray-500 mb-3">{t.minRead.replace('{n}', String(a.readMinutes))}</div>
                <h2 className="font-heading text-xl font-semibold text-white group-hover:text-brand-gold transition-colors mb-3">{text.title}</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">{text.description}</p>
                <span className="inline-flex items-center gap-1 text-sm text-brand-gold">
                  {t.readMore} <ArrowRight size={14} className="rtl:rotate-180" />
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
