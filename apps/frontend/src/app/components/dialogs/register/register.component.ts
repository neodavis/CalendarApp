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
  constructor(
    private dialogRef: MatDialogRef<RegisterComponent>,
    private userService: UserBackendService
  ) {}

  public group: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  public submit(): void {
    this.userService
      .userRegister({
        user_id: -1,
        username: this.group.value.username,
        password: this.group.value.password,
      })
      .pipe(take(1))
      .subscribe({
        next: (response: User) => {
          if (response) {
            this.close();
          }
        },
        error: (error: HttpErrorResponse) => {
          this.error = error.error.message;
        },
      });
  }

  public close(): void {
    this.dialogRef.close();
  }
}
