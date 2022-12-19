import { createAction, props } from '@ngrx/store';
import { Absence } from 'libs/api-interfaces/absence';

export const getAbsences = createAction('[Absence] Get Absences');
export const getAbsencesSuccess = createAction(
  '[Absence] Get Absences Success',
  props<{absence: Absence[]}>()
  );
export const createAbsence = createAction(
  '[Absence] Create Absence',
  props<{ absence: Absence }>()
);
export const editAbsence = createAction(
  '[Absence] Edit Absence',
  props<{ absence: Absence }>()
);
export const deleteAbsence = createAction(
  '[Absence] Remove Absence',
  props<{ id: number }>()
);
