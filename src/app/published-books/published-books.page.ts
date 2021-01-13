import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GamebookService } from '../gamebook/gamebook.service';
import { GameBook } from '../gamebook/gamebook.type';

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
  store$: Observable<GameBook[]>;

  constructor(public gamebookService: GamebookService) {
    this.store$ = this.gamebookService.getGamebooks();
  }

  ngOnInit(): void {}
}
