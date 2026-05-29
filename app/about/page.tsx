import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { Award, Users, MapPin, Heart } from 'lucide-react'

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <div className="pt-28 min-h-screen">
        {/* Hero */}
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">
          <p className="text-brand-gold text-sm font-medium tracking-widest uppercase mb-3">Our Story</p>
          <h1 className="font-heading text-5xl md:text-6xl font-bold text-white mb-4">About Rukun</h1>
          <div className="gold-divider mx-auto mb-6" />
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Born in Lebanon, built on trust. For over a decade, Rukun has been helping families,
            investors, and businesses find their perfect space across the country.
          </p>
        </div>

        {/* Mission */}
        <div className="bg-brand-gold/5 border-y border-brand-gold/10">
          <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
                Our Mission
              </h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                We believe everyone deserves a space they love. Rukun was founded on the principle
                that real estate should be transparent, personalized, and stress-free.
              </p>
              <p className="text-gray-400 leading-relaxed">
                From our base in Beirut, we serve clients across all of Lebanon — combining deep
                local expertise with a premium, client-first approach to every transaction.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-5">
              {[
                { icon: Award, title: 'Excellence', desc: 'Top-rated agency in Lebanon' },
                { icon: Users, title: 'Community', desc: '500+ happy families served' },
                { icon: MapPin, title: 'Local', desc: 'Lebanon experts since 2012' },
                { icon: Heart, title: 'Passion', desc: 'We love what we do' },
              ].map((v, i) => (
                <div key={i} className="p-5 rounded-2xl border border-white/5 bg-white/2 text-center">
                  <div className="w-10 h-10 rounded-xl bg-brand-gold/10 flex items-center justify-center mx-auto mb-3">
                    <v.icon size={18} className="text-brand-gold" />
                  </div>
                  <div className="font-heading font-semibold text-white text-sm mb-1">{v.title}</div>
                  <div className="text-gray-400 text-xs">{v.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Team */}
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold text-white mb-3">Meet Our Team</h2>
            <div className="gold-divider mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Mirna Itani', role: 'Founder & CEO', note: 'Leading Rukun with vision and heart.' },
              { name: 'Ahmad Khalil', role: 'Senior Agent', note: 'Specializing in Beirut luxury properties.' },
              { name: 'Sara Mansour', role: 'Interior Designer', note: 'Transforming spaces with elegant design.' },
            ].map((m, i) => (
              <div key={i} className="text-center p-8 rounded-2xl border border-white/5 bg-white/2 hover:border-brand-gold/20 transition-all">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-brand-gold/20 to-brand-gold/5 flex items-center justify-center mx-auto mb-4">
                  <span className="font-heading font-bold text-brand-gold text-2xl">{m.name[0]}</span>
                </div>
                <h3 className="font-heading font-semibold text-white text-lg mb-1">{m.name}</h3>
                <p className="text-brand-gold text-sm mb-3">{m.role}</p>
                <p className="text-gray-400 text-sm">{m.note}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="max-w-7xl mx-auto px-6 pb-20 text-center">
          <div className="bg-brand-gold/5 border border-brand-gold/20 rounded-3xl p-12">
            <h2 className="font-heading text-3xl font-bold text-white mb-3">Ready to Work With Us?</h2>
            <p className="text-gray-400 mb-8">Let our team help you find the perfect property in Lebanon.</p>
            <Link href="/contact"
              className="inline-flex items-center gap-2 bg-brand-gold hover:bg-brand-gold-light text-brand-black font-semibold px-8 py-4 rounded-xl transition-all">
              Contact Our Team
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
