import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Rukun Real Estate · Lebanon',
  description: 'Premium real estate and interior design in Lebanon. Find your dream property with Rukun.',
  keywords: 'real estate Lebanon, property Lebanon, apartments Lebanon, villas Lebanon, interior design Lebanon',
  openGraph: {
    title: 'Rukun Real Estate · Lebanon',
    description: 'Premium real estate and interior design in Lebanon.',
    url: 'https://www.rukunrealestate.com',
    siteName: 'Rukun Real Estate',
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}
