import { Toggle } from '@fluentui/react';
import React from 'react';
import enStrings from '../locales/en';
import frStrings from '../locales/fr';

export const LocaleContext = React.createContext<LocaleContextType>({
  t: () => '',
  toggleLocale: function () {
    //
  }
});

export type LocaleContextType = {
  t: (path: string) => string;
  toggleLocale: () => void;
};

type Props = {
  children: React.ReactNode;
};

export const LocaleProvider = ({ children }: Props) => {
  const [locale, setLocale] = React.useState('en');

  const toggleLocale = () => {
    if (locale == 'en') {
      setLocale('fr');
    } else {
      setLocale('en');
    }
  };

  const t = (path: string) => {
    switch (locale) {
      case 'en':
        return enStrings[path];
      case 'fr':
        return frStrings[path];
      default:
        throw new Error('No Locale set');
    }
  };

  React.useEffect(() => {
    // We'd get the theme from a web API / local storage in a real app
    // We've hardcoded the theme in our example
    const currentLocale = 'fr';
    setLocale(currentLocale);
  }, []);

  return (
    <LocaleContext.Provider value={{ t, toggleLocale }}>
      {children}
    </LocaleContext.Provider>
  );
};

export default LocaleProvider;
