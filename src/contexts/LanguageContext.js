import React, { createContext, useContext, useState, useEffect } from "react";
import { en, ar } from "../locales";

const LanguageContext = createContext();

const translations = {
  en,
  ar,
};

export const LanguageProvider = ({ children }) => {
  // Get initial language from localStorage or default to 'en'
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem("language");
    return savedLanguage || "en";
  });

  const [direction, setDirection] = useState(() => {
    const savedLanguage = localStorage.getItem("language");
    return savedLanguage === "ar" ? "rtl" : "ltr";
  });

  // Update document direction and save to localStorage when language changes
  useEffect(() => {
    const dir = language === "ar" ? "rtl" : "ltr";
    setDirection(dir);
    document.documentElement.dir = dir;
    document.documentElement.lang = language;
    localStorage.setItem("language", language);
  }, [language]);

  // Toggle between languages
  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "ar" : "en"));
  };

  // Change to a specific language
  const changeLanguage = (lang) => {
    if (translations[lang]) {
      setLanguage(lang);
    }
  };

  // Get translation for a key (supports nested keys like "login.username")
  const t = (key) => {
    const keys = key.split(".");
    let value = translations[language];
    
    for (const k of keys) {
      if (value && value[k]) {
        value = value[k];
      } else {
        return key; // Return key if translation not found
      }
    }
    
    return value;
  };

  // Check if current language is RTL
  const isRTL = language === "ar";

  return (
    <LanguageContext.Provider
      value={{
        language,
        direction,
        isRTL,
        toggleLanguage,
        changeLanguage,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

export default LanguageContext;

