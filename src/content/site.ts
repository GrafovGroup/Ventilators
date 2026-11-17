export const locales = ['en', 'fr'] as const;
export type Locale = (typeof locales)[number];
export type Division = 'industrial' | 'medical';
export const isLocale = (value: string): value is Locale => locales.includes(value as Locale);

export const slugs = {
  home: { en: '', fr: '' },
  industrial: { en: 'industrial', fr: 'industriel' },
  medical: { en: 'medical', fr: 'medical' },
  products: { en: 'products', fr: 'produits' },
  services: { en: 'services', fr: 'services' },
  industries: { en: 'industries', fr: 'secteurs' },
  resources: { en: 'resources', fr: 'ressources' },
  about: { en: 'about', fr: 'a-propos' },
  contact: { en: 'contact', fr: 'contact' },
  quote: { en: 'request-a-quote', fr: 'demande-de-soumission' },
  faq: { en: 'faq', fr: 'faq' },
  privacy: { en: 'privacy', fr: 'confidentialite' },
  terms: { en: 'terms', fr: 'conditions' },
  accessibility: { en: 'accessibility', fr: 'accessibilite' },
} as const;
export type PageKey = keyof typeof slugs;
export const navKeys: PageKey[] = [
  'industrial',
  'medical',
  'products',
  'services',
  'industries',
  'resources',
  'about',
  'contact',
];
export const pathFor = (locale: Locale, page: PageKey) =>
  `/${locale}/${slugs[page][locale] ? `${slugs[page][locale]}/` : ''}`;
export const quotePath = (locale: Locale, division?: Division, category?: string) => {
  const params = new URLSearchParams();
  if (division) params.set('division', division);
  if (category) params.set('category', category);
  return pathFor(locale, 'quote') + (params.size ? `?${params}` : '');
};

