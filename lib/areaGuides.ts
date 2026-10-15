import type { Locale } from '@/lib/i18n'

// Neighbourhood guides. Keys match the area keys in lib/categories.ts.
// Keep these to well-established facts; prices on the page come from live listings.

export interface AreaGuide {
  name: Record<Locale, string>
  intro: Record<Locale, string[]>
}

export const areaGuides: Record<string, AreaGuide> = {
  beirut: {
    name: { en: 'Beirut', ar: 'بيروت', fr: 'Beyrouth' },
    intro: {
      en: [
        "Beirut is Lebanon's capital and its business, cultural and nightlife centre. Each neighbourhood has its own character — from the universities and cafés of Hamra and Ras Beirut, to the seafront Corniche, Downtown, and the historic streets of Achrafieh, Gemmayze and Mar Mikhael.",
        'Living in Beirut puts you close to the main hospitals, universities, offices and restaurants, which is why apartments and offices here stay in steady demand. Space comes at a premium, so many buyers compare city apartments with larger homes just outside in Metn or Keserwan.',
      ],
      ar: [
        'بيروت هي عاصمة لبنان ومركزه التجاري والثقافي والترفيهي. لكل حيّ فيها طابعه الخاص — من جامعات ومقاهي الحمرا ورأس بيروت، إلى الكورنيش البحري ووسط المدينة، وصولاً إلى شوارع الأشرفية والجميزة ومار مخايل التاريخية.',
        'السكن في بيروت يضعك قرب المستشفيات والجامعات والمكاتب والمطاعم الرئيسية، ولهذا يبقى الطلب على الشقق والمكاتب فيها ثابتاً. المساحة فيها أغلى، لذلك يقارن كثير من المشترين بين شقق المدينة ومنازل أوسع في المتن أو كسروان القريبتين.',
      ],
      fr: [
        'Beyrouth est la capitale du Liban et son centre d’affaires, de culture et de vie nocturne. Chaque quartier a son caractère — des universités et cafés de Hamra et Ras Beyrouth à la Corniche en bord de mer, au centre-ville et aux rues historiques d’Achrafieh, Gemmayzé et Mar Mikhaël.',
        'Vivre à Beyrouth, c’est être proche des principaux hôpitaux, universités, bureaux et restaurants, ce qui maintient une demande soutenue pour les appartements et les bureaux. L’espace y est plus cher : beaucoup d’acheteurs comparent les appartements en ville avec des logements plus grands au Metn ou au Kesrouan.',
      ],
    },
  },
  achrafieh: {
    name: { en: 'Achrafieh', ar: 'الأشرفية', fr: 'Achrafieh' },
    intro: {
      en: [
        "Achrafieh is one of Beirut's oldest and most sought-after residential districts, set on a hill in the east of the city. It is known for its traditional Lebanese houses and stairways, Sassine Square, the Sursock Museum, and the lively bars and restaurants of nearby Gemmayze and Mar Mikhael.",
        'Families value Achrafieh for its schools, Saint Joseph University and Hôtel-Dieu hospital, while professionals like being minutes from Downtown. Sub-areas such as Sodeco, Adlieh, Mar Mitr and Sassine each offer a different mix of quiet residential streets and commercial space.',
      ],
      ar: [
        'الأشرفية من أقدم أحياء بيروت السكنية وأكثرها طلباً، وتقع على تلة في شرق المدينة. تشتهر ببيوتها اللبنانية التقليدية وأدراجها، وساحة ساسين، ومتحف سرسق، والمطاعم والمقاهي النابضة بالحياة في الجميزة ومار مخايل القريبتين.',
        'تفضّل العائلات الأشرفية لمدارسها وجامعة القديس يوسف ومستشفى أوتيل ديو، بينما يقدّر المهنيون قربها من وسط المدينة. وتقدّم مناطقها مثل السوديكو والعدلية ومار متر وساسين مزيجاً مختلفاً من الشوارع السكنية الهادئة والمساحات التجارية.',
      ],
      fr: [
        'Achrafieh est l’un des quartiers résidentiels les plus anciens et les plus prisés de Beyrouth, sur une colline à l’est de la ville. Il est connu pour ses maisons libanaises traditionnelles et ses escaliers, la place Sassine, le musée Sursock et les bars et restaurants animés de Gemmayzé et Mar Mikhaël tout proches.',
        'Les familles apprécient Achrafieh pour ses écoles, l’Université Saint-Joseph et l’Hôtel-Dieu, et les actifs pour sa proximité avec le centre-ville. Les sous-quartiers comme Sodeco, Adlieh, Mar Mitr et Sassine offrent chacun un équilibre différent entre rues résidentielles calmes et locaux commerciaux.',
      ],
    },
  },
  metn: {
    name: { en: 'Metn', ar: 'المتن', fr: 'Metn' },
    intro: {
      en: [
        "Metn is the Mount Lebanon district just north-east of Beirut, stretching from busy coastal towns such as Dekwaneh, Sin el Fil, Jdeideh and Antelias up to mountain towns like Beit Mery, Broummana, Baabdat and Bikfaya.",
        'Buyers choose Metn for more space and greenery than in the city, cooler summers in the mountain villages, and an easy drive to Beirut. It is especially popular with families looking for larger apartments with views.',
      ],
      ar: [
        'المتن هو قضاء في جبل لبنان يقع شمال شرق بيروت مباشرة، ويمتد من البلدات الساحلية المزدحمة مثل الدكوانة وسن الفيل والجديدة وأنطلياس، صعوداً إلى البلدات الجبلية مثل بيت مري وبرمانا وبعبدات وبكفيا.',
        'يختار المشترون المتن لمساحاته الأوسع وطبيعته الأكثر خضرة مقارنة بالمدينة، ولصيفه الأبرد في القرى الجبلية، ولسهولة الوصول إلى بيروت. وهو مطلوب بشكل خاص من العائلات التي تبحث عن شقق أكبر مع إطلالات.',
      ],
      fr: [
        'Le Metn est le caza du Mont-Liban situé juste au nord-est de Beyrouth. Il s’étend des villes côtières animées comme Dekwaneh, Sin el Fil, Jdeideh et Antélias jusqu’aux villages de montagne comme Beit Mery, Broummana, Baabdat et Bikfaya.',
        'Les acheteurs choisissent le Metn pour plus d’espace et de verdure qu’en ville, des étés plus frais en montagne et un accès facile à Beyrouth. Il est particulièrement recherché par les familles en quête de grands appartements avec vue.',
      ],
    },
  },
  aley: {
    name: { en: 'Aley', ar: 'عاليه', fr: 'Aley' },
    intro: {
      en: [
        'Aley is a Mount Lebanon district south-east of Beirut, along the Beirut–Damascus road. Towns such as Aley, Bhamdoun and Sawfar have long been summer resorts, known for pine forests, mountain views and cooler air.',
        'Property in Aley usually offers more space for the price than in Beirut, which makes it attractive for summer homes, families and buyers looking for a quieter mountain setting within reach of the capital.',
      ],
      ar: [
        'عاليه قضاء في جبل لبنان يقع جنوب شرق بيروت على طريق بيروت–دمشق. لطالما كانت بلدات مثل عاليه وبحمدون وصوفر مصايف معروفة بغابات الصنوبر والإطلالات الجبلية والهواء المنعش.',
        'عادةً ما تقدّم العقارات في عاليه مساحة أكبر مقابل السعر مقارنة ببيروت، مما يجعلها جذابة لبيوت الصيف وللعائلات وللباحثين عن أجواء جبلية هادئة قريبة من العاصمة.',
      ],
      fr: [
        'Aley est un caza du Mont-Liban au sud-est de Beyrouth, le long de la route Beyrouth–Damas. Des villes comme Aley, Bhamdoun et Sawfar sont depuis longtemps des lieux de villégiature, réputés pour leurs pinèdes, leurs vues sur la montagne et leur air frais.',
        'L’immobilier à Aley offre généralement plus d’espace pour le prix qu’à Beyrouth, ce qui en fait un bon choix pour une résidence d’été, une famille ou un cadre de montagne plus calme à proximité de la capitale.',
      ],
    },
  },
  jbeil: {
    name: { en: 'Jbeil (Byblos)', ar: 'جبيل', fr: 'Byblos' },
    intro: {
      en: [
        'Jbeil, known internationally as Byblos, is one of the oldest continuously inhabited cities in the world and a UNESCO World Heritage Site, about 40 km north of Beirut. Its old souk, ancient harbour and seaside restaurants make it one of Lebanon’s best-loved towns.',
        'Jbeil combines a calmer pace of life with a strong local economy, a university campus and tourism, so both homes and small offices and shops are in demand.',
      ],
      ar: [
        'جبيل، المعروفة عالمياً باسم بيبلوس، من أقدم المدن المأهولة باستمرار في العالم وهي مدرجة على لائحة التراث العالمي لليونسكو، وتبعد نحو 40 كلم شمال بيروت. سوقها القديم ومرفأها التاريخي ومطاعمها البحرية تجعلها من أحب المدن اللبنانية.',
        'تجمع جبيل بين إيقاع حياة أهدأ واقتصاد محلي نشط وحرم جامعي وسياحة، لذلك يكثر الطلب فيها على المنازل وعلى المكاتب والمحلات الصغيرة.',
      ],
      fr: [
        'Jbeil, connue dans le monde entier sous le nom de Byblos, est l’une des plus anciennes villes habitées sans interruption au monde et un site classé au patrimoine mondial de l’UNESCO, à environ 40 km au nord de Beyrouth. Son vieux souk, son port antique et ses restaurants en bord de mer en font l’une des villes les plus appréciées du Liban.',
        'Jbeil allie un rythme de vie plus calme à une économie locale dynamique, un campus universitaire et le tourisme : logements, petits bureaux et commerces y sont recherchés.',
      ],
    },
  },
  keserwan: {
    name: { en: 'Keserwan', ar: 'كسروان', fr: 'Kesrouan' },
    intro: {
      en: [
        'Keserwan lies north of Beirut, from the coastal city of Jounieh and its bay up to the mountain ski resorts of Faraya and Faqra. Kaslik, Zouk and Adma along the coast offer shopping, marinas and nightlife, while Harissa overlooks the whole bay.',
        'Buyers choose Keserwan for sea and mountain views, a lively coastal lifestyle and year-round access to both the beach and the slopes, while staying a short drive from Beirut.',
      ],
      ar: [
        'يقع كسروان شمال بيروت، ويمتد من مدينة جونيه وخليجها الساحلي حتى منتجعات التزلج الجبلية في فاريا وفقرا. وتوفر الكسليك والزوق وأدما على الساحل الأسواق والمرافئ والسهر، فيما تطل حريصا على الخليج بأكمله.',
        'يختار المشترون كسروان لإطلالاته على البحر والجبل، ولنمط الحياة الساحلي النابض، وللوصول إلى الشاطئ والتزلج على مدار السنة، مع البقاء على مسافة قصيرة من بيروت.',
      ],
      fr: [
        'Le Kesrouan s’étend au nord de Beyrouth, de la ville côtière de Jounieh et sa baie jusqu’aux stations de ski de Faraya et Faqra. Sur la côte, Kaslik, Zouk et Adma offrent commerces, marinas et vie nocturne, tandis que Harissa domine toute la baie.',
        'Les acheteurs choisissent le Kesrouan pour ses vues sur la mer et la montagne, son art de vivre côtier et l’accès toute l’année à la plage comme aux pistes, à courte distance de Beyrouth.',
      ],
    },
  },
}

export const areaGuideKeys = Object.keys(areaGuides)
