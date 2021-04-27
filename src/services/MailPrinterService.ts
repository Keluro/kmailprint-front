import IMailPrinterService, { PrinterResult } from './IMailPrinterService';
import { IOutlookService } from './IOulookService';
import { MockOutlookService } from './mocks/MockOutlookService';
import axios from 'axios';

export class MailPrinterService implements IMailPrinterService {
  async getPdfDocumentContent(
    fileTitle: string,
    entireEmail: boolean
  ): Promise<PrinterResult> {
    const outlookService: IOutlookService = new MockOutlookService();

    const infoObject = await outlookService.getTokenInfo();
    const userInfo = outlookService.getMyUserInfo();

    const data = {
      title: fileTitle,
      ewsUrl: infoObject.ewsUrl,
      token: infoObject.token,
      itemId: infoObject.itemId,
      completeBody: entireEmail,
      UserInfo: userInfo
    };

    let result;
    try {
      result = await axios.post('/api/PrintPdf', data, {
        responseType: 'arraybuffer'
      });
    } catch (ex) {
      throw new Error('Server Generation Failed');
    }

    const blob = new Blob([result.data], {
      type: 'application/octet-stream'
    });
    const dwld_url = result.headers()['alternative-url'];

    return { blob: blob, DownloadUrl: dwld_url };
  }
}
