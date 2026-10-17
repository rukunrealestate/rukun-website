import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Languages, ShieldCheck, FileSignature, Phone } from 'lucide-react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import OwnerForm from '@/components/leads/OwnerForm'
import WhatsAppIcon from '@/components/leads/WhatsAppIcon'
import { hasLocale, getDictionary, alternatesFor } from '@/lib/i18n'
import { pageOpenGraph, imageLang } from '@/lib/og'
import { selectOptions } from '@/lib/options'
import { whatsappLink, PHONE_DISPLAY, PHONE_TEL } from '@/lib/contact'

const benefitIcons = [Languages, ShieldCheck, FileSignature]

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  if (!hasLocale(lang)) return {}
  const t = getDictionary(lang).leads
  const ti = getDictionary(imageLang(lang)).leads
  return {
    title: t.ownerMetaTitle,
    description: t.ownerMetaDesc,
    alternates: alternatesFor(lang, '/list-your-property'),
    ...pageOpenGraph(lang, { title: t.ownerMetaTitle, description: t.ownerMetaDesc, path: '/list-your-property', image: { title: ti.ownerTitle, kicker: ti.ownerEyebrow } }),
  }
}

export default async function ListYourPropertyPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = getDictionary(lang)
  const t = dict.leads
  const { typeOptions } = selectOptions(lang)

  return (
    <>
      <Navbar lang={lang} t={dict.nav} />
      <div className="pt-28 xl:pt-36 min-h-screen">
        <div className="max-w-7xl mx-auto px-6 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Pitch */}
          <div>
            <p className="text-brand-gold text-sm font-medium tracking-widest uppercase mb-3">{t.ownerEyebrow}</p>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">{t.ownerTitle}</h1>
            <div className="gold-divider mb-6" />
            <p className="text-gray-400 text-lg leading-relaxed mb-10">{t.ownerIntro}</p>
            <div className="space-y-5 mb-10">
              {t.ownerBenefits.map((b, i) => {
                const Icon = benefitIcons[i]
                return (
                  <div key={i} className="flex gap-4">
                    <div className="w-11 h-11 rounded-xl bg-brand-gold/10 flex items-center justify-center shrink-0"><Icon size={20} className="text-brand-gold" /></div>
                    <div>
                      <h2 className="font-heading font-semibold text-white mb-1">{b.title}</h2>
                      <p className="text-gray-400 text-sm leading-relaxed">{b.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="flex flex-wrap gap-3">
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] text-white font-semibold px-5 py-3 rounded-xl text-sm">
                <WhatsAppIcon size={17} /> {t.whatsapp}
              </a>
              <a href={`tel:${PHONE_TEL}`} className="inline-flex items-center gap-2 border border-white/10 hover:border-brand-gold/40 text-white font-semibold px-5 py-3 rounded-xl text-sm">
                <Phone size={16} /> <span dir="ltr">{PHONE_DISPLAY}</span>
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white/3 border border-white/5 rounded-3xl p-8 h-fit">
            <OwnerForm t={t} lang={lang} typeOptions={typeOptions} />
          </div>
        </div>
      </div>
      <Footer lang={lang} />
    </>
  )
}
