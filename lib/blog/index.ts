import type { Article } from './types'
import buying from './buying-property-in-lebanon'
import renting from './renting-an-apartment-in-beirut'
import achrafiehOrMetn from './achrafieh-or-metn'
import questions from './questions-before-buying-an-apartment'

export type { Article, Block, ArticleText } from './types'

// Newest first. To add an article: create a file like the ones above and list it here.
export const articles: Article[] = [buying, renting, achrafiehOrMetn, questions]
  .sort((a, b) => b.published.localeCompare(a.published))

export const getArticle = (slug: string) => articles.find((a) => a.slug === slug)
