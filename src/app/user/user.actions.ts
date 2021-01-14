import { createAction, props } from '@ngrx/store';
import { User } from './user.model';

export const LoginAction = createAction('[DEBUG] Login', props<User>());
export const LoginSuccessAction = createAction(
  '[DEBUG] Login Success',
  props<{ user: User }>()
);
export const LoginFailAction = createAction(
  '[DEBUG] Login Fail',
  props<{ error: any }>()
);

// export type UserAction = LoginAction | LoginSuccessAction | LoginFailAction;
