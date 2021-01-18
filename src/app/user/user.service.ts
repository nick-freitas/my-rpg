import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, mergeAll, switchMap } from 'rxjs/operators';
import AppState from '../app-state.model';
import { LocalStorageKeys } from '../local-storage-keys';
import { User } from './user.model';

interface LoginRegisterValues {
  email: string;
  password: string;
  persistLogin: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  isLoggedIn$: BehaviorSubject<boolean>;
  user$: Observable<User | null | undefined>;

  constructor(
    private store: Store<AppState>,
    private firestore: AngularFirestore,
    public auth: AngularFireAuth
  ) {
    this.isLoggedIn$ = new BehaviorSubject<boolean>(false);
    const persistLastLogin = localStorage.getItem(
      LocalStorageKeys.PersistLogin
    );

    // add && has unexpired token
    if (persistLastLogin) {
      this.isLoggedIn$.next(true);
    }

    this.user$ = this.auth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.firestore.doc<User>(`users/${user.uid}`).valueChanges();
        }

        return of(null);
      })
    );
  }

  logout() {
    return this.auth.signOut();
  }

  async register({ email, password, persistLogin }: LoginRegisterValues) {
    let credentials;
    try {
      await this.auth.createUserWithEmailAndPassword(email, password);
    } catch (error) {
      throw error.message;
    }

    this.handlePostLogin(persistLogin, credentials);
  }

  async login({
    email,
    password,
    persistLogin,
  }: LoginRegisterValues): Promise<void> {
    let credentials;
    try {
      credentials = await this.auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      throw error.message;
    }

    this.handlePostLogin(persistLogin, credentials);
  }

  handlePostLogin(persistLogin: boolean, credentials: any) {
    if (persistLogin) {
      this.auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    } else {
      this.auth.setPersistence(firebase.auth.Auth.Persistence.SESSION);
    }

    return this.updateUser(credentials.user);
  }

  private updateUser({ uid, email, displayName, photoURL }: any) {
    const userRef: AngularFirestoreDocument<User> = this.firestore.doc(
      `users/${uid}`
    );

    const data = {
      id: uid,
      email,
      displayName,
      photoURL,
    };

    return userRef.set(data, { merge: true });
  }
}
