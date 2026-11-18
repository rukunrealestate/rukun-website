import type { Locale } from '@/lib/i18n'
import type { FaqItem } from '@/lib/faq'

// Longer area-guide content: sections (towns, getting around, who it suits) and fixed FAQs.
// Keep to well-established geography and character; prices always come from live listings.

export interface GuideSection { h: string; p: string }
export interface GuideDetails { sections: Record<Locale, GuideSection[]>; faq: Record<Locale, FaqItem[]> }

export const areaGuideDetails: Record<string, GuideDetails> = {
  metn: {
    sections: {
      en: [
        { h: 'Where is Metn?', p: 'Metn (also written Matn or El Metn) is a district of Mount Lebanon that begins at the north-eastern edge of Beirut and climbs east into the mountains. Its administrative centre is Jdeideh. The district borders Beirut and Baabda to the south-west, Keserwan to the north, and the Bekaa side of Mount Lebanon to the east.' },
        { h: 'Towns in Metn', p: 'Coastal and city-edge Metn: Sin el Fil, Dekwaneh, Jdeideh, Bauchrieh, Zalka, Jal el Dib, Antelias and Dbayeh — busy, well-served towns with shops, schools and quick access to Beirut. Middle Metn: Mansourieh, Fanar, Mkalles, Rabieh, Naccache and Roumieh — residential hills with more space and views. Upper Metn: Beit Mery, Broummana, Baabdat, Bikfaya and Dhour Choueir — mountain towns with pine forests, cooler summers and village life.' },
        { h: 'Getting around', p: 'The coastal highway links Antelias, Jal el Dib and Dbayeh to Beirut, and the Mkalles and Sin el Fil roads lead into the east of the city. From the mountain towns, Beirut is usually a 25–45 minute drive depending on the town and traffic.' },
        { h: 'Who Metn suits', p: 'Families who want a larger apartment or a house with a garden, people working in Beirut who prefer a calmer home base, and buyers looking for mountain views or a summer home within reach of the city. Coastal Metn also has strong demand for offices, shops and warehouses.' },
      ],
      ar: [
        { h: 'أين يقع المتن؟', p: 'المتن قضاء في جبل لبنان يبدأ عند الطرف الشمالي الشرقي لبيروت ويرتفع شرقاً نحو الجبال، ومركزه الجديدة. يحدّه بيروت وبعبدا من الجنوب الغربي، وكسروان من الشمال، والسفح الشرقي لجبل لبنان المطلّ على البقاع من الشرق.' },
        { h: 'بلدات المتن', p: 'المتن الساحلي وأطراف المدينة: سن الفيل، الدكوانة، الجديدة، البوشرية، الزلقا، جل الديب، أنطلياس والضبية — بلدات حيوية فيها أسواق ومدارس ووصول سريع إلى بيروت. المتن الأوسط: المنصورية، الفنار، المكلس، الربوة، النقاش ورومية — تلال سكنية بمساحات أوسع وإطلالات. المتن الأعلى: بيت مري، برمانا، بعبدات، بكفيا وضهور الشوير — بلدات جبلية بغابات صنوبر وصيف معتدل وحياة قروية.' },
        { h: 'التنقل', p: 'يربط الأوتوستراد الساحلي أنطلياس وجل الديب والضبية ببيروت، فيما تؤدي طرق المكلس وسن الفيل إلى شرق العاصمة. ومن البلدات الجبلية تستغرق الرحلة إلى بيروت عادةً بين 25 و45 دقيقة بحسب البلدة وزحمة السير.' },
        { h: 'لمن يناسب المتن؟', p: 'للعائلات التي تبحث عن شقة أكبر أو منزل مع حديقة، ولمن يعمل في بيروت ويفضّل سكناً أهدأ، وللمشترين الباحثين عن إطلالة جبلية أو بيت صيفي قريب من المدينة. كما يكثر الطلب في المتن الساحلي على المكاتب والمحلات والمستودعات.' },
      ],
      fr: [
        { h: 'Où se trouve le Metn ?', p: 'Le Metn (aussi écrit Matn) est un caza du Mont-Liban qui commence à la limite nord-est de Beyrouth et monte vers l’est dans la montagne. Son chef-lieu est Jdeideh. Il est bordé par Beyrouth et Baabda au sud-ouest, le Kesrouan au nord et le versant de la Békaa à l’est.' },
        { h: 'Les villes du Metn', p: 'Metn côtier et proche de la ville : Sin el Fil, Dekwaneh, Jdeideh, Bauchrieh, Zalka, Jal el Dib, Antélias et Dbayeh — des villes animées, bien équipées, à quelques minutes de Beyrouth. Moyen Metn : Mansourieh, Fanar, Mkalles, Rabieh, Naccache et Roumieh — des collines résidentielles avec plus d’espace et de vue. Haut Metn : Beit Mery, Broummana, Baabdat, Bikfaya et Dhour Choueir — des villages de montagne entre pinèdes, étés frais et vie de village.' },
        { h: 'Se déplacer', p: 'L’autoroute côtière relie Antélias, Jal el Dib et Dbayeh à Beyrouth, et les routes de Mkalles et Sin el Fil mènent à l’est de la ville. Depuis les villages de montagne, Beyrouth est en général à 25–45 minutes de route selon le village et la circulation.' },
        { h: 'Pour qui ?', p: 'Les familles qui veulent un grand appartement ou une maison avec jardin, les actifs travaillant à Beyrouth qui préfèrent un cadre plus calme, et les acheteurs à la recherche d’une vue sur la montagne ou d’une résidence d’été proche de la ville. Le Metn côtier est aussi très demandé pour les bureaux, commerces et dépôts.' },
      ],
    },
    faq: {
      en: [
        { q: 'Which towns are in Metn, Lebanon?', a: 'Main towns include Sin el Fil, Dekwaneh, Jdeideh, Zalka, Jal el Dib, Antelias and Dbayeh near the coast; Mansourieh, Fanar, Rabieh, Naccache and Roumieh in the middle hills; and Beit Mery, Broummana, Baabdat and Bikfaya in the mountains.' },
        { q: 'Is Metn a good place to live?', a: 'For many families, yes: it offers more space and greenery than Beirut, good schools, cooler summers in the upper towns, and a commute to the city that is manageable from most of the district.' },
        { q: 'What is the difference between Metn and Beirut?', a: 'Beirut is the dense capital city; Metn is the Mount Lebanon district right next to it. Metn generally offers larger homes and more greenery for the price, while Beirut puts you closer to offices, universities, hospitals and nightlife.' },
      ],
      ar: [
        { q: 'ما هي بلدات المتن في لبنان؟', a: 'من أبرزها سن الفيل والدكوانة والجديدة والزلقا وجل الديب وأنطلياس والضبية قرب الساحل؛ والمنصورية والفنار والربوة والنقاش ورومية في التلال الوسطى؛ وبيت مري وبرمانا وبعبدات وبكفيا في الجبل.' },
        { q: 'هل المتن منطقة جيدة للسكن؟', a: 'بالنسبة لكثير من العائلات، نعم: مساحات وطبيعة خضراء أكثر من بيروت، ومدارس جيدة، وصيف أبرد في البلدات العليا، وتنقّل معقول إلى العاصمة من معظم أنحاء القضاء.' },
        { q: 'ما الفرق بين المتن وبيروت؟', a: 'بيروت هي العاصمة المكتظة، والمتن قضاء في جبل لبنان ملاصق لها. يقدّم المتن عادةً منازل أوسع وطبيعة أكثر مقابل السعر، بينما تقرّبك بيروت من المكاتب والجامعات والمستشفيات والسهر.' },
      ],
      fr: [
        { q: 'Quelles sont les villes du Metn, au Liban ?', a: 'Parmi les principales : Sin el Fil, Dekwaneh, Jdeideh, Zalka, Jal el Dib, Antélias et Dbayeh près de la côte ; Mansourieh, Fanar, Rabieh, Naccache et Roumieh sur les collines ; Beit Mery, Broummana, Baabdat et Bikfaya en montagne.' },
        { q: 'Fait-il bon vivre au Metn ?', a: 'Pour beaucoup de familles, oui : plus d’espace et de verdure qu’à Beyrouth, de bonnes écoles, des étés plus frais en altitude et des trajets vers la ville raisonnables depuis la plupart du caza.' },
        { q: 'Quelle différence entre le Metn et Beyrouth ?', a: 'Beyrouth est la capitale, très dense ; le Metn est le caza du Mont-Liban juste à côté. Le Metn offre en général des logements plus grands et plus de verdure pour le prix, Beyrouth la proximité des bureaux, universités, hôpitaux et sorties.' },
      ],
    },
  },

  beirut: {
    sections: {
      en: [
        { h: 'Neighbourhoods of Beirut', p: 'Ras Beirut and Hamra: universities (AUB, LAU), cafés and a lively street life. Verdun and Raouche: residential towers, shopping and sea views. Downtown and Saifi: the rebuilt city centre. Achrafieh, Gemmayze and Mar Mikhael: historic streets, restaurants and established family neighbourhoods. Badaro, Mazraa and Corniche el Mazraa: central, mixed residential and commercial areas.' },
        { h: 'Getting around', p: 'Most daily needs are within a short drive or walk in Beirut. Rafic Hariri International Airport is in the south of the city, and the coastal highway connects Beirut north to Metn and Keserwan.' },
        { h: 'Who Beirut suits', p: 'Professionals and students who want to be close to work and university, families who value top hospitals and schools nearby, businesses looking for offices and shops, and investors seeking homes that rent easily.' },
      ],
      ar: [
        { h: 'أحياء بيروت', p: 'رأس بيروت والحمرا: جامعات (الجامعة الأميركية واللبنانية الأميركية) ومقاهٍ وحياة نابضة. فردان والروشة: أبراج سكنية وتسوّق وإطلالات بحرية. وسط المدينة والصيفي: قلب المدينة المُعاد إعماره. الأشرفية والجميزة ومار مخايل: شوارع تاريخية ومطاعم وأحياء عائلية عريقة. بدارو والمزرعة وكورنيش المزرعة: مناطق مركزية سكنية وتجارية.' },
        { h: 'التنقل', p: 'معظم الحاجات اليومية على مسافة قصيرة سيراً أو بالسيارة. يقع مطار رفيق الحريري الدولي جنوب المدينة، ويربط الأوتوستراد الساحلي بيروت شمالاً بالمتن وكسروان.' },
        { h: 'لمن تناسب بيروت؟', p: 'للمهنيين والطلاب الراغبين بالقرب من العمل والجامعة، وللعائلات التي تقدّر قرب المستشفيات والمدارس، وللشركات الباحثة عن مكاتب ومحلات، وللمستثمرين الباحثين عن عقارات سهلة التأجير.' },
      ],
      fr: [
        { h: 'Les quartiers de Beyrouth', p: 'Ras Beyrouth et Hamra : universités (AUB, LAU), cafés et rues animées. Verdun et Raouché : tours résidentielles, commerces et vue sur la mer. Centre-ville et Saïfi : le cœur reconstruit de la ville. Achrafieh, Gemmayzé et Mar Mikhaël : rues historiques, restaurants et quartiers familiaux. Badaro, Mazraa et Corniche el Mazraa : quartiers centraux, résidentiels et commerciaux.' },
        { h: 'Se déplacer', p: 'À Beyrouth, la plupart des besoins du quotidien sont à quelques minutes à pied ou en voiture. L’aéroport international Rafic Hariri est au sud de la ville, et l’autoroute côtière relie Beyrouth au Metn et au Kesrouan au nord.' },
        { h: 'Pour qui ?', p: 'Les actifs et étudiants qui veulent être proches du travail et de l’université, les familles attachées aux grands hôpitaux et écoles, les entreprises à la recherche de bureaux et commerces, et les investisseurs visant des biens faciles à louer.' },
      ],
    },
    faq: {
      en: [
        { q: 'What are the best areas to live in Beirut?', a: 'It depends on your priorities: Achrafieh and Badaro for established family neighbourhoods, Hamra and Ras Beirut for universities and city life, Verdun for residential towers and shopping, and Downtown or Saifi for central, modern buildings.' },
        { q: 'Should I buy in Beirut or just outside it?', a: 'Beirut gives you the shortest commute and the strongest rental demand; Metn and Keserwan usually give more space and greenery for the same budget. Many buyers compare both before deciding.' },
      ],
      ar: [
        { q: 'ما أفضل المناطق للسكن في بيروت؟', a: 'يعتمد ذلك على أولوياتك: الأشرفية وبدارو للأحياء العائلية العريقة، الحمرا ورأس بيروت للجامعات وحياة المدينة، فردان للأبراج السكنية والتسوق، ووسط المدينة والصيفي للأبنية الحديثة في قلب العاصمة.' },
        { q: 'هل أشتري في بيروت أم خارجها؟', a: 'تمنحك بيروت أقصر طريق إلى العمل وأقوى طلب على الإيجار، بينما يقدّم المتن وكسروان عادةً مساحة وطبيعة أكثر بالميزانية نفسها. كثير من المشترين يقارنون بين الخيارين قبل القرار.' },
      ],
      fr: [
        { q: 'Quels sont les meilleurs quartiers où vivre à Beyrouth ?', a: 'Tout dépend de vos priorités : Achrafieh et Badaro pour des quartiers familiaux établis, Hamra et Ras Beyrouth pour les universités et la vie urbaine, Verdun pour les tours résidentielles et le shopping, le centre-ville ou Saïfi pour des immeubles modernes au cœur de la ville.' },
        { q: 'Acheter à Beyrouth ou juste à côté ?', a: 'Beyrouth offre les trajets les plus courts et la meilleure demande locative ; le Metn et le Kesrouan offrent souvent plus d’espace et de verdure pour le même budget. Beaucoup d’acheteurs comparent les deux avant de décider.' },
      ],
    },
  },

  achrafieh: {
    sections: {
      en: [
        { h: 'Neighbourhoods of Achrafieh', p: 'Sassine and Sodeco: the commercial heart, with ABC Achrafieh, banks and cafés. Monot and Saifi: close to Downtown. Gemmayze and Mar Mikhael: restored old houses, galleries, bars and restaurants. Adlieh, Mar Mitr, Furn el Hayek, Rmeil and Medawar: quieter residential streets and good-value homes and offices.' },
        { h: 'Who Achrafieh suits', p: 'Families close to schools, Saint Joseph University, Hôtel-Dieu de France and LAU Medical Center–Rizk; professionals working Downtown; and anyone who likes walking to restaurants and shops. Offices around Sodeco and Adlieh are popular with clinics, consultancies and small companies.' },
      ],
      ar: [
        { h: 'أحياء الأشرفية', p: 'ساسين والسوديكو: القلب التجاري مع مجمّع ABC والمصارف والمقاهي. مونو والصيفي: على مقربة من وسط المدينة. الجميزة ومار مخايل: بيوت قديمة مرمّمة ومعارض ومطاعم وسهر. العدلية ومار متر وفرن الحايك والرميل والمدوّر: شوارع سكنية أهدأ وأسعار مدروسة للشقق والمكاتب.' },
        { h: 'لمن تناسب الأشرفية؟', p: 'للعائلات القريبة من المدارس وجامعة القديس يوسف ومستشفى أوتيل ديو ومستشفى رزق؛ وللمهنيين العاملين في وسط المدينة؛ ولكل من يحب الوصول سيراً إلى المطاعم والمحلات. كما تُطلب المكاتب في السوديكو والعدلية للعيادات والاستشارات والشركات الصغيرة.' },
      ],
      fr: [
        { h: 'Les quartiers d’Achrafieh', p: 'Sassine et Sodeco : le cœur commerçant, avec ABC Achrafieh, banques et cafés. Monot et Saïfi : à deux pas du centre-ville. Gemmayzé et Mar Mikhaël : maisons anciennes restaurées, galeries, bars et restaurants. Adlieh, Mar Mitr, Furn el Hayek, Rmeil et Medawar : rues résidentielles plus calmes et biens à prix raisonnables.' },
        { h: 'Pour qui ?', p: 'Les familles proches des écoles, de l’Université Saint-Joseph, de l’Hôtel-Dieu de France et du LAU Medical Center–Rizk ; les actifs travaillant au centre-ville ; et tous ceux qui aiment tout faire à pied. Les bureaux de Sodeco et Adlieh attirent cliniques, cabinets de conseil et petites entreprises.' },
      ],
    },
    faq: {
      en: [
        { q: 'Is Achrafieh a good area to rent an apartment?', a: 'Yes — it is one of Beirut’s most popular rental areas, thanks to its schools, hospitals and universities, its restaurants and its quick access to Downtown. Smaller apartments and furnished units rent especially fast.' },
        { q: 'Which part of Achrafieh is quietest?', a: 'Residential pockets such as Mar Mitr, Furn el Hayek and the streets behind Sassine are generally calmer than the nightlife streets of Gemmayze and Mar Mikhael.' },
      ],
      ar: [
        { q: 'هل الأشرفية منطقة جيدة لاستئجار شقة؟', a: 'نعم، فهي من أكثر مناطق بيروت طلباً للإيجار بفضل مدارسها ومستشفياتها وجامعاتها ومطاعمها وقربها من وسط المدينة. وتُؤجَّر الشقق الصغيرة والمفروشة بسرعة خاصة.' },
        { q: 'ما هو الجزء الأهدأ في الأشرفية؟', a: 'الأحياء السكنية مثل مار متر وفرن الحايك والشوارع خلف ساسين أهدأ عموماً من شوارع السهر في الجميزة ومار مخايل.' },
      ],
      fr: [
        { q: 'Achrafieh est-il un bon quartier pour louer un appartement ?', a: 'Oui — c’est l’un des quartiers de location les plus recherchés de Beyrouth, grâce à ses écoles, hôpitaux, universités et restaurants et à sa proximité avec le centre-ville. Les petits appartements et les meublés se louent particulièrement vite.' },
        { q: 'Quelle partie d’Achrafieh est la plus calme ?', a: 'Les poches résidentielles comme Mar Mitr, Furn el Hayek et les rues derrière Sassine sont en général plus calmes que les rues animées de Gemmayzé et Mar Mikhaël.' },
      ],
    },
  },

  keserwan: {
    sections: {
      en: [
        { h: 'Towns in Keserwan', p: 'Coast: Jounieh (the district centre), Kaslik, Zouk Mosbeh, Zouk Mikael, Adma, Sahel Alma and Ghazir. Hills: Harissa, Ajaltoun, Raifoun and Ballouneh. Mountains: Faraya, Faqra and Kfardebian with their ski resorts. Jeita Grotto, one of Lebanon’s best-known natural sites, is also in Keserwan.' },
        { h: 'Who Keserwan suits', p: 'Families who want sea or mountain views, students and staff of USEK in Kaslik, people working in Jounieh or north of Beirut, and buyers looking for a ski chalet or summer home.' },
      ],
      ar: [
        { h: 'بلدات كسروان', p: 'الساحل: جونيه (مركز القضاء)، الكسليك، زوق مصبح، زوق مكايل، أدما، ساحل علما وغزير. التلال: حريصا، عجلتون، ريفون وبلونة. الجبال: فاريا وفقرا وكفردبيان مع منتجعات التزلج. كما تقع مغارة جعيتا، من أشهر المعالم الطبيعية في لبنان، في كسروان.' },
        { h: 'لمن يناسب كسروان؟', p: 'للعائلات الباحثة عن إطلالة على البحر أو الجبل، ولطلاب جامعة الروح القدس في الكسليك والعاملين فيها، ولمن يعمل في جونيه أو شمال بيروت، وللمشترين الباحثين عن شاليه تزلّج أو بيت صيفي.' },
      ],
      fr: [
        { h: 'Les villes du Kesrouan', p: 'Côte : Jounieh (chef-lieu), Kaslik, Zouk Mosbeh, Zouk Mikaël, Adma, Sahel Alma et Ghazir. Collines : Harissa, Ajaltoun, Raifoun et Ballouneh. Montagne : Faraya, Faqra et Kfardebian et leurs stations de ski. La grotte de Jeita, l’un des sites naturels les plus connus du Liban, se trouve aussi au Kesrouan.' },
        { h: 'Pour qui ?', p: 'Les familles qui veulent une vue sur la mer ou la montagne, les étudiants et le personnel de l’USEK à Kaslik, les actifs travaillant à Jounieh ou au nord de Beyrouth, et les acheteurs d’un chalet de ski ou d’une maison d’été.' },
      ],
    },
    faq: {
      en: [
        { q: 'What is Keserwan known for?', a: 'The bay of Jounieh, the Harissa shrine overlooking it, Jeita Grotto, the ski resorts of Faraya and Faqra, and a lively coast of restaurants, marinas and nightlife in Kaslik and Zouk.' },
        { q: 'How far is Keserwan from Beirut?', a: 'Jounieh is about 20 km north of Beirut along the coastal highway; the ski resorts of Faraya and Faqra are roughly an hour’s drive from the capital, depending on traffic and weather.' },
      ],
      ar: [
        { q: 'بماذا يشتهر كسروان؟', a: 'بخليج جونيه وحريصا المطلّة عليه، ومغارة جعيتا، ومنتجعات التزلج في فاريا وفقرا، وبساحل نابض بالمطاعم والمرافئ والسهر في الكسليك والزوق.' },
        { q: 'كم يبعد كسروان عن بيروت؟', a: 'تبعد جونيه نحو 20 كلم شمال بيروت على الأوتوستراد الساحلي، أما منتجعات فاريا وفقرا فتبعد قرابة ساعة بالسيارة عن العاصمة بحسب السير والطقس.' },
      ],
      fr: [
        { q: 'Pour quoi le Kesrouan est-il connu ?', a: 'La baie de Jounieh et le sanctuaire de Harissa qui la domine, la grotte de Jeita, les stations de ski de Faraya et Faqra, et une côte animée de restaurants, marinas et vie nocturne à Kaslik et Zouk.' },
        { q: 'À quelle distance de Beyrouth se trouve le Kesrouan ?', a: 'Jounieh est à environ 20 km au nord de Beyrouth par l’autoroute côtière ; les stations de Faraya et Faqra sont à environ une heure de route de la capitale, selon la circulation et la météo.' },
      ],
    },
  },

  jbeil: {
    sections: {
      en: [
        { h: 'Towns around Jbeil', p: 'Jbeil city with its old souk, citadel and harbour; Amchit and Halat along the coast; Blat, home to the Byblos campus of the Lebanese American University (LAU); and mountain villages further inland toward Annaya and Laqlouq.' },
        { h: 'Who Jbeil suits', p: 'Families and retirees looking for a calmer coastal town, LAU students and staff, and investors interested in shops, restaurants and holiday rentals in a town that attracts visitors all year.' },
      ],
      ar: [
        { h: 'البلدات حول جبيل', p: 'مدينة جبيل مع سوقها القديم وقلعتها ومرفئها؛ عمشيت وحالات على الساحل؛ بلاط حيث حرم الجامعة اللبنانية الأميركية في جبيل؛ والقرى الجبلية في الداخل باتجاه عنايا واللقلوق.' },
        { h: 'لمن تناسب جبيل؟', p: 'للعائلات والمتقاعدين الباحثين عن مدينة ساحلية أهدأ، ولطلاب الجامعة اللبنانية الأميركية وموظفيها، وللمستثمرين المهتمين بالمحلات والمطاعم والإيجارات السياحية في مدينة تجذب الزوار طوال السنة.' },
      ],
      fr: [
        { h: 'Autour de Byblos', p: 'La ville de Jbeil avec son vieux souk, sa citadelle et son port ; Amchit et Halat sur la côte ; Blat, où se trouve le campus de Byblos de la Lebanese American University (LAU) ; et les villages de montagne vers Annaya et Laqlouq.' },
        { h: 'Pour qui ?', p: 'Les familles et retraités qui cherchent une ville côtière plus calme, les étudiants et le personnel de la LAU, et les investisseurs intéressés par les commerces, restaurants et locations saisonnières dans une ville qui attire des visiteurs toute l’année.' },
      ],
    },
    faq: {
      en: [
        { q: 'Is Jbeil (Byblos) a good place to live?', a: 'Many people choose it for its calmer pace, sea, old town and university, while staying within reach of Beirut by the coastal highway (about 40 km).' },
        { q: 'Which towns are near Jbeil?', a: 'Amchit, Halat, Blat and Fidar on the coast and hills, with mountain villages such as Annaya and Laqlouq further inland.' },
      ],
      ar: [
        { q: 'هل جبيل منطقة جيدة للسكن؟', a: 'يختارها كثيرون لإيقاعها الأهدأ وبحرها ومدينتها القديمة وجامعتها، مع بقائها قريبة من بيروت عبر الأوتوستراد الساحلي (نحو 40 كلم).' },
        { q: 'ما البلدات القريبة من جبيل؟', a: 'عمشيت وحالات وبلاط والفيدار على الساحل والتلال، والقرى الجبلية مثل عنايا واللقلوق في الداخل.' },
      ],
      fr: [
        { q: 'Fait-il bon vivre à Byblos (Jbeil) ?', a: 'Beaucoup la choisissent pour son rythme plus calme, la mer, la vieille ville et l’université, tout en restant à portée de Beyrouth par l’autoroute côtière (environ 40 km).' },
        { q: 'Quelles villes sont proches de Byblos ?', a: 'Amchit, Halat, Blat et Fidar sur la côte et les collines, et des villages de montagne comme Annaya et Laqlouq plus à l’intérieur.' },
      ],
    },
  },

  aley: {
    sections: {
      en: [
        { h: 'Towns in Aley district', p: 'Aley town, Bhamdoun and Sawfar along the Beirut–Damascus road, known as summer resorts; Souk el Gharb and Kahaleh closer to Beirut; and coastal-side towns such as Choueifat, Aramoun and Khaldeh near the airport.' },
        { h: 'Who Aley suits', p: 'Buyers wanting a summer home in the pines, families looking for more space for the price, and people working near the airport or south of Beirut.' },
      ],
      ar: [
        { h: 'بلدات قضاء عاليه', p: 'مدينة عاليه وبحمدون وصوفر على طريق بيروت–دمشق، وهي مصايف معروفة؛ سوق الغرب والكحالة الأقرب إلى بيروت؛ والبلدات القريبة من الساحل مثل الشويفات وعرمون وخلدة بالقرب من المطار.' },
        { h: 'لمن تناسب عاليه؟', p: 'للمشترين الباحثين عن بيت صيفي بين الصنوبر، وللعائلات الباحثة عن مساحة أكبر مقابل السعر، ولمن يعمل قرب المطار أو جنوب بيروت.' },
      ],
      fr: [
        { h: 'Les villes du caza d’Aley', p: 'Aley, Bhamdoun et Sawfar sur la route Beyrouth–Damas, connues comme lieux de villégiature ; Souk el Gharb et Kahalé plus près de Beyrouth ; et, côté côte, Choueifat, Aramoun et Khaldé près de l’aéroport.' },
        { h: 'Pour qui ?', p: 'Les acheteurs d’une maison d’été dans les pins, les familles qui veulent plus d’espace pour le prix, et les actifs travaillant près de l’aéroport ou au sud de Beyrouth.' },
      ],
    },
    faq: {
      en: [
        { q: 'What is Aley known for?', a: 'Its tradition as a summer resort: pine forests, cooler mountain air, views over Beirut and the coast, and towns like Bhamdoun and Sawfar along the Beirut–Damascus road.' },
        { q: 'Which towns are in Aley district?', a: 'Aley, Bhamdoun, Sawfar, Souk el Gharb, Kahaleh, Choueifat, Aramoun and Khaldeh, among others.' },
      ],
      ar: [
        { q: 'بماذا تشتهر عاليه؟', a: 'بتاريخها كمصيف: غابات الصنوبر والهواء الجبلي المنعش والإطلالة على بيروت والساحل، وبلدات مثل بحمدون وصوفر على طريق بيروت–دمشق.' },
        { q: 'ما هي بلدات قضاء عاليه؟', a: 'من بينها عاليه وبحمدون وصوفر وسوق الغرب والكحالة والشويفات وعرمون وخلدة.' },
      ],
      fr: [
        { q: 'Pour quoi Aley est-elle connue ?', a: 'Sa tradition de villégiature d’été : pinèdes, air frais de montagne, vue sur Beyrouth et la côte, et des villes comme Bhamdoun et Sawfar sur la route Beyrouth–Damas.' },
        { q: 'Quelles villes font partie du caza d’Aley ?', a: 'Notamment Aley, Bhamdoun, Sawfar, Souk el Gharb, Kahalé, Choueifat, Aramoun et Khaldé.' },
      ],
    },
  },
}
