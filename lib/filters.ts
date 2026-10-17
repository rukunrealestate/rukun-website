import { propertyKind, type Property } from '@/lib/properties'
import { inArea } from '@/lib/categories'
import { areaGuideKeys } from '@/lib/areaGuides'

// Search & filters for the Properties page. Everything lives in the URL query string
// (?q=&tx=&type=&area=&beds=&min=&max=&sort=) so filtered lists can be shared and work without JavaScript.

export const TYPE_OPTIONS = ['apartment', 'villa', 'office', 'commercial', 'land'] as const
export const SORT_OPTIONS = ['newest', 'price-asc', 'price-desc', 'size-desc'] as const
export const BED_OPTIONS = [1, 2, 3, 4] as const

export interface Filters {
  q: string
  tx: '' | 'sale' | 'rent'
  type: '' | (typeof TYPE_OPTIONS)[number]
  area: string
  beds: number
  min: number
  max: number
  sort: (typeof SORT_OPTIONS)[number]
}

type Params = Record<string, string | string[] | undefined>

const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v ?? '').trim()
const num = (v: string) => { const n = Number(v.replace(/[^\d.]/g, '')); return Number.isFinite(n) && n > 0 ? n : 0 }

export function parseFilters(params: Params): Filters {
  const tx = one(params.tx)
  const type = one(params.type)
  const area = one(params.area)
  const sort = one(params.sort)
  return {
    q: one(params.q).slice(0, 100),
    tx: tx === 'sale' || tx === 'rent' ? tx : '',
    type: (TYPE_OPTIONS as readonly string[]).includes(type) ? (type as Filters['type']) : '',
    area: areaGuideKeys.includes(area) ? area : '',
    beds: Math.min(num(one(params.beds)), 10),
    min: num(one(params.min)),
    max: num(one(params.max)),
    sort: (SORT_OPTIONS as readonly string[]).includes(sort) ? (sort as Filters['sort']) : 'newest',
  }
}

// Whether the visitor narrowed the list (sorting alone doesn't count)
export const hasActiveFilters = (f: Filters) => !!(f.q || f.tx || f.type || f.area || f.beds || f.min || f.max)

const normalize = (s: string) => s.normalize('NFKD').replace(/[̀-ͯ]/g, '').toLowerCase()

function matchesText(p: Property, q: string) {
  const haystack = normalize([
    p.title, p.title_ar, p.title_fr, p.location, p.city, p.district, p.reference_number, p.description,
  ].filter(Boolean).join(' '))
  return normalize(q).split(/\s+/).filter(Boolean).every((word) => haystack.includes(word))
}

export function applyFilters(properties: Property[], f: Filters) {
  const list = properties.filter((p) =>
    (!f.tx || p.transaction_type === f.tx) &&
    (!f.type || propertyKind(p) === f.type) &&
    (!f.area || inArea(p, f.area)) &&
    (!f.beds || (p.bedrooms ?? 0) >= f.beds) &&
    (!f.min || p.price >= f.min) &&
    (!f.max || p.price <= f.max) &&
    (!f.q || matchesText(p, f.q)),
  )
  // The CRM already returns newest first
  if (f.sort === 'price-asc') list.sort((a, b) => a.price - b.price)
  if (f.sort === 'price-desc') list.sort((a, b) => b.price - a.price)
  if (f.sort === 'size-desc') list.sort((a, b) => (b.area_sqm ?? 0) - (a.area_sqm ?? 0))
  return list
}
