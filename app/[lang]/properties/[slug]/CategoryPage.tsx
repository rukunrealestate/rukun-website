import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import PropertyCard from '@/components/PropertyCard'
import CategoryLinks from '@/components/CategoryLinks'
import { getProperties, SITE_URL } from '@/lib/properties'
import { getDictionary, localePath, type Locale } from '@/lib/i18n'
import { categoryTitle, categoryIntro, matchesCategory, type Category } from '@/lib/categories'
import { categoryFaq } from '@/lib/faq'
import { areaGuides } from '@/lib/areaGuides'
import Faq from '@/components/Faq'
import AlertForm from '@/components/leads/AlertForm'
import { selectOptions } from '@/lib/options'

const GROUP_TO_TYPE: Record<string, string> = { apartments: 'apartment', villas: 'villa', offices: 'office', commercial: 'commercial', land: 'land' }

export default async function CategoryPage({ lang, category }: { lang: Locale; category: Category }) {
  const dict = getDictionary(lang)
  const t = dict.props
  const all = await getProperties()
  const properties = all.filter((p) => matchesCategory(p, category))
  const title = categoryTitle(category, lang)

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: dict.nav.home, item: `${SITE_URL}${localePath(lang, '/')}` },
      { '@type': 'ListItem', position: 2, name: dict.nav.properties, item: `${SITE_URL}${localePath(lang, '/properties')}` },
      { '@type': 'ListItem', position: 3, name: title, item: `${SITE_URL}${localePath(lang, `/properties/${category.slug}`)}` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Navbar lang={lang} t={dict.nav} />
      <div className="pt-28 xl:pt-36 min-h-screen">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-6 mb-10">
          <Link href={localePath(lang, '/properties')} className="inline-flex items-center gap-2 text-gray-400 hover:text-brand-gold transition-colors text-sm mb-6">
            <ArrowLeft size={15} className="rtl:rotate-180" /> {t.back}
          </Link>
          <p className="text-brand-gold text-sm font-medium tracking-widest uppercase mb-3">
            {t.count.replace('{n}', String(properties.length))}
          </p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-2">{title}</h1>
          <div className="gold-divider mb-6" />
          <p className="text-gray-400 max-w-3xl leading-relaxed">{categoryIntro(category, lang, properties.length)}</p>
          {category.area && areaGuides[category.area] && (
            <Link href={localePath(lang, `/areas/${category.area}`)} className="inline-block mt-4 text-sm text-brand-gold hover:text-brand-gold-light transition-colors">
              {dict.areas.readGuide.replace('{area}', areaGuides[category.area].name[lang])} <ArrowRight size={14} className="inline rtl:rotate-180" />
            </Link>
          )}
        </div>

        <div className="max-w-7xl mx-auto px-6 pb-20">
          {properties.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg mb-2">{t.noMatch}</p>
              <p className="text-gray-600 text-sm max-w-md mx-auto">{t.noMatchSub}</p>
              <Link href={localePath(lang, '/contact')} className="inline-block mt-6 bg-brand-gold text-brand-black font-semibold px-6 py-3 rounded-xl text-sm hover:bg-brand-gold-light transition-colors">
                {t.contactUs}
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {properties.map((p) => <PropertyCard key={p.id} p={p} lang={lang} />)}
            </div>
          )}
          <AlertForm t={dict.leads} tf={dict.filters} lang={lang} {...selectOptions(lang)}
            initial={{ tx: category.tx, type: category.group ? GROUP_TO_TYPE[category.group] : '', area: category.area }} />
          <Faq items={categoryFaq(category, properties, lang)} title={dict.faqTitle} />
          <CategoryLinks properties={all} lang={lang} title={t.related} exclude={category.slug} />
        </div>
      </div>
      <Footer lang={lang} />
    </>
  )
}
