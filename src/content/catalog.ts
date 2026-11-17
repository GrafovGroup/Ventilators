import { pathFor, type Division, type Locale } from './site';

export type Localized<T> = Record<Locale, T>;
export interface ProductRecord {
  division: Division;
  category: string;
  name: Localized<string>;
  manufacturer: string;
  model: string;
  summary: Localized<string>;
  applications: Localized<string[]>;
  specifications: { label: Localized<string>; value: string; unit: string; sourceUrl: string }[];
  supportingDocuments: { title: Localized<string>; url: string; verifiedAt: string }[];
  compatibility: { statement: Localized<string>; evidenceUrl: string }[];
  regulatoryEvidence: {
    kind: 'device-licence' | 'establishment-licence' | 'supplier-authority' | 'exemption-review';
    reference: string;
    evidenceUrl: string;
    verifiedAt: string;
  }[];
  availabilityStatus: 'unverified' | 'confirmed-to-order' | 'confirmed-available' | 'unavailable';
  sourcingStatus: 'inquiry-only' | 'verified';
  last_verified_at: string | null;
  canonicalSlug: Localized<string>;
  translationStatus: 'draft' | 'reviewed';
}
// Deliberately empty: publishing a product requires verified source evidence.
export const products: ProductRecord[] = [];

export interface Category {
  id: string;
  division: Division;
  slug: Localized<string>;
  name: Localized<string>;
  summary: Localized<string>;
  considerations: Localized<string[]>;
}
export const categories: Category[] = [
  {
    id: 'roof',
    division: 'industrial',
    slug: { en: 'roof-ventilators', fr: 'ventilateurs-de-toit' },
    name: { en: 'Roof ventilators', fr: 'Ventilateurs de toit' },
    summary: {
      en: 'Frame a rooftop ventilation or replacement inquiry around the existing curb, weather exposure and required duty.',
      fr: 'Préparez une demande pour la ventilation en toiture ou le remplacement d’un appareil selon la costière existante, l’exposition et le fonctionnement requis.',
    },
    considerations: {
      en: [
        'Record curb dimensions, roof access and the existing unit nameplate.',
        'Include airflow, static pressure and electrical supply with units.',
        'Identify exhaust or supply duty and any project-specific weather requirements.',
      ],
      fr: [
        'Notez les dimensions de la costière, l’accès au toit et les données de la plaque signalétique.',
        'Précisez le débit, la pression statique et l’alimentation électrique avec leurs unités.',
        'Indiquez le fonctionnement en extraction ou en soufflage et les contraintes météorologiques du projet.',
      ],
    },
  },
  {
    id: 'axial',
    division: 'industrial',
    slug: { en: 'axial-fans', fr: 'ventilateurs-axiaux' },
    name: { en: 'Axial fans', fr: 'Ventilateurs axiaux' },
    summary: {
      en: 'Prepare specifications for an axial fan inquiry, including the installation arrangement and operating environment.',
      fr: 'Rassemblez les spécifications d’un ventilateur axial, notamment la configuration de l’installation et le milieu de fonctionnement.',
    },
    considerations: {
      en: [
        'Provide fan diameter, mounting arrangement and airflow direction.',
        'Specify the operating airflow and pressure, rather than diameter alone.',
        'Describe ambient conditions, noise requirements and electrical supply.',
      ],
      fr: [
        'Indiquez le diamètre, le montage et le sens de l’écoulement.',
        'Précisez le débit et la pression de fonctionnement, pas seulement le diamètre.',
        'Décrivez les conditions ambiantes, les exigences acoustiques et l’alimentation électrique.',
      ],
    },
  },
  {
    id: 'centrifugal',
    division: 'industrial',
    slug: { en: 'centrifugal-fans', fr: 'ventilateurs-centrifuges' },
    name: { en: 'Centrifugal fans', fr: 'Ventilateurs centrifuges' },
    summary: {
      en: 'Define a centrifugal fan requirement using the duty point, duct connections and characteristics of the air stream.',
      fr: 'Définissez le besoin en ventilation centrifuge selon le point de fonctionnement, les raccordements et les caractéristiques de l’air transporté.',
    },
    considerations: {
      en: [
        'Include airflow and static pressure at the required duty point.',
        'Document inlet/outlet orientation, drive arrangement and footprint.',
        'Flag temperature, dust or process contaminants for qualified review.',
      ],
      fr: [
        'Indiquez le débit et la pression statique au point de fonctionnement requis.',
        'Documentez l’orientation des raccords, l’entraînement et l’encombrement.',
        'Signalez la température, les poussières ou les contaminants pour une analyse qualifiée.',
      ],
    },
  },
  {
    id: 'exhaust',
    division: 'industrial',
    slug: { en: 'exhaust-fans', fr: 'ventilateurs-extraction' },
    name: { en: 'Exhaust fans', fr: 'Ventilateurs d’extraction' },
    summary: {
      en: 'Describe what must be exhausted, where the air will discharge and the design requirements already established for your facility.',
      fr: 'Décrivez l’air à extraire, le point de rejet et les exigences de conception déjà établies pour votre installation.',
    },
    considerations: {
      en: [
        'Identify the application and any process-specific contaminants.',
        'Provide design airflow, duct information and discharge location.',
        'Have qualified professionals establish code and make-up air requirements.',
      ],
      fr: [
        'Précisez l’application et les contaminants propres au procédé.',
        'Fournissez le débit de conception, les données des conduits et le point de rejet.',
        'Faites établir les exigences réglementaires et d’air de compensation par des professionnels qualifiés.',
      ],
    },
  },
  {
    id: 'supply',
    division: 'industrial',
    slug: { en: 'supply-fans', fr: 'ventilateurs-soufflage' },
    name: { en: 'Supply fans', fr: 'Ventilateurs de soufflage' },
    summary: {
      en: 'Organize a supply-air inquiry around the facility design, filtration needs and planned system connections.',
      fr: 'Organisez votre demande de soufflage selon la conception du bâtiment, la filtration et les raccordements prévus.',
    },
    considerations: {
      en: [
        'Provide design supply airflow and external static pressure.',
        'Identify filtration, controls and any air treatment requirements.',
        'Include space constraints and existing duct or intake connections.',
      ],
      fr: [
        'Précisez le débit de soufflage et la pression statique externe de conception.',
        'Indiquez la filtration, les commandes et le traitement de l’air requis.',
        'Ajoutez les contraintes d’espace et les raccords existants.',
      ],
    },
  },
  {
    id: 'blowers',
    division: 'industrial',
    slug: { en: 'blowers', fr: 'soufflantes' },
    name: { en: 'Blowers', fr: 'Soufflantes' },
    summary: {
      en: 'Start with your process requirements and existing equipment information when requesting a blower or replacement.',
      fr: 'Partez des exigences du procédé et des données de l’équipement existant pour une demande de soufflante ou de remplacement.',
    },
    considerations: {
      en: [
        'State the process, flow, pressure and temperature with units.',
        'Document duty cycle, drive requirements and installation space.',
        'Provide the manufacturer/model when replacing existing equipment.',
      ],
      fr: [
        'Précisez le procédé, le débit, la pression et la température avec leurs unités.',
        'Documentez le cycle de service, l’entraînement et l’espace disponible.',
        'Indiquez le fabricant et le modèle de l’appareil à remplacer.',
      ],
    },
  },
  {
    id: 'parts',
    division: 'industrial',
    slug: { en: 'parts-and-replacements', fr: 'pieces-et-remplacement' },
    name: { en: 'Parts & replacements', fr: 'Pièces et remplacement' },
    summary: {
      en: 'Identify the original equipment and part reference before requesting a replacement component.',
      fr: 'Identifiez l’équipement d’origine et la référence de la pièce avant de demander un composant de remplacement.',
    },
    considerations: {
      en: [
        'Record manufacturer, model, serial number and part number where available.',
        'Describe the component and its dimensions without assuming interchangeability.',
        'Confirm documentation and compatibility before an order is placed.',
      ],
      fr: [
        'Notez le fabricant, le modèle, le numéro de série et la référence de pièce disponibles.',
        'Décrivez le composant et ses dimensions sans présumer de son interchangeabilité.',
        'Confirmez la documentation et la compatibilité avant toute commande.',
      ],
    },
  },
  {
    id: 'invasive',
    division: 'medical',
    slug: { en: 'invasive-ventilators', fr: 'ventilateurs-invasifs' },
    name: { en: 'Invasive ventilators', fr: 'Ventilateurs invasifs' },
    summary: {
      en: 'An institutional inquiry category for a device specification established by your qualified clinical and procurement teams.',
      fr: 'Une catégorie de demande institutionnelle fondée sur les spécifications établies par vos équipes cliniques et d’approvisionnement qualifiées.',
    },
    considerations: {
      en: [
        'Provide the requested manufacturer/model and institutional specification.',
        'List the regulatory and supplier documentation your purchasing team requires.',
        'Leave clinical selection and suitability to qualified healthcare professionals.',
      ],
      fr: [
        'Fournissez le fabricant, le modèle souhaité et les spécifications de l’établissement.',
        'Énumérez les documents réglementaires et les attestations du fournisseur exigés.',
        'Confiez la sélection clinique et l’évaluation de l’adéquation aux professionnels de la santé qualifiés.',
      ],
    },
  },
  {
    id: 'noninvasive',
    division: 'medical',
    slug: { en: 'non-invasive-ventilators', fr: 'ventilateurs-non-invasifs' },
    name: { en: 'Non-invasive ventilators', fr: 'Ventilateurs non invasifs' },
    summary: {
      en: 'Prepare a procurement inquiry for non-invasive equipment using an institution-approved specification. No clinical suitability is implied.',
      fr: 'Préparez une demande pour un appareil non invasif à partir de spécifications approuvées par votre établissement. Aucune adéquation clinique n’est présumée.',
    },
    considerations: {
      en: [
        'Identify the exact requested device and procurement context.',
        'List required documentation and separately specified accessories.',
        'Confirm regulatory status and supplier authority before any offer.',
      ],
      fr: [
        'Identifiez l’appareil exact demandé et le contexte d’achat.',
        'Énumérez les documents requis et les accessoires spécifiés séparément.',
        'Confirmez le statut réglementaire et l’autorisation du fournisseur avant toute offre.',
      ],
    },
  },
  {
    id: 'accessories',
    division: 'medical',
    slug: { en: 'respiratory-accessories', fr: 'accessoires-respiratoires' },
    name: { en: 'Respiratory accessories', fr: 'Accessoires respiratoires' },
    summary: {
      en: 'Use exact part references and device documentation to frame an accessory sourcing inquiry.',
      fr: 'Utilisez les références exactes des pièces et la documentation de l’appareil pour préparer une demande d’accessoires.',
    },
    considerations: {
      en: [
        'Include the device model and manufacturer part reference.',
        'Specify quantities, packaging and required documentation.',
        'Compatibility must be established from verified manufacturer evidence.',
      ],
      fr: [
        'Indiquez le modèle de l’appareil et la référence du fabricant.',
        'Précisez les quantités, le conditionnement et les documents requis.',
        'La compatibilité doit être établie à partir de preuves vérifiées du fabricant.',
      ],
    },
  },
  {
    id: 'procurement',
    division: 'medical',
    slug: { en: 'institutional-procurement', fr: 'approvisionnement-institutionnel' },
    name: { en: 'Institutional procurement', fr: 'Approvisionnement institutionnel' },
    summary: {
      en: 'Bring tender requirements, delivery location and documentation needs together in one sourcing brief.',
      fr: 'Regroupez les exigences de l’appel d’offres, le lieu de livraison et les documents requis dans un seul dossier.',
    },
    considerations: {
      en: [
        'Reference the tender and purchasing organization, without patient data.',
        'Provide requested quantities, deadlines and delivery province.',
        'Identify authorization, regulatory and service documentation for review.',
      ],
      fr: [
        'Indiquez l’appel d’offres et l’organisme acheteur, sans données de patients.',
        'Précisez les quantités, les échéances et la province de livraison.',
        'Identifiez les documents d’autorisation, de conformité et de service à examiner.',
      ],
    },
  },
];
export const categoryPath = (locale: Locale, category: Category) =>
  `${pathFor(locale, category.division)}${category.slug[locale]}/`;
