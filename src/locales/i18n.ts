import enStrings from '../locales/en';
import frStrings from '../locales/fr';

export const tLocale = (locale: string, path: string) => {
  switch (locale) {
    case 'en':
      return enStrings[path];
    case 'fr':
      return frStrings[path];
    default:
      throw new Error('No Locale set');
  }
};
