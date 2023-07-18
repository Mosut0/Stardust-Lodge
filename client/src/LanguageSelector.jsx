import React, { useContext } from 'react';
import i18n from './i18n';

const LanguageSelector = () => {
  const { i18n } = useContext(i18n); // Access the i18next context

  const handleLanguageChange = (language) => {
    i18n.changeLanguage(language); // Change the language using i18next
  };

  return (
    <div>
      <button onClick={() => handleLanguageChange('en')}>English</button>
      <button onClick={() => handleLanguageChange('fr')}>Français</button>
    </div>
  );
};

export default LanguageSelector;
