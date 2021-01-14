import { UserState } from './user.reducer';

export const selectUser = (state: UserState) => state.user;
