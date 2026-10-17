// Contact details and lead helpers shared by the website's buttons and forms.

export const PHONE_DISPLAY = '+961 3 709 240'
export const PHONE_TEL = '+9613709240'
export const WHATSAPP_NUMBER = '9613709240'
export const CONTACT_EMAIL = 'rukunleb@gmail.com'

export const whatsappLink = (text?: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}${text ? `?text=${encodeURIComponent(text)}` : ''}`

export type LeadKind = 'contact' | 'viewing' | 'alert' | 'owner'

export interface LeadPayload {
  kind: LeadKind
  name: string
  phone: string
  email?: string
  message?: string
  lang?: string
  page?: string
  website?: string // honeypot
  [extra: string]: string | number | undefined
}

// Sends a lead to the CRM (it lands under Contacts / Listing Inquiries / Property Sources)
export async function submitLead(payload: LeadPayload): Promise<{ ok: boolean; error?: string }> {
  const crmUrl = process.env.NEXT_PUBLIC_CRM_URL || 'https://crm.rukunrealestate.com'
  try {
    const res = await fetch(`${crmUrl}/api/leads/website`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...payload, page: payload.page ?? (typeof location !== 'undefined' ? location.pathname : '') }),
    })
    if (res.ok) {
      track('generate_lead', { lead_kind: payload.kind })
      return { ok: true }
    }
    const data = await res.json().catch(() => ({}))
    return { ok: false, error: data.error }
  } catch {
    return { ok: false, error: 'connection' }
  }
}

// Analytics events (WhatsApp/call clicks, leads). Sent to Google Analytics when it's configured
// (NEXT_PUBLIC_GA_ID); otherwise this does nothing.
declare global {
  interface Window { gtag?: (...args: unknown[]) => void }
}

export function track(event: string, params: Record<string, string | number | undefined> = {}) {
  if (typeof window === 'undefined') return
  window.gtag?.('event', event, { ...params, page_path: location.pathname })
}
