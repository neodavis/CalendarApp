import { MatDialog } from '@angular/material/dialog';
import { Component } from '@angular/core';
import { CreationComponent } from '../dialogs/submit/creation.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(private dialog: MatDialog) {}

  openEditorDialog() {
    
  }

  openCreationDialog() {
    this.dialog.open(CreationComponent, {
      width: '500px',
    });
  }
}
