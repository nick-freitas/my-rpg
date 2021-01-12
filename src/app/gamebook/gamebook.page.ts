import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GamebookService } from './gamebook.service';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { GameBook } from './gamebook.type';

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
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GamebookPage implements OnInit {
  gamebook$: Observable<GameBook>;

  constructor(
    private route: ActivatedRoute,
    private gamebookService: GamebookService
  ) {
    this.gamebook$ = new Observable<GameBook>();
  }

  ngOnInit(): void {
    this.gamebook$ = this.route.paramMap.pipe(
      switchMap((params) => {
        const selectedId = Number(params.get('gamebookId'));
        return this.gamebookService.getGamebookById(selectedId);
      })
    );
  }
}
