/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import IMailPrinterService, { PrinterResult } from '../IMailPrinterService';

const timeout = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const getBlob = async () => {
  const url =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==';

  const res = await fetch(url);
  return res.blob();
};

export class MockMailPrinterService implements IMailPrinterService {
  async getPdfDocumentContent() {
    await timeout(3000);
    const blob: Blob = await getBlob();
    const result: PrinterResult = {
      blob: blob,
      DownloadUrl:
        'https://www.benoitpatra.com/assets/download/teaching/LM125-ExerciceSynthese.pdf'
    };
    return Promise.resolve(result);
  }
}
