import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Inter, Playfair_Display, Tajawal, Noto_Kufi_Arabic } from 'next/font/google'
import '../globals.css'
import { SITE_URL } from '@/lib/properties'
import { locales, hasLocale, getDictionary, alternatesFor } from '@/lib/i18n'
import { pageOpenGraph, imageLang } from '@/lib/og'
import Script from 'next/script'
import FloatingWhatsApp from '@/components/leads/FloatingWhatsApp'

// Google Analytics measurement ID (e.g. G-XXXXXXX). Analytics stays off until it is set.
const GA_ID = process.env.NEXT_PUBLIC_GA_ID

export const dynamicParams = false

// Self-hosted fonts (no request to Google at page load). Arabic fonts only download on Arabic pages.
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair', display: 'swap' })
const tajawal = Tajawal({ subsets: ['arabic'], weight: ['400', '500', '700'], variable: '--font-tajawal', display: 'swap', preload: false })
const kufi = Noto_Kufi_Arabic({ subsets: ['arabic'], weight: ['500', '600', '700'], variable: '--font-kufi', display: 'swap', preload: false })
const fontVars = [inter.variable, playfair.variable, tajawal.variable, kufi.variable].join(' ')

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  if (!hasLocale(lang)) return {}
  const t = getDictionary(lang)
  const ti = getDictionary(imageLang(lang))
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: t.meta.homeTitle, template: '%s | Rukun Real Estate' },
    description: t.meta.homeDesc,
    alternates: alternatesFor(lang, '/'),
    // Default preview (home page); other pages set their own
    ...pageOpenGraph(lang, {
      title: t.meta.homeTitle,
      description: t.meta.ogDesc,
      path: '/',
      image: { title: `${ti.hero.h1a} ${ti.hero.h1b} ${ti.hero.h1c}`, kicker: ti.hero.badge, detail: ti.footer.bottom },
    }),
  }
}

const agencySchema = {
  '@context': 'https://schema.org',
  '@type': 'RealEstateAgent',
  '@id': `${SITE_URL}/#agency`,
  name: 'Rukun Real Estate & Interior Design',
  alternateName: ['Rukun Real Estate', 'Rukun', 'ركن للعقارات'],
  description: 'Beirut-based real estate agency helping people buy, rent, sell and rent out apartments, villas, offices, shops and land across Lebanon, in English, Arabic and French.',
  slogan: 'Real Estate, Done Personally',
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  image: `${SITE_URL}/logo.png`,
  telephone: '+961 3 709 240',
  email: 'rukunleb@gmail.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Beirut',
    addressCountry: 'LB',
  },
  foundingDate: '2024',
  founder: [
    { '@type': 'Person', name: 'Mirna Itani' },
    { '@type': 'Person', name: 'Fadi Touma' },
  ],
  areaServed: [
    { '@type': 'Country', name: 'Lebanon' },
    ...['Beirut', 'Achrafieh', 'Metn', 'Aley', 'Keserwan', 'Jbeil (Byblos)', 'Mount Lebanon'].map((name) => ({ '@type': 'Place', name })),
  ],
  knowsAbout: [
    'Apartments for sale in Lebanon', 'Apartments for rent in Beirut', 'Selling property in Lebanon',
    'Renting out property in Lebanon', 'Offices and commercial property in Beirut', 'Land for sale in Lebanon', 'Interior design',
  ],
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
    <html lang={lang} dir={lang === 'ar' ? 'rtl' : 'ltr'} className={fontVars}>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(agencySchema) }}
        />
        {children}
        <FloatingWhatsApp t={getDictionary(lang).leads} />
        {GA_ID && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
            <Script id="ga" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;gtag('js',new Date());gtag('config','${GA_ID}');`}
            </Script>
          </>
        )}
      </body>
    </html>
  )
}
