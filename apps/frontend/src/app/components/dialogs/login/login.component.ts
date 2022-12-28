import { AppState } from './../../../shared/interfaces/app-state';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as UserActions from '../../../shared/store/users/actions'
import { errorSelector } from '../../../shared/store/users/selectors';
import { Observable, Subject, take } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public error$: Observable<string | null>; 

  constructor(
    private dialogRef: MatDialogRef<LoginComponent>,
    private store: Store<AppState>
  ) {
    this.error$ = this.store.select(errorSelector);
  }

  public group: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })

  public submit(): void {
      this.store.dispatch(UserActions.userLogin({
        user: {
          username: this.group.value.username,
          password: this.group.value.password 
        }
      }));
  }

  public close(): void {
    this.dialogRef.close();
  }
}
