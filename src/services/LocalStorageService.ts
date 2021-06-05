const FILETITLE_PATTERN = 'filetitle_pattern';
const SAVE_ENTIRE_CONV = 'is_entire_conv';
const FORCE_LANG = 'language';
const PAPER = 'paper';

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export const savePatternArrayStorage = (array: string[]) => {
  try {
    window.localStorage.setItem(FILETITLE_PATTERN, array.join('¤'));
  } catch (ex) {
    console.log('Cannot access localStorage for saving');
  }
};

export const saveIsEntireConversationStorage = (isEntireConv: boolean) => {
  try {
    window.localStorage.setItem(SAVE_ENTIRE_CONV, isEntireConv.toString());
  } catch (ex) {
    console.log('Cannot access localStorage for saving');
  }
};

export const saveLanguageStorage = (langKey: string) => {
  try {
    window.localStorage.setItem(FORCE_LANG, langKey);
  } catch (ex) {
    console.log('Cannot access localStorage for saving');
  }
};

export const deleteLanguageStorage = () => {
  try {
    window.localStorage.removeItem(FORCE_LANG);
  } catch (ex) {
    console.log('Cannot access localStorage for deletion');
  }
};

export const getLanguageFromStorage = () => {
  try {
    const str = window.localStorage.getItem(FORCE_LANG);
    if (typeof str === 'string' && str !== '') {
      return str;
    }
    return undefined;
  } catch (ex) {
    console.log('Cannot access localStorage for getting');
  }
};

export const getIsEntireConversationFromStorage = () => {
  try {
    const str = window.localStorage.getItem(SAVE_ENTIRE_CONV);
    if (typeof str === 'string' && str !== '') {
      return str == 'true';
    }
    return undefined;
  } catch (ex) {
    console.log('Cannot access localStorage for getting');
    return undefined;
  }
};

export const getPatternArrayFromStorage = () => {
  try {
    const str = window.localStorage.getItem(FILETITLE_PATTERN);
    if (typeof str === 'string' && str !== '') {
      return str.split('¤');
    }
    return undefined;
  } catch (ex) {
    console.log('Cannot access localStorage for getting');
  }
};

export const getPrintPaperFromStorage = () => {
  try {
    const str = window.localStorage.getItem(PAPER);
    if (typeof str === 'string' && str !== '') {
      return str;
    }
    return undefined;
  } catch (ex) {
    console.log('Cannot access localStorage for getting');
  }
};

export const savePrintPaperFromStorage = (paper: string) => {
  try {
    window.localStorage.setItem(PAPER, paper);
  } catch (ex) {
    console.log('Cannot access localStorage for saving');
  }
};
