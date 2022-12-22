import { Component, Inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import * as moment from 'moment';
import { Absence } from '../../../shared/interfaces/absence';
import { AppState } from '../../../shared/interfaces/app-state';
import { MessageComponent } from '../message/message.component';
import * as AbsenceActions from '../../../shared/store/actions';
import { Observable, Subject, takeUntil } from 'rxjs';
import { absenceSelector } from '../../../shared/store/selectors';

export const dateValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  let start: AbstractControl | null | undefined = control.parent?.get('startControl');
  let end: AbstractControl | null | undefined = control.parent?.get('endControl');

  if (start && end && moment(start.value).isAfter(moment(end.value))) {
    return { dateError: 'start is greater than end' };
  }

  start?.setErrors(null);
  end?.setErrors(null);

  return null;
};

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent {
  private absences$: Observable<Absence[]>;
  private result: Absence;
  private busyDates: Set<string> = new Set();
  private notifier: Subject<void> = new Subject<void>();

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { absence: Absence },
    private dialogRef: MatDialogRef<EditorComponent>,
    private successDialog: MatDialog,
    private store: Store<AppState>
  ) {
    this.absences$ = this.store.pipe(select(absenceSelector));
  }

  public group: FormGroup = new FormGroup({
    typeControl: new FormControl(this.data.absence.type, [Validators.required]),
    startControl: new FormControl(moment(this.data.absence.start).toDate(), [ Validators.required, dateValidator ]),
    endControl: new FormControl(moment(this.data.absence.end).toDate(), [ Validators.required, dateValidator ]),
    commentControl: new FormControl(this.data.absence.comment),
  });

  public submit(): void {
    let isBusy = false;
    this.busyDates.forEach((date) => {
      if (moment(date).isBetween( moment(this.group.value.startControl), moment(this.group.value.endControl), 'day', '[]')) {
        isBusy = true;
        return false;
      }
      return true;
    });
    if (!isBusy) {
      if (this.group.valid) {
        this.result = {
          id: this.data.absence.id,
          start: this.group.value.startControl,
          end: this.group.value.endControl,
          type: this.group.value.typeControl,
          comment: this.group.value.commentControl,
        };

        this.store.dispatch(AbsenceActions.editAbsence({ absence: this.result }));
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
  public close(): void {
    this.dialogRef.close();
  }
  public ngOnInit(): void {
    this.absences$
      .pipe(takeUntil(this.notifier))
      .subscribe((absences: Absence[]) => {
        absences.forEach((absence: Absence) => {
          let date = moment(absence.start).clone();
          while (date.isSameOrBefore(absence.end)) {
            if (!moment(date).isBetween( this.group.value.startControl, this.group.value.endControl, 'day', '[]')) {
              this.busyDates.add(date.toDate().toString());
            }
            date.add(1, 'day');
          }
        });
      });
  }

  public ngOnDestroy(): void {
    this.notifier.complete();
  }
}
