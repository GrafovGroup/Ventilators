import { buyerGuides } from '@/content/buyer-guides';
import { referenceSources } from '@/content/details';
import { dictionaries, quotePath, type Locale } from '@/content/site';
import type { Category } from '@/content/catalog';

export function CategoryBuyerGuide({ category, locale }: { category: Category; locale: Locale }) {
  const guide = buyerGuides[category.id];
  if (!guide) return null;
  const source = referenceSources[guide.source];
  return (
    <div className="container buyer-guide">
      <section id="category-scope" aria-labelledby="category-scope-title">
        <p className="eyebrow">
          {locale === 'en' ? 'UNDERSTAND THE REQUIREMENT' : 'COMPRENDRE LE BESOIN'}
        </p>
        <h2 id="category-scope-title">{guide.question[locale]}</h2>
        <p className="buyer-answer">{guide.answer[locale]}</p>
        <table className="buyer-table">
          <caption>{guide.caption[locale]}</caption>
          <thead>
            <tr>
              <th scope="col">
                {locale === 'en' ? 'Part of the inquiry' : 'Élément de la demande'}
              </th>
              <th scope="col">{locale === 'en' ? 'What to clarify' : 'Points à préciser'}</th>
            </tr>
          </thead>
          <tbody>
            {guide.rows.map((row) => (
              <tr key={row.label.en}>
                <th scope="row">{row.label[locale]}</th>
                <td>{row.detail[locale]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <section
        id="category-questions"
        aria-labelledby="category-questions-title"
        className="buyer-questions"
      >
        <h2 id="category-questions-title">
          {locale === 'en' ? 'Buyer questions' : 'Questions des acheteurs'}
        </h2>
        {guide.questions.map((item) => (
          <div key={item.question.en}>
            <h3>{item.question[locale]}</h3>
            <p>{item.answer[locale]}</p>
          </div>
        ))}
      </section>
      <section className="buyer-example" aria-labelledby="category-example-title">
        <h2 id="category-example-title">
          {locale === 'en' ? 'An example of a useful inquiry' : 'Exemple de demande utile'}
        </h2>
        <p className="field-help">
          {locale === 'en'
            ? 'Illustrative wording to adapt to your project, not an actual customer request.'
            : 'Formulation illustrative à adapter à votre projet; il ne s’agit pas d’une demande réelle.'}
        </p>
        <blockquote>
          <p>{guide.example[locale]}</p>
        </blockquote>
        <a className="button" href={quotePath(locale, category.division, category.id)}>
          {dictionaries[locale].common.inquiry}
        </a>
      </section>
      <aside
        className="buyer-sources"
        aria-label={locale === 'en' ? 'Background references' : 'Références générales'}
      >
        <p>
          <strong>{locale === 'en' ? 'Background references' : 'Références générales'}</strong>
        </p>
        <a href={source.url[locale]}>{source.title[locale]}</a>
        {category.id === 'procurement' && (
          <a href="https://health-products.canada.ca/mdel-leim/start-debuter.do?lang=enLicence&wbdisable=true">
            {locale === 'en'
              ? 'Health Canada — Establishment licence listing'
              : 'Santé Canada — Liste des licences d’établissement (en anglais)'}
          </a>
        )}
        <p>
          {locale === 'en'
            ? 'General preparation guidance. Use project-specific documents and qualified review for equipment selection and procurement decisions.'
            : 'Conseils généraux de préparation. Appuyez les décisions de sélection et d’achat sur les documents du projet et un examen qualifié.'}
        </p>
      </aside>
    </div>
  );
}
