import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import translationEN from "./locales/en/translation.json";
import translationHI from "./locales/hi/translation.json";
import translationES from "./locales/es/translation.json";
import translationJA from "./locales/ja/translation.json";
import translationMR from "./locales/mr/translation.json";

const resources = {
  en: { translation: translationEN },
  hi: { translation: translationHI },
  es: { translation: translationES },
  ja: { translation: translationJA },
  mr: { translation: translationMR },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: localStorage.getItem("language") || "en", 
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;
