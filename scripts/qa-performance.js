// Local QA only. Expose lab observations as a DOM report for the browser tool.
(() => {
  const metrics = { lcpMs: null, cls: 0, longestObservedEventMs: 0 };
  let report;
  function update() {
    if (!report) return;
    report.textContent = JSON.stringify({
      environment: 'Local browser, unthrottled; lab sample, not field Core Web Vitals',
      path: location.pathname,
      viewport: innerWidth,
      ...metrics,
      scripts: performance
        .getEntriesByType('resource')
        .filter((r) => /\/_next\/.*\.js(?:\?|$)/.test(r.name))
        .map((r) => new URL(r.name).pathname),
      photos: [...document.querySelectorAll('img[src^="/images/"]')].map((img) => ({
        src: img.getAttribute('src'),
        currentSrc: new URL(img.currentSrc || img.src).pathname,
        complete: img.complete,
        renderedWidth: img.clientWidth,
        renderedHeight: img.clientHeight,
      })),
    });
  }
  for (const [type, consume] of [
    [
      'largest-contentful-paint',
      (entry) => {
        metrics.lcpMs = entry.startTime;
      },
    ],
    [
      'layout-shift',
      (entry) => {
        if (!entry.hadRecentInput) metrics.cls += entry.value;
      },
    ],
    [
      'event',
      (entry) => {
        metrics.longestObservedEventMs = Math.max(metrics.longestObservedEventMs, entry.duration);
      },
    ],
    ['resource', () => {}],
  ]) {
    if (!PerformanceObserver.supportedEntryTypes.includes(type)) continue;
    new PerformanceObserver((list) => {
      list.getEntries().forEach(consume);
      update();
    }).observe({ type, buffered: true, ...(type === 'event' ? { durationThreshold: 16 } : {}) });
  }
  window.addEventListener('load', () => {
    report = document.createElement('pre');
    report.id = 'qa-performance-report';
    report.hidden = true;
    document.body.appendChild(report);
    update();
  });
  document.addEventListener('load', update, true);
})();
