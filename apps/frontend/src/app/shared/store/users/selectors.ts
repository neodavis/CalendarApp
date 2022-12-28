import { createSelector } from '@ngrx/store';
import { AppState } from '../../interfaces/app-state';
import { UserState } from '../../interfaces/user-state';

export const selectFeature = (state: AppState) => state.user;

export const userSelector = createSelector(
  selectFeature,
  (state: UserState) => state.user
);

export const errorSelector = createSelector(
  selectFeature,
  (state: UserState) => state.error
);

export const tokenSelector = createSelector(
  selectFeature,
  (state: UserState) => state.token
);
