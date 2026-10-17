import { propertyKind, type Property } from '@/lib/properties'
import { inArea } from '@/lib/categories'
import { areaGuideKeys } from '@/lib/areaGuides'

// Up to `limit` listings like this one: same sale/rent, ranked by shared area, same type and closeness in price
export function similarProperties(property: Property, all: Property[], limit = 3) {
  const areas = areaGuideKeys.filter((k) => inArea(property, k))
  const kind = propertyKind(property)
  return all
    .filter((p) => p.id !== property.id && p.transaction_type === property.transaction_type)
    .map((p) => {
      const sharedArea = areas.some((k) => inArea(p, k))
      const priceRatio = property.price > 0 && p.price > 0 ? Math.max(p.price, property.price) / Math.min(p.price, property.price) : 10
      const score = (sharedArea ? 3 : 0) + (propertyKind(p) === kind ? 2 : 0) + (priceRatio <= 1.5 ? 1 : 0) + (p.images?.length ? 0.5 : 0) - priceRatio * 0.1
      return { p, score }
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ p }) => p)
}
