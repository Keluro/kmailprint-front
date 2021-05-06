/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { saveAs } from 'file-saver';
import Bowser from 'bowser';

declare const ga: (
  verb: string,
  type: string,
  info1: string,
  info2: string
) => void;

export class IOService {
  openfile(fileTitle: string, blob: Blob) {
    saveAs(blob, fileTitle);
  }

  isSafari(): boolean {
    const bowser = Bowser.getParser(window.navigator.userAgent);
    const isSafari = bowser.getBrowserName().toLocaleLowerCase() === 'safari';
    return isSafari;
  }

  registerGoogleAnalyticsEvent(kind: string) {
    try {
      ga('send', 'event', 'KMailPrint', kind);
    } catch (ex) {
      console.log('Cannot register google analytics events...');
    }
  }
}
