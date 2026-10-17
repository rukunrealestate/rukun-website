'use client'

import { Phone, CalendarCheck } from 'lucide-react'
import WhatsAppIcon from './WhatsAppIcon'
import { whatsappLink, track, PHONE_TEL } from '@/lib/contact'
import type { Dictionary } from '@/lib/i18n'

interface Props {
  t: Dictionary['leads']
  title: string // listing title as shown to the visitor
  url: string // full listing URL
  propertyId: string
}

const waText = (t: Props['t'], title: string, url: string) => `${t.waListing} ${title} — ${url}`

// Buttons in the listing's price card (all screen sizes)
export function ListingSidebarButtons({ t, title, url, propertyId }: Props) {
  return (
    <div className="space-y-3">
      <a href="#book-viewing" onClick={() => track('book_viewing_click', { placement: 'sidebar', property_id: propertyId })}
        className="flex items-center justify-center gap-2 w-full bg-brand-gold hover:bg-brand-gold-light text-brand-black font-semibold py-3.5 rounded-xl transition-colors text-sm">
        <CalendarCheck size={16} /> {t.bookViewing}
      </a>
      <a href={whatsappLink(waText(t, title, url))} target="_blank" rel="noopener noreferrer"
        onClick={() => track('whatsapp_click', { placement: 'listing', property_id: propertyId })}
        className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#1fbe5b] text-white font-semibold py-3.5 rounded-xl transition-colors text-sm">
        <WhatsAppIcon size={17} /> {t.whatsapp}
      </a>
      <a href={`tel:${PHONE_TEL}`} onClick={() => track('call_click', { placement: 'listing', property_id: propertyId })}
        className="flex items-center justify-center gap-2 w-full border border-white/10 hover:border-brand-gold/40 text-white hover:text-brand-gold font-semibold py-3.5 rounded-xl transition-colors text-sm">
        <Phone size={16} /> {t.call}
      </a>
    </div>
  )
}

// Fixed bar at the bottom of the screen on phones and tablets
export function ListingMobileBar({ t, title, url, propertyId }: Props) {
  return (
    <div className="xl:hidden fixed bottom-0 inset-x-0 z-40 bg-[#0A0A0A]/95 backdrop-blur border-t border-white/10 px-3 py-2.5 flex gap-2">
      <a href={`tel:${PHONE_TEL}`} onClick={() => track('call_click', { placement: 'mobile_bar', property_id: propertyId })}
        className="flex-1 min-w-0 flex items-center justify-center gap-1.5 border border-white/15 text-white font-semibold py-3 px-2 rounded-xl text-sm text-center leading-tight">
        <Phone size={16} className="hidden min-[400px]:block shrink-0" /> {t.call}
      </a>
      <a href={whatsappLink(waText(t, title, url))} target="_blank" rel="noopener noreferrer"
        onClick={() => track('whatsapp_click', { placement: 'mobile_bar', property_id: propertyId })}
        className="flex-1 min-w-0 flex items-center justify-center gap-1.5 bg-[#25D366] text-white font-semibold py-3 px-2 rounded-xl text-sm text-center leading-tight">
        <WhatsAppIcon size={17} className="hidden min-[400px]:block shrink-0" /> {t.whatsapp}
      </a>
      <a href="#book-viewing" onClick={() => track('book_viewing_click', { placement: 'mobile_bar', property_id: propertyId })}
        className="flex-[1.3] min-w-0 flex items-center justify-center gap-1.5 bg-brand-gold text-brand-black font-semibold py-3 px-2 rounded-xl text-sm text-center leading-tight">
        <CalendarCheck size={16} className="hidden min-[400px]:block shrink-0" /> {t.bookViewing}
      </a>
    </div>
  )
}
