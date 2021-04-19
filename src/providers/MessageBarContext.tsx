import React from 'react';
import { MessageBar, MessageBarType } from '@fluentui/react';

export const MessageBarContext = React.createContext<MessageBarContextType>({
  message: '',
  setMessage: function () {
    //
  }
});

export enum MessageKind {
  Success,
  Error
}

export type MessageBarContextType = {
  message: string;
  setMessage: (content: string) => void;
};

type Props = {
  children: React.ReactNode;
};

export const MessageBarProvider = ({ children }: Props) => {
  const [message, setMessage] = React.useState('');

  return (
    <MessageBarContext.Provider value={{ message, setMessage }}>
      <MessageBar
        messageBarType={MessageBarType.error}
        isMultiline={false}
        dismissButtonAriaLabel="Close"
      >
        {message}
      </MessageBar>
      {children}
    </MessageBarContext.Provider>
  );
};

export default MessageBarProvider;
