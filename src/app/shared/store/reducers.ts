import { Abcence } from './../interfaces/abcence';
import { AbcencesState } from '../interfaces/abcences-state';
import { createReducer, on } from '@ngrx/store';
import * as AbcanceActions from './actions'
import * as moment from 'moment';

export const initialState: AbcencesState = {
    abcences: [
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
    on(AbcanceActions.getAbcence, (state: AbcencesState) => { return {...state}; }),
    on(AbcanceActions.createAbcence, (state: AbcencesState, action) => {
        return {...state, abcences: [...state.abcences, action.abcence]};
    }),
    on(AbcanceActions.deleteAbcence, (state: AbcencesState, action) => {
        return {...state, abcences: [...state.abcences.filter((abcence: Abcence) => abcence.id != action.abcence.id)]};
    })
)