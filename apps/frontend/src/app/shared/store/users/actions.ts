import { createAction, props } from '@ngrx/store';
import { User } from '../../interfaces/user';

export const userLogin = createAction(
  '[User] User Login',
  props<{ user: User }>()
);

export const userAuth = createAction(
  '[User] User Auth',
  props<{ token: string }>()
);

export const userLogout = createAction(
  '[User] User Logout'
);

export const userRegister = createAction(
  '[User] User Register',
  props<{ user: User }>()
);

export const userQuerySuccess = createAction(
  '[User] User Query Success',
  props<{ user: User | null}>()
);

export const userQueryFailure = createAction(
  '[User] User Query Error',
  props<{ message: string }>()
);
