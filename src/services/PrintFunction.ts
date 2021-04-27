import { FileTitleBuilderService } from './FileTitleBuilderService';
import IMailPrinterService from './IMailPrinterService';
import { IOutlookService } from './IOulookService';
import {
  getPatternArrayOrDefault,
  getIsEntireConversationOrDefault
} from './LocalStorageService';
import { MockMailPrinterService } from './mocks/MockMailPrinterService';
import { MockOutlookService } from './mocks/MockOutlookService';
import { tLocale } from '../locales/i18n';
import { IOService } from './IOService';

type OutlookEvent = {
  completed: () => void;
};

export const speedPrint = async (event: OutlookEvent | null): Promise<void> => {
  const mailPrinterService: IMailPrinterService = new MockMailPrinterService();
  const outlookService: IOutlookService = new MockOutlookService();
  const ioService = new IOService();

  ioService.registerGoogleAnalyticsEvent('FunctionClick');

  const pattern = getPatternArrayOrDefault();
  const locale = outlookService.getLocale();
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  const isEntireConv: boolean = getIsEntireConversationOrDefault();
  const t = (path: string) => tLocale(locale, path);

  outlookService.showNotification(t('Processing'));

  let fileTitle;
  try {
    fileTitle = await FileTitleBuilderService(outlookService, pattern);
  } catch (ex) {
    outlookService.showNotification(t('FileTitleFailed') + ': ' + ex);
    event?.completed();
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
    event?.completed();
    return;
  }

  const urlToOpen = result.DownloadUrl;
  const dowloadLinkText = ioService.isSafari()
    ? t('DownloadSafari')
    : t('Download');

  outlookService.showNotification(t('SuccessfullyCreated'));

  outlookService.showDownloadDialog(
    dowloadLinkText,
    urlToOpen,
    fileTitle,
    t('SupportKMailPrintHosting2')
  );

  ioService.openfile(fileTitle, result.blob); //does not work in Safari...
  //do not completeEvent it will:
  //1) prevent persistent dialog opening in OWA
  //2) crash outlook http://stackoverflow.com/questions/41059518/opening-dialogapi-from-ribbon-command-crashes-outlook-2016
  //completeEvent();
};
