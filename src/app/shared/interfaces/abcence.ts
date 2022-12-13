import * as moment from 'moment';

export interface Abcence {
  id: number;
  start: moment.Moment;
  end: moment.Moment;
  type: string;
  comment: string;
}
