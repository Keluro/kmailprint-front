import React from 'react';
import { tLocale } from '../locales/i18n';

export const LocaleContext = React.createContext<LocaleContextType>({
  t: () => '',
  toggleLocale: () => {}
});

export type LocaleContextType = {
  t: (path: string) => string;
  toggleLocale: () => void;
};

type Props = {
  children: React.ReactNode;
};

export const LocaleProvider = ({ children }: Props): JSX.Element => {
  const [locale, setLocale] = React.useState('en');

  const toggleLocale = () => {
    if (locale == 'en') {
      setLocale('fr');
    } else {
      setLocale('en');
    }
  };

  const t = (path: string) => {
    return tLocale(locale, path);
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
