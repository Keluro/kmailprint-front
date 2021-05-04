import React from 'react';
import {
  Link,
  MessageBar,
  MessageBarType,
  getTheme,
  AnimationStyles
} from '@fluentui/react';
import { mergeStyles } from '@fluentui/merge-styles';
import { IRawStyle } from '@fluentui/react-theme-provider';
import { LocaleContext } from './LocaleContext';

export type MessageBarContextType = {
  setMessageContent: (content: string) => void;
  open: () => void;
  close: () => void;
  setType: (type: MessageBarType) => void;
  setLinkInfo: (linkInfo: LinkInfo | undefined) => void;
};

export const MessageBarContext = React.createContext<MessageBarContextType>({
  setMessageContent: () => {},
  open: () => {},
  close: () => {},
  setType: () => {},
  setLinkInfo: () => {}
});

export type LinkInfo = {
  displayText: string;
  url: string;
  newWindow: boolean;
};

type Props = {
  children: React.ReactNode;
};

export const MessageBarProvider = ({ children }: Props): JSX.Element => {
  const [messageContent, setMessageContent] = React.useState<string>('');
  const [isVisible, setVisibility] = React.useState<boolean>(false);
  const [type, setType] = React.useState<MessageBarType>(MessageBarType.info);
  const [linkInfo, setLinkInfo] = React.useState<LinkInfo | undefined>(
    undefined
  );

  const { t } = React.useContext(LocaleContext);

  const theme = getTheme();

  const commonStyle: IRawStyle = {
    boxShadow: theme.effects.elevation8,
    position: 'absolute',
    top: 0,
    zIndex: 1,
    left: 0,
    right: 0
  };
  const visibleMessageBarStyle = mergeStyles(
    AnimationStyles.slideDownIn20,
    commonStyle
  );

  const hiddenMessageBarStyle = mergeStyles(
    AnimationStyles.slideUpOut20,
    commonStyle
  );

  const open = () => {
    reset();
    setVisibility(true);
  };

  const reset = () => {
    setLinkInfo(undefined);
    setType(MessageBarType.info);
    setMessageContent('');
  };
  const close = () => {
    reset();
    setVisibility(false);
  };

  return (
    <MessageBarContext.Provider
      value={{ open, close, setMessageContent, setType, setLinkInfo }}
    >
      <div
        className={isVisible ? visibleMessageBarStyle : hiddenMessageBarStyle}
      >
        <MessageBar
          messageBarType={type}
          isMultiline={true}
          onDismiss={() => setVisibility(false)}
          dismissButtonAriaLabel={t('Close')}
        >
          {messageContent}
          {linkInfo && (
            <Link
              href={linkInfo?.url}
              target={linkInfo?.newWindow ? '_blank' : '_self'}
            >
              {linkInfo?.displayText}
            </Link>
          )}
        </MessageBar>
      </div>

      {children}
    </MessageBarContext.Provider>
  );
};

export default MessageBarProvider;
