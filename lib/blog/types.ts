import type { Locale } from '@/lib/i18n'

// A block of article content. Paragraph and list text may contain links written as
// [label](/path) — site paths are localized automatically.
export type Block =
  | { h2: string }
  | { p: string }
  | { ul: string[] }
  | { tip: string }

export interface ArticleText {
  title: string
  description: string
  body: Block[]
}

export interface Article {
  slug: string
  published: string // YYYY-MM-DD
  updated?: string
  readMinutes: number
  text: Record<Locale, ArticleText>
}
