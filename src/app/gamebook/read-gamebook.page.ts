import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { GamebookService } from './gamebook.service';
import { GameBook, Section } from './gamebook.model';
import { Router } from '@angular/router';

@Component({
  templateUrl: './read-gamebook.page.html',
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class ReadGamebookPage implements OnInit {
  gamebook$: Observable<GameBook | undefined>;
  section$: Observable<Section | undefined>;
  gamebookId: string | undefined;
  sectionId: string | undefined;
  sectionContent: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private gamebookService: GamebookService,
    private router: Router
  ) {
    this.gamebook$ = new Observable<GameBook>();
    this.section$ = new Observable<Section>();

    console.log('constructor');
  }

  ngOnInit(): void {
    console.log('loading');
    // why does switchmap/pipe not work
    this.route.paramMap.subscribe((pm) => {
      const sid = pm.get('sectionId');
      this.gamebookId = String(pm.get('gamebookId'));

      console.log(sid);
      if (!sid) {
        this.section$ = this.gamebookService.getStartingPointSection(
          this.gamebookId
        );
      } else {
        this.sectionId = String(sid);

        // this.gamebook$ = this.gamebookService.getGamebookById(this.gamebookId);

        this.section$ = this.gamebookService
          .getSectionById(this.sectionId)
          .pipe(tap((s) => (this.sectionContent = s && s.content)));
      }
    });
  }
}
