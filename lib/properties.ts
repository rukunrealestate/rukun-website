import { getDictionary, type Locale } from '@/lib/i18n'

export const SITE_URL = 'https://www.rukunrealestate.com'

const CRM_URL = process.env.NEXT_PUBLIC_CRM_URL || 'https://crm.rukunrealestate.com'

export interface Property {
  id: string
  title: string
  description: string | null
  type: string
  subtype?: string | null
  transaction_type: string
  price: number
  currency: string
  area_sqm: number | null
  bedrooms: number | null
  bathrooms: number | null
  location: string | null
  district: string | null
  city: string | null
  status: string
  images: string[]
  amenities: string[]
  video_url?: string | null
}

export async function getProperties(): Promise<Property[]> {
  try {
    const res = await fetch(`${CRM_URL}/api/properties`, {
      next: { revalidate: 0 },
      cache: 'no-store',
    })
    if (!res.ok) return []
    const data = await res.json()
    return data.properties ?? []
  } catch {
    return []
  }
}

export async function getProperty(id: string): Promise<Property | null> {
  try {
    const res = await fetch(`${CRM_URL}/api/properties/${id}`, {
      next: { revalidate: 0 },
      cache: 'no-store',
    })
    if (!res.ok) return null
    const data = await res.json()
    return data.property ?? null
  } catch {
    return null
  }
}

export function formatPrice(price: number, currency: string, transaction_type: string) {
  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency === 'LBP' ? 'USD' : currency,
    maximumFractionDigits: 0,
  }).format(price)
  return transaction_type === 'rent' ? `${formatted}/mo` : formatted
}

// Commercial listings marked as offices in the CRM are shown as offices
export function propertyKind(p: Property) {
  if (p.type === 'commercial' && p.subtype?.toLowerCase() === 'office') return 'office'
  return p.type
}

export function typeLabel(type: string, lang: Locale = 'en') {
  return getDictionary(lang).types[type] ?? type
}

export function propertyLocation(p: Property) {
  return p.location || [p.district, p.city].filter(Boolean).join(', ') || 'Lebanon'
}

export function slugify(s: string) {
  return s
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

// e.g. "apartment-for-sale-nweiri-100m2-961b7b9c" — readable words, ending in the first 8 characters of the CRM id
export function propertySlug(p: Property) {
  const words = slugify([
    propertyKind(p),
    p.transaction_type === 'rent' ? 'for rent' : 'for sale',
    p.location || p.city || p.district || '',
    p.area_sqm ? `${p.area_sqm}m2` : '',
  ].join(' '))
  return `${words}-${p.id.slice(0, 8)}`
}

export const propertyPath = (p: Property) => `/properties/${propertySlug(p)}`

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
const SLUG_ID_RE = /-([0-9a-f]{8})$/i

// Finds the listing behind a URL segment: either a readable slug or an old-style full id
export async function resolvePropertySlug(segment: string): Promise<Property | null> {
  if (UUID_RE.test(segment)) return getProperty(segment)
  const m = segment.match(SLUG_ID_RE)
  if (!m) return null
  const all = await getProperties()
  return all.find((p) => p.id.toLowerCase().startsWith(m[1].toLowerCase())) ?? null
}

// Short, search-friendly summary for meta descriptions (the CRM descriptions are long and full of separators)
export function propertySummary(p: Property, lang: Locale = 'en') {
  const t = getDictionary(lang).props
  const parts = [
    `${typeLabel(propertyKind(p), lang)} ${(p.transaction_type === 'sale' ? t.forSale : t.forRent).toLowerCase()} ·${propertyLocation(p)}`,
    p.area_sqm ? `${p.area_sqm} m²` : null,
    p.bedrooms ? t.bedroomsN.replace('{n}', String(p.bedrooms)) : null,
    p.bathrooms ? t.bathroomsN.replace('{n}', String(p.bathrooms)) : null,
    formatPrice(p.price, p.currency, p.transaction_type),
  ].filter(Boolean).join(' · ')
  return `${parts}. ${t.summaryCta}`
}
