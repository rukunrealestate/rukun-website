import Link from 'next/link'
import { Lightbulb } from 'lucide-react'
import { localePath, type Locale } from '@/lib/i18n'
import type { Block } from '@/lib/blog'

const LINK_RE = /\[([^\]]+)\]\(([^)]+)\)/g

// Renders text with [label](/path) links; site paths point to the reader's language
function RichText({ text, lang }: { text: string; lang: Locale }) {
  const parts: React.ReactNode[] = []
  let last = 0
  for (const m of text.matchAll(LINK_RE)) {
    const [whole, label, href] = m
    parts.push(text.slice(last, m.index))
    parts.push(href.startsWith('/')
      ? <Link key={m.index} href={localePath(lang, href)} className="text-brand-gold hover:text-brand-gold-light underline underline-offset-2">{label}</Link>
      : <a key={m.index} href={href} target="_blank" rel="noopener noreferrer" className="text-brand-gold hover:text-brand-gold-light underline underline-offset-2">{label}</a>)
    last = m.index! + whole.length
  }
  parts.push(text.slice(last))
  return <>{parts}</>
}

export default function ArticleBody({ blocks, lang }: { blocks: Block[]; lang: Locale }) {
  return (
    <div className="space-y-5 text-gray-300 leading-relaxed">
      {blocks.map((b, i) => {
        if ('h2' in b) return <h2 key={i} className="font-heading text-2xl font-bold text-white pt-4">{b.h2}</h2>
        if ('p' in b) return <p key={i}><RichText text={b.p} lang={lang} /></p>
        if ('ul' in b) return (
          <ul key={i} className="space-y-2 ps-5 list-disc marker:text-brand-gold">
            {b.ul.map((item, j) => <li key={j}><RichText text={item} lang={lang} /></li>)}
          </ul>
        )
        return (
          <div key={i} className="flex gap-3 rounded-xl border border-brand-gold/20 bg-brand-gold/5 p-5">
            <Lightbulb size={18} className="text-brand-gold shrink-0 mt-1" />
            <p className="text-gray-300"><RichText text={b.tip} lang={lang} /></p>
          </div>
        )
      })}
    </div>
  )
}
