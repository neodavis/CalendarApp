import { HttpInterceptorService } from './shared/service/http-interceptor.service';
import { AbsenceEffects } from './shared/store/absences/effects';
import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../material.module';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { CreationComponent } from './components/dialogs/creation/creation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import { MessageComponent } from './components/dialogs/message/message.component';
import { HeaderComponent } from './components/header/header.component';
import { DateFormatPipe } from './shared/pipe/date-format';
import { CalendarComponent } from './components/calendar/calendar.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { AbsenceReducers } from './shared/store/absences/reducers';
import { EditorComponent } from './components/dialogs/editor/editor.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import localeUk from '@angular/common/locales/uk';
import { LoginComponent } from './components/dialogs/login/login.component';
import { RegisterComponent } from './components/dialogs/register/register.component';

registerLocaleData(localeUk, 'uk');

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    CreationComponent,
    MessageComponent,
    HeaderComponent,
    DateFormatPipe,
    EditorComponent,
    LoginComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot(),
    StoreModule.forFeature('absences', AbsenceReducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
    }),
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot(),
    EffectsModule.forFeature([AbsenceEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'uk' },
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
