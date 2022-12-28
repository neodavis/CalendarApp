import { UserState } from './user-state';
import { AbsencesState } from './absences-state';

export interface AppState {
  absences: AbsencesState;
  user: UserState;
}
