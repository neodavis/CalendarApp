import { createSelector } from "@ngrx/store";
import { AppState } from "../interfaces/app-state";

export const selectFeature = (state: AppState) => state.abcences;

export const abcenceSelector = createSelector(selectFeature, (state) => state.abcences);
