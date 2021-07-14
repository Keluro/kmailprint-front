import { Lang } from './Language';
import { TokenInfo } from './TokenInfo';

export type PrinterResult = {
  blob: Blob;
  DownloadUrl: string;
};

export default interface IMailPrinterService {
  getPdfDocumentContent: (
    fileTitle: string,
    entireEmail: boolean
  ) => Promise<PrinterResult>;

  getFormatedDateTimeSent: (
    tokenInfo: TokenInfo,
    lang: Lang,
    dateFormat: string
  ) => Promise<string>;
}
