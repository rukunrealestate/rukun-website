import { SITE_URL } from '@/lib/properties'
import sitemap from '@/app/sitemap'

export const dynamic = 'force-dynamic'

// IndexNow tells Bing (which powers ChatGPT and Copilot search), Yandex and others which pages
// exist, so new listings are picked up within days. A Vercel cron calls this once a day (vercel.json).
// The key is also published at /<key>.txt so the search engines can confirm the site is ours.
const KEY = 'a919fbe4e2e4e4d02170502413c8367a'

export async function GET(request: Request) {
  // Vercel sends "Authorization: Bearer <CRON_SECRET>" when CRON_SECRET is set; otherwise accept its cron user agent
  const secret = process.env.CRON_SECRET
  const auth = request.headers.get('authorization')
  const ok = secret ? auth === `Bearer ${secret}` : (request.headers.get('user-agent') ?? '').includes('vercel-cron')
  if (!ok) return new Response('Unauthorized', { status: 401 })

  const urlList = [...new Set((await sitemap()).map((e) => e.url))]
  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: new URL(SITE_URL).host, key: KEY, keyLocation: `${SITE_URL}/${KEY}.txt`, urlList }),
  })
  return Response.json({ submitted: urlList.length, status: res.status })
}
