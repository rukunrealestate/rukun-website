import { ImageResponse } from 'next/og'
import type { NextRequest } from 'next/server'
import { skipOptimization } from '@/lib/images'

// Branded 1200×630 link-preview image: /api/og?title=…&kicker=…&detail=…&photo=…
// (built by ogImageUrl in lib/og.ts)

const GOLD = '#C9A96E'
const GOLD_LIGHT = '#E8D5B0'
const BLACK = '#0A0A0A'
// Cached a day in browsers and a week at the edge; the URL changes whenever the text changes
const CACHE = 'public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400'

// Loads just the glyphs needed from Google Fonts as TTF (the format the renderer accepts)
async function googleFont(family: string, weight: number, text: string) {
  try {
    const css = await (await fetch(`https://fonts.googleapis.com/css2?family=${family}:wght@${weight}&text=${encodeURIComponent(text)}`)).text()
    const url = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/)?.[1]
    if (!url) return null
    return await (await fetch(url)).arrayBuffer()
  } catch {
    return null
  }
}

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams
  const title = (q.get('title') || 'Rukun Real Estate').slice(0, 120)
  const kicker = (q.get('kicker') || 'Rukun Real Estate · Lebanon').slice(0, 60)
  const detail = (q.get('detail') || '').slice(0, 80)
  const photoParam = q.get('photo')
  const photo = photoParam && !skipOptimization(photoParam) ? photoParam : null
  const logo = new URL('/logo.png', request.nextUrl.origin).toString()

  const [playfair, inter] = await Promise.all([
    googleFont('Playfair+Display', 700, title),
    // Every Inter string on the image, in both cases (some are shown uppercase)
    googleFont('Inter', 500, (s => s + s.toUpperCase())(`${kicker}${detail}Rukun Real Estate · Interior Design rukunrealestate.com`)),
  ])
  const fonts = [
    ...(playfair ? [{ name: 'Playfair', data: playfair, weight: 700 as const, style: 'normal' as const }] : []),
    ...(inter ? [{ name: 'Inter', data: inter, weight: 500 as const, style: 'normal' as const }] : []),
  ]

  const titleSize = title.length > 70 ? 46 : title.length > 45 ? 54 : 64

  const render = (withPhoto: boolean) => new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', background: BLACK, fontFamily: 'Inter' }}>
        {/* Text panel */}
        <div style={{
          width: withPhoto ? 680 : 1200, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          padding: '56px 64px',
          backgroundImage: `radial-gradient(circle at 85% 20%, rgba(201,169,110,0.16), transparent 55%)`,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <img src={logo} width={84} height={84} style={{ borderRadius: 12 }} />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ color: GOLD, fontSize: 22, letterSpacing: 4, textTransform: 'uppercase' }}>Rukun</div>
              <div style={{ color: '#9CA3AF', fontSize: 16, letterSpacing: 3, textTransform: 'uppercase' }}>Real Estate · Interior Design</div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ color: GOLD, fontSize: 22, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 18 }}>{kicker}</div>
            <div style={{ color: 'white', fontFamily: 'Playfair', fontSize: titleSize, lineHeight: 1.12, marginBottom: 22 }}>{title}</div>
            <div style={{ width: 90, height: 3, background: `linear-gradient(90deg, ${GOLD}, ${GOLD_LIGHT})`, marginBottom: 22 }} />
            {detail ? <div style={{ color: GOLD_LIGHT, fontSize: 30 }}>{detail}</div> : null}
          </div>

          <div style={{ color: '#9CA3AF', fontSize: 22 }}>rukunrealestate.com</div>
        </div>

        {/* Photo panel */}
        {withPhoto && photo ? (
          <div style={{ width: 520, height: '100%', display: 'flex', position: 'relative' }}>
            <img src={photo} width={520} height={630} style={{ objectFit: 'cover', width: 520, height: 630 }} />
            <div style={{ position: 'absolute', left: 0, top: 0, width: 140, height: 630, backgroundImage: `linear-gradient(90deg, ${BLACK}, rgba(10,10,10,0))` }} />
          </div>
        ) : null}
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts,
      headers: { 'Cache-Control': CACHE },
    },
  )

  // If the photo can't be fetched, fall back to the text-only design rather than failing
  let withPhoto = false
  if (photo) {
    try { withPhoto = (await fetch(photo, { method: 'HEAD' })).ok } catch {}
  }
  const png = render(withPhoto)

  // The renderer only makes PNGs; with a photo they're ~650 KB, and WhatsApp skips preview
  // images much over 300 KB. Re-encode as JPEG (~60 KB), keeping the PNG if that fails.
  try {
    const sharp = (await import('sharp')).default
    const jpeg = await sharp(Buffer.from(await png.arrayBuffer())).jpeg({ quality: 82, mozjpeg: true }).toBuffer()
    return new Response(new Uint8Array(jpeg), { headers: { 'Content-Type': 'image/jpeg', 'Cache-Control': CACHE } })
  } catch {
    return render(withPhoto)
  }
}
