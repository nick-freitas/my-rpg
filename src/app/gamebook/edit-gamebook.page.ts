import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { GamebookService } from './gamebook.service';
import { GameBook } from './gamebook.model';

@Component({
  template: `
    <div class="container page-container">
      <div class="card" *ngIf="gamebook$ | async as gamebook">
        <div class="card-body">
          <h5 class="card-title">{{ gamebook.name }}</h5>
        </div>
      </div>
    </div>
  `,
  styles: [``],
})
export class EditGamebookPage implements OnInit {
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
