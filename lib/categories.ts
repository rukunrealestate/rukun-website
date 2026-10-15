import type { Locale } from '@/lib/i18n'
import { propertyKind, type Property } from '@/lib/properties'

// Category landing pages, e.g. /properties/apartments-for-rent-in-achrafieh

type Group = 'apartments' | 'villas' | 'offices' | 'commercial' | 'land'
type Tx = 'sale' | 'rent'

const groups: Record<Group, { match: (p: Property) => boolean; label: Record<Locale, string> }> = {
  apartments: { match: (p) => p.type === 'apartment', label: { en: 'Apartments', ar: 'شقق', fr: 'Appartements' } },
  villas: { match: (p) => p.type === 'villa', label: { en: 'Villas', ar: 'فلل', fr: 'Villas' } },
  offices: { match: (p) => propertyKind(p) === 'office', label: { en: 'Offices', ar: 'مكاتب', fr: 'Bureaux' } },
  commercial: {
    match: (p) => p.type === 'commercial' || p.type === 'office',
    label: { en: 'Commercial Properties', ar: 'عقارات تجارية', fr: 'Locaux commerciaux' },
  },
  land: { match: (p) => p.type === 'land', label: { en: 'Land', ar: 'أراضٍ', fr: 'Terrains' } },
}

const allLabel: Record<Locale, string> = { en: 'Properties', ar: 'عقارات', fr: 'Biens' }
const txLabel: Record<Tx, Record<Locale, string>> = {
  sale: { en: 'for Sale', ar: 'للبيع', fr: 'à vendre' },
  rent: { en: 'for Rent', ar: 'للإيجار', fr: 'à louer' },
}

// Areas are matched on the listing's location/city text, since the CRM district field is not always reliable
const areas: Record<string, { keywords: string[]; districts?: string[]; label: Record<Locale, string> }> = {
  beirut: {
    keywords: ['beirut', 'achrafieh', 'ashrafieh', 'adlieh', 'mar mitr', 'mar mkhael', 'mar mikhael', 'mazraa', 'nweiri', 'hamra', 'verdun', 'gemmayze', 'badaro', 'sodeco', 'sassine', 'mina el hoson', 'zeitouna', 'zeintouna', 'ras beirut', 'ain el mreisseh', 'tallet el khayat'],
    label: { en: 'in Beirut', ar: 'في بيروت', fr: 'à Beyrouth' },
  },
  achrafieh: {
    keywords: ['achrafieh', 'ashrafieh', 'adlieh', 'mar mitr', 'sodeco', 'sassine', 'gemmayze', 'mar mkhael', 'mar mikhael'],
    label: { en: 'in Achrafieh', ar: 'في الأشرفية', fr: 'à Achrafieh' },
  },
  metn: {
    keywords: ['metn', 'baabdat', 'mansourieh', 'dekweneh', 'dekwaneh', 'beit mery', 'monte verde', 'broummana', 'naccache', 'roumieh', 'jdeideh', 'sin el fil', 'antelias', 'rabieh', 'bikfaya', 'zalka', 'jal el dib', 'fanar'],
    districts: ['metn'],
    label: { en: 'in Metn', ar: 'في المتن', fr: 'au Metn' },
  },
  aley: {
    keywords: ['aley', 'sawfar', 'bhamdoun', 'souk el gharb'],
    districts: ['aley'],
    label: { en: 'in Aley', ar: 'في عاليه', fr: 'à Aley' },
  },
  jbeil: {
    keywords: ['jbeil', 'byblos', 'amchit', 'blat'],
    districts: ['jbeil'],
    label: { en: 'in Jbeil (Byblos)', ar: 'في جبيل', fr: 'à Byblos' },
  },
  keserwan: {
    keywords: ['jounieh', 'kaslik', 'keserwan', 'kesrouan', 'zouk', 'adma', 'ghazir', 'sahel alma', 'faqra', 'faraya'],
    label: { en: 'in Keserwan', ar: 'في كسروان', fr: 'au Kesrouan' },
  },
}

