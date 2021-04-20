export interface IOutlookService {
  getAuthorEmailAsync: () => Promise<string>;
  getAuthorAsync: () => Promise<string>;
  getNormalizedSubjectAsync: () => Promise<string>;
  getSubjectAsync: () => Promise<string>;
  getDateTimeSentAsync: () => Promise<string>;
}
