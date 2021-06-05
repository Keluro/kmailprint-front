// Printing format d : 7/12/1998
// Printing format D : Sunday, July 12, 1998
// Printing format f : Sunday, July 12, 1998 7:17 PM
// Printing format g : 7/12/1998 7:17 PM
// Printing format r : Sun, 12 Jul 1998 19:17:45 GMT
// Printing format s : 1998-07-12T19:17:45
// Printing format u : 1998-07-12 19:17:45Z
// Printing format U : Sunday, July 12, 1998 5:17:45 PM
// Printing for culture fr-FR
// Printing format d : 12/07/1998
// Printing format D : dimanche 12 juillet 1998
// Printing format f : dimanche 12 juillet 1998 19:17
// Printing format g : 12/07/1998 19:17
// Printing format r : Sun, 12 Jul 1998 19:17:45 GMT
// Printing format s : 1998-07-12T19:17:45
// Printing format u : 1998-07-12 19:17:45Z
// Printing format U : dimanche 12 juillet 1998 17:17:45

import { Lang } from './Language';

export enum DateFormat {
  d = 'd',
  D = 'D',
  f = 'f',
  g = 'g',
  r = 'r',
  s = 's',
  u = 'u',
  U = 'U'
}

export const getAllFormats = (): DateFormat[] =>
  Object.keys(DateFormat).map((s) => s as DateFormat);

export const getFormat = (lang: Lang, format: DateFormat): string => {
  switch (lang) {
    case Lang.EN:
      return formattedUS(format);
    case Lang.FR:
      return formattedFr(format);
  }
};

const formattedFr = (format: DateFormat) => {
  switch (format) {
    case DateFormat.d:
      return '12/07/1998';
    case DateFormat.D:
      return 'dimanche 12 juillet 1998';
    case DateFormat.f:
      return 'dimanche 12 juillet 1998 19:17';
    case DateFormat.g:
      return '12/07/1998 19:17';
    case DateFormat.r:
      return 'Sun, 12 Jul 1998 19:17:45 GMT';
    case DateFormat.s:
      return '1998-07-12T19:17:45';
    case DateFormat.u:
      return '1998-07-12 19:17:45Z';
    case DateFormat.U:
      return 'dimanche 12 juillet 1998 17:17:45';
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
const formattedUS = (format: DateFormat) => {
  switch (format) {
    case DateFormat.d:
      return '7/12/1998';
    case DateFormat.D:
      return 'Sunday, July 12, 1998';
    case DateFormat.f:
      return 'Sunday, July 12, 1998 7:17 PM';
    case DateFormat.g:
      return '7/12/1998 7:17 PM';
    case DateFormat.r:
      return 'Sun, 12 Jul 1998 19:17:45 GMT';
    case DateFormat.s:
      return '1998-07-12T19:17:45';
    case DateFormat.u:
      return '1998-07-12 19:17:45Z';
    case DateFormat.U:
      return 'Sunday, July 12, 1998 5:17:45 PM';
  }
};
