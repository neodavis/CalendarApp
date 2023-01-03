import { RegisterComponent } from './../dialogs/register/register.component';
import { LoginComponent } from './../dialogs/login/login.component';
import { MatDialog } from '@angular/material/dialog';
import { Component } from '@angular/core';
import { CreationComponent } from '../dialogs/creation/creation.component';
import { AppState } from '../../shared/interfaces/app-state';
import { Store } from '@ngrx/store';
import * as AbsenceActions from '../../shared/store/absences/actions';
import { Observable, takeUntil, Subject } from 'rxjs';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(
    private dialog: MatDialog,
    private store: Store<AppState>
  ) { }

  public sessionStorage = sessionStorage;
  public openCreationDialog(): void {
    this.dialog.open(CreationComponent, {
      width: '500px',
    });
  }

  public openLoginDialog(): void {
    this.dialog.open(LoginComponent, {
      width: '500px'
    });
  }

  public openRegistrationDialog(): void {
    this.dialog.open(RegisterComponent, {
      width: '500px'
    });
  }

  public logout(): void {
    sessionStorage.removeItem('token');
    this.store.dispatch(AbsenceActions.getAbsencesSuccess({ absences: [] }));
  }
}
