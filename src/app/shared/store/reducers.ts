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
          start: moment(new Date("Sat Dec 03 2022 00:00:00 GMT+0200 (Восточная Европа, стандартное время)")),
          end: moment(new Date("Sat Dec 04 2022 00:00:00 GMT+0200 (Восточная Европа, стандартное ремя)")),
          type: "Відпустка",
          comment: "Lorem Ipsum1",
        },
        {
          id: 2,
          start: moment(new Date("Sun Dec 03 2022 00:00:00 GMT+0200 (Восточная Европа, стандартное время)")),
          end: moment(new Date("Sun Dec 04 2022 00:00:00 GMT+0200 (Восточная Европа, стандартное время)")),
          type: "Лікарняний",
          comment: "Lorem Ipsum2",
        },
        {
          id: 3,
          start: moment(new Date("Mon Dec 27 2022 00:00:00 GMT+0200 (Восточная Европа, стандартное время)")),
          end: moment(new Date("Sun Dec 28 2022 00:00:00 GMT+0200 (Восточная Европа, стандартное время)")),
          type: "Лікарняний",
          comment: "Lorem Ipsum2",
        },
        {
          id: 4,
          start: moment(new Date("Mon Dec 27 2022 00:00:00 GMT+0200 (Восточная Европа, стандартное время)")),
          end: moment(new Date("Sun Dec 28 2022 00:00:00 GMT+0200 (Восточная Европа, стандартное время)")),
          type: "Лікарняний",
          comment: "Lorem Ipsum2",
        },
        {
          id: 5,
          start: moment(new Date("Mon Dec 27 2022 00:00:00 GMT+0200 (Восточная Европа, стандартное время)")),
          end: moment(new Date("Sun Dec 28 2022 00:00:00 GMT+0200 (Восточная Европа, стандартное время)")),
          type: "Лікарняний",
          comment: "Lorem Ipsum2",
        },
        {
          id: 6,
          start: moment(new Date("Tue Dec 06 2022 00:00:00 GMT+0200 (Восточная Европа, стандартное время)")),
          end: moment(new Date("Tue Dec 07 2022 00:00:00 GMT+0200 (Восточная Европа, стандартное время)")),
          type: "Відпустка",
          comment: "Lorem Ipsum3",
        },
        {
          id: 7,
          start: moment(new Date("Fri Dec 09 2022 00:00:00 GMT+0200 (Восточная Европа, стандартное время)")),
          end: moment(new Date("Fri Dec 09 2022 00:00:00 GMT+0200 (Восточная Европа, стандартное время)")),
          type: "Лікарняний",
          comment: "Lorem Ipsum4",
        }
      ],
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