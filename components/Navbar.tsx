'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X, Phone } from 'lucide-react'
import { locales, localeNames, localePath, type Locale, type Dictionary } from '@/lib/i18n'

export default function Navbar({ lang, t }: { lang: Locale; t: Dictionary['nav'] }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname() || '/'

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Same page in another language
  const basePath = pathname.replace(/^\/(ar|fr|en)(?=\/|$)/, '') || '/'
  const href = (path: string) => localePath(lang, path)

  const links = [
    { label: t.home, href: href('/') },
    { label: t.properties, href: href('/properties') },
    { label: t.services, href: `${href('/')}#services` },
    { label: t.about, href: href('/about') },
    { label: t.contact, href: href('/contact') },
  ]

  const languageLinks = (
    <div className="flex items-center gap-1 text-xs" aria-label={t.language}>
      {locales.map((l) => (
        <Link key={l} href={localePath(l, basePath)} hrefLang={l} lang={l}
          className={`px-2 py-1 rounded-md transition-colors ${l === lang ? 'text-brand-gold bg-brand-gold/10' : 'text-gray-400 hover:text-brand-gold'}`}>
          {localeNames[l]}
        </Link>
      ))}
    </div>
  )

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-[#0A0A0A]/95 backdrop-blur-md shadow-lg shadow-black/30' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-32">
        {/* Logo */}
        <Link href={href('/')} className="flex items-center gap-4">
          <Image src="/logo.png" alt="Rukun Real Estate" width={112} height={112} preload className="h-28 w-auto object-contain" />
          <div className="flex flex-col justify-center items-center">
            <div className="text-brand-gold text-sm tracking-widest uppercase font-medium">{t.realEstate}</div>
            <div className="text-gray-400 text-sm tracking-widest uppercase">{t.interiorDesign}</div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {links.map(item => (
            <Link key={item.href} href={item.href}
              className="text-sm text-gray-300 hover:text-brand-gold transition-colors font-medium">
              {item.label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden lg:flex flex-col items-end gap-2">
          <div className="flex items-center gap-4">
            <a href="tel:+9613709240" className="flex items-center gap-2 text-sm text-brand-gold hover:text-brand-gold-light transition-colors">
              <Phone size={14} />
              <span dir="ltr">+961 3 709 240</span>
            </a>
            <Link href={href('/contact')}
              className="bg-brand-gold hover:bg-brand-gold-light text-brand-black text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors">
              {t.getInTouch}
            </Link>
          </div>
          {languageLinks}
        </div>

        {/* Mobile menu button */}
        <button onClick={() => setOpen(!open)} className="lg:hidden text-white p-2" aria-label="Menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-[#0A0A0A] border-t border-white/10 px-6 py-6 space-y-4">
          {links.map(item => (
            <Link key={item.href} href={item.href} onClick={() => setOpen(false)}
              className="block text-gray-300 hover:text-brand-gold transition-colors font-medium py-1">
              {item.label}
            </Link>
          ))}
          {languageLinks}
          <Link href={href('/contact')} onClick={() => setOpen(false)}
            className="block bg-brand-gold text-brand-black text-sm font-semibold px-5 py-3 rounded-lg text-center mt-2">
            {t.getInTouch}
          </Link>
        </div>
      )}
    </nav>
  )
}
