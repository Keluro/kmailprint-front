import React from 'react';
import { tLocale } from '../locales/i18n';
import { IOutlookService } from '../services/IOulookService';

export const LocaleContext = React.createContext<LocaleContextType>({
  t: () => ''
});

export type LocaleContextType = {
  t: (path: string) => string;
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
  const locale = outlookService.getLocale();

  const t = (path: string) => {
    return tLocale(locale, path);
  };

  return (
    <LocaleContext.Provider value={{ t }}>{children}</LocaleContext.Provider>
  );
};

export default LocaleProvider;
