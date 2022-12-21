import { BackendService } from './../service/backend.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs';
import * as AbcanceActions from './actions';
import { Absence } from '../interfaces/absence';

@Injectable()
export class AbcenceEffects {
  getAbsences$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AbcanceActions.getAbsences),
      mergeMap(() => {
        return this.backendService.getAbsences().pipe(
          map(
            (absences) => AbcanceActions.getAbsencesSuccess({ absences }),
          )
        );
      })
    )
  );

  deleteAbsence$ = createEffect(() =>
  this.actions$.pipe(
    ofType(AbcanceActions.deleteAbsence),
    mergeMap((action: { id: number }) => {
      return this.backendService.deleteAbsence(action.id).pipe(
        map(
          (absences) => AbcanceActions.deleteAbsenceSuccess({ absences }),
        )
      );
    })
  ));

  createAbsence$ = createEffect(() => 
  this.actions$.pipe(
    ofType(AbcanceActions.createAbsence),
    mergeMap((action: { absence: Absence }) => {
      return this.backendService.createAbsence(action.absence).pipe(
        map(
          (absences) => AbcanceActions.createAbsenceSuccess({ absences }),
        )
      );
    })
  ));

  editAbsence$ = createEffect(() => 
  this.actions$.pipe(
    ofType(AbcanceActions.editAbsence),
    mergeMap((action: { absence: Absence }) => {
      return this.backendService.editAbsence(action.absence).pipe(
        map(
          (absences) => AbcanceActions.editAbsenceSuccess({ absences }),
        )
      );
    })
  ));
  constructor(private actions$: Actions, private backendService: BackendService) {}
}