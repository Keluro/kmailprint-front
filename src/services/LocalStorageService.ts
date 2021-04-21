import { FileTitleKind } from './FileTitleBuilderService';

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export const savePatternArray = (array: string[]) => {
  try {
    window.localStorage.setItem('FILETITLE2', array.join('¤'));
  } catch (ex) {
    console.log('Cannot access localStorage for saving');
  }
};

const getPatternArray = () => {
  try {
    const str = window.localStorage.getItem('FILETITLE2');
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
