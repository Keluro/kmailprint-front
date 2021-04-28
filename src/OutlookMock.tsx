import React, { CSSProperties } from 'react';
import ReactDOM from 'react-dom';
import AddinApp from './components/AddinApp';
import LocaleProvider from './providers/LocaleContext';
import ToggleLocale from './providers/ToggleLocale';
import { IOService } from './services/IOService';
import { MockMailPrinterService } from './services/mocks/MockMailPrinterService';
import { MockOutlookService } from './services/mocks/MockOutlookService';
import { executePrintClick } from './services/PrintFunction';

const panelStyle: CSSProperties = {
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  width: '320px',
  border: '4px solid red'
};

const outlookService = new MockOutlookService();
const ioService = new IOService();
const mailprinterService = new MockMailPrinterService();

const printFunction = () =>
  executePrintClick(null, { outlookService, ioService, mailprinterService });

ReactDOM.render(
  <React.StrictMode>
    <LocaleProvider outlookService={outlookService}>
      <ToggleLocale></ToggleLocale>
      <div>
        <p>
          React free zone, outlook mock... Calling code should not depend on
          react...
        </p>
        <button onClick={printFunction}>Fire command!</button>
      </div>
      <div style={panelStyle}>
        <AddinApp
          {...{ services: { outlookService, ioService, mailprinterService } }}
        />
      </div>
    </LocaleProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
