import {
  ComboBox,
  IComboBox,
  IComboBoxOption,
  IComboBoxStyles
} from '@fluentui/react';
import React from 'react';
import { LocaleContext } from '../providers/LocaleContext';
import { DateFormat, getAllFormats, getFormat } from '../services/DateFormats';
import { SettingsResolverService } from '../services/SettingsResolverService';
import { IServiceProps } from './IServiceProps';

const DatetimeSettings: React.FC<IServiceProps> = (props: IServiceProps) => {
  const { t } = React.useContext(LocaleContext);

  const comboBoxStyles: Partial<IComboBoxStyles> = { root: { maxWidth: 300 } };
  const settingsResolver = new SettingsResolverService(
    props.services.outlookService
  );
  const settings = settingsResolver.getSettings();

  const formats = getAllFormats().map((format) => {
    return {
      key: DateFormat[format],
      text: getFormat(settings.language, format)
    };
  });

  const onChangeOptions = (
    event: React.FormEvent<IComboBox>,
    option?: IComboBoxOption
  ) => {
    if (option) {
      settingsResolver.saveDateFormat(option.key as DateFormat);
    }
  };

  return (
    <>
      <ComboBox
        label={t('SelectDateTimeFormat')}
        defaultSelectedKey={settings.dateFormat}
        options={formats}
        onChange={onChangeOptions}
        styles={comboBoxStyles}
      />
    </>
  );
};

export default DatetimeSettings;
