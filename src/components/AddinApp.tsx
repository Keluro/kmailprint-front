import React from 'react';
import { Pivot, PivotItem } from '@fluentui/react';
import HomeTab from './HomeTab';
import TitleBuilderTab from './TitleBuilderTab';
import { LocaleContext } from '../providers/LocaleContext';
import { initializeIcons } from '@fluentui/font-icons-mdl2';
import { ThemeProvider } from '@fluentui/react-theme-provider';
import { MessageBarProvider } from '../providers/MessageBarContext';
import { IServiceProps } from './IServiceProps';

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
          <PivotItem headerText={t('PdfTitle')}>
            <div style={tabCss}>
              <TitleBuilderTab
                outlookService={props.services.outlookService}
              ></TitleBuilderTab>
            </div>
          </PivotItem>
        </Pivot>
      </MessageBarProvider>
    </ThemeProvider>
  );
};

export default AddinApp;
