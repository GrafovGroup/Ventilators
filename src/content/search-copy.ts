import type { Localized } from './catalog';
import type { PageKey } from './site';

interface SearchCopy {
  title: string;
  description: string;
}
const copy = (
  enTitle: string,
  enDescription: string,
  frTitle: string,
  frDescription: string,
): Localized<SearchCopy> => ({
  en: { title: enTitle, description: enDescription },
  fr: { title: frTitle, description: frDescription },
});

// Search labels describe the page; visual AirGrid headlines remain independent.
export const pageSearchCopy: Record<PageKey, Localized<SearchCopy>> = {
  home: copy(
    'Industrial Ventilation & Medical Procurement',
    'Explore industrial ventilation and institutional medical equipment categories. Prepare an inquiry in English or French; availability is confirmed separately.',
    'Ventilation industrielle et achats médicaux',
    'Explorez les catégories de ventilation industrielle et d’équipement médical institutionnel. Préparez une demande en français ou en anglais; disponibilité à confirmer.',
  ),
  industrial: copy(
    'Industrial Ventilation Inquiries in Canada',
    'Explore roof, axial, centrifugal, exhaust and supply fans, blowers and replacement parts. Find the specifications to include in an industrial inquiry.',
    'Demandes en ventilation industrielle au Canada',
    'Explorez les ventilateurs de toit, axiaux, centrifuges, d’extraction et de soufflage, les soufflantes et les pièces. Préparez vos spécifications.',
  ),
  medical: copy(
    'Medical Ventilator Procurement in Canada',
    'Prepare institutional inquiries for medical ventilators, respiratory accessories and procurement documentation. Exact devices and supplier authority require verification.',
    'Ventilateurs médicaux : demandes d’achat',
    'Préparez une demande institutionnelle pour des ventilateurs médicaux, des accessoires respiratoires ou des documents d’achat. Appareils et fournisseurs à vérifier.',
  ),
  products: copy(
    'Industrial & Medical Equipment Categories',
    'Find an equipment category by name or application, then prepare an inquiry. Browse industrial ventilation and institutional medical procurement categories.',
    'Catégories d’équipement industriel et médical',
    'Trouvez une catégorie par nom ou application, puis préparez une demande. Explorez la ventilation industrielle et l’approvisionnement médical institutionnel.',
  ),
  services: copy(
    'Ventilation Service & Medical Support Inquiries',
    'Prepare a request for fan repair, maintenance, replacement, installation coordination or medical technical support. Scope and qualifications require confirmation.',
    'Services de ventilation et soutien médical',
    'Préparez une demande de réparation, d’entretien, de remplacement, de coordination d’installation ou de soutien médical. Portée et qualifications à confirmer.',
  ),
  industries: copy(
    'Ventilation & Procurement by Facility Type',
    'Find inquiry guidance for warehouses, manufacturing, commercial facilities, hospitals, clinics and institutional buyers. Start with your facility requirements.',
    'Ventilation et achats par type d’établissement',
    'Consultez les conseils pour les entrepôts, usines, bâtiments commerciaux, hôpitaux, cliniques et acheteurs institutionnels. Précisez les besoins de votre établissement.',
  ),
  resources: copy(
    'Ventilation & Medical Procurement Guides',
    'Use specification, fan replacement, accessory identification and medical procurement guides to prepare an inquiry. Download bilingual preparation checklists.',
    'Guides de ventilation et d’approvisionnement médical',
    'Préparez votre demande avec les guides de spécifications, de remplacement, d’identification des accessoires et d’achat médical. Listes de vérification bilingues.',
  ),
  about: copy(
    'About Our Grafov Group Project',
    'Learn how Ventilators.ca organizes industrial ventilation and institutional medical procurement inquiries across Canada, in English and French.',
    'À propos du projet de Grafov Group',
    'Découvrez comment Ventilators.ca structure les demandes en ventilation industrielle et en approvisionnement médical institutionnel au Canada, dans les deux langues.',
  ),
  contact: copy(
    'Contact for Equipment & Procurement Inquiries',
    'Contact Ventilators.ca at info@ventilators.ca or (833) 696-9996. Tell us your division, project location and equipment or procurement requirements.',
    'Contact : ventilation et achats médicaux',
    'Joignez Ventilators.ca au info@ventilators.ca ou au (833) 696-9996. Précisez la division, le lieu du projet et vos besoins en équipement ou en approvisionnement.',
  ),
  quote: copy(
    'Request an Industrial or Medical Equipment Quote',
    'Describe your project and review your inquiry before sending. Technical details, quantity and timing can be added when known. No online purchase or confirmed availability.',
    'Soumission d’équipement industriel ou médical',
    'Décrivez votre projet et vérifiez votre demande avant l’envoi. Ajoutez les détails techniques, la quantité et l’échéancier connus. Disponibilité à confirmer.',
  ),
  faq: copy(
    'Equipment Inquiry & Procurement Questions',
    'Find answers about requesting a quote, replacement specifications, medical procurement documentation, sending an inquiry and project coverage.',
    'Questions sur l’équipement et les demandes',
    'Trouvez des réponses sur les soumissions, les spécifications de remplacement, les documents d’achat médical, l’envoi des demandes et la couverture des projets.',
  ),
  privacy: copy(
    'Privacy Notice & Analytics Choices',
    'Read how Ventilators.ca handles inquiry information, Formspree delivery and optional Google Analytics, including consent choices and privacy contact details.',
    'Avis de confidentialité et choix analytiques',
    'Consultez les renseignements sur le traitement des demandes, l’envoi par Formspree et Google Analytics facultatif, ainsi que vos choix et notre contact.',
  ),
  terms: copy(
    'Website Terms of Use & Inquiry Conditions',
    'Read the terms for using Ventilators.ca, its informational catalogue and inquiry process. Availability, compatibility and service scope require confirmation.',
    'Conditions d’utilisation du site et des demandes',
    'Consultez les conditions du site Ventilators.ca, de son catalogue informatif et des demandes. Disponibilité, compatibilité et portée des services à confirmer.',
  ),
  accessibility: copy(
    'Website Accessibility & Assistance',
    'Read our accessibility approach and contact Ventilators.ca for help using the website or preparing an equipment inquiry.',
    'Accessibilité du site et assistance',
    'Consultez notre démarche d’accessibilité et joignez Ventilators.ca pour obtenir de l’aide avec le site ou une demande d’équipement.',
  ),
};

