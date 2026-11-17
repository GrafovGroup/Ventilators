'use client';
import { useEffect, useRef, useState } from 'react';
import { pathFor, type Locale } from '@/content/site';
import {
  clearAnalyticsCookies,
  consentKey,
  consentRecord,
  readConsent,
  type ConsentChoice,
  type ConsentRecord,
} from '@/lib/analytics-consent';

const copy = {
  en: {
    preferences: 'Analytics preferences',
    title: 'Help us improve this website?',
    description:
      'With your permission, Google Analytics uses cookies to measure visits and general actions, such as starting an inquiry. We do not send your form entries to Analytics. You can browse and send inquiries with analytics off.',
    allow: 'Allow analytics',
    decline: 'Decline analytics',
    close: 'Close preferences',
    privacy: 'Privacy notice',
    on: 'Analytics are on.',
    off: 'Analytics are off.',
    remember: 'We remember your choice for 180 days. Change it here at any time.',
    session: 'Your browser could not save this choice. It applies to this page only.',
    saved: 'Analytics preference saved.',
  },
  fr: {
    preferences: 'Préférences analytiques',
    title: 'Nous aider à améliorer ce site?',
    description:
      'Avec votre permission, Google Analytics utilise des témoins pour mesurer les visites et les actions générales, comme commencer une demande. Nous ne transmettons pas le contenu du formulaire à Analytics. Vous pouvez consulter le site et envoyer des demandes sans activer l’analyse.',
    allow: 'Autoriser l’analyse',
    decline: 'Refuser l’analyse',
    close: 'Fermer les préférences',
    privacy: 'Avis de confidentialité',
    on: 'L’analyse est activée.',
    off: 'L’analyse est désactivée.',
    remember:
      'Votre choix est conservé pendant 180 jours. Vous pouvez le modifier ici à tout moment.',
    session:
      'Votre navigateur ne peut pas enregistrer ce choix. Il s’applique seulement à cette page.',
    saved: 'Préférence analytique enregistrée.',
  },
};

export function AnalyticsConsent({ locale, enabled }: { locale: Locale; enabled: boolean }) {
  const t = copy[locale];
  const [open, setOpen] = useState(false);
  const [record, setRecord] = useState<ConsentRecord | null>(null);
  const [sessionOnly, setSessionOnly] = useState(false);
  const [status, setStatus] = useState('');
  const current = useRef<ConsentRecord | null>(null);
  const stop = useRef<() => void>(() => {});
  const button = useRef<HTMLButtonElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const returnFocus = useRef(false);

  useEffect(() => {
    if (!enabled) return;
    let timer: ReturnType<typeof setTimeout>;
    let generation = 0;
    function apply(next: ConsentRecord | null) {
      const sequence = ++generation;
      stop.current();
      stop.current = () => {};
      clearTimeout(timer);
      current.current = next;
      setRecord(next);
      setOpen(!next);
      document.documentElement.dataset.analyticsConsent = next?.choice || 'denied';
      if (next?.choice === 'granted') {
        void import('@/lib/analytics-client')
          .then(({ startAnalytics }) => {
            if (sequence !== generation) return;
            stop.current = startAnalytics(
              () => current.current?.choice === 'granted' && current.current.expiresAt > Date.now(),
            );
          })
          .catch(() => {
            /* Blockers must never interfere with navigation or inquiries. */
          });
      } else clearAnalyticsCookies();
      if (next) {
        const checkExpiry = () => {
          if (next.expiresAt <= Date.now()) apply(null);
          else timer = setTimeout(checkExpiry, Math.min(next.expiresAt - Date.now(), 2147483647));
        };
        checkExpiry();
      }
    }
    function sync() {
      try {
        apply(readConsent(localStorage.getItem(consentKey)));
      } catch {
        apply(null);
        setSessionOnly(true);
      }
    }
    function storage(event: StorageEvent) {
      if (event.key === consentKey || event.key === null) sync();
    }
    function choose(event: Event) {
      apply((event as CustomEvent<ConsentRecord>).detail);
    }
    sync();
    window.addEventListener('storage', storage);
    window.addEventListener('ventilators:consent', choose);
    return () => {
      generation++;
      clearTimeout(timer);
      stop.current();
      delete document.documentElement.dataset.analyticsConsent;
      window.removeEventListener('storage', storage);
      window.removeEventListener('ventilators:consent', choose);
    };
  }, [enabled]);

  function choose(choice: ConsentChoice) {
    const next = consentRecord(choice);
    let saved = true;
    try {
      localStorage.setItem(consentKey, JSON.stringify(next));
    } catch {
      saved = false;
    }
    setSessionOnly(!saved);
    window.dispatchEvent(new CustomEvent('ventilators:consent', { detail: next }));
    setStatus(saved ? t.saved : t.session);
    if (returnFocus.current) button.current?.focus();
  }
  if (!enabled) return null;
  return (
    <>
      <button
        ref={button}
        className="analytics-preferences"
        type="button"
        aria-expanded={open}
        aria-controls="analytics-preferences"
        onClick={() => {
          returnFocus.current = true;
          setOpen(true);
          requestAnimationFrame(() => heading.current?.focus());
        }}
      >
        {t.preferences}
      </button>
      <span className="analytics-status" role="status">
        {status}
      </span>
      {open && (
        <section
          id="analytics-preferences"
          className="analytics-panel"
          aria-labelledby="analytics-title"
        >
          <h2 id="analytics-title" ref={heading} tabIndex={-1}>
            {t.title}
          </h2>
          <p>{t.description}</p>
          <p className="analytics-choice">
            <strong>{record?.choice === 'granted' ? t.on : t.off}</strong>{' '}
            {sessionOnly ? t.session : t.remember}
          </p>
          <a href={pathFor(locale, 'privacy')}>{t.privacy}</a>
          <div className="analytics-buttons">
            <button type="button" onClick={() => choose('granted')}>
              {t.allow}
            </button>
            <button type="button" onClick={() => choose('denied')}>
              {t.decline}
            </button>
          </div>
          {record && (
            <button
              type="button"
              className="analytics-close"
              onClick={() => {
                setOpen(false);
                button.current?.focus();
              }}
            >
              {t.close}
            </button>
          )}
        </section>
      )}
    </>
  );
}
