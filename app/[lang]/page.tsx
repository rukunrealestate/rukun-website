import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Hero from '@/components/sections/Hero'
import Stats from '@/components/sections/Stats'
import Services from '@/components/sections/Services'
import FeaturedProperties from '@/components/sections/FeaturedProperties'
import WhyUs from '@/components/sections/WhyUs'
import ContactSection from '@/components/sections/ContactSection'
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
      <Stats lang={lang} />
      <Services lang={lang} />
      <FeaturedProperties lang={lang} />
      <WhyUs lang={lang} />
      <ContactSection t={t.contact} />
      <Footer lang={lang} />
    </>
  )
}
