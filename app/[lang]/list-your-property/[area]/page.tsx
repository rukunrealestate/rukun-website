import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import OwnerPage from '@/components/leads/OwnerPage'
import { hasLocale, getDictionary, alternatesFor } from '@/lib/i18n'
import { pageOpenGraph, imageLang } from '@/lib/og'
import { areaGuides } from '@/lib/areaGuides'
import { areaAt } from '@/lib/categories'

type Params = { params: Promise<{ lang: string; area: string }> }

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang, area } = await params
  if (!hasLocale(lang) || !areaGuides[area]) return {}
  const t = getDictionary(lang).leads
  const il = imageLang(lang)
  const ti = getDictionary(il).leads
  const title = t.ownerAreaMetaTitle.replace('{at}', areaAt(area, lang))
  const description = t.ownerAreaDesc.replace('{at}', areaAt(area, lang))
  return {
    title: { absolute: `${title} | Rukun` },
    description,
    alternates: alternatesFor(lang, `/list-your-property/${area}`),
    ...pageOpenGraph(lang, {
      title,
      description,
      path: `/list-your-property/${area}`,
      image: { title: ti.ownerAreaTitle.replace('{at}', areaAt(area, il)), kicker: ti.ownerEyebrow },
    }),
  }
}

export default async function ListYourPropertyAreaPage({ params }: Params) {
  const { lang, area } = await params
  if (!hasLocale(lang) || !areaGuides[area]) notFound()
  return <OwnerPage lang={lang} area={area} />
}
