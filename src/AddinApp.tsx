import React from 'react';
import { Pivot, PivotItem } from '@fluentui/react';
import HomeTab from './components/HomeTab';
import { DetailsListBasicExample } from './components/TitleBuilderTab';
import { LocaleContext } from './locales/LocaleContext';

const AddinApp: React.FC = () => {
  const { t } = React.useContext(LocaleContext);

  return (
    <Pivot>
      <PivotItem headerText={t('Home')}>
        <HomeTab />
      </PivotItem>
      <PivotItem headerText={t('PdfTitle')}>
        <DetailsListBasicExample></DetailsListBasicExample>
      </PivotItem>
    </Pivot>
  );
};

export default AddinApp;
