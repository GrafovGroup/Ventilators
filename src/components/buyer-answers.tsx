import { faqTopics, type AnswerLink } from '@/content/faq';
import { detailPages, detailPath } from '@/content/details';
import { pathFor, type Locale } from '@/content/site';
function answerHref(locale: Locale, link: AnswerLink) {
  if ('page' in link) return pathFor(locale, link.page);
  return detailPath(
    locale,
    detailPages.find((p) => p.id === link.detail)!,
  );
}

export function BuyerAnswers({ locale }: { locale: Locale }) {
  return (
    <div className="container answer-layout">
      <nav
        className="contents-nav"
        aria-label={locale === 'en' ? 'Question topics' : 'Thèmes des questions'}
      >
        <p className="eyebrow">{locale === 'en' ? 'Find an answer' : 'Trouver une réponse'}</p>
        {faqTopics.map((topic) => (
          <a key={topic.id} href={`#${topic.id}`}>
            {topic.title[locale]}
          </a>
        ))}
      </nav>
      <div className="answer-body">
        {faqTopics.map((topic) => (
          <section key={topic.id} id={topic.id} aria-labelledby={`${topic.id}-title`}>
            <h2 id={`${topic.id}-title`}>{topic.title[locale]}</h2>
            {topic.answers.map((item) => (
              <section
                className="buyer-answer-item"
                key={item.id}
                id={item.id}
                tabIndex={-1}
                aria-labelledby={`${item.id}-title`}
              >
                <h3 id={`${item.id}-title`}>
                  <a href={`#${item.id}`}>{item.question[locale]}</a>
                </h3>
                <p>{item.answer[locale]}</p>
                <a className="text-link" href={answerHref(locale, item.link)}>
                  {item.link.label[locale]}
                </a>
              </section>
            ))}
          </section>
        ))}
      </div>
    </div>
  );
}
