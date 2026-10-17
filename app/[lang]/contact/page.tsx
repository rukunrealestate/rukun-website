import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ContactSection from '@/components/sections/ContactSection'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { hasLocale, getDictionary, alternatesFor } from '@/lib/i18n'
import { pageOpenGraph, imageLang } from '@/lib/og'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  if (!hasLocale(lang)) return {}
  const t = getDictionary(lang).contactPage
  const ti = getDictionary(imageLang(lang)).contactPage
  return {
    title: t.metaTitle,
    description: t.metaDesc,
    alternates: alternatesFor(lang, '/contact'),
    ...pageOpenGraph(lang, { title: t.metaTitle, description: t.metaDesc, path: '/contact', image: { title: ti.title, kicker: ti.eyebrow, detail: '+961 3 709 240 · WhatsApp' } }),
  }
}

export default async function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = getDictionary(lang)
  const t = dict.contactPage

  return (
    <>
      <Navbar lang={lang} t={dict.nav} />
      <div className="pt-28 xl:pt-36">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-6 py-10 text-center">
          <p className="text-brand-gold text-sm font-medium tracking-widest uppercase mb-3">{t.eyebrow}</p>
          <h1 className="font-heading text-5xl font-bold text-white mb-3">{t.title}</h1>
          <div className="gold-divider mx-auto mb-4" />
          <p className="text-gray-400 max-w-lg mx-auto">{t.intro}</p>
        </div>

        {/* Info bar */}
        <div className="bg-brand-gold/5 border-y border-brand-gold/10 py-8 mb-4">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                { icon: Phone, label: t.phone, val: '+961 3 709 240', ltr: true },
                { icon: Mail, label: t.email, val: 'rukunleb@gmail.com', ltr: true },
                { icon: MapPin, label: t.location, val: t.locationVal },
                { icon: Clock, label: t.hours, val: t.hoursVal },
              ].map((c, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <c.icon size={18} className="text-brand-gold" />
                  <div className="text-xs text-gray-500">{c.label}</div>
                  <div className="text-white text-sm font-medium" dir={c.ltr ? 'ltr' : undefined}>{c.val}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <ContactSection t={dict.contact} lang={lang} />
      </div>
      <Footer lang={lang} />
    </>
  )
}
