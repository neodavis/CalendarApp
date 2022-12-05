import { Day } from '../../interfaces/day';
import { Week } from '../../interfaces/week';
import { Abcence } from '../../interfaces/abcence';
import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import 'moment/locale/uk';
import { DataService } from 'src/app/service/calendar.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent {
  @Input() data: Abcence[] = [];
  constructor(public dialog: MatDialog, public dateService: DataService) {}

  public calendar: Week[];
  public current: Day;

  nextMonth() {
    this.dateService.changeMonth(1);
  }

  prevMonth() {
    this.dateService.changeMonth(-1);
  }

  setCalendar(now: moment.Moment) {
    let startOf = now.clone().startOf('month').startOf('week');
    let endOf = now.clone().endOf('month').endOf('week');
    let date = startOf.clone().subtract(1, 'day');
    let calendar = [];

    while (date.isBefore(endOf, 'day')) {
      calendar.push({
        days: Array(7)
          .fill(0)
          .map(() => {
            let value = date.add(1, 'day').clone();
            let disabled = !now.isSame(value, 'month');
            let current = moment().isSame(value, 'day');
            let abcence: Abcence[] = this.data.filter((e: any) => {
              return e.start.isSame(value, 'day');
            });

            return { value, current, disabled, abcence };
          }),
      });
    }
    this.calendar = calendar;
  }

  getDateDetails(day: Day) {
    this.current = day;
  }

  ngOnInit() {
    this.dateService.date.subscribe(this.setCalendar.bind(this));
    this.current = {
      value: moment(),
      disabled: false,
      current: true,
      abcence: this.data.filter((e: any) => {
        return moment().isSame(e.start, 'day');
      }),
    };
  }
}
