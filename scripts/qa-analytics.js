// Local-only observable test controls, never part of the public export.
(() => {
  const key = 'ventilators.analytics-consent.v1';
  const mode = new URLSearchParams(location.search).get('analyticstest');
  const commands = [];
  let tagLoads = 0;
  document.documentElement.dataset.qaAnalyticsMode = mode;
  if (mode === 'fresh') localStorage.removeItem(key);
  if (mode === 'expired')
    localStorage.setItem(
      key,
      JSON.stringify({ version: 1, choice: 'granted', updatedAt: 0, expiresAt: 15552000000 }),
    );
  if (mode === 'storage-blocked') {
    const get = Storage.prototype.getItem;
    const set = Storage.prototype.setItem;
    Storage.prototype.getItem = function (k) {
      if (k === key) throw new Error('QA blocked storage');
      return get.call(this, k);
    };
    Storage.prototype.setItem = function (k, v) {
      if (k === key) throw new Error('QA blocked storage');
      return set.call(this, k, v);
    };
  }
  window.addEventListener('message', (event) => {
    if (event.origin !== location.origin) return;
    if (event.data?.type === 'qa:command') commands.push(event.data.values);
    if (event.data?.type === 'qa:tag') tagLoads++;
  });
  window.addEventListener('DOMContentLoaded', () => {
    const output = document.createElement('pre');
    output.id = 'qa-analytics-report';
    output.style.cssText =
      'white-space:pre-wrap;overflow-wrap:anywhere;padding:24px;background:white;color:black';
    document.body.append(output);
    const update = () => {
      let saved;
      try {
        saved = JSON.parse(localStorage.getItem(key));
      } catch {
        saved = 'blocked';
      }
      output.textContent = JSON.stringify(
        {
          mode,
          consent: document.documentElement.dataset.analyticsConsent,
          saved,
          frames: document.querySelectorAll('iframe[src="/analytics/frame.html"]').length,
          tagLoads,
          gaCookies: document.cookie
            .split(';')
            .map((s) => s.trim().split('=')[0])
            .filter((s) => s === '_ga' || s === '_ga_59FBT5T5V1'),
          activeElement: document.activeElement?.textContent?.slice(0, 80),
          commands,
        },
        null,
        2,
      );
    };
    update();
    setInterval(update, 250);
  });
})();
