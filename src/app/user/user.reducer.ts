import { Action, createReducer, on } from '@ngrx/store';

import * as UserActions from './user.actions';
import { User } from './user.model';

export interface UserState {
  user?: User;
  loading: boolean;
  error: string | any;
}

const initialState: UserState = {
  loading: false,
  error: null,
};

export const UserReducer = createReducer(
  initialState,
  on(UserActions.LoginAction, (state, { email, password }) => ({
    ...state,
    loading: true,
  })),
  on(UserActions.LoginSuccessAction, (state, { user }) => ({
    ...state,
    user,
    loading: false,
  })),
  on(UserActions.LoginFailAction, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);

export function reducer(state: UserState | undefined, action: Action) {
  return UserReducer(state, action);
}
