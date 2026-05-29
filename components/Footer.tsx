import Link from 'next/link'
import { Phone, Mail, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-brand-gold flex items-center justify-center">
                <span className="font-heading font-bold text-white text-lg">R</span>
              </div>
              <div>
                <div className="font-heading font-bold text-white text-lg leading-tight">Rukun</div>
                <div className="text-[10px] text-brand-gold tracking-widest uppercase">Real Estate · Interior Design</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Lebanon&apos;s trusted partner for premium real estate and bespoke interior design.
              We turn spaces into exceptional places.
            </p>
            <div className="flex gap-3 mt-6">
                <a href="https://instagram.com/rukunrealestate" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-gray-400 hover:border-brand-gold hover:text-brand-gold transition-colors text-xs font-bold">
                IG
              </a>
              <a href="https://facebook.com/rukunrealestate" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-gray-400 hover:border-brand-gold hover:text-brand-gold transition-colors text-xs font-bold">
                FB
              </a>
              <a href="https://wa.me/96170000000" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-gray-400 hover:border-brand-gold hover:text-brand-gold transition-colors">
                <Phone size={15} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Home', href: '/' },
                { label: 'Properties', href: '/properties' },
                { label: 'Our Services', href: '/#services' },
                { label: 'About Us', href: '/about' },
                { label: 'Contact', href: '/contact' },
              ].map(item => (
                <li key={item.href}>
                  <Link href={item.href} className="text-gray-400 hover:text-brand-gold text-sm transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-sm text-gray-400">
                <MapPin size={15} className="text-brand-gold mt-0.5 shrink-0" />
                <span>Beirut, Lebanon</span>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-gray-400">
                <Phone size={15} className="text-brand-gold shrink-0" />
                <a href="tel:+96170000000" className="hover:text-brand-gold transition-colors">+961 70 000 000</a>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-gray-400">
                <Mail size={15} className="text-brand-gold shrink-0" />
                <a href="mailto:info@rukunrealestate.com" className="hover:text-brand-gold transition-colors">info@rukunrealestate.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-xs">© {new Date().getFullYear()} Rukun Real Estate. All rights reserved.</p>
          <p className="text-gray-600 text-xs">Lebanon · Real Estate · Interior Design</p>
        </div>
      </div>
    </footer>
  )
}
