import { IOutlookService } from './IOulookService';

const cleanTitle = (input: string) => {
  const forbiddenChars = [
    />/g,
    /</g,
    /:/g,
    /"/g,
    /\\/g,
    /\//g,
    /\|/g,
    /\?/g,
    /\*/g,
    /!/
  ];
  for (let j = 0; j < forbiddenChars.length; j++) {
    input = input.replace(forbiddenChars[j], '-');
  }
  return input;
};

export enum FileTitleKind {
  Subject = 'subject',
  SenderEmailAddress = 'senderEmailAddress',
  SenderDisplayName = 'senderDisplayName',
  NormalizedSubject = 'normalizedSubject',
  DateTimeSent = 'dateTimeSent'
}

export const FileTitleTranslation: { [key: string]: string } = {
  [FileTitleKind.Subject]: 'Subject',
  [FileTitleKind.SenderEmailAddress]: 'SenderEmail',
  [FileTitleKind.SenderDisplayName]: 'SenderName',
  [FileTitleKind.NormalizedSubject]: 'NormSubject',
  [FileTitleKind.DateTimeSent]: 'Datetimesent'
};

export const FileTitleBuilderService = async (
  outlookService: IOutlookService,
  selectedItems: FileTitleKind[]
): Promise<string> => {
  const items: string[] = [];
  for (let i = 0; i < selectedItems.length; i++) {
    switch (selectedItems[i]) {
      case FileTitleKind.Subject:
        items[i] = await outlookService.getSubjectAsync();
        break;
      case FileTitleKind.SenderEmailAddress:
        items[i] = await outlookService.getAuthorEmailAsync();
        break;
      case FileTitleKind.SenderDisplayName:
        items[i] = await outlookService.getAuthorAsync();
        break;
      case FileTitleKind.NormalizedSubject:
        items[i] = await outlookService.getNormalizedSubjectAsync();
        break;
      case FileTitleKind.DateTimeSent:
        items[i] = await outlookService.getDateTimeSentAsync();
        break;
      default:
        items[i] = '';
        break;
    }
  }
  return cleanTitle(items.join('_')) + '.pdf';
};
