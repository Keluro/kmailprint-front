import { ComboBox, IComboBoxStyles } from '@fluentui/react';
import React from 'react';
import { IServiceProps } from './IServiceProps';

const LangSettings: React.FC<IServiceProps> = (props: IServiceProps) => {
  const comboBoxStyles: Partial<IComboBoxStyles> = { root: { maxWidth: 300 } };

  const langs = [
    {
      key: 'en',
      text: 'English'
    },
    {
      key: 'fr',
      text: 'Français'
    }
  ];

  return (
    <>
      <ComboBox
        defaultSelectedKey={'en'}
        options={langs}
        styles={comboBoxStyles}
      />
    </>
  );
};

export default LangSettings;
