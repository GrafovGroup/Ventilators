// Review-only interactions. No form submissions, analytics or persistent storage.
(() => {
  let locale = new URLSearchParams(location.search).get('lang') === 'fr' ? 'fr' : 'en';
  const languageButton = document.querySelector('.language');
  const menu = document.querySelector('.menu');
  const nav = document.querySelector('#nav');
  function updateProjectLink() {
    const link = document.querySelector('#project-next');
    if (!link) return;
    const division = document.querySelector('#project-division').value;
    const intent = document.querySelector('#project-intent').value;
    const paths = {
      en: {
        industrial: 'industrial/',
        medical: 'medical/',
        inquiry: 'request-a-quote/',
        guide: 'resources/',
      },
      fr: {
        industrial: 'industriel/',
        medical: 'medical/',
        inquiry: 'demande-de-soumission/',
        guide: 'ressources/',
      },
    };
    link.href = `https://ventilators.ca/${locale}/${paths[locale][intent === 'browse' ? division : intent]}${intent === 'inquiry' ? `?division=${division}` : ''}`;
  }
  function translate() {
    document.documentElement.lang = `${locale}-CA`;
    document.querySelectorAll('[data-en]').forEach((node) => {
      node.innerHTML = node.dataset[locale];
    });
    document.querySelectorAll('[data-href-en]').forEach((node) => {
      node.href = node.dataset[locale === 'en' ? 'hrefEn' : 'hrefFr'];
    });
    document.querySelectorAll('[data-alt-en]').forEach((node) => {
      node.alt = node.dataset[locale === 'en' ? 'altEn' : 'altFr'];
    });
    languageButton.textContent = locale === 'en' ? 'FR' : 'EN';
    languageButton.setAttribute(
      'aria-label',
      locale === 'en' ? 'Afficher en français' : 'Read in English',
    );
    updateProjectLink();
  }
  languageButton.addEventListener('click', () => {
    locale = locale === 'en' ? 'fr' : 'en';
    translate();
  });
  menu.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    menu.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
      menu.setAttribute('aria-expanded', 'false');
      nav.classList.remove('is-open');
      menu.focus();
    }
  });
  document.querySelectorAll('[data-path]').forEach((button) =>
    button.addEventListener('click', () => {
      document
        .querySelectorAll('[data-path]')
        .forEach((b) => b.setAttribute('aria-pressed', String(b === button)));
      document.querySelectorAll('[data-panel]').forEach((panel) => {
        panel.hidden = panel.dataset.panel !== button.dataset.path;
      });
    }),
  );
  document
    .querySelectorAll('.project-selector select')
    .forEach((select) => select.addEventListener('change', updateProjectLink));
  translate();
})();
