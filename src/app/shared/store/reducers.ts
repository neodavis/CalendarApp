import { AbcenceState } from './../interfaces/abcence-state';
import { createReducer, on } from '@ngrx/store';
import * as AbcanceActions from './actions'

export const initialState: AbcenceState = {
    isLoading: false,
    abcence: [],
}

export const reducers = createReducer(initialState, 
    on(AbcanceActions.getAbcence, (state: any) => ({...state, isLoading: true})),
    on(AbcanceActions.getAbcenceSuccess, (state: any, action) => ({...state, isLoading: false, abcence: action.abcence})),
    on(AbcanceActions.getAbcenceFailure, (state: any, action) => ({...state, isLoading: false, error: action.error})),
)