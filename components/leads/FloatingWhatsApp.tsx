'use client'

import { usePathname } from 'next/navigation'
import WhatsAppIcon from './WhatsAppIcon'
import { whatsappLink, track } from '@/lib/contact'
import type { Dictionary } from '@/lib/i18n'

const SITE = 'https://www.rukunrealestate.com'
const isListingPage = (path: string) => /\/properties\/[a-z0-9-]+-[0-9a-f]{8}$/.test(path)

// Round WhatsApp button in the bottom corner of every page. On listing pages it's hidden on
// smaller screens, where the listing's own Call / WhatsApp bar takes its place.
export default function FloatingWhatsApp({ t }: { t: Dictionary['leads'] }) {
  const path = usePathname() || '/'
  const listing = isListingPage(path)
  const text = `${listing ? t.waListing : t.waGeneral} ${SITE}${path}`

  return (
    <a
      href={whatsappLink(text)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.chatPrompt}
      title={t.chatPrompt}
      onClick={() => track('whatsapp_click', { placement: 'floating' })}
      className={`fixed bottom-5 end-5 z-40 w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg shadow-black/40 flex items-center justify-center hover:scale-105 transition-transform ${listing ? 'hidden xl:flex' : 'flex'}`}
    >
      <WhatsAppIcon size={28} />
    </a>
  )
}
