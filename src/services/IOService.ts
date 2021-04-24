/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

//TODO:
export class IOService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  openfile(fileTitle: string, blob: Blob) {
    return;
  }

  isSafari() {
    return false;
  }

  registerGoogleAnalyticsEvent(kind: string) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).ga('send', 'event', 'KMailPrint', kind);
      // eslint-disable-next-line no-empty
    } catch {}
  }
}
