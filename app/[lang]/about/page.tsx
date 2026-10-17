import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { Award, Users, MapPin, Heart } from 'lucide-react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { hasLocale, getDictionary, alternatesFor, localePath } from '@/lib/i18n'
import { pageOpenGraph, imageLang } from '@/lib/og'

const valueIcons = [Award, Users, MapPin, Heart]
const teamNames = ['Mirna Itani', 'Fadi Touma']

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  if (!hasLocale(lang)) return {}
  const t = getDictionary(lang).about
  const di = getDictionary(imageLang(lang))
  return {
    title: t.metaTitle,
    description: t.metaDesc,
    alternates: alternatesFor(lang, '/about'),
    ...pageOpenGraph(lang, { title: t.metaTitle, description: t.metaDesc, path: '/about', image: { title: di.about.title, kicker: di.about.eyebrow, detail: di.footer.bottom } }),
  }
}

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = getDictionary(lang)
  const t = dict.about

  return (
    <>
      <Navbar lang={lang} t={dict.nav} />
      <div className="pt-28 xl:pt-36 min-h-screen">
        {/* Hero */}
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">
          <p className="text-brand-gold text-sm font-medium tracking-widest uppercase mb-3">{t.eyebrow}</p>
          <h1 className="font-heading text-5xl md:text-6xl font-bold text-white mb-4">{t.title}</h1>
          <div className="gold-divider mx-auto mb-6" />
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">{t.intro}</p>
        </div>

        {/* Mission */}
        <div className="bg-brand-gold/5 border-y border-brand-gold/10">
          <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">{t.missionTitle}</h2>
              <p className="text-gray-400 leading-relaxed mb-4">{t.mission1}</p>
              <p className="text-gray-400 leading-relaxed">{t.mission2}</p>
            </div>
            <div className="grid grid-cols-2 gap-5">
              {t.values.map((v, i) => {
                const Icon = valueIcons[i]
                return (
                  <div key={i} className="p-5 rounded-2xl border border-white/5 bg-white/2 text-center">
                    <div className="w-10 h-10 rounded-xl bg-brand-gold/10 flex items-center justify-center mx-auto mb-3">
                      <Icon size={18} className="text-brand-gold" />
                    </div>
                    <div className="font-heading font-semibold text-white text-sm mb-1">{v.title}</div>
                    <div className="text-gray-400 text-xs">{v.desc}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Team */}
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold text-white mb-3">{t.teamTitle}</h2>
            <div className="gold-divider mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {t.team.map((m, i) => (
              <div key={i} className="text-center p-8 rounded-2xl border border-white/5 bg-white/2 hover:border-brand-gold/20 transition-all">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-brand-gold/20 to-brand-gold/5 flex items-center justify-center mx-auto mb-4">
                  <span className="font-heading font-bold text-brand-gold text-2xl">{teamNames[i][0]}</span>
                </div>
                <h3 className="font-heading font-semibold text-white text-lg mb-1">{teamNames[i]}</h3>
                <p className="text-brand-gold text-sm mb-3">{m.role}</p>
                <p className="text-gray-400 text-sm">{m.note}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="max-w-7xl mx-auto px-6 pb-20 text-center">
          <div className="bg-brand-gold/5 border border-brand-gold/20 rounded-3xl p-12">
            <h2 className="font-heading text-3xl font-bold text-white mb-3">{t.ctaTitle}</h2>
            <p className="text-gray-400 mb-8">{t.ctaText}</p>
            <Link href={localePath(lang, '/contact')}
              className="inline-flex items-center gap-2 bg-brand-gold hover:bg-brand-gold-light text-brand-black font-semibold px-8 py-4 rounded-xl transition-all">
              {t.ctaButton}
            </Link>
          </div>
        </div>
      </div>
      <Footer lang={lang} />
    </>
  )
}
