import React from 'react';
import { PrimaryButton } from '@fluentui/react/lib/Button';

import DonationSection from './DonationSection';
import { MessageBarContext } from '../providers/MessageBarContext';
import { MessageBarType } from '@fluentui/react';

import { SettingsResolverService } from '../services/SettingsResolverService';
import { FileTitleBuilderService } from '../services/FileTitleBuilderService';
import { IServiceProps } from './IServiceProps';
import { LocaleContext } from '../providers/LocaleContext';

const HomeTab: React.FC<IServiceProps> = (props: IServiceProps) => {
  const { t } = React.useContext(LocaleContext);

  const { setType, open, setMessageContent, setLinkInfo } = React.useContext(
    MessageBarContext
  );

  const _onClick = async () => {
    open();
    setMessageContent(t('Processing'));

    props.services.ioService.registerGoogleAnalyticsEvent('ButtonClick');

    const settings = new SettingsResolverService(
      props.services.outlookService
    ).getSettings();
    let fileTitle;
    try {
      fileTitle = await FileTitleBuilderService(
        props.services.outlookService,
        settings.fileTitlePattern
      );
    } catch (ex) {
      setType(MessageBarType.warning);
      setMessageContent(t('FileTitleFailed') + ': ' + ex);
      return;
    }

    const isEntireConv = settings.entireConversation;
    try {
      const result = await props.services.mailprinterService.getPdfDocumentContent(
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
        newWindow: props.services.ioService.isSafari()
      });

      if (!props.services.ioService.isSafari()) {
        props.services.ioService.openfile(fileTitle, result.blob); //does not work in Outlook for Mac/Safari
      }
    } catch (ex) {
      setType(MessageBarType.severeWarning);
      setMessageContent(t('CreatingFileFailed') + ': ' + ex);
    }
  };

  return (
    <>
      <PrimaryButton onClick={_onClick} style={{ marginTop: '10px' }}>
        {t('PrintPDF')}
      </PrimaryButton>
      <DonationSection></DonationSection>
    </>
  );
};

export default HomeTab;
