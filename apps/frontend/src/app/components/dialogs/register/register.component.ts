import { UserBackendService } from './../../../shared/service/user-backend.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { take } from 'rxjs';
import { User } from '../../../shared/interfaces/user';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  public error: string | null = null;
  public loading: boolean = false;
  constructor(
    private dialogRef: MatDialogRef<RegisterComponent>,
    private userService: UserBackendService
  ) { }

  public group: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  public submit(): void {
    this.loading = true;
    this.userService
      .userRegister(
        this.group.value.username,
        this.group.value.password,
      )
      .pipe(take(1))
      .subscribe({
        next: (response: User) => {
          if (response) {
            this.loading = false;
            this.close();
          }
        },
        error: (error: HttpErrorResponse) => {
          this.loading = false;
          this.error = error.error.message;
        },
      });
  }

  public close(): void {
    this.dialogRef.close();
  }
}
