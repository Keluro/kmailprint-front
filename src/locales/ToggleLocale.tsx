import React from 'react';

import { LocaleContext } from './LocaleContext';

export default () => {
  return (
    <LocaleContext.Consumer>
      {(localeVal) => (
        <button onClick={localeVal?.toggleLocale}>Change language</button>
      )}
    </LocaleContext.Consumer>
  );
};
