/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { IOutlookService } from '../IOulookService';
import { UserInfo, TokenInfo } from '../TokenInfo';

const timeout = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
export class MockOutlookService implements IOutlookService {
  getMyUserInfo(): UserInfo {
    throw new Error('Method not implemented.');
  }
  getTokenInfo(): Promise<TokenInfo> {
    throw new Error('Method not implemented.');
  }

  getLocale(): string {
    console.log('Complete event fired...');
    return 'en';
  }
  completeEvent(): void {
    console.log('Complete event fired...');
    return;
  }

  async getAuthorEmailAsync() {
    await timeout(50);
    return Promise.resolve('benoit.patra@gmail.com');
  }
  async getAuthorAsync() {
    await timeout(100);
    return Promise.resolve('Benoit Patra');
  }
  async getNormalizedSubjectAsync() {
    return Promise.resolve('Once Upon A Time In the Land Of Brittany');
  }
  async getSubjectAsync() {
    await timeout(300);
    return Promise.resolve(
      'Re: Re: FWD: Once Upon A Time In the Land Of Brittany'
    );
  }
  async getDateTimeSentAsync() {
    await timeout(400);
    return Promise.resolve('2020-08-14 12:00');
  }

  async showNotification(text: string) {
    console.log('Notification: ' + text);
  }

  async showDownloadDialog(
    downloadText: string,
    urlToOpen: string,
    urlText: string
  ) {
    console.log(`Show Dialog: ${downloadText}, ${urlText}, ${urlToOpen}`);
    // Office.context.mailbox.item.notificationMessages.replaceAsync('status', {
    //   type: 'informationalMessage',
    //   icon: 'pdf-icon-32',
    //   message: header + ': ' + text,
    //   persistent: false
    // });
    // //dialogAPI is needed for OWA with safari (automated download does not work)
    // //see http://stackoverflow.com/questions/41059518/opening-dialogapi-from-ribbon-command-crashes-outlook-2016
    // if (typeof urlToOpen !== 'undefined') {
    //   var suffix = NotifierService.prototype.createQueryParams(
    //     urlToOpen,
    //     downloadText,
    //     hrefText
    //   );
    //   //cannot use something else than dialogAPI, window.open does not work in Safari
    //   NotifierService.prototype.showDialogInIframe(
    //     window.location.protocol +
    //       '//' +
    //       window.location.host +
    //       '/AppRead/downloadPage.html' +
    //       suffix
    //   );
    // }
    return;
  }
}
