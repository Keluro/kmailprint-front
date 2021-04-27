import IMailPrinterService from './IMailPrinterService';
import { IOService } from './IOService';
import { IOutlookService } from './IOulookService';

export type Services = {
  outlookService: IOutlookService;
  ioService: IOService;
  mailprinterService: IMailPrinterService;
};
