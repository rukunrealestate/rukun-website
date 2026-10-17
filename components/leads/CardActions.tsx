'use client'

import { Phone } from 'lucide-react'
import WhatsAppIcon from './WhatsAppIcon'
import { whatsappLink, track, PHONE_TEL } from '@/lib/contact'

// WhatsApp + Call under each property card, so visitors can ask without opening the listing
export default function CardActions({ waText, propertyId, whatsappLabel, callLabel }: {
  waText: string
  propertyId: string
  whatsappLabel: string
  callLabel: string
}) {
  return (
    <div className="grid grid-cols-2 border-t border-white/5">
      <a href={whatsappLink(waText)} target="_blank" rel="noopener noreferrer"
        onClick={() => track('whatsapp_click', { placement: 'card', property_id: propertyId })}
        className="flex items-center justify-center gap-1.5 py-3 text-xs font-semibold text-[#25D366] hover:bg-[#25D366]/10 transition-colors">
        <WhatsAppIcon size={15} /> {whatsappLabel}
      </a>
      <a href={`tel:${PHONE_TEL}`}
        onClick={() => track('call_click', { placement: 'card', property_id: propertyId })}
        className="flex items-center justify-center gap-1.5 py-3 text-xs font-semibold text-gray-300 hover:text-brand-gold hover:bg-white/5 border-s border-white/5 transition-colors">
        <Phone size={14} /> {callLabel}
      </a>
    </div>
  )
}
