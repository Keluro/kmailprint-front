import React from 'react';
import { PrimaryButton } from '@fluentui/react/lib/Button';
import { Toggle } from '@fluentui/react/lib/Toggle';
import DonationSection from './DonationSection';
import { LocaleContext } from '../providers/LocaleContext';
import { MessageBarContext } from '../providers/MessageBarContext';
import { MessageBarType } from '@fluentui/react';

import {
  getPatternArrayOrDefault,
  getIsEntireConversationOrDefault,
  saveIsEntireConversation
} from '../services/LocalStorageService';
import { FileTitleBuilderService } from '../services/FileTitleBuilderService';
import { IServiceProps } from './IServiceProps';

const HomeTab: React.FC<IServiceProps> = (props: IServiceProps) => {
  const { setType, open, setMessageContent, setLinkInfo } = React.useContext(
    MessageBarContext
  );

  const [isEntireConv, setIsEntireConv] = React.useState<boolean>(
    getIsEntireConversationOrDefault()
  );

  const _onClick = async () => {
    props.services.ioService.registerGoogleAnalyticsEvent('ButtonClick');

    const pattern = getPatternArrayOrDefault();
    let fileTitle;
    try {
      fileTitle = await FileTitleBuilderService(
        props.services.outlookService,
        pattern
      );
    } catch (ex) {
      setType(MessageBarType.warning);
      setMessageContent(t('FileTitleFailed') + ': ' + ex);
      return;
    }

    open();
    setMessageContent(t('Processing'));

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

      props.services.ioService.openfile(fileTitle, result.blob); //does not work in Safari...
    } catch (ex) {
      setType(MessageBarType.severeWarning);
      setMessageContent(t('CreatingFileFailed') + ': ' + ex);
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
