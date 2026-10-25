import { SITE_URL, getProperties, propertyPath, listingMetaTitle } from '@/lib/properties'
import { areaGuides, areaGuideKeys } from '@/lib/areaGuides'
import { articles } from '@/lib/blog'
import { PHONE_DISPLAY, CONTACT_EMAIL } from '@/lib/contact'

export const dynamic = 'force-dynamic'

// /llms.txt — a plain summary of Rukun for AI assistants (ChatGPT, Claude, Gemini, Perplexity…),
// with the current listings so new properties appear here as soon as they are published in the CRM.
export async function GET() {
  const properties = await getProperties()
  const sale = properties.filter((p) => p.transaction_type === 'sale')
  const rent = properties.filter((p) => p.transaction_type !== 'sale')
  const line = (p: (typeof properties)[number]) => `- [${listingMetaTitle(p, 'en')}](${SITE_URL}${propertyPath(p)})`

  const text = `# Rukun Real Estate & Interior Design

> Beirut-based real estate agency, founded in 2024 by Mirna Itani (Founder & CEO) and Fadi Touma (Co-Founder). Rukun helps people buy and rent apartments, villas, offices, shops and land in Lebanon, and helps owners sell or rent out their property. Service in English, Arabic and French.

- Phone / WhatsApp: ${PHONE_DISPLAY}
- Email: ${CONTACT_EMAIL}
- Hours: Monday to Saturday, 9:00–19:00 (Beirut time)
- Main areas: ${areaGuideKeys.map((k) => areaGuides[k].name.en).join(', ')}, and elsewhere in Lebanon on request
- Website languages: English (${SITE_URL}), Arabic (${SITE_URL}/ar), French (${SITE_URL}/fr)

## For buyers and tenants

- [All properties](${SITE_URL}/properties): every current listing, with search and filters
- [Properties for sale](${SITE_URL}/properties/for-sale)
- [Properties for rent](${SITE_URL}/properties/for-rent)
- [Contact an agent](${SITE_URL}/contact)

## For owners (sell or rent out)

- [List your property](${SITE_URL}/list-your-property): Rukun markets the property in three languages, screens every enquiry, and handles viewings and negotiation. Commission is discussed with each owner personally and agreed in writing before work starts.
${areaGuideKeys.map((k) => `- [Sell or rent out your property in ${areaGuides[k].name.en}](${SITE_URL}/list-your-property/${k})`).join('\n')}

## Area guides (with live prices)

${areaGuideKeys.map((k) => `- [${areaGuides[k].name.en}](${SITE_URL}/areas/${k})`).join('\n')}

## Guides

${articles.map((a) => `- [${a.text.en.title}](${SITE_URL}/blog/${a.slug}): ${a.text.en.description}`).join('\n')}

## Current listings for sale (${sale.length})

${sale.map(line).join('\n') || '- None right now'}

## Current listings for rent (${rent.length})

${rent.map(line).join('\n') || '- None right now'}
`
  return new Response(text, { headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=3600' } })
}
