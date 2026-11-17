import type { Localized } from './catalog';

export const projectPaths: {
  guide: string;
  title: Localized<string>;
  summary: Localized<string>;
}[] = [
  {
    guide: 'replacement-guide',
    title: {
      en: 'Replace an existing industrial fan',
      fr: 'Remplacer un ventilateur industriel existant',
    },
    summary: {
      en: 'Organize the existing model, interfaces and replacement scope before comparing an offer.',
      fr: 'Rassemblez le modèle, les interfaces et la portée du remplacement avant de comparer une offre.',
    },
  },
  {
    guide: 'industrial-specifications',
    title: {
      en: 'Prepare an industrial equipment specification',
      fr: 'Préparer des spécifications industrielles',
    },
    summary: {
      en: 'Bring together the design duty, units, drawings and project responsibilities.',
      fr: 'Regroupez le fonctionnement prévu, les unités, les dessins et les responsabilités du projet.',
    },
  },
  {
    guide: 'medical-procurement-guide',
    title: {
      en: 'Prepare an institutional medical purchase',
      fr: 'Préparer un achat médical institutionnel',
    },
    summary: {
      en: 'Structure the approved device specification, supplier evidence and purchasing documents.',
      fr: 'Structurez les spécifications approuvées, les preuves du fournisseur et les documents d’achat.',
    },
  },
  {
    guide: 'accessory-guide',
    title: { en: 'Identify a respiratory accessory', fr: 'Identifier un accessoire respiratoire' },
    summary: {
      en: 'Connect the part reference to its device, packaging and manufacturer documentation.',
      fr: 'Reliez la référence de pièce à son appareil, à son conditionnement et aux documents du fabricant.',
    },
  },
];
