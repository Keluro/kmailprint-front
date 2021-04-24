import React, { CSSProperties } from 'react';
import AddinApp from './AddinApp';
import LocaleProvider from './providers/LocaleContext';
import ToggleLocale from './providers/ToggleLocale';
import { executePrintClick } from './services/PrintFunction';

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
      <div>
        <p>
          React free zone, outlook mock... Calling code should not depend on
          react...
        </p>
        <button onClick={executePrintClick}>Fire command!</button>
      </div>
      <div style={panelStyle}>
        <AddinApp />
      </div>
    </LocaleProvider>
  );
};

export default OutlookMock;
