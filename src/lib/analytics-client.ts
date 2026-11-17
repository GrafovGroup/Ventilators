import { analyticsPayload } from './analytics-contract';
import { routes } from './routes';

// Loaded only after consent. The collector's own document has no inquiry inputs,
// query strings or referrer; removing it stops its runtime.
export function startAnalytics(isAllowed: () => boolean) {
  const route = routes.find((item) => item.path === window.location.pathname);
  if (!route || !isAllowed()) return () => {};
  const frame = document.createElement('iframe');
  frame.title = 'Optional website analytics';
  frame.hidden = true;
  frame.setAttribute('aria-hidden', 'true');
  frame.tabIndex = -1;
  frame.referrerPolicy = 'no-referrer';
  frame.src = '/analytics/frame.html';
  let ready = false;
  let stopped = false;
  const context = { path: route.path, locale: route.locale };
  function send(event: string, extra: Record<string, unknown> = {}) {
    if (!ready || stopped || !isAllowed()) return;
    const payload = analyticsPayload(event, { ...context, ...extra });
    if (payload)
      frame.contentWindow?.postMessage(
        { type: 'ventilators:measure', payload },
        window.location.origin,
      );
  }
  function onReady(event: MessageEvent) {
    if (
      event.source !== frame.contentWindow ||
      event.origin !== window.location.origin ||
      event.data !== 'ventilators:ready' ||
      ready ||
      stopped ||
      !isAllowed()
    )
      return;
    ready = true;
    send('page_view');
    if (route?.category)
      send('category_viewed', { division: route.category.division, category: route.category.id });
  }
  function click(event: MouseEvent) {
    const anchor = event.target instanceof Element ? event.target.closest('a[href]') : null;
    if (!(anchor instanceof HTMLAnchorElement)) return;
    const href = anchor.getAttribute('href') || '';
    if (href.startsWith('tel:')) send('phone_clicked');
    else if (href.startsWith('mailto:')) send('email_clicked');
    else if (anchor.classList.contains('language'))
      send('language_changed', { target_locale: route?.locale === 'en' ? 'fr' : 'en' });
    else {
      const destination = routes.find((item) => item.path === href);
      if (
        destination &&
        !destination.category &&
        !destination.detail &&
        ['industrial', 'medical'].includes(destination.page)
      )
        send('division_selected', { division: destination.page });
    }
  }
  function inquiry(event: Event) {
    const detail = (event as CustomEvent).detail;
    if (detail && ['rfq_started', 'rfq_submitted'].includes(detail.event)) send(detail.event);
  }
  window.addEventListener('message', onReady);
  window.addEventListener('ventilators:analytics', inquiry);
  document.addEventListener('click', click, true);
  document.body.append(frame);
  return () => {
    stopped = true;
    window.removeEventListener('message', onReady);
    window.removeEventListener('ventilators:analytics', inquiry);
    document.removeEventListener('click', click, true);
    const collector = frame.contentWindow as (Window & { stopAnalytics?: () => void }) | null;
    collector?.stopAnalytics?.();
    frame.remove();
  };
}
