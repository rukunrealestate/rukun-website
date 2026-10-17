import { getDictionary, type Locale } from '@/lib/i18n'
import { getProperties } from '@/lib/properties'
import { areaGuideKeys } from '@/lib/areaGuides'

// Only facts we can stand behind: the live listing count, the founding year and the areas we cover
export default async function Stats({ lang }: { lang: Locale }) {
  const listings = (await getProperties()).length
  const values = [listings ? String(listings) : null, '2024', String(areaGuideKeys.length)]
  const stats = getDictionary(lang).stats
    .map((label, i) => ({ value: values[i], label }))
    .filter((s) => s.value)

  return (
    <section className="bg-brand-gold/5 border-y border-brand-gold/10 py-14">
      <div className="max-w-7xl mx-auto px-6">
        <div className={`grid gap-8 ${stats.length === 3 ? 'grid-cols-3' : 'grid-cols-2'}`}>
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="font-heading text-4xl md:text-5xl font-bold text-gold-gradient mb-2" dir="ltr">
                {stat.value}
              </div>
              <div className="text-gray-400 text-sm tracking-wide">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
