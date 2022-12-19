import { Absence } from 'libs/api-interfaces/absence';

export interface AbsencesState {
  absences: Absence[];
  isLoading: boolean;
}
