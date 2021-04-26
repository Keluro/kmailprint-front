import React from 'react';
import { PrimaryButton } from '@fluentui/react/lib/Button';
import { Toggle } from '@fluentui/react/lib/Toggle';
import DonationSection from './DonationSection';
import { LocaleContext } from '../providers/LocaleContext';
import { MessageBarContext } from '../providers/MessageBarContext';
import { MessageBarType } from '@fluentui/react';
import { MockMailPrinterService } from '../services/mocks/MockMailPrinterService';
import IMailPrinterService from '../services/IMailPrinterService';
import {
  getPatternArrayOrDefault,
  getIsEntireConversationOrDefault,
  saveIsEntireConversation
} from '../services/LocalStorageService';
import { FileTitleBuilderService } from '../services/FileTitleBuilderService';
import { IOutlookService } from '../services/IOulookService';
import { MockOutlookService } from '../services/mocks/MockOutlookService';
import { IOService } from '../services/IOService';

const HomeTab: React.FC = () => {
  const { setType, open, setMessageContent, setLinkInfo } = React.useContext(
    MessageBarContext
  );

  const [isEntireConv, setIsEntireConv] = React.useState<boolean>(
    getIsEntireConversationOrDefault()
  );

  const mailPrinterService: IMailPrinterService = new MockMailPrinterService();
  const outlookService: IOutlookService = new MockOutlookService();
  const ioService = new IOService();

  const _onClick = async () => {
    ioService.registerGoogleAnalyticsEvent('ButtonClick');

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

      const urlToOpen = result.DownloadUrl;
      //NB: with safari/Outlook For Mac, use a target _blank for visiting the .pdf otherwise the browser will navigate to it...
      setType(MessageBarType.success);
      setMessageContent(t('SuccessfullyCreated'));
      setLinkInfo({
        displayText: fileTitle,
        url: urlToOpen,
        newWindow: ioService.isSafari()
      });

      ioService.openfile(fileTitle, result.blob); //does not work in Safari...
    } catch (ex) {
      setType(MessageBarType.severeWarning);
      setMessageContent(t('CreatingFileFailed') + ': ' + ex);
      outlookService.completeEvent();
    }
  };

  function _onChangeIsEntireConversation(
    ev: React.MouseEvent<HTMLElement>,
    checked?: boolean
  ) {
    if (checked !== undefined) {
      setIsEntireConv(checked);
      saveIsEntireConversation(checked);
    }
  }

  const { t } = React.useContext(LocaleContext);

  return (
    <>
      <Toggle
        label={t('EntireEmailStr')}
        defaultChecked={isEntireConv}
        onChange={_onChangeIsEntireConversation}
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
