import React from 'react';

import AddinApp from './AddinApp';
import LocaleProvider from './locales/LocaleContext';
import ToggleLocale from './locales/ToggleLocale';

const App: React.FC = () => {
  return (
    <LocaleProvider>
      <ToggleLocale></ToggleLocale>
      <AddinApp />
    </LocaleProvider>
  );
};

export default App;
