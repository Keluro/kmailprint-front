import IMailPrinterService, { PrinterResult } from './IMailPrinterService';
import { IOutlookService } from './IOulookService';
import axios from 'axios';

export class MailPrinterService implements IMailPrinterService {
  constructor(private outlookService: IOutlookService) {}

  async getPdfDocumentContent(
    fileTitle: string,
    entireEmail: boolean
  ): Promise<PrinterResult> {
    const infoObject = await this.outlookService.getTokenInfo();
    const userInfo = this.outlookService.getMyUserInfo();

    const data = {
      title: fileTitle,
      ewsUrl: infoObject.ewsUrl,
      token: infoObject.token,
      itemId: infoObject.itemId,
      completeBody: entireEmail,
      UserInfo: userInfo
    };

    let result;
    const server_url = process.env.API_URL;
    try {
      result = await axios.post(`${server_url}/api/PrintPdf`, data, {
        responseType: 'arraybuffer'
      });
    } catch (ex) {
      throw new Error('Server Generation Failed');
    }

    const blob = new Blob([result.data], {
      type: 'application/octet-stream'
    });
    const dwld_url = result.headers['alternative-url'];

    return { blob: blob, DownloadUrl: dwld_url };
  }
}
