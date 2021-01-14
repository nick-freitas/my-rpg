//https://medium.com/@usman_qb/angular-11-state-management-with-ngrx-side-effects-1d37830fbd64

import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, of, timer } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import AppState from '../app-state.model';
import { UserService } from '../user/user.service';
import { GAMEBOOK } from './gamebook.data';
import { GameBook, Section } from './gamebook.model';

@Injectable()
export class GamebookService {
  gamebooks: GameBook[];

  constructor(
    private userService: UserService,
    private store: Store<AppState>
  ) {
    this.gamebooks = [];

    this.loadStateFromLocalStorage();
  }

  clearLocalStorage() {
    localStorage.removeItem('mrpg-gamebooks');
  }

  saveStateToLocalStorage() {
    localStorage.setItem('mrpg-gamebooks', JSON.stringify(this.gamebooks));
  }

  loadStateFromLocalStorage() {
    const gb = localStorage.getItem('mrpg-gamebooks');
    if (gb) {
      this.gamebooks = JSON.parse(gb);
    } else {
      console.warn('THERE IS NO GAME BOOK TO LOAD');
      this.gamebooks = GAMEBOOK;
      this.saveStateToLocalStorage();
    }
  }

  getGamebooks(): Observable<GameBook[]> {
    return of(this.gamebooks);
  }

  getGamebookById(_id: number): Observable<GameBook> {
    // todo: look into Non-Null Asserion Operator
    // https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html
    // It tells TypeScript that even though something looks like it could be null,
    // ""it can trust you that it's not"" -- HA!
    return of(this.gamebooks.find((gb: GameBook) => gb.id === _id)!);
  }

  getPublishedAdventures(): Observable<GameBook[]> {
    return this.store.pipe(
      select('user'),
      mergeMap((user) =>
        of(this.gamebooks.filter((gb) => gb.author === user.user?.id))
      )
    );
  }

  getLibrary(): Observable<GameBook[]> {
    return this.store.pipe(
      select('user'),
      mergeMap((user) => {
        const library: GameBook[] = [];
        this.gamebooks.forEach((gb: GameBook) => {
          if (user.user?.library?.find((lib) => lib === gb.id)) {
            library.push(gb);
          }
        });

        return of(library);
      })
    );
  }

  getStartingPointId(gamebookId: number) {
    return of(
      this.gamebooks
        .find((gb: GameBook) => gb.id === gamebookId)
        ?.sections.find((s) => s.isStartingPoint)?.id!
    );
  }

  getSectionById(gamebookId: number, sectionId: string): Observable<Section> {
    // otherwise we have the id we want to grab
    return of(
      this.gamebooks
        .find((gb: GameBook) => gb.id === gamebookId)
        ?.sections.find((s) => s.id === sectionId)!
    );
  }

  getPossibleProgressions(
    gamebookId: number,
    sectionId: string
  ): Observable<Section[]> {
    const currentProgressions = this.findSection(gamebookId, sectionId)
      .progressions;
    let sections = this.gamebooks.find((gb: GameBook) => gb.id === gamebookId)
      ?.sections!;
    sections = sections.filter((s) => s.id !== sectionId);
    sections = sections.filter(
      (s) => !currentProgressions.find((p) => p.id === s.id)
    );

    return of(sections);
  }

  findSection(gamebookId: number, sectionId: string): Section {
    return this.gamebooks
      .find((gb) => gb.id === gamebookId)
      ?.sections.find((s) => s.id === sectionId)!;
  }

  addProgression(
    gamebookId: number,
    sectionId: string,
    progressionId: string
  ): void {
    this.gamebooks = this.gamebooks.map((gb) => {
      if (gb.id === gamebookId) {
        gb.sections = gb.sections.map((s) => {
          if (s.id === sectionId) {
            const newProg = this.findSection(gamebookId, progressionId);
            s.progressions.push({ id: newProg.id, descriptor: newProg.name });
          }

          return s;
        });
      }

      return gb;
    });

    console.log('a');
    this.saveStateToLocalStorage();
  }

  saveSectionContent(gamebookId: number, sectionId: string, content: string) {
    this.gamebooks = this.gamebooks.map((gb) => {
      if (gb.id === gamebookId) {
        gb.sections = gb.sections.map((s) => {
          if (s.id === sectionId) {
            s.content = content;
          }

          return s;
        });
      }

      return gb;
    });

    this.saveStateToLocalStorage();
  }

  createNewProgression(gamebookId: number, sectionId: string) {
    const newId = 'NEWSECTION';

    this.gamebooks = this.gamebooks.map((gb) => {
      if (gb.id === gamebookId) {
        const newSection: Section = {
          id: newId,
          content: '',
          name: 'New Section',
          isStartingPoint: false,
          progressions: [],
        };

        gb.sections.push(newSection);
        gb.sections = gb.sections.map((s) => {
          if (s.id === sectionId) {
            s.progressions.push({
              id: newSection.id,
              descriptor: newSection.name,
            });
          }

          return s;
        });
      }

      return gb;
    });

    this.saveStateToLocalStorage();

    return newId;
  }
}
