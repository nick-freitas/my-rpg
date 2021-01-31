import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GamebookService } from './gamebook.service';
import { switchMap, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { GameBook } from './gamebook.model';
import AppState from '../app-state.model';
import { UserState } from '../user/user.reducer';
import { select, Store } from '@ngrx/store';
import { UserService } from '../user/user.service';

@Component({
  templateUrl: './gamebook.page.html',
  styles: [
    `
      :host {
        display: block;
      }

      /* .card-body .btn:not(:first-of-type) {
        margin-left: 1rem;
      } */

      #starting-point {
        font-style: italic;
        font-size: 0.7rem;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GamebookPage implements OnInit {
  gamebook$: Observable<GameBook> | undefined;

  constructor(
    private route: ActivatedRoute,
    private gamebookService: GamebookService,
    public userService: UserService
  ) {}

  ngOnInit(): void {
    this.gamebook$ = this.route.paramMap.pipe(
      switchMap((params) => {
        const selectedId = String(params.get('gamebookId'));
        return this.gamebookService.getGamebookById(selectedId);
      })
    );
  }
}
