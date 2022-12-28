import * as moment from 'moment';

export interface Absence {
  id: number;
  user_id: number;
  start: moment.Moment;
  end: moment.Moment;
  type: string;
  comment: string;
}