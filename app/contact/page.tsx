import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ContactSection from '@/components/sections/ContactSection'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <div className="pt-28">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-6 py-10 text-center">
          <p className="text-brand-gold text-sm font-medium tracking-widest uppercase mb-3">Reach Out</p>
          <h1 className="font-heading text-5xl font-bold text-white mb-3">Contact Us</h1>
          <div className="gold-divider mx-auto mb-4" />
          <p className="text-gray-400 max-w-lg mx-auto">We respond within hours. Our agents are ready to help you find your perfect property.</p>
        </div>

        {/* Info bar */}
        <div className="bg-brand-gold/5 border-y border-brand-gold/10 py-8 mb-4">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                { icon: Phone, label: 'Phone', val: '+961 70 000 000' },
                { icon: Mail, label: 'Email', val: 'info@rukunrealestate.com' },
                { icon: MapPin, label: 'Location', val: 'Beirut, Lebanon' },
                { icon: Clock, label: 'Hours', val: 'Mon–Sat, 9am–7pm' },
              ].map((c, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <c.icon size={18} className="text-brand-gold" />
                  <div className="text-xs text-gray-500">{c.label}</div>
                  <div className="text-white text-sm font-medium">{c.val}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <ContactSection />
      </div>
      <Footer />
    </>
  )
}
