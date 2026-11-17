import type { Localized } from './catalog';
import type { PageKey } from './site';

export type ArticleKey = Exclude<PageKey, 'home' | 'industrial' | 'medical' | 'products' | 'quote'>;
export interface Article {
  eyebrow: string;
  title: string;
  intro: string;
  sections: { title: string; body: string; items?: string[] }[];
}
export const articles: Localized<Record<ArticleKey, Article>> = {
  en: {
    services: {
      eyebrow: 'SCOPE BEFORE COMMITMENT',
      title: 'Start with the service you need.',
      intro:
        'Tell us what equipment you have, where it is located and the work you need considered.',
      sections: [
        {
          title: 'Industrial service inquiries',
          body: 'Repair, maintenance, replacement and installation coordination begin with a defined scope. Trade qualifications, insurance, site requirements and partner availability must be verified before services are offered.',
          items: [
            'Equipment manufacturer, model and current condition',
            'Site location, access constraints and planned shutdown window',
            'Requested inspection, repair or installation scope',
          ],
        },
        {
          title: 'Medical technical support inquiries',
          body: 'Requests for technical support are reviewed against the equipment documentation and any required manufacturer authorization. We do not claim authorized servicing, training or clinical support for unverified devices.',
          items: [
            'Device identification and institutional contact',
            'Requested documentation or authorized service scope',
            'No patient information or clinical records',
          ],
        },
      ],
    },
    industries: {
      eyebrow: 'YOUR OPERATING ENVIRONMENT',
      title: 'Different settings. Different requirements.',
      intro:
        'A useful inquiry starts with the way your facility operates and the requirements your team has already established.',
      sections: [
        {
          title: 'Manufacturing & warehouses',
          body: 'Describe operating hours, the process, existing ventilation and any planned changes. Include specifications prepared by your qualified design team, particularly for dust, temperature or process exhaust.',
        },
        {
          title: 'Commercial facilities',
          body: 'For replacement and building ventilation inquiries, record roof access, electrical supply, controls and the existing unit nameplate. Identify tenant access restrictions and planned work windows.',
        },
        {
          title: 'Hospitals, clinics & institutions',
          body: 'Provide institutional procurement specifications, required documentation and tender timelines. Medical equipment inquiries are reviewed separately from building ventilation requirements.',
        },
      ],
    },
    about: {
      eyebrow: 'ABOUT VENTILATORS.CA',
      title: 'Two divisions. A clear point of contact.',
      intro:
        'Ventilators.ca is a Grafov Group project focused on industrial ventilation inquiries and institutional medical equipment procurement in Canada.',
      sections: [
        {
          title: 'A dedicated path for each requirement',
          body: 'Industrial facilities and healthcare institutions have different technical, documentation and procurement needs. Separate inquiry paths keep those requirements clear from the beginning.',
        },
        {
          title: 'Clear information before an offer',
          body: 'We ask for the details needed to assess an inquiry. Supplier availability, compatibility, regulatory evidence and service scope must be confirmed before they are represented as verified.',
        },
        {
          title: 'English and French',
          body: 'Explore the site and prepare inquiries in either language. Our listed contact is info@ventilators.ca or (833) 696-9996. No physical office location is represented on this site.',
        },
      ],
    },
    resources: {
      eyebrow: 'PREPARE A BETTER INQUIRY',
      title: 'A little preparation. A clearer conversation.',
      intro:
        'Use these checklists to collect project details before requesting equipment or procurement information.',
      sections: [
        {
          title: 'Industrial specification checklist',
          body: 'Record the application, nameplate, airflow and static pressure with units, electrical supply, dimensions, quantity, location and timeline. A checklist organizes an inquiry; it does not replace professional engineering or equipment selection.',
        },
        {
          title: 'Medical procurement checklist',
          body: 'Record the requested manufacturer/model, institutional specification, quantities, delivery province, tender deadline and required supplier and regulatory evidence. Include no patient information. Device selection remains with qualified healthcare professionals.',
        },
        {
          title: 'Documentation before ordering',
          body: 'Keep original manufacturer documentation and your organization’s purchasing requirements available. Exact specifications and supporting evidence should be reviewed before compatibility or availability is accepted.',
        },
      ],
    },
    faq: {
      eyebrow: 'COMMON QUESTIONS',
      title: 'Before you request a quote.',
      intro:
        'Practical answers about equipment inquiries, documentation and contacting Ventilators.ca.',
      sections: [
        {
          title: 'Can I buy equipment directly on the website?',
          body: 'No. This is an inquiry-led website with no checkout. A model listing or category does not confirm price, stock or availability.',
        },
        {
          title: 'What do I need for an industrial replacement inquiry?',
          body: 'Start with the manufacturer, model, nameplate details, dimensions, electrical supply and operating specifications. Include the site province, quantity and timeline.',
        },
        {
          title: 'Are the medical devices licensed or available?',
          body: 'No device-specific licensing or availability is asserted on this website. Regulatory evidence, supplier authorization and compatibility must be verified for a specific offer.',
        },
        {
          title: 'Does the online form send my request?',
          body: 'The inquiry builder prepares a summary in your browser. Review it, copy it into an email to info@ventilators.ca and send it from your email service, or call us. The website does not automatically send your entries.',
        },
        {
          title: 'Can I include patient information?',
          body: 'No. Do not include patient names, health records or other personal health information in an inquiry or email.',
        },
        {
          title: 'Do you have an office in my province?',
          body: 'This site accepts inquiries about projects across Canada and does not claim local offices. Specific supply and service coverage must be confirmed for your location.',
        },
      ],
    },
    contact: {
      eyebrow: 'LET’S TALK ABOUT YOUR PROJECT',
      title: 'Start a conversation.',
      intro:
        'For industrial ventilation or institutional medical procurement, contact us with your division, location and requirements.',
      sections: [
        {
          title: 'Industrial inquiries',
          body: 'Include the application, existing equipment model, relevant specifications, quantity and project timeline.',
        },
        {
          title: 'Medical inquiries',
          body: 'Include your institution, requested manufacturer/model and procurement documentation requirements. Do not include patient information.',
        },
      ],
    },
    privacy: {
      eyebrow: 'HOW THIS WEBSITE HANDLES INFORMATION',
      title: 'Privacy notice.',
      intro:
        'This notice describes the current Ventilators.ca website. The inquiry builder works in your browser; it does not submit your information to us.',
      sections: [
        {
          title: 'Inquiry preparation',
          body: 'Your entries are used in the open page to validate and display an inquiry summary. The website does not send them to a server or save them in persistent browser storage. The copy button places the summary on your clipboard only when you choose it. The email link opens your email service; you decide what to include and when to send.',
        },
        {
          title: 'Hosting and technical records',
          body: 'Web Hosting Canada (WHC) hosts this website. Requests may be recorded in hosting access and security logs, including an IP address, requested page, time and browser information. These records support site operation and security. The website application does not maintain a lead database or add analytics or advertising tags. File uploads are not enabled.',
        },
        {
          title: 'Direct contact and privacy requests',
          body: 'Calling or emailing uses your chosen phone or email service. Share only the business information needed for your inquiry; do not send patient information or sensitive documents. For questions about information you provide, including access, correction, retention or deletion requests, contact info@ventilators.ca or (833) 696-9996. Provider processing and retention also depend on the services used for that communication.',
        },
      ],
    },
    terms: {
      eyebrow: 'USING VENTILATORS.CA',
      title: 'Website terms of use.',
      intro:
        'This website provides equipment-category information and tools to prepare an inquiry. A purchase or service engagement requires a separately confirmed scope and commercial terms.',
      sections: [
        {
          title: 'Inquiries and product information',
          body: 'Category descriptions are not offers to sell a particular product. No price, stock, delivery date, manufacturer relationship or device-specific authorization is guaranteed or represented as verified. Preparing an inquiry does not place an order or reserve equipment.',
        },
        {
          title: 'Technical and medical information',
          body: 'Content does not replace qualified engineering, regulatory or clinical review. Medical information is for institutional procurement context and is not patient advice. Suitability and compatibility need specific supporting evidence. Illustrations are conceptual; contextual photographs do not identify our inventory, facilities or customers.',
        },
        {
          title: 'Contact and commercial terms',
          body: 'For questions about this website or an inquiry, contact info@ventilators.ca or (833) 696-9996. Prices, warranties, service scope, delivery conditions and any required authorizations must be established for a specific verified offer. This website is not an emergency or clinical support channel.',
        },
      ],
    },
    accessibility: {
      eyebrow: 'ACCESS FOR EVERY VISITOR',
      title: 'Accessibility statement.',
      intro:
        'We are building toward WCAG 2.2 AA. This is a development target, not a claim of completed conformance.',
      sections: [
        {
          title: 'Current features',
          body: 'The site includes keyboard navigation, visible focus, a skip link, labelled form controls, localized validation messages, responsive layouts and reduced-motion support.',
        },
        {
          title: 'Ongoing review',
          body: 'Automated checks do not replace manual assistive-technology testing. Full screen-reader, mobile-device and editorial reviews remain part of the release process.',
        },
        {
          title: 'Report a barrier',
          body: 'Email info@ventilators.ca or call (833) 696-9996. Describe the page, what you were trying to do and the assistive technology involved, if relevant. Avoid including sensitive information.',
        },
      ],
    },
  },
  fr: {
    services: {
      eyebrow: 'DÉFINIR AVANT DE S’ENGAGER',
      title: 'Précisez le service recherché.',
      intro: 'Décrivez votre équipement, son emplacement et les travaux à envisager.',
      sections: [
        {
          title: 'Demandes de services industriels',
          body: 'La réparation, l’entretien, le remplacement et la coordination de l’installation commencent par une portée définie. Les qualifications, les assurances, les exigences du site et la disponibilité des partenaires doivent être vérifiées avant toute offre.',
          items: [
            'Fabricant, modèle et état actuel de l’équipement',
            'Lieu, contraintes d’accès et période d’arrêt prévue',
            'Portée de l’inspection, de la réparation ou de l’installation',
          ],
        },
        {
          title: 'Demandes de soutien technique médical',
          body: 'Les demandes sont examinées selon la documentation de l’appareil et les autorisations requises du fabricant. Nous ne prétendons pas offrir de service autorisé, de formation ou de soutien clinique pour des appareils non vérifiés.',
          items: [
            'Identification de l’appareil et personne-ressource de l’établissement',
            'Documentation ou portée du service autorisé demandé',
            'Aucun renseignement sur les patients ni dossier clinique',
          ],
        },
      ],
    },
    industries: {
      eyebrow: 'VOTRE MILIEU DE TRAVAIL',
      title: 'Des milieux différents. Des exigences distinctes.',
      intro:
        'Une demande utile décrit le fonctionnement de votre installation et les exigences déjà établies par votre équipe.',
      sections: [
        {
          title: 'Fabrication et entrepôts',
          body: 'Décrivez les heures d’activité, le procédé, la ventilation existante et les changements prévus. Joignez les spécifications de votre équipe de conception qualifiée, notamment pour la poussière, la température ou l’extraction de procédé.',
        },
        {
          title: 'Bâtiments commerciaux',
          body: 'Pour le remplacement et la ventilation du bâtiment, notez l’accès au toit, l’alimentation électrique, les commandes et la plaque signalétique. Précisez les contraintes d’accès et les périodes de travaux possibles.',
        },
        {
          title: 'Hôpitaux, cliniques et établissements',
          body: 'Fournissez les spécifications d’achat, les documents requis et les échéances de l’appel d’offres. Les demandes d’équipement médical sont traitées séparément des besoins de ventilation du bâtiment.',
        },
      ],
    },
    about: {
      eyebrow: 'À PROPOS DE VENTILATORS.CA',
      title: 'Deux divisions. Un point de contact clair.',
      intro:
        'Ventilators.ca est un projet de Grafov Group consacré aux demandes de ventilation industrielle et d’approvisionnement médical institutionnel au Canada.',
      sections: [
        {
          title: 'Une démarche adaptée à chaque besoin',
          body: 'Les installations industrielles et les établissements de santé ont des besoins techniques, documentaires et d’achat distincts. Des parcours séparés permettent de les préciser dès le départ.',
        },
        {
          title: 'Des renseignements clairs avant toute offre',
          body: 'Nous demandons les détails nécessaires pour évaluer votre demande. La disponibilité, la compatibilité, les preuves réglementaires et la portée des services doivent être confirmées avant d’être présentées comme vérifiées.',
        },
        {
          title: 'En français et en anglais',
          body: 'Consultez le site et préparez votre demande dans la langue de votre choix. Vous pouvez nous joindre à info@ventilators.ca ou au (833) 696-9996. Ce site ne présente aucun bureau physique.',
        },
      ],
    },
    resources: {
      eyebrow: 'BIEN PRÉPARER VOTRE DEMANDE',
      title: 'Mieux se préparer. Mieux se comprendre.',
      intro:
        'Utilisez ces listes pour rassembler les renseignements de votre projet avant une demande d’équipement ou d’approvisionnement.',
      sections: [
        {
          title: 'Liste de spécifications industrielles',
          body: 'Notez l’application, la plaque signalétique, le débit et la pression statique avec leurs unités, l’alimentation électrique, les dimensions, la quantité, le lieu et l’échéancier. Cette liste organise la demande; elle ne remplace pas l’ingénierie ni la sélection professionnelle.',
        },
        {
          title: 'Liste d’approvisionnement médical',
          body: 'Notez le fabricant et le modèle souhaités, les spécifications de l’établissement, les quantités, la province, l’échéance et les preuves réglementaires et du fournisseur exigées. N’incluez aucune donnée de patient. La sélection clinique relève de professionnels qualifiés.',
        },
        {
          title: 'La documentation avant la commande',
          body: 'Gardez à portée de main la documentation du fabricant et les exigences d’achat de votre organisation. Les spécifications exactes et les preuves doivent être examinées avant de confirmer la compatibilité ou la disponibilité.',
        },
      ],
    },
    faq: {
      eyebrow: 'QUESTIONS FRÉQUENTES',
      title: 'Avant de demander une soumission.',
      intro:
        'Des réponses pratiques sur les demandes d’équipement, les documents et les façons de joindre Ventilators.ca.',
      sections: [
        {
          title: 'Puis-je acheter directement sur le site?',
          body: 'Non. Le site sert aux demandes de renseignements et ne comporte pas de paiement en ligne. Une catégorie ne confirme aucun prix, stock ou délai.',
        },
        {
          title: 'Quels détails fournir pour un remplacement industriel?',
          body: 'Commencez par le fabricant, le modèle, la plaque signalétique, les dimensions, l’alimentation électrique et les spécifications de fonctionnement. Ajoutez la province, la quantité et l’échéancier.',
        },
        {
          title: 'Les appareils médicaux sont-ils homologués ou disponibles?',
          body: 'Ce site ne confirme aucune homologation ni disponibilité d’un appareil précis. Les preuves réglementaires, l’autorisation du fournisseur et la compatibilité doivent être vérifiées pour chaque offre.',
        },
        {
          title: 'Le formulaire envoie-t-il ma demande?',
          body: 'Le formulaire prépare un résumé dans votre navigateur. Vérifiez-le, copiez-le dans un courriel à info@ventilators.ca et envoyez-le depuis votre service de courriel, ou appelez-nous. Le site n’envoie pas automatiquement vos renseignements.',
        },
        {
          title: 'Puis-je inclure des renseignements sur les patients?',
          body: 'Non. N’incluez aucun nom de patient, dossier médical ou autre renseignement personnel sur la santé dans une demande ou un courriel.',
        },
        {
          title: 'Avez-vous un bureau dans ma province?',
          body: 'Le site accueille les demandes de projets partout au Canada sans prétendre disposer de bureaux locaux. La couverture d’approvisionnement et de services doit être confirmée pour votre lieu.',
        },
      ],
    },
    contact: {
      eyebrow: 'PARLONS DE VOTRE PROJET',
      title: 'Amorçons la conversation.',
      intro:
        'Pour la ventilation industrielle ou l’approvisionnement médical institutionnel, précisez votre division, votre lieu et vos besoins.',
      sections: [
        {
          title: 'Demandes industrielles',
          body: 'Indiquez l’application, le modèle existant, les spécifications pertinentes, la quantité et l’échéancier du projet.',
        },
        {
          title: 'Demandes médicales',
          body: 'Indiquez votre établissement, le fabricant et le modèle souhaités ainsi que les documents d’achat exigés. N’incluez aucun renseignement sur les patients.',
        },
      ],
    },
    privacy: {
      eyebrow: 'TRAITEMENT DES RENSEIGNEMENTS SUR CE SITE',
      title: 'Avis de confidentialité.',
      intro:
        'Cet avis décrit le site actuel de Ventilators.ca. Le formulaire de préparation fonctionne dans votre navigateur; il ne nous transmet pas vos renseignements.',
      sections: [
        {
          title: 'Préparation d’une demande',
          body: 'Vos renseignements servent à valider et à afficher un résumé dans la page ouverte. Le site ne les transmet pas à un serveur et ne les conserve pas dans le stockage persistant du navigateur. Le bouton de copie place le résumé dans votre presse-papiers seulement à votre demande. Le lien de courriel ouvre votre service de messagerie; vous choisissez le contenu et le moment de l’envoi.',
        },
        {
          title: 'Hébergement et données techniques',
          body: 'Web Hosting Canada (WHC) héberge ce site. Les requêtes peuvent être consignées dans des journaux d’accès et de sécurité, avec notamment l’adresse IP, la page demandée, l’heure et des renseignements sur le navigateur. Ces données servent au fonctionnement et à la sécurité du site. L’application ne conserve aucune base de demandes et n’ajoute aucune balise analytique ou publicitaire. Le téléversement de fichiers n’est pas activé.',
        },
        {
          title: 'Contact direct et demandes de confidentialité',
          body: 'Un appel ou un courriel utilise le service que vous choisissez. Partagez seulement les renseignements professionnels nécessaires; n’envoyez aucun renseignement sur les patients ni document sensible. Pour toute question sur les renseignements fournis, y compris l’accès, la correction, la conservation ou la suppression, joignez info@ventilators.ca ou le (833) 696-9996. Le traitement et la conservation par les prestataires dépendent aussi des services utilisés pour la communication.',
        },
      ],
    },
    terms: {
      eyebrow: 'UTILISATION DE VENTILATORS.CA',
      title: 'Conditions d’utilisation.',
      intro:
        'Ce site présente des catégories d’équipement et des outils pour préparer une demande. Un achat ou un service exige une portée et des conditions commerciales confirmées séparément.',
      sections: [
        {
          title: 'Demandes et renseignements sur les produits',
          body: 'Les descriptions ne constituent pas une offre de vente d’un produit précis. Aucun prix, stock, délai, lien avec un fabricant ou autorisation propre à un appareil n’est garanti ou présenté comme vérifié. Préparer une demande ne constitue ni une commande ni une réservation d’équipement.',
        },
        {
          title: 'Renseignements techniques et médicaux',
          body: 'Le contenu ne remplace pas une analyse qualifiée en ingénierie, en réglementation ou en clinique. L’information médicale concerne l’approvisionnement institutionnel et ne constitue pas un conseil aux patients. L’adéquation et la compatibilité exigent des preuves précises. Les illustrations sont conceptuelles; les photos de contexte ne représentent pas nos stocks, établissements ou clients.',
        },
        {
          title: 'Contact et conditions commerciales',
          body: 'Pour toute question sur le site ou une demande, écrivez à info@ventilators.ca ou appelez le (833) 696-9996. Les prix, garanties, services, conditions de livraison et autorisations requises doivent être établis pour une offre précise et vérifiée. Ce site n’est pas un service d’urgence ou de soutien clinique.',
        },
      ],
    },
    accessibility: {
      eyebrow: 'UN ACCÈS POUR CHAQUE VISITEUR',
      title: 'Déclaration d’accessibilité.',
      intro:
        'Nous visons les WCAG 2.2, niveau AA. Il s’agit d’un objectif de développement, et non d’une conformité entièrement vérifiée.',
      sections: [
        {
          title: 'Fonctions actuelles',
          body: 'Le site comprend la navigation au clavier, un indicateur de focus visible, un lien d’évitement, des champs étiquetés, des messages de validation traduits, une mise en page adaptative et la réduction des animations.',
        },
        {
          title: 'Révision en cours',
          body: 'Les contrôles automatisés ne remplacent pas les essais manuels avec des technologies d’assistance. La révision complète avec lecteur d’écran, sur appareils mobiles et sur le plan éditorial fait partie du processus de lancement.',
        },
        {
          title: 'Signaler un obstacle',
          body: 'Écrivez à info@ventilators.ca ou appelez le (833) 696-9996. Décrivez la page, l’action souhaitée et, au besoin, la technologie d’assistance utilisée. Évitez les renseignements sensibles.',
        },
      ],
    },
  },
};
