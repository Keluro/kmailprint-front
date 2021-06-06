import {
  ComboBox,
  DefaultButton,
  IComboBox,
  IComboBoxOption,
  IComboBoxStyles
} from '@fluentui/react';
import React from 'react';
import { LocaleContext } from '../providers/LocaleContext';
import { SettingsResolverService } from '../services/SettingsResolverService';
import { IServiceProps } from './IServiceProps';

const LangSettings: React.FC<IServiceProps> = (props: IServiceProps) => {
  const comboBoxStyles: Partial<IComboBoxStyles> = { root: { maxWidth: 100 } };
  const settingsResolver = new SettingsResolverService(
    props.services.outlookService
  );
  const settings = settingsResolver.getSettings();
  const { t } = React.useContext(LocaleContext);
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

  const _onClickDefault = () => {
    settingsResolver.wipeLang();
    window.location.reload();
  };

  const onChangeOptions = (
    event: React.FormEvent<IComboBox>,
    option?: IComboBoxOption
  ) => {
    if (option) {
      settingsResolver.saveLang(option.key.toString());
      window.location.reload();
    }
  };

  return (
    <>
      <ComboBox
        label={t('ChooseLanguage')}
        defaultSelectedKey={settings.language}
        options={langs}
        onChange={onChangeOptions}
        styles={comboBoxStyles}
      />

      <DefaultButton
        style={{ marginTop: 15 }}
        text={t('UseOutlookDefault')}
        onClick={_onClickDefault}
      ></DefaultButton>
    </>
  );
};

export default LangSettings;
