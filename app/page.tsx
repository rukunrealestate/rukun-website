import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Hero from '@/components/sections/Hero'
import Stats from '@/components/sections/Stats'
import Services from '@/components/sections/Services'
import FeaturedProperties from '@/components/sections/FeaturedProperties'
import WhyUs from '@/components/sections/WhyUs'
import ContactSection from '@/components/sections/ContactSection'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Stats />
      <Services />
      <FeaturedProperties />
      <WhyUs />
      <ContactSection />
      <Footer />
    </>
  )
}
