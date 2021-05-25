import React from 'react';
import { Pivot, PivotItem } from '@fluentui/react';
import HomeTab from './HomeTab';
import TitleBuilderTab from './TitleBuilderSettings';
import { LocaleContext } from '../providers/LocaleContext';
import { initializeIcons } from '@fluentui/font-icons-mdl2';
import { ThemeProvider } from '@fluentui/react-theme-provider';
import { MessageBarProvider } from '../providers/MessageBarContext';
import { IServiceProps } from './IServiceProps';
import SettingsTab from './SettingsTab';

const AddinApp: React.FC<IServiceProps> = (props: IServiceProps) => {
  const tabCss: React.CSSProperties = {
    padding: '5px 10px'
  };

  const { t } = React.useContext(LocaleContext);
  initializeIcons();
  return (
    <ThemeProvider>
      <MessageBarProvider>
        <Pivot>
          <PivotItem headerText={t('Home')}>
            <div style={tabCss}>
              <HomeTab {...props} />
            </div>
          </PivotItem>
          <PivotItem headerText={t('Settings')}>
            <div style={tabCss}>
              <SettingsTab {...props}></SettingsTab>
            </div>
          </PivotItem>
        </Pivot>
      </MessageBarProvider>
    </ThemeProvider>
  );
};

export default AddinApp;
