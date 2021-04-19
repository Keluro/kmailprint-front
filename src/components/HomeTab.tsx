import React from 'react';
import { PrimaryButton } from '@fluentui/react/lib/Button';
import { Toggle } from '@fluentui/react/lib/Toggle';
import DonationSection from './DonationSection';
import { LocaleContext } from '../locales/LocaleContext';

const HomeTab: React.FC = () => {
  const _onChange = () => console.log('clickToggle');
  const _onClick = () => console.log('On Click');
  const t = React.useContext(LocaleContext).t;

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
