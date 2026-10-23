import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Hero from '@/components/sections/Hero'
import Services from '@/components/sections/Services'
import FeaturedProperties from '@/components/sections/FeaturedProperties'
import AreasBrowse from '@/components/sections/AreasBrowse'
import WhyUs from '@/components/sections/WhyUs'
import ContactSection from '@/components/sections/ContactSection'
import OwnerBand from '@/components/leads/OwnerBand'
import { hasLocale, getDictionary } from '@/lib/i18n'
import { notFound } from 'next/navigation'

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const t = getDictionary(lang)

  return (
    <>
      <Navbar lang={lang} t={t.nav} />
      <Hero lang={lang} />
      <FeaturedProperties lang={lang} />
      <AreasBrowse lang={lang} />
      <Services lang={lang} />
      <WhyUs lang={lang} />
      <OwnerBand lang={lang} />
      <ContactSection t={t.contact} lang={lang} />
      <Footer lang={lang} />
    </>
  )
}
