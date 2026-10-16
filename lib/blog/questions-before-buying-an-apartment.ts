import type { Article } from './types'

const article: Article = {
  slug: 'questions-before-buying-an-apartment',
  published: '2026-10-16',
  readMinutes: 5,
  text: {
    en: {
      title: '20 Questions to Ask Before Buying an Apartment in Lebanon',
      description: 'A practical checklist for apartment buyers in Lebanon: title deed, building, utilities, parking, costs and the neighbourhood — the questions to ask before you make an offer.',
      body: [
        { p: 'Photos and a viewing show you how an apartment looks. These questions tell you what you are really buying. Take this checklist with you to every viewing.' },
        { h2: 'The deed and the paperwork' },
        { ul: [
          'Does the apartment have its own registered title deed ("green deed"), or is it still pending?',
          'Who are the registered owners, and are they all selling?',
          'Is the area on the deed the same as the actual area? (They often differ — know which one the price is based on.)',
          'Are the parking spaces and storage (cave) registered on the deed, or just "allocated"?',
          'Is there any mortgage, seizure or other note on the land registry statement?',
        ] },
        { h2: 'The building' },
        { ul: [
          'How old is the building, and has it been maintained?',
          'How many apartments are there per floor?',
          'Does the elevator run on the generator during power cuts?',
          'What are the monthly building charges, and what do they cover?',
          'Are there any planned works or unpaid charges the new owner would inherit?',
        ] },
        { h2: 'Electricity, water and heating' },
        { ul: [
          'How many amperes does the generator subscription provide, and for how many hours?',
          'Is there solar power or a battery (UPS) system — and is it included in the sale?',
          'Where does the water come from: well, tank, municipal supply or deliveries?',
          'Is there central heating or air conditioning, and what does it run on?',
        ] },
        { h2: 'The apartment itself' },
        { ul: [
          'Which way does it face, and how much natural light does it get through the day?',
          'Is the view protected, or could a new building block it?',
          'Are there signs of damp, leaks or cracks — especially around windows and on the top floor?',
        ] },
        { h2: 'The neighbourhood and the deal' },
        { ul: [
          'How long is the drive to work or school at rush hour?',
          'Is the price negotiable, and are payment facilities possible?',
          'What is included: kitchen, wardrobes, air conditioners, water heaters, furniture?',
        ] },
        { tip: 'Our listings answer many of these up front — floor, parking, deed status, generator and water. When something is not listed, just ask: we will find out before you visit.' },
        { p: 'For the full buying process, read our [step-by-step guide to buying property in Lebanon](/blog/buying-property-in-lebanon). Then browse [apartments for sale](/properties/apartments-for-sale).' },
      ],
    },
    ar: {
      title: '20 سؤالاً قبل شراء شقة في لبنان',
      description: 'لائحة عملية لمشتري الشقق في لبنان: سند الملكية، المبنى، الخدمات، المواقف، الكلفة والحي — الأسئلة التي يجب طرحها قبل تقديم أي عرض.',
      body: [
        { p: 'الصور والمعاينة تُظهر لك شكل الشقة، أما هذه الأسئلة فتخبرك بما تشتريه فعلاً. خذ هذه اللائحة معك إلى كل معاينة.' },
        { h2: 'السند والأوراق' },
        { ul: [
          'هل للشقة سند ملكية خاص مسجّل ("سند أخضر")، أم أنه لم يصدر بعد؟',
          'من هم المالكون المسجّلون، وهل جميعهم يبيعون؟',
          'هل المساحة في السند مطابقة للمساحة الفعلية؟ (غالباً ما تختلفان — اعرف على أي منهما بُني السعر.)',
          'هل المواقف والمخزن (القبو) مسجّلة في السند أم "مخصّصة" فقط؟',
          'هل يوجد رهن أو حجز أو إشارة أخرى على الإفادة العقارية؟',
        ] },
        { h2: 'المبنى' },
        { ul: [
          'كم عمر المبنى، وهل تمت صيانته؟',
          'كم شقة في كل طابق؟',
          'هل يعمل المصعد على المولّد عند انقطاع الكهرباء؟',
          'ما هي مصاريف المبنى الشهرية، وماذا تشمل؟',
          'هل توجد أعمال مخطط لها أو مصاريف غير مدفوعة سيتحملها المالك الجديد؟',
        ] },
        { h2: 'الكهرباء والمياه والتدفئة' },
        { ul: [
          'كم أمبيراً يوفر اشتراك المولّد، ولكم ساعة؟',
          'هل يوجد نظام طاقة شمسية أو بطاريات — وهل هو مشمول في البيع؟',
          'من أين تأتي المياه: بئر، خزان، شبكة عامة أو توصيل؟',
          'هل توجد تدفئة مركزية أو تكييف، وعلى ماذا يعمل؟',
        ] },
        { h2: 'الشقة نفسها' },
        { ul: [
          'ما هو اتجاهها، وكم تدخلها الشمس خلال النهار؟',
          'هل الإطلالة محمية، أم قد يحجبها مبنى جديد؟',
          'هل توجد علامات رطوبة أو تسرّب أو تشققات — خصوصاً حول النوافذ وفي الطابق الأخير؟',
        ] },
        { h2: 'الحيّ والصفقة' },
        { ul: [
          'كم يستغرق الطريق إلى العمل أو المدرسة في ساعات الذروة؟',
          'هل السعر قابل للتفاوض، وهل يمكن تقسيط الدفع؟',
          'ماذا يشمل البيع: المطبخ، الخزائن، المكيّفات، سخانات المياه، الأثاث؟',
        ] },
        { tip: 'تجيب إعلاناتنا عن كثير من هذه الأسئلة مسبقاً — الطابق والمواقف ووضع السند والمولّد والمياه. وإن لم تجد معلومة، اسألنا: سنتحقق منها قبل زيارتك.' },
        { p: 'لمعرفة مراحل الشراء كاملة، اقرأ [دليل شراء عقار في لبنان خطوة بخطوة](/blog/buying-property-in-lebanon)، ثم تصفّح [الشقق للبيع](/properties/apartments-for-sale).' },
      ],
    },
    fr: {
      title: '20 questions à poser avant d’acheter un appartement au Liban',
      description: 'La check-list pratique de l’acheteur au Liban : titre de propriété, immeuble, électricité et eau, parking, coûts et quartier — les questions à poser avant de faire une offre.',
      body: [
        { p: 'Les photos et la visite montrent à quoi ressemble un appartement. Ces questions révèlent ce que vous achetez vraiment. Emportez cette liste à chaque visite.' },
        { h2: 'Le titre et les papiers' },
        { ul: [
          'L’appartement a-t-il son propre titre de propriété enregistré (« acte vert »), ou est-il encore en attente ?',
          'Qui sont les propriétaires enregistrés, et vendent-ils tous ?',
          'La surface au titre correspond-elle à la surface réelle ? (Elles diffèrent souvent — sachez sur laquelle le prix est calculé.)',
          'Les places de parking et la cave sont-elles inscrites au titre, ou seulement « attribuées » ?',
          'Le relevé foncier mentionne-t-il une hypothèque, une saisie ou une autre inscription ?',
        ] },
        { h2: 'L’immeuble' },
        { ul: [
          'Quel âge a l’immeuble, et a-t-il été entretenu ?',
          'Combien d’appartements par étage ?',
          'L’ascenseur fonctionne-t-il sur le générateur pendant les coupures ?',
          'Quelles sont les charges mensuelles de l’immeuble, et que couvrent-elles ?',
          'Y a-t-il des travaux prévus ou des charges impayées dont hériterait le nouveau propriétaire ?',
        ] },
        { h2: 'Électricité, eau et chauffage' },
        { ul: [
          'Combien d’ampères l’abonnement au générateur fournit-il, et pendant combien d’heures ?',
          'Y a-t-il des panneaux solaires ou un onduleur — et sont-ils inclus dans la vente ?',
          'D’où vient l’eau : puits, citerne, réseau public ou livraisons ?',
          'Y a-t-il un chauffage central ou une climatisation, et avec quelle énergie ?',
        ] },
        { h2: 'L’appartement lui-même' },
        { ul: [
          'Quelle est son orientation, et quelle lumière reçoit-il au fil de la journée ?',
          'La vue est-elle protégée, ou un nouvel immeuble pourrait-il la boucher ?',
          'Y a-t-il des traces d’humidité, de fuites ou des fissures — surtout autour des fenêtres et au dernier étage ?',
        ] },
        { h2: 'Le quartier et la transaction' },
        { ul: [
          'Combien de temps faut-il pour aller au travail ou à l’école aux heures de pointe ?',
          'Le prix est-il négociable, et des facilités de paiement sont-elles possibles ?',
          'Qu’est-ce qui est inclus : cuisine, placards, climatiseurs, chauffe-eau, meubles ?',
        ] },
        { tip: 'Nos annonces répondent déjà à beaucoup de ces questions — étage, parking, statut du titre, générateur et eau. S’il manque une information, demandez-nous : nous vérifierons avant votre visite.' },
        { p: 'Pour l’ensemble du processus d’achat, lisez notre [guide étape par étape pour acheter au Liban](/blog/buying-property-in-lebanon), puis parcourez les [appartements à vendre](/properties/apartments-for-sale).' },
      ],
    },
  },
}

export default article
