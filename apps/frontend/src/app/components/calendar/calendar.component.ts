import { isLoadingSelector, absenceSelector, errorSelector } from './../../shared/store/absences/selectors';
import * as AbsenceActions from '../../shared/store/absences/actions';
import { AppState } from '../../shared/interfaces/app-state';
import { CalendarService } from './../../shared/service/calendar.service';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { Day } from '../../shared/interfaces/day';
import { Week } from '../../shared/interfaces/week';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { EditorComponent } from '../dialogs/editor/editor.component';
import * as moment from 'moment';
import 'moment/locale/uk';
import { Absence } from '../../shared/interfaces/absence';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit, OnDestroy {
  private absences$: Observable<Absence[]>;
  private absences: Absence[];
  private notifier: Subject<void> = new Subject<void>();
  public date: BehaviorSubject<moment.Moment> = this.calendarService.getDate();
  public isLoading$: Observable<Boolean>;
  public error$: Observable<string | null>;
  public calendar: Week[];
  public current: Day = {
    value: moment(),
    current: true,
    disabled: false,
    absence: undefined
  };
  public sessionStorage: Storage = sessionStorage;

  constructor(
    private dialog: MatDialog,
    private calendarService: CalendarService,
    private store: Store<AppState>
  ) {
    this.absences$ = this.store.pipe(select(absenceSelector));
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.error$ = this.store.pipe(select(errorSelector));
  }

  public nextMonth(): void {
    this.calendarService.changeMonth(1);
    this.calendar = this.calendarService.createCalendar(this.absences);
  }

  public prevMonth(): void {
    this.calendarService.changeMonth(-1);
    this.calendar = this.calendarService.createCalendar(this.absences);
  }
  public currentMonth(): void {
    this.calendarService.setToMonthCurrent();
    this.calendar = this.calendarService.createCalendar(this.absences);
  }

  public updateAbsences(): void {
    this.store.dispatch(AbsenceActions.getAbsences());
  }

  public absenceToColor(absenseId: number): string {
    return `#${(absenseId * 999999).toString(16).slice(0, 6)}`;
  }

  public getDateDetails(day: Day): void {
    this.current = day;
  }

  public deleteAbsence(id: number): void {
    this.store.dispatch(AbsenceActions.deleteAbsence({ id: id }));
  }

  public openEditorDialog(absence: Absence): void {
    this.dialog.open(EditorComponent, {
      data: { absence: absence },
      width: '500px',
    });
  }

  public ngOnInit(): void {
    this.store.dispatch(AbsenceActions.getAbsences());

    this.absences$.pipe(takeUntil(this.notifier)).subscribe((absences: Absence[]) => {
      this.calendar = this.calendarService.createCalendar(absences);
      this.absences = absences;
      this.current = {
        value: moment(),
        disabled: false,
        current: true,
        absence: absences.find((absence: Absence) => {
          return this.current.value.isBetween(absence.start, absence.end, 'day');
        })
      };
    });
  }

  public ngOnDestroy(): void {
    this.notifier.complete();
  }
}
