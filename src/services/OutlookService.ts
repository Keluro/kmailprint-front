// eslint-disable-next-line no-empty
export default {};
// import { IOutlookService } from './IOulookService';

// export class MockOutlookService implements IOutlookService {
//   completeEvent(): void {}

//   async getAuthorEmailAsync() {}

//   async getAuthorAsync() {}

//   async getNormalizedSubjectAsync() {}

//   async getSubjectAsync() {}
//   async getDateTimeSentAsync() {
//     await Office.context.mailbox.getCallbackTokenAsync(function (asyncResult) {
//       if (asyncResult.status === Office.AsyncResultStatus.Succeeded) {
//           // Cache the result from the server.
//           var token = asyncResult.value;
//           var mailbox = Office.context.mailbox;
//           that.$http({
//               url: '/api/EmailsDateTimeSent?ewsUrl=' + encodeURIComponent(mailbox.ewsUrl) + '&token=' + encodeURIComponent(token) + '&itemId=' + encodeURIComponent(mailbox.item.itemId),
//               method: 'GET'
//           }).success(function (result) {
//               deferred.resolve(result);
//           }).error(function (e) {
//               app.log(e);
//               deferred.reject(app.UIStr.BodyRequestFailure);
//           });
//   }

//   async showNotification(text: string) {
//     Office.context.mailbox.item.notificationMessages.replaceAsync('status', {
//       type: 'informationalMessage',
//       icon: 'pdf-icon-32',
//       message: text,
//       persistent: false
//     });
//   }

//   async showDownloadDialog(
//     downloadText: string,
//     urlToOpen: string,
//     urlText: string
//   ) {
//     var suffix = NotifierService.prototype.createQueryParams(
//       urlToOpen,
//       downloadText,
//       hrefText
//     );
//     //cannot use something else than dialogAPI, window.open does not work in Safari
//     NotifierService.prototype.showDialogInIframe(
//       window.location.protocol +
//         '//' +
//         window.location.host +
//         '/AppRead/downloadPage.html' +
//         suffix
//     );
//     return;
//   }
// }
