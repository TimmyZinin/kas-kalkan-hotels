// i18n for Kaş Hotel Companion — TR (default) / EN / RU
import { STRINGS } from './strings.js';

const LOCALES = ['tr', 'en', 'ru'];
const DEFAULT = 'tr';

function detect() {
  const stored = localStorage.getItem('kh-lang');
  if (stored && LOCALES.includes(stored)) return stored;
  const nav = (navigator.language || '').slice(0, 2).toLowerCase();
  return LOCALES.includes(nav) ? nav : DEFAULT;
}

let current = detect();

export function t(key, vars = {}) {
  const entry = STRINGS[key];
  if (!entry) return key; // fallback
  let val = entry[current] ?? entry[DEFAULT] ?? key;
  // interpolate {name} style vars
  if (vars && Object.keys(vars).length) {
    val = val.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? '');
  }
  return val;
}

// For dynamic objects that carry their own locale variants
export function pick(obj) {
  if (obj == null) return '';
  if (typeof obj === 'string') return obj;
  return obj[current] ?? obj[DEFAULT] ?? '';
}

export function getLocale() { return current; }

export function setLocale(code) {
  if (!LOCALES.includes(code)) return;
  current = code;
  localStorage.setItem('kh-lang', code);
  document.documentElement.setAttribute('lang', code);
  document.dispatchEvent(new CustomEvent('locale-changed', { detail: { locale: code } }));
}

export const LANG_LABELS = {
  tr: { short: 'TR', full: 'Türkçe' },
  en: { short: 'EN', full: 'English' },
  ru: { short: 'RU', full: 'Русский' },
};

export const LANGS = LOCALES;

// Apply lang attribute on load
document.documentElement.setAttribute('lang', current);
