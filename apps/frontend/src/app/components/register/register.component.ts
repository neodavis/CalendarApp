import { Router } from '@angular/router';
import { UserBackendService } from '../../shared/service/user-backend.service';
import { Component } from '@angular/core';
import { take } from 'rxjs';
import { User } from '../../shared/interfaces/user';
import { HttpErrorResponse } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  public error: string | null = null;
  public loading: boolean = false;

  constructor(
    private userService: UserBackendService,
    private router: Router
  ) { }

  public group: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  public submit(): void {
    if (this.group.valid) {
      this.loading = true;
      this.userService
        .userRegister(
          this.group.value.username,
          this.group.value.password,
        )
        .pipe(take(1))
        .subscribe({
          next: (response: { token: string; }) => {
            if (response) {
              this.error = null;
              this.loading = false;
              sessionStorage.setItem('token', response.token);
              this.router.navigate(['/calendar']);
            }
          },
          error: (error: HttpErrorResponse) => {
            this.loading = false;
            this.error = error.error.message;
          },
        });
    }
  }
}
