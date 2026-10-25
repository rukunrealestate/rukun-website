import type { Locale } from '@/lib/i18n'
import { formatPrice, type Property } from '@/lib/properties'
import { perSqm, usd, type FaqItem } from '@/lib/faq'

// Pages for owners who want to sell or rent out ("/list-your-property/achrafieh").
// Keys match lib/areaGuides.ts. Keep to well-established facts; numbers come from live listings.
// Commission is never published: it is discussed with each owner personally.

// Blog guides written for owners, shown on the owner pages
export const OWNER_GUIDES = ['selling-property-in-lebanon', 'renting-out-your-property-in-lebanon']

export const ownerAreaText: Record<string, Record<Locale, string>> = {
  beirut: {
    en: 'Apartments and offices in Beirut stay in steady demand from families, professionals and Lebanese living abroad who want a base in the capital. Buyers here compare carefully between neighbourhoods, so a property that is well presented and realistically priced stands out quickly.',
    ar: 'يبقى الطلب على الشقق والمكاتب في بيروت ثابتاً من العائلات والمهنيين واللبنانيين المقيمين في الخارج الذين يريدون مكاناً في العاصمة. يقارن المشترون هنا بدقة بين الأحياء، لذلك يبرز العقار المعروض جيداً وبسعر واقعي بسرعة.',
    fr: 'Les appartements et bureaux à Beyrouth restent très demandés par les familles, les actifs et les Libanais de l’étranger qui veulent un pied-à-terre dans la capitale. Les acheteurs comparent attentivement les quartiers : un bien bien présenté et au juste prix se démarque vite.',
  },
  achrafieh: {
    en: 'Achrafieh is one of the most searched-for districts in Beirut. Its schools, universities, hospitals and nightlife bring a constant flow of families, students and young professionals looking to buy or rent, and its offices and shops attract businesses that want to be close to Downtown.',
    ar: 'الأشرفية من أكثر أحياء بيروت طلباً. مدارسها وجامعاتها ومستشفياتها وحياتها الليلية تجذب باستمرار عائلات وطلاباً وشباباً يبحثون عن الشراء أو الإيجار، فيما تستقطب مكاتبها ومحلاتها الشركات الراغبة في البقاء قرب وسط المدينة.',
    fr: 'Achrafieh est l’un des quartiers les plus recherchés de Beyrouth. Ses écoles, universités, hôpitaux et sa vie nocturne attirent en continu familles, étudiants et jeunes actifs qui veulent acheter ou louer, et ses bureaux et commerces séduisent les entreprises qui veulent rester proches du centre-ville.',
  },
  metn: {
    en: 'Metn attracts families who want more space, greenery and views than the city offers, while staying a short drive from Beirut. Coastal towns suit buyers and tenants who commute daily, and mountain towns such as Beit Mery, Broummana and Baabdat are popular for larger homes and summer living.',
    ar: 'يجذب المتن العائلات التي تبحث عن مساحة وخضرة وإطلالات أكثر مما تقدمه المدينة، مع البقاء على مسافة قصيرة من بيروت. تناسب البلدات الساحلية من يتنقل يومياً إلى العاصمة، فيما تُطلب البلدات الجبلية مثل بيت مري وبرمانا وبعبدات للمنازل الأكبر وللاصطياف.',
    fr: 'Le Metn attire les familles qui veulent plus d’espace, de verdure et de vue qu’en ville, à courte distance de Beyrouth. Les villes côtières conviennent à ceux qui font le trajet chaque jour, et les villages de montagne comme Beit Mery, Broummana ou Baabdat sont prisés pour les grands logements et l’été.',
  },
  aley: {
    en: 'Aley and its mountain towns, such as Bhamdoun and Sawfar, are a long-standing choice for summer homes and for families who want more space for their budget. Buyers here often come from Beirut and from the Lebanese diaspora, and many decide after seeing the view and the surroundings in person.',
    ar: 'عاليه وبلداتها الجبلية مثل بحمدون وصوفر خيار تقليدي لبيوت الاصطياف وللعائلات التي تبحث عن مساحة أكبر ضمن ميزانيتها. يأتي المشترون غالباً من بيروت ومن اللبنانيين المغتربين، ويحسم كثيرون قرارهم بعد رؤية الإطلالة والمحيط بأنفسهم.',
    fr: 'Aley et ses villages de montagne, comme Bhamdoun et Sawfar, sont un choix de longue date pour les résidences d’été et pour les familles qui veulent plus d’espace pour leur budget. Les acheteurs viennent souvent de Beyrouth et de la diaspora libanaise, et beaucoup se décident après avoir vu la vue et l’environnement sur place.',
  },
  jbeil: {
    en: 'Jbeil (Byblos) combines a calmer pace of life with tourism, a university campus and a strong local economy. Homes near the coast and old town appeal to families and to Lebanese abroad, while small offices and shops are sought after by local businesses.',
    ar: 'تجمع جبيل بين إيقاع حياة أهدأ والسياحة وحرم جامعي واقتصاد محلي نشط. تجذب المنازل القريبة من الساحل والمدينة القديمة العائلات واللبنانيين في الخارج، فيما تطلب المؤسسات المحلية المكاتب والمحلات الصغيرة.',
    fr: 'Byblos allie un rythme de vie plus calme au tourisme, à un campus universitaire et à une économie locale dynamique. Les logements proches de la côte et de la vieille ville plaisent aux familles et aux Libanais de l’étranger, tandis que les petits bureaux et commerces sont recherchés par les entreprises locales.',
  },
  keserwan: {
    en: 'Keserwan, from Jounieh and Kaslik on the coast up to Faraya and Faqra, draws buyers and tenants who want sea or mountain views and an active lifestyle within reach of Beirut. Apartments with a view, chalets and homes near the bay are consistently in demand.',
    ar: 'يجذب كسروان، من جونيه والكسليك على الساحل حتى فاريا وفقرا، المشترين والمستأجرين الباحثين عن إطلالات على البحر أو الجبل ونمط حياة نشط قرب بيروت. ويبقى الطلب ثابتاً على الشقق ذات الإطلالة والشاليهات والمنازل القريبة من الخليج.',
    fr: 'Le Kesrouan, de Jounieh et Kaslik sur la côte jusqu’à Faraya et Faqra, attire acheteurs et locataires en quête de vue sur la mer ou la montagne et d’un mode de vie actif près de Beyrouth. Les appartements avec vue, les chalets et les logements proches de la baie sont toujours demandés.',
  },
}

