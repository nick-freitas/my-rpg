import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GamebookService } from '../gamebook/gamebook.service';
import { GameBook } from '../gamebook/gamebook.type';

@Component({
  selector: 'app-home-store',
  templateUrl: './home-store.component.html',
  styles: [
    `
      .system-logo {
        padding-right: 1rem;
      }
    `,
  ],
})
export class HomeStoreComponent implements OnInit {
  store$: Observable<GameBook[]>;

  constructor(public gamebookService: GamebookService) {
    this.store$ = this.gamebookService.getGamebooks();
  }

  ngOnInit(): void {}
}
