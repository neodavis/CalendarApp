import { Component, Inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import { Abcence } from 'src/app/shared/interfaces/abcence';
import { AppState } from 'src/app/shared/interfaces/app-state';
import { MessageComponent } from '../message/message.component';
import * as AbcenceActions from '../../../shared/store/actions'

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
    typeControl: new FormControl(this.data.abcence.type, [Validators.required]),
    startControl: new FormControl(moment(this.data.abcence.start).toDate(), [Validators.required, dateValidator]),
    endControl: new FormControl(moment(this.data.abcence.end).toDate(), [Validators.required, dateValidator]),
    commentControl: new FormControl(this.data.abcence.comment),
  });
  public result: Abcence;

  public submit() {
    if (this.group.valid) {
      this.result = { 
        id: this.data.abcence.id,
        start: this.group.value.startControl,
        end: this.group.value.endControl,
        type: this.group.value.typeControl,
        comment: this.group.value.commentControl
      };
      this.store.dispatch(AbcenceActions.editAbcence({abcence: this.result}))
      this.dialogRef.close();
      this.successDialog.open(MessageComponent, {
        data: {
          title: 'Запит успішно надіслано',
          details: 'Чекайте на відповідь найближчим часом',
        },
      });
    }
  }
  ngOnInit() {
    console.log(this.data)
  }
  public close() {
    this.dialogRef.close();
  }
}
