import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/material.module';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { CalendarComponent } from './components/calendar/calendar.component';
import { SubmitComponent } from './components/dialogs/submit/submit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import localeUk from '@angular/common/locales/uk';
import { registerLocaleData } from '@angular/common';
import { MessageComponent } from './components/dialogs/message/message.component';
import { HeaderComponent } from './components/header/header.component';
import { DateFormatPipe } from './pipe/dateFormat.pipe';

registerLocaleData(localeUk, 'uk');

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    SubmitComponent,
    MessageComponent,
    HeaderComponent,
    DateFormatPipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'uk' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
