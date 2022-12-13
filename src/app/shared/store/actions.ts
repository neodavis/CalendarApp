import { createAction, props } from "@ngrx/store";
import { Abcence } from "../interfaces/abcence";

export const getAbcence = createAction('[Abcence] Get Abcences');
export const createAbcences = createAction('[Abcence] Create Abcences', props<{abcence: Abcence}>());
export const editAbcence = createAction('[Abcence] Edit Abcence', props<{abcence: Abcence}>());
export const deleteAbcence = createAction('[Abcence] Remove Abcence', props<{id: number}>());

    