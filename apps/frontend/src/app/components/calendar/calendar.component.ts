import { isLoadingSelector } from './../../shared/store/selectors';
import { AppState } from '../../shared/interfaces/app-state';
import { CalendarService } from './../../shared/service/calendar.service';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Day } from '../../shared/interfaces/day';
import { Week } from '../../shared/interfaces/week';
import { Absence } from '../../shared/interfaces/absence';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import * as AbsenceActions from '../../shared/store/actions';
import { absenceSelector } from '../../shared/store/selectors';
import { EditorComponent } from '../dialogs/editor/editor.component';
import * as moment from 'moment';
import 'moment/locale/uk';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit, OnDestroy {
  private absences$: Observable<Absence[]>;
  private absences: Absence[];
  private notifier = new Subject();
  public date = this.calendarService.getDate()
  public isLoading$: Observable<Boolean>;
  public calendar: Week[];
  public current: Day;

  constructor(
    private dialog: MatDialog,
    private calendarService: CalendarService,
    private store: Store<AppState>
  ) {
    this.absences$ = this.store.pipe(select(absenceSelector));
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
  }

  public nextMonth() {
    this.calendarService.changeMonth(1);
    this.calendar = this.calendarService.createCalendar( this.absences );
  }

  public prevMonth() {
    this.calendarService.changeMonth(-1);
    this.calendar = this.calendarService.createCalendar( this.absences );
  }
  public currentMonth() {
    this.calendarService.setToMonthCurrent();
    this.calendar = this.calendarService.createCalendar( this.absences );
  }

  public absenceToColor(absense: Absence): string {
    return `#${ (absense.id * 5).toString(16).slice(0, 6) }`;
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
      if (!this.current) {
        this.current = {
          value: moment(),
          disabled: false,
          current: true,
          absence: absences.find((absence: Absence) => {
            return this.current.value.isBetween(absence.start, absence.end, 'day');
          })
        };
      } else {
        this.current.absence = absences.find((absence: Absence) => {
          return this.current.value.isBetween(absence.start, absence.end, 'day');
        });
      }
    });
  }

  public ngOnDestroy() {
    this.notifier.complete();
  }
}
