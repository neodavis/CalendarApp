import { Absence } from '../../../shared/interfaces/absence';
import { AppState } from '../../../shared/interfaces/app-state';
import { Store } from '@ngrx/store';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessageComponent } from '../message/message.component';
import * as moment from 'moment';
import * as AbsenceActions from '../../../shared/store/actions'

export const dateValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  let start: any = control.parent?.get('startControl');
  let end: any = control.parent?.get('endControl');

  if (start && moment(start.value).isAfter(moment(end.value))) {
    return { dateError: 'start is greater than end' };
  }

  return null;
};

@Component({
  selector: 'app-submit',
  templateUrl: './creation.component.html',
  styleUrls: ['./creation.component.scss'],
})
export class CreationComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CreationComponent>,
    public successDialog: MatDialog,
    public store: Store<AppState>
  ) {}

  public group: FormGroup = new FormGroup({
    typeControl: new FormControl('', [Validators.required]),
    startControl: new FormControl('', [Validators.required, dateValidator]),
    endControl: new FormControl('', [Validators.required, dateValidator]),
    commentControl: new FormControl(''),
  });

  public result: Absence;

  public submit() {
    if (this.group.valid) {
      this.result = { 
        id: Date.now(),
        start: this.group.value.startControl,
        end: this.group.value.endControl,
        type: this.group.value.typeControl,
        comment: this.group.value.commentControl
      };
      this.store.dispatch(AbsenceActions.createAbsence({absence: this.result}))
      this.dialogRef.close();
      this.successDialog.open(MessageComponent, {
        data: {
          title: 'Запит успішно надіслано',
          details: 'Чекайте на відповідь найближчим часом',
        },
      });
    }
  }

  public close() {
    this.dialogRef.close();
  }
}
