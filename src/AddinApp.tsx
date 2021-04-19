import React from 'react';
import { Pivot, PivotItem } from '@fluentui/react';
import HomeTab from './components/HomeTab';
import { DetailsListBasicExample } from './components/TitleBuilderTab';
import { LocaleContext } from './locales/LocaleContext';
import { initializeIcons } from '@fluentui/font-icons-mdl2';
import { ThemeProvider } from '@fluentui/react-theme-provider';

const AddinApp: React.FC = () => {
  const { t } = React.useContext(LocaleContext);
  initializeIcons();
  return (
    <ThemeProvider>
      <Pivot>
        <PivotItem headerText={t('Home')}>
          <HomeTab />
        </PivotItem>
        <PivotItem headerText={t('PdfTitle')}>
          <DetailsListBasicExample></DetailsListBasicExample>
        </PivotItem>
      </Pivot>
    </ThemeProvider>
  );
};

export default AddinApp;
