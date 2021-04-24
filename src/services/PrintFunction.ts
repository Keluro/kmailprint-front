import { FileTitleBuilderService } from './FileTitleBuilderService';
import IMailPrinterService from './IMailPrinterService';
import { IOutlookService } from './IOulookService';
import { getPatternArrayOrDefault } from './LocalStorageService';
import { MockMailPrinterService } from './MockMailPrinterService';
import { MockOutlookService } from './MockOutlookService';
import { tLocale } from '../locales/i18n';
import { IOService } from './IOService';

export const executePrintClick = async () => {
  const mailPrinterService: IMailPrinterService = new MockMailPrinterService();
  const outlookService: IOutlookService = new MockOutlookService();
  const ioService = new IOService();

  ioService.registerGoogleAnalyticsEvent('FunctionClick');

  const pattern = getPatternArrayOrDefault();
  const locale = 'en'; //TODO:
  let isEntireConv: boolean = false; //TODO:
  const t = (path: string) => tLocale(locale, path);

  outlookService.showNotification(t('Processing'));

  let fileTitle = await FileTitleBuilderService(outlookService, pattern);
  try {
    outlookService.showNotification(t('Processing'));
  } catch (ex) {
    outlookService.showNotification(t('FileTitleFailed') + ': ' + ex);
    outlookService.completeEvent();
    return;
  }

  let result;
  try {
    result = await mailPrinterService.getPdfDocumentContent(
      fileTitle,
      isEntireConv
    );
  } catch (ex) {
    console.log(ex);
    outlookService.showNotification(t('CreatingFileFailed') + ': ' + ex);
    outlookService.completeEvent();
    return;
  }

  const urlToOpen = result.DownloadUrl;
  const dowloadLinkText = ioService.isSafari()
    ? t('DownloadSafari')
    : t('Download');

  outlookService.showNotification(t('SuccessfullyCreated'));

  outlookService.showDownloadDialog(dowloadLinkText, urlToOpen, fileTitle);

  ioService.openfile(fileTitle, result.blob); //does not work in Safari...
  //do not completeEvent it will:
  //1) prevent persistent dialog opening in OWA
  //2) crash outlook http://stackoverflow.com/questions/41059518/opening-dialogapi-from-ribbon-command-crashes-outlook-2016
  //completeEvent();
};
