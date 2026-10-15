import type { Locale } from '@/lib/i18n'
import { formatPrice, propertyKind, typeLabel, type Property } from '@/lib/properties'
import { categoryTitle, type Category } from '@/lib/categories'

// FAQ answers are computed from the live listings, so they stay accurate as properties change.

export interface FaqItem { q: string; a: string }

const usd = (n: number) => formatPrice(Math.round(n), 'USD', 'sale')
const isHome = (p: Property) => p.type === 'apartment' || p.type === 'villa'

function median(nums: number[]) {
  const s = [...nums].sort((a, b) => a - b)
  const m = Math.floor(s.length / 2)
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2
}

function priceText(ps: Property[], lang: Locale) {
  const prices = ps.map((p) => p.price).filter((n) => n > 0)
  if (!prices.length) return null
  const tx = ps[0].transaction_type
  const fmt = (n: number) => formatPrice(Math.round(n), 'USD', tx, lang)
  const min = fmt(Math.min(...prices)), max = fmt(Math.max(...prices)), med = fmt(median(prices))
  if (prices.length === 1) {
    return { en: `Right now there is one listing, at ${min}.`, ar: `يوجد حالياً عقار واحد بسعر ${min}.`, fr: `Il y a actuellement une annonce, à ${min}.` }[lang]
  }
  return {
    en: `Right now, listings range from ${min} to ${max}, with a median of ${med}.`,
    ar: `حالياً تتراوح الأسعار بين ${min} و${max}، والسعر الوسطي ${med}.`,
    fr: `Actuellement, les prix vont de ${min} à ${max}, avec un prix médian de ${med}.`,
  }[lang]
}

function perSqm(ps: Property[]) {
  const vals = ps.filter((p) => p.transaction_type === 'sale' && p.price > 0 && (p.area_sqm ?? 0) > 0).map((p) => p.price / p.area_sqm!)
  return vals.length ? { value: median(vals), n: vals.length } : null
}

function perSqmText(ps: Property[], lang: Locale) {
  const s = perSqm(ps)
  if (!s) return null
  return {
    en: `That works out to a median of about ${usd(s.value)} per m².`,
    ar: `أي ما يعادل سعراً وسطياً يقارب ${usd(s.value)} للمتر المربع.`,
    fr: `Soit un prix médian d’environ ${usd(s.value)} le m².`,
  }[lang]
}

function sizeText(ps: Property[], lang: Locale) {
  const areas = ps.map((p) => p.area_sqm ?? 0).filter((n) => n > 0)
  if (!areas.length) return null
  const beds = ps.map((p) => p.bedrooms ?? 0).filter((n) => n > 0)
  const a = { min: Math.min(...areas), max: Math.max(...areas) }
  const sizes = a.min === a.max
    ? { en: `${a.min} m²`, ar: `${a.min} م²`, fr: `${a.min} m²` }[lang]
    : { en: `from ${a.min} m² to ${a.max} m²`, ar: `من ${a.min} إلى ${a.max} م²`, fr: `de ${a.min} m² à ${a.max} m²` }[lang]
  let text = { en: `Sizes range ${sizes}.`, ar: `تتراوح المساحات ${sizes}.`, fr: `Les surfaces vont ${sizes}.` }[lang]
  if (a.min === a.max) text = { en: `The available listing is ${sizes}.`, ar: `مساحة العقار المتوفر ${sizes}.`, fr: `Le bien disponible fait ${sizes}.` }[lang]
  if (beds.length) {
    const b = { min: Math.min(...beds), max: Math.max(...beds) }
    const range = b.min === b.max ? `${b.min}` : `${b.min}–${b.max}`
    text += ' ' + { en: `Apartments have ${range} bedrooms.`, ar: `عدد غرف النوم ${range}.`, fr: `Les logements ont ${range} chambres.` }[lang]
  }
  return text
}

function locationsText(ps: Property[], lang: Locale) {
  const counts = new Map<string, number>()
  for (const p of ps) {
    const name = (p.location || p.city || '').trim()
    if (name) counts.set(name, (counts.get(name) ?? 0) + 1)
  }
  const top = [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6).map(([n]) => n)
  if (!top.length) return null
  const list = top.join(lang === 'ar' ? '، ' : ', ')
  return { en: `Current listings are in ${list}.`, ar: `العقارات الحالية موجودة في: ${list}.`, fr: `Les biens actuels se trouvent à ${list}.` }[lang]
}

const contactAnswer: Record<Locale, FaqItem> = {
  en: {
    q: 'How do I arrange a viewing?',
    a: 'Call or WhatsApp Rukun on +961 3 709 240 (Mon–Sat, 9am–7pm), or send a message through the contact form. An agent will confirm a private viewing time with you, usually within a few hours.',
  },
  ar: {
    q: 'كيف أحجز موعداً لمعاينة عقار؟',
    a: 'اتصل بركن أو راسلنا على واتساب على 240 709 3 961+ (من الاثنين إلى السبت، 9 صباحاً–7 مساءً)، أو أرسل رسالة عبر نموذج التواصل. سيحدد معك أحد وكلائنا موعداً لزيارة خاصة، عادةً خلال ساعات قليلة.',
  },
  fr: {
    q: 'Comment organiser une visite ?',
    a: 'Appelez Rukun ou écrivez-nous sur WhatsApp au +961 3 709 240 (du lundi au samedi, 9h–19h), ou envoyez un message via le formulaire de contact. Un agent vous proposera un créneau de visite privée, généralement en quelques heures.',
  },
}

