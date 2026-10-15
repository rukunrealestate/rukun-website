import type { Metadata } from 'next'
import './globals.css'
import { SITE_URL } from '@/lib/properties'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Rukun Real Estate · Apartments, Villas & Offices in Lebanon',
    template: '%s | Rukun Real Estate',
  },
  description: 'Apartments, villas, offices and land for sale and rent in Beirut and across Lebanon. Premium real estate and interior design with Rukun.',
  keywords: 'real estate Lebanon, property Lebanon, apartments for sale Beirut, apartments for rent Beirut, villas Lebanon, offices for rent Beirut, interior design Lebanon',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Rukun Real Estate · Lebanon',
    description: 'Apartments, villas, offices and land for sale and rent across Lebanon.',
    url: SITE_URL,
    siteName: 'Rukun Real Estate',
    locale: 'en_US',
    type: 'website',
    images: [{ url: '/logo.png', alt: 'Rukun Real Estate' }],
  },
  twitter: { card: 'summary_large_image' },
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
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
