import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { Observable } from 'rxjs';
import AppState from '../app-state.model';
import { GamebookService } from '../gamebook/gamebook.service';
import { UserState } from '../user/user.reducer';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavBarComponent implements OnInit {
  user$: Observable<UserState>;

  constructor(
    private gamebookService: GamebookService,
    public userService: UserService,
    private store: Store<AppState>,
    public auth: AngularFireAuth
  ) {
    // this.users = this.userService._debug_getUserList();
    this.user$ = store.pipe(select('user'));
  }

  ngOnInit(): void {}

  logout() {
    this.userService.logout();
  }
}
