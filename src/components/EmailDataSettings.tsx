import React from 'react';
import { Toggle } from '@fluentui/react/lib/Toggle';

import {
  getIsEntireConversationOrDefault,
  saveIsEntireConversation
} from '../services/LocalStorageService';
import { LocaleContext } from '../providers/LocaleContext';

const EmailDataSettings: React.FC = () => {
  const [isEntireConv, setIsEntireConv] = React.useState<boolean>(
    getIsEntireConversationOrDefault()
  );

  const _onChangeIsEntireConversation = (
    ev: React.MouseEvent<HTMLElement>,
    checked?: boolean
  ) => {
    if (checked !== undefined) {
      setIsEntireConv(checked);
      saveIsEntireConversation(checked);
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
    </>
  );
};

export default EmailDataSettings;
