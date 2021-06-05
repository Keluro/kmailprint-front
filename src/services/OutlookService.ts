/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosResponse } from 'axios';
import { IOutlookService } from './IOulookService';
import { Lang } from './Language';
import { UserInfo, TokenInfo } from './TokenInfo';

export class OutlookService implements IOutlookService {
  getLocale(): Lang {
    const locale = Office.context.displayLanguage;
    if (locale.startsWith('fr-')) {
      return Lang.FR;
    }
    return Lang.EN;
  }

  private getHostInfo() {
    //Use try catch, cuz this does not look to be a real api to look for the info
    //in the localstorage
    let hostInfo: string | null = '';
    try {
      hostInfo = window.sessionStorage.getItem('hostInfoValue');
      // eslint-disable-next-line no-empty
    } catch (e) {}
    if (hostInfo === null || typeof hostInfo === 'undefined') {
      hostInfo = '';
    }
    return hostInfo;
  }

  getMyUserInfo(): UserInfo {
    const profile = Office.context.mailbox.userProfile;
    //looks to be more of a hack than a real
    const hostInfo = this.getHostInfo();
    return {
      Name: profile.displayName,
      Email: profile.emailAddress,
      HostInfo: hostInfo
    };
  }

  getTokenInfo(): Promise<TokenInfo> {
    return new Promise<TokenInfo>((resolve, reject) => {
      Office.context.mailbox.getCallbackTokenAsync((asyncResult) => {
        if (asyncResult.status === Office.AsyncResultStatus.Succeeded) {
          const token = asyncResult.value;
          const mailbox: any = Office.context.mailbox;
          resolve({
            token: token,
            ewsUrl: mailbox.ewsUrl,
            itemId: mailbox.item.itemId
          });
        } else {
          reject('Failure retrieving token');
        }
      });
    });
  }

  async getAuthorEmailAsync(): Promise<string> {
    const item = (Office as any).cast.item.toMessageRead(
      Office.context.mailbox.item
    );
    return Promise.resolve(item.from.emailAddress);
  }

  async getAuthorAsync(): Promise<string> {
    const item = (Office as any).cast.item.toMessageRead(
      Office.context.mailbox.item
    );
    return Promise.resolve(item.from.displayName);
  }

  async getNormalizedSubjectAsync(): Promise<string> {
    const item = (Office as any).cast.item.toMessageRead(
      Office.context.mailbox.item
    );
    return item.normalizedSubject;
  }

  async getSubjectAsync(): Promise<string> {
    const item = (Office as any).cast.item.toMessageRead(
      Office.context.mailbox.item
    );
    return item.subject;
  }

  // TODO:
  async getDateTimeSentAsync(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      (Office as any).context.mailbox.getCallbackTokenAsync(
        (asyncResult: any) => {
          if (asyncResult.status === Office.AsyncResultStatus.Succeeded) {
            const token = asyncResult.value;
            const mailbox = Office.context.mailbox;
            // if (mailbox.item == undefined) {
            //   return '';
            // }
            const server_url = process.env.API_URL;
            if (mailbox.item == undefined) {
              reject('Cannot retrieve itemID for EWS call');
              return;
            }
            const url =
              `${server_url}/api/EmailsDateTimeSent?ewsUrl=` +
              encodeURIComponent(mailbox.ewsUrl) +
              '&token=' +
              encodeURIComponent(token) +
              '&itemId=' +
              encodeURIComponent(mailbox.item?.itemId);
            const resultPromise = axios.get(url);
            resultPromise.then(
              (value: AxiosResponse<string>) => {
                resolve(value.data);
              },
              () => reject('Failure calling EWS server')
            );
          }
        }
      );
    });
  }

  async showNotification(text: string): Promise<void> {
    (Office as any).context.mailbox.item.notificationMessages.replaceAsync(
      'status',
      {
        type: 'informationalMessage',
        icon: 'pdf-icon-32',
        message: text,
        persistent: false
      }
    );
  }

  private createQueryParams(
    href: string,
    downloadText: string,
    hrefText: string,
    trailingSentence: string
  ) {
    return (
      '?href=' +
      encodeURIComponent(href) +
      '&hreftext=' +
      encodeURIComponent(hrefText) +
      '&text=' +
      encodeURIComponent(downloadText) +
      '&sentence1=' +
      encodeURIComponent(trailingSentence)
    );
  }

  async showDownloadDialog(
    downloadText: string,
    urlToOpen: string,
    urlText: string,
    trailingSentence: string
  ): Promise<void> {
    const suffix = this.createQueryParams(
      urlToOpen,
      downloadText,
      urlText,
      trailingSentence
    );
    //cannot use something else than dialogAPI, window.open does not work in Safari
    const dialogUrl =
      window.location.protocol +
      '//' +
      window.location.host +
      '/assets/download-dialog.html' +
      suffix;

    const dialogOptions = {
      width: 30,
      height: 40,
      requireHTTPS: true,
      displayInIframe: true
    };
    Office.context.ui.displayDialogAsync(
      dialogUrl,
      dialogOptions,
      (asyncResult: Office.AsyncResult<Office.Dialog>) => {
        const dialog = asyncResult.value;
        (window as any).dialog = dialog;
      }
    );
    return;
  }
}
