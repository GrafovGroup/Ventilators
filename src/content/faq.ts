import type { Localized } from './catalog';
import type { PageKey } from './site';

const l = (en: string, fr: string): Localized<string> => ({ en, fr });
export type AnswerLink = { label: Localized<string> } & ({ page: PageKey } | { detail: string });
export type BuyerAnswer = {
  id: string;
  question: Localized<string>;
  answer: Localized<string>;
  link: AnswerLink;
};
export const faqTopics: { id: string; title: Localized<string>; answers: BuyerAnswer[] }[] = [
  {
    id: 'inquiries',
    title: l('Sending and following up', 'Envoi et suivi'),
    answers: [
      {
        id: 'online-purchase',
        question: l(
          'Can I buy equipment directly on the website?',
          'Puis-je acheter un équipement directement sur le site?',
        ),
        answer: l(
          'No. The catalogue organizes inquiries; there is no checkout. A category page does not confirm a model, price, stock or delivery date. Any specific offer needs separate verification and commercial terms.',
          'Non. Le catalogue sert à préparer des demandes; il n’y a pas de paiement en ligne. Une catégorie ne confirme aucun modèle, prix, stock ou délai. Toute offre précise exige des vérifications et des conditions commerciales distinctes.',
        ),
        link: {
          page: 'products',
          label: l(
            'Browse inquiry-only equipment categories',
            'Parcourir les catégories sur demande',
          ),
        },
      },
      {
        id: 'unknown-requirements',
        question: l(
          'Can I inquire before I know the model, quantity or timing?',
          'Puis-je faire une demande sans connaître le modèle, la quantité ou l’échéancier?',
        ),
        answer: l(
          'Yes. Describe your project and provide your business contact details, province and division. Technical details, quantity and timing are optional. If the category is unclear, select “Not sure yet” in the equipment or service field.',
          'Oui. Décrivez le projet et indiquez vos coordonnées professionnelles, la province et la division. Les détails techniques, la quantité et l’échéancier sont facultatifs. Si la catégorie est incertaine, choisissez « Je ne sais pas encore » dans le champ Équipement ou service.',
        ),
        link: {
          page: 'quote',
          label: l(
            'Prepare an inquiry with what you know',
            'Préparer une demande avec les renseignements connus',
          ),
        },
      },
      {
        id: 'sending-an-inquiry',
        question: l(
          'When does the form send my inquiry?',
          'Quand le formulaire envoie-t-il ma demande?',
        ),
        answer: l(
          'Review inquiry prepares a summary in your browser without sending it. Check the summary, then select Send inquiry to submit through Formspree. The accepted message confirms processing, not equipment availability or a purchase. Keep the displayed reference for follow-up.',
          'Vérifier la demande prépare un résumé dans votre navigateur sans l’envoyer. Vérifiez-le, puis choisissez Envoyer la demande pour le transmettre par Formspree. Le message d’acceptation confirme le traitement, sans confirmer la disponibilité ni un achat. Conservez la référence pour le suivi.',
        ),
        link: {
          page: 'quote',
          label: l(
            'Open the review-and-send form',
            'Ouvrir le formulaire de vérification et d’envoi',
          ),
        },
      },
      {
        id: 'unconfirmed-delivery',
        question: l(
          'What if the form cannot confirm receipt?',
          'Que faire si le formulaire ne confirme pas la réception?',
        ),
        answer: l(
          'Keep the page open: your reviewed details and reference remain available. Use the retry button, copy the summary for an email, or call us with the reference. A pending or failed confirmation does not tell you whether an earlier attempt reached the provider, so use the same reference when following up.',
          'Gardez la page ouverte : les renseignements vérifiés et la référence restent disponibles. Réessayez, copiez le résumé dans un courriel ou appelez avec la référence. Une confirmation en attente ou en échec ne permet pas de savoir si une tentative a atteint le prestataire; utilisez la même référence pour le suivi.',
        ),
        link: {
          page: 'contact',
          label: l('Contact us about an inquiry', 'Nous joindre au sujet d’une demande'),
        },
      },
      {
        id: 'documents-and-uploads',
        question: l(
          'Can I attach drawings or specifications?',
          'Puis-je joindre des dessins ou des spécifications?',
        ),
        answer: l(
          'Uploads are not enabled. Describe the documents you have and identify their title or revision in the project details. Do not paste sensitive documents or patient information. Any later document exchange must be arranged separately.',
          'Le téléversement est désactivé. Décrivez les documents disponibles et indiquez leur titre ou révision dans les détails du projet. Ne collez aucun document sensible ni renseignement sur un patient. Tout échange ultérieur doit être convenu séparément.',
        ),
        link: {
          page: 'resources',
          label: l('Use the preparation guides', 'Consulter les guides de préparation'),
        },
      },
    ],
  },
  {
    id: 'industrial',
    title: l('Industrial equipment and services', 'Équipement et services industriels'),
    answers: [
      {
        id: 'industrial-replacement',
        question: l(
          'What should I prepare for an industrial fan replacement?',
          'Que préparer pour le remplacement d’un ventilateur industriel?',
        ),
        answer: l(
          'Start with the existing manufacturer/model, nameplate information and interface drawings. Add the design duty and units when known, then distinguish equipment supply from installation, electrical work and site coordination. Mark missing information as unconfirmed.',
          'Commencez par le fabricant, le modèle, la plaque signalétique et les dessins d’interface. Ajoutez le fonctionnement prévu et les unités connus, puis distinguez la fourniture de l’installation, des travaux électriques et de la coordination. Indiquez les renseignements non confirmés.',
        ),
        link: {
          detail: 'replacement-guide',
          label: l(
            'Read the replacement planning checklist',
            'Consulter la liste de planification du remplacement',
          ),
        },
      },
      {
        id: 'service-scope',
        question: l(
          'Does an equipment inquiry include installation or maintenance?',
          'Une demande d’équipement comprend-elle l’installation ou l’entretien?',
        ),
        answer: l(
          'Include these services explicitly if you want them considered. Describe the site, access, requested work and project schedule. Service scope, trade qualifications and partner availability must be confirmed separately; the website does not establish in-house capability.',
          'Demandez ces services explicitement si vous souhaitez les faire examiner. Décrivez le lieu, l’accès, les travaux et l’échéancier. La portée, les qualifications et la disponibilité des partenaires doivent être confirmées séparément; le site n’établit aucune capacité à l’interne.',
        ),
        link: {
          page: 'services',
          label: l('Explore service inquiry scopes', 'Explorer les portées de services'),
        },
      },
      {
        id: 'project-location',
        question: l(
          'Can I inquire from my province or territory?',
          'Puis-je faire une demande depuis ma province ou mon territoire?',
        ),
        answer: l(
          'We welcome project inquiries from across Canada. Provide the actual project location so supply and service coverage can be assessed. This does not confirm local stock, an office, an installer or a delivery commitment in that location.',
          'Nous accueillons les demandes de projets partout au Canada. Indiquez le lieu réel pour permettre l’évaluation de la couverture. Cela ne confirme ni stock local, ni bureau, ni installateur, ni engagement de livraison à cet endroit.',
        ),
        link: {
          page: 'contact',
          label: l('Discuss your project location', 'Préciser le lieu de votre projet'),
        },
      },
    ],
  },
  {
    id: 'medical',
    title: l('Institutional medical procurement', 'Approvisionnement médical institutionnel'),
    answers: [
      {
        id: 'device-verification',
        question: l(
          'Does the catalogue confirm medical device licensing or availability?',
          'Le catalogue confirme-t-il l’homologation ou la disponibilité d’un appareil médical?',
        ),
        answer: l(
          'No. Each proposed device requires review of its exact identity, regulatory evidence, supplier authority and availability. Keep the institution’s approved purchasing specification with the request. A general category or requested model is not a verified offer.',
          'Non. Chaque appareil proposé exige un examen de son identité exacte, des preuves réglementaires, de l’autorisation du fournisseur et de la disponibilité. Conservez les spécifications approuvées avec la demande. Une catégorie ou un modèle demandé ne constitue pas une offre vérifiée.',
        ),
        link: {
          detail: 'medical-procurement-guide',
          label: l(
            'Read the medical procurement guide',
            'Consulter le guide d’approvisionnement médical',
          ),
        },
      },
      {
        id: 'accessory-compatibility',
        question: l(
          'What helps identify a respiratory accessory?',
          'Qu’est-ce qui aide à identifier un accessoire respiratoire?',
        ),
        answer: l(
          'Use the exact part reference, parent device model and manufacturer documentation when available. Clarify packaging and requested quantity. If a reference is missing, describe the item without assuming compatibility; the institution’s qualified team must review the evidence.',
          'Utilisez la référence exacte, le modèle de l’appareil associé et les documents disponibles du fabricant. Précisez le conditionnement et la quantité. Si une référence manque, décrivez l’article sans présumer sa compatibilité; l’équipe qualifiée doit examiner les preuves.',
        ),
        link: {
          detail: 'accessory-guide',
          label: l(
            'Use the accessory identification checklist',
            'Utiliser la liste d’identification des accessoires',
          ),
        },
      },
      {
        id: 'patient-information',
        question: l(
          'Should a medical inquiry include patient information or device settings?',
          'Une demande médicale doit-elle inclure des données de patient ou des réglages?',
        ),
        answer: l(
          'No. Send only institutional purchasing requirements and business contact information. Do not include patient names, records, treatment settings or patient-linked equipment records. This website provides procurement preparation, not clinical advice or emergency support.',
          'Non. Transmettez uniquement les exigences d’achat institutionnelles et les coordonnées professionnelles. N’incluez aucun nom, dossier, réglage de traitement ou registre d’équipement lié à un patient. Le site aide à préparer un achat; il ne fournit ni conseil clinique ni soutien d’urgence.',
        ),
        link: {
          page: 'privacy',
          label: l(
            'Read how inquiry information is handled',
            'Lire comment les renseignements sont traités',
          ),
        },
      },
    ],
  },
];
