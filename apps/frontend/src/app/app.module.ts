import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
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
import { RegisterComponent } from './components/register/register.component';
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { AuthGuard } from "./shared/guard/auth.guard";

registerLocaleData(localeUk, 'uk');


const routes: Routes = [
  { path: '', component: CalendarComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

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
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot(),
    MatDialogModule,
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
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true },
    { provide: AuthGuard }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
