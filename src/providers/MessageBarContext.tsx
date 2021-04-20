import React, { CSSProperties } from 'react';
import {
  MessageBar,
  MessageBarType,
  getTheme,
  AnimationStyles
} from '@fluentui/react';
import { mergeStyles } from '@fluentui/merge-styles';
import { IRawStyle } from '@fluentui/react-theme-provider';

export type MessageBarContextType = {
  setMessageContent: (content: string) => void;
  setVisibility: (visibility: boolean) => void;
  setIsError: (isError: boolean) => void;
};

export const MessageBarContext = React.createContext<MessageBarContextType>({
  setMessageContent: () => {},
  setVisibility: () => {},
  setIsError: () => {}
});

type Props = {
  children: React.ReactNode;
};

export const MessageBarProvider = ({ children }: Props): JSX.Element => {
  const [messageContent, setMessageContent] = React.useState<string>('');
  const [isVisible, setVisibility] = React.useState<boolean>(false);
  const [isError, setIsError] = React.useState<boolean>(false);

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

  return (
    <MessageBarContext.Provider
      value={{ setVisibility, setMessageContent, setIsError }}
    >
      <div
        className={isVisible ? visibleMessageBarStyle : hiddenMessageBarStyle}
      >
        <MessageBar
          messageBarType={
            isError ? MessageBarType.error : MessageBarType.success
          }
          isMultiline={false}
          onDismiss={() => {
            setVisibility(false);
          }}
          dismissButtonAriaLabel="Close"
        >
          {messageContent}
        </MessageBar>
      </div>

      {children}
    </MessageBarContext.Provider>
  );
};

export default MessageBarProvider;