export const dictionaries = {
  en: {
    nav: {
      home: 'Home',
      industrial: 'Industrial',
      medical: 'Medical',
      products: 'Products',
      services: 'Services',
      industries: 'Industries',
      resources: 'Resources',
      about: 'About',
      contact: 'Contact',
      quote: 'Request a quote',
      faq: 'FAQ',
      privacy: 'Privacy',
      terms: 'Terms of use',
      accessibility: 'Accessibility',
    },
    common: {
      skip: 'Skip to content',
      menu: 'Menu',
      close: 'Close menu',
      language: 'Lire cette page en français',
      country: 'Canada-wide inquiries',
      quote: 'Request a quote',
      call: 'Call us',
      email: 'Email us',
      explore: 'Explore the division',
      categories: 'Explore equipment categories',
      inquiry: 'Prepare an inquiry',
      learn: 'View category',
      home: 'Home',
      breadcrumb: 'Breadcrumb',
      footer:
        'Industrial ventilation. Medical procurement. A clear starting point for your next project.',
      copyright: 'Ventilators.ca · Grafov Group',
      notice: 'Equipment shown for context. Models and availability are confirmed individually.',
      required: 'Required',
      optional: 'optional',
      read: 'Read more',
      download: 'Download checklist',
      draft: 'Draft for review',
      back: 'Back to home',
    },
    home: {
      eyebrow: 'TWO DIVISIONS. ONE POINT OF CONTACT.',
      title: 'The right airflow.',
      accent: 'For every environment.',
      intro:
        'Industrial ventilation and medical equipment inquiries, with a dedicated path for each.',
      industrial: 'Industrial ventilation',
      industrialText:
        'Equipment, parts and project requirements for facilities that need to keep moving.',
      medical: 'Medical ventilators',
      medicalText: 'Equipment sourcing and procurement inquiries for healthcare institutions.',
      industrialTag: 'FACILITIES & CONTRACTORS',
      medicalTag: 'HEALTHCARE & INSTITUTIONS',
      industrialCta: 'Explore industrial',
      medicalCta: 'Explore medical',
      strip1: 'Across Canada',
      strip2: 'English & Français',
      strip3: 'Equipment • Parts • Procurement',
      processLabel: 'A CLEAR STARTING POINT',
      processTitle: 'Your requirements come first.',
      processText:
        'A replacement unit, a new installation or an institutional procurement request: start with the details that matter to your project.',
      steps: [
        {
          title: 'Tell us what you need',
          text: 'Choose your division and share your equipment, specifications and project location.',
        },
        {
          title: 'Define the requirements',
          text: 'Identify the documents, compatibility checks and supplier confirmations your inquiry needs.',
        },
        {
          title: 'Build a clear scope',
          text: 'Availability, service scope and lead times must be confirmed before a quote can be finalized.',
        },
      ],
      sectorsLabel: 'DIFFERENT ENVIRONMENTS. SPECIFIC REQUIREMENTS.',
      sectorsTitle: 'Built around your application.',
      sectors: [
        'Manufacturing',
        'Warehouses',
        'Commercial facilities',
        'Hospitals',
        'Clinics & institutions',
      ],
      ctaTitle: 'Let’s start with your project.',
      ctaText: 'Have a model number or a specification sheet? Keep it handy. We’ll start there.',
    },
    industrial: {
      eyebrow: '01 / INDUSTRIAL DIVISION',
      title: 'Airflow built around your operation.',
      intro:
        'Start an inquiry for ventilation equipment, replacement parts or a defined service scope. Share your application and technical requirements.',
      cta: 'Industrial quote request',
      categoryTitle: 'Find your starting point.',
      categoryText:
        'Explore system categories, then bring your project specifications to the conversation.',
      prepareTitle: 'Replacing an existing unit?',
      prepareText:
        'Record the nameplate, dimensions, electrical supply and operating requirements. Existing equipment details help frame a replacement inquiry; they do not establish compatibility on their own.',
      scopeTitle: 'A clear scope. A considered next step.',
      scopeText:
        'Repair, maintenance and installation coordination are subject to confirmed trade qualifications, location and partner availability.',
    },
    medical: {
      eyebrow: '02 / MEDICAL DIVISION',
      title: 'A considered approach to medical procurement.',
      intro:
        'A dedicated inquiry path for institutional equipment sourcing, respiratory accessories and requests for qualified technical support.',
      cta: 'Medical procurement inquiry',
      categoryTitle: 'Start with your procurement needs.',
      categoryText:
        'These are inquiry categories. No specific device, compatibility or availability is being offered as verified.',
      prepareTitle: 'Prepare your procurement brief.',
      prepareText:
        'Include the requested manufacturer and model, quantities, delivery province and institutional documentation requirements. Do not include patient information.',
      scopeTitle: 'Verification comes before an offer.',
      scopeText:
        'Device regulatory status, supplier authorization, compatibility and any service scope require verification. This site does not provide clinical advice.',
    },
    form: {
      eyebrow: 'YOUR PROJECT STARTS HERE',
      title: 'Tell us what you need.',
      intro: 'Choose a division and prepare the details for your equipment or procurement inquiry.',
      unavailableTitle: 'Online delivery is not available yet.',
      unavailable:
        'This preview lets you review your inquiry, but does not send or save it. To contact us, use the phone or email details alongside the form.',
      division: 'Division',
      name: 'Full name',
      organization: 'Organization',
      email: 'Work email',
      phone: 'Phone',
      province: 'Province or territory',
      category: 'Equipment category',
      model: 'Manufacturer / model',
      capacity: 'Airflow / capacity and units',
      clinicalModel: 'Requested device / procurement specification',
      quantity: 'Quantity',
      timeline: 'Project timeline',
      details: 'Project details',
      consent:
        'I have read the privacy notice and understand that this preview will not send or store my inquiry.',
      patient: 'Do not include patient names, health records or other personal health information.',
      submit: 'Review inquiry',
      reviewed: 'Inquiry reviewed — nothing has been sent.',
      reviewedText:
        'Online delivery is unavailable. Please call or email us to continue. Your entries remain only in this open page.',
      errors: 'Please check the highlighted fields.',
      requiredError: 'Please complete this field.',
      emailError: 'Enter a valid email address.',
      quantityError: 'Enter a whole number between 1 and 10,000.',
      lengthError: 'This value is too long.',
      consentError: 'Please acknowledge the privacy notice.',
      select: 'Please select',
      timelines: ['Planning / budget', 'Within 1 month', '1–3 months', 'More than 3 months'],
      support: 'Prefer a conversation?',
      supportText: 'Contact us directly with your division and project requirements.',
      status: 'Inquiry only · Availability to be confirmed',
      privacy: 'Read the privacy notice',
      noAttachments: 'For now, describe your documentation. File uploads are not enabled.',
      valid: 'The inquiry details are ready for your review.',
    },
  },
  fr: {
    nav: {
      home: 'Accueil',
      industrial: 'Industriel',
      medical: 'Médical',
      products: 'Produits',
      services: 'Services',
      industries: 'Secteurs',
      resources: 'Ressources',
      about: 'À propos',
      contact: 'Contact',
      quote: 'Demander une soumission',
      faq: 'FAQ',
      privacy: 'Confidentialité',
      terms: 'Conditions d’utilisation',
      accessibility: 'Accessibilité',
    },
    common: {
      skip: 'Passer au contenu',
      menu: 'Menu',
      close: 'Fermer le menu',
      language: 'Read this page in English',
      country: 'Demandes partout au Canada',
      quote: 'Demander une soumission',
      call: 'Nous appeler',
      email: 'Nous écrire',
      explore: 'Découvrir la division',
      categories: 'Découvrir les catégories',
      inquiry: 'Préparer une demande',
      learn: 'Voir la catégorie',
      home: 'Accueil',
      breadcrumb: 'Fil d’Ariane',
      footer:
        'Ventilation industrielle. Approvisionnement médical. Un point de départ clair pour votre prochain projet.',
      copyright: 'Ventilators.ca · Grafov Group',
      notice:
        'Équipement présenté à titre illustratif. Les modèles et la disponibilité sont confirmés au cas par cas.',
      required: 'Obligatoire',
      optional: 'facultatif',
      read: 'En savoir plus',
      download: 'Télécharger la liste',
      draft: 'Version à réviser',
      back: 'Retour à l’accueil',
    },
    home: {
      eyebrow: 'DEUX DIVISIONS. UN SEUL POINT DE CONTACT.',
      title: 'L’air qu’il vous faut.',
      accent: 'Pour chaque environnement.',
      intro:
        'Ventilation industrielle et équipement médical : une démarche adaptée à chaque besoin.',
      industrial: 'Ventilation industrielle',
      industrialText:
        'Équipement, pièces et besoins techniques pour vos installations et vos projets.',
      medical: 'Ventilateurs médicaux',
      medicalText:
        'Recherche d’équipement et demandes d’approvisionnement pour les établissements de santé.',
      industrialTag: 'INSTALLATIONS ET ENTREPRENEURS',
      medicalTag: 'SANTÉ ET ÉTABLISSEMENTS',
      industrialCta: 'Division industrielle',
      medicalCta: 'Division médicale',
      strip1: 'Partout au Canada',
      strip2: 'Français et anglais',
      strip3: 'Équipement • Pièces • Approvisionnement',
      processLabel: 'UN POINT DE DÉPART CLAIR',
      processTitle: 'Vos besoins avant tout.',
      processText:
        'Un appareil à remplacer, une nouvelle installation ou un appel d’offres institutionnel : commencez par les détails essentiels à votre projet.',
      steps: [
        {
          title: 'Décrivez votre besoin',
          text: 'Choisissez votre division et précisez l’équipement, les spécifications et le lieu du projet.',
        },
        {
          title: 'Précisez les exigences',
          text: 'Déterminez les documents, les vérifications de compatibilité et les confirmations nécessaires.',
        },
        {
          title: 'Définissez la portée',
          text: 'La disponibilité, les services et les délais doivent être confirmés avant de finaliser une soumission.',
        },
      ],
      sectorsLabel: 'DES MILIEUX DIFFÉRENTS. DES BESOINS PRÉCIS.',
      sectorsTitle: 'Selon votre application.',
      sectors: [
        'Fabrication',
        'Entrepôts',
        'Bâtiments commerciaux',
        'Hôpitaux',
        'Cliniques et établissements',
      ],
      ctaTitle: 'Parlons de votre projet.',
      ctaText:
        'Vous avez un numéro de modèle ou une fiche technique? Gardez-les à portée de main pour commencer.',
    },
    industrial: {
      eyebrow: '01 / DIVISION INDUSTRIELLE',
      title: 'La ventilation adaptée à vos activités.',
      intro:
        'Préparez une demande pour de l’équipement de ventilation, des pièces de remplacement ou des services définis. Précisez votre application et vos exigences techniques.',
      cta: 'Soumission industrielle',
      categoryTitle: 'Trouvez votre point de départ.',
      categoryText: 'Explorez les catégories, puis rassemblez les spécifications de votre projet.',
      prepareTitle: 'Un appareil à remplacer?',
      prepareText:
        'Notez les données de la plaque signalétique, les dimensions, l’alimentation électrique et les conditions de fonctionnement. Ces renseignements orientent la demande, sans établir à eux seuls la compatibilité.',
      scopeTitle: 'Une portée claire. Une démarche réfléchie.',
      scopeText:
        'La réparation, l’entretien et la coordination de l’installation dépendent des qualifications professionnelles, du lieu et de la disponibilité des partenaires, qui restent à confirmer.',
    },
    medical: {
      eyebrow: '02 / DIVISION MÉDICALE',
      title: 'Un approvisionnement médical réfléchi.',
      intro:
        'Une démarche dédiée à la recherche d’équipement, aux accessoires respiratoires et aux demandes de soutien technique qualifié pour les établissements.',
      cta: 'Demande d’approvisionnement médical',
      categoryTitle: 'Commencez par vos besoins.',
      categoryText:
        'Ces catégories servent à préparer une demande. Aucun appareil, aucune compatibilité ni aucune disponibilité ne sont présentés comme vérifiés.',
      prepareTitle: 'Préparez votre dossier d’achat.',
      prepareText:
        'Indiquez le fabricant et le modèle souhaités, les quantités, la province de livraison et les documents exigés par votre établissement. N’incluez aucun renseignement sur les patients.',
      scopeTitle: 'La vérification précède toute offre.',
      scopeText:
        'Le statut réglementaire, l’autorisation du fournisseur, la compatibilité et la portée des services doivent être vérifiés. Ce site ne fournit aucun conseil clinique.',
    },
    form: {
      eyebrow: 'VOTRE PROJET COMMENCE ICI',
      title: 'Parlez-nous de vos besoins.',
      intro:
        'Choisissez une division et préparez les renseignements pour votre demande d’équipement ou d’approvisionnement.',
      unavailableTitle: 'L’envoi en ligne n’est pas encore disponible.',
      unavailable:
        'Cet aperçu permet de vérifier votre demande, mais ne l’envoie pas et ne l’enregistre pas. Pour nous joindre, utilisez le téléphone ou le courriel indiqués à côté du formulaire.',
      division: 'Division',
      name: 'Nom complet',
      organization: 'Organisation',
      email: 'Courriel professionnel',
      phone: 'Téléphone',
      province: 'Province ou territoire',
      category: 'Catégorie d’équipement',
      model: 'Fabricant / modèle',
      capacity: 'Débit d’air / capacité et unités',
      clinicalModel: 'Appareil demandé / exigences d’achat',
      quantity: 'Quantité',
      timeline: 'Échéancier du projet',
      details: 'Détails du projet',
      consent:
        'J’ai lu l’avis de confidentialité et je comprends que cet aperçu n’enverra pas et ne conservera pas ma demande.',
      patient:
        'N’incluez aucun nom de patient, dossier médical ou autre renseignement personnel sur la santé.',
      submit: 'Vérifier la demande',
      reviewed: 'Demande vérifiée — rien n’a été envoyé.',
      reviewedText:
        'L’envoi en ligne n’est pas disponible. Veuillez nous appeler ou nous écrire pour poursuivre. Vos renseignements restent uniquement dans cette page ouverte.',
      errors: 'Veuillez vérifier les champs indiqués.',
      requiredError: 'Veuillez remplir ce champ.',
      emailError: 'Saisissez une adresse courriel valide.',
      quantityError: 'Saisissez un nombre entier de 1 à 10 000.',
      lengthError: 'Cette valeur est trop longue.',
      consentError: 'Veuillez confirmer la lecture de l’avis.',
      select: 'Veuillez choisir',
      timelines: [
        'Planification / budget',
        'Dans moins d’un mois',
        'Dans 1 à 3 mois',
        'Dans plus de 3 mois',
      ],
      support: 'Vous préférez en discuter?',
      supportText:
        'Communiquez directement avec nous en précisant la division et les besoins du projet.',
      status: 'Sur demande · Disponibilité à confirmer',
      privacy: 'Lire l’avis de confidentialité',
      noAttachments: 'Pour le moment, décrivez vos documents. Le téléversement n’est pas activé.',
      valid: 'Les renseignements de la demande sont prêts pour votre vérification.',
    },
  },
};
