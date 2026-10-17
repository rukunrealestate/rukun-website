import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ArticleBody from '@/components/ArticleBody'
import PropertyCard from '@/components/PropertyCard'
import { getProperties, SITE_URL } from '@/lib/properties'
import { hasLocale, getDictionary, alternatesFor, localePath, locales, type Locale } from '@/lib/i18n'
import { pageOpenGraph, imageLang } from '@/lib/og'
import { articles, getArticle } from '@/lib/blog'

type Params = { params: Promise<{ lang: string; slug: string }> }

export function generateStaticParams() {
  return locales.flatMap((lang) => articles.map((a) => ({ lang, slug: a.slug })))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang, slug } = await params
  const article = getArticle(slug)
  if (!hasLocale(lang) || !article) return {}
  const text = article.text[lang]
  const il = imageLang(lang)
  const share = pageOpenGraph(lang, {
    title: text.title,
    description: text.description,
    path: `/blog/${slug}`,
    type: 'article',
    image: { title: article.text[il].title, kicker: getDictionary(il).blog.eyebrow, detail: getDictionary(il).blog.minRead.replace('{n}', String(article.readMinutes)) },
  })
  return {
    // Brand left out of article titles so they fit in search results
    title: { absolute: text.title },
    description: text.description,
    alternates: alternatesFor(lang, `/blog/${slug}`),
    openGraph: { ...share.openGraph, type: 'article', publishedTime: article.published, modifiedTime: article.updated ?? article.published },
    twitter: share.twitter,
  }
}

const formatDate = (iso: string, lang: Locale) =>
  new Intl.DateTimeFormat(lang === 'ar' ? 'ar-LB-u-nu-latn' : lang, { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(iso))

export default async function ArticlePage({ params }: Params) {
  const { lang, slug } = await params
  const article = getArticle(slug)
  if (!hasLocale(lang) || !article) notFound()
  const dict = getDictionary(lang)
  const t = dict.blog
  const text = article.text[lang]
  const url = `${SITE_URL}${localePath(lang, `/blog/${slug}`)}`

  // A few current listings with photos, to keep readers moving toward properties
  const listings = (await getProperties()).filter((p) => p.images?.length).slice(0, 3)
  const others = articles.filter((a) => a.slug !== slug).slice(0, 3)

  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: text.title,
      description: text.description,
      inLanguage: lang,
      url,
      mainEntityOfPage: url,
      datePublished: article.published,
      dateModified: article.updated ?? article.published,
      author: { '@type': 'Organization', name: 'Rukun Real Estate & Interior Design', url: SITE_URL },
      publisher: { '@type': 'Organization', name: 'Rukun Real Estate & Interior Design', logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png` } },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: dict.nav.home, item: `${SITE_URL}${localePath(lang, '/')}` },
        { '@type': 'ListItem', position: 2, name: t.nav, item: `${SITE_URL}${localePath(lang, '/blog')}` },
        { '@type': 'ListItem', position: 3, name: text.title, item: url },
      ],
    },
  ]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Navbar lang={lang} t={dict.nav} />
      <div className="pt-28 xl:pt-36 min-h-screen">
        <article className="max-w-3xl mx-auto px-6 pb-12">
          <Link href={localePath(lang, '/blog')} className="inline-flex items-center gap-2 text-gray-400 hover:text-brand-gold transition-colors text-sm mb-6">
            <ArrowLeft size={15} className="rtl:rotate-180" /> {t.allArticles}
          </Link>
          <p className="text-brand-gold text-sm font-medium tracking-widest uppercase mb-3">{t.eyebrow}</p>
          <h1 className="font-heading text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">{text.title}</h1>
          <div className="text-xs text-gray-500 mb-6">
            <time dateTime={article.updated ?? article.published}>
              {t.updated.replace('{date}', formatDate(article.updated ?? article.published, lang))}
            </time>
            {' · '}{t.minRead.replace('{n}', String(article.readMinutes))}
          </div>
          <div className="gold-divider mb-8" />
          <ArticleBody blocks={text.body} lang={lang} />

          {/* Call to action */}
          <div className="mt-12 rounded-2xl border border-brand-gold/20 bg-brand-gold/5 p-8 text-center">
            <h2 className="font-heading text-2xl font-bold text-white mb-2">{t.ctaTitle}</h2>
            <p className="text-gray-400 mb-6">{t.ctaText}</p>
            <Link href={localePath(lang, '/contact')}
              className="inline-block bg-brand-gold hover:bg-brand-gold-light text-brand-black font-semibold px-7 py-3.5 rounded-xl transition-colors">
              {t.ctaButton}
            </Link>
          </div>
        </article>

        <div className="max-w-7xl mx-auto px-6 pb-20 space-y-14">
          {listings.length > 0 && (
            <section>
              <h2 className="font-heading text-2xl font-bold text-white mb-6">{t.latest}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {listings.map((p) => <PropertyCard key={p.id} p={p} lang={lang} />)}
              </div>
            </section>
          )}
          {others.length > 0 && (
            <section>
              <h2 className="font-heading text-2xl font-bold text-white mb-6">{t.more}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {others.map((a) => (
                  <Link key={a.slug} href={localePath(lang, `/blog/${a.slug}`)}
                    className="group p-6 rounded-2xl border border-white/5 bg-white/2 hover:border-brand-gold/30 transition-all block">
                    <h3 className="font-heading font-semibold text-white group-hover:text-brand-gold transition-colors mb-2">{a.text[lang].title}</h3>
                    <p className="text-gray-400 text-sm line-clamp-3">{a.text[lang].description}</p>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
      <Footer lang={lang} />
    </>
  )
}
