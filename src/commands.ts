import { IOService } from './services/IOService';
import { MailPrinterService } from './services/MailPrinterService';
import { OutlookService } from './services/OutlookService';
import { executePrintClick, OutlookEvent } from './services/PrintFunction';

const outlookService = new OutlookService();
const services = {
  outlookService,
  ioService: new IOService(),
  mailprinterService: new MailPrinterService(outlookService)
};
const speedPrint = (event: OutlookEvent) => executePrintClick(event, services);

Office.initialize = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).speedPrint = speedPrint;
};
