#!/usr/bin/env node
// Weekly SEO health check for rukunrealestate.com.
// Crawls every URL in the sitemap and reports problems as Markdown on stdout.
// Usage: node scripts/seo-check.mjs [siteUrl]   (no dependencies, Node 18+)
// Exit code: 0 = no errors, 1 = errors found (warnings alone still exit 0).

const SITE = (process.argv[2] || 'https://www.rukunrealestate.com').replace(/\/$/, '')
const CRM = 'https://crm.rukunrealestate.com'
const CONCURRENCY = 3 // gentle: every page view also hits the CRM API
const SLOW_MS = 3000
const LANGS = ['en', 'ar', 'fr', 'x-default']

const errors = []
const warnings = []
const err = (msg) => errors.push(msg)
const warn = (msg) => warnings.push(msg)

async function get(url, { method = 'GET', redirect = 'manual' } = {}) {
  const start = Date.now()
  try {
    const res = await fetch(url, { method, redirect, headers: { 'User-Agent': 'RukunSEOCheck/1.0' }, signal: AbortSignal.timeout(30000) })
    const body = method === 'GET' && (res.headers.get('content-type') || '').match(/text|xml|json/) ? await res.text() : ''
    return { status: res.status, ms: Date.now() - start, body, location: res.headers.get('location') }
  } catch (e) {
    return { status: 0, ms: Date.now() - start, body: '', error: e.message }
  }
}

async function pool(items, fn) {
  const out = []
  let i = 0
  await Promise.all(Array.from({ length: CONCURRENCY }, async () => {
    while (i < items.length) { const idx = i++; out[idx] = await fn(items[idx]) }
  }))
  return out
}

const decode = (s) => s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>')
const pick = (html, re) => { const m = html.match(re); return m ? decode(m[1]).trim() : null }
const path = (url) => url.replace(SITE, '') || '/'
const sameUrl = (a, b) => !!a && !!b && a.replace(/\/$/, '') === b.replace(/\/$/, '')

// 1. robots.txt and sitemap
const robots = await get(`${SITE}/robots.txt`)
if (robots.status !== 200) err(`robots.txt returned ${robots.status}`)
else if (!robots.body.includes(`${SITE}/sitemap.xml`)) err('robots.txt does not point to the sitemap')

const sitemap = await get(`${SITE}/sitemap.xml`)
const urls = [...sitemap.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => decode(m[1]))
if (sitemap.status !== 200 || !urls.length) {
  err(`sitemap.xml returned ${sitemap.status} with ${urls.length} URLs — cannot continue`)
  report([])
  process.exit(1)
}

// 2. CRM feed
const crm = await get(`${CRM}/api/properties?limit=100`)
let listings = []
try { listings = JSON.parse(crm.body).properties ?? [] } catch {}
if (crm.status !== 200) err(`CRM property API returned ${crm.status} — the website cannot show listings`)
else if (!listings.length) warn('CRM property API returned 0 listings')
const listingUrls = urls.filter((u) => /\/properties\/[a-z0-9-]+-[0-9a-f]{8}$/.test(u) && !/\/(ar|fr)\//.test(u))
if (crm.status === 200 && listingUrls.length !== listings.length) {
  warn(`Sitemap has ${listingUrls.length} listing pages but the CRM publishes ${listings.length} listings`)
}
const untranslated = listings.filter((p) => !p.title_ar || !p.title_fr)
if (untranslated.length) warn(`${untranslated.length} listing(s) have no Arabic or French title: ${untranslated.map((p) => p.title.slice(0, 40)).join('; ')}`)

// 3. Crawl every sitemap URL
const pages = await pool(urls, async (url) => {
  const r = await get(url)
  const html = r.body
  return {
    url, status: r.status, ms: r.ms, location: r.location,
    lang: pick(html, /<html[^>]*\slang="([^"]+)"/),
    title: pick(html, /<title>([^<]*)<\/title>/),
    description: pick(html, /<meta name="description" content="([^"]*)"/),
    canonical: pick(html, /<link rel="canonical" href="([^"]+)"/),
    noindex: /<meta name="robots" content="[^"]*noindex/.test(html),
    hreflangs: [...html.matchAll(/<link rel="alternate" hrefLang="([^"]+)"/g)].map((m) => m[1]),
    h1s: (html.match(/<h1[\s>]/g) || []).length,
    links: [...html.matchAll(/href="(\/[^"#?]*)"/g)].map((m) => m[1]),
    images: [...html.matchAll(/<img[^>]*\ssrc="([^"]+)"/g)].map((m) => decode(m[1])),
  }
})

