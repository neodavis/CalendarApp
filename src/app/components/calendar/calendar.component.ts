import { AppState } from './../../shared/interfaces/app-state';
import { CalendarService } from './../../shared/service/calendar.service';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Day } from '../../shared/interfaces/day';
import { Week } from '../../shared/interfaces/week';
import { Abcence } from '../../shared/interfaces/abcence';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import 'moment/locale/uk';
import { select, Store } from '@ngrx/store';
import * as AbcenceActions from '../../shared/store/actions';
import { abcenceSelector } from 'src/app/shared/store/selectors';
import { EditorComponent } from '../dialogs/editor/editor.component';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit, OnDestroy {
  public abcences$: Observable<Abcence[]>;
  notifier = new Subject()
  constructor(
    public dialog: MatDialog,
    public calendarService: CalendarService,
    private store: Store<AppState>
  ) {
    this.abcences$ = this.store.pipe(select(abcenceSelector));
  }

  public calendar: Week[];
  public current: Day;
  public abcences: Abcence[];

  nextMonth() {
    this.calendarService.changeMonth(1);
    this.setCalendar(this.calendarService.date.value, this.abcences);
  }

  prevMonth() {
    this.calendarService.changeMonth(-1);
    this.setCalendar(this.calendarService.date.value, this.abcences);
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
            let abcence: Abcence[] = abcenceArray.filter((abcence: Abcence) => {
              return moment(abcence.start).isSame(value, 'day');
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

  deleteAbcence(id: number) {
    this.store.dispatch(AbcenceActions.deleteAbcence({ id: id }));
  }
  
  openEditorDialog(abcence: Abcence) {
    this.dialog.open(EditorComponent, {
      data: {
        abcence: abcence
      },
      width: '500px',
    })
  }

  ngOnInit() {
    this.store.dispatch(AbcenceActions.getAbcences());
    this.calendarService.date.pipe(takeUntil(this.notifier)).subscribe(this.setCalendar.bind(this));

    this.abcences$.pipe(takeUntil(this.notifier)).subscribe((abcences) => {
      this.setCalendar(this.calendarService.date.value, abcences);
      this.abcences = abcences
      if (!this.current) {
        this.current = {
          value: moment(),
          disabled: false,
          current: true,
          abcence: abcences.filter((abcence: Abcence) => {
            return moment().isSame(abcence.start, 'day');
          }),
        };
      } else {
        this.current.abcence = abcences.filter((abcence: Abcence) => {
          return this.current.value.isSame(abcence.start, 'day');
        });
      }
    })
  }

  ngOnDestroy() {
    this.notifier.complete();
  }
}
