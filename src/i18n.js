// src/i18n.js

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
  const base = (lng ?? 'en').split('-')[0];
  const loader = files[base] || files.en;
  const mod = await loader();
  return mod.default || mod;
};

// -------- init function --------
export const initI18n = async () => {
  await i18next
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      fallbackLng: 'en',
      debug: import.meta.env?.DEV,
      resources: {},
      defaultNS: 'translation',
      interpolation: { escapeValue: false },
      react: { useSuspense: false },
      initImmediate: false,
    });

  // preload default bundle
  const base = (i18next.language || 'en').split('-')[0];
  const bundle = await loadLocales(base);
  i18next.addResourceBundle(base, 'translation', bundle, true, true);

  // dynamic hot-swap
  i18next.on('languageChanged', async (lng) => {
    const base = lng.split('-')[0];
    if (!i18next.hasResourceBundle(base, 'translation')) {
      const bundle = await loadLocales(base);
      i18next.addResourceBundle(base, 'translation', bundle, true, true);
    }
  });
};

// export for use
export const t = (...args) => i18next.t(...args);
export default i18next;
