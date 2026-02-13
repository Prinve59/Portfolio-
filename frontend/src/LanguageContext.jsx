import React, {createContext , useState} from "react";
import en from "./locales/en.json";
import hi from "./locales/hi.json";

export const LanguageContext = createContext();

const translations = {en,hi};

export const LanguageProvider = ({ children }) => {
    //current language
    const [language, setLanguage] = useState('en');
    //change language
    const changeLanguage = (lang) => {
        console.log("Changing language to:", lang); 
        setLanguage(lang)};
    //translation function
    const t = (key) => {
        const keys = key.split(".");
        let result = translations[language];

        for (let k of keys) {
        result = result?.[k];
        }

        return result || key;
   };
    return (
        <LanguageContext.Provider value={{ language, changeLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};