import React from 'react';
import { Pivot, PivotItem } from '@fluentui/react';
import HomeTab from './components/HomeTab';
import TitleBuilderTab from './components/TitleBuilderTab';
import { LocaleContext } from './providers/LocaleContext';
import { initializeIcons } from '@fluentui/font-icons-mdl2';
import { ThemeProvider } from '@fluentui/react-theme-provider';
import { MessageBarProvider } from './providers/MessageBarContext';

const AddinApp: React.FC = () => {
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
              <HomeTab />
            </div>
          </PivotItem>
          <PivotItem headerText={t('PdfTitle')}>
            <div style={tabCss}>
              <TitleBuilderTab></TitleBuilderTab>
            </div>
          </PivotItem>
        </Pivot>
      </MessageBarProvider>
    </ThemeProvider>
  );
};

export default AddinApp;
