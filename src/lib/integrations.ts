import ownership from '../content/search-verification.json';

// Public identifiers only. These values become part of the static build.
export function publicFormId(value: string | undefined): string {
  const id = value?.trim() || 'mvkaapjj';
  if (!/^[a-zA-Z0-9]{8,32}$/.test(id))
    throw new Error(
      'NEXT_PUBLIC_FORMSPREE_FORM_ID must contain a public form ID, not a URL or key.',
    );
  return id;
}

export function searchVerification(env: Record<string, string | undefined>) {
  const google = (env.GOOGLE_SITE_VERIFICATION ?? ownership.google).trim();
  const bing = (env.BING_SITE_VERIFICATION ?? ownership.bing).trim();
  if (google && !/^[a-zA-Z0-9_-]{10,200}$/.test(google))
    throw new Error('GOOGLE_SITE_VERIFICATION must contain only the HTML verification token.');
  if (bing && !/^[a-fA-F0-9]{32}$/.test(bing))
    throw new Error('BING_SITE_VERIFICATION must contain the 32-character verification token.');
  // Never emit ownership tokens on a preview build, even when its environment has them.
  if (env.VENTILATORS_PUBLIC_RELEASE !== '1') return undefined;
  if (!google && !bing) return undefined;
  return {
    ...(google ? { google } : {}),
    ...(bing ? { other: { 'msvalidate.01': bing } } : {}),
  };
}
