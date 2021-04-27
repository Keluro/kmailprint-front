import React, { CSSProperties } from 'react';
import ReactDOM from 'react-dom';
import AddinApp from './components/AddinApp';
import LocaleProvider from './providers/LocaleContext';
import ToggleLocale from './providers/ToggleLocale';
import { speedPrint } from './services/PrintFunction';

const panelStyle: CSSProperties = {
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  width: '320px',
  border: '4px solid red'
};

const printFunction = () => speedPrint(null);
ReactDOM.render(
  <React.StrictMode>
    <LocaleProvider>
      <ToggleLocale></ToggleLocale>
      <div>
        <p>
          React free zone, outlook mock... Calling code should not depend on
          react...
        </p>
        <button onClick={printFunction}>Fire command!</button>
      </div>
      <div style={panelStyle}>
        <AddinApp />
      </div>
    </LocaleProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
