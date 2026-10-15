import { ChevronDown } from 'lucide-react'
import type { FaqItem } from '@/lib/faq'

// FAQ list plus FAQPage structured data for search engines
export default function Faq({ items, title }: { items: FaqItem[]; title: string }) {
  if (!items.length) return null
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  }
  return (
    <section className="mb-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-6">{title}</h2>
      <div className="space-y-3 max-w-3xl">
        {items.map((f, i) => (
          <details key={i} className="group rounded-xl border border-white/5 bg-white/3 open:border-brand-gold/20">
            <summary className="flex items-center justify-between gap-4 cursor-pointer list-none px-5 py-4 text-white font-medium">
              {f.q}
              <ChevronDown size={18} className="text-brand-gold shrink-0 transition-transform group-open:rotate-180" />
            </summary>
            <p className="px-5 pb-5 text-gray-400 text-sm leading-relaxed">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  )
}
