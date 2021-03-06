import IMailPrinterService, { PrinterResult } from './IMailPrinterService';
import { IOutlookService } from './IOulookService';
import axios from 'axios';
import { TokenInfo } from './TokenInfo';
import { DateFormat } from './DateFormats';
import { Lang } from './Language';
import { SettingsResolverService } from './SettingsResolverService';

export class MailPrinterService implements IMailPrinterService {
  constructor(private outlookService: IOutlookService) {}

  async getPdfDocumentContent(fileTitle: string): Promise<PrinterResult> {
    const tokenInfo = await this.outlookService.getTokenInfo();
    const userInfo = this.outlookService.getMyUserInfo();
    const settings = new SettingsResolverService(
      this.outlookService
    ).getSettings();

    const entireConversation = settings.entireConversation;
    const includeCC = settings.includeCC;
    const dateFormat = settings.dateFormat;
    const paperFormat = settings.paper;
    const data = {
      fileTitle,
      tokenInfo,
      entireConversation,
      includeCC,
      userInfo,
      dateFormat,
      paperFormat,
      lang: settings.language
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

  async getFormatedDateTimeSent(
    tokenInfo: TokenInfo,
    lang: Lang,
    dateFormat: DateFormat
  ): Promise<string> {
    const server_url = process.env.API_URL;
    const userInfo = this.outlookService.getMyUserInfo();
    const url =
      `${server_url}/api/EmailsDateTimeSent?ewsUrl=` +
      encodeURIComponent(tokenInfo.ewsUrl) +
      '&token=' +
      encodeURIComponent(tokenInfo.token) +
      '&itemId=' +
      encodeURIComponent(tokenInfo.itemId) +
      '&lang=' +
      encodeURIComponent(lang) +
      '&dateFormat=' +
      encodeURIComponent(dateFormat) +
      '&timeZone=' +
      encodeURIComponent(userInfo.TimeZone);
    const resultPromise = await axios.get(url);
    return resultPromise.data as string;
  }
}
