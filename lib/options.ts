import { getDictionary, type Locale } from '@/lib/i18n'
import { typeLabel } from '@/lib/properties'
import { areaGuides, areaGuideKeys } from '@/lib/areaGuides'
import { TYPE_OPTIONS } from '@/lib/filters'

// Dropdown options shared by the filters, the "Notify me" form and the owner form
export function selectOptions(lang: Locale) {
  const t = getDictionary(lang).props
  return {
    txOptions: [{ value: 'sale', label: t.forSale }, { value: 'rent', label: t.forRent }],
    typeOptions: TYPE_OPTIONS.map((k) => ({ value: k, label: typeLabel(k, lang) })),
    areaOptions: areaGuideKeys.map((k) => ({ value: k, label: areaGuides[k].name[lang] })),
  }
}
