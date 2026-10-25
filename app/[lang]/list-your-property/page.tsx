import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import OwnerPage from '@/components/leads/OwnerPage'
import { hasLocale, getDictionary, alternatesFor } from '@/lib/i18n'
import { pageOpenGraph, imageLang } from '@/lib/og'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  if (!hasLocale(lang)) return {}
  const t = getDictionary(lang).leads
  const ti = getDictionary(imageLang(lang)).leads
  return {
    title: t.ownerMetaTitle,
    description: t.ownerMetaDesc,
    alternates: alternatesFor(lang, '/list-your-property'),
    ...pageOpenGraph(lang, { title: t.ownerMetaTitle, description: t.ownerMetaDesc, path: '/list-your-property', image: { title: ti.ownerTitle, kicker: ti.ownerEyebrow } }),
  }
}

export default async function ListYourPropertyPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  return <OwnerPage lang={lang} />
}
