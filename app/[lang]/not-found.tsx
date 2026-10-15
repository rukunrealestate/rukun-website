'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { getDictionary, hasLocale, localePath, defaultLocale } from '@/lib/i18n'

export default function NotFound() {
  const params = useParams<{ lang?: string }>()
  const lang = params?.lang && hasLocale(params.lang) ? params.lang : defaultLocale
  const t = getDictionary(lang).notFound

  return (
    <div className="min-h-screen flex items-center justify-center px-6 text-center">
      <div>
        <div className="font-heading text-7xl font-bold text-gold-gradient mb-4">404</div>
        <h1 className="font-heading text-3xl font-bold text-white mb-3">{t.title}</h1>
        <p className="text-gray-400 mb-8 max-w-md mx-auto">{t.text}</p>
        <Link href={localePath(lang, '/properties')}
          className="inline-block bg-brand-gold hover:bg-brand-gold-light text-brand-black font-semibold px-6 py-3 rounded-xl text-sm transition-colors">
          {t.button}
        </Link>
      </div>
    </div>
  )
}
