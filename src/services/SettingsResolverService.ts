import { FileTitleKind } from './FileTitleBuilderService';
import { IOutlookService } from './IOulookService';
import {
  getPatternArrayFromStorage,
  getIsEntireConversationFromStorage,
  getLanguageFromStorage,
  saveIsEntireConversationStorage,
  savePatternArrayStorage,
  saveLanguageStorage,
  deleteLanguageStorage,
  getPrintPaperFromStorage,
  savePrintPaperFromStorage
} from './LocalStorageService';
import { PrintPaper } from './PrintPaper';

type Settings = {
  language: string;
  entireConversation: boolean;
  fileTitlePattern: FileTitleKind[];
  paper: PrintPaper;
};

export class SettingsResolverService {
  constructor(private outlookService: IOutlookService) {}

  public getSettings = (): Settings => {
    return {
      language: this.getLanguageOrDefault(),
      entireConversation: this.getIsEntireConversationOrDefault(),
      fileTitlePattern: this.getPatternArrayOrDefault(),
      paper: this.getPrintPaperOrDefault()
    };
  };

  public saveIsEntireConversation = (entireConversation: boolean): void => {
    saveIsEntireConversationStorage(entireConversation);
  };

  public savePatternArray(patternArray: FileTitleKind[]): void {
    savePatternArrayStorage(patternArray.map((a) => a as string));
  }

  public saveLang(lang: string): void {
    saveLanguageStorage(lang);
  }

  public wipeLang(): void {
    deleteLanguageStorage();
  }

  public savePrintPaper(paper: PrintPaper): void {
    savePrintPaperFromStorage(paper as string);
  }

  private getLanguageOrDefault = (): string => {
    const lang = getLanguageFromStorage();
    if (lang === undefined) {
      return this.outlookService.getLocale();
    } else {
      return lang;
    }
  };

  private getIsEntireConversationOrDefault = (): boolean => {
    const result = getIsEntireConversationFromStorage();
    if (result === undefined) {
      return false;
    } else {
      return result;
    }
  };

  private getPatternArrayOrDefault = (): FileTitleKind[] => {
    let savedPatternKeys = getPatternArrayFromStorage();
    if (savedPatternKeys === undefined) {
      savedPatternKeys = [
        FileTitleKind.Subject,
        FileTitleKind.SenderEmailAddress
      ];
    }
    return savedPatternKeys as FileTitleKind[];
  };

  private getPrintPaperOrDefault = (): PrintPaper => {
    const savedValue = getPrintPaperFromStorage();
    if (savedValue === undefined) {
      return PrintPaper.A4;
    } else {
      return savedValue as PrintPaper;
    }
  };
}
