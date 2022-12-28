import { HttpException } from '@nestjs/common';
import { AbsenceBackendService } from './../../service/absence-backend.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, switchMap, mergeMap, of } from 'rxjs';
import * as AbsenceActions from './actions';
import { Absence } from '../../interfaces/absence';

@Injectable()
export class AbsenceEffects {
  getAbsences$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AbsenceActions.getAbsences),
      mergeMap((action: { user_id: number }) => {
        return this.backendService.getAbsences(action.user_id).pipe(
          switchMap( async (absences: Absence[]) => AbsenceActions.getAbsencesSuccess({ absences })) );
      }),
      catchError(async (exception) => AbsenceActions.absenceQueryFailure({message: exception.error.message}))
    )
  );

  deleteAbsence$ = createEffect(() =>
  this.actions$.pipe(
    ofType(AbsenceActions.deleteAbsence),
    mergeMap((action: { absence_id: number, user_id: number }) => {
      return this.backendService.deleteAbsence(action.absence_id).pipe(
        switchMap( async () => AbsenceActions.getAbsences({ user_id: action.user_id }) )
      );
    }),
    catchError(async (exception) => AbsenceActions.absenceQueryFailure({message: exception.error.message}))
  ));

  createAbsence$ = createEffect(() => 
  this.actions$.pipe(
    ofType(AbsenceActions.createAbsence),
    mergeMap((action: { absence: Absence }) => {
      return this.backendService.createAbsence(action.absence).pipe(
        switchMap( async () => AbsenceActions.getAbsences({user_id: action.absence.user_id}) )
      );
    }),
    catchError(async (exception) => AbsenceActions.absenceQueryFailure({message: exception.error.message}))
  ));

  editAbsence$ = createEffect(() => 
  this.actions$.pipe(
    ofType(AbsenceActions.editAbsence),
    mergeMap((action: { absence: Absence }) => {
      return this.backendService.editAbsence(action.absence).pipe(
        switchMap( async () => AbsenceActions.getAbsences({ user_id: 12312 }) )
      );
    }),
    catchError(async (exception) => AbsenceActions.absenceQueryFailure({message: exception.error.message}))
  ));
  constructor(private actions$: Actions, private backendService: AbsenceBackendService) {}
}