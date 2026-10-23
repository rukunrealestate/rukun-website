import type { Locale } from '@/lib/i18n'
import type { Property } from '@/lib/properties'
import { inArea } from '@/lib/categories'
import { areaGuides } from '@/lib/areaGuides'

// Areas for the search dropdowns, covering all of Lebanon by region.
// The six areas that have a guide (beirut, achrafieh, metn, aley, jbeil, keserwan) keep the
// matching rules from lib/categories.ts; the others match town names in the listing's location/city,
// or the CRM district.

type Region = 'beirut' | 'mount' | 'north' | 'south' | 'bekaa'

const REGIONS: Record<Region, Record<Locale, string>> = {
  beirut: { en: 'Beirut', ar: 'بيروت', fr: 'Beyrouth' },
  mount: { en: 'Mount Lebanon', ar: 'جبل لبنان', fr: 'Mont-Liban' },
  north: { en: 'North Lebanon', ar: 'الشمال', fr: 'Liban-Nord' },
  south: { en: 'South Lebanon', ar: 'الجنوب', fr: 'Liban-Sud' },
  bekaa: { en: 'Bekaa', ar: 'البقاع', fr: 'Békaa' },
}

interface SearchArea {
  region: Region
  name?: Record<Locale, string> // guide areas take their name from lib/areaGuides.ts
  keywords?: string[]
  districts?: string[]
}

