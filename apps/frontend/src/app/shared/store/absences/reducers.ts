import { AbsencesState } from '../../interfaces/absences-state';
import { createReducer, on } from '@ngrx/store';
import * as AbsenceActions from './actions';
import { Absence } from '../../interfaces/absence';

export const initialState: AbsencesState = {
  absences: [],
  isLoading: false,
  error: null
};

export const AbsenceReducers = createReducer(
  initialState,

  on(AbsenceActions.getAbsences, (state: AbsencesState): AbsencesState => {
    return { ...state, isLoading: true, error: null };
  }),

  on(AbsenceActions.getAbsencesSuccess, (state: AbsencesState, action: { absences: Absence[]; }): AbsencesState => {
    return { ...state, absences: action.absences, isLoading: false, error: null };
  }),

  on(AbsenceActions.createAbsence, (state: AbsencesState): AbsencesState => {
    return { ...state, isLoading: true, error: null };
  }),

  on(
    AbsenceActions.editAbsence, (state: AbsencesState): AbsencesState => {
      return { ...state, isLoading: true, error: null };
    }
  ),
  on(
    AbsenceActions.deleteAbsence, (state: AbsencesState): AbsencesState => {
      return { ...state, isLoading: true, error: null };
    }
  ),
  on(
    AbsenceActions.absenceQueryFailure, (state: AbsencesState, action: { message: string; }): AbsencesState => {
      return { ...state, isLoading: false, error: action.message };
    }
  )

);
