import type { Localized } from './catalog';
import { pathFor, type Division, type Locale } from './site';

export type DetailGroup = 'services' | 'industries' | 'resources';
export interface DetailSection {
  id: string;
  title: Localized<string>;
  body: Localized<string>;
  items: Localized<string[]>;
}
export interface DetailPage {
  id: string;
  group: DetailGroup;
  division: Division;
  slug: Localized<string>;
  title: Localized<string>;
  summary: Localized<string>;
  keyword: Localized<string>;
  inquiryCategory: string;
  relatedCategories: string[];
  sections: DetailSection[];
  sources: ('fans' | 'maintenance' | 'licences')[];
}
const l = <T>(en: T, fr: T): Localized<T> => ({ en, fr });
const section = (
  id: string,
  title: Localized<string>,
  body: Localized<string>,
  items: Localized<string[]>,
): DetailSection => ({ id, title, body, items });

export const referenceSources = {
  fans: {
    title: l(
      'CCOHS — Industrial ventilation: fans',
      'CCHST — Ventilation industrielle : ventilateurs',
    ),
    url: l(
      'https://www.ccohs.ca/oshanswers/prevention/ventilation/fans.html',
      'https://www.cchst.ca/oshanswers/prevention/ventilation/fans.html',
    ),
    note: l(
      'Background on fan types and the factors considered in selection.',
      'Renseignements sur les types de ventilateurs et les facteurs de sélection.',
    ),
  },
  maintenance: {
    title: l('CCOHS — Installation and maintenance', 'CCHST — Installation et maintenance'),
    url: l(
      'https://www.ccohs.ca/oshanswers/prevention/ventilation/installation.html',
      'https://www.cchst.ca/oshanswers/prevention/ventilation/installation.html',
    ),
    note: l(
      'General context for work carried out by qualified ventilation professionals.',
      'Contexte général des travaux confiés à des spécialistes qualifiés en ventilation.',
    ),
  },
  licences: {
    title: l(
      'Health Canada — Medical device licence searches',
      'Santé Canada — Recherche d’homologations d’instruments médicaux',
    ),
    url: l(
      'https://www.canada.ca/en/health-canada/services/drugs-health-products/medical-devices/licences/overview.html',
      'https://www.canada.ca/fr/sante-canada/services/medicaments-produits-sante/instruments-medicaux/licences/apercu.html',
    ),
    note: l(
      'How to search current and archived device licences. A database result does not establish our authority to supply a device.',
      'Comment consulter les homologations actives et archivées. Un résultat ne constitue pas une autorisation de notre entreprise à fournir un appareil.',
    ),
  },
};

