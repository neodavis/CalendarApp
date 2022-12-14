import { Absence } from './absence';
import * as moment from 'moment';

export interface Day {
  value: moment.Moment;
  current: boolean;
  disabled: boolean;
  absence: Absence | undefined;
}
