'use client';
import { useEffect, useRef, useState } from 'react';
import { useForm } from '@formspree/react';
import { useSearchParams } from 'next/navigation';
import { formspreeId, inquiryPayload } from '@/lib/inquiry-delivery';
import { inquiryAnalytics } from '@/lib/analytics-bridge';

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
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'error'>('idle');
  const [review, setReview] = useState<InquiryInput | null>(null);
  const [technicalOpen, setTechnicalOpen] = useState(false);
  const [delivery, sendInquiry, resetDelivery] = useForm(formspreeId);
  const [unexpectedError, setUnexpectedError] = useState(false);
  const [slow, setSlow] = useState(false);
  const [reference, setReference] = useState('');
  const [acceptedAt, setAcceptedAt] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const sending = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);
  const analyticsStarted = useRef(false);
  const analyticsSubmitted = useRef('');
  const d = dictionaries[locale];
  const t = d.form;
  const deliveryFailed = !!delivery.errors || unexpectedError;
  useEffect(() => {
    if (delivery.succeeded && reference && analyticsSubmitted.current !== reference) {
      analyticsSubmitted.current = reference;
      inquiryAnalytics('rfq_submitted');
    }
  }, [delivery.succeeded, reference]);
  useEffect(() => {
    if (delivery.succeeded || deliveryFailed) document.getElementById('delivery-result')?.focus();
  }, [delivery.succeeded, deliveryFailed]);
  useEffect(() => {
    if (!delivery.submitting) return;
    const timer = window.setTimeout(() => setSlow(true), 15000);
    return () => window.clearTimeout(timer);
  }, [delivery.submitting]);
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
    const data = new FormData(event.currentTarget);
    const input = readInquiry(data);
    const nextErrors = validateInquiry(input);
    setErrors(nextErrors);
    if (
      ['model', 'specification', 'quantity', 'timeline', 'urgency'].some(
        (field) => nextErrors[field as InquiryField],
      )
    )
      setTechnicalOpen(true);
    setCopyStatus('idle');
    resetDelivery();
    setUnexpectedError(false);
    setReference(`VCA-${crypto.randomUUID()}`);
    setAcceptedAt(new Date().toISOString());
    setHoneypot(String(data.get('_gotcha') || ''));
    setReview(Object.keys(nextErrors).length === 0 ? input : null);
    requestAnimationFrame(() =>
      document
        .getElementById(Object.keys(nextErrors).length ? 'error-summary' : 'review-result')
        ?.focus(),
    );
  }
  async function sendReviewedInquiry() {
    if (!review || sending.current || delivery.succeeded) return;
    sending.current = true;
    setUnexpectedError(false);
    setSlow(false);
    try {
      await sendInquiry(inquiryPayload(review, locale, reference, acceptedAt, honeypot));
    } catch {
      resetDelivery();
      setUnexpectedError(true);
    } finally {
      sending.current = false;
    }
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
    if (field === 'quantity' && !value) return t.notKnown;
    if (field === 'timeline') return value ? t.timelines[Number(value)] : t.notKnown;
    if (field === 'urgency')
      return value ? t.urgencies[value === 'standard' ? 0 : 1] : t.notProvided;
    if (field === 'consent') return t.acknowledged;
    return value || t.notProvided;
  }
  return (
    <div className="container quote-layout">
      <div>
        <div className="notice" role="note">
          <strong>{t.deliveryTitle}</strong>
          <p>{t.deliveryIntro}</p>
        </div>
        <form
          ref={formRef}
          method="post"
          noValidate
          hidden={!!review}
          onSubmit={submit}
          onChangeCapture={() => {
            if (!analyticsStarted.current)
              analyticsStarted.current = inquiryAnalytics('rfq_started');
          }}
          aria-label={t.title}
        >
          <div className="form-trap" aria-hidden="true">
            <label htmlFor="website">{t.leaveBlank}</label>
            <input id="website" name="_gotcha" type="text" tabIndex={-1} autoComplete="off" />
          </div>
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
              {label('details', division === 'industrial' ? t.industrialDetails : t.medicalDetails)}
              <textarea
                {...a11y('details')}
                rows={4}
                maxLength={4000}
                required
                aria-describedby={errors.details ? 'details-help details-error' : 'details-help'}
              />
              {error('details')}
              <p className="field-help" id="details-help">
                {division === 'industrial' ? t.industrialHelp : t.medicalHelp} {t.noAttachments}
              </p>
            </div>
          </div>
          <details
            className="inquiry-optional"
            open={technicalOpen}
            onToggle={(event) => setTechnicalOpen(event.currentTarget.open)}
          >
            <summary>{t.optionalDetails}</summary>
            <p className="field-help">{t.optionalHelp}</p>
            <div className="form-grid">
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
                <input {...a11y('specification')} maxLength={1000} />
                {error('specification')}
              </div>
              <div>
                {label('quantity', t.quantity, true)}
                <input
                  {...a11y('quantity')}
                  type="number"
                  min={1}
                  max={10000}
                  step={1}
                  placeholder={t.notKnown}
                />
                {error('quantity')}
              </div>
              <div>
                {label('timeline', t.timeline, true)}
                <select {...a11y('timeline')} defaultValue="">
                  <option value="">{t.notKnown}</option>
                  {t.timelines.map((text, i) => (
                    <option value={i} key={text}>
                      {text}
                    </option>
                  ))}
                </select>
                {error('timeline')}
              </div>
              <div className="span-two">
                {label('urgency', t.urgency, true)}
                <select
                  {...a11y('urgency')}
                  defaultValue=""
                  aria-describedby={errors.urgency ? 'urgency-help urgency-error' : 'urgency-help'}
                >
                  <option value="">{t.notProvided}</option>
                  <option value="standard">{t.urgencies[0]}</option>
                  <option value="time-sensitive">{t.urgencies[1]}</option>
                </select>
                {error('urgency')}
                <p id="urgency-help" className="field-help">
                  {t.urgencyHelp}
                </p>
              </div>
            </div>
          </details>
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
        {delivery.succeeded && (
          <section
            id="delivery-result"
            className="notice inquiry-success"
            tabIndex={-1}
            aria-labelledby="sent-title"
            role="status"
          >
            <h2 id="sent-title">{t.sentTitle}</h2>
            <p>{t.sentText}</p>
            <p className="inquiry-reference">
              {t.reference}: <strong>{reference}</strong>
            </p>
            <button
              type="button"
              className="button button-outline"
              onClick={() => {
                formRef.current?.reset();
                setTechnicalOpen(false);
                analyticsStarted.current = false;
                resetDelivery();
                setReview(null);
                setCopyStatus('idle');
                setUnexpectedError(false);
                requestAnimationFrame(() => document.getElementById('name')?.focus());
              }}
            >
              {t.newInquiry}
            </button>
          </section>
        )}
        {review && !delivery.succeeded && (
          <section
            id="review-result"
            className="inquiry-review"
            tabIndex={-1}
            aria-labelledby="summary-title"
          >
            <p className="eyebrow">
              {delivery.submitting ? t.sending : deliveryFailed ? t.unconfirmed : t.reviewed}
            </p>
            <h2 id="summary-title">{t.summary}</h2>
            <p>{t.reviewedText}</p>
            <p className="inquiry-reference">
              {t.reference}: {reference}
            </p>
            {deliveryFailed && !delivery.submitting && (
              <div id="delivery-result" className="error-summary" role="alert" tabIndex={-1}>
                <strong>{t.failedTitle}</strong>
                <p>{t.failedText}</p>
                {!!delivery.errors?.getAllFieldErrors().length && (
                  <p>
                    {t.providerFields}:{' '}
                    {delivery.errors
                      .getAllFieldErrors()
                      .map(([field]) => labels[field as InquiryField] || t.details)
                      .join(', ')}
                    . {t.editToCorrect}
                  </p>
                )}
              </div>
            )}
            <button
              type="button"
              className="button"
              onClick={sendReviewedInquiry}
              disabled={delivery.submitting}
              aria-busy={delivery.submitting}
            >
              {delivery.submitting ? t.sending : deliveryFailed ? t.retry : t.send}
            </button>
            <p role="status">{delivery.submitting ? (slow ? t.slow : t.sending) : ''}</p>
            <div className="review-actions">
              <button
                type="button"
                className="button button-outline"
                onClick={async () => {
                  const text = [
                    'Ventilators.ca',
                    t.summary,
                    `${t.reference}: ${reference}`,
                    ...(Object.keys(labels) as InquiryField[])
                      .filter((field) => field !== 'consent')
                      .map((field) => `${labels[field]}: ${reviewValue(field, review[field])}`),
                  ].join('\n\n');
                  try {
                    await navigator.clipboard.writeText(text);
                    setCopyStatus('copied');
                  } catch {
                    setCopyStatus('error');
                  }
                }}
              >
                {t.copy}
              </button>
              <a
                className="button button-outline"
                href={`mailto:info@ventilators.ca?subject=${encodeURIComponent(`${t.emailSubject} — ${d.nav[division]}`)}`}
              >
                {t.openEmail}
              </a>
            </div>
            <p role="status" className="copy-status">
              {copyStatus === 'copied' ? t.copied : copyStatus === 'error' ? t.copyError : ''}
            </p>
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
              disabled={delivery.submitting}
              onClick={() => {
                resetDelivery();
                setUnexpectedError(false);
                setReview(null);
                setCopyStatus('idle');
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
        <h2>{t.nextTitle}</h2>
        <p>{t.nextText}</p>
        <hr />
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
