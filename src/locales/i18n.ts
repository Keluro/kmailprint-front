import enStrings from '../locales/en';
import frStrings from '../locales/fr';
import { Lang } from '../services/Language';

export const tLocale = (locale: Lang, path: string): string => {
  switch (locale) {
    case Lang.EN:
      return enStrings[path];
    case Lang.FR:
      return frStrings[path];
    default:
      throw new Error('No Locale set');
  }
};
