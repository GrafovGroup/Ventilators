import { routes } from './routes';
import { categories } from '../content/catalog';

// Preparation only: no collector, storage, network calls or UI hooks are enabled.
export const analyticsEvents = [
  'division_selected',
  'category_viewed',
  'rfq_started',
  'rfq_submitted',
  'phone_clicked',
  'email_clicked',
  'language_changed',
] as const;
export type AnalyticsEvent = (typeof analyticsEvents)[number];

// Reject unknown fields rather than allowing form data, query strings or identifiers
// to slip into a future analytics adapter. Only existing public routes are accepted.
export function analyticsPayload(event: string, input: Record<string, unknown>) {
  if (!analyticsEvents.includes(event as AnalyticsEvent)) return null;
  const allowed = ['path', 'locale', 'division', 'category', 'target_locale'];
  if (Object.keys(input).some((key) => !allowed.includes(key))) return null;
  const route = routes.find((item) => item.path === input.path && item.locale === input.locale);
  if (!route) return null;
  if (
    input.division !== undefined &&
    input.division !== 'industrial' &&
    input.division !== 'medical'
  )
    return null;
  const category = categories.find((item) => item.id === input.category);
  if (input.category !== undefined && (!category || category.division !== input.division))
    return null;
  if (event === 'division_selected' && input.division === undefined) return null;
  if (event === 'category_viewed' && (!category || route.category?.id !== category.id)) return null;
  if (event === 'language_changed') {
    if (input.target_locale !== (route.locale === 'en' ? 'fr' : 'en')) return null;
  } else if (input.target_locale !== undefined) return null;
  if (['rfq_started', 'rfq_submitted'].includes(event) && route.page !== 'quote') return null;
  return {
    event: event as AnalyticsEvent,
    path: route.path,
    locale: route.locale,
    ...(input.division !== undefined
      ? { division: input.division as 'industrial' | 'medical' }
      : {}),
    ...(category ? { category: category.id } : {}),
    ...(event === 'language_changed' ? { target_locale: input.target_locale as 'en' | 'fr' } : {}),
  };
}
