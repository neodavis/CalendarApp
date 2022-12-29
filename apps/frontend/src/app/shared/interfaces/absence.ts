import * as moment from 'moment';

export interface Absence {
  id: number;
  userId: number;
  start: moment.Moment;
  end: moment.Moment;
  type: string;
  comment: string;
}