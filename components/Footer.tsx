import Link from 'next/link'
import { Phone, Mail, MapPin } from 'lucide-react'
import { getDictionary, localePath, type Locale } from '@/lib/i18n'
import { categoryTitle, parseCategory } from '@/lib/categories'

const popularSlugs = [
  'apartments-for-sale-in-beirut',
  'apartments-for-rent-in-achrafieh',
  'apartments-for-sale-in-metn',
  'offices-for-rent-in-beirut',
  'land-for-sale',
]

export default function Footer({ lang }: { lang: Locale }) {
  const t = getDictionary(lang)
  const href = (path: string) => localePath(lang, path)

  return (
    <footer className="bg-[#050505] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-brand-gold flex items-center justify-center">
                <span className="font-heading font-bold text-white text-lg">R</span>
              </div>
              <div>
                <div className="font-heading font-bold text-white text-lg leading-tight">Rukun</div>
                <div className="text-[10px] text-brand-gold tracking-widest uppercase">{t.nav.realEstate} · {t.nav.interiorDesign}</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">{t.footer.tagline}</p>
            <div className="flex gap-3 mt-6">
                <a href="https://instagram.com/rukunrealestate" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-gray-400 hover:border-brand-gold hover:text-brand-gold transition-colors text-xs font-bold">
                IG
              </a>
              <a href="https://facebook.com/rukunrealestate" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-gray-400 hover:border-brand-gold hover:text-brand-gold transition-colors text-xs font-bold">
                FB
              </a>
              <a href="https://wa.me/9613709240" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-gray-400 hover:border-brand-gold hover:text-brand-gold transition-colors">
                <Phone size={15} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-4">{t.footer.quickLinks}</h4>
            <ul className="space-y-2.5">
              {[
                { label: t.nav.home, href: href('/') },
                { label: t.nav.properties, href: href('/properties') },
                { label: t.footer.ourServices, href: `${href('/')}#services` },
                { label: t.areas.nav, href: href('/areas') },
                { label: t.blog.nav, href: href('/blog') },
                { label: t.footer.aboutUs, href: href('/about') },
                { label: t.footer.contact, href: href('/contact') },
              ].map(item => (
                <li key={item.href}>
                  <Link href={item.href} className="text-gray-400 hover:text-brand-gold text-sm transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular searches */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-4">{t.footer.popular}</h4>
            <ul className="space-y-2.5">
              {popularSlugs.map((slug) => (
                <li key={slug}>
                  <Link href={href(`/properties/${slug}`)} className="text-gray-400 hover:text-brand-gold text-sm transition-colors">
                    {categoryTitle(parseCategory(slug)!, lang)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-4">{t.footer.contact}</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-sm text-gray-400">
                <MapPin size={15} className="text-brand-gold mt-0.5 shrink-0" />
                <span>{t.footer.location}</span>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-gray-400">
                <Phone size={15} className="text-brand-gold shrink-0" />
                <a href="tel:+9613709240" dir="ltr" className="hover:text-brand-gold transition-colors">+961 3 709 240</a>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-gray-400">
                <Mail size={15} className="text-brand-gold shrink-0" />
                <a href="mailto:mirna.i.itani@gmail.com" className="hover:text-brand-gold transition-colors">mirna.i.itani@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-xs">© {new Date().getFullYear()} {t.footer.rights}</p>
          <p className="text-gray-600 text-xs">{t.footer.bottom}</p>
        </div>
      </div>
    </footer>
  )
}
