import React from 'react';
import { tLocale } from '../locales/i18n';
import { IOutlookService } from '../services/IOulookService';

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

export type LocaleProviderPropTypes = Props & {
  outlookService: IOutlookService;
};

export const LocaleProvider = ({
  children,
  outlookService
}: LocaleProviderPropTypes): JSX.Element => {
  const [locale, setLocale] = React.useState(outlookService.getLocale());

  // NB: the fact that the locale can be set and is a state
  // is actually only used in OutlookMock with the Toggle button.
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
