import { props } from '@ngrx/store';
import { Absence } from './../interfaces/absence';
import { AbsencesState } from '../interfaces/absences-state';
import { createReducer, on } from '@ngrx/store';
import * as AbcanceActions from './actions'
import * as moment from 'moment';

export const initialState: AbsencesState = {
    absences: [
        {
          id: 1,
          start: moment("Sat Dec 03 2022 00:00:00 GMT+0200 (Восточная Европа, стандартное время)"),
          end: moment("Sat Dec 10 2022 00:00:00 GMT+0200 (Восточная Европа, стандартное ремя)"),
          type: "Відпустка",
          comment: "Lorem Ipsum1",
        },
        {
          id: 1671203037078,
          start: moment("Wed Dec 14 2022 00:00:00 GMT+0200 (Восточная Европа, стандартное время)"),
          end: moment("Wed Dec 21 2022 00:00:00 GMT+0200 (Восточная Европа, стандартное время)"),
          type: "Лікарняний",
          comment: "123123",
        }],
};

export const reducers = createReducer(initialState, 
    on(AbcanceActions.getAbsences, (state: AbsencesState) => { return {...state}; }),
    on(AbcanceActions.createAbsence, (state: AbsencesState, action) => {
        return {...state, absences: [...state.absences, action.absence]};
    }),
    on(AbcanceActions.editAbsence, (state: AbsencesState, action: {absence: Absence}) => {
        return {...state, absences: [...state.absences.map((absence: Absence) => {
          return (absence.id === action.absence.id) ? action.absence : absence;
        })]}
    }),
    on(AbcanceActions.deleteAbsence, (state: AbsencesState, action: {id: number}) => {
        return {...state, absences: [...state.absences.filter((absence: Absence) => absence.id !== action.id)]};
    })
)