import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/material.module';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { CreationComponent } from './components/dialogs/submit/creation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import localeUk from '@angular/common/locales/uk';
import { registerLocaleData } from '@angular/common';
import { MessageComponent } from './components/dialogs/message/message.component';
import { HeaderComponent } from './components/header/header.component';
import { DateFormatPipe } from './shared/pipe/date-format';
import { CalendarComponent } from './components/calendar/calendar.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { reducers } from './shared/store/reducers';

registerLocaleData(localeUk, 'uk');

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    CreationComponent,
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
    StoreModule.forRoot(),
    StoreModule.forFeature('abcences', reducers),
    // Instrumentation must be imported after importing StoreModule (config is optional)
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: !isDevMode(), // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
    }),
    StoreModule.forRoot({}, {}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'uk' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
