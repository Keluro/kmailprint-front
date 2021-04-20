import React from 'react';
import { PrimaryButton } from '@fluentui/react/lib/Button';
import { Toggle } from '@fluentui/react/lib/Toggle';
import DonationSection from './DonationSection';
import { LocaleContext } from '../providers/LocaleContext';
import { MessageBarContext } from '../providers/MessageBarContext';
import { MessageBarType } from '@fluentui/react';

const HomeTab: React.FC = () => {
  const {
    setType,
    open,
    close,
    setMessageContent,
    setLinkInfo
  } = React.useContext(MessageBarContext);
  const timeout = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const _onChange = async () => {
    await timeout(3000);
  };
  const _onClick = async () => {
    setType(MessageBarType.info);
    setMessageContent('processing...');
    setLinkInfo(undefined);
    open();
    await timeout(3000);
    setType(MessageBarType.success);
    setMessageContent('still processing, looks good...');
    setLinkInfo({
      url: 'https://www.benoitpatra.com',
      newWindow: true,
      displayText: 'myBlog you can check this out this is pure bomb!'
    });
    await timeout(4000);
    setType(MessageBarType.warning);
    setMessageContent('failure!');
    await timeout(1000);
    close();
  };
  const { t } = React.useContext(LocaleContext);

  return (
    <>
      <Toggle
        label={t('EntireEmailStr')}
        defaultChecked
        onText={t('Yes')}
        offText={t('No')}
        onChange={_onChange}
      />
      <PrimaryButton onClick={_onClick} style={{ marginTop: '10px' }}>
        {t('PrintPDF')}
      </PrimaryButton>
      <DonationSection></DonationSection>
    </>
  );
};

export default HomeTab;
