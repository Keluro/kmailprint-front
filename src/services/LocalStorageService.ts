/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export const savePatternArray = (array: string[]) => {
  window.localStorage.setItem('FILETITLE2', array.join('¤'));
};

export const getPatternArray = () => {
  const str = window.localStorage.getItem('FILETITLE2');
  if (typeof str === 'string' && str !== '') {
    return str.split('¤');
  }
  return undefined;
};
