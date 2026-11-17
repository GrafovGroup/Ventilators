# Page matrix

All copy is DRAFT / OWNER AND EDITORIAL REVIEW PENDING. All preview pages are `noindex,nofollow`.

| Page | English route | French route | Purpose / primary keyword | Audience | Primary CTA | Source of truth | Implementation / QA |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Home | /en/ | /fr/ | Separate industrial ventilation and medical ventilator inquiries | Facilities and institutional procurement | Choose division | Master prompt | IN PROGRESS |
| Industrial | /en/industrial/ | /fr/industriel/ | Industrial ventilation Canada; system and replacement inquiries | Facilities, contractors | Industrial RFQ | Master prompt, generic category guidance | IN PROGRESS |
| Medical | /en/medical/ | /fr/medical/ | Medical ventilator procurement inquiries Canada | Procurement, biomedical engineering | Medical inquiry | Master prompt; regulated offerings unverified | IN PROGRESS |
| Products | /en/products/ | /fr/produits/ | Browse equipment categories | All buyers | Category inquiry | Master prompt; no SKU data | IN PROGRESS |
| Categories | /en/industrial/[category]/ | /fr/industriel/[categorie]/ | Unique system selection considerations | Facilities, contractors | Category RFQ | Category content register | IN PROGRESS |
| Medical categories | /en/medical/[category]/ | /fr/medical/[categorie]/ | Procurement information only | Institutional buyers | Category inquiry | Category content register; inquiry only | IN PROGRESS |
| RFQ | /en/request-a-quote/ | /fr/demande-de-soumission/ | Prepare a technical inquiry | All buyers | Review inquiry (delivery unavailable) | Master prompt | IN PROGRESS |
| Contact | /en/contact/ | /fr/contact/ | Phone, email, division selection | All buyers | Call / email | Owner contact in master prompt | IN PROGRESS |
| Services | /en/services/ | /fr/services/ | Scope of service coordination inquiries | Facilities, biomedical teams | Discuss requirements | Master prompt; qualification verification pending | IN PROGRESS |
| Industries | /en/industries/ | /fr/secteurs/ | Sector-specific inquiry preparation | Facilities and institutions | Select division | Master prompt | IN PROGRESS |
| About | /en/about/ | /fr/a-propos/ | Brand, two divisions and verification approach | All buyers | Contact | Master prompt | IN PROGRESS |
| Resources | /en/resources/ | /fr/ressources/ | Procurement/specification checklists | Technical buyers | Download checklist / RFQ | Authored nonclinical guidance | IN PROGRESS |
| FAQ | /en/faq/ | /fr/faq/ | Buying and inquiry questions | All buyers | Contact | Master prompt | IN PROGRESS |
| Privacy | /en/privacy/ | /fr/confidentialite/ | Draft privacy disclosure | All visitors | Privacy contact | Implementation behavior; legal review pending | IN PROGRESS |
| Terms | /en/terms/ | /fr/conditions/ | Draft site-use terms | All visitors | Contact | Implementation behavior; legal review pending | IN PROGRESS |
| Accessibility | /en/accessibility/ | /fr/accessibilite/ | Accessibility intent and feedback | All visitors | Email feedback | Actual implementation; audit pending | IN PROGRESS |
| 404 / error | /404.html | Bilingual recovery links | Recover from missing page | All visitors | English / Français home | Application | IN PROGRESS |
| Verified product pages | Not generated | Not generated | Exact manufacturer/model intent | Product buyers | Verified quote | Supplier evidence required | BLOCKED |
| Provincial pages | Not generated | Not generated | Distinct verified provincial service | Local buyers | Inquiry | Coverage and meaningful content required | BLOCKED |

Each implemented content page has one H1, localized title/description, canonical, reciprocal hreflang, breadcrumb and context-appropriate internal links. Exact category routes and metadata are defined in `src/content/catalog.ts` and `src/content/site.ts` and checked against the exported files.
