import { createAction, props } from "@ngrx/store";
import { Abcence } from "../interfaces/abcence";

export const getAbcences = createAction('[Abcence] Get Abcences');
export const createAbcence = createAction('[Abcence] Create Abcence', props<{abcence: Abcence}>());
export const editAbcence = createAction('[Abcence] Edit Abcence', props<{abcence: Abcence}>());
export const deleteAbcence = createAction('[Abcence] Remove Abcence', props<{id: number}>());

    