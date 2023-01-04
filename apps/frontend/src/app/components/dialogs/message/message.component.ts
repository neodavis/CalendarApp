import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { title: string, details: string; },
    private dialogRef: MatDialogRef<MessageComponent>
  ) { }

  public close(): void {
    this.dialogRef.close();
  }
}
