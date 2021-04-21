import React from 'react';
import { PrimaryButton } from '@fluentui/react/lib/Button';
import { Toggle } from '@fluentui/react/lib/Toggle';
import DonationSection from './DonationSection';
import { LocaleContext } from '../providers/LocaleContext';
import { MessageBarContext } from '../providers/MessageBarContext';
import { MessageBarType } from '@fluentui/react';
import { MockMailPrinterService } from '../services/MockMailPrinterService';
import IMailPrinterService from '../services/IMailPrinterService';
import { getPatternArrayOrDefault } from '../services/LocalStorageService';
import { FileTitleBuilderService } from '../services/FileTitleBuilderService';
import { IOutlookService } from '../services/IOulookService';
import { MockOutlookService } from '../services/MockOutlookService';
import { IOService } from '../services/IOService';

const HomeTab: React.FC = () => {
  const { setType, open, setMessageContent, setLinkInfo } = React.useContext(
    MessageBarContext
  );

  const [isEntireConv, setIsEntireConv] = React.useState<boolean>(false);

  const mailPrinterService: IMailPrinterService = new MockMailPrinterService();
  const outlookService: IOutlookService = new MockOutlookService();

  const _onClick = async () => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).ga('send', 'event', 'KMailPrint', 'ButtonClick');
      // eslint-disable-next-line no-empty
    } catch {}

    const pattern = getPatternArrayOrDefault();
    let fileTitle;
    try {
      fileTitle = await FileTitleBuilderService(outlookService, pattern);
    } catch (ex) {
      setType(MessageBarType.warning);
      setMessageContent(t('FileTitleFailed') + ': ' + ex);
      outlookService.completeEvent();
      return;
    }

    setType(MessageBarType.info);
    setMessageContent(t('Processing'));
    open();

    try {
      const result = await mailPrinterService.getPdfDocumentContent(
        fileTitle,
        isEntireConv
      );

      const ioService = new IOService();

      const urlToOpen = result.DownloadUrl;
      if (outlookService.isJSFunction()) {
        const dowloadLinkText = ioService.isSafari()
          ? t('DownloadSafari')
          : t('Download');
        outlookService.showNotificationAndDialog(
          t('SuccessfullyCreated'),
          dowloadLinkText,
          urlToOpen,
          urlToOpen
        );
      } else {
        //NB: with safari/Outlook For Mac, use a target _blank for visiting the .pdf otherwise the browser will navigate to it...
        setType(MessageBarType.success);
        setMessageContent(t('SuccessfullyCreated'));
        setLinkInfo({
          displayText: fileTitle,
          url: urlToOpen,
          newWindow: ioService.isSafari()
        });
      }

      ioService.openfile(fileTitle, result.blob); //does not work in Safari...
      //do not completeEvent it will:
      //1) prevent persistent dialog opening in OWA
      //2) crash outlook http://stackoverflow.com/questions/41059518/opening-dialogapi-from-ribbon-command-crashes-outlook-2016
      //completeEvent();
    } catch (ex) {
      setType(MessageBarType.severeWarning);
      setMessageContent(t('CreatingFileFailed') + ': ' + ex);
      outlookService.completeEvent();
    }
  };

  function _onChange(ev: React.MouseEvent<HTMLElement>, checked?: boolean) {
    if (checked !== undefined) {
      setIsEntireConv(checked);
    }
  }

  const { t } = React.useContext(LocaleContext);

  return (
    <>
      <Toggle
        label={t('EntireEmailStr')}
        defaultChecked
        onChange={_onChange}
        onText={t('Yes')}
        offText={t('No')}
      />
      <PrimaryButton onClick={_onClick} style={{ marginTop: '10px' }}>
        {t('PrintPDF')}
      </PrimaryButton>
      <DonationSection></DonationSection>
    </>
  );
};

export default HomeTab;
