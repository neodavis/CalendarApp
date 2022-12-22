import { Absence } from '../interfaces/absence';
import { AbsencesState } from '../interfaces/absences-state';
import { createReducer, on } from '@ngrx/store';
import * as AbsenceActions from './actions';

export const initialState: AbsencesState = {
  absences: [],
  isLoading: false,
  error: null
};

export const reducers = createReducer(
  initialState,

  on(AbsenceActions.getAbsences, (state: AbsencesState): AbsencesState => {
    return { ...state, isLoading: true, error: null };
  }),

  on(AbsenceActions.getAbsencesSuccess, (state: AbsencesState, action: { absences: Absence[] }): AbsencesState => {
    return {...state, absences: action.absences, isLoading: false, error: null}
  }),

  on(AbsenceActions.createAbsence, (state: AbsencesState): AbsencesState => {
    return { ...state, isLoading: true, error: null };
  }),

  on(
    AbsenceActions.editAbsence, (state: AbsencesState): AbsencesState => {
      return {...state, isLoading: true, error: null};
    }
  ),
  on(
    AbsenceActions.deleteAbsence, (state: AbsencesState): AbsencesState => { 
      return { ...state, isLoading: true, error: null} 
    }
  ),
  on(
    AbsenceActions.absenceErrorHandler, (state: AbsencesState, action: { message: string }): AbsencesState => {
      return { ...state, error: action.message, isLoading: false} 
    }
  )

);