const AREAS: Record<string, SearchArea> = {
  beirut: { region: 'beirut' },
  achrafieh: { region: 'beirut' },
  hamra: {
    region: 'beirut',
    name: { en: 'Hamra & Ras Beirut', ar: 'الحمرا ورأس بيروت', fr: 'Hamra et Ras Beyrouth' },
    keywords: ['hamra', 'ras beirut', 'manara', 'clemenceau', 'koraytem', 'raouche', 'ain el mreisseh', 'ain mreisseh'],
  },
  downtown: {
    region: 'beirut',
    name: { en: 'Downtown Beirut', ar: 'وسط بيروت', fr: 'Centre-ville de Beyrouth' },
    keywords: ['downtown', 'solidere', 'saifi', 'bab idriss', 'beirut marina', 'zeitouna', 'zaitunay', 'mina el hosn', 'mina el hoson'],
  },
  metn: { region: 'mount' },
  baabda: {
    region: 'mount',
    name: { en: 'Baabda', ar: 'بعبدا', fr: 'Baabda' },
    keywords: ['baabda', 'hazmieh', 'hadath', 'yarzeh', 'furn el chebbak', 'ain el remmaneh', 'chiyah', 'louaizeh', 'kfarshima', 'bsaba', 'haret hreik', 'ghobeiry', 'bir hassan'],
    districts: ['baabda'],
  },
  keserwan: { region: 'mount' },
  jbeil: { region: 'mount' },
  aley: { region: 'mount' },
  chouf: {
    region: 'mount',
    name: { en: 'Chouf', ar: 'الشوف', fr: 'Chouf' },
    keywords: ['chouf', 'damour', 'deir el qamar', 'beiteddine', 'baakline', 'jiyeh', 'naameh', 'barja', 'mechref', 'dibbiyeh'],
    districts: ['chouf'],
  },
  batroun: {
    region: 'north',
    name: { en: 'Batroun', ar: 'البترون', fr: 'Batroun' },
    keywords: ['batroun', 'chekka', 'kfar abida', 'tannourine', 'thoum', 'selaata', 'douma'],
    districts: ['batroun'],
  },
  koura: {
    region: 'north',
    name: { en: 'Koura', ar: 'الكورة', fr: 'Koura' },
    keywords: ['koura', 'amioun', 'kousba', 'enfeh', 'balamand', 'kfarhazir'],
    districts: ['koura'],
  },
  tripoli: {
    region: 'north',
    name: { en: 'Tripoli', ar: 'طرابلس', fr: 'Tripoli' },
    keywords: ['tripoli', 'trablos', 'tarablus', 'el mina', 'dam w farez', 'dam wal farez', 'zahrieh', 'abou samra', 'bahsas'],
    districts: ['tripoli'],
  },
  zgharta: {
    region: 'north',
    name: { en: 'Zgharta', ar: 'زغرتا', fr: 'Zghorta' },
    keywords: ['zgharta', 'zghorta', 'ehden', 'ardeh', 'miziara'],
    districts: ['zgharta'],
  },
  bcharre: {
    region: 'north',
    name: { en: 'Bcharre', ar: 'بشري', fr: 'Bcharré' },
    keywords: ['bcharre', 'bsharri', 'bsharre', 'cedars', 'hasroun', 'hadchit'],
    districts: ['bcharre', 'bsharri'],
  },
  akkar: {
    region: 'north',
    name: { en: 'Akkar', ar: 'عكار', fr: 'Akkar' },
    keywords: ['akkar', 'halba', 'qoubaiyat', 'kobayat', 'bebnine', 'andket'],
    districts: ['akkar'],
  },
  dannieh: {
    region: 'north',
    name: { en: 'Minieh-Danniyeh', ar: 'المنية - الضنية', fr: 'Minié-Denniyé' },
    keywords: ['dannieh', 'danniyeh', 'minieh', 'sir ed danniyeh'],
    districts: ['minieh-danniyeh', 'dannieh'],
  },
  saida: {
    region: 'south',
    name: { en: 'Saida (Sidon)', ar: 'صيدا', fr: 'Saïda' },
    keywords: ['saida', 'sidon', 'abra', 'haret saida', 'maghdouche', 'miyeh w miyeh'],
    districts: ['saida', 'sidon'],
  },
  jezzine: {
    region: 'south',
    name: { en: 'Jezzine', ar: 'جزين', fr: 'Jezzine' },
    keywords: ['jezzine', 'jezzin', 'kfarhouna', 'bkassine'],
    districts: ['jezzine'],
  },
  tyre: {
    region: 'south',
    name: { en: 'Tyre (Sour)', ar: 'صور', fr: 'Tyr' },
    keywords: ['tyre', 'sour', 'naqoura', 'qana'],
    districts: ['tyre', 'sour'],
  },
  nabatieh: {
    region: 'south',
    name: { en: 'Nabatieh', ar: 'النبطية', fr: 'Nabatiyé' },
    keywords: ['nabatieh', 'nabatiyeh', 'kfar remen', 'habbouch'],
    districts: ['nabatieh'],
  },
  marjeyoun: {
    region: 'south',
    name: { en: 'Marjeyoun & Hasbaya', ar: 'مرجعيون وحاصبيا', fr: 'Marjayoun et Hasbaya' },
    keywords: ['marjeyoun', 'marjayoun', 'khiam', 'hasbaya', 'qlayaa'],
    districts: ['marjeyoun', 'marjayoun', 'hasbaya'],
  },
  zahle: {
    region: 'bekaa',
    name: { en: 'Zahle', ar: 'زحلة', fr: 'Zahlé' },
    keywords: ['zahle', 'zahleh', 'chtaura', 'chtoura', 'ksara', 'taanayel', 'qab elias', 'kab elias', 'saadnayel', 'rayak', 'anjar', 'bar elias'],
    districts: ['zahle', 'zahleh'],
  },
  westbekaa: {
    region: 'bekaa',
    name: { en: 'West Bekaa & Rashaya', ar: 'البقاع الغربي وراشيا', fr: 'Békaa-Ouest et Rachaya' },
    keywords: ['west bekaa', 'joub jannine', 'jeb jannine', 'saghbine', 'qaraoun', 'machghara', 'rashaya', 'rachaya'],
    districts: ['west bekaa', 'rashaya', 'rachaya'],
  },
  baalbek: {
    region: 'bekaa',
    name: { en: 'Baalbek & Hermel', ar: 'بعلبك والهرمل', fr: 'Baalbek-Hermel' },
    keywords: ['baalbek', 'baalbeck', 'hermel', 'deir el ahmar'],
    districts: ['baalbek', 'hermel', 'baalbek-hermel'],
  },
}

export const searchAreaKeys = Object.keys(AREAS)

export const searchAreaName = (key: string, lang: Locale) => AREAS[key].name?.[lang] ?? areaGuides[key].name[lang]

// Whole-word match, so "sour" doesn't match "Mansourieh"
const hasWord = (text: string, word: string) => new RegExp(`(^|[^a-z])${word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}([^a-z]|$)`).test(text)

export function inSearchArea(p: Property, key: string) {
  const a = AREAS[key]
  if (!a) return false
  if (!a.name) return inArea(p, key)
  const text = `${p.location ?? ''} ${p.city ?? ''}`.toLowerCase()
  if (a.keywords?.some((k) => hasWord(text, k))) return true
  return !!a.districts?.includes((p.district ?? '').toLowerCase())
}

// Dropdown options, grouped by region (rendered as <optgroup> by components/OptionList.tsx)
export function searchAreaOptions(lang: Locale) {
  return searchAreaKeys.map((key) => ({ value: key, label: searchAreaName(key, lang), group: REGIONS[AREAS[key].region][lang] }))
}
