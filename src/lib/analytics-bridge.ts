// This tiny bridge never reads form values or loads the analytics collector.
export function inquiryAnalytics(event: 'rfq_started' | 'rfq_submitted') {
  if (document.documentElement.dataset.analyticsConsent !== 'granted') return false;
  window.dispatchEvent(new CustomEvent('ventilators:analytics', { detail: { event } }));
  return true;
}
