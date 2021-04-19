import React from 'react';
import { PrimaryButton } from '@fluentui/react/lib/Button';
import { Toggle } from '@fluentui/react/lib/Toggle';
import DonationSection from './DonationSection';
import { LocaleContext } from '../providers/LocaleContext';
import { MessageBarContext } from '../providers/MessageBarContext';

const HomeTab: React.FC = () => {
  const { setMessage } = React.useContext(MessageBarContext);
  const timeout = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const _onChange = async () => {
    await timeout(3000);
  };
  const _onClick = async () => {
    setMessage('processing...');
    await timeout(3000);
    setMessage('Completed!!!');
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
      <PrimaryButton onClick={_onClick}>{t('PrintPDF')}</PrimaryButton>
      <DonationSection></DonationSection>
    </>
  );
};

export default HomeTab;
