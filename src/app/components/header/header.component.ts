import { MatDialog } from '@angular/material/dialog';
import { Component } from '@angular/core';
import { SubmitComponent } from '../dialogs/submit/submit.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(private dialog: MatDialog) {}

  openDialog() {
    this.dialog.open(SubmitComponent, {
      width: '500px',
    });
  }
}
