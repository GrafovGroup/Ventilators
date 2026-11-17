// Local QA substitute; no third-party network calls or production cookie IDs.
(() => {
  const mode = parent.document.documentElement.dataset.qaAnalyticsMode;
  parent.postMessage({ type: 'qa:tag', mode }, location.origin);
  if (mode === 'blocked') return;
  function process(command) {
    const values = Array.from(command);
    if (values[0] === 'config') {
      document.cookie = '_ga=qa-only; Path=/; SameSite=Lax';
      document.cookie = '_ga_59FBT5T5V1=qa-only; Path=/; SameSite=Lax';
    }
    parent.postMessage({ type: 'qa:command', values }, location.origin);
  }
  window.dataLayer.forEach(process);
  window.dataLayer.push = (...commands) => {
    commands.forEach(process);
    return 0;
  };
})();
