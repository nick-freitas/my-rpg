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

      #section-card {
        margin-top: 1rem;
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
  nodes: any[] = [];
  links: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private gamebookService: GamebookService,
    private store: Store<AppState>
  ) {
    this.gamebook$ = new Observable<GameBook>();
    this.user$ = this.store.pipe(select('user'));
  }

  ngOnInit(): void {
    this.gamebook$ = this.route.paramMap.pipe(
      switchMap((params) => {
        const selectedId = Number(params.get('gamebookId'));
        return this.gamebookService.getGamebookById(selectedId);
      }),
      tap((gb: GameBook) => {
        this.nodes = gb.sections.map((s) => ({ id: s.id, label: s.name }));
        this.links = [];
        let x = 1;
        gb.sections.forEach((section) => {
          section.progressions.forEach((progression) => {
            this.links.push({
              id: String(x),
              source: section.id,
              target: progression.id,
              label: 'abc',
            });
            x++;
          });
        });
      })
    );
  }
}
