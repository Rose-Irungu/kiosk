// import i18next from 'i18next';
// import LanguageDetector from 'i18next-browser-languagedetector';
// import { initReactI18next } from 'react-i18next';


// const bundleLoaders = {
//   en: () => import('../locales/en/translation.json'),
//   sw: () => import('../locales/sw/translation.json'),
//   fr: () => import('../locales/fr/translation.json'),
//   zh: () => import('../locales/zh/translation.json'),
// };

// const baseCode = (lng) =>
//   (typeof lng === 'string' && lng.split('-')[0]) || 'en';

// const loadBundle = async (lng) => {
//   const loader = bundleLoaders[baseCode(lng)] ?? bundleLoaders.en;
//   const mod = await loader();
//   return mod.default ?? mod; 
// };


// async function setupI18n() {
//   await i18next
//     .use(LanguageDetector)
//     .use(initReactI18next)
//     .init({
//       fallbackLng: 'en',
//       debug: Boolean(import.meta?.env?.DEV),
//       resources: {}, 
//       defaultNS: 'translation',
//       interpolation: { escapeValue: false },
//       react: { useSuspense: true },
//       initImmediate: false, 
//     });


//   const initialLng = baseCode(
//     i18next.resolvedLanguage || i18next.language || 'en',
//   );
//   const initialBundle = await loadBundle(initialLng);
//   i18next.addResourceBundle(
//     initialLng,
//     'translation',
//     initialBundle,
//     true,
//     true,
//   );

//   /* ---- hot‑load on future language switches ---- */
//   i18next.on('languageChanged', async (lng) => {
//     const code = baseCode(lng);
//     if (!i18next.hasResourceBundle(code, 'translation')) {
//       const bundle = await loadBundle(code);
//       i18next.addResourceBundle(code, 'translation', bundle, true, true);
//     }
//   });
// }

// await setupI18n();

// export const t = (...args) => i18next.t(...args);
// export default i18next;
