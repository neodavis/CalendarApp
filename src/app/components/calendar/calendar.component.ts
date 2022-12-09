import { AppState } from './../../shared/interfaces/app-state';
import { CalendarService } from './../../shared/service/calendar.service';
import { filter, Observable, of, take } from 'rxjs';
import { AbcenceState } from 'src/app/shared/interfaces/abcence-state';
import { Day } from '../../shared/interfaces/day';
import { Week } from '../../shared/interfaces/week';
import { Abcence } from '../../shared/interfaces/abcence';
import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import 'moment/locale/uk';
import { select, Store } from '@ngrx/store';
import * as AbcenceActions from '../../shared/store/actions'
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { isLoadingSelector, abcenceSelector} from 'src/app/shared/store/selectors';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent {
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';

  public abcence$: Observable<Abcence[]>
  public isLoading$: Observable<boolean>

  constructor(public dialog: MatDialog, public calendarService: CalendarService, private store: Store<AppState>) {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector)),
    this.abcence$ = this.store.pipe(select(abcenceSelector))
  }

  public calendar: Week[];
  public current: Day;

  subscribeOn() {
    this.abcence$.subscribe(e => {
      this.current = {
        value: moment(),
        disabled: false,
        current: true,
        abcence: e.filter((e: Abcence) => {
          return moment().isSame(e.start, 'day');
        })
      }
      this.setCalendar(this.calendarService.date.value, e)
   })
  }

  nextMonth() {
    this.calendarService.changeMonth(1);
    this.subscribeOn()
  }

  prevMonth() {
    this.calendarService.changeMonth(-1);
    this.subscribeOn()
  }

  setCalendar(now: moment.Moment, abcenceArray: Abcence[] = []) {
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
            let abcence: Abcence[] = abcenceArray.filter((e: Abcence) => {
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
    this.store.dispatch(AbcenceActions.getAbcence())
    this.calendarService.date.subscribe(this.setCalendar.bind(this));
    this.subscribeOn()
  }
}
