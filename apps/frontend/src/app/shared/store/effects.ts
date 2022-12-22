import { BackendService } from './../service/backend.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import * as AbsenceActions from './actions';
import { Absence } from '../interfaces/absence';

@Injectable()
export class AbcenceEffects {
  getAbsences$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AbsenceActions.getAbsences),
      mergeMap(() => {
        return this.backendService.getAbsences().pipe(
          map(
            (absences) => AbsenceActions.getAbsencesSuccess({ absences }))
        );
      }),
      catchError(async (error) => AbsenceActions.absenceErrorHandler(error))
    )
  );

  deleteAbsence$ = createEffect(() =>
  this.actions$.pipe(
    ofType(AbsenceActions.deleteAbsence),
    mergeMap((action: { id: number }) => {
      return this.backendService.deleteAbsence(action.id).pipe(
        map( () => AbsenceActions.getAbsences() )
      );
    }),
    catchError(async (error) => AbsenceActions.absenceErrorHandler(error))
  ));

  createAbsence$ = createEffect(() => 
  this.actions$.pipe(
    ofType(AbsenceActions.createAbsence),
    mergeMap((action: { absence: Absence }) => {
      return this.backendService.createAbsence(action.absence).pipe(
        map( () => AbsenceActions.getAbsences() )
      );
    }),
    catchError(async (error) => AbsenceActions.absenceErrorHandler(error))
  ));

  editAbsence$ = createEffect(() => 
  this.actions$.pipe(
    ofType(AbsenceActions.editAbsence),
    mergeMap((action: { absence: Absence }) => {
      return this.backendService.editAbsence(action.absence).pipe(
        map( () => AbsenceActions.getAbsences() )
      );
    }),
    catchError(async (error) => AbsenceActions.absenceErrorHandler(error))
  ));
  constructor(private actions$: Actions, private backendService: BackendService) {}
}