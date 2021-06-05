import { Lang } from './Language';
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

  getLocale(): Lang;

  getMyUserInfo(): UserInfo;

  getTokenInfo(): Promise<TokenInfo>;
}
