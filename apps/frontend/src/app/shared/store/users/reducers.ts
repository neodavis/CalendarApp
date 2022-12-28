import { createReducer, on } from '@ngrx/store';
import { User } from '../../interfaces/user';
import { UserState } from './../../interfaces/user-state';
import * as UserActions from './actions'

export const initialState: UserState = {
    user: null,
    isLoading: false,
    error: null,
    token: null,
}

export const UserReducers = createReducer(
    initialState,

    on(UserActions.userLogin, (state: UserState): UserState => {
        return { ...state, isLoading: true };
    }),
    
    on(UserActions.userRegister, (state: UserState) => {
        return {...state, isLoading: true };
    }),

    on(UserActions.userAuth, (state: UserState, action: { token: string }) => {
        return { ...state, isLoading: true, token: action.token };
    }),

    on(UserActions.userLogout, (state: UserState) => {
        return {...state, token: null, user: null}
    }),

    on(UserActions.userQuerySuccess, (state: UserState, action: { user: User | null }) => {
        return {...state, user: action.user, error: null }
    }),

    on(UserActions.userQueryFailure, (state: UserState, action: { message: string }) => {
        return { ...state, isLoading: false, error: action.message };
    })
)