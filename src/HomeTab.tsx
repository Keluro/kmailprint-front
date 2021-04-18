import React from 'react';
import { PrimaryButton } from '@fluentui/react/lib/Button';
import { Toggle } from '@fluentui/react/lib/Toggle';
import DonationSection from './DonationSection';

const HomeTab: React.FC = () => {
  const _onChange = () => console.log('clickToggle');
  const _onClick = () => console.log('On Click');

  return (
    <>
      <Toggle
        label="Enabled and checked"
        defaultChecked
        onText="On"
        offText="Off"
        onChange={_onChange}
      />
      <PrimaryButton onClick={_onClick}>Print PDF</PrimaryButton>
      <DonationSection></DonationSection>
    </>
  );
};

export default HomeTab;
