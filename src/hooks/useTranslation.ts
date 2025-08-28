import { useState, useEffect } from 'react';
import { translations, Translations } from '../translations';

type Language = 'en' | 'uz' | 'ru' | 'zh';

export const useTranslation = () => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(() => {
    // Get language from localStorage or default to 'en'
    const savedLanguage = localStorage.getItem('language') as Language;
    return savedLanguage && Object.keys(translations).includes(savedLanguage) ? savedLanguage : 'en';
  });

  const t: Translations = translations[currentLanguage];

  const changeLanguage = (language: Language) => {
    setCurrentLanguage(language);
    localStorage.setItem('language', language);
    
    // Dispatch custom event for other components to listen to language changes
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: language }));
  };

  // Listen for language changes from other components
  useEffect(() => {
    const handleLanguageChange = (event: CustomEvent) => {
      setCurrentLanguage(event.detail);
    };

    window.addEventListener('languageChanged', handleLanguageChange as EventListener);
    return () => window.removeEventListener('languageChanged', handleLanguageChange as EventListener);
  }, []);

  return {
    t,
    currentLanguage,
    changeLanguage,
    availableLanguages: Object.keys(translations) as Language[]
  };
};