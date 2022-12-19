import { Absence } from 'libs/api-interfaces/absence';
import { AbsencesState } from '../interfaces/absences-state';
import { createReducer, on } from '@ngrx/store';
import * as AbcanceActions from './actions';
import * as moment from 'moment';

export const initialState: AbsencesState = {
  absences: [],
  isLoading: false
};

export const reducers = createReducer(
  initialState,
  on(AbcanceActions.getAbsences, (state: AbsencesState) => {
    return { ...state, isLoading: true };
  }),
  on(AbcanceActions.getAbsencesSuccess, (state: AbsencesState, action: any) => {
    return {...state, absences: action.absence, isLoading: false}
  }),
  on(AbcanceActions.createAbsence, (state: AbsencesState, action) => {
    return { ...state, absences: [...state.absences, action.absence] };
  }),
  on(
    AbcanceActions.editAbsence,
    (state: AbsencesState, action: { absence: Absence }) => {
      return {
        ...state,
        absences: [
          ...state.absences.map((absence: Absence) => {
            return absence.id === action.absence.id ? action.absence : absence;
          }),
        ],
      };
    }
  ),
  on(
    AbcanceActions.deleteAbsence,
    (state: AbsencesState, action: { id: number }) => {
      return {
        ...state,
        absences: [
          ...state.absences.filter(
            (absence: Absence) => absence.id !== action.id
          ),
        ],
      };
    }
  )
);
