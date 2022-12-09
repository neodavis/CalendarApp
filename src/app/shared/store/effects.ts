import { CalendarService } from './../service/calendar.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs';
import * as AbcanceActions from './actions';

@Injectable()
export class AbcenceEffects {
  getAbcences$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AbcanceActions.getAbcence),
      mergeMap(() => {
        return this.calendarService.getDateStream().pipe(
          map(
            (abcence) => AbcanceActions.getAbcenceSuccess({ abcence }),
          )
        );
      })
    )
  );

  constructor(private actions$: Actions, private calendarService: CalendarService) {}
}
