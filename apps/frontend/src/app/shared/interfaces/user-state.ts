import { User } from "./user";

export interface UserState {
    user: User | null;
    isLoading: boolean;
    error: string | null;
    token: string | null;
}