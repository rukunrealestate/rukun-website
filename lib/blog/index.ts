import type { Article } from './types'
import buying from './buying-property-in-lebanon'
import renting from './renting-an-apartment-in-beirut'
import achrafiehOrMetn from './achrafieh-or-metn'
import questions from './questions-before-buying-an-apartment'
import selling from './selling-property-in-lebanon'
import rentingOut from './renting-out-your-property-in-lebanon'
import fromAbroad from './buying-property-in-lebanon-from-abroad'
import office from './renting-an-office-in-beirut'
import prices from './property-prices-in-lebanon'

export type { Article, Block, ArticleText } from './types'

// Newest first. To add an article: create a file like the ones above and list it here.
export const articles: Article[] = [buying, renting, achrafiehOrMetn, questions, selling, rentingOut, fromAbroad, office, prices]
  .sort((a, b) => b.published.localeCompare(a.published))

export const getArticle = (slug: string) => articles.find((a) => a.slug === slug)
