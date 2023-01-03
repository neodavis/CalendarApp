import { AbsencesState } from './../../interfaces/absences-state';
import { createSelector } from '@ngrx/store';
import { AppState } from '../../interfaces/app-state';

export const selectFeature = (state: AppState) => state.absences;

export const absenceSelector = createSelector(
  selectFeature,
  (state: AbsencesState) => state.absences
);

export const isLoadingSelector = createSelector(
  selectFeature,
  (state: AbsencesState) => state.isLoading
);

export const errorSelector = createSelector(
  selectFeature,
  (state: AbsencesState) => state.error
);