const general: Record<Locale, FaqItem[]> = {
  en: [
    {
      q: 'How do I sell or rent out my property with Rukun?',
      a: 'Send us your property through the form on this page, or call or WhatsApp +961 3 709 240. We call you within one working day, visit the property, agree the asking price and terms with you, then photograph it and publish it in English, Arabic and French. We screen every enquiry, accompany viewings and negotiate on your behalf until the sale or lease is signed.',
    },
    {
      q: 'How much commission does Rukun charge?',
      a: 'Our commission is discussed with each owner personally and agreed in writing before we start, so the terms are clear from day one.',
    },
    {
      q: 'What documents do I need to sell my property in Lebanon?',
      a: 'The title deed, a recent land registry statement (ifadeh aqariyyeh) showing the owners and any mortgages or notes, and the IDs of all the owners. If an owner cannot attend, they can be represented by a power of attorney. If the property was inherited, the inheritance must be registered first. A lawyer prepares and checks the contracts.',
    },
    {
      q: 'How do you decide the right asking price?',
      a: 'We compare your property with similar ones currently on the market in the same area, and adjust for size, floor, view, parking, the building’s age and condition, and electricity and water arrangements. A realistic price from the start attracts serious buyers and avoids a listing that goes stale.',
    },
    {
      q: 'Can I sell or rent out my property while I live abroad?',
      a: 'Yes. We handle the viewings and keep you updated on WhatsApp, and the signing can be done through a power of attorney so you do not need to travel.',
    },
    {
      q: 'Which areas does Rukun cover?',
      a: 'We work mostly in Beirut, Achrafieh, Metn, Aley, Keserwan and Jbeil (Byblos), and with owners elsewhere in Lebanon on request. We handle apartments, villas, offices, shops and land, for sale and for rent.',
    },
  ],
  ar: [
    {
      q: 'كيف أبيع أو أؤجر عقاري مع ركن؟',
      a: 'أرسل لنا تفاصيل عقارك عبر النموذج في هذه الصفحة، أو اتصل أو راسلنا على واتساب على 240 709 3 961+. نتصل بك خلال يوم عمل واحد، ونعاين العقار، ونتفق معك على السعر والشروط، ثم نصوّره وننشره بالعربية والإنجليزية والفرنسية. نتحقق من كل استفسار، ونرافق المعاينات، ونفاوض نيابة عنك حتى توقيع البيع أو عقد الإيجار.',
    },
    {
      q: 'كم تبلغ عمولة ركن؟',
      a: 'نناقش العمولة مع كل مالك شخصياً ونتفق عليها خطياً قبل البدء، لتكون الشروط واضحة من اليوم الأول.',
    },
    {
      q: 'ما المستندات المطلوبة لبيع عقار في لبنان؟',
      a: 'سند الملكية، وإفادة عقارية حديثة تُظهر المالكين وأي رهون أو إشارات، وبطاقات هوية جميع المالكين. ويمكن لمن لا يستطيع الحضور أن يوكّل غيره بموجب وكالة. وإذا كان العقار موروثاً، يجب تسجيل الإرث أولاً. ويتولى محامٍ إعداد العقود والتحقق منها.',
    },
    {
      q: 'كيف تحددون السعر المناسب؟',
      a: 'نقارن عقارك بعقارات مشابهة معروضة حالياً في المنطقة نفسها، ونأخذ في الاعتبار المساحة والطابق والإطلالة والموقف وعمر المبنى وحالته وترتيبات الكهرباء والمياه. السعر الواقعي من البداية يجذب المشترين الجادّين ويمنع بقاء العقار معروضاً لفترة طويلة.',
    },
    {
      q: 'هل يمكنني بيع عقاري أو تأجيره وأنا مقيم في الخارج؟',
      a: 'نعم. نتولى المعاينات ونطلعك على كل جديد عبر واتساب، ويمكن التوقيع بموجب وكالة فلا تحتاج إلى السفر.',
    },
    {
      q: 'ما المناطق التي يغطيها ركن؟',
      a: 'نعمل بشكل أساسي في بيروت والأشرفية والمتن وعاليه وكسروان وجبيل، ومع مالكين في مناطق لبنانية أخرى عند الطلب. نتعامل مع الشقق والفلل والمكاتب والمحلات والأراضي، للبيع وللإيجار.',
    },
  ],
  fr: [
    {
      q: 'Comment vendre ou louer mon bien avec Rukun ?',
      a: 'Envoyez-nous votre bien via le formulaire de cette page, ou appelez-nous ou écrivez-nous sur WhatsApp au +961 3 709 240. Nous vous rappelons sous un jour ouvré, visitons le bien, convenons avec vous du prix et des conditions, puis le photographions et le publions en français, anglais et arabe. Nous filtrons chaque demande, accompagnons les visites et négocions pour vous jusqu’à la signature de la vente ou du bail.',
    },
    {
      q: 'Quelle est la commission de Rukun ?',
      a: 'Notre commission est discutée personnellement avec chaque propriétaire et convenue par écrit avant de commencer, pour des conditions claires dès le premier jour.',
    },
    {
      q: 'Quels documents faut-il pour vendre un bien au Liban ?',
      a: 'Le titre de propriété, un relevé foncier récent (ifadé ʿaqariyyé) indiquant les propriétaires et les éventuelles hypothèques ou mentions, et les pièces d’identité de tous les propriétaires. Un propriétaire absent peut se faire représenter par procuration. Si le bien a été hérité, la succession doit d’abord être enregistrée. Un avocat prépare et vérifie les contrats.',
    },
    {
      q: 'Comment fixez-vous le bon prix ?',
      a: 'Nous comparons votre bien aux biens similaires actuellement sur le marché dans le même quartier, en tenant compte de la surface, de l’étage, de la vue, du parking, de l’âge et de l’état de l’immeuble, et de l’électricité et de l’eau. Un prix réaliste dès le départ attire des acheteurs sérieux et évite une annonce qui s’essouffle.',
    },
    {
      q: 'Puis-je vendre ou louer mon bien en vivant à l’étranger ?',
      a: 'Oui. Nous gérons les visites et vous tenons informé sur WhatsApp, et la signature peut se faire par procuration, sans que vous ayez à vous déplacer.',
    },
    {
      q: 'Quelles régions Rukun couvre-t-il ?',
      a: 'Nous travaillons surtout à Beyrouth, Achrafieh, au Metn, à Aley, au Kesrouan et à Byblos, et avec des propriétaires ailleurs au Liban sur demande. Appartements, villas, bureaux, commerces et terrains, à vendre comme à louer.',
    },
  ],
}

