import {
  ComboBox,
  IComboBox,
  IComboBoxOption,
  IComboBoxStyles
} from '@fluentui/react';
import React from 'react';
import { PrintPaper } from '../services/PrintPaper';
import { SettingsResolverService } from '../services/SettingsResolverService';
import { IServiceProps } from './IServiceProps';

const PaperSettings: React.FC<IServiceProps> = (props: IServiceProps) => {
  const comboBoxStyles: Partial<IComboBoxStyles> = { root: { maxWidth: 100 } };
  const settingsResolver = new SettingsResolverService(
    props.services.outlookService
  );
  const settings = settingsResolver.getSettings();
  const langs = [
    {
      key: PrintPaper.A4,
      text: 'A4'
    },
    {
      key: PrintPaper.Letter,
      text: 'US Letter'
    }
  ];

  const onChangeOptions = (
    event: React.FormEvent<IComboBox>,
    option?: IComboBoxOption
  ) => {
    if (option) {
      settingsResolver.savePrintPaper(option.key as PrintPaper);
    }
  };

  return (
    <>
      <ComboBox
        defaultSelectedKey={settings.paper}
        options={langs}
        onChange={onChangeOptions}
        styles={comboBoxStyles}
      />
    </>
  );
};

export default PaperSettings;
