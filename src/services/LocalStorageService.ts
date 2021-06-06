const FILETITLE_PATTERN = 'filetitle_pattern';
const SAVE_ENTIRE_CONV = 'is_entire_conv';
const FORCE_LANG = 'language';
const PAPER = 'paper';
const DATE_FORMAT = 'date_format';
const INCLUDE_CCRECIPIENTS = 'includerecipients';

const getBooleanFromStorage = (key: string): boolean | undefined => {
  try {
    const str = window.localStorage.getItem(key);
    if (typeof str === 'string' && str !== '') {
      return str == 'true';
    }
    return undefined;
  } catch (ex) {
    console.log('Cannot access localStorage for getting');
    return undefined;
  }
};

const getStringFromStorage = (key: string): string | undefined => {
  try {
    const str = window.localStorage.getItem(key);
    if (typeof str === 'string' && str !== '') {
      return str;
    }
    return undefined;
  } catch (ex) {
    console.log('Cannot access localStorage for getting');
  }
};

const setInStorage = (key: string, val: string) => {
  try {
    window.localStorage.setItem(key, val);
  } catch (ex) {
    console.log('Cannot access localStorage for saving');
  }
};

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export const savePatternArrayStorage = (array: string[]) => {
  setInStorage(FILETITLE_PATTERN, array.join('¤'));
};

export const saveIsEntireConversationStorage = (isEntireConv: boolean) => {
  setInStorage(SAVE_ENTIRE_CONV, isEntireConv.toString());
};

export const saveLanguageStorage = (langKey: string) => {
  setInStorage(FORCE_LANG, langKey);
};

export const deleteLanguageStorage = () => {
  try {
    window.localStorage.removeItem(FORCE_LANG);
  } catch (ex) {
    console.log('Cannot access localStorage for deletion');
  }
};

export const getLanguageFromStorage = () => {
  return getStringFromStorage(FORCE_LANG);
};

export const getIsEntireConversationFromStorage = () => {
  return getBooleanFromStorage(SAVE_ENTIRE_CONV);
};

export const getPatternArrayFromStorage = () => {
  const value = getStringFromStorage(FILETITLE_PATTERN);
  if (value !== undefined) {
    return value.split('¤');
  }
  return undefined;
};

export const getPrintPaperFromStorage = () => {
  return getStringFromStorage(PAPER);
};

export const getDateFormatFromStorage = () => {
  return getStringFromStorage(DATE_FORMAT);
};

export const savePrintPaper = (paper: string) => {
  setInStorage(PAPER, paper);
};

export const saveDateFormat = (format: string) => {
  setInStorage(DATE_FORMAT, format);
};

export const saveIncludeCC = (includeCC: boolean) => {
  setInStorage(INCLUDE_CCRECIPIENTS, includeCC.toString());
};

export const getIncludeCCFromStorage = () => {
  return getBooleanFromStorage(INCLUDE_CCRECIPIENTS);
};
