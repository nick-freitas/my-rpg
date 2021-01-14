import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import AppState from '../app-state.model';
import { GamebookService } from '../gamebook/gamebook.service';
import { User } from '../user/user.model';
import { UserState } from '../user/user.reducer';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavBarComponent implements OnInit {
  users: User[];
  user$: Observable<UserState>;

  constructor(
    private gamebookService: GamebookService,
    public userService: UserService,
    private store: Store<AppState>
  ) {
    this.users = this.userService._debug_getUserList();
    this.user$ = store.pipe(select('user'));
  }

  ngOnInit(): void {}

  clearLocalStorage() {
    this.gamebookService.clearLocalStorage();
  }
}
