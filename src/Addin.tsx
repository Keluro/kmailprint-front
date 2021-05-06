import React from 'react';
import ReactDOM from 'react-dom';
import AddinApp from './components/AddinApp';
import LocaleProvider from './providers/LocaleContext';
import { IOService } from './services/IOService';
import { MailPrinterService } from './services/MailPrinterService';
import { OutlookService } from './services/OutlookService';

Office.initialize = () => {
  const outlookService = new OutlookService();
  const ioService = new IOService();
  const mailprinterService = new MailPrinterService(outlookService);

  ReactDOM.render(
    <React.StrictMode>
      <LocaleProvider outlookService={outlookService}>
        <AddinApp
          {...{ services: { outlookService, ioService, mailprinterService } }}
        />
      </LocaleProvider>
    </React.StrictMode>,
    document.getElementById('root')
  );
};
