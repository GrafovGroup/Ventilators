import type { Localized } from './catalog';

const l = (en: string, fr: string): Localized<string> => ({ en, fr });
interface BuyerGuide {
  question: Localized<string>;
  answer: Localized<string>;
  caption: Localized<string>;
  rows: { label: Localized<string>; detail: Localized<string> }[];
  questions: { question: Localized<string>; answer: Localized<string> }[];
  example: Localized<string>;
  source: 'fans' | 'maintenance' | 'licences';
}
const row = (en: string, fr: string, enDetail: string, frDetail: string) => ({
  label: l(en, fr),
  detail: l(enDetail, frDetail),
});
const qa = (en: string, fr: string, enAnswer: string, frAnswer: string) => ({
  question: l(en, fr),
  answer: l(enAnswer, frAnswer),
});

// Original inquiry-preparation guidance. Sources support background concepts,
// not a product selection, a verified offer or a claim of technical approval.
export const buyerGuides: Partial<Record<string, BuyerGuide>> = {
  supply: {
    question: l(
      'What should a supply-air equipment inquiry include?',
      'Que doit comprendre une demande d’équipement de soufflage?',
    ),
    answer: l(
      'State whether you need a fan alone or equipment within a larger air-supply system. Use the project team’s specified airflow, pressure and connection details. List filtration, heating and controls separately so the requested equipment boundary is clear.',
      'Précisez si vous cherchez un ventilateur seul ou un équipement intégré à un système de soufflage. Utilisez le débit, la pression et les raccords définis par l’équipe du projet. Énumérez séparément la filtration, le chauffage et les commandes pour bien délimiter la demande.',
    ),
    caption: l(
      'Separate the equipment from its system interfaces',
      'Distinguez l’équipement de ses interfaces avec le système',
    ),
    rows: [
      row(
        'Fan requirement',
        'Besoin en ventilation',
        'Provide the design duty and units, existing model if applicable, and the mounting or connection drawing.',
        'Fournissez le point de fonctionnement et les unités, le modèle existant s’il y a lieu et le dessin de montage ou de raccordement.',
      ),
      row(
        'Associated sections',
        'Sections associées',
        'Identify filters, heating or cooling sections and controls that belong in the request. Mark components that will stay in place.',
        'Identifiez les filtres, les sections de chauffage ou de refroidissement et les commandes demandés. Indiquez les composants conservés.',
      ),
      row(
        'Work responsibilities',
        'Responsabilités des travaux',
        'Name the team responsible for system design, electrical work, controls integration and commissioning. Equipment supply does not establish these service scopes.',
        'Identifiez les responsables de la conception, des travaux électriques, de l’intégration des commandes et de la mise en service. La fourniture d’équipement ne confirme pas ces services.',
      ),
    ],
    questions: [
      qa(
        'Does a supply-fan inquiry include a complete make-up air unit?',
        'Une demande de ventilateur comprend-elle une unité complète d’air de compensation?',
        'Only if that scope is explicitly requested and subsequently confirmed. List the sections and documentation your project requires instead of assuming they are included with the fan.',
        'Seulement si cette portée est demandée explicitement et confirmée par la suite. Énumérez les sections et documents requis plutôt que de présumer qu’ils accompagnent le ventilateur.',
      ),
      qa(
        'Can I start while the design is still being finalized?',
        'Puis-je commencer pendant la finalisation de la conception?',
        'Yes. Describe the project stage and identify unconfirmed requirements. Leave unknown technical fields blank; the qualified design team must establish the final duty before equipment selection.',
        'Oui. Décrivez l’étape du projet et les exigences non confirmées. Laissez les champs techniques inconnus vides; l’équipe de conception qualifiée doit établir le fonctionnement final avant la sélection.',
      ),
    ],
    example: l(
      'Supply-fan inquiry for an existing facility. Duct connections are documented; final duty is pending design review. Filters and controls will remain. Please identify the equipment information needed for a quotation review.',
      'Demande de ventilateur de soufflage pour un établissement existant. Raccords documentés; fonctionnement final à confirmer par la conception. Filtres et commandes conservés. Veuillez préciser les renseignements nécessaires à l’examen d’une soumission.',
    ),
    source: 'fans',
  },
  blowers: {
    question: l(
      'How do I describe an industrial blower requirement?',
      'Comment décrire un besoin en soufflante industrielle?',
    ),
    answer: l(
      'Identify the blower or project specification, then record flow and pressure with their units and reference conditions. Define which motor, drive, base and controls are included. A generic blower label is not enough to compare two equipment packages.',
      'Identifiez la soufflante ou les spécifications du projet, puis notez le débit, la pression, les unités et les conditions de référence. Définissez le moteur, l’entraînement, la base et les commandes inclus. Le terme soufflante seul ne suffit pas à comparer deux ensembles.',
    ),
    caption: l('Make competing scopes comparable', 'Rendez les portées comparables'),
    rows: [
      row(
        'Specified duty',
        'Fonctionnement spécifié',
        'Reference the design document and revision. Include the process description and operating conditions provided by the qualified project team.',
        'Indiquez le document de conception et sa révision. Ajoutez la description du procédé et les conditions fournies par l’équipe qualifiée.',
      ),
      row(
        'Package contents',
        'Contenu de l’ensemble',
        'Separate the bare blower from the motor, drive, guards, base, controls and any requested documentation.',
        'Distinguez la soufflante seule du moteur, de l’entraînement, des protecteurs, de la base, des commandes et des documents demandés.',
      ),
      row(
        'Existing interfaces',
        'Interfaces existantes',
        'Identify inlet and outlet connections, mounting dimensions and available space from current drawings.',
        'Identifiez les raccords d’entrée et de sortie, les dimensions de montage et l’espace disponible selon les dessins actuels.',
      ),
    ],
    questions: [
      qa(
        'Can horsepower alone identify a replacement?',
        'La puissance seule permet-elle d’identifier un remplacement?',
        'No. Keep the required flow, pressure, operating conditions and physical interfaces in the same brief. A matching motor rating does not verify the complete replacement.',
        'Non. Regroupez le débit, la pression, les conditions et les interfaces physiques dans le dossier. Une puissance de moteur identique ne vérifie pas l’ensemble du remplacement.',
      ),
      qa(
        'What if two quotations include different components?',
        'Que faire si deux soumissions comprennent des composants différents?',
        'Create a component list and ask each proposed scope to identify inclusions and exclusions. Compare documented equipment packages before evaluating commercial differences.',
        'Dressez une liste de composants et demandez les inclusions et exclusions de chaque portée. Comparez les ensembles documentés avant leurs différences commerciales.',
      ),
    ],
    example: l(
      'Blower package inquiry against our project specification, revision B. Flow and pressure are documented. Motor and base are requested; controls scope is unresolved. Please clarify package inclusions and required interface drawings.',
      'Demande d’ensemble de soufflante selon les spécifications du projet, révision B. Débit et pression documentés. Moteur et base demandés; commandes à préciser. Veuillez clarifier les inclusions et les dessins d’interface nécessaires.',
    ),
    source: 'fans',
  },
  parts: {
    question: l(
      'What identifies an industrial fan replacement part?',
      'Comment identifier une pièce de rechange de ventilateur industriel?',
    ),
    answer: l(
      'Connect the part reference to the exact parent fan assembly and its documentation. Record the manufacturer, model and available serial or drawing revision. Explain whether you need the original part or a proposed alternative for technical review.',
      'Reliez la référence de pièce à l’ensemble exact du ventilateur et à ses documents. Notez le fabricant, le modèle et le numéro de série ou la révision du dessin disponibles. Précisez si vous cherchez la pièce d’origine ou une solution à soumettre à un examen technique.',
    ),
    caption: l('Build a traceable component request', 'Préparez une demande de composant traçable'),
    rows: [
      row(
        'Parent equipment',
        'Équipement d’origine',
        'Identify the complete fan assembly and the nameplate or document used to identify it.',
        'Identifiez l’ensemble du ventilateur et la plaque signalétique ou le document servant à l’identifier.',
      ),
      row(
        'Part reference',
        'Référence de pièce',
        'List the part number, description, drawing position and quantity if known. Describe available photographs; uploads are not enabled.',
        'Indiquez le numéro, la description, le repère du dessin et la quantité connue. Décrivez les photos disponibles; le téléversement est désactivé.',
      ),
      row(
        'Replacement review',
        'Examen du remplacement',
        'State whether dimensions, material, rotation or electrical details require confirmation. Identify who will approve any proposed substitution.',
        'Précisez les dimensions, le matériau, la rotation ou les données électriques à confirmer. Identifiez le responsable de toute substitution proposée.',
      ),
    ],
    questions: [
      qa(
        'Can I ask about a part without its number?',
        'Puis-je faire une demande sans numéro de pièce?',
        'Yes. Provide the parent equipment reference and a plain description of the component. Mark the part number as unknown; identification and compatibility still need confirmation.',
        'Oui. Fournissez la référence de l’équipement et une description du composant. Indiquez que le numéro est inconnu; l’identification et la compatibilité restent à confirmer.',
      ),
      qa(
        'Does supplying a part include repair or installation?',
        'La fourniture d’une pièce comprend-elle la réparation ou l’installation?',
        'These are separate scopes. If work is needed, describe the requested service and site location so qualifications, access and availability can be reviewed separately.',
        'Il s’agit de portées distinctes. Si des travaux sont nécessaires, décrivez le service et le lieu pour permettre un examen séparé des qualifications, de l’accès et de la disponibilité.',
      ),
    ],
    example: l(
      'Replacement component inquiry for an existing industrial fan. Parent model and drawing are available; the part number needs confirmation. Equipment supply only at this stage. Please identify the details required to review compatibility.',
      'Demande de composant de rechange pour un ventilateur industriel existant. Modèle et dessin disponibles; numéro de pièce à confirmer. Fourniture seulement à cette étape. Veuillez préciser les données nécessaires à l’examen de compatibilité.',
    ),
    source: 'maintenance',
  },
  invasive: {
    question: l(
      'What should an institutional invasive-ventilator inquiry specify?',
      'Que préciser dans une demande institutionnelle de ventilateur invasif?',
    ),
    answer: l(
      'Start with the device configuration already specified by the institution’s qualified team. Identify the exact manufacturer/model or approved purchasing specification, required documentation and receiving process. This category organizes procurement; it does not select treatment or confirm a device offering.',
      'Commencez par la configuration définie par l’équipe qualifiée de l’établissement. Identifiez le fabricant et le modèle exacts ou les spécifications d’achat approuvées, les documents et le processus de réception. Cette catégorie organise l’achat; elle ne choisit aucun traitement et ne confirme aucune offre.',
    ),
    caption: l(
      'Keep the purchasing record specific to the device',
      'Gardez un dossier d’achat propre à l’appareil',
    ),
    rows: [
      row(
        'Approved requirement',
        'Besoin approuvé',
        'Identify the purchasing specification and revision, configuration and separately requested accessories. Leave clinical decisions with the institution.',
        'Identifiez les spécifications et leur révision, la configuration et les accessoires distincts. Les décisions cliniques relèvent de l’établissement.',
      ),
      row(
        'Verification records',
        'Documents de vérification',
        'List the exact device licence evidence, supplier authority and traceability documents required for review. A category listing establishes none of them.',
        'Énumérez les preuves d’homologation, d’autorisation du fournisseur et de traçabilité requises. La présence d’une catégorie ne les établit pas.',
      ),
      row(
        'Delivery and acceptance',
        'Livraison et réception',
        'Describe the delivery province, receiving requirements and any separately requested training or support. Dates and service scope require confirmation.',
        'Décrivez la province, les exigences de réception et les besoins distincts de formation ou de soutien. Les dates et services restent à confirmer.',
      ),
    ],
    questions: [
      qa(
        'Can the website recommend a ventilator for a patient?',
        'Le site peut-il recommander un ventilateur pour un patient?',
        'No. The inquiry is for institutional purchasing requirements already defined by qualified professionals. Do not submit patient records, treatment settings or clinical questions.',
        'Non. La demande porte sur des besoins d’achat institutionnels définis par des professionnels qualifiés. Ne transmettez aucun dossier de patient, réglage de traitement ou question clinique.',
      ),
      qa(
        'Does a model mentioned in an inquiry mean it is available?',
        'Un modèle mentionné dans une demande est-il disponible?',
        'No. A requested model is a purchasing reference only. Regulatory evidence, supplier authority, configuration and availability must be assessed for any specific proposed offer.',
        'Non. Un modèle demandé est uniquement une référence d’achat. Les preuves réglementaires, l’autorisation, la configuration et la disponibilité doivent être examinées pour toute offre précise.',
      ),
    ],
    example: l(
      'Institutional sourcing inquiry against our approved ventilator specification. Exact configuration and required procurement documents are identified; quantity is under review. Please advise which purchasing records are needed before an offer can be assessed.',
      'Demande institutionnelle selon nos spécifications approuvées. Configuration et documents d’achat identifiés; quantité à examiner. Veuillez préciser les documents nécessaires avant l’évaluation d’une offre.',
    ),
    source: 'licences',
  },
  noninvasive: {
    question: l(
      'How should a non-invasive ventilator procurement request be organized?',
      'Comment structurer une demande d’achat de ventilateur non invasif?',
    ),
    answer: l(
      'Identify the exact device configuration requested by the institution, then list interfaces and accessories as separate purchasing items. Keep the manufacturer’s device-specific documentation with the brief. A shared product description does not verify that two configurations are interchangeable.',
      'Identifiez la configuration exacte demandée par l’établissement, puis listez séparément les interfaces et accessoires. Conservez les documents du fabricant propres à l’appareil avec le dossier. Une description commune ne démontre pas que deux configurations sont interchangeables.',
    ),
    caption: l(
      'Separate the device, accessories and evidence',
      'Distinguez l’appareil, les accessoires et les preuves',
    ),
    rows: [
      row(
        'Device configuration',
        'Configuration de l’appareil',
        'Reference the manufacturer/model and approved institutional specification. Identify proposed deviations for explicit review.',
        'Indiquez le fabricant, le modèle et les spécifications institutionnelles approuvées. Identifiez les écarts proposés pour un examen explicite.',
      ),
      row(
        'Accessory schedule',
        'Liste des accessoires',
        'Use exact part references, packaging units and the relevant manufacturer compatibility documents. Do not assume accessories are included.',
        'Utilisez les références exactes, les unités d’emballage et les documents de compatibilité pertinents. Ne présumez pas que les accessoires sont inclus.',
      ),
      row(
        'Procurement evidence',
        'Preuves d’approvisionnement',
        'List the device, supplier and receiving records required by your institution. Keep requested delivery dates separate from confirmed commitments.',
        'Énumérez les documents de l’appareil, du fournisseur et de réception exigés. Distinguez les dates souhaitées des engagements confirmés.',
      ),
    ],
    questions: [
      qa(
        'Can an accessory description establish compatibility?',
        'La description d’un accessoire établit-elle la compatibilité?',
        'No. Match the exact device and accessory references against the manufacturer’s documentation and the institution’s review process. Visual resemblance or a common connector is not sufficient evidence.',
        'Non. Vérifiez les références exactes selon les documents du fabricant et le processus de l’établissement. Une ressemblance ou un raccord commun ne constitue pas une preuve suffisante.',
      ),
      qa(
        'Is this a home-treatment or emergency support service?',
        'S’agit-il d’un service de traitement à domicile ou d’urgence?',
        'No. This page supports institutional procurement inquiries. Treatment, device settings and urgent care belong with qualified healthcare providers; no patient information should enter this form.',
        'Non. Cette page sert aux demandes d’achat institutionnelles. Les traitements, réglages et soins urgents relèvent des professionnels de santé; aucune donnée de patient ne doit figurer dans ce formulaire.',
      ),
    ],
    example: l(
      'Institutional request for the non-invasive device configuration in our approved specification. Accessory part references are listed separately; packaging needs confirmation. Please identify the documents needed for purchasing and compatibility review.',
      'Demande institutionnelle pour la configuration non invasive de nos spécifications approuvées. Accessoires référencés séparément; conditionnement à confirmer. Veuillez préciser les documents nécessaires aux examens d’achat et de compatibilité.',
    ),
    source: 'licences',
  },
  roof: {
    question: l(
      'What information helps with a roof ventilator replacement?',
      'Quels renseignements facilitent le remplacement d’un ventilateur de toit?',
    ),
    answer: l(
      'Identify the existing unit, the roof opening and curb, and the required operating point. Separate the equipment request from roof, electrical and lifting work. This gives the project team a clear list of interfaces to verify before a replacement is proposed.',
      'Identifiez l’appareil existant, l’ouverture, la costière et le point de fonctionnement requis. Distinguez l’équipement des travaux de toiture, d’électricité et de levage. L’équipe disposera ainsi d’une liste claire des interfaces à vérifier avant de proposer un remplacement.',
    ),
    caption: l(
      'Three replacement scopes to distinguish',
      'Trois portées de remplacement à distinguer',
    ),
    rows: [
      row(
        'Fan on an existing curb',
        'Ventilateur sur une costière existante',
        'Record the curb dimensions and condition, mounting details and discharge arrangement. Identify the drawing used to document the fit.',
        'Notez les dimensions et l’état de la costière, le montage et le rejet. Identifiez le dessin utilisé pour documenter l’ajustement.',
      ),
      row(
        'Fan with a curb or adapter',
        'Ventilateur avec costière ou adaptateur',
        'State which pieces are requested and who will check the roof opening, support and weatherproofing details.',
        'Précisez les pièces demandées et qui vérifiera l’ouverture, le support et les détails d’étanchéité.',
      ),
      row(
        'Fan with site coordination',
        'Ventilateur avec coordination sur place',
        'List access restrictions, lifting needs and the shutdown window. Identify the responsible trades; their availability is a separate confirmation.',
        'Indiquez les contraintes d’accès, le levage et la période d’arrêt. Identifiez les corps de métier responsables; leur disponibilité doit être confirmée séparément.',
      ),
    ],
    questions: [
      qa(
        'Can I request a replacement with only a model number?',
        'Puis-je demander un remplacement avec seulement le modèle?',
        'Yes, start with the model and the information you have. Mark missing dimensions or operating data as unknown. An inquiry can begin before the project team has completed the fit and performance checks.',
        'Oui. Commencez par le modèle et les renseignements disponibles. Indiquez les dimensions ou données de fonctionnement inconnues. La demande peut débuter avant que l’équipe ait terminé les vérifications d’ajustement et de rendement.',
      ),
      qa(
        'Does a similar housing mean the replacement will fit?',
        'Un caisson semblable garantit-il l’ajustement?',
        'No. Ask for a documented comparison of mounting dimensions, connections and the required duty. Keep the existing drawing and proposed drawing separately identified so differences are visible.',
        'Non. Demandez une comparaison documentée du montage, des raccords et du fonctionnement requis. Identifiez séparément le dessin existant et le dessin proposé pour rendre les différences visibles.',
      ),
    ],
    example: l(
      'Replacement for one roof fan at an Ontario warehouse. Existing model available; curb dimensions still to be confirmed. Please review an equipment-only scope and identify the drawings needed for the next step.',
      'Remplacement d’un ventilateur de toit dans un entrepôt en Ontario. Modèle existant disponible; dimensions de la costière à confirmer. Veuillez examiner une demande d’équipement seulement et préciser les dessins nécessaires à la prochaine étape.',
    ),
    source: 'fans',
  },
  axial: {
    question: l(
      'How does an axial fan differ from a centrifugal fan?',
      'Quelle différence entre un ventilateur axial et un ventilateur centrifuge?',
    ),
    answer: l(
      'An axial fan moves air along its axis; a centrifugal fan takes air into the centre and redirects it outward. For an inquiry, identify the actual assembly and the specified airflow and pressure. The fan type alone does not establish suitability.',
      'Un ventilateur axial déplace l’air selon son axe; un ventilateur centrifuge aspire l’air au centre et le redirige vers l’extérieur. Pour une demande, identifiez l’ensemble et le débit et la pression spécifiés. Le type seul ne démontre pas l’adéquation.',
    ),
    caption: l(
      'Define what the axial fan request includes',
      'Définissez le contenu de la demande de ventilateur axial',
    ),
    rows: [
      row(
        'Complete assembly',
        'Ensemble complet',
        'List the casing, impeller, motor, guards and controls expected in the request. Include the mounting drawing or existing installation reference.',
        'Énumérez le caisson, la roue, le moteur, les protecteurs et les commandes attendus. Ajoutez le dessin de montage ou la référence de l’installation existante.',
      ),
      row(
        'Duct connection',
        'Raccord au conduit',
        'Record connection dimensions, the direction of airflow and available space. State whether the surrounding ductwork will remain.',
        'Notez les dimensions des raccords, le sens de l’air et l’espace disponible. Précisez si les conduits environnants sont conservés.',
      ),
      row(
        'Component replacement',
        'Remplacement d’un composant',
        'Identify the parent assembly and exact component reference. A motor or impeller request needs a different scope from a complete fan.',
        'Identifiez l’ensemble d’origine et la référence exacte du composant. Une demande de moteur ou de roue diffère d’une demande de ventilateur complet.',
      ),
    ],
    questions: [
      qa(
        'Is fan diameter enough to compare options?',
        'Le diamètre suffit-il pour comparer les options?',
        'No. Compare manufacturer performance information at the required airflow and pressure, alongside the installation constraints. Use the same units and operating conditions in each request.',
        'Non. Comparez les données de rendement du fabricant au débit et à la pression requis, ainsi que les contraintes d’installation. Utilisez les mêmes unités et conditions de fonctionnement pour chaque demande.',
      ),
      qa(
        'What if I do not know the airflow?',
        'Que faire si je ne connais pas le débit?',
        'Describe the existing equipment and project purpose, and say that airflow is unconfirmed. Share any available design reference with the project team. Do not enter an estimate merely to complete the inquiry form.',
        'Décrivez l’équipement existant et le projet, puis indiquez que le débit reste à confirmer. Transmettez toute référence de conception disponible à l’équipe. N’inscrivez pas une estimation uniquement pour remplir le formulaire.',
      ),
    ],
    example: l(
      'Inquiry for a complete duct-mounted axial fan assembly. Existing model and connection dimensions are available. Required duty is being confirmed by our design team; please identify the information needed to review the request.',
      'Demande pour un ensemble de ventilateur axial monté en conduit. Modèle existant et dimensions des raccords disponibles. L’équipe de conception confirme le point de fonctionnement; veuillez préciser les renseignements nécessaires à l’examen.',
    ),
    source: 'fans',
  },
  centrifugal: {
    question: l(
      'What should a centrifugal fan inquiry specify?',
      'Que préciser dans une demande de ventilateur centrifuge?',
    ),
    answer: l(
      'Pair the required airflow and pressure with an identified drawing of the inlet, outlet, drive and mounting. Record rotation using the manufacturer’s viewing convention. Organize performance and physical-fit information as separate checks so one is not mistaken for the other.',
      'Associez le débit et la pression requis à un dessin identifié de l’entrée, de la sortie, de l’entraînement et du montage. Notez la rotation selon la convention du fabricant. Distinguez le rendement de l’ajustement physique pour éviter de les confondre.',
    ),
    caption: l(
      'Keep each verification in its own part of the brief',
      'Distinguez les vérifications dans le dossier',
    ),
    rows: [
      row(
        'Operating requirement',
        'Besoin de fonctionnement',
        'Reference the project duty and units, air-stream description and operating schedule. Keep the manufacturer curve with the proposed selection.',
        'Indiquez le point de fonctionnement, les unités, les caractéristiques de l’air et l’horaire. Conservez la courbe du fabricant avec la proposition.',
      ),
      row(
        'Housing and orientation',
        'Caisson et orientation',
        'Identify the drawing revision and mark inlet, discharge and mounting locations. Note which existing connections must remain.',
        'Identifiez la révision du dessin, l’entrée, le refoulement et les points de montage. Notez les raccords existants à conserver.',
      ),
      row(
        'Drive and included equipment',
        'Entraînement et équipement inclus',
        'Specify whether the request includes the motor, drive, controls and base. Keep equipment supply separate from electrical and installation work.',
        'Précisez si la demande comprend le moteur, l’entraînement, les commandes et la base. Distinguez la fourniture des travaux électriques et d’installation.',
      ),
    ],
    questions: [
      qa(
        'Can I compare fans using motor power alone?',
        'Puis-je comparer les ventilateurs selon la puissance du moteur seulement?',
        'No. Ask the project team to compare the actual performance information and required duty, not just motor power or external dimensions. Record any assumptions that still require confirmation.',
        'Non. Demandez à l’équipe de comparer le rendement réel et le point de fonctionnement requis, plutôt que la seule puissance ou les dimensions extérieures. Notez les hypothèses encore à confirmer.',
      ),
      qa(
        'How should I describe rotation?',
        'Comment décrire le sens de rotation?',
        'Reference the manufacturer drawing and its viewing direction. If that information is missing, mark rotation as unconfirmed rather than assuming that clockwise has the same meaning from both sides.',
        'Faites référence au dessin du fabricant et à son point d’observation. Si ces données manquent, indiquez que la rotation est à confirmer plutôt que de présumer qu’un sens horaire signifie la même chose des deux côtés.',
      ),
    ],
    example: l(
      'Centrifugal fan replacement inquiry for an existing duct connection. Inlet and outlet drawings are available; motor and base inclusion need review. Please list any missing information before assessing a proposed replacement.',
      'Demande de remplacement d’un ventilateur centrifuge raccordé à un conduit existant. Dessins d’entrée et de sortie disponibles; inclusion du moteur et de la base à examiner. Veuillez préciser les renseignements manquants avant d’évaluer un remplacement.',
    ),
    source: 'fans',
  },
  exhaust: {
    question: l(
      'What is the difference between exhaust duty and fan type?',
      'Quelle différence entre la fonction d’extraction et le type de ventilateur?',
    ),
    answer: l(
      'Exhaust describes the task of removing air; axial or centrifugal describes the fan arrangement. Start with the application and established design requirements. A general building-exhaust request and a process-extraction request need different supporting information.',
      'L’extraction désigne l’évacuation de l’air; axial ou centrifuge décrit le ventilateur. Commencez par l’application et les exigences de conception établies. L’extraction générale d’un bâtiment et celle d’un procédé exigent des renseignements différents.',
    ),
    caption: l(
      'Describe the application before comparing equipment',
      'Décrivez l’application avant de comparer l’équipement',
    ),
    rows: [
      row(
        'General building exhaust',
        'Extraction générale du bâtiment',
        'Describe the space, existing unit, operating schedule and design reference. Identify whether this is a replacement or a new system request.',
        'Décrivez l’espace, l’appareil existant, l’horaire et la référence de conception. Précisez s’il s’agit d’un remplacement ou d’un nouveau système.',
      ),
      row(
        'Process extraction',
        'Extraction d’un procédé',
        'Provide the design team’s air-stream description and relevant project documents. Identify unresolved application requirements for qualified review.',
        'Fournissez les caractéristiques de l’air et les documents pertinents de l’équipe de conception. Signalez les exigences non résolues pour un examen qualifié.',
      ),
      row(
        'Discharge and connected systems',
        'Rejet et systèmes raccordés',
        'Identify the discharge route, connected ductwork and any specified air-treatment or replacement-air interfaces. Assign responsibility for checking these connections.',
        'Identifiez le trajet du rejet, les conduits et les interfaces prescrites de traitement ou d’air de remplacement. Précisez qui vérifiera ces raccordements.',
      ),
    ],
    questions: [
      qa(
        'Does an exhaust fan listing confirm hazardous-duty suitability?',
        'Une catégorie d’extraction confirme-t-elle l’adéquation à un milieu dangereux?',
        'No. Describe the application and provide the requirements established by qualified professionals. Materials, construction and any required certifications must be checked for the exact equipment and project.',
        'Non. Décrivez l’application et fournissez les exigences établies par des professionnels qualifiés. Les matériaux, la construction et les certifications requises doivent être vérifiés pour l’équipement et le projet précis.',
      ),
      qa(
        'Should I request equipment or a system review?',
        'Dois-je demander un équipement ou un examen du système?',
        'State which you need. For a defined replacement, include the existing unit and approved requirement. If the requirement is unresolved, explain the issue and request scope clarification; the inquiry does not replace a ventilation design assessment.',
        'Précisez votre besoin. Pour un remplacement défini, indiquez l’appareil et les exigences approuvées. Sinon, décrivez le problème et demandez à clarifier la portée; la demande ne remplace pas une évaluation de conception.',
      ),
    ],
    example: l(
      'Building-exhaust replacement inquiry for a commercial facility. Existing unit reference available; discharge arrangement and design duty are awaiting confirmation. Please distinguish the equipment request from any site review.',
      'Demande de remplacement d’extraction générale pour un bâtiment commercial. Référence de l’appareil disponible; rejet et point de fonctionnement à confirmer. Veuillez distinguer la demande d’équipement d’un éventuel examen sur place.',
    ),
    source: 'fans',
  },
  accessories: {
    question: l(
      'What identifies a respiratory accessory for a procurement inquiry?',
      'Quels renseignements identifient un accessoire respiratoire pour une demande d’achat?',
    ),
    answer: l(
      'Use the exact manufacturer part reference together with the parent device model and relevant documentation revision. Add the requested packaging and quantity. A photograph or connector description can support identification, but does not confirm compatibility or authority to supply.',
      'Utilisez la référence exacte du fabricant, le modèle de l’appareil associé et la révision des documents pertinents. Ajoutez le conditionnement et la quantité. Une photo ou la description d’un raccord facilite l’identification, sans confirmer la compatibilité ni l’autorisation de fourniture.',
    ),
    caption: l(
      'Separate identity, compatibility and purchasing details',
      'Distinguez l’identité, la compatibilité et les détails d’achat',
    ),
    rows: [
      row(
        'Accessory identity',
        'Identité de l’accessoire',
        'Record the manufacturer, part number and label or catalogue revision. State whether the request is for the exact item or a documented alternative for review.',
        'Notez le fabricant, le numéro de pièce et la révision de l’étiquette ou du catalogue. Précisez si vous demandez l’article exact ou une solution de rechange documentée à examiner.',
      ),
      row(
        'Device-specific evidence',
        'Preuves propres à l’appareil',
        'Identify the parent device model and the manufacturer document relied on for compatibility. Keep institutional acceptance separate from a supplier description.',
        'Identifiez l’appareil associé et le document du fabricant utilisé pour établir la compatibilité. Distinguez l’acceptation par l’établissement de la description du fournisseur.',
      ),
      row(
        'Purchasing unit',
        'Unité d’achat',
        'Clarify whether quantity refers to individual items, packs or cases. Note required label, traceability and receiving documents without sending sensitive records.',
        'Précisez si la quantité désigne des unités, des paquets ou des caisses. Notez les documents d’étiquetage, de traçabilité et de réception requis, sans transmettre de dossiers sensibles.',
      ),
    ],
    questions: [
      qa(
        'Can I request an accessory when the part number is unknown?',
        'Puis-je faire une demande sans connaître le numéro de pièce?',
        'Yes. Describe the item and identify the device if known, stating that the accessory reference needs confirmation. Do not treat a proposed identification as a compatibility decision. Clinical use remains with the institution’s qualified team.',
        'Oui. Décrivez l’article et identifiez l’appareil si possible, en précisant que la référence reste à confirmer. Une identification proposée n’est pas une décision de compatibilité. L’utilisation clinique relève de l’équipe qualifiée de l’établissement.',
      ),
      qa(
        'What should I include instead of patient information?',
        'Que fournir à la place de renseignements sur les patients?',
        'Use equipment identifiers, purchasing requirements and institutional contact details. Do not include patient names, medical records, device settings or patient-linked serial records in the inquiry.',
        'Utilisez les identifiants d’équipement, les exigences d’achat et les coordonnées institutionnelles. N’incluez aucun nom de patient, dossier médical, réglage d’appareil ou registre de série lié à un patient.',
      ),
    ],
    example: l(
      'Institutional inquiry for the exact respiratory accessory referenced in our purchasing specification. Device model and part reference are available; pack size needs confirmation. Please identify the supporting documents required for procurement review.',
      'Demande institutionnelle pour l’accessoire respiratoire exact indiqué dans notre spécification d’achat. Modèle et référence disponibles; format d’emballage à confirmer. Veuillez préciser les documents nécessaires à l’examen du dossier d’achat.',
    ),
    source: 'licences',
  },
  procurement: {
    question: l(
      'What belongs in an institutional medical procurement brief?',
      'Que doit contenir un dossier d’approvisionnement médical institutionnel?',
    ),
    answer: l(
      'Bring the institution-approved device specification, purchasing reference, requested quantities and deadlines into one brief. Identify which team will review the device, supplier and acceptance documents. Keep requested dates separate from any subsequently confirmed offer.',
      'Réunissez les spécifications approuvées par l’établissement, la référence d’achat, les quantités et les échéances. Identifiez l’équipe responsable de vérifier les documents de l’appareil, du fournisseur et de réception. Distinguez les dates souhaitées de celles d’une offre confirmée.',
    ),
    caption: l(
      'A purchasing record with three distinct checks',
      'Un dossier d’achat comportant trois vérifications distinctes',
    ),
    rows: [
      row(
        'Requested equipment',
        'Équipement demandé',
        'Reference the exact manufacturer/model, configuration and institutional specification revision. Identify separately listed accessories and any proposed deviations.',
        'Indiquez le fabricant, le modèle, la configuration et la révision des spécifications. Identifiez les accessoires distincts et les écarts proposés.',
      ),
      row(
        'Device and supplier documents',
        'Documents de l’appareil et du fournisseur',
        'List the regulatory evidence, supplier authorization and traceability records your purchasing process requires. Assign their review to the appropriate qualified team.',
        'Énumérez les preuves réglementaires, l’autorisation du fournisseur et les documents de traçabilité exigés. Confiez leur examen à l’équipe qualifiée appropriée.',
      ),
      row(
        'Tender and acceptance',
        'Appel d’offres et réception',
        'Record the tender closing date, requested delivery window and province. Define required receiving documents and any training or service scope as separate items.',
        'Notez la clôture de l’appel d’offres, la livraison souhaitée et la province. Définissez séparément les documents de réception et les besoins de formation ou de service.',
      ),
    ],
    questions: [
      qa(
        'Does a device licence search verify the supplier?',
        'Une recherche d’homologation vérifie-t-elle le fournisseur?',
        'No. Health Canada’s MDALL supports checks of device licences; an establishment licence concerns the establishment and is not approval of a specific device. Have the responsible team assess the applicable requirements and the exact supply chain separately.',
        'Non. La base MDALL de Santé Canada permet de vérifier les homologations d’appareils; une licence d’établissement concerne l’établissement et ne constitue pas l’approbation d’un appareil précis. Faites examiner séparément les exigences applicables et la chaîne de fourniture.',
      ),
      qa(
        'Can I submit before quantity or timing is final?',
        'Puis-je envoyer une demande avant de fixer la quantité ou l’échéancier?',
        'Yes. Leave the optional fields unknown and describe the stage of your procurement process. An inquiry begins a documentation review; it is not a purchase order, allocation of stock or confirmed delivery commitment.',
        'Oui. Laissez les champs facultatifs inconnus et décrivez l’étape de votre processus d’achat. Une demande amorce l’examen documentaire; elle ne constitue ni une commande, ni une réservation de stock, ni un engagement de livraison.',
      ),
    ],
    example: l(
      'Preliminary institutional sourcing inquiry. The approved device specification is available; quantity and delivery timing are not final. Please identify the documentation needed to assess the request before any offer is considered.',
      'Demande préliminaire d’approvisionnement institutionnel. Spécifications approuvées disponibles; quantité et échéancier non définitifs. Veuillez préciser les documents nécessaires à l’évaluation avant l’examen d’une offre.',
    ),
    source: 'licences',
  },
};
