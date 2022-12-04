import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MessageComponent } from '../message/message.component';
import * as moment from 'moment';

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
  public group = new FormGroup({
    typeControl: new FormControl('', [Validators.required]),
    startControl: new FormControl('', [Validators.required]),
    endControl: new FormControl('', [Validators.required]),
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
