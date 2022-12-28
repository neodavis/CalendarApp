import { RegisterComponent } from './../dialogs/register/register.component';
import { LoginComponent } from './../dialogs/login/login.component';
import { MatDialog } from '@angular/material/dialog';
import { Component } from '@angular/core';
import { CreationComponent } from '../dialogs/creation/creation.component';
import { Observable, Subject, takeUntil } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { userSelector } from '../../shared/store/users/selectors';
import { User } from '../../shared/interfaces/user';
import { AppState } from '../../shared/interfaces/app-state';
import * as UserActions from '../../shared/store/users/actions'
import * as AbsenceActions from '../../shared/store/absences/actions'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  private user$: Observable<User | null>;
  private notifier: Subject<void> = new Subject<void>();
  public user: User | null = null;
  
  constructor(
    private dialog: MatDialog,
    private store: Store<AppState>
  ) {
    this.user$ = this.store.pipe(select(userSelector))
  }

  public openCreationDialog(): void {
    this.dialog.open(CreationComponent, {
      width: '500px',
    });
  }

  public openLoginDialog(): void {
    this.dialog.open(LoginComponent, {
      width: '500px'
    })
  }

  public openRegistrationDialog(): void {
    this.dialog.open(RegisterComponent, {
      width: '500px'
    })
  }

  public openLogoutDialog(): void {
      localStorage.removeItem('token')
      this.store.dispatch(UserActions.userLogout())
      this.store.dispatch(AbsenceActions.getAbsences({user_id: 0}))
  }

  public ngOnInit(): void {
    this.user$.pipe(takeUntil(this.notifier)).subscribe((user: User | null) => {
      this.user = user;
      if (user?.user_id) {
        this.store.dispatch(AbsenceActions.getAbsences({user_id: user?.user_id}))
      }
    }) 
  }

  public ngOnDestroy(): void {
    this.notifier.complete()
  }
}
