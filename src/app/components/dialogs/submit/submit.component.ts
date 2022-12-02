import { FormControl, Validators } from '@angular/forms';
import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessageComponent } from '../message/message.component';

@Component({
  selector: 'app-submit',
  templateUrl: './submit.component.html',
  styleUrls: ['./submit.component.scss']
})

export class SubmitComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<SubmitComponent>,
    public successDialog: MatDialog
  ) {}

  type = new FormControl("", [ Validators.required ])
  comment = new FormControl("")
  result = {};

  submit() {
    if (this.type.value) {
      this.result = {
        ...this.data,
        type: this.type.value,
        comment: this.comment.value
      }
      
      this.dialogRef.close()
      this.successDialog.open(MessageComponent, {
        data: {
          title: 'Запит успішно надіслано',
          details: 'Чекайте на відповідь найближчим часом'
        }
      })

      console.table(this.result) // Потом этот обьект будет лежать в масиве, в сторедже ngrx
    }
  }
}
