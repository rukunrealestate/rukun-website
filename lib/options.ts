import { getDictionary, type Locale } from '@/lib/i18n'
import { searchAreaOptions } from '@/lib/searchAreas'
import { propertyTypeOptions } from '@/lib/propertyTypes'

// Dropdown options shared by the filters, the "Notify me" form and the owner form
export function selectOptions(lang: Locale) {
  const t = getDictionary(lang).props
  return {
    txOptions: [{ value: 'sale', label: t.forSale }, { value: 'rent', label: t.forRent }],
    typeOptions: propertyTypeOptions(lang),
    areaOptions: searchAreaOptions(lang),
  }
}
