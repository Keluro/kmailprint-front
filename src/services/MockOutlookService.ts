/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { IOutlookService } from './IOulookService';

const timeout = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
export class MockOutlookService implements IOutlookService {
  completeEvent(): void {
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

  isJSFunction() {
    return false;
  }

  async showNotificationAndDialog(
    text: string,
    downloadText: string,
    url: string,
    urlText: string
  ) {
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
