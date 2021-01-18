import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LoginAction } from './user.actions';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable()
export class UserEffects {
  // login$ = createEffect(() =>
  //   this.actions$.pipe(ofType(LoginAction).mergeMap())
  // );
  constructor(private actions$: Actions, private firestore: AngularFirestore) {}
}