export const detailPages: DetailPage[] = [
  {
    id: 'repair',
    group: 'services',
    division: 'industrial',
    slug: l('industrial-fan-repair', 'reparation-ventilateurs-industriels'),
    title: l(
      'Plan an industrial fan repair inquiry.',
      'Préparez une demande de réparation industrielle.',
    ),
    summary: l(
      'Build a useful repair brief from the equipment identity, observed problem and access conditions, before a service scope is agreed.',
      'Préparez un dossier de réparation avec l’identité de l’appareil, le problème observé et les conditions d’accès, avant de convenir des travaux.',
    ),
    keyword: l('industrial fan repair inquiry', 'demande de réparation de ventilateur industriel'),
    inquiryCategory: 'repair',
    relatedCategories: ['parts', 'axial', 'centrifugal'],
    sources: [],
    sections: [
      section(
        'equipment',
        l('Start with the existing equipment', 'Commencez par l’équipement existant'),
        l(
          'A symptom is useful context, but it is not a diagnosis. Separate what your team has observed from work already recommended by a qualified technician.',
          'Un symptôme fournit un contexte utile, sans constituer un diagnostic. Distinguez les observations de votre équipe des travaux déjà recommandés par un technicien qualifié.',
        ),
        l(
          [
            'Manufacturer, model, serial number and site asset reference',
            'When the problem was noticed and any recent system changes',
            'Available inspection reports and previous repair records',
          ],
          [
            'Fabricant, modèle, numéro de série et référence interne',
            'Date du constat et changements récents au système',
            'Rapports d’inspection et historique des réparations disponibles',
          ],
        ),
      ),
      section(
        'scope',
        l('Define the work and access', 'Définissez les travaux et l’accès'),
        l(
          'State whether you are seeking assessment, a specified part or a defined repair. Service availability, qualifications, insurance and the proposed scope require confirmation before a commitment.',
          'Précisez si vous cherchez une évaluation, une pièce déterminée ou une réparation définie. La disponibilité, les qualifications, les assurances et la portée des travaux doivent être confirmées avant tout engagement.',
        ),
        l(
          [
            'Site province and person coordinating access',
            'Permitted work hours and proposed shutdown window',
            'Who will approve the scope and acceptance documentation',
          ],
          [
            'Province du site et responsable de l’accès',
            'Heures de travail permises et arrêt prévu',
            'Responsable de l’approbation des travaux et des documents de réception',
          ],
        ),
      ),
    ],
  },
  {
    id: 'maintenance',
    group: 'services',
    division: 'industrial',
    slug: l('ventilation-maintenance', 'entretien-ventilation'),
    title: l(
      'Plan ventilation maintenance around your assets.',
      'Planifiez l’entretien de vos équipements de ventilation.',
    ),
    summary: l(
      'Organize equipment records, manufacturer instructions and site requirements into a maintenance inquiry that can be assessed.',
      'Regroupez les fiches d’équipement, les instructions du fabricant et les exigences du site dans une demande d’entretien à évaluer.',
    ),
    keyword: l(
      'industrial ventilation maintenance scope',
      'portée entretien ventilation industrielle',
    ),
    inquiryCategory: 'maintenance',
    relatedCategories: ['roof', 'exhaust', 'supply'],
    sources: [],
    sections: [
      section(
        'register',
        l('Prepare an equipment register', 'Préparez un registre des équipements'),
        l(
          'A single fan and a mixed fleet need different planning. Identify the assets included in the request and keep missing information visible instead of assigning an assumed schedule.',
          'Un seul ventilateur et un parc diversifié demandent une planification différente. Identifiez les appareils visés et signalez les renseignements manquants plutôt que de présumer d’un calendrier.',
        ),
        l(
          [
            'Asset ID, manufacturer/model and location for each unit',
            'Manufacturer maintenance documents and service history',
            'Known access restrictions and existing monitoring records',
          ],
          [
            'Identifiant, fabricant, modèle et emplacement de chaque appareil',
            'Documents d’entretien du fabricant et historique des interventions',
            'Restrictions d’accès et relevés de surveillance existants',
          ],
        ),
      ),
      section(
        'deliverables',
        l('Agree on the deliverables', 'Précisez les livrables attendus'),
        l(
          'Describe the reporting and coordination you need. A maintenance frequency, performance guarantee or service territory is not established by submitting an inquiry.',
          'Décrivez les rapports et la coordination souhaités. Une demande ne fixe pas une fréquence d’entretien, une garantie de rendement ou un territoire de service.',
        ),
        l(
          [
            'Proposed work windows and facility contact',
            'Required report format and asset-by-asset findings',
            'Process for approving additional work or replacement parts',
          ],
          [
            'Plages de travail proposées et personne-ressource du site',
            'Format du rapport et constats attendus pour chaque appareil',
            'Processus d’approbation des travaux supplémentaires ou des pièces',
          ],
        ),
      ),
    ],
  },
  {
    id: 'installation',
    group: 'services',
    division: 'industrial',
    slug: l('installation-coordination', 'coordination-installation'),
    title: l('Coordinate a ventilation installation.', 'Coordonnez l’installation de ventilation.'),
    summary: l(
      'Define where equipment supply ends and site work begins: roof, structure, electrical, controls, ductwork and commissioning responsibilities.',
      'Définissez la limite entre la fourniture de l’appareil et les travaux au site : toiture, structure, électricité, commandes, conduits et mise en service.',
    ),
    keyword: l('ventilation installation coordination', 'coordination installation ventilation'),
    inquiryCategory: 'installation',
    relatedCategories: ['roof', 'supply', 'exhaust'],
    sources: [],
    sections: [
      section(
        'interfaces',
        l('Map the project responsibilities', 'Répartissez les responsabilités'),
        l(
          'A supply request does not automatically include installation. List the parties already retained and the coordination still required so the proposed scope can identify exclusions clearly.',
          'Une demande de fourniture ne comprend pas automatiquement l’installation. Indiquez les intervenants déjà retenus et la coordination recherchée pour préciser les exclusions de la portée proposée.',
        ),
        l(
          [
            'Designer, contractor, owner and site contact',
            'Responsibility for curbs, supports, connections and controls',
            'Required permits, qualifications and insurance to be reviewed',
          ],
          [
            'Concepteur, entrepreneur, propriétaire et contact au site',
            'Responsable des costières, supports, raccords et commandes',
            'Permis, qualifications et assurances à examiner',
          ],
        ),
      ),
      section(
        'handover',
        l('Plan delivery and handover', 'Planifiez la livraison et la réception'),
        l(
          'Record the receiving conditions and the documents required to close the project. Dates remain requested dates until equipment and service availability are confirmed.',
          'Notez les conditions de réception et les documents nécessaires à la clôture du projet. Les dates restent souhaitées jusqu’à confirmation des disponibilités.',
        ),
        l(
          [
            'Delivery access, unloading arrangements and storage constraints',
            'Required coordination meetings and work sequence',
            'Commissioning, acceptance and warranty documents specified by the owner',
          ],
          [
            'Accès à la livraison, déchargement et contraintes d’entreposage',
            'Réunions de coordination et séquence des travaux prévues',
            'Documents de mise en service, de réception et de garantie exigés',
          ],
        ),
      ),
    ],
  },
  {
    id: 'replacement',
    group: 'services',
    division: 'industrial',
    slug: l('equipment-replacement', 'remplacement-equipement'),
    title: l(
      'Plan an industrial fan replacement.',
      'Planifiez un remplacement de ventilateur industriel.',
    ),
    summary: l(
      'Document the existing unit and the intended operating requirement so a replacement inquiry goes beyond matching a model number.',
      'Documentez l’appareil existant et le fonctionnement attendu pour aller au-delà d’une simple correspondance de numéro de modèle.',
    ),
    keyword: l(
      'industrial fan replacement planning',
      'planification remplacement ventilateur industriel',
    ),
    inquiryCategory: 'replacement',
    relatedCategories: ['roof', 'centrifugal', 'parts'],
    sources: [],
    sections: [
      section(
        'baseline',
        l('Record what stays and what changes', 'Notez ce qui reste et ce qui change'),
        l(
          'An existing nameplate is a starting point. Tell us whether the application is unchanged, the system has been modified or a new design requirement has been issued.',
          'La plaque signalétique constitue un point de départ. Indiquez si l’application reste identique, si le système a été modifié ou si une nouvelle exigence de conception a été émise.',
        ),
        l(
          [
            'Existing manufacturer, model, dimensions and connection arrangement',
            'Design airflow/pressure and electrical supply, with units',
            'Controls, accessories and constraints to retain or change',
          ],
          [
            'Fabricant, modèle, dimensions et raccords existants',
            'Débit, pression de conception et alimentation électrique, avec unités',
            'Commandes, accessoires et contraintes à conserver ou à modifier',
          ],
        ),
      ),
      section(
        'decision',
        l('Keep substitutions explicit', 'Rendez les substitutions explicites'),
        l(
          'Separate an exact replacement request from permission to propose an alternative. Compatibility and any required changes must be documented before ordering.',
          'Distinguez le remplacement à l’identique de l’autorisation de proposer une solution différente. La compatibilité et les modifications nécessaires doivent être documentées avant la commande.',
        ),
        l(
          [
            'Whether alternatives may be considered and who can approve them',
            'Required drawings and performance documentation',
            'Shutdown, receiving and installation coordination requirements',
          ],
          [
            'Possibilité d’étudier des solutions de rechange et responsable de leur approbation',
            'Dessins et documents de rendement exigés',
            'Exigences d’arrêt, de réception et de coordination de l’installation',
          ],
        ),
      ),
    ],
  },
  {
    id: 'technical-support',
    group: 'services',
    division: 'medical',
    slug: l('medical-technical-support', 'soutien-technique-medical'),
    title: l(
      'Route a medical technical support inquiry.',
      'Orientez une demande de soutien technique médical.',
    ),
    summary: l(
      'A procurement and biomedical engineering contact path for documentation or a defined, authorized service requirement.',
      'Un point de contact pour l’approvisionnement et le génie biomédical, concernant la documentation ou un besoin de service défini et autorisé.',
    ),
    keyword: l(
      'medical equipment technical support inquiry',
      'demande soutien technique équipement médical',
    ),
    inquiryCategory: 'technical-support',
    relatedCategories: ['invasive', 'noninvasive', 'accessories'],
    sources: [],
    sections: [
      section(
        'identify',
        l('Identify the device and request', 'Identifiez l’appareil et la demande'),
        l(
          'Use an institutional asset reference and exact device identification. Describe the documentation or service scope requested without including patient information, clinical records or device logs containing health data.',
          'Utilisez une référence d’actif institutionnelle et l’identification exacte de l’appareil. Décrivez les documents ou travaux recherchés sans renseignements sur les patients, dossiers cliniques ou journaux contenant des données de santé.',
        ),
        l(
          [
            'Institution and biomedical/procurement contact',
            'Manufacturer, exact model and relevant document revision',
            'Requested documentation, parts reference or service scope',
          ],
          [
            'Établissement et contact en génie biomédical ou approvisionnement',
            'Fabricant, modèle exact et révision documentaire pertinente',
            'Documents, référence de pièce ou portée du service recherchés',
          ],
        ),
      ),
      section(
        'authorization',
        l('Confirm authorization before work', 'Confirmez l’autorisation avant les travaux'),
        l(
          'This inquiry page does not establish authorized servicing or training. Manufacturer authority, device-specific competence and availability must be verified for the requested work. It is not an emergency or clinical support channel.',
          'Cette page ne constitue pas une offre de service ou de formation autorisés. L’autorisation du fabricant, les compétences propres à l’appareil et la disponibilité doivent être vérifiées. Il ne s’agit pas d’un service d’urgence ou de soutien clinique.',
        ),
        l(
          [
            'Required authorization documents and permitted service activities',
            'Institutional acceptance and traceability requirements',
            'Approved escalation contact and requested response timeline',
          ],
          [
            'Autorisations requises et activités de service permises',
            'Exigences de réception et de traçabilité de l’établissement',
            'Contact d’escalade approuvé et délai de réponse souhaité',
          ],
        ),
      ),
    ],
  },
  {
    id: 'warehouses',
    group: 'industries',
    division: 'industrial',
    slug: l('warehouses', 'entrepots'),
    title: l('Ventilation inquiries for warehouses.', 'Demandes de ventilation pour entrepôts.'),
    summary: l(
      'Describe the storage layout, loading areas and operating schedule alongside your established ventilation requirements.',
      'Décrivez l’aménagement, les zones de chargement et les horaires avec les exigences de ventilation déjà établies.',
    ),
    keyword: l('warehouse ventilation procurement', 'approvisionnement ventilation entrepôt'),
    inquiryCategory: 'exhaust',
    relatedCategories: ['roof', 'exhaust', 'supply'],
    sources: [],
    sections: [
      section(
        'operations',
        l('Describe the operating zones', 'Décrivez les zones d’activité'),
        l(
          'Separate general storage, receiving and other work areas in the brief. A floor area alone does not define an equipment specification; include the design documents available from your project team.',
          'Distinguez l’entreposage, la réception et les autres aires de travail. La superficie seule ne définit pas une spécification d’équipement; ajoutez les documents de conception disponibles.',
        ),
        l(
          [
            'Building zones and operating hours',
            'Existing fan locations and design references',
            'Planned layout changes or new work areas',
          ],
          [
            'Zones du bâtiment et heures d’activité',
            'Emplacements des ventilateurs et références de conception',
            'Réaménagements prévus ou nouvelles aires de travail',
          ],
        ),
      ),
      section(
        'logistics',
        l('Coordinate around daily operations', 'Tenez compte des activités quotidiennes'),
        l(
          'Help the project team understand delivery and access constraints before an equipment or service proposal is prepared.',
          'Permettez à l’équipe de comprendre les contraintes de livraison et d’accès avant la préparation d’une proposition.',
        ),
        l(
          [
            'Receiving hours and unloading responsibility',
            'Roof or mezzanine access limitations',
            'Work windows that avoid disrupting receiving and dispatch',
          ],
          [
            'Heures de réception et responsabilité du déchargement',
            'Restrictions d’accès au toit ou à la mezzanine',
            'Plages de travaux compatibles avec la réception et l’expédition',
          ],
        ),
      ),
    ],
  },
  {
    id: 'manufacturing',
    group: 'industries',
    division: 'industrial',
    slug: l('manufacturing', 'fabrication'),
    title: l(
      'Ventilation for manufacturing facilities.',
      'Ventilation pour les installations de fabrication.',
    ),
    summary: l(
      'Keep process exhaust and general building ventilation requirements distinct in your equipment inquiry.',
      'Distinguez l’extraction liée au procédé de la ventilation générale du bâtiment dans votre demande.',
    ),
    keyword: l(
      'manufacturing ventilation equipment inquiry',
      'demande équipement ventilation usine',
    ),
    inquiryCategory: 'centrifugal',
    relatedCategories: ['centrifugal', 'blowers', 'exhaust'],
    sources: [],
    sections: [
      section(
        'process',
        l(
          'Provide the established process specification',
          'Fournissez les spécifications du procédé',
        ),
        l(
          'Describe the process and identify the documents your qualified design team has issued. Do not infer suitability for hazardous materials from a generic fan category.',
          'Décrivez le procédé et identifiez les documents de votre équipe de conception qualifiée. Une catégorie générique ne permet pas de présumer de l’adéquation à des matières dangereuses.',
        ),
        l(
          [
            'Process description and relevant design revision',
            'Air-stream characteristics supplied by the design team',
            'Duty point, temperature and material requirements with units',
          ],
          [
            'Description du procédé et révision de conception',
            'Caractéristiques de l’air fournies par les concepteurs',
            'Point de fonctionnement, température et matériaux requis, avec unités',
          ],
        ),
      ),
      section(
        'continuity',
        l('Describe the production constraints', 'Décrivez les contraintes de production'),
        l(
          'Identify the installation interfaces and the approvals needed before any substitution. A requested shutdown date does not confirm availability.',
          'Identifiez les interfaces et les approbations requises avant toute substitution. Une date d’arrêt souhaitée ne confirme pas la disponibilité.',
        ),
        l(
          [
            'Shutdown window and project decision owner',
            'Existing duct connections, controls and utilities',
            'Documentation required for acceptance and maintenance records',
          ],
          [
            'Période d’arrêt et responsable des décisions',
            'Raccords de conduits, commandes et services existants',
            'Documents requis pour la réception et le dossier d’entretien',
          ],
        ),
      ),
    ],
  },
  {
    id: 'commercial',
    group: 'industries',
    division: 'industrial',
    slug: l('commercial-facilities', 'batiments-commerciaux'),
    title: l(
      'Ventilation for commercial buildings.',
      'Ventilation pour les bâtiments commerciaux.',
    ),
    summary: l(
      'Prepare replacement and ventilation inquiries with tenant access, building controls and receiving conditions in mind.',
      'Préparez vos demandes de ventilation et de remplacement selon l’accès des occupants, les commandes et les conditions de livraison.',
    ),
    keyword: l(
      'commercial building fan replacement inquiry',
      'demande remplacement ventilateur bâtiment commercial',
    ),
    inquiryCategory: 'roof',
    relatedCategories: ['roof', 'supply', 'parts'],
    sources: [],
    sections: [
      section(
        'building',
        l('Identify the existing installation', 'Identifiez l’installation existante'),
        l(
          'Use the building asset register and existing drawings to identify the equipment. Record whether the work is an exact replacement or part of a wider building project.',
          'Utilisez le registre du bâtiment et les dessins existants pour identifier l’appareil. Précisez s’il s’agit d’un remplacement à l’identique ou d’un projet plus large.',
        ),
        l(
          [
            'Unit nameplate and rooftop/plant-room location',
            'Curb or support dimensions and connection details',
            'Electrical and building-control requirements',
          ],
          [
            'Plaque signalétique et emplacement sur le toit ou en salle mécanique',
            'Dimensions de la costière ou des supports et détails des raccords',
            'Exigences électriques et commandes du bâtiment',
          ],
        ),
      ),
      section(
        'occupants',
        l('Record the access conditions', 'Notez les conditions d’accès'),
        l(
          'An occupied site needs a clear coordination plan. Separate requested scheduling from dates agreed with an equipment supplier or qualified contractor.',
          'Un site occupé exige une coordination claire. Distinguez l’horaire souhaité des dates convenues avec un fournisseur ou un entrepreneur qualifié.',
        ),
        l(
          [
            'Tenant notification and permitted work hours',
            'Roof access, receiving and storage restrictions',
            'Property manager and contractor responsibilities',
          ],
          [
            'Avis aux occupants et heures de travail permises',
            'Restrictions d’accès au toit, de réception et d’entreposage',
            'Responsabilités du gestionnaire et de l’entrepreneur',
          ],
        ),
      ),
    ],
  },
  {
    id: 'hospitals',
    group: 'industries',
    division: 'medical',
    slug: l('hospitals', 'hopitaux'),
    title: l(
      'Organize a hospital procurement brief.',
      'Structurez un dossier d’approvisionnement hospitalier.',
    ),
    summary: l(
      'Bring purchasing, biomedical engineering and approved device specifications into one documented inquiry.',
      'Réunissez les achats, le génie biomédical et les spécifications approuvées dans une demande documentée.',
    ),
    keyword: l(
      'hospital ventilator procurement inquiry',
      'demande approvisionnement ventilateur hôpital',
    ),
    inquiryCategory: 'procurement',
    relatedCategories: ['invasive', 'noninvasive', 'accessories'],
    sources: [],
    sections: [
      section(
        'tender',
        l('Reference the institutional requirement', 'Indiquez les exigences institutionnelles'),
        l(
          'Use the tender or internal purchasing reference and exact requested configuration. Clinical selection and suitability remain with the institution’s qualified professionals.',
          'Utilisez la référence d’appel d’offres ou d’achat interne et la configuration exacte recherchée. La sélection et l’adéquation cliniques relèvent des professionnels qualifiés de l’établissement.',
        ),
        l(
          [
            'Tender reference, quantities and closing date',
            'Approved manufacturer/model or permitted alternative process',
            'Required accessories, documents and acceptance criteria',
          ],
          [
            'Référence d’appel d’offres, quantités et date de clôture',
            'Fabricant et modèle approuvés ou processus de substitution autorisé',
            'Accessoires, documents et critères de réception exigés',
          ],
        ),
      ),
      section(
        'review',
        l('Keep supply evidence traceable', 'Assurez la traçabilité des preuves'),
        l(
          'Request supplier and regulatory evidence for review before an offer is treated as verified. Separate equipment supply from any installation, training or servicing request.',
          'Demandez les preuves relatives au fournisseur et à la réglementation avant de considérer une offre comme vérifiée. Distinguez la fourniture de toute installation, formation ou intervention.',
        ),
        l(
          [
            'Evidence reviewer and purchasing contact',
            'Receiving location, delivery window and asset-registration needs',
            'Separate scope for any authorized technical support',
          ],
          [
            'Responsable de l’examen des preuves et contact aux achats',
            'Lieu de réception, période de livraison et enregistrement des actifs',
            'Portée distincte de tout soutien technique autorisé',
          ],
        ),
      ),
    ],
  },
  {
    id: 'clinics',
    group: 'industries',
    division: 'medical',
    slug: l('clinics', 'cliniques'),
    title: l('Prepare a clinic equipment inquiry.', 'Préparez une demande pour votre clinique.'),
    summary: l(
      'Identify the requested equipment and documentation with the person authorized to make procurement decisions for your organization.',
      'Identifiez l’équipement et les documents recherchés avec la personne autorisée à décider des achats de votre organisation.',
    ),
    keyword: l(
      'clinic respiratory equipment procurement',
      'approvisionnement équipement respiratoire clinique',
    ),
    inquiryCategory: 'noninvasive',
    relatedCategories: ['noninvasive', 'accessories'],
    sources: [],
    sections: [
      section(
        'configuration',
        l('Specify the approved configuration', 'Précisez la configuration approuvée'),
        l(
          'Provide the exact institutional requirement rather than describing patient needs. This page supports a business inquiry and does not recommend a device or treatment.',
          'Fournissez les exigences exactes de l’organisation plutôt que les besoins de patients. Cette page sert aux demandes professionnelles et ne recommande ni appareil ni traitement.',
        ),
        l(
          [
            'Requested manufacturer/model and quantity',
            'Separately identified accessory references',
            'Documents required by the authorized purchasing lead',
          ],
          [
            'Fabricant, modèle et quantité recherchés',
            'Références d’accessoires identifiées séparément',
            'Documents exigés par le responsable autorisé des achats',
          ],
        ),
      ),
      section(
        'receiving',
        l('Clarify receiving and support needs', 'Précisez la réception et le soutien'),
        l(
          'List any constraints that affect receiving and the documentation expected at handover. Availability, compatibility and support scope remain subject to verification.',
          'Indiquez les contraintes de réception et les documents attendus à la remise. La disponibilité, la compatibilité et le soutien demeurent à vérifier.',
        ),
        l(
          [
            'Delivery province and receiving contact',
            'Required handover and traceability documentation',
            'Requested timeline and any separately authorized service requirement',
          ],
          [
            'Province de livraison et responsable de la réception',
            'Documents de remise et de traçabilité exigés',
            'Échéancier souhaité et tout service autorisé demandé séparément',
          ],
        ),
      ),
    ],
  },
  {
    id: 'institutions',
    group: 'industries',
    division: 'medical',
    slug: l('institutional-buyers', 'acheteurs-institutionnels'),
    title: l(
      'Medical procurement across multiple sites.',
      'Harmonisez l’approvisionnement de plusieurs sites.',
    ),
    summary: l(
      'Build a shared brief for purchasing teams managing multiple receiving sites, review stages or documentation requirements.',
      'Préparez un dossier commun pour les équipes gérant plusieurs lieux de réception, étapes d’examen ou exigences documentaires.',
    ),
    keyword: l(
      'institutional respiratory equipment sourcing',
      'recherche équipement respiratoire institutionnel',
    ),
    inquiryCategory: 'procurement',
    relatedCategories: ['procurement', 'accessories'],
    sources: [],
    sections: [
      section(
        'schedule',
        l('Separate the requirement by site', 'Détaillez les besoins par site'),
        l(
          'Use a consistent equipment reference across the request, with quantities and receiving requirements for each location. Identify any site-specific configuration differences.',
          'Utilisez une référence d’équipement cohérente, avec les quantités et modalités de réception de chaque lieu. Signalez les différences de configuration propres aux sites.',
        ),
        l(
          [
            'Purchasing entity and authorized decision owner',
            'Quantity, delivery province and receiving window by site',
            'Common specification revision and approved exceptions',
          ],
          [
            'Entité acheteuse et responsable autorisé des décisions',
            'Quantité, province et période de réception par site',
            'Révision commune des spécifications et exceptions approuvées',
          ],
        ),
      ),
      section(
        'evaluation',
        l('Define the evaluation package', 'Définissez le dossier d’évaluation'),
        l(
          'Describe the evidence your organization needs to evaluate an offer. A general inquiry does not establish contract eligibility, approved-vendor status or regulatory compliance.',
          'Décrivez les preuves nécessaires à l’évaluation d’une offre. Une demande générale n’établit ni admissibilité contractuelle, ni statut de fournisseur agréé, ni conformité réglementaire.',
        ),
        l(
          [
            'Supplier authority and applicable regulatory evidence for review',
            'Document language, format and revision requirements',
            'Process for clarifications, alternatives and final acceptance',
          ],
          [
            'Autorisation du fournisseur et preuves réglementaires applicables à examiner',
            'Langue, format et révision des documents exigés',
            'Processus de clarification, de substitution et de réception finale',
          ],
        ),
      ),
    ],
  },
  {
    id: 'industrial-specifications',
    group: 'resources',
    division: 'industrial',
    slug: l('industrial-specification-guide', 'guide-specifications-industrielles'),
    title: l(
      'Prepare an industrial ventilation specification.',
      'Préparez les spécifications de ventilation industrielle.',
    ),
    summary: l(
      'A procurement worksheet for collecting existing design information, equipment constraints and the documents needed for a technical inquiry.',
      'Une fiche d’approvisionnement pour rassembler les données de conception, les contraintes de l’appareil et les documents nécessaires à une demande technique.',
    ),
    keyword: l(
      'industrial ventilation specification checklist',
      'liste specifications ventilation industrielle',
    ),
    inquiryCategory: 'exhaust',
    relatedCategories: ['axial', 'centrifugal', 'exhaust', 'supply'],
    sources: ['fans'],
    sections: [
      section(
        'duty',
        l('Keep airflow and pressure together', 'Regroupez le débit et la pression'),
        l(
          'Fan selection depends on more than physical size. CCOHS describes both the volume of air and the system resistance as selection considerations. Record the duty point supplied by your qualified designer, with its units and document revision.',
          'Le choix dépend de plus que les dimensions. Le CCHST présente le volume d’air et la résistance du système parmi les facteurs de sélection. Notez le point de fonctionnement fourni par votre concepteur qualifié, avec les unités et la révision du document.',
        ),
        l(
          [
            'Design airflow: value and unit, such as m³/h or CFM',
            'Specified pressure: value, unit and static/total designation',
            'Operating conditions and the source drawing or specification',
          ],
          [
            'Débit de conception : valeur et unité, par exemple m³/h ou CFM',
            'Pression spécifiée : valeur, unité et désignation statique ou totale',
            'Conditions de fonctionnement et dessin ou devis de référence',
          ],
        ),
      ),
      section(
        'interfaces',
        l('Record the physical interfaces', 'Notez les interfaces physiques'),
        l(
          'Keep measurements and existing references together. If a dimension or requirement is unknown, mark it for confirmation rather than estimating it to complete the form.',
          'Regroupez les mesures et les références existantes. Si une dimension ou une exigence est inconnue, indiquez qu’elle reste à confirmer plutôt que de l’estimer.',
        ),
        l(
          [
            'Mounting, inlet/outlet dimensions and airflow direction',
            'Voltage, phase, frequency and control interface',
            'Access envelope, service clearance and acoustic requirements',
          ],
          [
            'Montage, dimensions des raccords et sens de l’air',
            'Tension, phases, fréquence et interface de commande',
            'Encombrement, dégagement d’entretien et exigences acoustiques',
          ],
        ),
      ),
      section(
        'package',
        l('Assemble the inquiry package', 'Constituez le dossier de demande'),
        l(
          'This worksheet organizes information; it does not calculate fan size or replace engineering. Have the responsible project professional confirm the technical requirement before an order.',
          'Cette fiche organise les renseignements; elle ne dimensionne pas un ventilateur et ne remplace pas l’ingénierie. Faites confirmer les exigences techniques par le professionnel responsable avant une commande.',
        ),
        l(
          [
            'Quantity, project province and requested timeline',
            'Nameplate, relevant drawings and approved specification revision',
            'List of open questions and who will resolve them',
          ],
          [
            'Quantité, province du projet et échéancier souhaité',
            'Plaque signalétique, dessins pertinents et révision du devis approuvé',
            'Questions en suspens et responsables de leur résolution',
          ],
        ),
      ),
    ],
  },
  {
    id: 'replacement-guide',
    group: 'resources',
    division: 'industrial',
    slug: l('replacement-planning-guide', 'guide-planification-remplacement'),
    title: l(
      'Plan a replacement without losing the details.',
      'Planifiez un remplacement sans perdre les détails.',
    ),
    summary: l(
      'A step-by-step brief for facilities managers and contractors preparing an equipment replacement request.',
      'Un dossier par étapes pour les gestionnaires et entrepreneurs préparant une demande de remplacement d’équipement.',
    ),
    keyword: l(
      'fan replacement procurement checklist',
      'liste approvisionnement remplacement ventilateur',
    ),
    inquiryCategory: 'replacement',
    relatedCategories: ['roof', 'parts'],
    sources: ['maintenance'],
    sections: [
      section(
        'record',
        l('Capture the existing installation', 'Documentez l’installation existante'),
        l(
          'Create one record per unit so photos, drawings and model references cannot be confused between assets. Use information already available through your normal site documentation process.',
          'Créez une fiche par appareil pour éviter de confondre photos, dessins et modèles. Utilisez les renseignements disponibles dans vos processus habituels de documentation du site.',
        ),
        l(
          [
            'Asset ID, manufacturer/model and existing drawings',
            'Connection dimensions, mounting and controls',
            'Reason for replacement and known changes to the application',
          ],
          [
            'Identifiant de l’actif, fabricant, modèle et dessins existants',
            'Dimensions des raccords, montage et commandes',
            'Motif du remplacement et changements connus à l’application',
          ],
        ),
      ),
      section(
        'responsibilities',
        l(
          'Assign installation and acceptance roles',
          'Attribuez les rôles d’installation et de réception',
        ),
        l(
          'CCOHS identifies qualified personnel as essential to ventilation installation, testing and maintenance. In your brief, distinguish equipment supply from the professional work required at the site.',
          'Le CCHST souligne le rôle du personnel qualifié dans l’installation, les essais et l’entretien. Dans votre dossier, distinguez la fourniture de l’appareil des travaux professionnels au site.',
        ),
        l(
          [
            'Who approves the selection and any alternative',
            'Who coordinates site work and required authorizations',
            'Who receives the equipment and reviews acceptance records',
          ],
          [
            'Responsable du choix et de toute solution de rechange',
            'Responsable des travaux et des autorisations requises',
            'Responsable de la réception et de l’examen des dossiers',
          ],
        ),
      ),
      section(
        'schedule',
        l('Make timing assumptions visible', 'Rendez les hypothèses de délai visibles'),
        l(
          'Provide a requested date and explain the consequence of a delay. Keep that request separate from a supplier-confirmed lead time, which can only be established for a verified offer.',
          'Fournissez une date souhaitée et expliquez les conséquences d’un retard. Distinguez cette demande du délai confirmé par un fournisseur pour une offre vérifiée.',
        ),
        l(
          [
            'Requested delivery and shutdown dates',
            'Receiving, unloading and storage arrangements',
            'Documents required before release for purchase',
          ],
          [
            'Dates de livraison et d’arrêt souhaitées',
            'Modalités de réception, déchargement et entreposage',
            'Documents exigés avant l’autorisation d’achat',
          ],
        ),
      ),
    ],
  },
  {
    id: 'medical-procurement-guide',
    group: 'resources',
    division: 'medical',
    slug: l('medical-procurement-guide', 'guide-approvisionnement-medical'),
    title: l(
      'Build a traceable medical procurement file.',
      'Constituez un dossier d’achat médical traçable.',
    ),
    summary: l(
      'Organize an institutional request around the exact device, the approved specification and the evidence your reviewers need.',
      'Organisez une demande institutionnelle selon l’appareil exact, les spécifications approuvées et les preuves nécessaires à vos réviseurs.',
    ),
    keyword: l(
      'medical ventilator procurement documentation',
      'documentation approvisionnement ventilateur médical',
    ),
    inquiryCategory: 'procurement',
    relatedCategories: ['invasive', 'noninvasive', 'procurement'],
    sources: ['licences'],
    sections: [
      section(
        'identity',
        l('Identify the exact requested device', 'Identifiez l’appareil exact recherché'),
        l(
          'Use the institution’s approved specification and purchasing reference. A broad category name does not identify a specific configuration or demonstrate suitability.',
          'Utilisez les spécifications approuvées et la référence d’achat de l’établissement. Une catégorie générale n’identifie pas une configuration précise et n’en démontre pas l’adéquation.',
        ),
        l(
          [
            'Manufacturer, model and device identifier where available',
            'Requested configuration and separately listed accessories',
            'Quantity, receiving province and procurement deadline',
          ],
          [
            'Fabricant, modèle et identifiant de l’instrument disponible',
            'Configuration recherchée et accessoires énumérés séparément',
            'Quantité, province de réception et échéance d’achat',
          ],
        ),
      ),
      section(
        'evidence',
        l('Review current evidence', 'Examinez les preuves à jour'),
        l(
          'Health Canada provides active and archived licence searches and recommends checking the current status when a purchase is considered. Have your regulatory reviewer determine which records apply to the exact device and supply activity.',
          'Santé Canada offre des recherches d’homologations actives et archivées et recommande de vérifier le statut au moment d’un achat envisagé. Confiez à votre responsable réglementaire l’identification des dossiers applicables à l’appareil et à l’activité de fourniture.',
        ),
        l(
          [
            'Current device-specific evidence and date checked',
            'Supplier identity, written authority and scope',
            'Separate review of establishment obligations, exceptions and applicable requirements',
          ],
          [
            'Preuves propres à l’appareil et date de vérification',
            'Identité du fournisseur, autorisation écrite et portée',
            'Examen distinct des obligations d’établissement, exceptions et exigences applicables',
          ],
        ),
      ),
      section(
        'acceptance',
        l('Define the handover requirements', 'Définissez les exigences de remise'),
        l(
          'Keep clinical decisions with qualified healthcare professionals. Record the procurement evidence and acceptance process without including patient information in the inquiry.',
          'Confiez les décisions cliniques aux professionnels de la santé qualifiés. Documentez les preuves d’achat et le processus de réception sans joindre de renseignements sur les patients.',
        ),
        l(
          [
            'Document language, revision and traceability requirements',
            'Required receiving checks defined by the institution',
            'Separate approval of any training, installation or service scope',
          ],
          [
            'Langue, révision et traçabilité des documents',
            'Contrôles de réception définis par l’établissement',
            'Approbation distincte de toute formation, installation ou intervention',
          ],
        ),
      ),
    ],
  },
  {
    id: 'accessory-guide',
    group: 'resources',
    division: 'medical',
    slug: l('accessory-identification-guide', 'guide-identification-accessoires'),
    title: l(
      'Identify an accessory before requesting it.',
      'Identifiez un accessoire avant de le demander.',
    ),
    summary: l(
      'A practical reference sheet for biomedical and purchasing teams gathering exact device and accessory identifiers.',
      'Une fiche de référence pour les équipes biomédicales et d’achats qui rassemblent les identifiants exacts d’un appareil et de ses accessoires.',
    ),
    keyword: l(
      'respiratory accessory identification checklist',
      'liste identification accessoire respiratoire',
    ),
    inquiryCategory: 'accessories',
    relatedCategories: ['accessories', 'procurement'],
    sources: [],
    sections: [
      section(
        'reference',
        l('Use the manufacturer reference', 'Utilisez la référence du fabricant'),
        l(
          'A descriptive name or appearance is not enough to establish an exact accessory match. Record the part reference and the source document alongside the device identification.',
          'Un nom descriptif ou une apparence ne suffit pas à établir une correspondance exacte. Notez la référence de pièce et le document source avec l’identification de l’appareil.',
        ),
        l(
          [
            'Device manufacturer, exact model and configuration',
            'Accessory manufacturer and part/reference number',
            'Source document title, revision and relevant page',
          ],
          [
            'Fabricant de l’appareil, modèle exact et configuration',
            'Fabricant de l’accessoire et numéro de pièce ou référence',
            'Titre, révision et page pertinente du document source',
          ],
        ),
      ),
      section(
        'review',
        l(
          'Keep compatibility unconfirmed until evidenced',
          'Laissez la compatibilité à confirmer sans preuve',
        ),
        l(
          'Ask the responsible institutional reviewer to verify manufacturer evidence for the exact combination. An inquiry, visual resemblance or shared category does not establish compatibility.',
          'Demandez au responsable de l’établissement de vérifier les preuves du fabricant pour la combinaison exacte. Une demande, une ressemblance ou une catégorie commune ne démontre pas la compatibilité.',
        ),
        l(
          [
            'Quantity and packaging reference',
            'Required traceability and documentation',
            'Approval process for any proposed substitute',
          ],
          [
            'Quantité et référence du conditionnement',
            'Traçabilité et documents exigés',
            'Processus d’approbation de toute substitution proposée',
          ],
        ),
      ),
    ],
  },
];

export const detailPath = (locale: Locale, page: DetailPage) =>
  `${pathFor(locale, page.group)}${page.slug[locale]}/`;
export const serviceOptions = [
  { id: 'repair', division: 'industrial', name: l('Fan repair inquiry', 'Demande de réparation') },
  { id: 'maintenance', division: 'industrial', name: l('Maintenance scope', 'Portée d’entretien') },
  {
    id: 'installation',
    division: 'industrial',
    name: l('Installation coordination', 'Coordination d’installation'),
  },
  {
    id: 'replacement',
    division: 'industrial',
    name: l('Equipment replacement', 'Remplacement d’équipement'),
  },
  {
    id: 'technical-support',
    division: 'medical',
    name: l('Technical support inquiry', 'Demande de soutien technique'),
  },
] as const;
