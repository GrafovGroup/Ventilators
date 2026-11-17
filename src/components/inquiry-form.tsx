'use client';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';

import { dictionaries, pathFor, type Division, type Locale } from '@/content/site';
import {
  provinceCodes,
  inquiryOptions,
  type InquiryInput,
  readInquiry,
  validateInquiry,
  type InquiryErrors,
  type InquiryField,
} from '@/lib/inquiry';

const provinces = {
  en: [
    'Alberta',
    'British Columbia',
    'Manitoba',
    'New Brunswick',
    'Newfoundland and Labrador',
    'Nova Scotia',
    'Northwest Territories',
    'Nunavut',
    'Ontario',
    'Prince Edward Island',
    'Quebec',
    'Saskatchewan',
    'Yukon',
  ],
  fr: [
    'Alberta',
    'Colombie-Britannique',
    'Manitoba',
    'Nouveau-Brunswick',
    'Terre-Neuve-et-Labrador',
    'Nouvelle-Écosse',
    'Territoires du Nord-Ouest',
    'Nunavut',
    'Ontario',
    'Île-du-Prince-Édouard',
    'Québec',
    'Saskatchewan',
    'Yukon',
  ],
};

export function InquiryForm({ locale }: { locale: Locale }) {
  const query = useSearchParams();
  const [division, setDivision] = useState<Division>(
    query.get('division') === 'medical' ? 'medical' : 'industrial',
  );
  const [errors, setErrors] = useState<InquiryErrors>({});
  const [review, setReview] = useState<InquiryInput | null>(null);
  const d = dictionaries[locale];
  const t = d.form;
  const categoryDefault =
    inquiryOptions.find((c) => c.id === query.get('category') && c.division === division)?.id ?? '';
  const error = (field: InquiryField) =>
    errors[field] ? (
      <span className="field-error" id={`${field}-error`}>
        {t[errors[field]!]}
      </span>
    ) : null;
  const a11y = (field: InquiryField) => ({
    id: field,
    name: field,
    'aria-invalid': !!errors[field],
    'aria-describedby': errors[field] ? `${field}-error` : undefined,
  });
  const label = (field: InquiryField, text: string, optional = false) => (
    <label htmlFor={field}>
      {text}
      {optional ? (
        <span className="optional"> ({d.common.optional})</span>
      ) : (
        <span aria-hidden="true"> *</span>
      )}
    </label>
  );
  function rememberSelection(nextDivision: Division, category = '') {
    const url = new URL(window.location.href);
    url.searchParams.set('division', nextDivision);
    if (category) url.searchParams.set('category', category);
    else url.searchParams.delete('category');
    // Only nonpersonal routing choices enter the URL, never inquiry contents.
    window.history.replaceState(null, '', url);
  }
  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const input = readInquiry(new FormData(event.currentTarget));
    const nextErrors = validateInquiry(input);
    setErrors(nextErrors);
    setReview(Object.keys(nextErrors).length === 0 ? input : null);
    requestAnimationFrame(() =>
      document
        .getElementById(Object.keys(nextErrors).length ? 'error-summary' : 'review-result')
        ?.focus(),
    );
  }
  const labels: Record<InquiryField, string> = {
    division: t.division,
    name: t.name,
    organization: t.organization,
    email: t.email,
    phone: t.phone,
    province: t.province,
    category: t.category,
    model: t.model,
    specification: division === 'industrial' ? t.capacity : t.clinicalModel,
    quantity: t.quantity,
    timeline: t.timeline,
    urgency: t.urgency,
    details: t.details,
    consent: t.privacy,
  };
  function reviewValue(field: InquiryField, value: string) {
    if (field === 'division') return d.nav[value as Division];
    if (field === 'category') return inquiryOptions.find((c) => c.id === value)?.name[locale];
    if (field === 'province')
      return provinces[locale][provinceCodes.indexOf(value as (typeof provinceCodes)[number])];
    if (field === 'timeline') return t.timelines[Number(value)];
    if (field === 'urgency') return t.urgencies[value === 'standard' ? 0 : 1];
    if (field === 'consent') return t.acknowledged;
    return value || t.notProvided;
  }
  return (
    <div className="container quote-layout">
      <div>
        <div className="notice" role="note">
          <strong>{t.unavailableTitle}</strong>
          <p>{t.unavailable}</p>
        </div>
        <form noValidate hidden={!!review} onSubmit={submit} aria-label={t.title}>
          {Object.keys(errors).length > 0 && (
            <div role="alert" className="error-summary" id="error-summary" tabIndex={-1}>
              <strong>{t.errors}</strong>
              <ul>
                {(Object.keys(errors) as InquiryField[]).map((field) => (
                  <li key={field}>
                    <a href={`#${field}`}>
                      {labels[field]}: {t[errors[field]!]}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <p className="form-required">* {d.common.required}</p>
          <fieldset className="division-select">
            <legend>{t.division}</legend>
            {(['industrial', 'medical'] as const).map((value) => (
              <label key={value} className={division === value ? 'selected' : ''}>
                <input
                  id={value === 'industrial' ? 'division' : 'division-medical'}
                  type="radio"
                  name="division"
                  value={value}
                  checked={division === value}
                  onChange={() => {
                    setDivision(value);
                    setErrors({});
                    rememberSelection(value);
                  }}
                />
                {d.nav[value]}
              </label>
            ))}
          </fieldset>
          {division === 'medical' && <p className="medical-note">{t.patient}</p>}
          <div className="form-grid">
            <div>
              {label('name', t.name)}
              <input {...a11y('name')} autoComplete="name" maxLength={200} required />
              {error('name')}
            </div>
            <div>
              {label('organization', t.organization)}
              <input
                {...a11y('organization')}
                autoComplete="organization"
                maxLength={200}
                required
              />
              {error('organization')}
            </div>
            <div>
              {label('email', t.email)}
              <input
                {...a11y('email')}
                type="email"
                autoComplete="email"
                maxLength={200}
                required
              />
              {error('email')}
            </div>
            <div>
              {label('phone', t.phone, true)}
              <input {...a11y('phone')} type="tel" autoComplete="tel" maxLength={60} />
              {error('phone')}
            </div>
            <div>
              {label('province', t.province)}
              <select {...a11y('province')} autoComplete="address-level1" defaultValue="" required>
                <option value="">{t.select}</option>
                {provinceCodes.map((code, i) => (
                  <option value={code} key={code}>
                    {provinces[locale][i]}
                  </option>
                ))}
              </select>
              {error('province')}
            </div>
            <div>
              {label('category', t.category)}
              <select
                {...a11y('category')}
                onChange={(event) => rememberSelection(division, event.target.value)}
                defaultValue={categoryDefault}
                key={division}
                required
              >
                <option value="">{t.select}</option>
                {inquiryOptions
                  .filter((c) => c.division === division)
                  .map((c) => (
                    <option value={c.id} key={c.id}>
                      {c.name[locale]}
                    </option>
                  ))}
              </select>
              {error('category')}
            </div>
            <div className="span-two">
              {label('model', t.model, true)}
              <input {...a11y('model')} maxLength={200} />
              {error('model')}
            </div>
            <div className="span-two">
              {label(
                'specification',
                division === 'industrial' ? t.capacity : t.clinicalModel,
                true,
              )}
              <input
                {...a11y('specification')}
                key={`specification-${division}`}
                maxLength={1000}
              />
              {error('specification')}
            </div>
            <div>
              {label('quantity', t.quantity)}
              <input {...a11y('quantity')} type="number" min={1} max={10000} step={1} required />
              {error('quantity')}
            </div>
            <div>
              {label('timeline', t.timeline)}
              <select {...a11y('timeline')} defaultValue="" required>
                <option value="">{t.select}</option>
                {t.timelines.map((text, i) => (
                  <option value={i} key={text}>
                    {text}
                  </option>
                ))}
              </select>
              {error('timeline')}
            </div>
            <div className="span-two">
              {label('urgency', t.urgency)}
              <select
                {...a11y('urgency')}
                defaultValue=""
                required
                aria-describedby={errors.urgency ? 'urgency-help urgency-error' : 'urgency-help'}
              >
                <option value="">{t.select}</option>
                <option value="standard">{t.urgencies[0]}</option>
                <option value="time-sensitive">{t.urgencies[1]}</option>
              </select>
              {error('urgency')}
              <p id="urgency-help" className="field-help">
                {t.urgencyHelp}
              </p>
            </div>
            <div className="span-two">
              {label('details', t.details)}
              <textarea {...a11y('details')} rows={5} maxLength={4000} required />
              {error('details')}
              <p className="field-help">{t.noAttachments}</p>
            </div>
          </div>
          <div className="consent">
            <label>
              <input {...a11y('consent')} type="checkbox" value="yes" required />
              <span>{t.consent}</span>
            </label>
            {error('consent')}
            <a href={pathFor(locale, 'privacy')} className="text-link">
              {t.privacy}
            </a>
          </div>
          <button type="submit" className="button">
            {t.submit}
          </button>
        </form>
        {review && (
          <section
            id="review-result"
            className="inquiry-review"
            tabIndex={-1}
            aria-labelledby="summary-title"
          >
            <p className="eyebrow">{t.reviewed}</p>
            <h2 id="summary-title">{t.summary}</h2>
            <p>{t.reviewedText}</p>
            <dl className="review-fields">
              {(Object.keys(labels) as InquiryField[]).map((field) => (
                <div key={field}>
                  <dt>{labels[field]}</dt>
                  <dd>{reviewValue(field, review[field])}</dd>
                </div>
              ))}
            </dl>
            <button
              type="button"
              className="button button-outline"
              onClick={() => {
                setReview(null);
                requestAnimationFrame(() => document.getElementById('name')?.focus());
              }}
            >
              {t.edit}
            </button>
            <a className="text-link" href="mailto:info@ventilators.ca">
              info@ventilators.ca
            </a>
          </section>
        )}
      </div>
      <aside className="quote-aside">
        <p className="eyebrow">{d.nav.contact}</p>
        <h2>{t.support}</h2>
        <p>{t.supportText}</p>
        <a href="tel:+18336969996">(833) 696-9996</a>
        <a href="mailto:info@ventilators.ca">info@ventilators.ca</a>
        <hr />
        <p>{d[division].scopeText}</p>
      </aside>
    </div>
  );
}
