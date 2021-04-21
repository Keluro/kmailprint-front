export type PrinterResult = {
  blob: Blob;
  DownloadUrl: string;
};

export default interface IMailPrinterService {
  getPdfDocumentContent: (
    fileTitle: string,
    entireEmail: boolean
  ) => Promise<PrinterResult>;
}
