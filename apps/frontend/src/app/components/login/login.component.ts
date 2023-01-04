import { AppState } from './../../shared/interfaces/app-state';
import * as AbsenceActions from './../../shared/store/absences/actions';
import { UserBackendService } from './../../shared/service/user-backend.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { take } from 'rxjs';
import { Store } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public loading: boolean = false;
  public error: string | null = null;
  constructor(
    private userService: UserBackendService,
    private store: Store<AppState>,
    private router: Router
  ) { }

  public group: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(5)]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)])
  });

  public submit(): void {
    if (this.group.valid) {
      this.loading = true;
      this.userService.userLogin(
        this.group.value.username,
        this.group.value.password,
      ).pipe(take(1)).subscribe({
        next: (response: { token: string; }) => {
          if (response.token) {
            sessionStorage.setItem('token', response.token);
            this.error = null;
            this.loading = false;
            this.router.navigate(['/calendar']);
          }
        },
        error: (error: HttpErrorResponse) => {
          this.loading = false;
          this.error = error.error.message;
        }
      });
    }
  }
}
