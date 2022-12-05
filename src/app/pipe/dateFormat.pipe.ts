import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'DateFormat',
  pure: false,
})
export class DateFormatPipe implements PipeTransform {
  transform(moment: moment.Moment | null, format = 'MMMM YYYY'): string {
    return moment!.format(format);
  }
}
