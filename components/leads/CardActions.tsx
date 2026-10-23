'use client'

import { Phone } from 'lucide-react'
import WhatsAppIcon from './WhatsAppIcon'
import { whatsappLink, track, PHONE_TEL } from '@/lib/contact'

// WhatsApp + Call under each property card, so visitors can ask without opening the listing
export default function CardActions({ waText, propertyId, whatsappLabel, callLabel, tone = 'dark' }: {
  waText: string
  propertyId: string
  whatsappLabel: string
  callLabel: string
  tone?: 'dark' | 'light'
}) {
  const light = tone === 'light'
  return (
    <div className={`grid grid-cols-2 border-t ${light ? 'border-[#EFE9DF]' : 'border-white/5'}`}>
      <a href={whatsappLink(waText)} target="_blank" rel="noopener noreferrer"
        onClick={() => track('whatsapp_click', { placement: 'card', property_id: propertyId })}
        className={`flex items-center justify-center gap-1.5 py-3 text-xs font-semibold transition-colors ${light ? 'text-[#128C4A] hover:bg-[#25D366]/10' : 'text-[#25D366] hover:bg-[#25D366]/10'}`}>
        <WhatsAppIcon size={15} /> {whatsappLabel}
      </a>
      <a href={`tel:${PHONE_TEL}`}
        onClick={() => track('call_click', { placement: 'card', property_id: propertyId })}
        className={`flex items-center justify-center gap-1.5 py-3 text-xs font-semibold border-s transition-colors ${light ? 'text-[#16130F] hover:bg-[#F7F4EE] border-[#EFE9DF]' : 'text-gray-300 hover:text-brand-gold hover:bg-white/5 border-white/5'}`}>
        <Phone size={14} /> {callLabel}
      </a>
    </div>
  )
}
