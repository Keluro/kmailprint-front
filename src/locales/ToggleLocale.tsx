import React from 'react';

import { LocaleContext } from '../providers/LocaleContext';

export default (): JSX.Element => {
  return (
    <LocaleContext.Consumer>
      {(localeVal) => (
        <button onClick={localeVal?.toggleLocale}>Change language</button>
      )}
    </LocaleContext.Consumer>
  );
};
