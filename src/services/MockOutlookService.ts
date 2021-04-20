/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { IOutlookService } from './IOulookService';
export class MockOutlookService implements IOutlookService {
  getAuthorEmailAsync() {
    return Promise.resolve('benoit.patra@gmail.com');
  }
  getAuthorAsync() {
    return Promise.resolve('Benoit Patra');
  }
  getNormalizedSubjectAsync() {
    return Promise.resolve('Once Upon A Time In the Land Of Brittany');
  }
  getSubjectAsync() {
    return Promise.resolve(
      'Re: Re: FWD: Once Upon A Time In the Land Of Brittany'
    );
  }
  getDateTimeSentAsync() {
    return Promise.resolve('2020-08-14 12:00');
  }
}
