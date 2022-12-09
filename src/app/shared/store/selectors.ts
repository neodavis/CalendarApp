import { createSelector } from "@ngrx/store";
import { AppState } from "../interfaces/app-state";

export const selectFeature = (state: AppState) => state.abcence

export const isLoadingSelector = createSelector(selectFeature, (state) => state.isLoading)
export const abcenceSelector = createSelector(selectFeature, (state) => state.abcence)
