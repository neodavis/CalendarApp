import { createSelector } from "@ngrx/store";
import { AppState } from "../interfaces/app-state";

export const selectFeature = (state: AppState) => state.absences;

export const absenceSelector = createSelector(selectFeature, (state) => state.absences);
