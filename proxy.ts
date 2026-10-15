import { NextResponse, type NextRequest } from 'next/server'
import { locales, defaultLocale } from '@/lib/i18n'

// English is served without a prefix: "/about" is rewritten internally to "/en/about",
// and "/en/about" redirects to "/about" so each page has a single URL.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const first = pathname.split('/')[1]

  if (first === defaultLocale) {
    const url = request.nextUrl.clone()
    url.pathname = pathname.slice(defaultLocale.length + 1) || '/'
    return NextResponse.redirect(url, 308)
  }

  if ((locales as readonly string[]).includes(first)) return

  const url = request.nextUrl.clone()
  url.pathname = `/${defaultLocale}${pathname === '/' ? '' : pathname}`
  return NextResponse.rewrite(url)
}

export const config = {
  // Skip Next internals, metadata routes and anything with a file extension
  matcher: ['/((?!_next|api|robots\\.txt|sitemap\\.xml|.*\\..*).*)'],
}
