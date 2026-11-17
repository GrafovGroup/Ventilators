import type { Localized } from './catalog';
const l = (en: string, fr: string): Localized<string> => ({ en, fr });
interface CategoryGuide {
  title: Localized<string>;
  body: Localized<string>;
  checkTitle: Localized<string>;
  check: Localized<string>;
  resource: string;
}
export const categoryGuides: Record<string, CategoryGuide> = {
  roof: {
    title: l('Start at the roof interface.', 'Commencez par l’interface avec le toit.'),
    body: l(
      'For a rooftop replacement, identify the existing curb, discharge arrangement and roof access alongside the design duty. State which components are staying and whether the project includes a new curb, adapter or controls.',
      'Pour un remplacement sur le toit, identifiez la costière, le rejet et l’accès en plus du point de fonctionnement prévu. Précisez les composants conservés et les besoins en costière, adaptateur ou commandes.',
    ),
    checkTitle: l('Confirm the mounting details', 'Confirmez les détails de montage'),
    check: l(
      'Include dimensioned drawings when available. A similar-looking housing or nominal size does not establish a fit with the existing opening or support.',
      'Joignez les dessins cotés disponibles. Une apparence ou une dimension nominale semblable ne démontre pas la compatibilité avec l’ouverture ou les supports existants.',
    ),
    resource: 'replacement-guide',
  },
  axial: {
    title: l('Describe the complete fan assembly.', 'Décrivez l’ensemble du ventilateur.'),
    body: l(
      'Identify whether your request concerns a complete assembly, a motor or an impeller. Record the mounting arrangement, existing model and specified operating point so the review starts with the same equipment boundary.',
      'Précisez si votre demande vise un ensemble complet, un moteur ou une roue. Notez le montage, le modèle existant et le point de fonctionnement pour délimiter clairement l’équipement à examiner.',
    ),
    checkTitle: l('Keep performance evidence attached', 'Conservez les preuves de rendement'),
    check: l(
      'Request the relevant manufacturer curve and operating conditions for any proposed selection. Diameter alone is not a performance specification.',
      'Demandez la courbe du fabricant et les conditions de fonctionnement correspondant à toute proposition. Le diamètre seul ne constitue pas une spécification de rendement.',
    ),
    resource: 'industrial-specifications',
  },
  centrifugal: {
    title: l('Document the housing and connections.', 'Documentez le caisson et les raccords.'),
    body: l(
      'A centrifugal fan inquiry benefits from a drawing showing the inlet, outlet, drive and mounting arrangement. Pair those interfaces with the design airflow and pressure supplied by the project team.',
      'Un dessin montrant l’entrée, la sortie, l’entraînement et le montage facilite une demande de ventilateur centrifuge. Ajoutez le débit et la pression de conception fournis par l’équipe du projet.',
    ),
    checkTitle: l('Identify rotation and orientation', 'Identifiez le sens et l’orientation'),
    check: l(
      'Use the manufacturer’s drawing convention when describing rotation and discharge position. Include the drawing revision rather than relying on a description from memory.',
      'Utilisez la convention du fabricant pour décrire le sens de rotation et la position du refoulement. Indiquez la révision du dessin plutôt que de vous fier à une description de mémoire.',
    ),
    resource: 'industrial-specifications',
  },
  exhaust: {
    title: l('Define the exhaust application.', 'Définissez l’application d’extraction.'),
    body: l(
      'Separate general building exhaust from a process-specific extraction request. Provide the established design specification, discharge location and any air-stream characteristics identified by your qualified project team.',
      'Distinguez l’extraction générale du bâtiment d’une extraction propre à un procédé. Fournissez les spécifications établies, le lieu de rejet et les caractéristiques de l’air identifiées par votre équipe qualifiée.',
    ),
    checkTitle: l('Make application limits explicit', 'Précisez les limites d’application'),
    check: l(
      'Describe any materials, temperatures or environmental constraints in the design brief. This category does not establish suitability for hazardous or specialized applications.',
      'Décrivez les matières, températures et contraintes environnementales du dossier de conception. Cette catégorie ne démontre pas l’adéquation à une application dangereuse ou spécialisée.',
    ),
    resource: 'industrial-specifications',
  },
  supply: {
    title: l('Identify the supply-air interfaces.', 'Identifiez les interfaces d’air neuf.'),
    body: l(
      'Tell us whether the inquiry is for a fan, an air-handling section or equipment within a wider building system. List the required controls, filtration interfaces and duct connections as defined by the designer.',
      'Précisez si la demande vise un ventilateur, une section de traitement d’air ou un équipement intégré à un système. Énumérez les commandes, interfaces de filtration et raccords définis par le concepteur.',
    ),
    checkTitle: l('Separate equipment and site work', 'Distinguez l’équipement des travaux'),
    check: l(
      'Record who is responsible for electrical connections, controls integration, installation and commissioning. These activities require their own confirmed scope.',
      'Indiquez les responsables des raccordements électriques, des commandes, de l’installation et de la mise en service. Ces activités exigent une portée confirmée distincte.',
    ),
    resource: 'replacement-guide',
  },
  blowers: {
    title: l(
      'Make the operating requirement measurable.',
      'Rendez le besoin de fonctionnement mesurable.',
    ),
    body: l(
      'Use the process specification to state the requested flow and pressure with their units and reference conditions. Identify the existing blower or the project drawing when the request is part of a replacement or system package.',
      'Utilisez les spécifications du procédé pour indiquer le débit et la pression, leurs unités et les conditions de référence. Identifiez le souffleur existant ou le dessin du projet pour un remplacement ou un ensemble.',
    ),
    checkTitle: l('Include the package boundary', 'Délimitez l’ensemble demandé'),
    check: l(
      'List the motor, drive, controls, connections and documentation expected in the proposed supply. Avoid treating a bare unit and a complete package as equivalent offers.',
      'Énumérez le moteur, l’entraînement, les commandes, les raccords et les documents attendus. Distinguez une unité seule d’un ensemble complet lors de la comparaison des offres.',
    ),
    resource: 'industrial-specifications',
  },
  parts: {
    title: l('A part number is the starting point.', 'Le numéro de pièce est le point de départ.'),
    body: l(
      'Provide the parent equipment model and serial reference, the exact part number and any manufacturer drawing or revision. State whether you need the original part or may consider a documented alternative.',
      'Fournissez le modèle et la référence de série de l’équipement, le numéro exact de pièce ainsi que le dessin ou la révision du fabricant. Précisez si une solution de rechange documentée peut être étudiée.',
    ),
    checkTitle: l(
      'Document the match before ordering',
      'Documentez la correspondance avant l’achat',
    ),
    check: l(
      'Dimensions and appearance can help identify a part, but are not evidence of compatibility. Retain the written manufacturer or supplier documentation used to establish the match.',
      'Les dimensions et l’apparence peuvent aider à identifier une pièce, sans prouver sa compatibilité. Conservez les documents écrits qui établissent la correspondance.',
    ),
    resource: 'replacement-guide',
  },
  invasive: {
    title: l(
      'Use the institution’s approved specification.',
      'Utilisez les spécifications approuvées.',
    ),
    body: l(
      'This category organizes professional procurement inquiries for an exact requested device and configuration. Include the institution’s purchasing reference, manufacturer/model and approved accessory list. It does not guide clinical selection or operation.',
      'Cette catégorie structure les demandes professionnelles pour un appareil et une configuration précis. Indiquez la référence d’achat, le fabricant, le modèle et les accessoires approuvés. Elle ne guide ni la sélection ni l’utilisation cliniques.',
    ),
    checkTitle: l(
      'Review each device and supply chain',
      'Examinez l’appareil et sa chaîne de fourniture',
    ),
    check: l(
      'Regulatory evidence, supplier authorization, configuration and any training or service arrangements must be assessed for the exact offer before a procurement commitment.',
      'Les preuves réglementaires, l’autorisation du fournisseur, la configuration et les modalités de formation ou de service doivent être évaluées pour l’offre exacte avant tout engagement.',
    ),
    resource: 'medical-procurement-guide',
  },
  noninvasive: {
    title: l('Keep the requested configuration explicit.', 'Précisez la configuration recherchée.'),
    body: l(
      'Provide the exact device model requested by the institution, the approved configuration and separately identified accessories. A broad ventilation category does not establish interchangeability between devices or their accessories.',
      'Fournissez le modèle demandé par l’établissement, la configuration approuvée et les accessoires identifiés séparément. Une catégorie générale ne démontre pas l’interchangeabilité des appareils ou de leurs accessoires.',
    ),
    checkTitle: l(
      'Keep clinical decisions with the care team',
      'Confiez les décisions cliniques à l’équipe de soins',
    ),
    check: l(
      'This inquiry route supports purchasing documentation. Do not include patient details or ask for device settings, treatment selection or emergency support.',
      'Cette voie de demande concerne les documents d’achat. N’incluez aucun renseignement sur les patients et ne demandez pas de réglages, de choix de traitement ou de soutien d’urgence.',
    ),
    resource: 'medical-procurement-guide',
  },
  accessories: {
    title: l('Identify both sides of the match.', 'Identifiez les deux éléments à relier.'),
    body: l(
      'An accessory inquiry needs the exact accessory reference and the parent device identification. Include the relevant manufacturer compatibility document and revision, along with quantity and institutional acceptance requirements.',
      'Une demande d’accessoire exige sa référence exacte et l’identification de l’appareil associé. Ajoutez le document de compatibilité du fabricant, sa révision, la quantité et les exigences de réception.',
    ),
    checkTitle: l(
      'Avoid appearance-based substitutions',
      'Évitez les substitutions fondées sur l’apparence',
    ),
    check: l(
      'A connector shape, photograph or similar description is not sufficient to establish compatibility. Request device-specific evidence before considering a substitution.',
      'La forme d’un raccord, une photo ou une description semblable ne suffit pas à établir la compatibilité. Demandez des preuves propres à l’appareil avant d’étudier une substitution.',
    ),
    resource: 'accessory-guide',
  },
  procurement: {
    title: l('Build one controlled procurement record.', 'Constituez un dossier d’achat contrôlé.'),
    body: l(
      'Bring the tender reference, requested devices, quantities and required documents into a single brief. Identify the purchasing contact and the people responsible for clinical, biomedical and regulatory review.',
      'Réunissez la référence d’appel d’offres, les appareils, les quantités et les documents exigés dans un dossier unique. Identifiez le contact aux achats et les responsables des examens clinique, biomédical et réglementaire.',
    ),
    checkTitle: l(
      'Keep requested and confirmed dates separate',
      'Distinguez les dates souhaitées et confirmées',
    ),
    check: l(
      'Record the tender closing date and desired delivery window. Stock, lead time, pricing and authority to supply remain unconfirmed until supported by a verified offer.',
      'Notez la clôture de l’appel d’offres et la période de livraison souhaitée. Les stocks, délais, prix et autorisations restent à confirmer par une offre vérifiée.',
    ),
    resource: 'medical-procurement-guide',
  },
};
