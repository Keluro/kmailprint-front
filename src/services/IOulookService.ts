import { TokenInfo, UserInfo } from './TokenInfo';

export interface IOutlookService {
  getAuthorEmailAsync: () => Promise<string>;

  getAuthorAsync: () => Promise<string>;

  getNormalizedSubjectAsync: () => Promise<string>;

  getSubjectAsync: () => Promise<string>;

  getDateTimeSentAsync: () => Promise<string>;

  showNotification(text: string): void;

  showDownloadDialog(
    dowloadText: string,
    urlToOpen: string,
    urlText: string,
    trailingSentence: string
  ): void;

  getLocale(): string;

  getMyUserInfo(): UserInfo;

  getTokenInfo(): Promise<TokenInfo>;
}
