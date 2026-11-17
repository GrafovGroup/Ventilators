// A constant-URL, same-origin document, created only after affirmative consent.
// It never reads the parent document, URL, form fields or referrer.
(() => {
  if (parent === window || location.origin !== 'https://ventilators.ca') return;
  const id = 'G-59FBT5T5V1';
  const events = ['page_view', 'division_selected', 'category_viewed', 'rfq_started', 'rfq_submitted', 'phone_clicked', 'email_clicked', 'language_changed'];
  let started = false;
  let stopped = false;
  let tag;
  window.dataLayer = [];
  function gtag() { window.dataLayer.push(arguments); }
  window.stopAnalytics = () => {
    stopped = true;
    window['ga-disable-' + id] = true;
    window.dataLayer.length = 0;
    tag?.remove();
  };
  window.addEventListener('message', (message) => {
    if (stopped || message.source !== parent || message.origin !== location.origin || message.data?.type !== 'ventilators:measure') return;
    const payload = message.data.payload;
    if (!payload || Object.keys(payload).some((key) => !['event', 'path', 'locale', 'division', 'category', 'target_locale'].includes(key)) ||
      !events.includes(payload.event) || !['en', 'fr'].includes(payload.locale) ||
      typeof payload.path !== 'string' || !/^\/(en|fr)\/(?:[a-z0-9-]+\/)*$/.test(payload.path) || !payload.path.startsWith('/' + payload.locale + '/')) return;
    const context = {
      page_location: 'https://ventilators.ca' + payload.path,
      page_referrer: '',
      page_title: 'Ventilators.ca | ' + payload.path,
      language: payload.locale,
      send_to: id,
    };
    if (!started) {
      if (payload.event !== 'page_view') return;
      started = true;
      gtag('consent', 'default', { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
      gtag('consent', 'update', { analytics_storage: 'granted' });
      gtag('js', new Date());
      gtag('config', id, { ...context, send_page_view: false, allow_google_signals: false, allow_ad_personalization_signals: false, cookie_domain: 'ventilators.ca', cookie_path: '/', cookie_expires: 15552000, cookie_update: false, cookie_flags: 'SameSite=Lax;Secure' });
      tag = document.createElement('script');
      tag.async = true;
      tag.referrerPolicy = 'no-referrer';
      tag.src = 'https://www.googletagmanager.com/gtag/js?id=' + id;
      document.head.append(tag);
    }
    for (const key of ['division', 'category', 'target_locale']) {
      if (typeof payload[key] === 'string' && /^[a-z-]{2,60}$/.test(payload[key])) context[key] = payload[key];
    }
    gtag('event', payload.event, context);
  });
  parent.postMessage('ventilators:ready', location.origin);
})();
