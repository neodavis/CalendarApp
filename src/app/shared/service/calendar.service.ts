import { BehaviorSubject, delay, Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  public date: BehaviorSubject<moment.Moment> = new BehaviorSubject(moment());

  changeMonth(val: number) {
    let value = this.date.value.add(val, 'month');
    this.date.next(value);
  }
}
