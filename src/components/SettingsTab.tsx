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
import LangSettings from './LangSettings';
import TitleBuilderSettings from './TitleBuilderSettings';
import PaperSettings from './PaperSettings';
import { FontWeights } from '@fluentui/react';

enum Visibility {
  EmailData = 'emaildata',
  Lang = 'lang',
  DateFormat = 'dateformat',
  FileTitle = 'filetitle',
  Paper = 'paper'
}

type VisibilityDict = {
  [K in Visibility]: boolean;
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
            fontWeight: visiblity[item.key as Visibility]
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
      [Visibility.EmailData]: false,
      [Visibility.Lang]: false,
      [Visibility.DateFormat]: false,
      [Visibility.FileTitle]: false,
      [Visibility.Paper]: false
    };
  };

  const defaultVisibility = () => {
    const visibility = getAllVisibilityTurnedOff();
    visibility[Visibility.FileTitle] = true;
    return visibility;
  };

  const [visiblity, setVisibility] = useState<VisibilityDict>(
    defaultVisibility()
  );

  const onItemClicked = (itemKey: Visibility): (() => void) => {
    return () => {
      const visibility = getAllVisibilityTurnedOff();
      const key: Visibility = itemKey;
      visibility[key] = true;
      setVisibility(visibility);
    };
  };

  const items: ItemMenu[] = [
    {
      text: t('Emaildata'),
      key: Visibility.EmailData,
      onClick: onItemClicked(Visibility.EmailData),
      style: {}
    },
    {
      text: t('DateFormat'),
      key: Visibility.DateFormat,
      onClick: onItemClicked(Visibility.DateFormat),
      style: {}
    },
    {
      text: t('Lang'),
      key: Visibility.Lang,
      onClick: onItemClicked(Visibility.Lang),
      style: {}
    }
  ];

  const overFlowItems: ItemMenu[] = [
    {
      text: t('Print'),
      key: Visibility.Paper,
      onClick: onItemClicked(Visibility.Paper),
      style: {
        fontWeight: visiblity[Visibility.Paper] ? 'bold' : 'normal'
      }
    },
    {
      text: t('FileTitle'),
      key: Visibility.FileTitle,
      onClick: onItemClicked(Visibility.FileTitle),
      style: {
        fontWeight: visiblity[Visibility.FileTitle] ? 'bold' : 'normal'
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
      {visiblity[Visibility.EmailData] && <EmailDataSettings {...props} />}
      {visiblity[Visibility.DateFormat] && <DatetimeSettings {...props} />}
      {visiblity[Visibility.Lang] && <LangSettings {...props} />}
      {visiblity[Visibility.Paper] && <PaperSettings {...props} />}
      {visiblity[Visibility.FileTitle] && <TitleBuilderSettings {...props} />}
    </>
  );
};

export default SettingsTab;
