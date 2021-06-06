import React from 'react';
import { Toggle } from '@fluentui/react/lib/Toggle';

import { SettingsResolverService } from '../services/SettingsResolverService';
import { LocaleContext } from '../providers/LocaleContext';
import { IServiceProps } from './IServiceProps';
import { FontSizes, Text } from '@fluentui/react';

const OtherSettings: React.FC<IServiceProps> = (props: IServiceProps) => {
  const settingsResolver = new SettingsResolverService(
    props.services.outlookService
  );

  const [displayDialog, setDisplayDialog] = React.useState<boolean>(
    settingsResolver.getSettings().displayDialog
  );

  const _onChangeDisplayDialog = (
    ev: React.MouseEvent<HTMLElement>,
    checked?: boolean
  ) => {
    if (checked !== undefined) {
      setDisplayDialog(checked);
      settingsResolver.saveDisplayDialog(checked);
    }
  };

  const { t } = React.useContext(LocaleContext);

  return (
    <>
      <Toggle
        label={t('DisplayDialog')}
        defaultChecked={displayDialog}
        onChange={_onChangeDisplayDialog}
        onText={t('Yes')}
        offText={t('No')}
      />

      <Text style={{ fontSize: FontSizes.size12 }}>
        {t('DialogWarningInfo')}
      </Text>
    </>
  );
};

export default OtherSettings;
