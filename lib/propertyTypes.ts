import type { Locale } from '@/lib/i18n'
import type { Property } from '@/lib/properties'

// Property types for the search dropdowns, grouped. Matching uses the CRM's type, category and
// sub-type (the CRM's sub-type lists are in rukun-crm lib/utils.ts), with the title as a fallback.
// The first five keys (apartment, villa, office, commercial, land) are the original ones, kept so old links still work.

type Group = 'residential' | 'commercial' | 'land'

const GROUPS: Record<Group, Record<Locale, string>> = {
  residential: { en: 'Residential', ar: 'سكني', fr: 'Résidentiel' },
  commercial: { en: 'Commercial', ar: 'تجاري', fr: 'Commercial' },
  land: { en: 'Land', ar: 'أراضٍ', fr: 'Terrains' },
}

const sub = (p: Property) => (p.subtype ?? '').toLowerCase()
const title = (p: Property) => `${p.title ?? ''}`.toLowerCase()
const cat = (p: Property) => p.category ?? ''
const subIs = (...names: string[]) => (p: Property) => names.includes(sub(p))
const titleHas = (...words: string[]) => (p: Property) => words.some((w) => new RegExp(`\\b${w}`).test(title(p)))
const any = (...tests: ((p: Property) => boolean)[]) => (p: Property) => tests.some((t) => t(p))

interface PropertyType { group: Group; name: Record<Locale, string>; match: (p: Property) => boolean }

const TYPES: Record<string, PropertyType> = {
  apartment: { group: 'residential', name: { en: 'Apartment', ar: 'شقة', fr: 'Appartement' }, match: (p) => p.type === 'apartment' },
  studio: { group: 'residential', name: { en: 'Studio', ar: 'استوديو', fr: 'Studio' }, match: any(subIs('studio'), titleHas('studio')) },
  duplex: { group: 'residential', name: { en: 'Duplex / Triplex', ar: 'دوبلكس / تريبلكس', fr: 'Duplex / Triplex' }, match: any(subIs('duplex', 'triplex', 'maisonette'), titleHas('duplex', 'triplex')) },
  penthouse: { group: 'residential', name: { en: 'Penthouse / Rooftop', ar: 'بنتهاوس / روف', fr: 'Penthouse / Rooftop' }, match: any(subIs('penthouse'), titleHas('penthouse', 'rooftop', 'roof')) },
  loft: { group: 'residential', name: { en: 'Loft', ar: 'لوفت', fr: 'Loft' }, match: any(subIs('loft'), titleHas('loft')) },
  villa: { group: 'residential', name: { en: 'Villa', ar: 'فيلا', fr: 'Villa' }, match: (p) => p.type === 'villa' && !cat(p).startsWith('chalets') && !cat(p).startsWith('vacation') },
  house: {
    group: 'residential', name: { en: 'House / Townhouse', ar: 'منزل / تاون هاوس', fr: 'Maison / Maison de ville' },
    match: any(subIs('town house', 'detached house', 'semi-detached', 'bungalow'), titleHas('house', 'townhouse')),
  },
  chalet: { group: 'residential', name: { en: 'Chalet', ar: 'شاليه', fr: 'Chalet' }, match: any((p) => cat(p).startsWith('chalets'), titleHas('chalet', 'cabin')) },
  room: { group: 'residential', name: { en: 'Room', ar: 'غرفة', fr: 'Chambre' }, match: (p) => cat(p) === 'rooms_rent' },
  holiday: { group: 'residential', name: { en: 'Holiday rental', ar: 'إيجار سياحي', fr: 'Location saisonnière' }, match: (p) => cat(p) === 'vacation_rentals' },
  building: { group: 'residential', name: { en: 'Building', ar: 'مبنى', fr: 'Immeuble' }, match: any((p) => cat(p) === 'buildings_multiple_units', titleHas('building')) },

  office: { group: 'commercial', name: { en: 'Office', ar: 'مكتب', fr: 'Bureau' }, match: any((p) => p.type === 'office', subIs('office')) },
  shop: { group: 'commercial', name: { en: 'Shop', ar: 'محل', fr: 'Boutique' }, match: any(subIs('shop'), titleHas('shop', 'store')) },
  showroom: { group: 'commercial', name: { en: 'Showroom', ar: 'صالة عرض', fr: 'Showroom' }, match: any(subIs('showroom'), titleHas('showroom')) },
  warehouse: { group: 'commercial', name: { en: 'Warehouse / Depot', ar: 'مستودع', fr: 'Entrepôt / Dépôt' }, match: any(subIs('warehouse'), titleHas('warehouse', 'depot')) },
  workshop: { group: 'commercial', name: { en: 'Workshop / Factory', ar: 'مشغل / مصنع', fr: 'Atelier / Usine' }, match: any(subIs('workshop'), titleHas('workshop', 'factory')) },
  garage: { group: 'commercial', name: { en: 'Garage / Parking', ar: 'كاراج / موقف', fr: 'Garage / Parking' }, match: any(subIs('garage'), titleHas('garage', 'parking lot')) },
  nursery: { group: 'commercial', name: { en: 'Nursery', ar: 'حضانة', fr: 'Crèche' }, match: subIs('nursery') },
  commercial: { group: 'commercial', name: { en: 'All commercial', ar: 'كل العقارات التجارية', fr: 'Tout le commercial' }, match: (p) => p.type === 'commercial' || p.type === 'office' },

  land: { group: 'land', name: { en: 'All land', ar: 'كل الأراضي', fr: 'Tous les terrains' }, match: (p) => p.type === 'land' },
  'land-residential': { group: 'land', name: { en: 'Residential land', ar: 'أرض سكنية', fr: 'Terrain résidentiel' }, match: (p) => p.type === 'land' && sub(p) === 'residential' },
  'land-agricultural': { group: 'land', name: { en: 'Agricultural land', ar: 'أرض زراعية', fr: 'Terrain agricole' }, match: (p) => p.type === 'land' && sub(p) === 'agricultural' },
  'land-industrial': { group: 'land', name: { en: 'Industrial land', ar: 'أرض صناعية', fr: 'Terrain industriel' }, match: (p) => p.type === 'land' && sub(p) === 'industrial' },
}

export const propertyTypeKeys = Object.keys(TYPES)

export const matchesPropertyType = (p: Property, key: string) => !!TYPES[key]?.match(p)

// Dropdown options, grouped (rendered as <optgroup> by components/OptionList.tsx)
export function propertyTypeOptions(lang: Locale) {
  return propertyTypeKeys.map((key) => ({ value: key, label: TYPES[key].name[lang], group: GROUPS[TYPES[key].group][lang] }))
}
