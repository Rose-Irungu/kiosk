import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Lazy-load JSON files with dynamic imports (works in modern bundlers)
const loadLocales = async (lng) => {
  // Map language codes to the JSON modules
  const files = {
    en: () => import('../locales/en/translation.json'),
    sw: () => import('../locales/sw/translation.json'),
    fr: () => import('../locales/fr/translation.json'),
    zh: () => import('../locales/zh/translation.json'),
  };

  const resModule = await files[lng]();        // pull in the JSON
  return resModule.default || resModule;       // ESM / CJS compat
};

await i18next
  .use(LanguageDetector)                       // checks navigator.language etc.
  .init({
    fallbackLng: 'en',
    debug: import.meta.env?.DEV,               // only chatty in dev
    resources: {},                             // we’ll fill this on-the-fly
    interpolation: { escapeValue: false },     // allow HTML in strings
    react: { useSuspense: false },             // harmless for non-React too
    initImmediate: false                       // ensure synchronous t() calls
  });

// Kick-off initial language load
await i18next.addResources(
  i18next.language,
  'translation',
  await loadLocales(i18next.language)
);

// Hot-swap when the user changes language
i18next.on('languageChanged', async (lng) => {
  if (!i18next.hasResourceBundle(lng, 'translation')) {
    const bundle = await loadLocales(lng);
    i18next.addResources(lng, 'translation', bundle);
  }
});

export const t = (...args) => i18next.t(...args);
export default i18next;