const byLang = {}
for (const p of pages) {
  const where = path(p.url)
  if (p.status !== 200) { err(`${where} returned ${p.status}${p.location ? ` → ${p.location}` : ''}`); continue }
  if (p.ms > SLOW_MS) warn(`${where} took ${(p.ms / 1000).toFixed(1)}s to load`)
  if (p.noindex) err(`${where} is in the sitemap but marked noindex`)
  if (!p.title) err(`${where} has no <title>`)
  else if (p.title.length > 70) warn(`${where} title is ${p.title.length} characters (Google shows about 60)`)
  if (!p.description) err(`${where} has no meta description`)
  else if (p.description.length < 50) warn(`${where} meta description is very short (${p.description.length} characters)`)
  if (!sameUrl(p.canonical, p.url)) err(`${where} canonical is ${p.canonical ?? 'missing'}`)
  const missing = LANGS.filter((l) => !p.hreflangs.includes(l))
  if (missing.length) err(`${where} is missing hreflang for ${missing.join(', ')}`)
  if (p.h1s !== 1) warn(`${where} has ${p.h1s} <h1> headings (expected 1)`)
  const l = p.lang || '?'
  byLang[l] ??= { titles: new Map(), descriptions: new Map() }
  if (p.title) byLang[l].titles.set(p.title, [...(byLang[l].titles.get(p.title) || []), where])
  if (p.description) byLang[l].descriptions.set(p.description, [...(byLang[l].descriptions.get(p.description) || []), where])
}
for (const [lang, { titles, descriptions }] of Object.entries(byLang)) {
  for (const [t, where] of titles) if (where.length > 1) warn(`Duplicate ${lang} title on ${where.length} pages (${where.slice(0, 3).join(', ')}): "${t.slice(0, 60)}"`)
  for (const [, where] of descriptions) if (where.length > 1) warn(`Duplicate ${lang} description on ${where.length} pages (${where.slice(0, 3).join(', ')})`)
}

// 4. Internal links not already crawled
const crawled = new Set(pages.map((p) => path(p.url)))
const linkSources = new Map()
for (const p of pages) for (const l of p.links) {
  if (crawled.has(l) || l.startsWith('/_next') || /\.\w{2,4}$/.test(l)) continue
  linkSources.set(l, linkSources.get(l) || path(p.url))
}
const linkResults = await pool([...linkSources.keys()], async (l) => ({ l, r: await get(`${SITE}${l}`) }))
for (const { l, r } of linkResults) {
  if (r.status >= 400 || r.status === 0) err(`Broken link ${l} (${r.status}) on ${linkSources.get(l)}`)
}

// 5. Images (a sample of each distinct image, served through Next's optimizer)
const images = [...new Set(pages.flatMap((p) => p.images))].slice(0, 60)
const imageResults = await pool(images, async (src) => ({ src, r: await get(src.startsWith('/') ? `${SITE}${src}` : src, { method: 'HEAD', redirect: 'follow' }) }))
const brokenImages = imageResults.filter(({ r }) => r.status !== 200)
for (const { src, r } of brokenImages.slice(0, 10)) err(`Image failed to load (${r.status}): ${src.slice(0, 120)}`)
if (brokenImages.length > 10) err(`…and ${brokenImages.length - 10} more broken images`)

report(pages, { links: linkResults.length, images: images.length, listings: listings.length })
process.exit(errors.length ? 1 : 0)

function report(pages, counts = {}) {
  const ok = pages.filter((p) => p.status === 200)
  const avg = ok.length ? Math.round(ok.reduce((s, p) => s + p.ms, 0) / ok.length) : 0
  const slowest = [...ok].sort((a, b) => b.ms - a.ms)[0]
  const status = errors.length ? '❌ Problems found' : warnings.length ? '⚠️ OK with warnings' : '✅ All good'
  const lines = [
    `# SEO check — ${new Date().toISOString().slice(0, 10)}`,
    '',
    `**${status}** — ${errors.length} error(s), ${warnings.length} warning(s)`,
    '',
    `- Pages in sitemap: ${pages.length} (${ok.length} loaded OK)`,
    `- Listings from CRM: ${counts.listings ?? '?'}`,
    `- Extra internal links checked: ${counts.links ?? 0}, images checked: ${counts.images ?? 0}`,
    `- Average load time: ${(avg / 1000).toFixed(2)}s${slowest ? `, slowest: ${path(slowest.url)} (${(slowest.ms / 1000).toFixed(1)}s)` : ''}`,
    '',
  ]
  if (errors.length) lines.push('## Errors', ...errors.map((e) => `- ${e}`), '')
  if (warnings.length) lines.push('## Warnings', ...warnings.map((w) => `- ${w}`), '')
  console.log(lines.join('\n'))
}
