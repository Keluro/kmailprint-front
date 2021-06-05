import { FileTitleKind } from './FileTitleBuilderService';
import { IOutlookService } from './IOulookService';
import {
  getPatternArrayFromStorage,
  getIsEntireConversationFromStorage,
  getLanguageFromStorage,
  saveIsEntireConversationStorage,
  savePatternArrayStorage,
  saveLanguageStorage,
  deleteLanguageStorage
} from './LocalStorageService';

type Settings = {
  language: string;
  entireConversation: boolean;
  fileTitlePattern: FileTitleKind[];
};

export class SettingsResolverService {
  constructor(private outlookService: IOutlookService) {}

  public getSettings = (): Settings => {
    return {
      language: this.getLanguageOrDefault(),
      entireConversation: this.getIsEntireConversationOrDefault(),
      fileTitlePattern: this.getPatternArrayOrDefault()
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
}
