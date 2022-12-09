import { createAction, props } from "@ngrx/store";
import { Abcence } from "../interfaces/abcence";

export const getAbcence = createAction('[Abcence] Get Abcence')
export const getAbcenceSuccess = createAction('[Abcence] Get Posts Abcence', props<{abcence: Abcence[]}>())
export const getAbcenceFailure = createAction('[Abcence] Get Posts Abcence', props<{error: string}>())
