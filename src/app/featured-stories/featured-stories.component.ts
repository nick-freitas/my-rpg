import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { GameBook } from '../gamebook/gamebook.model';
import { GamebookService } from '../gamebook/gamebook.service';

@Component({
  selector: 'app-featured-stories',
  templateUrl: './featured-stories.component.html',
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeaturedStoriesComponent implements OnInit {
  stories$: Observable<GameBook[]>;

  constructor(private gamebookService: GamebookService) {
    this.stories$ = this.gamebookService.getFeaturedAdventures();
  }

  ngOnInit(): void {}
}
