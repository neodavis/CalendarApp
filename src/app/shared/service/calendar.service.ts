import { BehaviorSubject, delay, Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Abcence } from '../interfaces/abcence';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  public date: BehaviorSubject<moment.Moment> = new BehaviorSubject(moment());

  changeMonth(val: number) {
    let value = this.date.value.add(val, 'month');
    this.date.next(value);
  }
  
  getDateStream(): Observable<Abcence[]> {
    const data: Abcence[] = [
      {
        start: moment(new Date("Sat Dec 03 2022 00:00:00 GMT+0200 (Восточная Европа, стандартное время)")),
        end: moment(new Date("Sat Dec 04 2022 00:00:00 GMT+0200 (Восточная Европа, стандартное ремя)")),
        type: "Відпустка",
        comment: "Lorem Ipsum1",
      },
      {
        start: moment(new Date("Sun Dec 03 2022 00:00:00 GMT+0200 (Восточная Европа, стандартное время)")),
        end: moment(new Date("Sun Dec 04 2022 00:00:00 GMT+0200 (Восточная Европа, стандартное время)")),
        type: "Лікарняний",
        comment: "Lorem Ipsum2",
      },
      {
        start: moment(new Date("Mon Dec 27 2022 00:00:00 GMT+0200 (Восточная Европа, стандартное время)")),
        end: moment(new Date("Sun Dec 28 2022 00:00:00 GMT+0200 (Восточная Европа, стандартное время)")),
        type: "Лікарняний",
        comment: "Lorem Ipsum2",
      },
      {
        start: moment(new Date("Mon Dec 27 2022 00:00:00 GMT+0200 (Восточная Европа, стандартное время)")),
        end: moment(new Date("Sun Dec 28 2022 00:00:00 GMT+0200 (Восточная Европа, стандартное время)")),
        type: "Лікарняний",
        comment: "Lorem Ipsum2",
      },
      {
        start: moment(new Date("Mon Dec 27 2022 00:00:00 GMT+0200 (Восточная Европа, стандартное время)")),
        end: moment(new Date("Sun Dec 28 2022 00:00:00 GMT+0200 (Восточная Европа, стандартное время)")),
        type: "Лікарняний",
        comment: "Lorem Ipsum2",
      },
      {
        start: moment(new Date("Tue Dec 06 2022 00:00:00 GMT+0200 (Восточная Европа, стандартное время)")),
        end: moment(new Date("Tue Dec 07 2022 00:00:00 GMT+0200 (Восточная Европа, стандартное время)")),
        type: "Відпустка",
        comment: "Lorem Ipsum3",
      },
      {
        start: moment(new Date("Fri Dec 09 2022 00:00:00 GMT+0200 (Восточная Европа, стандартное время)")),
        end: moment(new Date("Fri Dec 09 2022 00:00:00 GMT+0200 (Восточная Европа, стандартное время)")),
        type: "Лікарняний",
        comment: "Lorem Ipsum4",
      }
    ];

    return of(data).pipe(delay(2000))
  }
}
