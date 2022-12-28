import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from '../../../shared/interfaces/app-state';
import * as UserActions from '../../../shared/store/users/actions'


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  constructor(
    private dialogRef: MatDialogRef<RegisterComponent>,
    private store: Store<AppState>
  ) {}

  public group: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })

  public submit(): void {
    this.store.dispatch(UserActions.userRegister({
      user: {
        user_id: Math.round((Math.random()*100000)),
        username: this.group.value.username,
        password: this.group.value.password 
      }
    }))
  }

  public close(): void {
    this.dialogRef.close()
  }
}
