import React, { createContext, useContext, useState, useEffect } from 'react';

export const languages = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'Hindi' },
  { code: 'as', name: 'Assamese' },
  { code: 'kha', name: 'Khasi' },
  { code: 'lus', name: 'Mizo' },
  { code: 'nag', name: 'Nagamese' },
  { code: 'grt', name: 'Garo' },
  { code: 'ne', name: 'Nepali' },
];

interface LanguageContextType {
  currentLanguage: string;
  setLanguage: (code: string) => void;
  getLanguageName: (code: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<string>(() => {
    return localStorage.getItem('preferred-language') || 'en';
  });

  useEffect(() => {
    localStorage.setItem('preferred-language', currentLanguage);
  }, [currentLanguage]);

  const setLanguage = (code: string) => {
    setCurrentLanguage(code);
  };

  const getLanguageName = (code: string) => {
    return languages.find(lang => lang.code === code)?.name || 'English';
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, getLanguageName }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
