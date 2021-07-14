// Printing format d : 7/12/1998
// Printing format D : Sunday, July 12, 1998
// Printing format f : Sunday, July 12, 1998 7:17 PM
// Printing format g : 7/12/1998 7:17 PM
// Printing format s : 1998-07-12T19:17:45
// Printing format u : 1998-07-12 19:17:45Z
// Printing format U : Sunday, July 12, 1998 5:17:45 PM
// Printing for culture fr-FR
// Printing format d : 12/07/1998
// Printing format D : dimanche 12 juillet 1998
// Printing format f : dimanche 12 juillet 1998 19:17
// Printing format g : 12/07/1998 19:17
// Printing format s : 1998-07-12T19:17:45
// Printing format u : 1998-07-12 19:17:45Z
// Printing format U : dimanche 12 juillet 1998 17:17:45

import { Lang } from './Language';

export const FORMAT_d = 'd';
const FORMAT_D = 'D';
const FORMAT_f = 'f';
const FORMAT_g = 'g';
const FORMAT_s = 's';
const FORMAT_sbis = "'yyyy'-'MM'-'dd'_'HH':'mm':'ss'";
const FORMAT_u = 'u';
const FORMAT_U = 'U';

export const getAllFormats = (): string[] => [
  FORMAT_d,
  FORMAT_D,
  FORMAT_f,
  FORMAT_g,
  FORMAT_sbis,
  FORMAT_u,
  FORMAT_U
];

export const getFormat = (lang: Lang, format: string): string => {
  switch (lang) {
    case Lang.EN:
      return formattedUS(format);
    case Lang.FR:
      return formattedFr(format);
  }
};

const formattedFr = (format: string) => {
  switch (format) {
    case FORMAT_d:
      return '12/07/1998';
    case FORMAT_D:
      return 'dimanche 12 juillet 1998';
    case FORMAT_f:
      return 'dimanche 12 juillet 1998 19:17';
    case FORMAT_g:
      return '12/07/1998 19:17';
    case FORMAT_s:
      return '1998-07-12T19:17:45';
    case FORMAT_sbis:
      return '1998-07-12_19:17:45';
    case FORMAT_u:
      return '1998-07-12 19:17:45Z';
    case FORMAT_U:
      return 'dimanche 12 juillet 1998 17:17:45';
    default:
      return '?';
  }
};

// Printing format d : 7/12/1998
// Printing format D : Sunday, July 12, 1998
// Printing format f : Sunday, July 12, 1998 7:17 PM
// Printing format g : 7/12/1998 7:17 PM
// Printing format r : Sun, 12 Jul 1998 19:17:45 GMT
// Printing format s : 1998-07-12T19:17:45
// Printing format u : 1998-07-12 19:17:45Z
// Printing format U : Sunday, July 12, 1998 5:17:45 PM
const formattedUS = (format: string) => {
  switch (format) {
    case FORMAT_d:
      return '7/12/1998';
    case FORMAT_D:
      return 'Sunday, July 12, 1998';
    case FORMAT_f:
      return 'Sunday, July 12, 1998 7:17 PM';
    case FORMAT_g:
      return '7/12/1998 7:17 PM';
    case FORMAT_s:
      return '1998-07-12T19:17:45';
    case FORMAT_sbis:
      return '1998-07-12_19:17:45';
    case FORMAT_u:
      return '1998-07-12 19:17:45Z';
    case FORMAT_U:
      return 'Sunday, July 12, 1998 5:17:45 PM';
    default:
      return '?';
  }
};
