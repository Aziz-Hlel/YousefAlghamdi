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



i18n
    .use(Backend)
    .use(initReactI18next) // passes i18n down to react-i18next
    .use(LanguageDetector) // Detect user language

    .init({


        lng: "en", // if you're using a language detector, do not define the lng option
        fallbackLng: "en",

        ns: ['common', 'errors', 'home', 'aboutUs', 'addProperty', 'propertySingle', 'alerts', 'contactUs', 'dashboard', 'data', 'login', 'properties', 'submitProperty', 'errors'],
        defaultNS: 'common',


        backend: {
            loadPath: '/locales/{{lng}}/{{ns}}.json'
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
export const changeLanguage = async (lng: string) => {
    if (i18n.language !== lng) {
        // Change language in i18next
        await i18n.changeLanguage(lng);

        // Apply RTL/LTR to document
        const dir = languages[lng as keyof typeof languages]?.dir || 'ltr';
        document.documentElement.dir = dir;
        document.documentElement.lang = lng;

        // You might also want to add a class to your root element for additional styling
        if (dir === 'rtl') {
            document.documentElement.classList.add('rtl');
        } else {
            document.documentElement.classList.remove('rtl');
        }
    }
};