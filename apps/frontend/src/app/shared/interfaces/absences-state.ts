import { Absence } from './absence';

export interface AbsencesState {
  absences: Absence[];
  isLoading: boolean;
  error: string | null
}
