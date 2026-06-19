'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Phone } from 'lucide-react'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-[#0A0A0A]/95 backdrop-blur-md shadow-lg shadow-black/30' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-gold flex items-center justify-center">
            <span className="font-heading font-bold text-white text-lg">R</span>
          </div>
          <div>
            <div className="font-heading font-bold text-white text-lg leading-tight">Rukun</div>
            <div className="text-[10px] text-brand-gold tracking-widest uppercase">Real Estate</div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { label: 'Home', href: '/' },
            { label: 'Properties', href: '/properties' },
            { label: 'Services', href: '/#services' },
            { label: 'About', href: '/about' },
            { label: 'Contact', href: '/contact' },
          ].map(item => (
            <Link key={item.href} href={item.href}
              className="text-sm text-gray-300 hover:text-brand-gold transition-colors font-medium">
              {item.label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-4">
          <a href="tel:+9613709240" className="flex items-center gap-2 text-sm text-brand-gold hover:text-brand-gold-light transition-colors">
            <Phone size={14} />
            <span>+961 3 709 240</span>
          </a>
          <Link href="/contact"
            className="bg-brand-gold hover:bg-brand-gold-light text-brand-black text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors">
            Get In Touch
          </Link>
        </div>

        {/* Mobile menu button */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-white p-2">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[#0A0A0A] border-t border-white/10 px-6 py-6 space-y-4">
          {[
            { label: 'Home', href: '/' },
            { label: 'Properties', href: '/properties' },
            { label: 'Services', href: '/#services' },
            { label: 'About', href: '/about' },
            { label: 'Contact', href: '/contact' },
          ].map(item => (
            <Link key={item.href} href={item.href} onClick={() => setOpen(false)}
              className="block text-gray-300 hover:text-brand-gold transition-colors font-medium py-1">
              {item.label}
            </Link>
          ))}
          <Link href="/contact" onClick={() => setOpen(false)}
            className="block bg-brand-gold text-brand-black text-sm font-semibold px-5 py-3 rounded-lg text-center mt-2">
            Get In Touch
          </Link>
        </div>
      )}
    </nav>
  )
}
