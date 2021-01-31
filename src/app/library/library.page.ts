import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { GameBook } from '../gamebook/gamebook.model';
import { GamebookService } from '../gamebook/gamebook.service';
import { UserService } from '../user/user.service';

@Component({
  templateUrl: './library.page.html',
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LibraryPage implements OnInit {
  gamebooks$: Observable<GameBook[] | undefined>;

  constructor(
    public gamebookService: GamebookService,
    public userService: UserService
  ) {
    this.gamebooks$ = this.gamebookService.getLibrary();
  }

  ngOnInit(): void {}
}
