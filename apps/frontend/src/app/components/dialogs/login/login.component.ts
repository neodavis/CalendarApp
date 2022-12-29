import { AppState } from './../../../shared/interfaces/app-state';
import * as AbsenceActions from './../../../shared/store/absences/actions';
import { UserBackendService } from './../../../shared/service/user-backend.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Component } from '@angular/core';
import { take } from 'rxjs';
import { Store } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public loading: boolean = false;
  public error: string | null = null
  constructor(
    private dialogRef: MatDialogRef<LoginComponent>,
    private userService: UserBackendService,
    private store: Store<AppState>
  ) {}

  public group: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })

  public submit(): void {
    this.loading = true;
    this.userService.userLogin(this.group.value.username, this.group.value.password).pipe(take(1)).subscribe({
      next: (response: { token: string} ) => {
        if (response.token) {
            this.error = null;
            this.loading = false
            sessionStorage.setItem('token', response.token)
            this.store.dispatch(AbsenceActions.getAbsences())
            this.close()
      }},
      error: (error: HttpErrorResponse) => {
        this.loading = false
        this.error = error.error.message
      }})
    } 

  public close(): void {
    this.dialogRef.close();
  }
}
