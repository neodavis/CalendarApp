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
      mergeMap(() => {
        return this.backendService.getAbsences().pipe(
          switchMap(async (absences: Absence[]) => AbsenceActions.getAbsencesSuccess({ absences })));
      }),
      catchError(async (exception) => AbsenceActions.absenceQueryFailure({ message: exception.error.message }))
    )
  );

  deleteAbsence$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AbsenceActions.deleteAbsence),
      mergeMap((action: { id: number; }) => {
        return this.backendService.deleteAbsence(action.id).pipe(
          switchMap(async () => AbsenceActions.getAbsences())
        );
      }),
      catchError(async (exception) => AbsenceActions.absenceQueryFailure({ message: exception.error.message }))
    ));

  createAbsence$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AbsenceActions.createAbsence),
      mergeMap((action: { absence: Absence; }) => {
        return this.backendService.createAbsence(action.absence).pipe(
          switchMap(async () => AbsenceActions.getAbsences())
        );
      }),
      catchError(async (exception) => AbsenceActions.absenceQueryFailure({ message: exception.error.message }))
    ));

  editAbsence$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AbsenceActions.editAbsence),
      mergeMap((action: { absence: Absence; }) => {
        return this.backendService.editAbsence(action.absence).pipe(
          switchMap(async () => AbsenceActions.getAbsences())
        );
      }),
      catchError(async (exception) => AbsenceActions.absenceQueryFailure({ message: exception.error.message }))
    ));
  constructor(private actions$: Actions, private backendService: AbsenceBackendService) { }
}