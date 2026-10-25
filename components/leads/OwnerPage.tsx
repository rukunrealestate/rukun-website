import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import Faq from '@/components/Faq'
import { Languages, ShieldCheck, FileSignature, Phone, BookOpen } from 'lucide-react'
import OwnerForm from '@/components/leads/OwnerForm'
import WhatsAppIcon from '@/components/leads/WhatsAppIcon'
import { getDictionary, localePath, type Locale } from '@/lib/i18n'
import { selectOptions } from '@/lib/options'
import { whatsappLink, PHONE_DISPLAY, PHONE_TEL } from '@/lib/contact'
import { getProperties, SITE_URL } from '@/lib/properties'
import { areaGuides, areaGuideKeys } from '@/lib/areaGuides'
import { areaAt, inArea } from '@/lib/categories'
import { ownerAreaText, ownerFaq, OWNER_GUIDES } from '@/lib/ownerPages'
import { getArticle } from '@/lib/blog'

const benefitIcons = [Languages, ShieldCheck, FileSignature]

// "List your property" for all of Lebanon, or for one area (/list-your-property/achrafieh)
export default async function OwnerPage({ lang, area }: { lang: Locale; area?: string }) {
  const dict = getDictionary(lang)
  const t = dict.leads
  const { typeOptions } = selectOptions(lang)
  const at = area ? areaAt(area, lang) : ''
  const properties = area ? (await getProperties()).filter((p) => inArea(p, area)) : []
  const faq = ownerFaq(lang, area ? { at, properties } : undefined)
  const guides = OWNER_GUIDES.map(getArticle).filter((a) => !!a)

  const path = area ? `/list-your-property/${area}` : '/list-your-property'
  const title = area ? t.ownerAreaTitle.replace('{at}', at) : t.ownerTitle
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: title,
    serviceType: 'Real estate brokerage for property owners',
    url: `${SITE_URL}${localePath(lang, path)}`,
    provider: { '@type': 'RealEstateAgent', name: 'Rukun Real Estate & Interior Design', url: SITE_URL, telephone: PHONE_DISPLAY },
    areaServed: area ? { '@type': 'Place', name: areaGuides[area].name.en } : { '@type': 'Country', name: 'Lebanon' },
    availableLanguage: ['en', 'ar', 'fr'],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <Navbar lang={lang} t={dict.nav} />
      <div className="pt-28 xl:pt-36 min-h-screen">
        <div className="max-w-7xl mx-auto px-6 pb-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Pitch */}
          <div>
            <p className="text-brand-gold text-sm font-medium tracking-widest uppercase mb-3">{t.ownerEyebrow}</p>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">{title}</h1>
            <div className="gold-divider mb-6" />
            {area && <p className="text-gray-400 text-lg leading-relaxed mb-4">{ownerAreaText[area][lang]}</p>}
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

        <div className="max-w-7xl mx-auto px-6 pb-20">
          <Faq items={faq} title={dict.faqTitle} />

          {guides.length > 0 && (
            <section className="mb-14">
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-6">{t.ownerGuides}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">
                {guides.map((a) => (
                  <Link key={a!.slug} href={localePath(lang, `/blog/${a!.slug}`)}
                    className="flex gap-4 rounded-xl border border-white/5 bg-white/3 hover:border-brand-gold/30 p-5 transition-colors">
                    <BookOpen size={20} className="text-brand-gold shrink-0 mt-0.5" />
                    <div>
                      <div className="text-white font-semibold mb-1">{a!.text[lang].title}</div>
                      <div className="text-gray-400 text-sm leading-relaxed">{a!.text[lang].description}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          <section>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-6">{t.ownerAreas}</h2>
            <div className="flex flex-wrap gap-2">
              {areaGuideKeys.filter((k) => k !== area).map((k) => (
                <Link key={k} href={localePath(lang, `/list-your-property/${k}`)}
                  className="text-sm text-gray-300 border border-white/10 hover:border-brand-gold/40 hover:text-brand-gold px-4 py-2 rounded-full transition-colors">
                  {t.ownerAreaTitle.replace('{at}', areaAt(k, lang))}
                </Link>
              ))}
              {area && (
                <Link href={localePath(lang, '/list-your-property')}
                  className="text-sm text-gray-300 border border-white/10 hover:border-brand-gold/40 hover:text-brand-gold px-4 py-2 rounded-full transition-colors">
                  {t.ownerNav}
                </Link>
              )}
            </div>
          </section>
        </div>
      </div>
      <Footer lang={lang} />
    </>
  )
}
