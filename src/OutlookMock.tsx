import React, { CSSProperties } from 'react';
import AddinApp from './AddinApp';
import LocaleProvider from './providers/LocaleContext';
import ToggleLocale from './locales/ToggleLocale';

const OutlookMock: React.FC = () => {
  const panelStyle: CSSProperties = {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: '320px',
    border: '4px solid red'
  };

  return (
    <LocaleProvider>
      <ToggleLocale></ToggleLocale>
      <div style={panelStyle}>
        <AddinApp />
      </div>
    </LocaleProvider>
  );
};

export default OutlookMock;
