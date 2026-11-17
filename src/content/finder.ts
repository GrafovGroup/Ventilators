export const finderCopy = {
  en: {
    intro:
      'Find an equipment category for your project, then review what to include in an inquiry. Model selection, compatibility and availability must be confirmed before a quotation.',
    title: 'Find your equipment category',
    search: 'Search categories',
    hint: 'Try “roof”, “axial” or “non-invasive”.',
    division: 'Filter by division',
    all: 'All categories',
    industrial: 'Industrial',
    medical: 'Medical',
    count: 'categories found',
    singular: 'category found',
    reset: 'Clear filters',
    learn: 'View category',
    empty: 'No matching categories',
    help: 'Try a broader term or clear the filters. If you are unsure which category fits, describe your project in an inquiry.',
    inquiry: 'Describe your project',
  },
  fr: {
    intro:
      'Trouvez une catégorie adaptée à votre projet, puis consultez les renseignements à inclure dans une demande. Le choix du modèle, la compatibilité et la disponibilité doivent être confirmés avant une soumission.',
    title: 'Trouvez votre catégorie d’équipement',
    search: 'Rechercher une catégorie',
    hint: 'Essayez « toit », « axial » ou « non invasive ».',
    division: 'Filtrer par division',
    all: 'Toutes les catégories',
    industrial: 'Industriel',
    medical: 'Médical',
    count: 'catégories trouvées',
    singular: 'catégorie trouvée',
    reset: 'Effacer les filtres',
    learn: 'Voir la catégorie',
    empty: 'Aucune catégorie correspondante',
    help: 'Essayez un terme plus général ou effacez les filtres. Si vous hésitez sur la catégorie, décrivez votre projet dans une demande.',
    inquiry: 'Décrire votre projet',
  },
};
export type FinderCopy = (typeof finderCopy)['en'];

// Search aliases identify generic categories; they make no product or compatibility claims.
export const categoryAliases: Record<string, { en: string; fr: string }> = {
  roof: { en: 'rooftop curb upblast downblast', fr: 'toiture embase toit' },
  axial: { en: 'axial fan propeller', fr: 'axial axiaux hélice' },
  centrifugal: { en: 'centrifugal fan blower', fr: 'centrifuge centrifuges turbine' },
  exhaust: { en: 'extraction exhaust air', fr: 'extraction évacuation air' },
  supply: { en: 'make-up makeup supply air', fr: 'apport air neuf compensation' },
  blowers: { en: 'blower blowers', fr: 'soufflante souffleur' },
  parts: { en: 'replacement spare parts motor belt', fr: 'rechange pièces moteur courroie' },
  invasive: {
    en: 'invasive ventilation ICU critical care',
    fr: 'invasive soins intensifs réanimation',
  },
  noninvasive: { en: 'non-invasive noninvasive NIV', fr: 'non invasive VNI' },
  accessories: { en: 'circuit filter mask accessories', fr: 'circuit filtre masque accessoires' },
  procurement: {
    en: 'medical procurement sourcing tender',
    fr: 'approvisionnement médical achat appel offres',
  },
};
