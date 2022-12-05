import { Abcence } from './abcence';
import * as moment from 'moment';

export interface Day {
  value: moment.Moment;
  current: boolean;
  disabled: boolean;
  abcence: Abcence[];
}
