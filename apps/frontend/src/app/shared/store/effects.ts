import { BackendService } from './../service/backend.service';
import { CalendarService } from './../service/calendar.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs';
import * as AbcanceActions from './actions';

@Injectable()
export class AbcenceEffects {
  getAbsences$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AbcanceActions.getAbsences),
      mergeMap(() => {
        return this.backendService.getAbsences().pipe(
          map(
            (absence) => AbcanceActions.getAbsencesSuccess({ absence }),
          )
        );
      })
    )
  );

  constructor(private actions$: Actions, private backendService: BackendService) {}
}