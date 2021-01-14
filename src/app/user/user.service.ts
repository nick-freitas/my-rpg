import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, of } from 'rxjs';
import AppState from '../app-state.model';
import { LoginAction } from './user.actions';
import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users: User[];

  constructor(private store: Store<AppState>) {
    this.users = [
      { id: 1, name: 'Nick Freitas', roles: ['admin'], password: '123' },
      { id: 2, name: 'Naizak Bellemsieh', library: [1] },
      { id: 3, name: 'Brandon Charest', library: [1] },
      { id: 4, name: 'Geena Melcher', library: [1] },
      { id: 5, name: 'Andy Mitchell', roles: [] },
    ];

    this._debug_setInitialUser();
  }

  getPublicUserInfo(userId: number): Observable<User> {
    //blacklist
    const { roles, ...rest } = this.users?.find((user) => user.id === userId)!;

    return of(rest);
  }

  _debug_getUserList(): User[] {
    return this.users;
  }

  _debug_setInitialUser() {
    this.store.dispatch(LoginAction(this.users[0]));
  }

  _debug_setCurrentUser(user: User): void {
    this.store.dispatch(LoginAction(user));
  }
}