// Area pages open with what the local market looks like right now, computed from our listings
function areaMarketItem(at: string, ps: Property[], lang: Locale): FaqItem | null {
  const sqm = perSqm(ps)
  const rents = ps.filter((p) => p.transaction_type === 'rent' && p.price > 0 && (p.type === 'apartment' || p.type === 'villa')).map((p) => p.price)
  if (!sqm && !rents.length) return null
  const rent = rents.length
    ? (Math.min(...rents) === Math.max(...rents)
        ? formatPrice(rents[0], 'USD', 'rent', lang)
        : `${formatPrice(Math.min(...rents), 'USD', 'rent', lang)}–${formatPrice(Math.max(...rents), 'USD', 'rent', lang)}`)
    : null
  const parts = {
    en: [sqm && `Homes for sale listed with Rukun ${at} have a median asking price of about ${usd(sqm.value)} per m².`, rent && `Homes for rent are listed at ${rent}.`],
    ar: [sqm && `يبلغ السعر الوسطي المطلوب للعقارات المعروضة للبيع لدى ركن ${at} نحو ${usd(sqm.value)} للمتر المربع.`, rent && `وتُعرض المنازل للإيجار بأسعار ${rent}.`],
    fr: [sqm && `Les biens à vendre proposés par Rukun ${at} affichent un prix médian d’environ ${usd(sqm.value)} le m².`, rent && `Les logements à louer sont proposés à ${rent}.`],
  }[lang].filter(Boolean)
  const close = {
    en: 'Every property is different, so we give you a price recommendation after seeing yours.',
    ar: 'لكل عقار خصوصيته، لذلك نقدّم لك توصية بالسعر بعد معاينة عقارك.',
    fr: 'Chaque bien est différent : nous vous recommandons un prix après avoir vu le vôtre.',
  }[lang]
  return {
    q: { en: `How much is my property worth ${at}?`, ar: `كم يساوي عقاري ${at}؟`, fr: `Combien vaut mon bien ${at} ?` }[lang],
    a: [...parts, close].join(' '),
  }
}

export function ownerFaq(lang: Locale, area?: { at: string; properties: Property[] }): FaqItem[] {
  const market = area ? areaMarketItem(area.at, area.properties, lang) : null
  return market ? [market, ...general[lang]] : general[lang]
}
