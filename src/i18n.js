// i18n.js — patched ✅
// Loads translation JSON on‑demand and registers bundles the right way.

import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

// -------- lazy loader --------
const files = {
  en: () => import('../locales/en/translation.json'),
  sw: () => import('../locales/sw/translation.json'),
  fr: () => import('../locales/fr/translation.json'),
  zh: () => import('../locales/zh/translation.json'),
};

const loadLocales = async (lng) => {
  const base = (lng ?? 'en').split('-')[0];     // e.g. 'en-US' ➜ 'en'
  const loader = files[base] || files.en;       // default to English
  const mod = await loader();
  return mod.default || mod;                    // ESM / CJS compat
};

// -------- i18next boot --------
await i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: import.meta.env?.DEV,
    resources: {},                              // we’ll inject bundles on the fly
    defaultNS: 'translation',
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
    initImmediate: false,
  });

// -------- preload initial bundle --------
{
  const base = (i18next.language || 'en').split('-')[0];
  const bundle = await loadLocales(base);
  i18next.addResourceBundle(base, 'translation', bundle, true, true); // deep‑merge + overwrite
}

// -------- hot‑swap on language change --------
i18next.on('languageChanged', async (lng) => {
  const base = lng.split('-')[0];
  if (!i18next.hasResourceBundle(base, 'translation')) {
    const bundle = await loadLocales(base);
    i18next.addResourceBundle(base, 'translation', bundle, true, true);
  }
});

export const t = (...args) => i18next.t(...args);
export default i18next;
