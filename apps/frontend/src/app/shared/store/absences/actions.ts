import { createAction, props } from '@ngrx/store';
import { Absence } from '../../interfaces/absence';

export const getAbsences = createAction(
  '[Absence] Get Absences',
);

export const getAbsencesSuccess = createAction(
  '[Absence] Get Absences Success',
  props<{ absences: Absence[]} >()
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
  '[Absence] Delete Absence',
  props<{ absence_id: number }>()
);

export const absenceQueryFailure = createAction(
  '[Absence] Absence Query Error',
  props<{ message: string }>()
);

