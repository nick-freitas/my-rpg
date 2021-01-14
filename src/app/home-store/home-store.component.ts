import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GamebookService } from '../gamebook/gamebook.service';
import { GameBook } from '../gamebook/gamebook.model';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-home-store',
  templateUrl: './home-store.component.html',
  styles: [
    `
      :host {
        display: block;
      }

      .system-logo {
        padding-right: 1rem;
      }
    `,
  ],
})
export class HomeStoreComponent implements OnInit {
  store$: Observable<GameBook[]>;

  constructor(
    public gamebookService: GamebookService,
    public userService: UserService
  ) {
    this.store$ = this.gamebookService.getGamebooks();
  }

  ngOnInit(): void {}
}
