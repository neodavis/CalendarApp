import { userSelector } from './../../shared/store/users/selectors';
import * as UserActions from './../../shared/store/users/actions';
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
import { User } from '../../shared/interfaces/user';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit, OnDestroy {
  private absences$: Observable<Absence[]>;
  private absences: Absence[];
  private notifier: Subject<void> = new Subject<void>();
  public user$: Observable<User | null>;
  public user_id: number = 0;
  public date: BehaviorSubject<moment.Moment> = this.calendarService.getDate()
  public isLoading$: Observable<Boolean>;
  public error$: Observable<string | null>;
  public calendar: Week[];
  public current: Day;

  constructor(
    private dialog: MatDialog,
    private calendarService: CalendarService,
    private store: Store<AppState>
  ) {
    this.absences$ = this.store.pipe(select(absenceSelector));
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.error$ = this.store.pipe(select(errorSelector));
    this.user$ = this.store.pipe(select(userSelector));
  }

  public nextMonth(): void {
    this.calendarService.changeMonth(1);
    this.calendar = this.calendarService.createCalendar( this.absences );
  }

  public prevMonth(): void {
    this.calendarService.changeMonth(-1);
    this.calendar = this.calendarService.createCalendar( this.absences );
  }
  public currentMonth(): void {
    this.calendarService.setToMonthCurrent();
    this.calendar = this.calendarService.createCalendar( this.absences );
  }

  public updateAbsences(): void {
    this.store.dispatch(AbsenceActions.getAbsences({ user_id: this.user_id }))
  }

  public absenceToColor(absense: Absence): string {
    return `#${ (absense.id * 10000).toString(16).slice(0, 6) }`;
  }

  public getDateDetails(day: Day): void {
    this.current = day;
  }

  public deleteAbsence(id: number): void {
    this.store.dispatch(AbsenceActions.deleteAbsence({ absence_id: id, user_id: this.user_id }));
  }

  public openEditorDialog(absence: Absence): void {
    this.dialog.open(EditorComponent, {
      data: { absence: absence },
      width: '500px',
    });
  }

  public ngOnInit(): void {
    if (localStorage.getItem('token') != null) {
      this.store.dispatch(UserActions.userAuth({
        token: String(localStorage.getItem('token'))
      }));
    }
    
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

    this.user$.pipe(takeUntil(this.notifier)).subscribe((user: User | null) => {
      if (user?.user_id) {
        this.user_id = user.user_id
      }
    })
  }

  public ngOnDestroy(): void {
    this.notifier.complete();
  }
}
