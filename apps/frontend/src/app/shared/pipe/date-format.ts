import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'dateFormat',
  pure: false,
})
export class DateFormatPipe implements PipeTransform {
  transform(date: moment.Moment | null, format = 'MMMM YYYY'): string {
    return moment(date)!.format(format);
  }
}
