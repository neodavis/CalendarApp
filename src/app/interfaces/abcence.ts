import * as moment from 'moment';

export interface Abcence {
  start: moment.Moment;
  end: moment.Moment;
  type: string;
  comment: string;
}
