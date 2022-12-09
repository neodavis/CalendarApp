import { createAction, props } from "@ngrx/store";
import { Abcence } from "../interfaces/abcence";

export const getAbcence = createAction('[Abcence] Get Abcence')
export const getAbcenceSuccess = createAction('[Abcence] Get Success Abcence', props<{abcence: Abcence[]}>())
    