import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GamebookService } from './gamebook.service';
import { switchMap, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { GameBook } from './gamebook.model';
import AppState from '../app-state.model';
import { UserState } from '../user/user.reducer';
import { select, Store } from '@ngrx/store';

@Component({
  templateUrl: './gamebook.page.html',
  styles: [
    `
      :host {
        display: block;
      }

      .card-body .btn:not(:first-of-type) {
        margin-left: 1rem;
      }

      #starting-point {
        font-style: italic;
        font-size: 0.7rem;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GamebookPage implements OnInit {
  user$: Observable<UserState>;
  gamebook$: Observable<GameBook>;

  constructor(
    private route: ActivatedRoute,
    private gamebookService: GamebookService,
    private store: Store<AppState>
  ) {
    this.gamebook$ = new Observable<GameBook>();
    this.user$ = this.store.pipe(select('user'));
  }

  ngOnInit(): void {
    // this.gamebook$ = this.route.paramMap.pipe(
    //   switchMap((params) => {
    //     const selectedId = Number(params.get('gamebookId'));
    //     return this.gamebookService.getGamebookById(selectedId);
    //   })
    // );
  }
}
