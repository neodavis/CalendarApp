import { Component, Inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import { Absence } from 'src/app/shared/interfaces/absence';
import { AppState } from 'src/app/shared/interfaces/app-state';
import { MessageComponent } from '../message/message.component';
import * as AbsenceActions from '../../../shared/store/actions'

export const dateValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  let start: AbstractControl<any> | null | undefined = control.parent?.get('startControl');
  let end: any = control.parent?.get('endControl');

  if (start && moment(start.value).isAfter(moment(end.value))) {
    return { dateError: 'start is greater than end' };
  }

  start?.setErrors(null)
  end?.setErrors(null)
  return null;
};

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})

export class EditorComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditorComponent>,
    public successDialog: MatDialog,
    public store: Store<AppState>
  ) {}

  public group: FormGroup = new FormGroup({
    typeControl: new FormControl(this.data.absence.type, [Validators.required]),
    startControl: new FormControl(moment(this.data.absence.start).toDate(), [Validators.required, dateValidator]),
    endControl: new FormControl(moment(this.data.absence.end).toDate(), [Validators.required, dateValidator]),
    commentControl: new FormControl(this.data.absence.comment),
  });
  public result: Absence;

  public submit() {
    if (this.group.valid) {
      this.result = { 
        id: this.data.absence.id,
        start: this.group.value.startControl,
        end: this.group.value.endControl,
        type: this.group.value.typeControl,
        comment: this.group.value.commentControl
      };
      this.store.dispatch(AbsenceActions.editAbsence({absence: this.result}))
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
