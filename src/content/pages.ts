import type { Localized } from './catalog';
import { faqTopics } from './faq';
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
      sections: faqTopics.flatMap((topic) =>
        topic.answers.map((item) => ({ title: item.question.en, body: item.answer.en })),
      ),
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
        'This notice explains how Ventilators.ca handles website inquiries and optional analytics. You review your details before choosing to send them through Formspree.',
      sections: [
        {
          title: 'Inquiry information and sending',
          body: 'The form collects your name, organization, work email, optional phone number, province, equipment or service requirements, quantity, timeline, priority and project details. Entries remain in the open page until you select Send inquiry. We send them to Formspree with the language, inquiry reference and consent record so your request can be processed and answered. Formspree stores submissions and routes notifications to the configured business inbox. It may also process IP address, browser and request information for security and spam prevention. Formspree processes information in the United States and other countries where it operates; processing is not limited to Canada. Do not include patient information or sensitive documents.',
        },
        {
          title: 'Hosting and technical records',
          body: 'Web Hosting Canada (WHC) hosts this website. Requests may be recorded in hosting access and security logs, including an IP address, requested page, time and browser information. These records support site operation and security. The WHC website does not maintain a lead database. Advertising features are not enabled. Inquiry records are handled by Formspree and the business email service. File uploads are not enabled. The form does not save drafts in persistent browser storage. Copying a summary places it on your clipboard only at your request.',
        },
        {
          title: 'Optional analytics and your choice',
          body: 'Google Analytics loads only if you select Allow analytics. It uses first-party cookies to measure visits, public page paths and general actions such as choosing a category, starting or sending an inquiry, changing language, or clicking a phone or email link. We do not send form entries, inquiry references, query strings or referring URLs to Analytics. Google also processes technical information such as browser, device and network information to provide analytics, potentially outside Canada. Advertising features, Google signals and automatic form tracking are disabled. Your analytics choice is separate from consent to send an inquiry. Declining does not affect browsing or inquiries.',
        },
        {
          title: 'Changing your analytics preference',
          body: 'Use Analytics preferences in the footer to allow or decline analytics at any time. We store only your choice and its dates in your browser for 180 days; analytics cookies have a maximum lifetime of 180 days. If storage is unavailable, your choice applies to the open page only. Withdrawing stops further collection and removes this site’s analytics cookies without clearing your inquiry. It does not erase information already sent. Google Analytics user and event data retention is set to two months without resetting on new activity; aggregated reports may be retained longer. Contact us with privacy questions or deletion requests.',
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
      sections: faqTopics.flatMap((topic) =>
        topic.answers.map((item) => ({ title: item.question.fr, body: item.answer.fr })),
      ),
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
        'Cet avis explique le traitement des demandes et les mesures analytiques facultatives sur Ventilators.ca. Vous vérifiez vos renseignements avant de choisir de les envoyer par Formspree.',
      sections: [
        {
          title: 'Renseignements et envoi d’une demande',
          body: 'Le formulaire recueille votre nom, organisation, courriel professionnel, téléphone facultatif, province, besoins en équipement ou service, quantité, échéancier, priorité et détails du projet. Ces renseignements restent dans la page ouverte jusqu’à ce que vous sélectionniez Envoyer la demande. Ils sont alors transmis à Formspree avec la langue, une référence et une trace du consentement pour traiter votre demande et y répondre. Formspree conserve les demandes et transmet les notifications à la boîte professionnelle configurée. Il peut aussi traiter l’adresse IP et des renseignements sur le navigateur et la requête pour la sécurité et la prévention du pourriel. Formspree traite des renseignements aux États-Unis et dans d’autres pays où il exerce ses activités; le traitement n’est pas limité au Canada. N’incluez aucun renseignement sur les patients ni document sensible.',
        },
        {
          title: 'Hébergement et données techniques',
          body: 'Web Hosting Canada (WHC) héberge ce site. Les requêtes peuvent être consignées dans des journaux d’accès et de sécurité, avec notamment l’adresse IP, la page demandée, l’heure et des renseignements sur le navigateur. Ces données servent au fonctionnement et à la sécurité du site. Le site hébergé chez WHC ne conserve aucune base de demandes. Les fonctions publicitaires ne sont pas activées. Les demandes sont traitées par Formspree et le service de messagerie de l’entreprise. Le téléversement n’est pas activé. Aucun brouillon n’est enregistré dans le stockage persistant du navigateur. La copie place le résumé dans le presse-papiers seulement à votre demande.',
        },
        {
          title: 'Analyse facultative et votre choix',
          body: 'Google Analytics se charge uniquement si vous sélectionnez Autoriser l’analyse. Il utilise des témoins internes pour mesurer les visites, les chemins des pages publiques et des actions générales : choisir une catégorie, commencer ou envoyer une demande, changer de langue ou cliquer sur un lien téléphonique ou de courriel. Nous ne transmettons ni le contenu du formulaire, ni les références des demandes, ni les paramètres des URL, ni les URL de provenance à Analytics. Google traite aussi des renseignements techniques sur le navigateur, l’appareil et le réseau pour fournir ce service, possiblement à l’extérieur du Canada. Les fonctions publicitaires, les signaux Google et le suivi automatique des formulaires sont désactivés. Ce choix est distinct du consentement à envoyer une demande. Un refus ne limite ni la navigation ni les demandes.',
        },
        {
          title: 'Modifier votre préférence analytique',
          body: 'Utilisez Préférences analytiques au pied de page pour autoriser ou refuser l’analyse à tout moment. Seuls votre choix et ses dates sont conservés dans votre navigateur pendant 180 jours; les témoins analytiques ont une durée maximale de 180 jours. Si le stockage est indisponible, votre choix s’applique seulement à la page ouverte. Le retrait arrête la collecte et supprime les témoins analytiques de ce site sans effacer votre demande. Il ne supprime pas les renseignements déjà transmis. La conservation des données utilisateur et événement de Google Analytics est réglée à deux mois, sans renouvellement lors d’une nouvelle activité; les rapports agrégés peuvent être conservés plus longtemps. Contactez-nous pour toute question de confidentialité ou demande de suppression.',
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
