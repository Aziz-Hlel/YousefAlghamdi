import i18n from "i18next";
import {  initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import { ArabicSvg, EnglishSvg, FrenchSvg } from '@src/component/Navbar2/languagesSvg';
import Backend from 'i18next-http-backend';

export const languages = {
  en: { nativeName: 'English', icon: EnglishSvg, dir: 'ltr' },
  fr: { nativeName: 'Français', icon: FrenchSvg, dir: 'ltr' },
  ar: { nativeName: 'العربية', icon: ArabicSvg, dir: 'rtl' },
};

const supportedLanguages = Object.keys(languages);
export type SupportedLanguage = keyof typeof languages;

// Professional language detection configuration
const detectionOptions = {
  // Order matters - this is the detection priority
  order: ['localStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
  
  // Look for these keys in localStorage/sessionStorage
  lookupLocalStorage: 'i18nextLng',
  
  // Cache user selection in localStorage
  caches: ['localStorage'],
  
  // Exclude certain detection methods that might cause issues
  excludeCacheFor: ['cimode'],
  
  // ✅ KEY FIX: This tells i18next to only return supported languages
  checkWhitelist: true,
};

i18n
  .use(Backend)
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    fallbackLng: "en",
    
    // ✅ CRITICAL: This configuration handles locale normalization
    supportedLngs: supportedLanguages,
    
    // ✅ This prevents loading unsupported language variations
    nonExplicitSupportedLngs: true,
    
    // ✅ MOST IMPORTANT: This normalizes locales to base languages
    // en-US, en-GB, en-CA all become "en"
    // fr-FR, fr-CA all become "fr" 
    // ar-SA, ar-EG all become "ar"
    load: 'languageOnly',
    
    ns: ['common', 'errors', 'home', 'aboutUs', 'addProperty', 'propertySingle', 'alerts', 'contactUs', 'dashboard', 'data', 'login', 'properties', 'submitProperty', 'errors'],
    
    defaultNS: 'common',
    
    detection: detectionOptions,
    
    backend: {

      loadPath: '/locales/{{lng}}/{{ns}}.json',
      requestOptions: {
        cache: 'default',

      },
    },
    
    debug: import.meta.env.VITE_API_NODE_ENV === 'development',
    
    interpolation: {
      escapeValue: false
    },
    
    react: {
      useSuspense: true
    }
  });

// ✅ Professional helper to safely get current language
export const getCurrentLanguage = (): SupportedLanguage => {
  const currentLang = i18n.language;
  
  // Fallback logic in case something goes wrong
  if (currentLang in languages) {
    return currentLang as SupportedLanguage;
  }
  
  // Extract base language from locale (en-US -> en)
  const baseLang = currentLang.split('-')[0];
  if (baseLang in languages) {
    return baseLang as SupportedLanguage;
  }
  
  // Final fallback
  return 'en';
};

// ✅ Professional helper to safely get language icon
export const getCurrentLanguageIcon = () => {
  const lang = getCurrentLanguage();
  return languages[lang].icon;
};

// Enhanced language change function with proper error handling
export const changeLanguage = async (lng: SupportedLanguage): Promise<void> => {
  try {
    if (i18n.language !== lng) {
      await i18n.changeLanguage(lng);
      applyLanguageDirection(lng);
      localStorage.setItem('i18nextLng', lng);
      console.log(`Language changed to: ${lng}`);
    }
  } catch (error) {
    console.error('Failed to change language:', error);
    if (lng !== 'en') {
      await changeLanguage('en');
    }
  }
};

// Separate function for DOM manipulation - easier to test and maintain
export const applyLanguageDirection = (lng: SupportedLanguage): void => {
  const dir = languages[lng]?.dir || 'ltr';
  
  // Batch DOM updates to avoid layout thrashing
  document.documentElement.dir = dir;
  document.documentElement.lang = lng;
  document.documentElement.setAttribute('data-direction', dir);
  
  // Optional: dispatch custom event for components that need to react to direction changes
  window.dispatchEvent(new CustomEvent('languageDirectionChange', { 
    detail: { language: lng, direction: dir } 
  }));
};

// Initialize direction on app start
i18n.on('initialized', () => {
  const currentLang = getCurrentLanguage();
  applyLanguageDirection(currentLang);
});

// Handle language changes from other sources
i18n.on('languageChanged', (lng) => {
  applyLanguageDirection(lng as SupportedLanguage);
});