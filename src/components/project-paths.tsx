import { projectPaths } from '@/content/project-paths';
import { detailPages, detailPath } from '@/content/details';
import { dictionaries, type Locale } from '@/content/site';

export function ProjectPaths({
  locale,
  catalogue = false,
}: {
  locale: Locale;
  catalogue?: boolean;
}) {
  return (
    <section className="container project-paths" aria-labelledby="project-paths-title">
      <div className="section-intro">
        <h2 id="project-paths-title">
          {locale === 'en' ? 'Start with your project' : 'Commencez par votre projet'}
        </h2>
        <p>
          {locale === 'en'
            ? 'Choose a preparation guide for the work in front of you. Each guide leads to relevant equipment categories and an inquiry.'
            : 'Choisissez un guide adapté au travail à préparer. Chaque guide mène aux catégories pertinentes et à une demande.'}
        </p>
      </div>
      {catalogue && (
        <a className="text-link project-browse" href="#finder-title">
          {locale === 'en'
            ? 'Browse by equipment category'
            : 'Parcourir les catégories d’équipement'}
        </a>
      )}
      <nav
        aria-label={
          locale === 'en' ? 'Project preparation guides' : 'Guides de préparation par projet'
        }
        className="project-path-list"
      >
        {projectPaths.map((item, index) => {
          const guide = detailPages.find((page) => page.id === item.guide)!;
          return (
            <a href={detailPath(locale, guide)} className="project-path" key={item.guide}>
              <span className="eyebrow">
                {String(index + 1).padStart(2, '0')} / {dictionaries[locale].nav[guide.division]}
              </span>
              <h3>{item.title[locale]}</h3>
              <p>{item.summary[locale]}</p>
              <span className="text-link">
                {locale === 'en'
                  ? 'Read the guide and checklist'
                  : 'Consulter le guide et la liste'}
              </span>
            </a>
          );
        })}
      </nav>
    </section>
  );
}
