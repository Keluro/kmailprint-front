import * as React from 'react';
import { getRTL } from '@fluentui/react/lib/Utilities';
import { FocusZone, FocusZoneDirection } from '@fluentui/react/lib/FocusZone';
import { TextField } from '@fluentui/react/lib/TextField';
import { Image, ImageFit } from '@fluentui/react/lib/Image';
import { Icon } from '@fluentui/react/lib/Icon';
import { List } from '@fluentui/react/lib/List';
import {
  ITheme,
  mergeStyleSets,
  getTheme,
  getFocusStyle
} from '@fluentui/react/lib/Styling';
import { getStyleFromPropsAndOptions } from '@fluentui/react-theme-provider';

const theme: ITheme = getTheme();
const { palette, semanticColors, fonts } = theme;

const classNames = mergeStyleSets({
  itemCell: [
    getFocusStyle(theme, { inset: -1 }),
    {
      padding: 10,
      boxSizing: 'border-box',
      borderBottom: `1px solid ${semanticColors.bodyDivider}`,
      display: 'flex',
      alignItems: 'center'
    }
  ],
  itemContent: {
    overflow: 'hidden',
    flexGrow: 1
  },
  itemName: [
    fonts.xLarge,
    {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  ],
  iconsContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  icon: {
    alignSelf: 'center',
    marginLeft: 10,
    color: palette.neutralTertiary,
    fontSize: fonts.large.fontSize,
    cursor: 'pointer'
  },
  disabled: {
    cursor: 'default',
    color: palette.neutralLighterAlt
  }
});

export type IItemKey = {
  key: string | number;
  text: string;
};

export type MovingElementListProps = {
  items: IItemKey[];
  removeItem: (key: number | string) => void;
  moveUpItem: (key: number | string) => void;
  moveDownItem: (key: number | string) => void;
};

const MovingElementList: React.FC<MovingElementListProps> = (
  props: MovingElementListProps
) => {
  const onRenderCell = (
    item: IItemKey | undefined,
    index: number | undefined
  ): React.ReactNode => {
    return (
      typeof index != 'undefined' &&
      item && (
        <div className={classNames.itemCell} data-is-focusable={false}>
          <div className={classNames.itemContent}>{item?.text}</div>
          <div className={classNames.iconsContainer}>
            {index > 0 && (
              <Icon
                className={classNames.icon}
                iconName={'ChevronUp'}
                onClick={() => props.moveUpItem(item?.key)}
              />
            )}
            {index < props.items.length - 1 && (
              <Icon
                className={classNames.icon}
                iconName={'ChevronDown'}
                onClick={() => props.moveDownItem(item?.key)}
              />
            )}
            <Icon
              className={classNames.icon}
              iconName={'Cancel'}
              onClick={() => props.removeItem(item?.key)}
            />
          </div>
        </div>
      )
    );
  };

  return <List items={props.items} onRenderCell={onRenderCell} />;
};

export default MovingElementList;
