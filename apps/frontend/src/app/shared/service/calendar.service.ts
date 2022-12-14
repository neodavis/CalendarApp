import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Absence } from '../interfaces/absence';
import { Week } from '../interfaces/week';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  private date: BehaviorSubject<moment.Moment> = new BehaviorSubject(moment());

  public changeMonth(val: number): void {
    let value = this.date.value.add(val, 'month');
    this.date.next(value);
  }
  public setToMonthCurrent(): void {
    this.date.value.set({ year: moment().year(), month: moment().month() });
  }

  public createCalendar(absenceArray: Absence[]): Week[] {
    let now = this.date.value;
    let startOf = now.clone().startOf('month').startOf('week');
    let endOf = now.clone().endOf('month').endOf('week');
    let date = startOf.clone().subtract(1, 'day');
    let calendar: Array<Week> = [];

    while (date.isBefore(endOf, 'day')) {
      calendar.push({
        days: Array(7)
          .fill(0)
          .map(() => {
            let value = date.add(1, 'day').clone();
            let disabled = !now.isSame(value, 'month');
            let current = moment().isSame(value, 'day');
            let absence: Absence | undefined = absenceArray.find((absence: Absence) => {
              return value.isBetween(moment(absence.start), moment(absence.end), 'day', '[]');
            });

            return { value, current, disabled, absence };
          }),
      });
    }
    return calendar;
  }

  public getDate(): BehaviorSubject<moment.Moment> {
    return this.date;
  }
}
