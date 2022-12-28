import { catchError, mergeMap, switchMap } from 'rxjs';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { UserBackendService } from '../../service/user-backend.service';
import * as UserActions from './actions'
import { User } from '../../interfaces/user';
import { HttpException } from '@nestjs/common';


@Injectable()
export class UserEffects {
    userLogin$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.userLogin),
            switchMap((action: { user: User }) => {
                return this.backendService.userLogin(action.user).pipe(
                    switchMap(async (action: { token: string }) => UserActions.userAuth({ token: action.token })),
                    catchError(async (exception) => UserActions.userQueryFailure({message: exception.error.message}))
                )
            })
        ))

    userAuth$ = createEffect(() =>
    this.actions$.pipe(
        ofType(UserActions.userAuth),
        switchMap((action: { token: string }) => {
            return this.backendService.userAuth(action.token).pipe(
                switchMap(async (user: User) => {
                    return UserActions.userQuerySuccess({ user: user })
                } )
            );
        }), 
        catchError(async (exception) => UserActions.userQueryFailure({message: exception.error.message}))
    ))

    userRegister$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.userRegister),
            switchMap((action: { user: User }) => {
                return this.backendService.userRegister(action.user).pipe(
                    switchMap( async (action: User) => UserActions.userLogin({ user: action }) )
                )
            }),
            catchError(async (exception) => UserActions.userQueryFailure({message: exception.error.message}))
        ) 
    )

    constructor(private actions$: Actions, private backendService: UserBackendService) {}
}