import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validator, ValidatorFn, Validators } from '@angular/forms';
import { Component, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MessageComponent } from '../message/message.component';
import * as moment from 'moment';

export const dateValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  let start: any = control.parent?.get('startControl')
  let end: any = control.parent?.get('endControl')
  
  if (start && moment(start.value).isAfter(moment(end.value))) {
    return {dateError: 'start is greater than end'}
  }
  
  return null
}


@Component({
  selector: 'app-submit',
  templateUrl: './submit.component.html',
  styleUrls: ['./submit.component.scss'],
})
export class SubmitComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<SubmitComponent>,
    public successDialog: MatDialog
  ) {}

  public result = {};
  public group: FormGroup = new FormGroup({
    typeControl: new FormControl('', [Validators.required]),
    startControl: new FormControl('', [Validators.required, dateValidator]),
    endControl: new FormControl('', [Validators.required, dateValidator]),
    commentControl: new FormControl(''),
  });


  public submit() {
    if (this.group.valid) {
      this.result = { ...this.group.value };
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
