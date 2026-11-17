// Served ONLY by the localhost QA harness, never copied into out/ or production.
// Simulates provider responses so failure tests cannot send real messages.
(() => {
  const mode = new URLSearchParams(location.search).get('formtest');
  const originalFetch = window.fetch.bind(window);
  const requests = [];
  function report() {
    let output = document.getElementById('qa-delivery-report');
    if (!output) {
      output = document.createElement('pre');
      output.id = 'qa-delivery-report';
      output.style.cssText = 'white-space:pre-wrap;overflow-wrap:anywhere;padding:20px';
      document.body.appendChild(output);
    }
    output.textContent = JSON.stringify({ mode, requests }, null, 2);
  }
  window.fetch = async (url, options) => {
    if (String(url) !== 'https://formspree.io/f/mvkaapjj') return originalFetch(url, options);
    const index = requests.length;
    requests.push({ method: options.method, payload: JSON.parse(options.body) });
    report();
    await new Promise((resolve) => setTimeout(resolve, mode === 'slow' ? 17000 : 1200));
    if (mode === 'network') throw new TypeError('Synthetic network failure');
    if (mode === 'validation')
      return Response.json(
        { errors: [{ field: 'email', code: 'TYPE_EMAIL', message: 'Invalid email' }] },
        { status: 422 },
      );
    if (mode === 'retry' && index === 0)
      return Response.json({ errors: [{ message: 'Synthetic unavailable' }] }, { status: 503 });
    if (mode === 'rate')
      return Response.json({ errors: [{ message: 'Synthetic rate limit' }] }, { status: 429 });
    return Response.json({ next: 'https://formspree.io/thanks' }, { status: 200 });
  };
  window.addEventListener('DOMContentLoaded', report);
})();
