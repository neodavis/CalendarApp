import { createAction, props } from '@ngrx/store';
import { Absence } from '../interfaces/absence';

export const getAbsences = createAction('[Absence] Get Absences');
export const getAbsencesSuccess = createAction(
  '[Absence] Get Absences Success',
  props<{ absences: Absence[]} >()
);

export const createAbsence = createAction(
  '[Absence] Create Absence',
  props<{ absence: Absence }>()
);
export const createAbsenceSuccess = createAction(
  '[Absence] Create Absence Success',
  props<{ absences: Absence[]} >()
);

export const editAbsence = createAction(
  '[Absence] Edit Absence',
  props<{ absence: Absence }>()
);
export const editAbsenceSuccess = createAction(
  '[Absence] Edit Absence Success',
  props<{ absences: Absence[] }>()
);

export const deleteAbsence = createAction(
  '[Absence] Delete Absence',
  props<{ id: number }>()
);
export const deleteAbsenceSuccess = createAction(
  '[Absence] Delete Absence Success',
  props<{ absences: Absence[]}>()
);