// 'in Beirut' / 'في بيروت' / 'au Metn'
export const areaAt = (area: string, lang: Locale) => areas[area].label[lang]

export interface Category { slug: string; group?: Group; tx: Tx; area?: string }

const CATEGORY_RE = new RegExp(
  `^(?:(${Object.keys(groups).join('|')})-)?for-(sale|rent)(?:-in-(${Object.keys(areas).join('|')}))?$`,
)

export function parseCategory(slug: string): Category | null {
  const m = slug.match(CATEGORY_RE)
  if (!m) return null
  return { slug, group: m[1] as Group | undefined, tx: m[2] as Tx, area: m[3] }
}

export function categorySlug(c: Omit<Category, 'slug'>) {
  return `${c.group ? `${c.group}-` : ''}for-${c.tx}${c.area ? `-in-${c.area}` : ''}`
}

export function inArea(p: Property, area: string) {
  const a = areas[area]
  const text = `${p.location ?? ''} ${p.city ?? ''}`.toLowerCase()
  if (a.keywords.some((k) => text.includes(k))) return true
  return !!a.districts?.includes((p.district ?? '').toLowerCase())
}

export function matchesCategory(p: Property, c: Category) {
  if (p.transaction_type !== c.tx) return false
  if (c.group && !groups[c.group].match(p)) return false
  if (c.area && !inArea(p, c.area)) return false
  return true
}

// lower: for use mid-sentence ("apartments for rent in Achrafieh") — place names keep their capitals
export function categoryTitle(c: Category, lang: Locale, lower = false) {
  const what = c.group ? groups[c.group].label[lang] : allLabel[lang]
  const head = [what, txLabel[c.tx][lang]].join(' ')
  return [lower ? head.toLowerCase() : head, c.area ? areas[c.area].label[lang] : ''].filter(Boolean).join(' ')
}

const lebanon: Record<Locale, string> = { en: 'in Lebanon', ar: 'في لبنان', fr: 'au Liban' }

export function categoryIntro(c: Category, lang: Locale, count: number) {
  const title = categoryTitle(c, lang)
  const where = c.area ? '' : ` ${lebanon[lang]}`
  if (lang === 'ar') {
    return `تصفح ${count} من ${title}${where} مع ركن العقارية. جميع العقارات يتم التحقق منها شخصياً من قبل فريقنا، مع صور حقيقية وأسعار واضحة. اتصل بنا أو راسلنا على واتساب لحجز زيارة خاصة.`
  }
  if (lang === 'fr') {
    return `Découvrez ${count} ${categoryTitle(c, lang, true)}${where} avec Rukun Real Estate. Chaque bien est vérifié personnellement par notre équipe, avec de vraies photos et des prix clairs. Appelez-nous ou écrivez-nous sur WhatsApp pour organiser une visite privée.`
  }
  return `Browse ${count} ${categoryTitle(c, lang, true)}${where} with Rukun Real Estate. Every listing is personally verified by our team, with real photos and clear pricing. Call or WhatsApp us to arrange a private viewing.`
}

// Every category that currently has listings (area pages need at least 2 so they are not thin)
export function activeCategories(properties: Property[]) {
  const out: { category: Category; count: number }[] = []
  const groupKeys: (Group | undefined)[] = [undefined, ...(Object.keys(groups) as Group[])]
  const areaKeys: (string | undefined)[] = [undefined, ...Object.keys(areas)]
  for (const tx of ['sale', 'rent'] as Tx[]) {
    for (const group of groupKeys) {
      for (const area of areaKeys) {
        const category = { slug: categorySlug({ group, tx, area }), group, tx, area }
        const count = properties.filter((p) => matchesCategory(p, category)).length
        if (count >= (area ? 2 : 1)) out.push({ category, count })
      }
    }
  }
  return out
}
