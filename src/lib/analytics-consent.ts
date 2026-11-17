export const consentKey = 'ventilators.analytics-consent.v1';
export const consentLifetime = 180 * 24 * 60 * 60 * 1000;
export type ConsentChoice = 'granted' | 'denied';
export type ConsentRecord = {
  version: 1;
  choice: ConsentChoice;
  updatedAt: number;
  expiresAt: number;
};

export function consentRecord(choice: ConsentChoice, now = Date.now()): ConsentRecord {
  return { version: 1, choice, updatedAt: now, expiresAt: now + consentLifetime };
}

export function readConsent(value: string | null, now = Date.now()): ConsentRecord | null {
  try {
    const record = JSON.parse(value || 'null');
    if (
      !record ||
      record.version !== 1 ||
      !['granted', 'denied'].includes(record.choice) ||
      !Number.isSafeInteger(record.updatedAt) ||
      !Number.isSafeInteger(record.expiresAt) ||
      record.updatedAt > now ||
      record.updatedAt < 0 ||
      record.expiresAt <= now ||
      record.expiresAt !== record.updatedAt + consentLifetime
    )
      return null;
    return {
      version: 1,
      choice: record.choice,
      updatedAt: record.updatedAt,
      expiresAt: record.expiresAt,
    };
  } catch {
    return null;
  }
}

// Only this site's two first-party GA cookies. Never clear Formspree or unrelated storage.
export function clearAnalyticsCookies() {
  for (const name of ['_ga', '_ga_59FBT5T5V1']) {
    for (const domain of ['', '; Domain=ventilators.ca', '; Domain=.ventilators.ca']) {
      document.cookie = `${name}=; Max-Age=0; Path=/${domain}; SameSite=Lax; Secure`;
    }
  }
}
