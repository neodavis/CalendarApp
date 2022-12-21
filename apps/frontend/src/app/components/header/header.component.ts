import { MatDialog } from '@angular/material/dialog';
import { Component } from '@angular/core';
import { CreationComponent } from '../dialogs/creation/creation.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(private dialog: MatDialog) {}

  public openCreationDialog(): void {
    this.dialog.open(CreationComponent, {
      width: '500px',
    });
  }
}
