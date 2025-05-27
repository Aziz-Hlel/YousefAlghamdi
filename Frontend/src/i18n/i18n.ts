import { createRoot } from 'react-dom/client';
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
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

    // Only detect supported languages
    checkWhitelist: true,
};



i18n
    .use(Backend)
    .use(initReactI18next) // passes i18n down to react-i18next
    .use(LanguageDetector) // Detect user language

    .init({


        // lng: "en", // ❌ Don't set this when using detector

        fallbackLng: "en",

        // Whitelist supported languages to prevent loading unsupported ones
        supportedLngs: supportedLanguages,

        // This prevents falling back to keys that look like language codes
        nonExplicitSupportedLngs: true,


        ns: ['common', 'errors', 'home', 'aboutUs', 'addProperty', 'propertySingle', 'alerts', 'contactUs', 'dashboard', 'data', 'login', 'properties', 'submitProperty', 'errors'],
        defaultNS: 'common',

        detection: detectionOptions,


        backend: {
            loadPath: '/locales/{{lng}}/{{ns}}.json',
            // Add error handling for missing translation files
            requestOptions: {
                cache: 'default',
            },
        },

        debug: import.meta.env.VITE_API_NODE_ENV === 'development',

        interpolation: {
            escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
        },

        // React i18next specific options
        react: {
            useSuspense: true
        }



    });



// Helper function to handle RTL/LTR direction changes
// Enhanced language change function with proper error handling
export const changeLanguage = async (lng: SupportedLanguage): Promise<void> => {
  try {
    if (i18n.language !== lng) {
      // Change language in i18next
      await i18n.changeLanguage(lng);
      
      // Apply RTL/LTR to document
      applyLanguageDirection(lng);
      
      // Persist user preference - this is automatically handled by LanguageDetector
      // but we can be explicit about it
      localStorage.setItem('i18nextLng', lng);
      
      console.log(`Language changed to: ${lng}`);
    }
  } catch (error) {
    console.error('Failed to change language:', error);
    // Fallback to English if language change fails
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
  
  // Use data attribute instead of class for better CSS targeting
  document.documentElement.setAttribute('data-direction', dir);
  
  // Optional: dispatch custom event for components that need to react to direction changes
  window.dispatchEvent(new CustomEvent('languageDirectionChange', { 
    detail: { language: lng, direction: dir } 
  }));
};




// Initialize direction on app start
i18n.on('initialized', () => {
  const currentLang = i18n.language as SupportedLanguage;
  applyLanguageDirection(currentLang);
});

// Handle language changes from other sources (e.g., browser language change)
i18n.on('languageChanged', (lng) => {
  applyLanguageDirection(lng as SupportedLanguage);
});
