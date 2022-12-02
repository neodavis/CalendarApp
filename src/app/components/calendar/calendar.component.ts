import { SubmitComponent } from '../dialogs/submit/submit.component';
import { Component, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup, MinLengthValidator, Validators } from '@angular/forms';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],

})

export class CalendarComponent {
  constructor(public dialog: MatDialog) {}
  data = new FormGroup({
    start: new FormControl<Date | null>(null, [ Validators.required ]),
    end: new FormControl<Date | null>(null, [ Validators.required ]),
  });

  openDialog() {
    if (this.data.value.start && this.data.value.end) { // Валидируем выбор пользователя
      this.dialog.open(SubmitComponent, {
        width: '500px',
        data: {
          start: this.data.value.start,
          end: this.data.value.end
        }
      })
      this.data.reset(); // Очищаем форму
    }
  }
}