const unlistedAnswer: Record<Locale, FaqItem> = {
  en: {
    q: "Can you help me find a property that isn't listed here?",
    a: 'Yes. New properties come in every week, and not all of them are published online straight away. Tell us your budget, preferred area and size, and we will send you matching options.',
  },
  ar: {
    q: 'هل يمكنكم مساعدتي في إيجاد عقار غير معروض هنا؟',
    a: 'نعم. تصلنا عقارات جديدة كل أسبوع، ولا تُنشر جميعها على الموقع فوراً. أخبرنا بميزانيتك والمنطقة والمساحة المفضلة، وسنرسل لك الخيارات المناسبة.',
  },
  fr: {
    q: 'Pouvez-vous m’aider à trouver un bien qui n’est pas en ligne ?',
    a: 'Oui. De nouveaux biens arrivent chaque semaine et tous ne sont pas publiés immédiatement. Indiquez-nous votre budget, le quartier et la surface souhaités, et nous vous enverrons des options adaptées.',
  },
}

export function categoryFaq(category: Category, ps: Property[], lang: Locale): FaqItem[] {
  const lower = categoryTitle(category, lang, true)
  const items: FaqItem[] = []
  const price = priceText(ps, lang)
  if (price) {
    items.push({
      q: { en: `What are the prices of ${lower}?`, ar: `ما هي أسعار ${lower}؟`, fr: `Quels sont les prix des ${lower} ?` }[lang],
      a: [price, perSqmText(ps, lang)].filter(Boolean).join(' '),
    })
  }
  const sizes = sizeText(ps, lang)
  if (sizes) items.push({ q: { en: 'What sizes are available?', ar: 'ما هي المساحات المتوفرة؟', fr: 'Quelles surfaces sont disponibles ?' }[lang], a: sizes })
  const where = locationsText(ps, lang)
  if (where) items.push({ q: { en: 'Where are these properties located?', ar: 'أين تقع هذه العقارات؟', fr: 'Où se trouvent ces biens ?' }[lang], a: where })
  items.push(contactAnswer[lang], unlistedAnswer[lang])
  return items
}

export function areaFaq(at: string, ps: Property[], lang: Locale): FaqItem[] {
  const items: FaqItem[] = []
  const sqm = perSqm(ps)
  if (sqm) {
    items.push({
      q: { en: `What is the price per m² ${at}?`, ar: `كم سعر المتر المربع ${at}؟`, fr: `Quel est le prix au m² ${at} ?` }[lang],
      a: {
        en: `Based on the ${sqm.n} properties for sale currently listed with Rukun ${at}, the median asking price is about ${usd(sqm.value)} per m². Prices vary a lot with the building's age, floor, view and parking.`,
        ar: `استناداً إلى ${sqm.n} عقارات معروضة للبيع حالياً لدى ركن ${at}، يبلغ السعر الوسطي المطلوب نحو ${usd(sqm.value)} للمتر المربع. وتختلف الأسعار كثيراً بحسب عمر المبنى والطابق والإطلالة والموقف.`,
        fr: `D’après les ${sqm.n} biens à vendre actuellement proposés par Rukun ${at}, le prix médian demandé est d’environ ${usd(sqm.value)} le m². Les prix varient beaucoup selon l’âge de l’immeuble, l’étage, la vue et le parking.`,
      }[lang],
    })
  }
  // Homes only, so offices and warehouses do not skew the rent range
  const rentals = ps.filter((p) => p.transaction_type === 'rent' && isHome(p))
  const rent = priceText(rentals, lang)
  if (rent) {
    items.push({
      q: { en: `How much is rent for a home ${at}?`, ar: `كم يبلغ إيجار المنازل ${at}؟`, fr: `Combien coûte la location d’un logement ${at} ?` }[lang],
      a: rent,
    })
  }
  if (ps.length) {
    const byType = new Map<string, number>()
    for (const p of ps) byType.set(propertyKind(p), (byType.get(propertyKind(p)) ?? 0) + 1)
    const list = [...byType.entries()].map(([k, n]) => `${typeLabel(k, lang)} (${n})`).join(lang === 'ar' ? '، ' : ', ')
    items.push({
      q: { en: `What types of property are available ${at}?`, ar: `ما أنواع العقارات المتوفرة ${at}؟`, fr: `Quels types de biens sont disponibles ${at} ?` }[lang],
      a: { en: `We currently have: ${list}.`, ar: `لدينا حالياً: ${list}.`, fr: `Nous proposons actuellement : ${list}.` }[lang],
    })
  }
  items.push(contactAnswer[lang], unlistedAnswer[lang])
  return items
}
