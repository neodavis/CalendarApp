import { Absence } from '../interfaces/absence';
import { AbsencesState } from '../interfaces/absences-state';
import { createReducer, on } from '@ngrx/store';
import * as AbsenceActions from './actions';

export const initialState: AbsencesState = {
  absences: [],
  isLoading: false
};

export const reducers = createReducer(
  initialState,
  on(AbsenceActions.getAbsences, (state: AbsencesState) => {
    return { ...state, isLoading: true };
  }),
  on(AbsenceActions.getAbsencesSuccess, (state: AbsencesState, action: { absences: Absence[] }) => {
    return {...state, absences: action.absences, isLoading: false}
  }),


  on(AbsenceActions.createAbsence, (state: AbsencesState) => {
    return { ...state, isLoading: true };
  }),
  on(AbsenceActions.createAbsenceSuccess, (state: AbsencesState, action: { absences: Absence[] }) => {
    return {...state, absences: [...action.absences], isLoading: false};
  }),

  on(
    AbsenceActions.editAbsence, (state: AbsencesState) => {
      return {...state, isLoading: true};
    }
  ),
  on(
    AbsenceActions.editAbsenceSuccess, (state: AbsencesState, action: { absences: Absence[] }) => {
      return {...state, absences: [...action.absences], isLoading: false};
    }
  ),

  on(
    AbsenceActions.deleteAbsence, (state: AbsencesState) => { 
      return { ...state, isLoading: true} 
    }
  ),
  on(
    AbsenceActions.deleteAbsenceSuccess, (state: AbsencesState, action: { absences: Absence[]}) => {
      return { ...state, absences: [...action.absences], isLoading: false}
    }
  )
);
