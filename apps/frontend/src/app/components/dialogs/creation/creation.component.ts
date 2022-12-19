import { Absence } from '../../../shared/interfaces/absence';
import { AppState } from '../../../shared/interfaces/app-state';
import { select, Store } from '@ngrx/store';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MessageComponent } from '../message/message.component';
import * as moment from 'moment';
import * as AbsenceActions from '../../../shared/store/actions';
import { absenceSelector } from '../../../shared/store/selectors';
import { Observable, takeUntil, Subject } from 'rxjs';

export const dateValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  let start: AbstractControl | null | undefined =
    control.parent?.get('startControl');
  let end: AbstractControl | null | undefined =
    control.parent?.get('endControl');

  if (start && end && moment(start.value).isAfter(moment(end.value))) {
    return { dateError: 'start is greater than end' };
  }

  start?.setErrors(null);
  end?.setErrors(null);

  return null;
};

@Component({
  selector: 'app-submit',
  templateUrl: './creation.component.html',
  styleUrls: ['./creation.component.scss'],
})
export class CreationComponent implements OnInit {
  public absences$: Observable<Absence[]>;
  public busyDates: Set<any> = new Set();
  private notifier = new Subject();
  public result: Absence;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CreationComponent>,
    public successDialog: MatDialog,
    public store: Store<AppState>
  ) {
    this.absences$ = this.store.pipe(select(absenceSelector));
  }

  public group: FormGroup = new FormGroup({
    typeControl: new FormControl('', [Validators.required]),
    startControl: new FormControl('', [Validators.required, dateValidator]),
    endControl: new FormControl('', [Validators.required, dateValidator]),
    commentControl: new FormControl(''),
  });

  public submit() {
    let isBusy = false;
    this.busyDates.forEach((date) => {
      if (
        moment(date).isBetween(
          moment(this.group.value.startControl),
          moment(this.group.value.endControl),
          'day',
          '[]'
        )
      ) {
        isBusy = true;
        return false;
      }
      return true;
    });
    if (!isBusy) {
      if (this.group.valid) {
        this.result = {
          id: Date.now(),
          start: this.group.value.startControl,
          end: this.group.value.endControl,
          type: this.group.value.typeControl,
          comment: this.group.value.commentControl,
        };

        this.store.dispatch(
          AbsenceActions.createAbsence({ absence: this.result })
        );
        this.dialogRef.close();
        this.successDialog.open(MessageComponent, {
          data: {
            title: 'Запит успішно надіслано',
            details: 'Чекайте на відповідь найближчим часом',
          },
        });
      }
    } else {
      this.dialogRef.close();
      this.successDialog.open(MessageComponent, {
        data: {
          title: 'Обраний проміжок не доступний',
          details: 'Оберіть інший та сбробуйте ще раз',
        },
      });
    }
  }

  public close() {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.absences$
      .pipe(takeUntil(this.notifier))
      .subscribe((absences: Absence[]) => {
        absences.forEach((absence: Absence) => {
          let date = moment(absence.start).clone();
          while (date.isSameOrBefore(absence.end)) {
            this.busyDates.add(date.toDate().toString());
            date.add(1, 'day');
          }
        });
      });
  }

  ngOnDestroy() {
    this.notifier.complete();
  }
}
