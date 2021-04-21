export interface IOutlookService {
  getAuthorEmailAsync: () => Promise<string>;
  getAuthorAsync: () => Promise<string>;
  getNormalizedSubjectAsync: () => Promise<string>;
  getSubjectAsync: () => Promise<string>;
  getDateTimeSentAsync: () => Promise<string>;

  showNotificationAndDialog(
    text: string,
    downloadText: string,
    url: string,
    urlText: string
  ): void;

  isJSFunction(): boolean;

  completeEvent(): void;
}
