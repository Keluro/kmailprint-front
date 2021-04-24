import { FileTitleKind } from './FileTitleBuilderService';

const FILETITLE_PATTERN = 'filetitle_pattern';
const SAVE_ENTIRE_CONV = 'is_entire_conv';

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export const savePatternArray = (array: string[]) => {
  try {
    window.localStorage.setItem(FILETITLE_PATTERN, array.join('¤'));
  } catch (ex) {
    console.log('Cannot access localStorage for saving');
  }
};

export const saveIsEntireConversation = (isEntireConv: boolean) => {
  try {
    window.localStorage.setItem(SAVE_ENTIRE_CONV, isEntireConv.toString());
  } catch (ex) {
    console.log('Cannot access localStorage for saving');
  }
};

export const getIsEntireConversationOrDefault = () => {
  try {
    const str = window.localStorage.getItem(SAVE_ENTIRE_CONV);
    if (typeof str === 'string' && str !== '') {
      return str == 'true';
    }
    return false;
  } catch (ex) {
    console.log('Cannot access localStorage for getting');
    return false;
  }
};

const getPatternArray = () => {
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

export const getPatternArrayOrDefault = () => {
  let savedPatternKeys = getPatternArray();
  if (!savedPatternKeys) {
    savedPatternKeys = [
      FileTitleKind.Subject,
      FileTitleKind.SenderEmailAddress
    ];
  }
  return savedPatternKeys as FileTitleKind[];
};
