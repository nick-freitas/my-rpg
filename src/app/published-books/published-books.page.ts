import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GamebookService } from '../gamebook/gamebook.service';
import { GameBook } from '../gamebook/gamebook.model';
import { UserService } from '../user/user.service';

@Component({
  templateUrl: './published-books.page.html',
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class PublishedBooksPage implements OnInit {
  gamebooks$: Observable<GameBook[]> | undefined;

  constructor(
    public gamebookService: GamebookService,
    public userService: UserService
  ) {
    this.gamebooks$ = this.gamebookService.getPublishedAdventures();
  }

  ngOnInit(): void {}
}
