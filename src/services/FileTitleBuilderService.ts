import IMailPrinterService from './IMailPrinterService';
import { IOutlookService } from './IOulookService';
import { SettingsResolverService } from './SettingsResolverService';

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
  mailPrinterService: IMailPrinterService,
  selectedItems: FileTitleKind[]
): Promise<string> => {
  const items: string[] = [];
  const settings = new SettingsResolverService(outlookService).getSettings();
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
      case FileTitleKind.DateTimeSent: {
        const tokenInfo = await outlookService.getTokenInfo();
        items[i] = await mailPrinterService.getFormatedDateTimeSent(
          tokenInfo,
          settings.language,
          settings.dateFormat
        );
        break;
      }
      default:
        items[i] = '';
        break;
    }
  }
  return cleanTitle(items.join('_')) + '.pdf';
};