export const prioritySearchCopy: Record<string, Localized<SearchCopy>> = {
  roof: copy(
    'Roof Ventilator Replacement Inquiries',
    'Prepare a roof ventilator inquiry with curb dimensions, discharge arrangement, airflow, pressure and access details. Compare replacement scope before requesting a quote.',
    'Ventilateurs de toit : remplacement et demandes',
    'Préparez une demande avec les dimensions de la costière, le rejet, le débit, la pression et l’accès au toit. Délimitez le remplacement avant la soumission.',
  ),
  axial: copy(
    'Axial Fan Specifications & Inquiries',
    'Understand axial fan terminology and prepare the mounting, duty point, motor and assembly information needed for an equipment inquiry.',
    'Ventilateurs axiaux : spécifications et demandes',
    'Comprenez les termes liés aux ventilateurs axiaux et préparez les données de montage, de fonctionnement, de moteur et d’ensemble pour votre demande.',
  ),
  centrifugal: copy(
    'Centrifugal Fan Replacement Inquiries',
    'Prepare centrifugal fan inquiries with inlet and outlet drawings, rotation, airflow, pressure and drive details. Identify what must match before replacement.',
    'Ventilateurs centrifuges : remplacement',
    'Préparez les dessins d’entrée et de sortie, le sens de rotation, le débit, la pression et l’entraînement pour une demande de ventilateur centrifuge.',
  ),
  exhaust: copy(
    'Exhaust Fan Requirements & Inquiries',
    'Distinguish general exhaust from process extraction. Organize design requirements, air-stream details, discharge and project responsibilities for an inquiry.',
    'Ventilateurs d’extraction : exigences et demandes',
    'Distinguez l’extraction générale de celle d’un procédé. Rassemblez les exigences de conception, les caractéristiques de l’air, le rejet et les responsabilités.',
  ),
  accessories: copy(
    'Respiratory Accessory Procurement Inquiries',
    'Prepare an institutional accessory inquiry using exact part and device references, manufacturer compatibility evidence, packaging and quantity requirements.',
    'Accessoires respiratoires : demandes d’achat',
    'Préparez une demande institutionnelle avec les références de pièce et d’appareil, les preuves de compatibilité du fabricant, le conditionnement et les quantités.',
  ),
  procurement: copy(
    'Institutional Medical Procurement Inquiries',
    'Organize a medical procurement brief with device specifications, tender dates, supplier evidence and acceptance documents. No device availability is implied.',
    'Approvisionnement médical institutionnel',
    'Structurez un dossier d’achat médical avec les spécifications, les dates d’appel d’offres, les preuves du fournisseur et les documents de réception.',
  ),
};
