export const SITE_URL = 'https://www.rukunrealestate.com'

const CRM_URL = process.env.NEXT_PUBLIC_CRM_URL || 'https://crm.rukunrealestate.com'

export interface Property {
  id: string
  title: string
  description: string | null
  type: string
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

export function typeLabel(type: string) {
  const map: Record<string, string> = {
    apartment: 'Apartment', villa: 'Villa', commercial: 'Commercial',
    land: 'Land', office: 'Office',
  }
  return map[type] ?? type
}

export function propertyLocation(p: Property) {
  return p.location || [p.district, p.city].filter(Boolean).join(', ') || 'Lebanon'
}

// Short, search-friendly summary for meta descriptions (the CRM descriptions are long and full of separators)
export function propertySummary(p: Property) {
  const parts = [
    `${typeLabel(p.type)} ${p.transaction_type === 'sale' ? 'for sale' : 'for rent'} in ${propertyLocation(p)}`,
    p.area_sqm ? `${p.area_sqm} m²` : null,
    p.bedrooms ? `${p.bedrooms} bedrooms` : null,
    p.bathrooms ? `${p.bathrooms} bathrooms` : null,
    formatPrice(p.price, p.currency, p.transaction_type),
  ].filter(Boolean).join(' · ')
  return `${parts}. Contact Rukun Real Estate for a private viewing.`
}
