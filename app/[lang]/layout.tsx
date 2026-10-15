import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import '../globals.css'
import { SITE_URL } from '@/lib/properties'
import { locales, hasLocale, getDictionary, alternatesFor, ogLocales } from '@/lib/i18n'

export const dynamicParams = false

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  if (!hasLocale(lang)) return {}
  const t = getDictionary(lang)
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: t.meta.homeTitle, template: '%s | Rukun Real Estate' },
    description: t.meta.homeDesc,
    alternates: alternatesFor(lang, '/'),
    openGraph: {
      title: t.meta.homeTitle,
      description: t.meta.ogDesc,
      siteName: 'Rukun Real Estate',
      locale: ogLocales[lang],
      type: 'website',
      images: [{ url: '/logo.png', alt: 'Rukun Real Estate' }],
    },
    twitter: { card: 'summary_large_image' },
  }
}

const agencySchema = {
  '@context': 'https://schema.org',
  '@type': 'RealEstateAgent',
  name: 'Rukun Real Estate & Interior Design',
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  image: `${SITE_URL}/logo.png`,
  telephone: '+961 3 709 240',
  email: 'mirna.i.itani@gmail.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Beirut',
    addressCountry: 'LB',
  },
  areaServed: { '@type': 'Country', name: 'Lebanon' },
  knowsLanguage: ['en', 'ar', 'fr'],
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    opens: '09:00',
    closes: '19:00',
  },
  sameAs: [
    'https://instagram.com/rukunrealestate',
    'https://facebook.com/rukunrealestate',
  ],
}

export default async function RootLayout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  return (
    <html lang={lang} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(agencySchema) }}
        />
        {children}
      </body>
    </html>
  )
}
