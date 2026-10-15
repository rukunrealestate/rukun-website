import { getDictionary, type Locale } from '@/lib/i18n'

const values = ['500+', '12+', '98%', '50+']

export default function Stats({ lang }: { lang: Locale }) {
  const stats = getDictionary(lang).stats.map((label, i) => ({ value: values[i], label }))
  return (
    <section className="bg-brand-gold/5 border-y border-brand-gold/10 py-14">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
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
