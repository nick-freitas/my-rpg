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
          return this.firestore
            .doc<User>(`users/${user.uid}`)
            .valueChanges({ idField: 'id' });
        }

        return of(null);
      })
    );
  }

  logout(): Promise<void> {
    return this.auth.signOut();
  }

  register({
    email,
    password,
    persistLogin,
  }: LoginRegisterValues): Promise<void> {
    return new Promise((resolve, reject) => {
      this.auth
        .createUserWithEmailAndPassword(email, password)
        .then((credentials) =>
          resolve(this.handlePostLogin(persistLogin, credentials))
        )
        .catch((err) => reject(err.message));
    });
  }

  login({ email, password, persistLogin }: LoginRegisterValues): Promise<void> {
    return new Promise((resolve, reject) => {
      this.auth
        .signInWithEmailAndPassword(email, password)
        .then((credentials) =>
          resolve(this.handlePostLogin(persistLogin, credentials))
        )
        .catch((err) => reject(err.message));
    });
  }

  handlePostLogin(persistLogin: boolean, credentials: any): Promise<void> {
    if (persistLogin) {
      this.auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    } else {
      this.auth.setPersistence(firebase.auth.Auth.Persistence.SESSION);
    }

    return this.updateUser(credentials.user);
  }

  updateDisplayName(uid: string, displayName: string): Promise<void> {
    const userRef: AngularFirestoreDocument<User> = this.firestore.doc(
      `users/${uid}`
    );

    return userRef.update({ displayName });
  }

  updateUser({ uid, email, displayName }: any): Promise<void> {
    const userRef: AngularFirestoreDocument<User> = this.firestore.doc(
      `users/${uid}`
    );

    const data: any = {
      id: uid,
      email,
      displayName: displayName || email,
    };

    return userRef.set(data, { merge: true });
  }
}
