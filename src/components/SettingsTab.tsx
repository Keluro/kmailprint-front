import React, { CSSProperties, useState } from 'react';
import { IconButton, IButtonStyles } from '@fluentui/react/lib/Button';
import { Link } from '@fluentui/react/lib/Link';
import {
  IOverflowSetItemProps,
  OverflowSet
} from '@fluentui/react/lib/OverflowSet';
import { IServiceProps } from './IServiceProps';
import { LocaleContext } from '../providers/LocaleContext';
import EmailDataSettings from './EmailDataSettings';
import DatetimeSettings from './DatetimeSettings';
import OtherSettings from './OtherSettings';
import LangSettings from './LangSettings';
import TitleBuilderSettings from './TitleBuilderSettings';
import PaperSettings from './PaperSettings';
import { FontWeights } from '@fluentui/react';

enum VisibilityTab {
  EmailData = 'emaildata',
  Lang = 'lang',
  DateFormat = 'dateformat',
  FileTitle = 'filetitle',
  Paper = 'paper',
  Other = 'other'
}

type VisibilityDict = {
  [K in VisibilityTab]: boolean;
};

type ItemMenu = {
  key: string;
  text: string;
  onClick: () => void;
  style: CSSProperties;
};

const SettingsTab: React.FC<IServiceProps> = (props: IServiceProps) => {
  const { t } = React.useContext(LocaleContext);

  const onRenderItem = (item: IOverflowSetItemProps): JSX.Element => {
    return (
      <Link
        role="menuitem"
        styles={{
          root: {
            marginRight: 10,
            fontWeight: visiblity[item.key as VisibilityTab]
              ? FontWeights.bold
              : FontWeights.regular
          }
        }}
        onClick={item.onClick}
      >
        {item.text}
      </Link>
    );
  };

  const onRenderOverflowButton = (
    overflowItems: ItemMenu[] | any
  ): JSX.Element => {
    const buttonStyles: Partial<IButtonStyles> = {
      root: {
        minWidth: 0,
        padding: '0 4px',
        alignSelf: 'stretch',
        height: 'auto'
      }
    };
    return (
      <IconButton
        role="menuitem"
        title={t('MoreSettings')}
        styles={buttonStyles}
        menuIconProps={{ iconName: 'More' }}
        menuProps={{ items: overflowItems }}
      />
    );
  };

  const getAllVisibilityTurnedOff = () => {
    return {
      [VisibilityTab.EmailData]: false,
      [VisibilityTab.Lang]: false,
      [VisibilityTab.DateFormat]: false,
      [VisibilityTab.FileTitle]: false,
      [VisibilityTab.Paper]: false,
      [VisibilityTab.Other]: false
    };
  };

  const defaultVisibility = () => {
    const visibility = getAllVisibilityTurnedOff();
    visibility[VisibilityTab.EmailData] = true;
    return visibility;
  };

  const [visiblity, setVisibility] = useState<VisibilityDict>(
    defaultVisibility()
  );

  const onItemClicked = (itemKey: VisibilityTab): (() => void) => {
    return () => {
      const visibility = getAllVisibilityTurnedOff();
      const key: VisibilityTab = itemKey;
      visibility[key] = true;
      setVisibility(visibility);
    };
  };

  const items: ItemMenu[] = [
    {
      text: t('Emaildata'),
      key: VisibilityTab.EmailData,
      onClick: onItemClicked(VisibilityTab.EmailData),
      style: {}
    },
    {
      text: t('DateFormat'),
      key: VisibilityTab.DateFormat,
      onClick: onItemClicked(VisibilityTab.DateFormat),
      style: {}
    },
    {
      text: t('Lang'),
      key: VisibilityTab.Lang,
      onClick: onItemClicked(VisibilityTab.Lang),
      style: {}
    }
  ];

  const overFlowItems: ItemMenu[] = [
    {
      text: t('Print'),
      key: VisibilityTab.Paper,
      onClick: onItemClicked(VisibilityTab.Paper),
      style: {
        fontWeight: visiblity[VisibilityTab.Paper] ? 'bold' : 'normal'
      }
    },
    {
      text: t('FileTitle'),
      key: VisibilityTab.FileTitle,
      onClick: onItemClicked(VisibilityTab.FileTitle),
      style: {
        fontWeight: visiblity[VisibilityTab.FileTitle] ? 'bold' : 'normal'
      }
    },
    {
      text: t('OtherSettings'),
      key: VisibilityTab.Other,
      onClick: onItemClicked(VisibilityTab.Other),
      style: {
        fontWeight: visiblity[VisibilityTab.Other] ? 'bold' : 'normal'
      }
    }
  ];

  return (
    <>
      <OverflowSet
        aria-label={t('Settings')}
        role="menubar"
        items={items}
        styles={{ root: { marginTop: 10, marginBottom: 10 } }}
        overflowItems={overFlowItems}
        onRenderOverflowButton={onRenderOverflowButton}
        onRenderItem={onRenderItem}
      />
      {visiblity[VisibilityTab.EmailData] && <EmailDataSettings {...props} />}
      {visiblity[VisibilityTab.DateFormat] && <DatetimeSettings {...props} />}
      {visiblity[VisibilityTab.Lang] && <LangSettings {...props} />}
      {visiblity[VisibilityTab.Paper] && <PaperSettings {...props} />}
      {visiblity[VisibilityTab.FileTitle] && (
        <TitleBuilderSettings {...props} />
      )}
      {visiblity[VisibilityTab.Other] && <OtherSettings {...props} />}
    </>
  );
};

export default SettingsTab;
