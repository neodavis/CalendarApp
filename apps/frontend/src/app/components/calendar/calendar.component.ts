import { isLoadingSelector } from './../../shared/store/selectors';
import { AppState } from '../../shared/interfaces/app-state';
import { CalendarService } from './../../shared/service/calendar.service';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Day } from '../../shared/interfaces/day';
import { Week } from '../../shared/interfaces/week';
import { Absence } from '../../shared/interfaces/absence';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import 'moment/locale/uk';
import { select, Store } from '@ngrx/store';
import * as AbsenceActions from '../../shared/store/actions';
import { absenceSelector } from '../../shared/store/selectors';
import { EditorComponent } from '../dialogs/editor/editor.component';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit, OnDestroy {
  public absences$: Observable<Absence[]>;
  public isLoading$: Observable<Boolean>;
  notifier = new Subject();
  public calendar: Week[];
  public current: Day;
  public absences: Absence[];

  constructor(
    public dialog: MatDialog,
    public calendarService: CalendarService,
    private store: Store<AppState>
  ) {
    this.absences$ = this.store.pipe(select(absenceSelector));
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
   }

  nextMonth() {
    this.calendarService.changeMonth(1);
    this.setCalendar(this.calendarService.date.value, this.absences);
  }

  prevMonth() {
    this.calendarService.changeMonth(-1);
    this.setCalendar(this.calendarService.date.value, this.absences);
  }
  currentMonth() {
    this.calendarService.setToMonthCurrent();
    this.setCalendar(this.calendarService.date.value, this.absences);
  }

  setCalendar(now: moment.Moment, absenceArray: Absence[] = []) {
    let startOf = now.clone().startOf('month').startOf('week');
    let endOf = now.clone().endOf('month').endOf('week');
    let date = startOf.clone().subtract(1, 'day');
    let calendar: Array<any> = [];

    while (date.isBefore(endOf, 'day')) {
      calendar.push({
        days: Array(7)
          .fill(0)
          .map(() => {
            let value = date.add(1, 'day').clone();
            let disabled = !now.isSame(value, 'month');
            let current = moment().isSame(value, 'day');
            let absence: Absence[] = absenceArray.filter((absence: Absence) => {
              return value.isBetween(
                moment(absence.start),
                moment(absence.end),
                'day',
                '[]'
              );
            });

            return { value, current, disabled, absence };
          }),
      });
    }
    this.calendar = calendar;
  }
  absenceToColor(absense: Absence) {
    let color = (absense.id*5).toString(16).slice(0, 6);
    return `#${color}`;
  }
  getDateDetails(day: Day) {
    this.current = day;
  }

  deleteAbsence(id: number) {
    this.store.dispatch(AbsenceActions.deleteAbsence({ id: id }));
  }

  openEditorDialog(absence: Absence) {
    this.dialog.open(EditorComponent, {
      data: {
        absence: absence,
      },
      width: '500px',
    });
  }

  ngOnInit() {
    this.store.dispatch(AbsenceActions.getAbsences());
    this.calendarService.date
      .pipe(takeUntil(this.notifier))
      .subscribe(this.setCalendar.bind(this));

    this.absences$.pipe(takeUntil(this.notifier)).subscribe((absences) => {
      this.setCalendar(this.calendarService.date.value, absences);
      this.absences = absences;
      if (!this.current) {
        this.current = {
          value: moment(),
          disabled: false,
          current: true,
          absence: absences.filter((absence: Absence) => {
            return moment().isSame(absence.start, 'day');
          }),
        };
      } else {
        this.current.absence = absences.filter((absence: Absence) => {
          return this.current.value.isSame(absence.start, 'day');
        });
      }
    });
  }

  ngOnDestroy() {
    this.notifier.complete();
  }
}
