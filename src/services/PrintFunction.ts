import { FileTitleBuilderService } from './FileTitleBuilderService';
import {
  getPatternArrayOrDefault,
  getIsEntireConversationOrDefault
} from './LocalStorageService';
import { tLocale } from '../locales/i18n';
import { Services } from './Services';

export type OutlookEvent = {
  completed: () => void;
};

export const executePrintClick = async (
  event: OutlookEvent | null,
  service: Services
): Promise<void> => {
  service.ioService.registerGoogleAnalyticsEvent('FunctionClick');

  const pattern = getPatternArrayOrDefault();
  const locale = service.outlookService.getLocale();
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  const isEntireConv: boolean = getIsEntireConversationOrDefault();
  const t = (path: string) => tLocale(locale, path);

  service.outlookService.showNotification(t('Processing'));

  let fileTitle;
  try {
    fileTitle = await FileTitleBuilderService(service.outlookService, pattern);
  } catch (ex) {
    service.outlookService.showNotification(t('FileTitleFailed') + ': ' + ex);
    event?.completed();
    return;
  }

  let result;
  try {
    result = await service.mailprinterService.getPdfDocumentContent(
      fileTitle,
      isEntireConv
    );
  } catch (ex) {
    console.log(ex);
    service.outlookService.showNotification(
      t('CreatingFileFailed') + ': ' + ex
    );
    event?.completed();
    return;
  }

  const urlToOpen = result.DownloadUrl;
  const dowloadLinkText = service.ioService.isSafari()
    ? t('DownloadSafari')
    : t('Download');

  service.outlookService.showNotification(t('SuccessfullyCreated'));

  service.outlookService.showDownloadDialog(
    dowloadLinkText,
    urlToOpen,
    fileTitle,
    t('SupportKMailPrintHosting2')
  );

  service.ioService.openfile(fileTitle, result.blob); //does not work in Safari...
  //do not completeEvent it will:
  //1) prevent persistent dialog opening in OWA
  //2) crash outlook http://stackoverflow.com/questions/41059518/opening-dialogapi-from-ribbon-command-crashes-outlook-2016
  //completeEvent();
};
