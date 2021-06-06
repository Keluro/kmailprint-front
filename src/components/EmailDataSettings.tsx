import React from 'react';
import { Toggle } from '@fluentui/react/lib/Toggle';

import { SettingsResolverService } from '../services/SettingsResolverService';
import { LocaleContext } from '../providers/LocaleContext';
import { IServiceProps } from './IServiceProps';

const EmailDataSettings: React.FC<IServiceProps> = (props: IServiceProps) => {
  const settingsResolver = new SettingsResolverService(
    props.services.outlookService
  );
  const [isEntireConv, setIsEntireConv] = React.useState<boolean>(
    settingsResolver.getSettings().entireConversation
  );

  const [includeCCRecipients, setIncludeCCRecipients] = React.useState<boolean>(
    settingsResolver.getSettings().includeCC
  );

  const _onChangeIsEntireConversation = (
    ev: React.MouseEvent<HTMLElement>,
    checked?: boolean
  ) => {
    if (checked !== undefined) {
      setIsEntireConv(checked);
      settingsResolver.saveIsEntireConversation(checked);
    }
  };

  const _onChangeIncludeCCRecipients = (
    ev: React.MouseEvent<HTMLElement>,
    checked?: boolean
  ) => {
    if (checked !== undefined) {
      setIncludeCCRecipients(checked);
      settingsResolver.saveIncludeCC(checked);
    }
  };

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

      <Toggle
        label={t('IncludeCCRecipients')}
        defaultChecked={includeCCRecipients}
        onChange={_onChangeIncludeCCRecipients}
        onText={t('Yes')}
        offText={t('No')}
      />
    </>
  );
};

export default EmailDataSettings;
